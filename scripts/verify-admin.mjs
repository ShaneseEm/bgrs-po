/*
  End-to-end check of the news admin against the real Supabase project.

  Visitor checks always run. Staff checks run when credentials are provided
  (they never leave your computer):

    PowerShell:
      $env:ADMIN_EMAIL="you@example.com"; $env:ADMIN_PASSWORD="your-password"
      node --env-file=.env.local scripts/verify-admin.mjs

  Every test post is titled "[TEST] ..." and removed at the end, even if a check fails.
*/
import { createClient } from '@supabase/supabase-js';

const URL = process.env.VITE_SUPABASE_URL;
const KEY = process.env.VITE_SUPABASE_ANON_KEY;
const EMAIL = process.env.ADMIN_EMAIL;
const PASSWORD = process.env.ADMIN_PASSWORD;

if (!URL || !KEY) {
  console.error('Missing VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY. Run with: node --env-file=.env.local scripts/verify-admin.mjs');
  process.exit(2);
}

// Node 20 has no built-in WebSocket; this script never uses realtime, so a stub transport is enough
const opts = { auth: { persistSession: false, autoRefreshToken: false }, realtime: { transport: class NoRealtime {} } };
const anon = createClient(URL, KEY, opts);
const staff = createClient(URL, KEY, opts);

let failed = 0;
const check = (name, ok, detail = '') => {
  if (!ok) failed++;
  console.log(`${ok ? '  PASS' : '  FAIL'}  ${name}${!ok && detail ? `  →  ${detail}` : ''}`);
};
const section = (t) => console.log(`\n${t}`);
const tag = `[TEST] ${new Date().toISOString()}`;

const day = 24 * 3600 * 1000;
const base = (extra = {}) => ({
  category: 'press', status: 'draft', title_en: `${tag} A`, summary_en: 'Test summary', body_en: 'Para one.\n\nPara two.',
  title_am: '', summary_am: '', body_am: '', ...extra,
});

async function visitorSees(id) {
  const { data } = await anon.from('news').select('id,title_en').eq('id', id);
  return data?.length === 1 ? data[0] : null;
}

async function main() {
  section('Visitors (not signed in)');
  {
    const { error } = await anon.from('news').select('id').limit(1);
    check('can read the news table', !error, error?.message);
    const { data } = await anon.from('admins').select('email');
    check('cannot see the staff list', Array.isArray(data) && data.length === 0);
    const { error: insErr } = await anon.from('news').insert(base());
    check('cannot create posts', Boolean(insErr), 'insert unexpectedly succeeded');
    const up = await anon.storage.from('news-images').upload(`test/${Date.now()}.png`, new Blob([new Uint8Array([137, 80, 78, 71])], { type: 'image/png' }));
    check('cannot upload images', Boolean(up.error), 'upload unexpectedly succeeded');
  }

  if (!EMAIL || !PASSWORD) {
    console.log('\n(Staff checks skipped — set ADMIN_EMAIL and ADMIN_PASSWORD to run them.)');
    return;
  }

  section(`Staff: ${EMAIL}`);
  const { data: auth, error: authErr } = await staff.auth.signInWithPassword({ email: EMAIL, password: PASSWORD });
  check('sign in', !authErr, authErr?.message);
  if (authErr) return;
  const user = auth.user;

  const { data: adminRow } = await staff.from('admins').select('user_id').eq('user_id', user.id).maybeSingle();
  check('is on the staff list (admins table)', Boolean(adminRow), 'run the "insert into public.admins" SQL for this email');
  if (!adminRow) return;

  const created = [];
  try {
    section('Create');
    const { data: draft, error: e1 } = await staff.from('news').insert({ ...base(), author_id: user.id, author_email: user.email }).select().single();
    check('create a draft', !e1 && draft?.id, e1?.message);
    if (!draft) return;
    created.push(draft.id);
    check('author recorded', draft.author_email === user.email);
    check('draft is hidden from visitors', !(await visitorSees(draft.id)));

    section('Edit');
    const { data: edited, error: e2 } = await staff.from('news').update({ title_en: `${tag} A (edited)`, title_am: 'ሙከራ', summary_am: 'ማጠቃለያ' }).eq('id', draft.id).select().single();
    check('edit title and add Amharic', !e2 && edited?.title_en.endsWith('(edited)') && edited.title_am === 'ሙከራ', e2?.message);
    check('updated_at changes on edit', edited && new Date(edited.updated_at) > new Date(draft.updated_at));

    section('Publish');
    const { error: e3 } = await staff.from('news').update({ status: 'published', published_at: new Date(Date.now() - 1000).toISOString() }).eq('id', draft.id);
    check('publish now', !e3, e3?.message);
    const seen = await visitorSees(draft.id);
    check('published post is visible to visitors', Boolean(seen));
    check('visitor sees the edited title', seen?.title_en.endsWith('(edited)'));

    section('Visitors cannot change or delete a published post');
    const { data: u } = await anon.from('news').update({ title_en: 'HACKED' }).eq('id', draft.id).select();
    check('anonymous edit changes nothing', !u?.length);
    const { data: d } = await anon.from('news').delete().eq('id', draft.id).select();
    check('anonymous delete removes nothing', !d?.length);
    const still = await visitorSees(draft.id);
    check('post is intact afterwards', still?.title_en.endsWith('(edited)'));

    section('Schedule');
    const { data: sched, error: e4 } = await staff.from('news').insert({ ...base({ title_en: `${tag} B scheduled`, status: 'published', published_at: new Date(Date.now() + day).toISOString() }), author_id: user.id, author_email: user.email }).select().single();
    check('schedule a post for tomorrow', !e4 && sched?.id, e4?.message);
    if (sched) created.push(sched.id);
    check('scheduled post is NOT visible yet', sched && !(await visitorSees(sched.id)));
    const { error: e5 } = await staff.from('news').update({ published_at: new Date(Date.now() - 1000).toISOString() }).eq('id', sched.id);
    check('scheduled post becomes visible once its time passes', !e5 && Boolean(await visitorSees(sched.id)), e5?.message);

    section('Featured (only one at a time)');
    await staff.from('news').update({ featured: true }).eq('id', draft.id);
    const { data: f2 } = await staff.from('news').update({ featured: true }).eq('id', sched.id).select().single();
    await staff.from('news').update({ featured: false }).neq('id', f2.id).eq('featured', true); // same step the editor performs
    const { data: feat } = await staff.from('news').select('id').in('id', created).eq('featured', true);
    check('exactly one featured story among the test posts', feat?.length === 1 && feat[0].id === sched.id);

    section('Photos');
    const png = Uint8Array.from(atob('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=='), (c) => c.charCodeAt(0));
    const path = `test/${Date.now()}.png`;
    const { error: e6 } = await staff.storage.from('news-images').upload(path, png, { contentType: 'image/png' });
    check('upload a photo', !e6, e6?.message);
    if (!e6) {
      const { data: pub } = staff.storage.from('news-images').getPublicUrl(path);
      const res = await fetch(pub.publicUrl);
      check('photo is publicly viewable', res.ok, `HTTP ${res.status}`);
      const { data: rm, error: e7 } = await staff.storage.from('news-images').remove([path]);
      check('delete the photo', !e7 && rm?.length === 1, e7?.message);
    }

    section('Delete');
    for (const [i, id] of created.entries()) {
      const { data: gone, error: e8 } = await staff.from('news').delete().eq('id', id).select('id');
      check(`delete test post ${i + 1}`, !e8 && gone?.length === 1, e8?.message);
    }
    const { data: left } = await staff.from('news').select('id').in('id', created);
    check('deleted posts are gone', left?.length === 0);
    created.length = 0;
  } finally {
    // Safety net: remove anything left behind if a check crashed midway
    if (created.length) await staff.from('news').delete().in('id', created);
    await staff.from('news').delete().like('title_en', '[TEST]%');
    await staff.auth.signOut();
  }
}

main()
  .catch((e) => {
    failed++;
    console.error('\nUnexpected error:', e);
  })
  .finally(() => {
    console.log(`\n${failed === 0 ? 'ALL CHECKS PASSED' : `${failed} CHECK(S) FAILED`}`);
    process.exit(failed === 0 ? 0 : 1);
  });

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  LogOut, Plus, Pencil, Trash2, Star, ImagePlus, X, Loader2, ExternalLink, Search, ArrowLeft, Eye, CalendarClock, FileText, Globe,
} from 'lucide-react';
import { supabase, NEWS_BUCKET } from '../lib/supabase';
import { CATEGORIES } from '../lib/news';
import { contentData } from '../data/content';

const CATEGORY_LABELS = Object.fromEntries(CATEGORIES.map((c, i) => [c, contentData.en.news.tabs[i + 1]]));

const EMPTY_POST = {
  category: 'press',
  featured: false,
  image_url: '',
  title_en: '', summary_en: '', body_en: '',
  title_am: '', summary_am: '', body_am: '',
};

/* ---------- helpers ---------- */
const input =
  'w-full bg-white border border-slate-300 px-3.5 py-2.5 text-[15px] text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#1a4f6d] focus:ring-4 focus:ring-[#1a4f6d]/10 transition';
const btnPrimary =
  'inline-flex items-center justify-center gap-2 bg-[#1a4f6d] hover:bg-[#0e2f45] text-white px-5 py-2.5 text-sm font-semibold transition disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer';
const btnGhost =
  'inline-flex items-center justify-center gap-2 border border-slate-300 hover:border-[#1a4f6d] hover:text-[#1a4f6d] text-slate-700 bg-white px-4 py-2.5 text-sm font-semibold transition cursor-pointer disabled:opacity-60';

const toLocalInput = (iso) => {
  const d = iso ? new Date(iso) : new Date(Date.now() + 3600 * 1000);
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
};
const fmt = (iso) =>
  iso ? new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }).format(new Date(iso)) : '—';

const stateOf = (p) => {
  if (p.status !== 'published') return 'draft';
  return new Date(p.published_at) > new Date() ? 'scheduled' : 'live';
};
const STATE_STYLE = {
  live: { label: 'Live', cls: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
  scheduled: { label: 'Scheduled', cls: 'bg-amber-50 text-amber-800 border-amber-200' },
  draft: { label: 'Draft', cls: 'bg-slate-100 text-slate-600 border-slate-200' },
};

// Downscale large photos in the browser before upload (max 1600px, JPEG 85%)
async function prepareImage(file) {
  if (!/^image\/(jpeg|png|webp)$/.test(file.type)) throw new Error('Please choose a JPG, PNG or WebP image.');
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, 1600 / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext('2d').drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  const blob = await new Promise((res) => canvas.toBlob(res, 'image/jpeg', 0.85));
  if (!blob) throw new Error('Could not process this image.');
  if (blob.size > 5 * 1024 * 1024) throw new Error('Image is still larger than 5 MB after resizing.');
  return blob;
}

function Shell({ children, user, onSignOut }) {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-700 font-sans">
      <header className="bg-[#0e2f45] text-white">
        <div className="ethiopian-tricolor-bar" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <img src="/images/bgrs-emblem-new.png" alt="" className="w-9 h-9 object-contain" />
            <div className="min-w-0">
              <div className="font-serif text-lg leading-tight truncate">News Admin</div>
              <div className="text-xs text-slate-400 truncate">Office of the Regional President</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a href="/#/news" target="_blank" rel="noopener noreferrer" className="hidden sm:inline-flex items-center gap-1.5 text-sm text-slate-300 hover:text-white px-3 py-2">
              View site <ExternalLink className="w-3.5 h-3.5" />
            </a>
            {user && (
              <button onClick={onSignOut} className="inline-flex items-center gap-1.5 text-sm text-slate-300 hover:text-white border border-white/15 hover:border-white/40 px-3 py-2 cursor-pointer">
                <LogOut className="w-4 h-4" /> Sign out
              </button>
            )}
          </div>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">{children}</main>
    </div>
  );
}

function Notice({ tone = 'info', children }) {
  const cls = tone === 'error' ? 'border-red-200 bg-red-50 text-red-800' : tone === 'ok' ? 'border-emerald-200 bg-emerald-50 text-emerald-800' : 'border-slate-200 bg-white text-slate-700';
  return <div className={`border px-4 py-3 text-sm ${cls}`} role={tone === 'error' ? 'alert' : 'status'}>{children}</div>;
}

/* ---------- Setup / login / access ---------- */
function SetupRequired() {
  return (
    <Shell>
      <div className="max-w-xl mx-auto bg-white border border-slate-200 p-8">
        <h1 className="font-serif text-2xl text-[#1a4f6d] mb-3">Connect Supabase to enable the admin</h1>
        <p className="mb-4">The site is not connected to a Supabase project yet. Add these two environment variables in Vercel (Project → Settings → Environment Variables), then redeploy:</p>
        <pre className="bg-slate-900 text-slate-100 text-sm p-4 overflow-x-auto">VITE_SUPABASE_URL=https://YOUR-PROJECT.supabase.co{'\n'}VITE_SUPABASE_ANON_KEY=your-anon-public-key</pre>
        <p className="text-sm text-slate-500 mt-4">Until then, the public site shows its built-in news articles.</p>
      </div>
    </Shell>
  );
}

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    const { error: err } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    if (err) setError(err.message === 'Invalid login credentials' ? 'Incorrect email or password.' : err.message);
    setBusy(false);
  };

  return (
    <Shell>
      <form onSubmit={submit} className="max-w-sm mx-auto bg-white border border-slate-200 shadow-sm p-8 mt-8 space-y-5">
        <div>
          <h1 className="font-serif text-2xl text-[#1a4f6d]">Staff sign in</h1>
          <p className="text-sm text-slate-500 mt-1">Use the email and password issued by the Media Secretariat.</p>
        </div>
        {error && <Notice tone="error">{error}</Notice>}
        <label className="block">
          <span className="block text-sm font-semibold text-[#1a4f6d] mb-1.5">Email</span>
          <input type="email" required autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} className={input} />
        </label>
        <label className="block">
          <span className="block text-sm font-semibold text-[#1a4f6d] mb-1.5">Password</span>
          <input type="password" required autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} className={input} />
        </label>
        <button type="submit" disabled={busy} className={`${btnPrimary} w-full py-3`}>
          {busy && <Loader2 className="w-4 h-4 animate-spin" />} Sign in
        </button>
      </form>
    </Shell>
  );
}

/* ---------- Post list ---------- */
function PostList({ onEdit, onNew, flash }) {
  const [posts, setPosts] = useState(null);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');

  const load = useCallback(async () => {
    const { data, error: err } = await supabase.from('news').select('*').order('updated_at', { ascending: false });
    if (err) setError(err.message);
    else setPosts(data);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const remove = async (p) => {
    if (!window.confirm(`Delete "${p.title_en}"? This cannot be undone.`)) return;
    const { error: err } = await supabase.from('news').delete().eq('id', p.id);
    if (err) return setError(err.message);
    setPosts((list) => list.filter((x) => x.id !== p.id));
  };

  const counts = useMemo(() => {
    const c = { all: 0, live: 0, scheduled: 0, draft: 0 };
    (posts || []).forEach((p) => { c.all++; c[stateOf(p)]++; });
    return c;
  }, [posts]);

  const visible = (posts || []).filter((p) => {
    if (filter !== 'all' && stateOf(p) !== filter) return false;
    const q = query.trim().toLowerCase();
    return !q || `${p.title_en} ${p.title_am}`.toLowerCase().includes(q);
  });

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <h1 className="font-serif text-3xl text-[#1a4f6d]">News posts</h1>
          <p className="text-sm text-slate-500 mt-1">Live posts appear on the News page, home page and search.</p>
        </div>
        <button onClick={onNew} className={btnPrimary}><Plus className="w-4 h-4" /> New post</button>
      </div>

      {flash && <div className="mb-4"><Notice tone="ok">{flash}</Notice></div>}
      {error && <div className="mb-4"><Notice tone="error">{error}</Notice></div>}

      <div className="flex flex-col sm:flex-row gap-3 sm:items-center justify-between mb-4">
        <div className="flex gap-1.5 overflow-x-auto">
          {[['all', 'All'], ['live', 'Live'], ['scheduled', 'Scheduled'], ['draft', 'Drafts']].map(([key, label]) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`whitespace-nowrap px-3.5 py-1.5 text-sm border transition cursor-pointer ${filter === key ? 'bg-[#1a4f6d] border-[#1a4f6d] text-white' : 'bg-white border-slate-300 hover:border-[#1a4f6d]'}`}
            >
              {label} <span className="opacity-70">({counts[key]})</span>
            </button>
          ))}
        </div>
        <label className="relative sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input type="search" placeholder="Search titles" value={query} onChange={(e) => setQuery(e.target.value)} className={`${input} pl-9 py-2`} />
        </label>
      </div>

      <div className="bg-white border border-slate-200">
        {posts === null ? (
          <div className="p-10 flex justify-center text-slate-400"><Loader2 className="w-6 h-6 animate-spin" /></div>
        ) : visible.length === 0 ? (
          <div className="p-10 text-center text-slate-500">
            {posts.length === 0 ? 'No posts yet. Create the first one.' : 'No posts match this filter.'}
          </div>
        ) : (
          <ul className="divide-y divide-slate-200">
            {visible.map((p) => {
              const st = STATE_STYLE[stateOf(p)];
              return (
                <li key={p.id} className="flex items-center gap-4 p-4 hover:bg-slate-50">
                  <img src={p.image_url || '/images/assosa-city.jpg'} alt="" className="w-20 h-14 object-cover bg-slate-200 shrink-0 hidden sm:block" />
                  <button onClick={() => onEdit(p)} className="flex-1 min-w-0 text-left cursor-pointer">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className={`text-xs font-semibold border px-2 py-0.5 ${st.cls}`}>{st.label}</span>
                      <span className="text-xs text-slate-500">{CATEGORY_LABELS[p.category]}</span>
                      {p.featured && <span className="inline-flex items-center gap-1 text-xs text-amber-700"><Star className="w-3 h-3 fill-current" />Featured</span>}
                      {!p.title_am?.trim() && <span className="text-xs text-slate-400">No Amharic</span>}
                    </div>
                    <div className="font-medium text-slate-900 truncate">{p.title_en}</div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      {stateOf(p) === 'draft' ? `Edited ${fmt(p.updated_at)}` : `${stateOf(p) === 'scheduled' ? 'Goes live' : 'Published'} ${fmt(p.published_at)}`}
                      {p.author_email && ` · ${p.author_email}`}
                    </div>
                  </button>
                  <div className="flex items-center gap-1 shrink-0">
                    <button onClick={() => onEdit(p)} className="p-2 text-slate-500 hover:text-[#1a4f6d] cursor-pointer" aria-label={`Edit ${p.title_en}`}><Pencil className="w-4 h-4" /></button>
                    <button onClick={() => remove(p)} className="p-2 text-slate-500 hover:text-red-600 cursor-pointer" aria-label={`Delete ${p.title_en}`}><Trash2 className="w-4 h-4" /></button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

/* ---------- Editor ---------- */
function Field({ label, hint, children }) {
  return (
    <label className="block">
      <span className="flex items-baseline justify-between gap-3 mb-1.5">
        <span className="text-sm font-semibold text-[#1a4f6d]">{label}</span>
        {hint && <span className="text-xs text-slate-400">{hint}</span>}
      </span>
      {children}
    </label>
  );
}

function PostEditor({ post, user, onDone }) {
  const isNew = !post.id;
  const [form, setForm] = useState({ ...EMPTY_POST, ...post });
  const [lang, setLang] = useState('en');
  const [mode, setMode] = useState(() => (isNew ? 'draft' : { live: 'now', scheduled: 'schedule', draft: 'draft' }[stateOf(post)]));
  const [scheduleAt, setScheduleAt] = useState(toLocalInput(post.published_at && new Date(post.published_at) > new Date() ? post.published_at : null));
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const fileRef = useRef(null);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }));

  const upload = async (file) => {
    if (!file) return;
    setUploading(true);
    setError('');
    try {
      const blob = await prepareImage(file);
      const path = `${new Date().toISOString().slice(0, 10)}/${crypto.randomUUID()}.jpg`;
      const { error: err } = await supabase.storage.from(NEWS_BUCKET).upload(path, blob, { contentType: 'image/jpeg', cacheControl: '31536000' });
      if (err) throw err;
      const { data } = supabase.storage.from(NEWS_BUCKET).getPublicUrl(path);
      setForm((f) => ({ ...f, image_url: data.publicUrl }));
    } catch (e) {
      setError(e.message || 'Upload failed.');
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  const save = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.title_en.trim()) {
      setLang('en');
      return setError('An English title is required.');
    }
    if (mode !== 'draft' && !form.summary_en.trim()) {
      setLang('en');
      return setError('Add an English summary before publishing — it is shown on news cards.');
    }
    let status = 'draft';
    let published_at = post.published_at || null;
    if (mode === 'now') {
      status = 'published';
      published_at = post.status === 'published' && stateOf(post) === 'live' ? post.published_at : new Date().toISOString();
    } else if (mode === 'schedule') {
      const when = new Date(scheduleAt);
      if (Number.isNaN(when.getTime())) return setError('Choose a valid publish date and time.');
      status = 'published';
      published_at = when.toISOString();
    }

    setBusy(true);
    const payload = {
      category: form.category,
      featured: form.featured,
      image_url: form.image_url || null,
      title_en: form.title_en.trim(), summary_en: form.summary_en.trim(), body_en: form.body_en.trim(),
      title_am: form.title_am.trim(), summary_am: form.summary_am.trim(), body_am: form.body_am.trim(),
      status,
      published_at,
    };
    if (isNew) Object.assign(payload, { author_id: user.id, author_email: user.email });

    const query = isNew ? supabase.from('news').insert(payload).select().single() : supabase.from('news').update(payload).eq('id', post.id).select().single();
    const { data, error: err } = await query;
    if (err) {
      setBusy(false);
      return setError(err.message);
    }
    // Only one featured story at a time
    if (data.featured) await supabase.from('news').update({ featured: false }).neq('id', data.id).eq('featured', true);
    setBusy(false);
    const verb = mode === 'draft' ? 'Draft saved' : mode === 'schedule' ? `Scheduled for ${fmt(published_at)}` : 'Published';
    onDone(`${verb}: “${data.title_en}”`);
  };

  const L = lang === 'en' ? { t: 'title_en', s: 'summary_en', b: 'body_en' } : { t: 'title_am', s: 'summary_am', b: 'body_am' };
  const amDone = form.title_am.trim() && form.summary_am.trim();

  return (
    <form onSubmit={save}>
      <div className="flex items-center justify-between gap-4 mb-6">
        <button type="button" onClick={() => onDone()} className="inline-flex items-center gap-1.5 text-sm text-slate-600 hover:text-[#1a4f6d] cursor-pointer">
          <ArrowLeft className="w-4 h-4" /> All posts
        </button>
        <h1 className="font-serif text-2xl text-[#1a4f6d]">{isNew ? 'New post' : 'Edit post'}</h1>
      </div>

      {error && <div className="mb-4"><Notice tone="error">{error}</Notice></div>}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Content */}
        <section className="lg:col-span-2 bg-white border border-slate-200">
          <div className="flex border-b border-slate-200" role="tablist">
            {[['en', 'English', true], ['am', 'አማርኛ (Amharic)', amDone]].map(([key, label, done]) => (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={lang === key}
                onClick={() => setLang(key)}
                className={`relative px-5 py-3.5 text-sm font-semibold cursor-pointer ${lang === key ? 'text-[#1a4f6d]' : 'text-slate-500 hover:text-slate-800'}`}
              >
                {label}
                {key === 'am' && <span className={`ml-2 inline-block w-2 h-2 rounded-full ${done ? 'bg-emerald-500' : 'bg-slate-300'}`} title={done ? 'Amharic added' : 'Amharic missing — English will be shown'} />}
                {lang === key && <span className="absolute left-0 right-0 bottom-0 h-[3px] bg-[#dab26a]" />}
              </button>
            ))}
          </div>
          <div className="p-5 sm:p-6 space-y-5" lang={lang}>
            {lang === 'am' && !amDone && (
              <Notice>Optional. If the Amharic title or summary is empty, Amharic readers see the English version.</Notice>
            )}
            <Field label="Title" hint={`${form[L.t].length}/160`}>
              <input value={form[L.t]} onChange={set(L.t)} maxLength={160} className={`${input} font-serif text-lg`} required={lang === 'en'} />
            </Field>
            <Field label="Summary" hint="Shown on news cards · 1–2 sentences">
              <textarea value={form[L.s]} onChange={set(L.s)} rows={3} maxLength={400} className={input} />
            </Field>
            <Field label="Full article" hint="Leave a blank line between paragraphs">
              <textarea value={form[L.b]} onChange={set(L.b)} rows={14} className={`${input} leading-relaxed`} />
            </Field>
          </div>
        </section>

        {/* Settings */}
        <aside className="space-y-6">
          <section className="bg-white border border-slate-200 p-5 space-y-4">
            <h2 className="text-sm font-semibold text-slate-900">Publishing</h2>
            {[
              ['draft', FileText, 'Save as draft', 'Not visible on the site'],
              ['now', Globe, isNew || stateOf(post) !== 'live' ? 'Publish now' : 'Keep published', 'Visible immediately'],
              ['schedule', CalendarClock, 'Schedule', 'Goes live automatically'],
            ].map(([key, Icon, label, desc]) => (
              <label key={key} className={`flex items-start gap-3 p-3 border cursor-pointer transition ${mode === key ? 'border-[#1a4f6d] bg-[#1a4f6d]/5' : 'border-slate-200 hover:border-slate-300'}`}>
                <input type="radio" name="mode" value={key} checked={mode === key} onChange={() => setMode(key)} className="mt-1 accent-[#1a4f6d]" />
                <span>
                  <span className="flex items-center gap-1.5 text-sm font-semibold text-slate-900"><Icon className="w-4 h-4 text-[#1a4f6d]" />{label}</span>
                  <span className="block text-xs text-slate-500">{desc}</span>
                </span>
              </label>
            ))}
            {mode === 'schedule' && (
              <Field label="Publish on" hint="Your local time">
                <input type="datetime-local" value={scheduleAt} onChange={(e) => setScheduleAt(e.target.value)} className={input} required />
              </Field>
            )}
            <button type="submit" disabled={busy || uploading} className={`${btnPrimary} w-full py-3`}>
              {busy && <Loader2 className="w-4 h-4 animate-spin" />}
              {mode === 'draft' ? 'Save draft' : mode === 'schedule' ? 'Schedule post' : isNew ? 'Publish' : 'Save & publish'}
            </button>
          </section>

          <section className="bg-white border border-slate-200 p-5 space-y-4">
            <h2 className="text-sm font-semibold text-slate-900">Details</h2>
            <Field label="Category">
              <select value={form.category} onChange={set('category')} className={input}>
                {CATEGORIES.map((c) => <option key={c} value={c}>{CATEGORY_LABELS[c]}</option>)}
              </select>
            </Field>
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" checked={form.featured} onChange={set('featured')} className="mt-1 accent-[#1a4f6d]" />
              <span>
                <span className="flex items-center gap-1.5 text-sm font-semibold text-slate-900"><Star className="w-4 h-4 text-amber-500" />Featured story</span>
                <span className="block text-xs text-slate-500">Shown as the headline story. Replaces the current featured post.</span>
              </span>
            </label>
          </section>

          <section className="bg-white border border-slate-200 p-5 space-y-3">
            <h2 className="text-sm font-semibold text-slate-900">Cover photo</h2>
            {form.image_url ? (
              <div className="relative">
                <img src={form.image_url} alt="" className="w-full aspect-[16/10] object-cover bg-slate-200" />
                <button type="button" onClick={() => setForm((f) => ({ ...f, image_url: '' }))} className="absolute top-2 right-2 w-8 h-8 inline-flex items-center justify-center bg-white/90 hover:bg-white text-slate-700 cursor-pointer" aria-label="Remove photo">
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                disabled={uploading}
                className="w-full aspect-[16/10] border-2 border-dashed border-slate-300 hover:border-[#1a4f6d] flex flex-col items-center justify-center gap-2 text-slate-500 hover:text-[#1a4f6d] transition cursor-pointer"
              >
                {uploading ? <Loader2 className="w-6 h-6 animate-spin" /> : <ImagePlus className="w-6 h-6" />}
                <span className="text-sm">{uploading ? 'Uploading…' : 'Upload photo'}</span>
                <span className="text-xs text-slate-400">JPG, PNG or WebP · resized automatically</span>
              </button>
            )}
            {form.image_url && (
              <button type="button" onClick={() => fileRef.current?.click()} disabled={uploading} className={`${btnGhost} w-full`}>
                {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ImagePlus className="w-4 h-4" />} Replace photo
              </button>
            )}
            <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={(e) => upload(e.target.files?.[0])} />
          </section>

          {!isNew && stateOf(post) === 'live' && (
            <a href="/#/news" target="_blank" rel="noopener noreferrer" className={`${btnGhost} w-full`}>
              <Eye className="w-4 h-4" /> View on site
            </a>
          )}
        </aside>
      </div>
    </form>
  );
}

/* ---------- Root ---------- */
export default function AdminApp() {
  const [session, setSession] = useState(undefined); // undefined = loading
  const [isAdmin, setIsAdmin] = useState(null);
  const [editing, setEditing] = useState(null); // null = list, {} = new, row = edit
  const [flash, setFlash] = useState('');

  useEffect(() => {
    document.title = 'News Admin | Office of the Regional President';
    const robots = document.createElement('meta');
    robots.name = 'robots';
    robots.content = 'noindex, nofollow';
    document.head.appendChild(robots);
    return () => robots.remove();
  }, []);

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session) {
      setIsAdmin(null);
      return;
    }
    supabase
      .from('admins')
      .select('user_id')
      .eq('user_id', session.user.id)
      .maybeSingle()
      .then(({ data }) => setIsAdmin(Boolean(data)));
  }, [session]);

  if (!supabase) return <SetupRequired />;
  if (session === undefined || (session && isAdmin === null)) {
    return <Shell><div className="flex justify-center py-24 text-slate-400"><Loader2 className="w-7 h-7 animate-spin" /></div></Shell>;
  }
  if (!session) return <Login />;

  const signOut = () => supabase.auth.signOut();

  if (!isAdmin) {
    return (
      <Shell user={session.user} onSignOut={signOut}>
        <div className="max-w-md mx-auto bg-white border border-slate-200 p-8 text-center">
          <h1 className="font-serif text-2xl text-[#1a4f6d] mb-3">No publishing access</h1>
          <p className="text-slate-600">{session.user.email} is signed in but is not on the staff list. Ask the site administrator to add you.</p>
        </div>
      </Shell>
    );
  }

  return (
    <Shell user={session.user} onSignOut={signOut}>
      {editing ? (
        <PostEditor
          post={editing}
          user={session.user}
          onDone={(message) => {
            setEditing(null);
            setFlash(message || '');
            window.scrollTo({ top: 0 });
          }}
        />
      ) : (
        <PostList
          flash={flash}
          onNew={() => { setFlash(''); setEditing({}); }}
          onEdit={(p) => { setFlash(''); setEditing(p); }}
        />
      )}
    </Shell>
  );
}

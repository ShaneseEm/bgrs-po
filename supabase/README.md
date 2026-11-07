# News admin — setup

Staff publish news at **https://bgrs-po.vercel.app/admin**. Posts are stored in Supabase; the public site reads only published posts. Until Supabase is connected, the site shows the built-in sample articles.

## One-time setup (about 10 minutes)

1. **Create the project** — sign in at [supabase.com](https://supabase.com), choose *New project*, pick a region close to Ethiopia (e.g. *Frankfurt* or *Mumbai*), and set a database password.
2. **Create the tables** — open *SQL Editor → New query*, paste the contents of [`schema.sql`](schema.sql), and click *Run*.
3. **Lock down sign-ups** — *Authentication → Sign In / Providers*: turn **off** “Allow new users to sign up”. Staff accounts are created by you (step 5).
4. **Connect the website** — copy *Project Settings → API → Project URL* and the *anon public* key. In Vercel: *Project → Settings → Environment Variables*, add both for Production, Preview and Development, then redeploy:
   ```
   VITE_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-public-key
   ```
   For local development, put the same two lines in a `.env.local` file (it is git-ignored).
5. **Add staff** — for each person: *Authentication → Users → Add user*, enter their email and a password, tick *Auto Confirm User*. Then in the SQL Editor run:
   ```sql
   insert into public.admins (user_id, email, full_name)
   select id, email, 'Full Name' from auth.users where email = 'staff@example.com'
   on conflict (user_id) do nothing;
   ```
   To remove someone: `delete from public.admins where email = 'staff@example.com';`

## How publishing works

| Choice in the editor | Result |
|---|---|
| Save as draft | Saved, not visible on the site |
| Publish now | Visible immediately on News, Home and Search |
| Schedule | Becomes visible automatically at the chosen time (no extra service needed) |

- **Amharic** fields are optional; if empty, Amharic readers see the English text.
- **Featured** puts the post in the headline slot; only one post is featured at a time.
- **Photos** are resized in the browser (max 1600 px) and stored in the `news-images` bucket.
- Once at least one post is live, the built-in sample articles are no longer shown.

## Security model

- The `anon` key is safe to expose in the browser; access is enforced by Row Level Security in `schema.sql`.
- Visitors can read only posts with `status = 'published'` and a publish time in the past.
- Only users listed in `public.admins` can create, edit, delete posts or upload images — other signed-in users are refused by the database, not just the UI.

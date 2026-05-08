# Vercel deployment

Single deploy: frontend (Vite) + backend (`/api/*` serverless functions) on the same project.

## 1. Push to GitHub

Already on `main` at https://github.com/SyedImtiyaz-1/serious-business-clone. Vercel imports from there.

## 2. Create the Vercel project

1. Go to https://vercel.com/new and import the GitHub repo.
2. Framework preset auto-detects **Vite**. Leave the build/output defaults.
3. Click **Deploy**. The first deploy will succeed but the admin will fail because env vars aren't set yet.

## 3. Set environment variables

In **Project Settings → Environment Variables**, add the following for **Production / Preview / Development**:

| Variable | Value |
| --- | --- |
| `MONGO_URI` | your Mongo Atlas SRV connection string |
| `ADMIN_KEY` | `234583419264838` (matches `KEY` in `src/pages/AdminPanel.jsx`) |
| `IMAGEKIT_PUBLIC_KEY` | from ImageKit dashboard → Developer → API Keys |
| `IMAGEKIT_PRIVATE_KEY` | same — keep secret |
| `IMAGEKIT_URL_ENDPOINT` | `https://ik.imagekit.io/100xprojects` (or your own ImageKit ID) |

Then **Redeploy** the latest deployment so it picks up the new vars.

## 4. Mongo Atlas — allow Vercel IPs

Atlas blocks unknown IPs by default. In Atlas → Network Access:

- Add `0.0.0.0/0` (allow from anywhere) — simplest. Acceptable when the database has strong auth.
- Or follow Vercel's IP allow-list guide: https://vercel.com/guides/using-databases-with-vercel

Without this, the `/api/admin/pages/*` endpoints will return 500 with a `getaddrinfo` or timeout error.

## 5. Smoke test the deploy

Visit your Vercel URL:

- `https://<project>.vercel.app/` — public site loads, hero copy comes from MongoDB.
- `https://<project>.vercel.app/api/admin/pages/home` — returns the home page JSON.
- `https://<project>.vercel.app/#/admin-change-marashall` — admin loads.
- In admin, edit a field, click Save, hard-refresh public site → change is live.
- Upload an image — preview should resolve to an `ik.imagekit.io/...` URL.

## 6. Local dev parity

Two ways to run the API locally:

- **Existing Express server**: `cd server && node server.js` then `npm run dev`. Vite proxies `/api/*` to `localhost:5000`. This is the path you've been using.
- **Vercel functions locally**: `npx vercel dev`. Spins up the same `/api/*` routes used in production. Reads env vars from `.env.local` (copy `.env.example`).

## File map

```
api/
  _lib/
    auth.js          x-admin-key check
    imagekit.js      ImageKit client + upload helper
    mongo.js         cached mongoose connection + PageContent model
    parseForm.js     formidable wrapper for multipart uploads
  admin/
    upload-image.js  POST → ImageKit /marshall-admin/images/
    upload-video.js  POST → ImageKit /marshall-admin/videos/
    pages/
      index.js       GET — list all pages
      [page].js      GET (public) + PUT (admin) for a single page
vercel.json          framework, function maxDuration, SPA fallback
```

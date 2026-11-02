# Pragmatic Nutrition

The website and blog dashboard run in a React frontend. A separate Node backend handles MongoDB, admin sessions, image uploads, and enquiry emails.

```text
frontend/
  src/              Website, dashboard, editor, styles and assets
  public/           Static website assets
  tests/            Frontend utility tests
  vite.config.js    Development API proxy
backend/
  api/              CMS and enquiry request handlers
  src/              HTTP server, environment loading and CMS services
  data/             Original blog content and migration source backups
  scripts/          Admin account setup and blog migration
  tests/            API, database, image and HTTP tests
shared/             Blog categories, redirects and image upload policy
api/                Thin adapters for the existing root Vercel deployment
scripts/dev.js      Starts both development processes
```

Each app declares its own dependencies in its `package.json`. npm workspaces install and link them from one root lockfile. Neither app imports source files from the other app; common browser-safe definitions come from `@pragmatic/shared`.

## Local development

Use Node 22.12+ and run these commands at the repository root:

```sh
npm install
npm run dev
```

The frontend runs at http://127.0.0.1:5174. The backend uses the `PORT` in `backend/.env` (default: http://127.0.0.1:4000); the frontend proxy must point to that port. Open `/admin` on the frontend for the blog dashboard. The frontend proxies `/api` to the backend, preserving cookie authentication and same-origin checks. Stopping the combined command stops both processes.

The existing private environment files have moved to `backend/`. For a fresh checkout, copy `backend/.env.example` to `backend/.env` and enter MongoDB and SMTP settings. Only the backend loads those files. Optional frontend proxy settings are documented in `frontend/.env.example`; never place database or mail credentials there.

To run each app in a separate terminal:

```sh
npm run dev:backend
npm run dev:frontend
```

Equivalent commands are `npm run dev --workspace backend` and `npm run dev --workspace frontend`. Change the backend port with `PORT`; if necessary, set the frontend's `BACKEND_URL` to match.

## Checks and build

```sh
npm test
npm run lint
npm run build
```

The frontend build is written to `frontend/dist`. `npm start` runs the standalone backend; `npm run preview` previews the frontend build and proxies API calls to the running backend. Backend tests use an isolated temporary MongoDB instance, never the client's configured database.

## Deployment

The existing Vercel project can keep the repository root as its project directory. Root `vercel.json` builds `frontend/dist` and root `api/` adapters invoke the implementation in `backend/`. Keep MongoDB and SMTP values in the deployment's server environment. No deployment is performed by local development commands.

For separate hosts, build the frontend from the workspace and deploy `frontend/dist`; run `npm start --workspace backend` on the backend host with `HOST=0.0.0.0`, `PORT`, and its server environment configured. Include the `shared/` workspace when installing or packaging either app. Route `/api/*` on the public website origin to the backend using your hosting reverse proxy, preserving the public Host header. Development's Vite proxy is not part of the built static site. This keeps admin sessions and uploaded image URLs working through the same website origin; direct cross-origin browser API requests are not enabled.

The public blog reads content through the backend API. Original article backups and migration input belong to the backend; MongoDB versions always take precedence, including private drafts and archived posts.

See [CMS_SETUP.md](CMS_SETUP.md) for account setup, database migration, image optimization, and the client publishing workflow.

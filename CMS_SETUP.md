# Pragmatic Nutrition blog studio

The client manages articles at `/admin`. The React frontend keeps the public blog design. The separate Node backend serves MongoDB articles through `/api/cms`, without a site rebuild. See README.md for the frontend/backend workspace layout.

## Connect the database

1. Create a MongoDB Atlas cluster, or use your existing MongoDB server. Create a dedicated database user with `readWrite` access to the `pragmatic_nutrition` database. Configure the cluster's network access for your application host.
2. Copy `backend/.env.example` to `backend/.env.local` if you do not already have a local environment file. Keep existing SMTP settings. Set these **server-only** variables:

   ```dotenv
   MONGODB_URI=mongodb+srv://<database-user>:<encoded-password>@<cluster>/pragmatic_nutrition
   MONGODB_DB=pragmatic_nutrition
   ```

   Never use a `VITE_` prefix: that would expose the connection string to visitors. Keep environment files out of Git. Use a URI-encoded database password.

3. Create the client's login interactively:

   ```sh
   npm run cms:create-admin
   ```

   Enter the client's name, email, and a password of at least 12 characters. The password is masked and stored as a salted scrypt hash. There is no public registration or default production account. For a forgotten password, run `npm run cms:create-admin -- --reset-password` and enter the same email; this also revokes existing sessions.

4. Run `npm install` at the repository root, then start both apps with `npm run dev`. Open `http://127.0.0.1:5174/admin`. The backend runs separately at `http://127.0.0.1:4000`. The frontend proxies `/api` requests to it. Use `npm run dev:frontend` and `npm run dev:backend` for separate terminals.

## Publish on the existing Vercel project

Use Node 24 and add `NODE_OPTIONS=--experimental-require-module` to the Vercel Production environment. This enables the ES module parser required by the HTML sanitizer; Vercel disables this Node feature by default. [Vercel's runtime documentation](https://vercel.com/docs/functions/runtimes/node-js/advanced-node-configuration#experimental-nodejs-require-of-es-module) describes the setting. If you configure the CMS for Preview deployments, add the option there as well. Database credentials can remain Production-only for the demo.

Set `MONGODB_URI` and `MONGODB_DB` in the project's environment variables, alongside its existing SMTP settings. Deploy the code using the project's usual process. The root `vercel.json` builds `frontend/dist`; thin adapters in root `api/` invoke handlers from `backend/api/`. Full legacy article files are included from `backend/data/blog/`. Keep the Vercel project root at the repository root. Use HTTPS in production; production cookies are Secure, HttpOnly, and SameSite=Strict. Run the admin setup command against the **intended production database** before handing over access. After deployment, verify sign-in, article reads, and an image upload on the production URL.

The backend runs independently of Vite. A static host or `vite preview` needs a running backend for API requests. The frontend dev/preview proxy defaults to `http://127.0.0.1:4000`; configure `BACKEND_URL` in `frontend/.env.local` if you change it. For separately hosted production apps, route `/api/*` through the public website origin as described in README.md. Use Node 22.12+ (development verified on Node 24).

## Client workflow

- Sign in at `/admin`, choose **Write an article**, enter a title, and write or paste the content.
- The visual editor supports headings, bold/italic, links, lists, quotes, tables, images, dividers, and undo/redo. Headings automatically generate the article's contents list.
- Choose a category, add tags, and optionally add an excerpt, cover image and alt text, author/reviewer details, and search metadata.
- Choose **Draft** to keep an article private or **Published** to make it visible immediately, then click the corresponding save button. Publication happens only when you explicitly save with Published selected.
- **Preview** shows the current unsaved title, image, and content with the site's typography and colours.
- **History** keeps the previous 20 saved versions. Restoring loads a private draft; review and save it before publishing again.
- **Archived** hides an article while retaining its content. To restore it, open the Archived tab, edit it, and choose Draft or Published.
- Browser recovery keeps an unsaved local copy after editing pauses. It is specific to that browser and device, and is separate from a MongoDB save. The editor warns before closing a tab with unsaved changes.
- Choose JPEG, PNG, or WebP images up to 15 MB (60 megapixels maximum). Large files are resized in the browser before transfer. The server validates and decodes each upload, corrects orientation, strips metadata, and stores an optimized WebP in MongoDB GridFS. Images preserve their proportions and transparency, with a maximum edge of 1600 pixels and no upscaling. Larger outputs are compressed further, targeting 500 KB. Upload confirmation shows the saved size and percentage reduction. This applies to covers, inline article images, and the media library. The library shows saved size and dimensions for the latest 100 uploads. Existing images and pasted external image URLs remain unchanged.

## Existing articles and URLs

Import all 151 complete existing articles into the configured MongoDB database:

```sh
npm run cms:migrate-blogs -- --dry-run
npm run cms:migrate-blogs
```

The migration validates every source file before writing, then verifies each inserted article against its source. It preserves full HTML, headings, all categories and tags, original dates, metadata, image URLs, and slugs. Imported articles are published and immediately editable in the dashboard. Existing managed articles (including renamed articles with old URL aliases) are skipped, preserving client edits and publication states. Rerunning the command is safe and resumes an interrupted import. Original source backups live in `backend/data/blog/`; MongoDB versions take precedence. The frontend retrieves both managed and fallback content through the backend API. Existing image URLs are retained; this command does not copy external image files into GridFS.

Before migration, bundled articles appear in the admin automatically. Opening one loads its complete content; its first save creates a managed version and preserves the original in revision history. Old admin editor links continue to open the database version after migration.

Once managed in MongoDB, that article's draft or archived state overrides the bundled public copy. Changing its URL retains the old URL as an alias and the frontend navigates readers to the current URL. Reserved current and former URLs cannot be reused by another article. Existing legacy redirects are preserved.

Without a configured database, the backend serves the bundled public articles through its API and admin sign-in shows a setup message. A configured database outage returns an error rather than silently re-publishing bundled copies of archived articles.

## Operations and boundaries

- The initial release uses administrator accounts. Contributor roles, multi-stage approvals, email password reset, and collaborative editing are not included.
- A revision number prevents one editor tab from overwriting newer changes saved in another tab.
- Sessions expire after eight hours. Login attempts are rate limited in MongoDB. HTML is sanitized on the server before saving. Mutation endpoints require a same-origin custom header.
- Enable database backups in your database provider. Revision history is not a replacement for a database backup; media and article data live in the same database.
- Browser page titles, descriptions, canonical links, social tags, and BlogPosting structured data use the article's metadata. The existing site is a client-rendered SPA: crawler-visible HTML/prerendering and a dynamic sitemap are separate follow-up work if full crawler coverage is required.

## Verification

```sh
npm test
npm run lint
npm run build
```

CMS tests run against an isolated, temporary MongoDB instance using `mongodb-memory-server`; its first run downloads an official MongoDB binary. They do not connect to the database configured for the client's site. Coverage includes authentication, origin checks, rate limiting, draft privacy, publication, retired-status privacy, revisions, stale-save conflicts, old URL aliases, legacy overrides, sanitization, image optimization, GridFS uploads/downloads, complete article migration, legacy admin links, and standalone HTTP routing. Frontend utility tests run separately in the frontend workspace.

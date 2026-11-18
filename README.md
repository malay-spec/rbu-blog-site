# RBU Mohali admission guides (2027)

Live site: https://rbu-blog-site2.vercel.app

## How the site works

- Every article is one file in the `posts` folder.
- When you upload to GitHub, Vercel builds the website by itself in about 2 minutes.
- The home page, the article list, the sitemap and the Riya links are all made automatically.
- Files starting with an underscore (like `_TEMPLATE.md`) are never published.

## Adding the weekly blog (every Friday)

1. Open the GitHub repository and go into the `posts` folder.
2. Click **Add file**, then **Upload files**, and drop in the new article file (for example `bca-salary-guide-2027.md`).
3. Click **Commit changes**.
4. Wait about 2 minutes, then open the new address, for example https://rbu-blog-site2.vercel.app/bca-salary-guide-2027
5. In Google Search Console, paste that address into **URL inspection** and click **Request indexing**.

## If something goes wrong

If an article file has a mistake (for example a missing title), Vercel stops and the live site stays as it was. In Vercel, open the failed deployment: the message starting with `BUILD STOPPED` says which file and what to fix.

## Article file names

Lowercase letters, numbers and hyphens only, ending in `.md`. The file name becomes the web address, so choose words students search for.

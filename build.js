// Builds the RBU Mohali admission guides site.
// Vercel runs this automatically on every upload: it reads every .md file in /posts
// and writes the finished website into /dist (home page, one page per article,
// sitemap.xml and robots.txt). No packages to install.

const fs = require("fs");
const path = require("path");

const SITE = {
  url: "https://rbu-blog-site2.vercel.app",
  name: "RBU Mohali admission guides",
  riya: "https://mohali-alpha.vercel.app/",
  leadForm: "https://rbu-lead-form.vercel.app/",
  googleVerification: "uVPEeyAqXHp8vKzKpxEQKJJTMTgm2kK8YUbtK9ycDPA",
  admissionYear: "2027",
};

const ROOT = __dirname;
const POSTS = path.join(ROOT, "posts");
const OUT = path.join(ROOT, "dist");

// ---------- helpers ----------
const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function inline(text) {
  let s = esc(text);
  s = s.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  s = s.replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, (m, label, url) => {
    const external = !url.startsWith(SITE.url);
    return `<a href="${url}"${external ? ' target="_blank" rel="noopener"' : ""}>${label}</a>`;
  });
  return s;
}

const riyaLink = (campaign) =>
  `${SITE.riya}?utm_source=blog&utm_medium=article&utm_campaign=${encodeURIComponent(campaign)}`;

function formatDate(iso) {
  const d = new Date(iso + "T00:00:00Z");
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}

// ---------- reading a post ----------
function parsePost(file) {
  const raw = fs.readFileSync(path.join(POSTS, file), "utf8").replace(/\r\n/g, "\n");
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) throw new Error(`${file}: the top section between the two --- lines is missing.`);
  const meta = {};
  for (const line of m[1].split("\n")) {
    const i = line.indexOf(":");
    if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  }
  for (const key of ["title", "description", "date"]) {
    if (!meta[key]) throw new Error(`${file}: "${key}:" is missing in the top section.`);
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(meta.date))
    throw new Error(`${file}: date must look like 2027-01-08 (year-month-day).`);
  const slug = file.replace(/\.md$/, "");
  if (!/^[a-z0-9-]+$/.test(slug))
    throw new Error(`${file}: file names may only use lowercase letters, numbers and hyphens.`);
  const { html, faqs, intro } = renderBody(m[2]);
  return { ...meta, slug, html, faqs, intro };
}

// ---------- turning article text into HTML ----------
function renderBody(src) {
  const lines = src.split("\n");
  const out = [];
  const faqs = [];
  let inFaq = false;
  let intro = "";
  let i = 0;
  let firstPara = true;

  while (i < lines.length) {
    const line = lines[i];
    const t = line.trim();
    if (!t) { i++; continue; }

    if (t.startsWith("::: stats")) {
      const items = [];
      i++;
      while (i < lines.length && lines[i].trim() !== ":::") {
        const [value, label] = lines[i].split("|").map((s) => s.trim());
        if (value) items.push(`<div class="stat"><span class="stat-value">${esc(value)}</span><span class="stat-label">${esc(label || "")}</span></div>`);
        i++;
      }
      i++;
      out.push(`<div class="stats">${items.join("")}</div>`);
      continue;
    }
    if (t.startsWith("## ")) {
      const text = t.slice(3);
      inFaq = /frequently asked/i.test(text);
      out.push(`<h2>${inline(text)}</h2>`);
      i++; continue;
    }
    if (t.startsWith("### ")) {
      const q = t.slice(4);
      if (inFaq) {
        i++;
        while (i < lines.length && !lines[i].trim()) i++;
        const ans = [];
        while (i < lines.length && lines[i].trim() && !/^#{2,3} /.test(lines[i].trim())) { ans.push(lines[i].trim()); i++; }
        const a = ans.join(" ");
        faqs.push({ q, a });
        out.push(`<details class="faq"><summary>${inline(q)}</summary><p>${inline(a)}</p></details>`);
      } else {
        out.push(`<h3>${inline(q)}</h3>`);
        i++;
      }
      continue;
    }
    if (t.startsWith("|")) {
      const rows = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) { rows.push(lines[i].trim()); i++; }
      const cells = (r) => r.replace(/^\|/, "").replace(/\|$/, "").split("|").map((c) => c.trim());
      const head = cells(rows[0]);
      const body = rows.slice(1).filter((r) => !/^\|?\s*:?-{2,}/.test(r)).map(cells);
      out.push(
        `<div class="table-wrap"><table><thead><tr>${head.map((h) => `<th scope="col">${inline(h)}</th>`).join("")}</tr></thead><tbody>` +
          body.map((r) => `<tr>${r.map((c, k) => (k === 0 ? `<th scope="row">${inline(c)}</th>` : `<td>${inline(c)}</td>`)).join("")}</tr>`).join("") +
          `</tbody></table></div>`
      );
      continue;
    }
    if (t.startsWith(">")) {
      const parts = [];
      while (i < lines.length && lines[i].trim().startsWith(">")) { parts.push(lines[i].trim().replace(/^>\s?/, "")); i++; }
      let text = parts.join(" ");
      const label = text.match(/^\*\*(.+?):\*\*\s*(.*)$/);
      if (label) {
        out.push(`<p class="highlight"><strong>${esc(label[1])}</strong> ${inline(label[2])}</p>`);
      } else {
        text = text.replace(/^💡\s*/u, "");
        out.push(`<aside class="tip"><p>${inline(text)}</p></aside>`);
      }
      continue;
    }
    if (/^[-*] /.test(t)) {
      const items = [];
      while (i < lines.length && /^[-*] /.test(lines[i].trim())) { items.push(lines[i].trim().slice(2)); i++; }
      out.push(`<ul>${items.map((x) => `<li>${inline(x)}</li>`).join("")}</ul>`);
      continue;
    }
    if (/^\d+\. /.test(t)) {
      const items = [];
      while (i < lines.length && /^\d+\. /.test(lines[i].trim())) { items.push(lines[i].trim().replace(/^\d+\. /, "")); i++; }
      out.push(`<ol class="steps">${items.map((x) => `<li>${inline(x)}</li>`).join("")}</ol>`);
      continue;
    }
    // paragraph
    const para = [];
    while (i < lines.length && lines[i].trim() && !/^(#{2,3} |[-*] |\d+\. |>|\||::: )/.test(lines[i].trim())) { para.push(lines[i].trim()); i++; }
    const text = para.join(" ");
    if (firstPara) { intro = text; out.push(`<p class="lede">${inline(text)}</p>`); firstPara = false; }
    else out.push(`<p>${inline(text)}</p>`);
  }
  return { html: out.join("\n"), faqs, intro };
}

// ---------- page pieces ----------
function head({ title, description, canonical, type = "website", jsonld = [] }) {
  return `<!doctype html>
<html lang="en-IN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${canonical}">
<meta name="google-site-verification" content="${SITE.googleVerification}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:type" content="${type}">
<meta property="og:url" content="${canonical}">
<meta name="theme-color" content="#1a406d">
<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&family=Literata:opsz,wght@7..72,400;7..72,600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/style.css">
${jsonld.map((j) => `<script type="application/ld+json">${JSON.stringify(j)}</script>`).join("\n")}
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
<header class="site-header">
  <div class="wrap header-inner">
    <a href="/" class="brand" aria-label="RBU Mohali admission guides, home">
      <img src="/assets/rbu-alpha-logo.png" alt="Alpha School of RBU" height="40">
      <img src="/assets/sunstone-logo.png" alt="Sunstone" height="28" class="sunstone">
    </a>
    <a class="header-cta" href="${riyaLink("header")}" target="_blank" rel="noopener">Ask Riya</a>
  </div>
</header>`;
}

function foot() {
  return `<footer class="site-footer">
  <div class="wrap">
    <p><strong>Rayat Bahra University, Mohali, with Sunstone.</strong> BTech CSE and BCA admissions open for ${SITE.admissionYear}.</p>
    <p>For students from Punjab, Himachal Pradesh, Jammu and Kashmir and Chandigarh.</p>
    <p><a href="${riyaLink("footer")}" target="_blank" rel="noopener">Chat with Riya</a> <a href="${SITE.leadForm}" target="_blank" rel="noopener">Apply directly</a> <a href="https://sunstone.in" target="_blank" rel="noopener">Apply on sunstone.in</a> <a href="mailto:sunstonerbu@sunstone.in">sunstonerbu@sunstone.in</a></p>
  </div>
</footer>
</body>
</html>`;
}

function guideList(posts, campaign) {
  return `<ol class="guides" reversed>
${posts
  .map(
    (p) => `  <li class="guide">
    <a href="/${p.slug}">
      <span class="guide-tag">${esc(p.tag || "Guide")}</span>
      <span class="guide-title">${esc(p.title)}</span>
      <span class="guide-desc">${esc(p.description)}</span>
      <span class="guide-meta">${formatDate(p.date)}${p.readTime ? `, ${esc(p.readTime)}` : ""}</span>
    </a>
  </li>`
  )
  .join("\n")}
</ol>`;
}

function homePage(posts) {
  const questions = [
    "Is JEE needed for BTech CSE at RBU Mohali?",
    "Can a Commerce student do BCA?",
    "How does the NSAT scholarship work?",
  ];
  return (
    head({
      title: `BTech CSE and BCA admission guides ${SITE.admissionYear} | RBU Mohali with Sunstone`,
      description: `Honest admission guides for BTech CSE and BCA ${SITE.admissionYear} at Rayat Bahra University, Mohali, with Sunstone. For students from Punjab, Himachal Pradesh, Jammu and Kashmir and Chandigarh.`,
      canonical: SITE.url + "/",
      jsonld: [{ "@context": "https://schema.org", "@type": "WebSite", name: SITE.name, url: SITE.url + "/" }],
    }) +
    `
<main id="main">
  <section class="hero">
    <div class="wrap hero-grid">
      <div class="hero-text">
        <p class="kicker">BTech CSE and BCA admissions ${SITE.admissionYear}</p>
        <h1>The questions students ask before choosing a college, answered.</h1>
        <p class="hero-sub">Plain guides for students from Punjab, Himachal Pradesh, Jammu and Kashmir and Chandigarh. Read a guide, or ask Riya, our AI admission counsellor, anything at any hour.</p>
      </div>
      <div class="chat" aria-label="Questions you can ask Riya">
        ${questions
          .map((q) => `<a class="bubble student" href="${riyaLink("home-question")}" target="_blank" rel="noopener">${esc(q)}</a>`)
          .join("\n        ")}
        <div class="bubble riya">
          <p><strong>Riya</strong> I answer questions on fees, eligibility, placements and hostels for BTech CSE and BCA, 24/7.</p>
          <a class="button" href="${riyaLink("home-hero")}" target="_blank" rel="noopener">Chat with Riya</a>
        </div>
      </div>
    </div>
  </section>
  <section class="wrap list-section" aria-labelledby="guides-heading">
    <h2 id="guides-heading">Admission guides</h2>
    ${guideList(posts)}
  </section>
</main>
` +
    foot()
  );
}

function articlePage(post, others) {
  const canonical = `${SITE.url}/${post.slug}`;
  const jsonld = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      dateModified: post.updated || post.date,
      mainEntityOfPage: canonical,
      author: { "@type": "Organization", name: "Rayat Bahra University, Mohali with Sunstone" },
      publisher: { "@type": "Organization", name: "Rayat Bahra University, Mohali with Sunstone" },
    },
  ];
  if (post.faqs.length)
    jsonld.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: post.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a.replace(/\*\*/g, "") } })),
    });
  return (
    head({ title: `${post.title} | RBU Mohali`, description: post.description, canonical, type: "article", jsonld }) +
    `
<main id="main" class="wrap article-wrap">
  <a class="back" href="/">All admission guides</a>
  <article>
    <header class="article-head">
      <p class="kicker">${esc(post.tag || "Guide")}</p>
      <h1>${inline(post.title)}</h1>
      <p class="article-meta"><time datetime="${post.date}">${formatDate(post.date)}</time>${post.readTime ? `, ${esc(post.readTime)}` : ""}</p>
    </header>
    <div class="prose">
${post.html}
    </div>
  </article>
  <aside class="riya-box">
    <h2>Still have a question?</h2>
    <p>Riya, our AI admission counsellor, answers questions about BTech CSE and BCA at RBU Mohali any time, with no sales pressure. When you are ready, apply on sunstone.in or directly through our admission form.</p>
    <p class="riya-actions">
      <a class="button" href="${riyaLink(post.slug)}" target="_blank" rel="noopener">Chat with Riya</a>
      <a class="button ghost" href="${SITE.leadForm}" target="_blank" rel="noopener">Apply directly</a>
      <a class="button ghost" href="https://sunstone.in" target="_blank" rel="noopener">Apply on sunstone.in</a>
    </p>
  </aside>
  ${others.length ? `<section class="more" aria-labelledby="more-heading"><h2 id="more-heading">More guides</h2>${guideList(others.slice(0, 3))}</section>` : ""}
</main>
` +
    foot()
  );
}

function notFoundPage(posts) {
  return (
    head({ title: "Page not found | RBU Mohali", description: "This page does not exist.", canonical: SITE.url + "/" }) +
    `
<main id="main" class="wrap article-wrap">
  <h1>This page does not exist</h1>
  <p>The link may be old or mistyped. Pick a guide below, or go to the <a href="/">home page</a>.</p>
  ${guideList(posts)}
</main>
` +
    foot()
  );
}

// ---------- build ----------
function copyDir(from, to) {
  fs.mkdirSync(to, { recursive: true });
  for (const f of fs.readdirSync(from)) {
    const s = path.join(from, f), d = path.join(to, f);
    fs.statSync(s).isDirectory() ? copyDir(s, d) : fs.copyFileSync(s, d);
  }
}

function build() {
  fs.rmSync(OUT, { recursive: true, force: true });
  fs.mkdirSync(OUT, { recursive: true });

  const files = fs.readdirSync(POSTS).filter((f) => f.endsWith(".md") && !f.startsWith("_"));
  const posts = files.map(parsePost).sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : a.title.localeCompare(b.title)));
  const today = new Date().toISOString().slice(0, 10);
  const live = posts;

  fs.writeFileSync(path.join(OUT, "index.html"), homePage(live));
  for (const p of live) {
    fs.writeFileSync(path.join(OUT, `${p.slug}.html`), articlePage(p, live.filter((o) => o.slug !== p.slug)));
  }
  fs.writeFileSync(path.join(OUT, "404.html"), notFoundPage(live));

  const urls = [{ loc: SITE.url + "/", lastmod: live[0] ? live[0].date : today }].concat(
    live.map((p) => ({ loc: `${SITE.url}/${p.slug}`, lastmod: p.updated || p.date }))
  );
  fs.writeFileSync(
    path.join(OUT, "sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
      urls.map((u) => `  <url><loc>${u.loc}</loc><lastmod>${u.lastmod}</lastmod></url>`).join("\n") +
      `\n</urlset>\n`
  );
  fs.writeFileSync(path.join(OUT, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${SITE.url}/sitemap.xml\n`);
  copyDir(path.join(ROOT, "assets"), path.join(OUT, "assets"));

  console.log(`Built ${live.length} article(s): ${live.map((p) => p.slug).join(", ")}`);
}

try {
  build();
} catch (err) {
  console.error("\nBUILD STOPPED: " + err.message + "\nThe live website has not changed. Fix the file and upload it again.\n");
  process.exit(1);
}

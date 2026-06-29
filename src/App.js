import { useState, useEffect } from "react";

// ─── DESIGN TOKENS ───────────────────────────────────────────
const C = {
  bg: "#09091a",
  bgCard: "#0f0f24",
  bgSection: "#0c0c1f",
  purple: "#7c3aed",
  purpleLight: "#a855f7",
  purpleDim: "rgba(124,58,237,0.15)",
  gold: "#f59e0b",
  goldDim: "rgba(245,158,11,0.12)",
  red: "#ef4444",
  green: "#10b981",
  text: "#f1f0f8",
  textMuted: "rgba(241,240,248,0.55)",
  textDim: "rgba(241,240,248,0.35)",
  border: "rgba(255,255,255,0.07)",
  borderPurple: "rgba(124,58,237,0.35)",
};

// ─── BLOG DATA ───────────────────────────────────────────────
const BLOGS = [
  {
    id: "btech-vs-bca-2026",
    title: "BTech CSE vs BCA — Which is Better for You in 2026?",
    subtitle: "The most searched question by Class 12 students — answered honestly.",
    tag: "Career Guide",
    tagColor: C.purple,
    readTime: "6 min read",
    date: "June 2026",
    icon: "⚡",
    seoDesc: "Complete comparison of BTech CSE and BCA for 2026 admissions. Eligibility, career options, salary, and which program suits you best.",
    content: [
      { type: "intro", text: "Choosing between BTech CSE and BCA is one of the most confusing decisions for Class 12 students. Both lead to IT careers — but the path, fees, duration, and outcomes are very different. Here is a simple, honest breakdown to help you decide." },
      { type: "h2", text: "What is BTech CSE?" },
      { type: "p", text: "BTech Computer Science & Engineering is a 4-year engineering degree. It covers deep technical subjects like algorithms, operating systems, computer networks, AI, machine learning, and software development. You graduate as an engineer with a strong foundation in both theory and practice." },
      { type: "highlight", label: "Eligibility", text: "Class 12 with Physics, Chemistry, and Mathematics (PCM) — minimum 45% marks." },
      { type: "h2", text: "What is BCA?" },
      { type: "p", text: "BCA (Bachelor of Computer Applications) is a 3-year degree focused entirely on software development and applications. It is more practical and application-focused from day one. You learn coding, web development, databases, and modern tech tools without heavy engineering theory." },
      { type: "highlight", label: "Eligibility", text: "Class 12 in any stream — Science, Commerce, or Arts — minimum 45% marks." },
      { type: "h2", text: "BTech CSE vs BCA — Key Differences" },
      { type: "table", headers: ["Factor", "BTech CSE", "BCA"], rows: [
        ["Duration", "4 years", "3 years"],
        ["Stream Required", "PCM mandatory", "Any stream"],
        ["Focus", "Engineering + Coding", "Coding + Applications"],
        ["Depth", "Very deep technical", "Practical and applied"],
        ["Starting Salary", "Rs 4–12 LPA", "Rs 3–8 LPA"],
        ["Top Roles", "Software Engineer, AI Engineer", "Developer, Analyst, Programmer"],
      ]},
      { type: "h2", text: "Career Options After BTech CSE" },
      { type: "bullets", items: ["Software Engineer at top IT companies", "AI and Machine Learning Engineer", "Data Scientist", "Cloud Architect", "Cybersecurity Analyst", "Product Manager", "Startup Founder"] },
      { type: "stat", text: "Average starting salary in 2026: Rs 5–8 LPA. Top performers placed at Rs 12–18 LPA." },
      { type: "h2", text: "Career Options After BCA" },
      { type: "bullets", items: ["Full Stack Web Developer", "Mobile App Developer", "Data Analyst", "Software Tester", "UI/UX Designer", "Database Administrator", "Many BCA graduates pursue MCA for higher salary roles"] },
      { type: "stat", text: "Average starting salary in 2026: Rs 3.5–6 LPA. With strong portfolio, easily Rs 8–10 LPA." },
      { type: "h2", text: "Which Should YOU Choose?" },
      { type: "twoCol", left: { title: "Choose BTech CSE if:", items: ["You had PCM in Class 12", "You want an engineering degree", "You are interested in AI, ML or deep tech", "You are okay with 4 years"] }, right: { title: "Choose BCA if:", items: ["You had Commerce or Arts", "You want to start coding faster — 3 years", "You prefer practical learning", "You want to enter job market sooner"] } },
      { type: "callout", text: "Honest truth: In today's job market, your skills and portfolio matter far more than whether your degree says BTech or BCA. A BCA graduate with 5 strong projects gets hired before a BTech graduate with none." },
      { type: "h2", text: "What Makes Rayat Bahra University, Mohali Different?" },
      { type: "p", text: "At RBU Mohali, both BTech CSE and BCA are powered by Sunstone — an industry-focused education platform designed for the 2026 job market." },
      { type: "bullets", items: ["500 to 550+ hours of coding training", "5 live industry projects", "AI tools like ChatGPT, GitHub, TensorFlow built into curriculum", "6-month internship included", "1,200+ recruiter network", "Zero Cost EMI — no interest, no hidden charges", "Global Immersion Program to Dubai or Singapore", "Placement record audited by B2K Analytics — IIM Ahmedabad's official auditor"] },
      { type: "statBig", text: "1,400+ placement offers. 200+ opportunities per student. Or get your first year fee back." },
    ]
  },
  {
    id: "best-bca-colleges-punjab-2026",
    title: "Best BCA Colleges in Punjab 2026 — Complete Admission Guide",
    subtitle: "Everything students from Punjab, HP, J&K and Chandigarh need to know.",
    tag: "Admission Guide",
    tagColor: C.green,
    readTime: "8 min read",
    date: "June 2026",
    icon: "🎓",
    seoDesc: "Find the best BCA college in Punjab for 2026 admissions. Complete guide covering curriculum, placements, fees, eligibility and admission process.",
    content: [
      { type: "intro", text: "Every year thousands of students from Punjab, Himachal Pradesh, Jammu & Kashmir, and Chandigarh search for the best BCA college. This guide covers everything you need to make the right decision." },
      { type: "h2", text: "What to Look for in a BCA College" },
      { type: "bullets", items: ["Curriculum quality — updated with AI, cloud, and full stack tools?", "Placement record — audited by an independent third party?", "Coding exposure — how many hours of actual coding practice?", "Industry connections — real professionals as mentors?", "Fee and ROI — is the fee reasonable vs salary earned after?"] },
      { type: "h2", text: "Why BCA is a Smart Choice in 2026" },
      { type: "p", text: "The IT industry in India is expected to employ over 5 million people by 2026. BCA graduates with strong coding portfolios are being hired at the same companies and similar salaries as BTech engineers. BCA is 3 years, open to any stream, and directly focused on skills IT companies need today." },
      { type: "h2", text: "What a Good BCA Program Must Cover in 2026" },
      { type: "bullets", items: ["Python, C/C++, HTML, CSS from Year 1", "Data Structures and Algorithms (DSA)", "React, Node.js, SQL, MongoDB for full stack development", "AI tools — ChatGPT, GitHub Copilot, TensorFlow, Google Gemini", "Cloud computing basics — AWS", "300+ coding challenges for interview preparation", "6-month internship built in", "Mock interviews and AMCAT from early semesters"] },
      { type: "callout", text: "If a college does not offer most of these, your degree may not be competitive in the 2026 job market." },
      { type: "h2", text: "BCA at Rayat Bahra University, Mohali — Powered by Sunstone" },
      { type: "p", text: "RBU Mohali offers a next-generation BCA program designed for the 2026 job market — not an outdated curriculum from 10 years ago." },
      { type: "h3", text: "Program Highlights" },
      { type: "bullets", items: ["3-year BCA with 6-month internship built in", "500+ hours of structured coding training", "5 live industry projects — one per semester", "Daily 2-hour DSA practice", "300+ LeetCode challenges", "Career tracks: AI/ML, Full Stack, Data Science, Cloud, Cyber Security", "AI tools every year — ChatGPT, Gemini, Claude, GitHub, TensorFlow", "AMCAT from Semester 1", "100+ hours structured interview preparation"] },
      { type: "h3", text: "Industry Mentors" },
      { type: "mentors", items: [
        { name: "Ashish Jha", role: "Software Developer, Google" },
        { name: "Ketan Khatu", role: "Senior Delivery Manager, Accenture" },
        { name: "Anand Vardhan", role: "Senior Software Developer, Infosys" },
        { name: "Abhinav Agarwal", role: "CMO, BharatPe" },
      ]},
      { type: "h3", text: "Placement Record — Audited by B2K Analytics (IIM Ahmedabad)" },
      { type: "statsRow", items: [
        { value: "1,400+", label: "Placement Offers" },
        { value: "7x", label: "More Companies" },
        { value: "63%", label: "Higher ROI" },
        { value: "200+", label: "Opportunities/Student" },
      ]},
      { type: "h2", text: "Fees and Scholarships" },
      { type: "bullets", items: ["Zero Cost EMI — no interest, no collateral, no hidden charges", "72-hour digital approval", "Scholarships up to 100% through NSAT", "Exact fee details shared by counselor on WhatsApp"] },
      { type: "h2", text: "Admission Process 2026" },
      { type: "steps", items: ["Visit sunstone.in and apply for BCA at Mohali campus", "Appear for SAT (Sunstone Admission Test) + screening interview", "Submit documents", "Receive offer letter", "Accept and join!"] },
      { type: "highlight", label: "Eligibility", text: "Class 12 passed in any stream with minimum 45% marks. Science, Commerce, Arts — all welcome." },
      { type: "h2", text: "Frequently Asked Questions" },
      { type: "faqs", items: [
        { q: "Can Commerce students apply for BCA?", a: "Yes! BCA is open to students from any stream — Science, Commerce, or Arts." },
        { q: "Is BCA from RBU Mohali recognized?", a: "Yes. Rayat Bahra University is NAAC accredited and the degree is recognized by UGC." },
        { q: "What salary can I expect after BCA from RBU?", a: "Graduates are placed at Rs 3.5 to 8 LPA. Top performers with strong portfolios have received offers above Rs 10 LPA." },
        { q: "Can I pay fees in EMI?", a: "Yes — Zero Cost EMI is available. No interest, no processing fee, approval in 72 hours." },
      ]},
    ]
  },
  {
    id: "btech-cse-admission-chandigarh-2026",
    title: "BTech CSE Admission 2026 Near Chandigarh — Eligibility, Fees, Process",
    subtitle: "The complete guide for students from Chandigarh, Punjab, HP and J&K.",
    tag: "BTech Guide",
    tagColor: C.gold,
    readTime: "9 min read",
    date: "June 2026",
    icon: "💻",
    seoDesc: "BTech CSE admission 2026 near Chandigarh. Complete guide for eligibility, fees, NSAT scholarship, and admission process at RBU Mohali powered by Sunstone.",
    content: [
      { type: "intro", text: "Every year thousands of students from Chandigarh, Punjab, Himachal Pradesh, and Jammu & Kashmir search for the best BTech CSE college near Chandigarh. This guide covers everything — eligibility, fees, admission process, and what to look for." },
      { type: "h2", text: "Why BTech CSE is the Most In-Demand Degree in 2026" },
      { type: "bullets", items: ["Every industry now needs software engineers — banking, healthcare, e-commerce, manufacturing", "AI and Machine Learning jobs growing at 35% per year in India", "Average starting salary for CSE graduates: Rs 5–10 LPA", "Work from home opportunities highest in IT", "Startup culture booming — CSE graduates most likely to become founders"] },
      { type: "h2", text: "Eligibility for BTech CSE Admission 2026" },
      { type: "table", headers: ["Requirement", "Details"], rows: [
        ["Class 12 Stream", "Physics, Chemistry, Mathematics (PCM)"],
        ["Minimum Marks", "45% aggregate in PCM"],
        ["JEE", "Not mandatory at private universities"],
        ["Age Limit", "No upper age limit"],
      ]},
      { type: "h2", text: "What to Look for in a BTech CSE College Near Chandigarh" },
      { type: "bullets", items: [
        "Industry-aligned curriculum — React, Node.js, AWS, TensorFlow, Docker?",
        "500+ hours of actual coding practice — not just theory",
        "Placement record audited by independent third party",
        "6 to 9 month internship built into the program",
        "Industry mentors from Google, Accenture, Infosys — not just professors",
      ]},
      { type: "h2", text: "BTech CSE at Rayat Bahra University, Mohali — Powered by Sunstone" },
      { type: "p", text: "RBU Mohali is located just 15–20 minutes from Chandigarh. It offers a 4-year BTech CSE program powered by Sunstone, India's leading industry-focused education platform." },
      { type: "h3", text: "Year-by-Year Learning Journey" },
      { type: "table", headers: ["Year", "Focus", "Key Outcomes"], rows: [
        ["Year 1", "Programming fundamentals, logic building, first project", "Code from day one, developer mindset"],
        ["Year 2", "DSA, full-stack development, AI-assisted coding", "Build end-to-end apps, solid DSA"],
        ["Year 3", "Deep specialization + internship", "Strong portfolio, industry experience"],
        ["Year 4", "Advanced DSA, mock interviews, placement prep", "Interview-ready, job secured"],
      ]},
      { type: "h3", text: "Career Tracks — Choose One Specialization" },
      { type: "tracks", items: [
        { icon: "🤖", name: "AI & Machine Learning", tools: "TensorFlow, PyTorch, NLP, MLOps" },
        { icon: "🌐", name: "Full Stack Web Development", tools: "React, Node.js, MongoDB, Docker" },
        { icon: "📊", name: "Data Science", tools: "Pandas, PostgreSQL, Spark, AWS Redshift" },
        { icon: "☁️", name: "AWS Cloud Computing", tools: "EC2, S3, Terraform, DevOps" },
        { icon: "🔒", name: "Cyber Security", tools: "Kali Linux, Ethical Hacking, SOC" },
      ]},
      { type: "h3", text: "Placement Record — Audited by B2K Analytics (IIM Ahmedabad)" },
      { type: "statsRow", items: [
        { value: "1,400+", label: "Placement Offers" },
        { value: "7x", label: "More Companies" },
        { value: "63%", label: "Higher ROI" },
        { value: "1,170+", label: "Legacy Recruiter Offers" },
      ]},
      { type: "h2", text: "Fees and Scholarships" },
      { type: "twoCol", left: { title: "Zero Cost EMI", items: ["No interest, no processing fee", "No collateral required", "Fully digital — 72-hour approval", "Start paying after joining"] }, right: { title: "NSAT Scholarship", items: ["Up to 100% fee waiver", "Based on percentile score", "Tests aptitude & reasoning", "Equal opportunity for all"] } },
      { type: "h2", text: "Admission Process for BTech CSE at RBU Mohali 2026" },
      { type: "steps", items: [
        "Visit sunstone.in and apply for BTech at Mohali campus",
        "Option A: Register for NSAT — scholarship up to 100%",
        "Option B: Complete SAT (Sunstone Admission Test) + document verification",
        "Receive offer letter and accept admission",
      ]},
      { type: "h2", text: "Frequently Asked Questions" },
      { type: "faqs", items: [
        { q: "Is JEE required for BTech CSE at RBU Mohali?", a: "No. Admission is through Sunstone's own SAT test. JEE score is not mandatory." },
        { q: "Is the degree from RBU Mohali valid?", a: "Yes. Rayat Bahra University is NAAC accredited and all degrees are UGC recognised." },
        { q: "How far is RBU Mohali from Chandigarh?", a: "RBU Mohali is approximately 15 to 20 minutes from Chandigarh city centre." },
        { q: "Can students from Himachal Pradesh and J&K apply?", a: "Absolutely. RBU Mohali actively welcomes students from HP, J&K, Punjab, and Chandigarh." },
        { q: "Is hostel available?", a: "Yes, hostel facilities are available on campus for outstation students." },
      ]},
    ]
  }
];

// ─── COMPONENTS ──────────────────────────────────────────────

function RiyaCTA() {
  return (
    <div style={{ background: `linear-gradient(135deg, ${C.purpleDim}, rgba(245,158,11,0.08))`, border: `1px solid ${C.borderPurple}`, borderRadius: 20, padding: "28px 32px", margin: "40px 0", textAlign: "center" }}>
      <div style={{ fontSize: 36, marginBottom: 12 }}>🤖</div>
      <div style={{ color: C.text, fontSize: 20, fontWeight: 700, fontFamily: "'Outfit',sans-serif", marginBottom: 8 }}>
        Still have questions? Chat with Riya — Free!
      </div>
      <div style={{ color: C.textMuted, fontSize: 15, marginBottom: 20, lineHeight: 1.6 }}>
        Riya is our AI admission counselor available 24/7. She answers everything about BTech CSE and BCA — fees, placements, eligibility, hostel — instantly, with no sales pressure.
      </div>
      <a href="https://mohali-alpha.vercel.app" target="_blank" rel="noopener noreferrer"
        style={{ display: "inline-block", background: "linear-gradient(135deg, #7c3aed, #ef4444)", color: "#fff", padding: "14px 32px", borderRadius: 50, fontWeight: 700, fontSize: 16, textDecoration: "none", boxShadow: "0 8px 24px rgba(124,58,237,0.4)" }}>
        Chat with Riya Now →
      </a>
    </div>
  );
}

function ContentRenderer({ blocks }) {
  return (
    <div>
      {blocks.map((block, i) => {
        if (block.type === "intro") return (
          <p key={i} style={{ fontSize: 18, lineHeight: 1.8, color: C.textMuted, marginBottom: 32, fontStyle: "italic", borderLeft: `3px solid ${C.purple}`, paddingLeft: 20 }}>{block.text}</p>
        );
        if (block.type === "h2") return (
          <h2 key={i} style={{ fontSize: 24, fontWeight: 700, color: C.text, fontFamily: "'Outfit',sans-serif", margin: "40px 0 16px", paddingBottom: 10, borderBottom: `1px solid ${C.border}` }}>{block.text}</h2>
        );
        if (block.type === "h3") return (
          <h3 key={i} style={{ fontSize: 18, fontWeight: 600, color: C.purpleLight, fontFamily: "'Outfit',sans-serif", margin: "28px 0 12px" }}>{block.text}</h3>
        );
        if (block.type === "p") return (
          <p key={i} style={{ fontSize: 16, lineHeight: 1.8, color: C.textMuted, marginBottom: 20 }}>{block.text}</p>
        );
        if (block.type === "highlight") return (
          <div key={i} style={{ background: C.purpleDim, border: `1px solid ${C.borderPurple}`, borderRadius: 12, padding: "12px 18px", marginBottom: 20, display: "flex", gap: 10, alignItems: "flex-start" }}>
            <span style={{ color: C.purpleLight, fontWeight: 700, fontSize: 14, whiteSpace: "nowrap" }}>{block.label}:</span>
            <span style={{ color: C.text, fontSize: 15, lineHeight: 1.6 }}>{block.text}</span>
          </div>
        );
        if (block.type === "bullets") return (
          <ul key={i} style={{ listStyle: "none", marginBottom: 24 }}>
            {block.items.map((item, j) => (
              <li key={j} style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "6px 0", color: C.textMuted, fontSize: 15, lineHeight: 1.7 }}>
                <span style={{ color: C.purple, fontSize: 18, lineHeight: 1.5, flexShrink: 0 }}>▸</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        );
        if (block.type === "callout") return (
          <div key={i} style={{ background: C.goldDim, border: `1px solid rgba(245,158,11,0.25)`, borderRadius: 14, padding: "16px 20px", margin: "24px 0", display: "flex", gap: 12 }}>
            <span style={{ fontSize: 20 }}>💡</span>
            <p style={{ color: "#fcd34d", fontSize: 15, lineHeight: 1.7, fontStyle: "italic" }}>{block.text}</p>
          </div>
        );
        if (block.type === "stat") return (
          <div key={i} style={{ background: C.purpleDim, borderRadius: 12, padding: "12px 18px", marginBottom: 20 }}>
            <p style={{ color: C.purpleLight, fontSize: 15, fontWeight: 500 }}>📊 {block.text}</p>
          </div>
        );
        if (block.type === "statBig") return (
          <div key={i} style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.2), rgba(239,68,68,0.1))", border: `1px solid ${C.borderPurple}`, borderRadius: 16, padding: "20px 24px", margin: "24px 0", textAlign: "center" }}>
            <p style={{ color: C.text, fontSize: 17, fontWeight: 600, lineHeight: 1.7 }}>🏆 {block.text}</p>
          </div>
        );
        if (block.type === "table") return (
          <div key={i} style={{ overflowX: "auto", marginBottom: 28 }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
              <thead>
                <tr>
                  {block.headers.map((h, j) => (
                    <th key={j} style={{ background: C.purple, color: "#fff", padding: "12px 16px", textAlign: "left", fontWeight: 600, fontSize: 13 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row, j) => (
                  <tr key={j} style={{ background: j % 2 === 0 ? C.bgCard : "rgba(124,58,237,0.05)" }}>
                    {row.map((cell, k) => (
                      <td key={k} style={{ padding: "11px 16px", color: k === 0 ? C.text : C.textMuted, borderBottom: `1px solid ${C.border}`, fontWeight: k === 0 ? 600 : 400, fontSize: 14 }}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        if (block.type === "statsRow") return (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12, margin: "24px 0" }}>
            {block.items.map((s, j) => (
              <div key={j} style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 14, padding: "18px", textAlign: "center" }}>
                <div style={{ fontSize: 28, fontWeight: 800, color: C.purpleLight, fontFamily: "'Outfit',sans-serif" }}>{s.value}</div>
                <div style={{ fontSize: 12, color: C.textDim, marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        );
        if (block.type === "twoCol") return (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, margin: "24px 0" }}>
            {[block.left, block.right].map((col, j) => (
              <div key={j} style={{ background: C.bgCard, border: `1px solid ${j === 0 ? C.borderPurple : "rgba(16,185,129,0.3)"}`, borderRadius: 14, padding: "18px" }}>
                <div style={{ color: j === 0 ? C.purpleLight : C.green, fontWeight: 700, fontSize: 14, marginBottom: 12 }}>{col.title}</div>
                {col.items.map((item, k) => (
                  <div key={k} style={{ display: "flex", gap: 8, marginBottom: 8, alignItems: "flex-start" }}>
                    <span style={{ color: j === 0 ? C.purple : C.green, flexShrink: 0 }}>✓</span>
                    <span style={{ color: C.textMuted, fontSize: 13, lineHeight: 1.5 }}>{item}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        );
        if (block.type === "mentors") return (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, margin: "20px 0" }}>
            {block.items.map((m, j) => (
              <div key={j} style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 12, padding: "14px 16px", display: "flex", gap: 12, alignItems: "center" }}>
                <div style={{ width: 38, height: 38, borderRadius: "50%", background: C.purpleDim, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>👤</div>
                <div>
                  <div style={{ color: C.text, fontWeight: 600, fontSize: 14 }}>{m.name}</div>
                  <div style={{ color: C.textDim, fontSize: 12, marginTop: 2 }}>{m.role}</div>
                </div>
              </div>
            ))}
          </div>
        );
        if (block.type === "tracks") return (
          <div key={i} style={{ display: "flex", flexDirection: "column", gap: 10, margin: "20px 0" }}>
            {block.items.map((t, j) => (
              <div key={j} style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 12, padding: "14px 18px", display: "flex", gap: 14, alignItems: "center" }}>
                <span style={{ fontSize: 24 }}>{t.icon}</span>
                <div>
                  <div style={{ color: C.text, fontWeight: 600, fontSize: 15 }}>{t.name}</div>
                  <div style={{ color: C.textDim, fontSize: 12, marginTop: 3 }}>{t.tools}</div>
                </div>
              </div>
            ))}
          </div>
        );
        if (block.type === "steps") return (
          <div key={i} style={{ margin: "20px 0" }}>
            {block.items.map((step, j) => (
              <div key={j} style={{ display: "flex", gap: 16, marginBottom: 14, alignItems: "flex-start" }}>
                <div style={{ width: 30, height: 30, borderRadius: "50%", background: C.purple, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 13, flexShrink: 0 }}>{j + 1}</div>
                <div style={{ color: C.textMuted, fontSize: 15, lineHeight: 1.6, paddingTop: 4 }}>{step}</div>
              </div>
            ))}
          </div>
        );
        if (block.type === "faqs") return (
          <div key={i} style={{ margin: "20px 0" }}>
            {block.items.map((faq, j) => (
              <div key={j} style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 14, padding: "18px 20px", marginBottom: 12 }}>
                <div style={{ color: C.text, fontWeight: 600, fontSize: 15, marginBottom: 8 }}>Q: {faq.q}</div>
                <div style={{ color: C.textMuted, fontSize: 14, lineHeight: 1.7 }}>A: {faq.a}</div>
              </div>
            ))}
          </div>
        );
        return null;
      })}
    </div>
  );
}

// ─── PAGES ───────────────────────────────────────────────────

function HomePage({ onNavigate }) {
  return (
    <div>
      {/* Hero */}
      <div style={{ background: "linear-gradient(160deg, #0f0a24 0%, #1a0a2e 50%, #0a1428 100%)", padding: "80px 24px 60px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 0%, rgba(124,58,237,0.2) 0%, transparent 60%)", pointerEvents: "none" }} />
        <div style={{ display: "inline-block", background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.3)", borderRadius: 50, padding: "6px 16px", fontSize: 13, color: C.purpleLight, marginBottom: 20 }}>
          🎓 Rayat Bahra University, Mohali • Powered by Sunstone
        </div>
        <h1 style={{ fontFamily: "'Outfit',sans-serif", fontSize: "clamp(28px,6vw,52px)", fontWeight: 900, color: C.text, lineHeight: 1.15, marginBottom: 20, maxWidth: 800, margin: "0 auto 20px" }}>
          Your Complete Guide to<br />
          <span style={{ background: "linear-gradient(135deg, #a855f7, #f59e0b)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>BTech CSE & BCA</span><br />
          Admissions 2026
        </h1>
        <p style={{ color: C.textMuted, fontSize: 17, maxWidth: 560, margin: "0 auto 32px", lineHeight: 1.7 }}>
          Honest guides for students from Punjab, Himachal Pradesh, Jammu & Kashmir, and Chandigarh.
        </p>
        <a href="https://mohali-alpha.vercel.app" target="_blank" rel="noopener noreferrer"
          style={{ display: "inline-block", background: "linear-gradient(135deg, #7c3aed, #ef4444)", color: "#fff", padding: "14px 32px", borderRadius: 50, fontWeight: 700, fontSize: 16, textDecoration: "none", boxShadow: "0 8px 32px rgba(124,58,237,0.45)", marginRight: 12 }}>
          Chat with Riya — Free 🤖
        </a>
      </div>

      {/* Stats bar */}
      <div style={{ background: C.bgCard, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: "20px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, textAlign: "center" }}>
          {[
            { v: "1,400+", l: "Placement Offers" },
            { v: "7x", l: "More Companies" },
            { v: "20+", l: "Campuses" },
            { v: "1,200+", l: "Recruiters" },
          ].map((s, i) => (
            <div key={i}>
              <div style={{ color: C.purpleLight, fontWeight: 800, fontSize: 22, fontFamily: "'Outfit',sans-serif" }}>{s.v}</div>
              <div style={{ color: C.textDim, fontSize: 12, marginTop: 2 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Blog cards */}
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "60px 24px" }}>
        <h2 style={{ fontFamily: "'Outfit',sans-serif", fontSize: 28, fontWeight: 700, color: C.text, marginBottom: 8 }}>Admission Guides</h2>
        <p style={{ color: C.textMuted, fontSize: 15, marginBottom: 40 }}>Everything you need to make the right decision for your future.</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {BLOGS.map((blog) => (
            <div key={blog.id} onClick={() => onNavigate(blog.id)}
              style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 20, padding: "28px 32px", cursor: "pointer", transition: "all 0.2s", display: "flex", gap: 24, alignItems: "flex-start" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = C.borderPurple; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.transform = "translateY(0)"; }}>
              <div style={{ fontSize: 40, flexShrink: 0 }}>{blog.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 10, flexWrap: "wrap" }}>
                  <span style={{ background: `${blog.tagColor}20`, border: `1px solid ${blog.tagColor}40`, color: blog.tagColor, borderRadius: 20, padding: "3px 10px", fontSize: 12, fontWeight: 600 }}>{blog.tag}</span>
                  <span style={{ color: C.textDim, fontSize: 13 }}>{blog.readTime}</span>
                  <span style={{ color: C.textDim, fontSize: 13 }}>• {blog.date}</span>
                </div>
                <h3 style={{ color: C.text, fontSize: 20, fontWeight: 700, fontFamily: "'Outfit',sans-serif", marginBottom: 8, lineHeight: 1.3 }}>{blog.title}</h3>
                <p style={{ color: C.textMuted, fontSize: 14, lineHeight: 1.6, marginBottom: 16 }}>{blog.subtitle}</p>
                <span style={{ color: C.purpleLight, fontSize: 14, fontWeight: 600 }}>Read full guide →</span>
              </div>
            </div>
          ))}
        </div>

        {/* Riya CTA */}
        <div style={{ marginTop: 60 }}>
          <RiyaCTA />
        </div>
      </div>
    </div>
  );
}

function BlogPage({ blog, onBack }) {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div>
      {/* Blog hero */}
      <div style={{ background: "linear-gradient(160deg, #0f0a24, #1a0a2e)", padding: "60px 24px 50px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <button onClick={onBack} style={{ background: "rgba(255,255,255,0.06)", border: `1px solid ${C.border}`, borderRadius: 20, padding: "6px 14px", color: C.textMuted, fontSize: 13, cursor: "pointer", marginBottom: 24, display: "flex", alignItems: "center", gap: 6 }}>
            ← Back to all guides
          </button>
          <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 16, flexWrap: "wrap" }}>
            <span style={{ background: `${blog.tagColor}20`, border: `1px solid ${blog.tagColor}40`, color: blog.tagColor, borderRadius: 20, padding: "4px 12px", fontSize: 12, fontWeight: 600 }}>{blog.tag}</span>
            <span style={{ color: C.textDim, fontSize: 13 }}>{blog.readTime} • {blog.date}</span>
          </div>
          <h1 style={{ fontFamily: "'Outfit',sans-serif", fontSize: "clamp(22px,4vw,38px)", fontWeight: 800, color: C.text, lineHeight: 1.2, marginBottom: 16 }}>{blog.title}</h1>
          <p style={{ color: C.textMuted, fontSize: 17, lineHeight: 1.7 }}>{blog.subtitle}</p>
        </div>
      </div>

      {/* Blog content */}
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "48px 24px" }}>
        <ContentRenderer blocks={blog.content} />
        <RiyaCTA />
        <div style={{ textAlign: "center", marginTop: 40, paddingTop: 32, borderTop: `1px solid ${C.border}` }}>
          <p style={{ color: C.textDim, fontSize: 13, marginBottom: 16 }}>Rayat Bahra University, Mohali • Powered by Sunstone • Admissions Open 2026</p>
          <button onClick={onBack} style={{ background: "transparent", border: `1px solid ${C.border}`, borderRadius: 20, padding: "8px 20px", color: C.textMuted, fontSize: 14, cursor: "pointer" }}>
            ← Read more guides
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── APP ─────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home");
  const currentBlog = BLOGS.find(b => b.id === page);

  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.text }}>
      {/* Nav */}
      <nav style={{ background: "rgba(9,9,26,0.97)", borderBottom: `1px solid ${C.border}`, padding: "0 20px", position: "sticky", top: 0, zIndex: 100, backdropFilter: "blur(12px)" }}>
        <div style={{ maxWidth: 960, margin: "0 auto", height: 68, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>

          {/* Left — Sunstone Logo */}
          <button onClick={() => setPage("home")} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 14, flexShrink: 0 }}>
            {/* Sunstone SVG Logo */}
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <rect x="0" y="0" width="10" height="10" fill="#1B3A6B" rx="1"/>
                <rect x="12" y="0" width="10" height="10" fill="#1B3A6B" rx="1"/>
                <rect x="0" y="12" width="10" height="10" fill="#1B3A6B" rx="1"/>
                <rect x="12" y="12" width="10" height="4" fill="#1B3A6B" rx="1"/>
              </svg>
              <span style={{ color: "#1B3A6B", fontWeight: 800, fontSize: 16, fontFamily: "'Outfit',sans-serif", letterSpacing: 1, background: "linear-gradient(135deg, #4a90d9, #7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                SUNSTONE
              </span>
            </div>

            {/* Divider */}
            <div style={{ width: 1, height: 28, background: "rgba(255,255,255,0.15)" }} />

            {/* Alpha School of RBU */}
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg, #1B3A6B, #c0392b)", display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid rgba(255,255,255,0.2)", flexShrink: 0 }}>
                <span style={{ color: "#fff", fontWeight: 900, fontSize: 11, fontFamily: "'Outfit',sans-serif", letterSpacing: 0.5 }}>RBU</span>
              </div>
              <div>
                <div style={{ color: "#fff", fontWeight: 700, fontSize: 12, fontFamily: "'Outfit',sans-serif", lineHeight: 1.2 }}>Alpha School of RBU</div>
                <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 10 }}>Mohali, Punjab</div>
              </div>
            </div>
          </button>

          {/* Right — CTA */}
          <a href="https://mohali-alpha.vercel.app" target="_blank" rel="noopener noreferrer"
            style={{ background: "linear-gradient(135deg, #7c3aed, #ef4444)", color: "#fff", padding: "8px 16px", borderRadius: 50, fontWeight: 600, fontSize: 12, textDecoration: "none", flexShrink: 0, whiteSpace: "nowrap" }}>
            Chat with Riya 🤖
          </a>
        </div>
      </nav>

      {/* Pages */}
      {page === "home" && <HomePage onNavigate={setPage} />}
      {currentBlog && <BlogPage blog={currentBlog} onBack={() => setPage("home")} />}

      {/* Footer */}
      <footer style={{ background: C.bgCard, borderTop: `1px solid ${C.border}`, padding: "40px 24px", textAlign: "center" }}>
        {/* Logos row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 24, marginBottom: 20, flexWrap: "wrap" }}>
          {/* Sunstone */}
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <svg width="18" height="18" viewBox="0 0 22 22" fill="none">
              <rect x="0" y="0" width="10" height="10" fill="#4a90d9" rx="1"/>
              <rect x="12" y="0" width="10" height="10" fill="#4a90d9" rx="1"/>
              <rect x="0" y="12" width="10" height="10" fill="#4a90d9" rx="1"/>
              <rect x="12" y="12" width="10" height="4" fill="#4a90d9" rx="1"/>
            </svg>
            <span style={{ color: "#4a90d9", fontWeight: 800, fontSize: 13, fontFamily: "'Outfit',sans-serif", letterSpacing: 1 }}>SUNSTONE</span>
          </div>
          <div style={{ width: 1, height: 20, background: "rgba(255,255,255,0.15)" }} />
          {/* RBU */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 30, height: 30, borderRadius: "50%", background: "linear-gradient(135deg, #1B3A6B, #c0392b)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "#fff", fontWeight: 900, fontSize: 9 }}>RBU</span>
            </div>
            <span style={{ color: "rgba(255,255,255,0.6)", fontWeight: 600, fontSize: 13, fontFamily: "'Outfit',sans-serif" }}>Alpha School of RBU</span>
          </div>
        </div>
        <div style={{ color: C.text, fontWeight: 700, fontFamily: "'Outfit',sans-serif", fontSize: 15, marginBottom: 6 }}>Rayat Bahra University, Mohali</div>
        <div style={{ color: C.textDim, fontSize: 13, marginBottom: 16 }}>Powered by Sunstone • BTech CSE & BCA Admissions Open 2026</div>
        <div style={{ color: C.textDim, fontSize: 12 }}>Serving students from Punjab • Himachal Pradesh • Jammu & Kashmir • Chandigarh</div>
      </footer>
    </div>
  );
}

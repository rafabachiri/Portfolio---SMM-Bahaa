/* ============================================================================
   SINGLE SOURCE OF TRUTH — edit everything here.
   Bahaa / Rafa: every stat, link, name, testimonial, certification and tool
   below can be changed WITHOUT touching component code.
   Anything marked `// PLACEHOLDER:` is fake demo data — swap it for the real
   thing before launch.
   ============================================================================ */

/* ---------------------------------------------------------------------------
   1. IDENTITY & CONTACT
--------------------------------------------------------------------------- */
export const PROFILE = {
  name: "Bahaa Nedjma",
  role: "Social Media Manager & Content Strategist",
  //location: "Algeria",
  // Punchy hero statement (rewritten from "Welcome to the Digital Edge").
  tagline:
    "I turn social channels into growth engines — where sharp strategy meets scroll-stopping content.",
  heroSub:
    "Data-driven social media management, high-retention content, and community building for brands that want the digital edge.",
  // PLACEHOLDER: swap for the real square photo — drop it in /public/avatar/ and
  // point this at it, e.g. "/avatar/bahaa.jpg". (An SVG monogram ships as the stand-in.)
  avatar: "/avatar/bahaa.jpg",
} as const;

export const CONTACT = {
  whatsapp: "https://wa.me/213793659530", // deep link
  whatsappPrefill:
    "https://wa.me/213793659530?text=Hi%20Bahaa%2C%20I%27d%20like%20to%20talk%20about%20managing%20my%20brand%27s%20social%20media.",
  email: "bahaanedjma@gmail.com",
  phone: "+213793659530",
  phoneTel: "tel:+213793659530",
  // PLACEHOLDER: replace with the real Calendly link.
  calendly: "https://calendly.com/bahaanedjma",
  linkedin: "https://www.linkedin.com/in/bahaa-nedjma-7355ba289/",
  // PLACEHOLDER: real social profiles for the footer/hero.
  instagram: "https://instagram.com/",
  tiktok: "https://tiktok.com/",
} as const;

/* ---------------------------------------------------------------------------
   2. HERO DASHBOARD STAT CARDS  — // PLACEHOLDER: all values are demo numbers.
   `value` is the number the counter animates to; `suffix`/`prefix` decorate it.
--------------------------------------------------------------------------- */
export type StatCard = {
  id: string;
  icon: string; // emoji (kept as data so it's editable here)
  label: string;
  prefix?: string;
  value: number;
  suffix?: string;
  decimals?: number;
  trend?: string; // small "+x%" style indicator
  spark?: number[]; // optional mini sparkline series
};

export const HERO_STATS: StatCard[] = [
  { id: "reach", icon: "📈", label: "Reach", prefix: "+", value: 420, suffix: "%", trend: "+38% mo", spark: [8, 14, 12, 22, 28, 35, 52] },
  { id: "engagement", icon: "❤️", label: "Engagement Rate", value: 8.7, suffix: "%", decimals: 1, trend: "+2.4 pts" },
  { id: "followers", icon: "👥", label: "Followers", value: 2.4, suffix: "M", decimals: 1, trend: "+48K" },
  { id: "reels", icon: "🎥", label: "Reels Views", value: 2.4, suffix: "M", decimals: 1, trend: "+180%" },
  { id: "scheduled", icon: "📅", label: "Posts Scheduled", value: 18, trend: "this wk" },
  { id: "campaigns", icon: "📊", label: "Campaign Status", value: 18, suffix: " Active", trend: "live" },
];

// Small stat strip under the About bio.  // PLACEHOLDER: demo values.
export const ABOUT_STATS = [
  { value: 3, suffix: "+", label: "Years experience" },
  { value: 6, suffix: "", label: "Platforms managed" },
  { value: 40, suffix: "+", label: "Campaigns run" },
  { value: 7, suffix: "", label: "Certifications" },
] as const;

/* ---------------------------------------------------------------------------
   3. ABOUT (tightened from the PDF)
--------------------------------------------------------------------------- */
export const ABOUT_PARAGRAPHS = [
  "I'm Bahaa — a social media manager and content strategist who treats every account like a product: research first, create with intent, then optimize against the numbers.",
  "From strategy and content planning to community management and performance audits, I build systems that keep brands consistent, on-trend, and growing — not just posting for the sake of it.",
  "My background blends creative storytelling with an entrepreneurial, data-driven mindset. I care about long-term growth, not vanity spikes, and I bring an organized, deadline-proof workflow to every collaboration.",
] as const;

/* ---------------------------------------------------------------------------
   4. SERVICES / CONTENT TYPES (interactive cards)
--------------------------------------------------------------------------- */
export type Service = {
  id: string;
  icon: string;
  title: string;
  description: string;
  bullets: string[];
};

export const SERVICES: Service[] = [
  {
    id: "reels",
    icon: "🎥",
    title: "Reels",
    description: "High-retention short video engineered to ride trends and stop the scroll.",
    bullets: ["Viral hooks & pacing", "Trend adaptation", "Storytelling", "High-retention editing"],
  },
  {
    id: "carousel",
    icon: "📚",
    title: "Carousel Posts",
    description: "Swipe-worthy educational and story carousels that drive saves and shares.",
    bullets: ["Save-worthy value", "Strong first slide", "Clear narrative arc"],
  },
  {
    id: "photography",
    icon: "📸",
    title: "Product Photography",
    description: "Clean, on-brand product visuals that make feeds look premium.",
    bullets: ["Art direction", "Styling & composition", "Consistent grid aesthetic"],
  },
  {
    id: "stories",
    icon: "📖",
    title: "Stories",
    description: "Daily story sequences that build community and keep you top-of-mind.",
    bullets: ["Interactive stickers", "Behind-the-scenes", "Conversion-focused CTAs"],
  },
  {
    id: "ads",
    icon: "🎯",
    title: "Paid Ads",
    description: "Meta ad campaigns built on strategy, creative testing, and clean reporting.",
    bullets: ["Audience targeting", "Creative testing", "ROAS-focused optimization"],
  },
  {
    id: "linkedin",
    icon: "💼",
    title: "LinkedIn Content",
    description: "Authority-building content that positions founders and brands as leaders.",
    bullets: ["Thought leadership", "Personal branding", "B2B positioning"],
  },
  {
    id: "shortform",
    icon: "🎬",
    title: "Short-form Video",
    description: "Cross-platform short video for TikTok, Reels and Shorts from one shoot.",
    bullets: ["Multi-platform repurposing", "Native captions", "Hook-first scripting"],
  },
];

/* ---------------------------------------------------------------------------
   5. PROCESS TIMELINE
--------------------------------------------------------------------------- */
export const PROCESS_STEPS = [
  { icon: "🔍", title: "Discovery", desc: "Deep-dive into your brand, audience, competitors and goals." },
  { icon: "🧭", title: "Strategy", desc: "A clear, data-informed roadmap: pillars, tone, cadence and KPIs." },
  { icon: "🗂️", title: "Content Planning", desc: "Calendars, scripts and creative direction mapped weeks ahead." },
  { icon: "✅", title: "Review & Approval", desc: "Structured feedback loops so nothing goes live without your sign-off." },
  { icon: "🚀", title: "Execution & Optimization", desc: "Publish, engage, measure — then refine against the numbers." },
] as const;

/* ---------------------------------------------------------------------------
   6. WHY ME
--------------------------------------------------------------------------- */
export const WHY_ME = [
  { icon: "🧭", title: "Strategy-First Approach", desc: "Every post ladders up to a goal — never random content." },
  { icon: "📊", title: "Data-Driven Decisions", desc: "Analytics guide what we double down on and what we cut." },
  { icon: "🎨", title: "Creative & Organized", desc: "Bold ideas delivered on a reliable, deadline-proof workflow." },
  { icon: "🎓", title: "Continuous Learning", desc: "Industry certifications keep the strategy current." },
  { icon: "🌱", title: "Long-Term Growth Focus", desc: "Sustainable growth over vanity spikes." },
  { icon: "💡", title: "Entrepreneurial Experience", desc: "I think like an owner, not just a poster." },
] as const;

/* ---------------------------------------------------------------------------
   7. PLATFORMS · TOOLS · SKILLS
--------------------------------------------------------------------------- */
export const PLATFORMS = [
  { name: "Instagram", color: "#E1306C", short: "IG" },
  { name: "Facebook", color: "#1877F2", short: "FB" },
  { name: "TikTok", color: "#25F4EE", short: "TT" },
  { name: "Threads", color: "#F5F7FA", short: "TH" },
  { name: "LinkedIn", color: "#0A66C2", short: "in" },
  { name: "Pinterest", color: "#E60023", short: "P" },
] as const;

// PLACEHOLDER: swap emoji/text badges for real tool logos when assets are available.
export const TOOLS = [
  { name: "Meta Business Suite", icon: "🏢" },
  { name: "Canva", icon: "🎨" },
  { name: "Figma", icon: "✏️" },
  { name: "CapCut", icon: "🎞️" },
  { name: "VN Editor", icon: "📹" },
  { name: "ChatGPT", icon: "🤖" },
  { name: "Google Gemini", icon: "✨" },
  { name: "Notion", icon: "📓" },
  { name: "Trello", icon: "📋" },
  { name: "Google Workspace", icon: "🗄️" },
  { name: "Google Sheets", icon: "📗" },
  { name: "Zoom", icon: "🎥" },
] as const;

export const SKILLS = [
  "Social Media Strategy",
  "Content Strategy",
  "Content Planning",
  "Copywriting",
  "Community Management",
  "Social Media Audits",
  "Brand Positioning",
  "Content Marketing",
  "Competitor Research",
  "Performance Analysis",
] as const;

/* ---------------------------------------------------------------------------
   8. FLOATING NOTIFICATIONS (global toast rotation)
--------------------------------------------------------------------------- */
export const NOTIFICATIONS = [
  "🔔 New follower",
  "❤️ 528 people liked your Reel",
  "💬 New client inquiry",
  "📈 Reach increased by 38%",
  "🎉 Campaign completed successfully",
  "📅 Post scheduled for tomorrow",
  "📊 Weekly report is ready",
  "⭐ Client approved your content",
] as const;

/* ---------------------------------------------------------------------------
   9. CASE STUDIES  — // PLACEHOLDER: swap PDFs in /public/case-studies/ and stats.
--------------------------------------------------------------------------- */
export type CaseStudy = {
  id: string;
  title: string;
  client: string;
  pdf: string;
  stats: { label: string; value: string }[];
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "client-a",
    title: "90-Day Organic Growth Sprint",
    client: "Client A — Beauty & Skincare", // PLACEHOLDER
    pdf: "/case-studies/case-study-1-placeholder.pdf",
    stats: [
      { label: "Reach", value: "+420%" },
      { label: "Engagement", value: "8.7%" },
      { label: "New followers", value: "+48K" },
    ],
  },
  {
    id: "client-b",
    title: "Full-Funnel Content + Paid Social",
    client: "Client B — D2C E-commerce", // PLACEHOLDER
    pdf: "/case-studies/case-study-2-placeholder.pdf",
    stats: [
      { label: "ROAS", value: "4.2x" },
      { label: "Reels views", value: "2.4M" },
      { label: "CPL", value: "-31%" },
    ],
  },
];

/* Phone-mockup "client accounts" map 1:1 to the case studies above. */
// Phone mockup accounts. `images` are real design posts from /public/phone/.
export const PHONE_ACCOUNTS = [
  {
    id: "client-a",
    handle: "@academy",
    label: "Client A",
    niche: "Academy",
    accent: "#F473B0",
    images: ["/phone/client-a-1.png", "/phone/client-a-2.png", "/phone/client-a-3.png"],
  },
  {
    id: "client-b",
    handle: "@tamkeen.school",
    label: "Client B",
    niche: "Tamkeen School",
    accent: "#27a5ff",
    images: ["/phone/client-b-1.png", "/phone/client-b-2.png", "/phone/client-b-3.png", "/phone/client-b-4.png"],
  },
] as const;

/* ---------------------------------------------------------------------------
   10. ANALYTICS CHART DATA  — // PLACEHOLDER: all demo series.
--------------------------------------------------------------------------- */
export const REACH_GROWTH = [
  { month: "Jan", reach: 12 },
  { month: "Feb", reach: 19 },
  { month: "Mar", reach: 27 },
  { month: "Apr", reach: 41 },
  { month: "May", reach: 58 },
  { month: "Jun", reach: 79 },
  { month: "Jul", reach: 104 },
];

export const ENGAGEMENT_TREND = [
  { month: "Jan", rate: 3.1 },
  { month: "Feb", rate: 3.8 },
  { month: "Mar", rate: 4.9 },
  { month: "Apr", rate: 5.7 },
  { month: "May", rate: 6.8 },
  { month: "Jun", rate: 7.9 },
  { month: "Jul", rate: 8.7 },
];

export const AUDIENCE_GROWTH = [
  { month: "Feb", followers: 6 },
  { month: "Mar", followers: 9 },
  { month: "Apr", followers: 14 },
  { month: "May", followers: 21 },
  { month: "Jun", followers: 33 },
  { month: "Jul", followers: 48 },
];

export const CONTENT_SPLIT = [
  { name: "Reels", value: 52 },
  { name: "Carousels", value: 27 },
  { name: "Stories", value: 14 },
  { name: "Static", value: 7 },
];

export const CONTENT_PERFORMANCE = [
  { type: "Reels", reach: 100, saves: 82 },
  { type: "Carousels", reach: 64, saves: 71 },
  { type: "Stories", reach: 38, saves: 22 },
  { type: "Static", reach: 21, saves: 15 },
];

/* ---------------------------------------------------------------------------
   11. TESTIMONIALS (DM style) — bubbles[] splits long quotes like real texting.
--------------------------------------------------------------------------- */
export type Testimonial = {
  id: string;
  name: string;
  title?: string;
  time: string;
  bubbles: string[];
  reaction?: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Former Collaborator", // PLACEHOLDER: real name if available
    time: "09:41",
    reaction: "❤️",
    bubbles: [
      "Je recommande vraiment ton travail du fond du cœur 🙌",
      "Tu es professionnel, tu as l'esprit d'innovation",
      "et une très bonne capacité de communication. Je te souhaite le meilleur 🚀",
    ],
  },
  {
    id: "t2",
    name: "Yasmine Kihalouche",
    title: "Project Manager en communication",
    time: "14:08",
    reaction: "🔥",
    bubbles: [
      "Une créatrice de contenu innovante 💡",
      "très sérieuse, qui maîtrise la gestion des réseaux sociaux",
      "je la recommande vraiment 👏",
    ],
  },
  {
    id: "t3",
    name: "Ramzi Mohammed Daameche",
    title: "Co-Founder @ mostawdaa.dz",
    time: "18:22",
    reaction: "⭐",
    bubbles: [
      "An incredibly talented social media manager 🙏",
      "Her creative ideas + strong work ethic make her exceptionally dependable — a true asset to any team.",
      "I highly recommend her to anyone looking for someone who consistently delivers great results ✅",
    ],
  },
  {
    id: "t4",
    name: "Ali Mimoun",
    title: "École Tamkeen",
    time: "7:14 AM",
    reaction: "🙌",
    bubbles: [
      "J'ai eu le plaisir de travailler avec elle à l'École Tamkeen et je la recommande vivement 🙌",
      "Elle a toujours fait preuve d'un grand professionnalisme, d'une excellente communication et d'une grande réactivité.",
      "Son travail était de très haute qualité, créatif et réalisé avec soin, tout en respectant systématiquement les délais ⏱️",
      "Les résultats ont toujours été à la hauteur de nos attentes. Je la recommande sans hésitation à toute organisation cherchant une personne compétente, fiable et engagée ✅",
    ],
  },
];

/* ---------------------------------------------------------------------------
   12. CERTIFICATIONS
   `pdfPath` = the real source PDF in /public/certifications/ (source of truth).
   `imagePath` = the high-res PNG rendered from it by scripts/generate-cert-images.mjs
   (runs on `prebuild`). The marquee + lightbox use the PNG; the PDF stays linkable.
   To add a certificate: drop the PDF in /public/certifications/, add a row here
   with imagePath = /certifications/generated/<slugified-filename>.png, and rebuild.
--------------------------------------------------------------------------- */
export type Certification = {
  id: string;
  title: string;
  issuer: string;
  pdfPath: string;
  imagePath: string;
};

export const CERTIFICATIONS: Certification[] = [
  {
    id: "meta-smm",
    title: "Social Media Management",
    issuer: "Meta · Coursera",
    pdfPath: "/certifications/Coursera SMM.pdf",
    imagePath: "/certifications/generated/coursera-smm.png",
  },
  {
    id: "meta-engaging-content-ig",
    title: "Creating Engaging Content for Instagram",
    issuer: "Meta · Coursera",
    pdfPath: "/certifications/Coursera creating engaging content for instagram pdf.pdf",
    imagePath: "/certifications/generated/coursera-creating-engaging-content-for-instagram-pdf.png",
  },
  {
    id: "ucdavis-content-marketing-strategy",
    title: "The Strategy of Content Marketing",
    issuer: "University of California, Davis · Coursera",
    pdfPath: "/certifications/Coursera the stragtegy of content marketing .pdf",
    imagePath: "/certifications/generated/coursera-the-stragtegy-of-content-marketing.png",
  },
  {
    id: "aptly-tiktok-business",
    title: "TikTok for Business",
    issuer: "Aptly · Coursera",
    pdfPath: "/certifications/Coursera tiktok for business .pdf",
    imagePath: "/certifications/generated/coursera-tiktok-for-business.png",
  },
  {
    id: "london-brand-management",
    title: "Brand Management: Aligning Business, Brand & Behaviour",
    issuer: "University of London · Coursera",
    pdfPath: "/certifications/Coursera Brand Management certificate.pdf",
    imagePath: "/certifications/generated/coursera-brand-management-certificate.png",
  },
  {
    id: "google-digital-marketing",
    title: "Attract and Engage Customers with Digital Marketing",
    issuer: "Google · Coursera",
    pdfPath: "/certifications/Coursera Attract and Engage Customers with Digital Marketing.pdf",
    imagePath: "/certifications/generated/coursera-attract-and-engage-customers-with-digital-marketing.png",
  },
  {
    id: "simplilearn-content-strategy",
    title: "Content Strategy",
    issuer: "Simplilearn · Coursera",
    pdfPath: "/certifications/Coursera content strategy .pdf",
    imagePath: "/certifications/generated/coursera-content-strategy.png",
  },
];

/* ---------------------------------------------------------------------------
   13. NAV
--------------------------------------------------------------------------- */
export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  // { label: "Services", href: "#services" }, // hidden for now (reuse later)
  // { label: "Case Studies", href: "#case-studies" }, // hidden for now
  { label: "Analytics", href: "#analytics" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
] as const;

/* Scroll-progress "follower growth" milestones. */
export const GROWTH_MILESTONES = [
  { at: 0, label: "0" },
  { at: 0.2, label: "1K" },
  { at: 0.4, label: "10K" },
  { at: 0.6, label: "50K" },
  { at: 0.8, label: "100K" },
  { at: 1, label: "250K" },
] as const;

/* ---------------------------------------------------------------------------
   14. STRATEGY CANVAS — draggable sticky notes (Figma-style whiteboard).
   `x` / `y` are starting positions in % of the canvas; `rot` is tilt in deg.
--------------------------------------------------------------------------- */
export type StickyNote = {
  id: string;
  label: string;
  note: string;
  color: "amber" | "teal" | "green" | "pink" | "blue";
  x: number;
  y: number;
  rot: number;
};

export const STRATEGY_NOTES: StickyNote[] = [
  { id: "audience", label: "Audience", note: "Gen-Z & millennials, mobile-first, value-driven", color: "teal", x: 4, y: 8, rot: -4 },
  { id: "pain", label: "Pain Points", note: "Inconsistent posting, no strategy, low reach", color: "pink", x: 38, y: 5, rot: 3 },
  { id: "pillars", label: "Content Pillars", note: "Educate · Entertain · Inspire · Convert", color: "amber", x: 70, y: 10, rot: -3 },
  { id: "hooks", label: "Hooks", note: '"Stop doing this…" · "3 things nobody tells you"', color: "blue", x: 10, y: 44, rot: 4 },
  { id: "ideas", label: "Ideas", note: "Behind-the-scenes, myth-busting, before/after", color: "green", x: 44, y: 40, rot: -2 },
  { id: "trends", label: "Trend Ideas", note: "Trending audio + niche twist = reach spike", color: "teal", x: 72, y: 46, rot: 5 },
  { id: "cta", label: "CTA", note: '"Save this" · "DM me GROW" · "Book a call"', color: "amber", x: 30, y: 72, rot: -5 },
];

/* ---------------------------------------------------------------------------
   15. WHAT HAPPENS AFTER YOU HIRE ME — animated onboarding story.
--------------------------------------------------------------------------- */
export const AFTER_HIRE_STEPS = [
  { when: "Day 1", title: "Audit", icon: "🔍", desc: "I dig into your accounts, analytics, competitors and audience to find the gaps and quick wins." },
  { when: "Day 3", title: "Strategy", icon: "🧭", desc: "You get a clear roadmap: content pillars, tone, posting cadence and the KPIs we'll chase." },
  { when: "Week 1", title: "Content", icon: "🎬", desc: "The first batch of scroll-stopping Reels, carousels and stories goes into production." },
  { when: "Week 2", title: "Growth", icon: "🚀", desc: "We publish, engage and nurture the community — momentum starts to build." },
  { when: "Month 1", title: "Analytics", icon: "📊", desc: "A full performance report: what worked, what's next, and where we double down." },
] as const;

/* ---------------------------------------------------------------------------
   16. CLIENT WORK — real projects (expandable cards).
   Screenshots live in /public/projects/ (Tutoriland, extracted from her work-exp
   deck) and /public/case-studies/ (others). Stats currently only on project one
   (Tutoriland) — real Instagram insight numbers; leave `stats: []` elsewhere and
   the card omits the stats row.  // PLACEHOLDER: add screenshots/stats as supplied.
--------------------------------------------------------------------------- */
export type ClientProject = {
  id: string;
  clientName: string;
  role: string;
  industry: string;
  description: string;
  contributions: string[];
  stats?: { label: string; value: string }[];
  screenshots: { src: string; alt: string }[];
  logo?: string;
};

// Insight screenshots copied from /assets/stats/Projet* into /public/projects/<id>/.
// Regenerate names by re-running the copy step (see README). `n` = image count.
const shots = (id: string, label: string, n: number) =>
  Array.from({ length: n }, (_, i) => ({
    src: `/projects/${id}/${id}-${i + 1}.png`,
    alt: `${label} — Instagram result screenshot ${i + 1}`,
  }));

export const CLIENT_PROJECTS: ClientProject[] = [
  {
    // From the work-exp deck (project #1). Separate from the UGC Growth Project —
    // no analytics supplied, just the two Instagram profile screenshots.
    id: "tutoriland",
    clientName: "Tutoriland",
    role: "Founder · Social Media Team",
    industry: "E-learning Platform",
    description:
      "Founded in 2023, Tutoriland is an online learning platform created to make quality educational resources accessible to students. As founder, I also contributed on the social media team — supporting content creation and the platform's online presence.",
    contributions: ["Content Creation", "Social Media Management", "Community Building"],
    stats: [],
    screenshots: [
      { src: "/projects/tutoriland-1.png", alt: "Tutoriland Instagram profile — 156 posts, 2,858 followers" },
      { src: "/projects/tutoriland-2.png", alt: "bac.tutoriland Instagram profile — 109 posts, 3,923 followers" },
    ],
    logo: "/projects/tutoriland-logo.png",
  },
  {
    // Projet 1 stats folder — a separate UGC-focused growth project.
    id: "ugc-growth-project",
    clientName: "UGC Growth Project",
    role: "UGC Content Creator & Social Media Manager",
    industry: "E-learning",
    description:
      "Built and managed a UGC-focused Instagram account for an e-learning platform, growing it from zero through strategic short-form video and consistent content planning over a two-month period.",
    contributions: [
      "UGC Content Strategy",
      "Content Planning",
      "Content Creation",
      "Social Media Management",
      "Community Management",
      "Performance Analysis",
    ],
    // Real Instagram insights (Projet 1).
    stats: [
      { label: "Total views", value: "1.9M+" },
      { label: "Accounts reached", value: "748K" },
      { label: "From Reels", value: "98%" },
      { label: "Reach growth", value: "+169K%" },
    ],
    screenshots: shots("ugc", "UGC Growth Project", 13),
  },
  {
    id: "madrassat-tamkeen",
    clientName: "Madrassat Tamkeen",
    role: "Social Media Manager",
    industry: "Private School",
    description:
      "Madrassat Tamkeen is a private school offering academic support and language courses. As Social Media Manager, I strengthened the school's online presence through strategic content planning and day-to-day social media management.",
    contributions: [
      "Social Media Strategy",
      "Content Planning",
      "Content Creation",
      "Caption Writing",
      "Social Media Management",
      "Community Management",
      "Performance Analysis",
    ],
    // Real Instagram numbers (Projet 2).
    stats: [
      { label: "Followers", value: "3,354" },
      { label: "Views (30d)", value: "180K" },
      { label: "Posts", value: "779" },
    ],
    screenshots: [
      { src: "/case-studies/madrassa_by_tamkeen.PNG", alt: "Madrassat Tamkeen Instagram profile — 3,354 followers" },
      ...shots("tamkeen", "Madrassat Tamkeen", 12),
    ],
  },
  {
    id: "mostawdaa",
    clientName: "Mostawdaa",
    role: "Social Media Manager",
    industry: "Packaging Products",
    description:
      "Mostawdaa is a company specializing in packaging solutions for e-commerce sellers. As Social Media Manager, I strengthened the brand's online presence through strategic content planning and social media management across multiple platforms.",
    contributions: [
      "Social Media Strategy",
      "Content Planning",
      "Content Creation",
      "Caption Writing",
      "Social Media Management",
      "Community Management",
      "Performance Analysis",
    ],
    // Real Instagram numbers (Projet 3).
    stats: [
      { label: "Followers", value: "23.7K" },
      { label: "Views (30d)", value: "1.0M" },
      { label: "Posts", value: "111" },
    ],
    screenshots: [
      { src: "/case-studies/mostawdaa-dz.png", alt: "Mostawdaa Instagram profile — 23.7K followers" },
      ...shots("mostawdaa", "Mostawdaa", 5),
    ],
  },
  {
    id: "fish-graphique",
    clientName: "Fish Graphique",
    role: "Social Media Manager",
    industry: "Visual Communication & Printing",
    description:
      "Fish Graphique specializes in visual communication, branding, and professional printing solutions. As Social Media Manager, I strengthened the brand's online presence through strategic content planning and social media management.",
    contributions: [
      "Social Media Strategy",
      "Content Planning",
      "Content Creation",
      "Caption Writing",
      "Social Media Management",
      "Community Management",
      "Performance Analysis",
    ],
    // Real Instagram numbers (Projet 5).
    stats: [
      { label: "Followers", value: "64.9K" },
      { label: "Posts", value: "97" },
    ],
    screenshots: [
      { src: "/projects/fish-graphique.png", alt: "Fish Graphique Instagram profile — 64.9K followers" },
    ],
  },
  {
    id: "marketing-agency",
    clientName: "Marketing Agency", // PLACEHOLDER: real agency name if she wants it named
    role: "Social Media Manager",
    industry: "Marketing & Advertising",
    description:
      "Worked as a Social Media Manager at a marketing agency, contributing to content strategy, social media management, and strengthening the online presence of the assigned brand.",
    contributions: [
      "Social Media Strategy",
      "Content Planning",
      "Content Creation",
      "Caption Writing",
      "Social Media Management",
      "Community Management",
      "Performance Analysis",
    ],
    // Real Instagram insights (Projet 4).
    stats: [
      { label: "Views", value: "384K" },
      { label: "Accounts reached", value: "160K" },
      { label: "Reach growth", value: "+6,182%" },
      { label: "From Reels", value: "75%" },
    ],
    screenshots: shots("marketing", "Marketing Agency", 8),
  },
];

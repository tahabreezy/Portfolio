export const personal = {
  name: "Taha Azaghar",
  title: "AI & Automation Engineer",
  tagline: "Turning complex workflows into intelligent systems",
  location: "Casablanca, Morocco",
  remote: true,
  available: true,
  email: "Taha_789@live.fr",
  linkedin: "https://www.linkedin.com/in/taha-azaghar/",
  github: "https://github.com/tahabreezy",
  githubHandle: "tahabreezy",
  phone: "+212 6 23 69 87 00",
  cv: "/cv.pdf",
  bio: [
    "I build systems where AI agents collaborate, debate, and act. My focus is the intersection of LLM orchestration, workflow automation, and scalable backend engineering.",
    "At Brain Gen Technology I designed and shipped a production multi-agent trading platform — 20+ APIs, autonomous agents, zero human intervention at runtime.",
    "Targeting roles in AI/ML Engineering, Automation, Backend, and Data Engineering — in Morocco and remotely.",
  ],
};

export const skills = [
  {
    category: "AI / LLM Engineering",
    color: "green" as const,
    items: [
      { name: "LangChain / LangGraph", level: 95 },
      { name: "Multi-Agent Systems", level: 90 },
      { name: "RAG & Embeddings", level: 88 },
      { name: "Prompt Engineering", level: 92 },
      { name: "OpenAI / Gemini APIs", level: 85 },
    ],
  },
  {
    category: "Automation & Workflow",
    color: "cyan" as const,
    items: [
      { name: "n8n", level: 93 },
      { name: "Celery + Redis", level: 80 },
      { name: "REST API Integration", level: 90 },
      { name: "Webhook Pipelines", level: 85 },
    ],
  },
  {
    category: "Backend",
    color: "yellow" as const,
    items: [
      { name: "Python / FastAPI", level: 90 },
      { name: "Spring Boot / Java", level: 80 },
      { name: "Node.js", level: 70 },
      { name: "PostgreSQL / Supabase", level: 78 },
    ],
  },
  {
    category: "Frontend",
    color: "cyan" as const,
    items: [
      { name: "React + TypeScript", level: 82 },
      { name: "Vite / Tailwind CSS", level: 80 },
    ],
  },
  {
    category: "DevOps & Data",
    color: "muted" as const,
    items: [
      { name: "Docker / Compose", level: 85 },
      { name: "Qdrant Vector DB", level: 80 },
      { name: "Git / GitHub", level: 90 },
    ],
  },
];

export const projects = [
  {
    num: "01",
    status: "SHIPPED",
    statusColor: "green" as const,
    title: "Multi-Agent AI Trading System",
    org: "Brain Gen Technology · Internship",
    description:
      "Autonomous trading intelligence built on LangChain + LangGraph. Specialized agents (research, analysis, risk, execution) communicate via structured message passing. 20+ API integrations via n8n. Zero manual intervention at runtime.",
    stack: ["LangChain", "LangGraph", "n8n", "FastAPI", "Redis", "Celery", "Docker"],
    github: "https://github.com/tahabreezy",
    live: null,
  },
  {
    num: "02",
    status: "BUILT",
    statusColor: "cyan" as const,
    title: "Business War Room",
    org: "Idea Validation Tool",
    description:
      "LLM council where 4 AI agents (optimist, pessimist, strategist, analyst) debate a business idea from opposing angles. A judge agent synthesizes their arguments into a structured go/no-go recommendation with risk breakdown.",
    stack: ["LangGraph", "FastAPI", "React", "TypeScript", "Streaming API"],
    github: "https://github.com/tahabreezy",
    live: null,
  },
  {
    num: "03",
    status: "IN PROGRESS",
    statusColor: "yellow" as const,
    title: "ResearchRadar",
    org: "Research & Trend Intelligence",
    description:
      "Ingests academic papers and news, embeds with Gemini Embedding 2, stores in Qdrant, and surfaces semantic trends via natural language queries. Celery workers deliver scheduled weekly intelligence digests.",
    stack: ["Gemini Embed 2", "Qdrant", "FastAPI", "Celery", "Redis", "Docker"],
    github: "https://github.com/tahabreezy",
    live: null,
  },
  {
    num: "04",
    status: "MVP",
    statusColor: "cyan" as const,
    title: "LearnBright",
    org: "EdTech Platform · Autistic Children (10–14)",
    description:
      "Sensory-friendly learning environment with adaptive lesson players, distraction-controlled UI, and personalized learning paths. Designed with neurodivergent UX principles — no sudden animations, clear visual hierarchy.",
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "Supabase"],
    github: "https://github.com/tahabreezy",
    live: null,
  },
];

export const experience = [
  {
    type: "work" as const,
    badge: "WORK",
    period: "2024 – 2025",
    role: "AI Engineering Intern",
    org: "Brain Gen Technology · Casablanca",
    points: [
      "Architected multi-agent AI trading system from scratch with LangChain & LangGraph",
      "Built 20+ API integrations using n8n as the orchestration layer",
      "Implemented semantic recommender engine using vector embeddings",
      "Deployed full stack on Docker Compose with Celery/Redis async queuing",
    ],
  },
  {
    type: "edu" as const,
    badge: "M.Sc.",
    period: "2023 – 2025",
    role: "Master of Science — Computer Science",
    org: "EMSI · École Marocaine des Sciences de l'Ingénieur, Casablanca",
    points: [
      "Specialized in AI systems, distributed architectures & data science",
      "Graduated 2025 with engineering degree",
    ],
  },
  {
    type: "edu" as const,
    badge: "B.Sc.",
    period: "2020 – 2023",
    role: "Bachelor of Science — Computer Science",
    org: "EMSI · Casablanca",
    points: [
      "Foundations: algorithms, OOP, databases, systems programming",
      "First full-stack applications with Java/JEE and Spring Boot",
    ],
  },
];

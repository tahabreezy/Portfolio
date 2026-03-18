export const translations = {
  en: {
    personal: {
      name: "Taha Azaghar",
      title: "AI & Automation Engineer",
      tagline: "Turning complex workflows into intelligent systems",
      location: "Casablanca, Morocco",
      bio: [
        "I build systems where AI agents collaborate, debate, and act. My focus is the intersection of LLM orchestration, workflow automation, and scalable backend engineering.",
        "At Brain Gen Technology I designed and shipped a production multi-agent trading platform — 20+ APIs, autonomous agents, zero human intervention at runtime.",
        "Targeting roles in AI/ML Engineering, Automation, Backend, and Data Engineering — in Morocco and remotely.",
      ],
    },
    skills: [
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
    ],
    projects: [
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
      },
    ],
    experience: [
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
    ],
  },
  fr: {
    personal: {
      name: "Taha Azaghar",
      title: "Ingénieur IA & Automatisation",
      tagline: "Transformer les workflows complexes en systèmes intelligents",
      location: "Casablanca, Maroc",
      bio: [
        "Je conçois des systèmes où les agents IA collaborent, débattent et agissent. Mon expertise se situe à l'intersection de l'orchestration LLM, de l'automatisation des processus et de l'ingénierie backend scalable.",
        "Chez Brain Gen Technology, j'ai conçu et déployé une plateforme de trading multi-agents en production — plus de 20 APIs, des agents autonomes, aucune intervention humaine à l'exécution.",
        "Cible des rôles d'ingénieur en IA/ML, automatisation, backend et ingénierie de données — au Maroc et à distance.",
      ],
    },
    skills: [
      {
        category: "Ingénierie IA / LLM",
        color: "green" as const,
        items: [
          { name: "LangChain / LangGraph", level: 95 },
          { name: "Systèmes Multi-Agents", level: 90 },
          { name: "RAG & Embeddings", level: 88 },
          { name: "Prompt Engineering", level: 92 },
          { name: "APIs OpenAI / Gemini", level: 85 },
        ],
      },
      {
        category: "Automatisation & Workflow",
        color: "cyan" as const,
        items: [
          { name: "n8n", level: 93 },
          { name: "Celery + Redis", level: 80 },
          { name: "Intégration API REST", level: 90 },
          { name: "Pipelines Webhook", level: 85 },
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
        category: "DevOps & Données",
        color: "muted" as const,
        items: [
          { name: "Docker / Compose", level: 85 },
          { name: "Qdrant Vector DB", level: 80 },
          { name: "Git / GitHub", level: 90 },
        ],
      },
    ],
    projects: [
      {
        num: "01",
        status: "DÉPLOYÉ",
        statusColor: "green" as const,
        title: "Système de Trading IA Multi-Agents",
        org: "Brain Gen Technology · Stage",
        description:
          "Intelligence de trading autonome construite avec LangChain + LangGraph. Agents spécialisés (recherche, analyse, risque, exécution) communiquant via passage de messages structurés. Plus de 20 intégrations API via n8n. Zéro intervention manuelle.",
        stack: ["LangChain", "LangGraph", "n8n", "FastAPI", "Redis", "Celery", "Docker"],
        github: "https://github.com/tahabreezy",
      },
      {
        num: "02",
        status: "CONSTRUIT",
        statusColor: "cyan" as const,
        title: "Business War Room",
        org: "Outil de Validation d'Idées",
        description:
          "Conseil de LLM où 4 agents IA (optimiste, pessimiste, stratège, analyste) débattent d'une idée d'entreprise sous des angles opposés. Un agent juge synthétise leurs arguments en une recommandation structurée avec analyse des risques.",
        stack: ["LangGraph", "FastAPI", "React", "TypeScript", "Streaming API"],
        github: "https://github.com/tahabreezy",
      },
      {
        num: "03",
        status: "EN COURS",
        statusColor: "yellow" as const,
        title: "ResearchRadar",
        org: "Intelligence de Recherche & Tendances",
        description:
          "Ingère des articles académiques et des actualités, les transforme avec Gemini Embedding 2, les stocke dans Qdrant et fait ressortir les tendances sémantiques. Les workers Celery livrent des résumés hebdomadaires programmés.",
        stack: ["Gemini Embed 2", "Qdrant", "FastAPI", "Celery", "Redis", "Docker"],
        github: "https://github.com/tahabreezy",
      },
      {
        num: "04",
        status: "MVP",
        statusColor: "cyan" as const,
        title: "LearnBright",
        org: "Plateforme EdTech · Enfants Autistes (10–14 ans)",
        description:
          "Environnement d'apprentissage sensoriel avec lecteurs de leçons adaptatifs, interface sans distraction et parcours d'apprentissage personnalisés. Conçu selon les principes UX neurodivergents.",
        stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "Supabase"],
        github: "https://github.com/tahabreezy",
      },
    ],
    experience: [
      {
        type: "work" as const,
        badge: "TRAVAIL",
        period: "2024 – 2025",
        role: "Stagiaire en Ingénierie IA",
        org: "Brain Gen Technology · Casablanca",
        points: [
          "Architecture d'un système de trading multi-agents à partir de zéro avec LangChain & LangGraph",
          "Construction de plus de 20 intégrations API en utilisant n8n comme couche d'orchestration",
          "Mise en œuvre d'un moteur de recommandation sémantique utilisant des vector embeddings",
          "Déploiement full stack sur Docker Compose avec file d'attente asynchrone Celery/Redis",
        ],
      },
      {
        type: "edu" as const,
        badge: "M.Sc.",
        period: "2023 – 2025",
        role: "Master en Informatique",
        org: "EMSI · École Marocaine des Sciences de l'Ingénieur, Casablanca",
        points: [
          "Spécialisation en systèmes d'IA, architectures distribuées et science des données",
          "Diplômé en 2025 avec titre d'ingénieur",
        ],
      },
      {
        type: "edu" as const,
        badge: "B.Sc.",
        period: "2020 – 2023",
        role: "Licence en Informatique",
        org: "EMSI · Casablanca",
        points: [
          "Bases : algorithmes, POO, bases de données, programmation système",
          "Premières applications full-stack avec Java/JEE et Spring Boot",
        ],
      },
    ],
  },
};

export const personal = {
  email: "Taha_789@live.fr",
  linkedin: "https://www.linkedin.com/in/taha-azaghar/",
  github: "https://github.com/tahabreezy",
  githubHandle: "tahabreezy",
  phone: "+212 6 23 69 87 00",
  cv: "/cv.pdf",
};


export const translations = {
  en: {
    personal: {
      name: "Taha Azaghar",
      title: "AI & Automation Engineer · Full Stack Developer · Data Scientist",
      location: "Casablanca, Morocco",
      bio: [
        "IT Engineer (M.Sc., EMSI Casablanca 2025) with triple expertise in AI systems (LLM agents, RAG, MCP, LangChain), Data Engineering (ETL, MLOps), and Full Stack development (Python, Spring Boot, React).",
        "Daily user of Claude Code, Ollama, and MCP protocols — treating AI as a core development tool to accelerate complex delivery.",
        "Autonomous on end-to-end projects, strong communicator, and committed to continuous technical excellence.",
      ],
    },
    skills: [
      {
        category: "AI & LLM Engineering",
        color: "green" as const,
        items: [
          { name: "LangChain / Agents / RAG", level: 95 },
          { name: "MCP / Tool-Use / Prompt Engineering", level: 92 },
          { name: "OpenAI / Claude / Mistral / Ollama", level: 90 },
          { name: "ChromaDB / Qdrant / Vector Search", level: 88 },
        ],
      },
      {
        category: "Data & ML Engineering",
        color: "yellow" as const,
        items: [
          { name: "Pipelines ETL (Pandas, NumPy)", level: 90 },
          { name: "MLOps (PyTorch, TensorFlow)", level: 85 },
          { name: "Orchestration (n8n, Celery, Redis)", level: 93 },
          { name: "TimeSeries (TimescaleDB)", level: 80 },
        ],
      },
      {
        category: "Backend & APIs",
        color: "cyan" as const,
        items: [
          { name: "Python (FastAPI, Django, Flask)", level: 95 },
          { name: "Java / Spring Boot", level: 85 },
          { name: "Node.js / Express", level: 88 },
          { name: "REST / JWT / OpenAPI", level: 92 },
        ],
      },
      {
        category: "Frontend & UI",
        color: "cyan" as const,
        items: [
          { name: "React / Next.js", level: 90 },
          { name: "Angular / TypeScript", level: 85 },
          { name: "Tailwind CSS / HTML5 / CSS3", level: 95 },
        ],
      },
      {
        category: "DevOps & Cloud",
        color: "muted" as const,
        items: [
          { name: "Docker / Kubernetes", level: 85 },
          { name: "GitHub Actions / CI/CD", level: 90 },
          { name: "GCP / Azure / AWS", level: 80 },
        ],
      },
    ],
    projects: [
      {
        num: "01",
        status: "PRODUCTION",
        statusColor: "green" as const,
        title: "AI Trading Bot",
        org: "Brain Gen Technology",
        description:
          "Full multi-agent AI system with specialized personas (technical, fundamental, sentiment). Features real-time ETL pipelines, MLOps orchestration via Celery/Redis, and automated reporting dashboards.",
        stack: ["Python", "LangChain", "Celery", "TimescaleDB", "GCP", "Docker"],
        github: "https://github.com/taha-azaghar",
      },
      {
        num: "02",
        status: "VERIFIED",
        statusColor: "cyan" as const,
        title: "Semantic Recommender",
        org: "Open Source",
        description:
          "End-to-end RAG pipeline for book discovery. Uses semantic embeddings (Transformers), vector indexing (ChromaDB), and contextual LLM generation with anti-hallucination scoring.",
        stack: ["Python", "ChromaDB", "Transformers", "OpenAI API", "HuggingFace"],
        github: "https://github.com/taha-azaghar",
      },
      {
        num: "03",
        status: "STABLE",
        statusColor: "yellow" as const,
        title: "LEHRI Store",
        org: "E-Commerce Suite",
        description:
          "Enterprise-grade CRM and sales management platform. Secure microservices architecture with JWT, optimized MySQL schema migration, and reusable Angular components.",
        stack: ["Spring Boot", "Angular", "MySQL", "JWT", "Docker"],
        github: "https://github.com/taha-azaghar",
      },
      {
        num: "04",
        status: "ACTIVE",
        statusColor: "green" as const,
        title: "ResearchRadar",
        org: "AI Intelligence",
        description:
          "AI trend monitoring platform. Ingests ArXiv and technical papers, vectorizes with Gemini Embedding 2, and calculates 'Emergence Scores' for early tech adoption detection.",
        stack: ["FastAPI", "Qdrant", "Gemini API", "React", "Tailwind"],
        github: "https://github.com/taha-azaghar",
      },
    ],
    experience: [
      {
        type: "work" as const,
        badge: "AI CORE",
        period: "2025",
        role: "AI & Automation Engineer",
        org: "Brain Gen Technology · Paris (Remote)",
        points: [
          "Developed multi-agent AI systems with specialized tools via MCP",
          "Engineered scalable ETL pipelines for 10+ financial APIs using Pandas/NumPy",
          "Orchestrated workflows with n8n, Celery, and Redis for 24/7 reliability",
          "Implemented RAG with advanced scoring and halluncination detection",
        ],
      },
      {
        type: "work" as const,
        badge: "FULL STACK",
        period: "2024",
        role: "Full Stack Java/Angular Developer",
        org: "Digital Box Technologies · Rabat",
        points: [
          "Developed enterprise sales management platform with Spring Boot microservices",
          "Migrated legacy MySQL schemas with high integrity and validation scripts",
          "Built a robust frontend using Angular, RxJS, and reactive forms",
        ],
      },
      {
        type: "work" as const,
        badge: "MERN",
        period: "2023",
        role: "Full Stack Developer",
        org: "6Solutions Consulting · Casablanca",
        points: [
          "Built a recruitment platform using Node.js, Express, and React",
          "Automated HR workflows including candidate matching and notifications",
          "Designed analytical dashboards for recruitment performance tracking",
        ],
      },
      {
        type: "edu" as const,
        badge: "M.Sc.",
        period: "2020 – 2025",
        role: "M.Sc. Computer Engineering (Bac+5)",
        org: "EMSI · École Marocaine des Sciences de l'Ingénieur, Casablanca",
        points: [
          "Specialized in AI systems, Big Data, and Distributed architectures",
          "Daily practice of Agile/Scrum and modern software engineering",
        ],
      },
    ],
  },
  fr: {
    personal: {
      name: "Taha Azaghar",
      title: "Ingénieur IA & Automatisation · Développeur Full Stack · Data Scientist",
      location: "Casablanca, Maroc",
      bio: [
        "Ingénieur informatique Bac+5 (EMSI Casablanca, 2025) avec une triple expertise en développement de systèmes IA (agents LLM, RAG, MCP, LangChain), ingénierie des données (pipelines ETL, MLOps) et développement full stack.",
        "Utilisateur quotidien de Claude Code, Ollama et des protocoles MCP — l'IA comme outil de développement pour accélérer les livraisons complexes.",
        "Autonome sur des projets de bout en bout, bon communicant et engagé dans une démarche d'excellence technique continue.",
      ],
    },
    skills: [
      {
        category: "Ingénierie IA & LLM",
        color: "green" as const,
        items: [
          { name: "LangChain / Agents / RAG", level: 95 },
          { name: "MCP / Tool-Use / Prompt Engineering", level: 92 },
          { name: "OpenAI / Claude / Mistral / Ollama", level: 90 },
          { name: "ChromaDB / Qdrant / Recherche Vectorielle", level: 88 },
        ],
      },
      {
        category: "Data & ML Engineering",
        color: "yellow" as const,
        items: [
          { name: "Pipelines ETL (Pandas, NumPy)", level: 90 },
          { name: "MLOps (PyTorch, TensorFlow)", level: 85 },
          { name: "Orchestration (n8n, Celery, Redis)", level: 93 },
          { name: "Séries Temporelles (TimescaleDB)", level: 80 },
        ],
      },
      {
        category: "Backend & APIs",
        color: "cyan" as const,
        items: [
          { name: "Python (FastAPI, Django, Flask)", level: 95 },
          { name: "Java / Spring Boot", level: 85 },
          { name: "Node.js / Express", level: 88 },
          { name: "REST / JWT / OpenAPI", level: 92 },
        ],
      },
      {
        category: "Frontend & UI",
        color: "cyan" as const,
        items: [
          { name: "React / Next.js", level: 90 },
          { name: "Angular / TypeScript", level: 85 },
          { name: "Tailwind CSS / HTML5 / CSS3", level: 95 },
        ],
      },
      {
        category: "DevOps & Cloud",
        color: "muted" as const,
        items: [
          { name: "Docker / Kubernetes", level: 85 },
          { name: "GitHub Actions / CI/CD", level: 90 },
          { name: "GCP / Azure / AWS", level: 80 },
        ],
      },
    ],
    projects: [
      {
        num: "01",
        status: "PRODUCTION",
        statusColor: "green" as const,
        title: "Bot de Trading IA",
        org: "Brain Gen Technology",
        description:
          "Système multi-agents complet avec personas spécialisés (technique, fondamental, sentiment). Pipelines ETL temps réel, orchestration MLOps via Celery/Redis.",
        stack: ["Python", "LangChain", "Celery", "TimescaleDB", "GCP", "Docker"],
        github: "https://github.com/taha-azaghar",
      },
      {
        num: "02",
        status: "VÉRIFIÉ",
        statusColor: "cyan" as const,
        title: "Recommandateur Sémantique",
        org: "Open Source",
        description:
          "Pipeline RAG pour recommandation de livres via embeddings sémantiques (Transformers), indexation vectorielle et génération contextuelle.",
        stack: ["Python", "ChromaDB", "Transformers", "OpenAI API", "HuggingFace"],
        github: "https://github.com/taha-azaghar",
      },
      {
        num: "03",
        status: "STABLE",
        statusColor: "yellow" as const,
        title: "LEHRI Store",
        org: "Suite E-Commerce",
        description:
          "CRM et gestion commerciale d'entreprise. Architecture microservices sécurisée avec JWT, migration MySQL et composants Angular réutilisables.",
        stack: ["Spring Boot", "Angular", "MySQL", "JWT", "Docker"],
        github: "https://github.com/taha-azaghar",
      },
      {
        num: "04",
        status: "ACTIF",
        statusColor: "green" as const,
        title: "ResearchRadar",
        org: "IA Intelligence",
        description:
          "Plateforme de suivi des tendances IA. Ingestion ArXiv, vectorisation Gemini Embedding 2 et calcul d'Emergence Score pour la détection précoce.",
        stack: ["FastAPI", "Qdrant", "Gemini API", "React", "Tailwind"],
        github: "https://github.com/taha-azaghar",
      },
    ],
    experience: [
      {
        type: "work" as const,
        badge: "CORE IA",
        period: "2025",
        role: "Ingénieur IA & Automatisation",
        org: "Brain Gen Technology · Paris (Remote)",
        points: [
          "Développement de systèmes multi-agents avec outils via MCP",
          "Conception de pipelines ETL scalables pour 10+ APIs financières",
          "Orchestration de workflows avec n8n, Celery et Redis",
          "Mise en œuvre RAG avec scoring et détection d'hallucinations",
        ],
      },
      {
        type: "work" as const,
        badge: "FULL STACK",
        period: "2024",
        role: "Développeur Full Stack Java/Angular",
        org: "Digital Box Technologies · Rabat",
        points: [
          "Plateforme de gestion commerciale microservices Spring Boot",
          "Migration de schémas MySQL avec scripts de validation",
          "Frontend Angular robuste avec RxJS et forms réactifs",
        ],
      },
      {
        type: "work" as const,
        badge: "MERN",
        period: "2023",
        role: "Développeur Full Stack",
        org: "6Solutions Consulting · Casablanca",
        points: [
          "Plateforme de recrutement avec Node.js, Express et React",
          "Automatisation des workflows RH (matching, notifications)",
          "Tableaux de bord analytiques pour le suivi du recrutement",
        ],
      },
      {
        type: "edu" as const,
        badge: "Ingénieur",
        period: "2020 – 2025",
        role: "Ingénieur d'État en Informatique (Bac+5)",
        org: "EMSI · École Marocaine des Sciences de l'Ingénieur, Casablanca",
        points: [
          "Spécialisation Systèmes d'IA, Big Data et Architectures Distribuées",
          "Pratique quotidienne Agile/Scrum et Software Engineering moderne",
        ],
      },
    ],
  },
};

export const personal = {
  email: "taha_789@live.fr",
  linkedin: "https://linkedin.com/in/taha-azaghar",
  github: "https://github.com/taha-azaghar",
  githubHandle: "@taha-azaghar",
  phone: "+212 623 698 700",
  cv: "/cv_taha_azaghar.pdf",
};

import { personal, translations } from "./data";

export type OutputLine = {
  id: string;
  html: string;
};

export type Lang = "en" | "fr";

let idCounter = 0;
function id() {
  return `line-${++idCounter}-${Math.random().toString(36).slice(2, 6)}`;
}

function line(html: string): OutputLine {
  return { id: id(), html };
}

function blank(): OutputLine {
  return line("");
}

function wrapText(text: string, maxLen: number): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let cur = "";
  words.forEach((w) => {
    if ((cur + " " + w).trim().length > maxLen) {
      lines.push(cur.trim());
      cur = w;
    } else {
      cur += (cur ? " " : "") + w;
    }
  });
  if (cur) lines.push(cur.trim());
  return lines;
}

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

const colorMap = {
  green: "style='color:var(--terminal-green)'",
  cyan: "style='color:var(--terminal-cyan)'",
  yellow: "style='color:var(--terminal-yellow)'",
  muted: "style='color:var(--terminal-muted)'",
};

// ─── COMMANDS ────────────────────────────────────────────────────────────────

export function cmdHelp(lang: Lang = "en"): OutputLine[] {
  const isEn = lang === "en";
  return [
    blank(),
    line(`<span style='color:var(--terminal-yellow)'>┌─ ${isEn ? "COMMANDS" : "COMMANDES"} ───────────────────────────────────────────────────┐</span>`),
    line(`<span style='color:var(--terminal-yellow)'>│</span>`),
    ...[
      ["about", isEn ? "Who I am & what I do" : "Qui je suis et ce que je fais"],
      ["skills", isEn ? "Tech stack & proficiency levels" : "Stack technique et niveaux"],
      ["projects", isEn ? "4 featured projects with details" : "4 projets phares détaillés"],
      ["experience", isEn ? "Work history & education" : "Expérience et éducation"],
      ["contact", isEn ? "Email, LinkedIn, GitHub, phone" : "Email, LinkedIn, GitHub, tél"],
      ["download cv", isEn ? "Get my resume as PDF" : "Télécharger mon CV (PDF)"],
      ["theme <name>", isEn ? "Switch theme (matrix, amber, modern, dark)" : "Changer de thème"],
      ["lang <en|fr>", isEn ? "Switch language to English or French" : "Changer la langue (en|fr)"],
      ["social", isEn ? "All professional links" : "Tous les liens sociaux"],
      ["whoami", isEn ? "Quick identity card" : "Carte d'identité rapide"],
      ["date", isEn ? "Print current date & time" : "Afficher la date et l'heure"],
      ["echo <text>", isEn ? "Echo text back to terminal" : "Afficher du texte"],
      ["open <1-4>", isEn ? "Open a project link in new tab" : "Ouvrir un lien projet"],
      ["ls", isEn ? "List all sections" : "Lister les sections"],
      ["clear", isEn ? "Clear the terminal" : "Effacer le terminal"],
      ["pwd", isEn ? "Current working directory" : "Répertoire actuel"],
    ].map(([c, d]) =>
      line(
        `<span style='color:var(--terminal-yellow)'>│</span>  <span style='color:var(--terminal-cyan);display:inline-block;width:130px'>${c}</span><span style='color:var(--terminal-muted)'>${d}</span>`
      )
    ),
    line(`<span style='color:var(--terminal-yellow)'>│</span>`),
    line(`<span style='color:var(--terminal-yellow)'>└──────────────────────────────────────────────────────────────┘</span>`),
    blank(),
  ];
}

export function cmdWhoami(lang: Lang = "en"): OutputLine[] {
  const data = translations[lang].personal;
  return [
    blank(),
    line(`  <span style='color:var(--terminal-green)'>●</span> <span style='color:var(--terminal-white);font-weight:700'>${esc(data.name)}</span>`),
    line(`  <span style='color:var(--terminal-muted)'>│</span> ${esc(data.title)}`),
    line(`  <span style='color:var(--terminal-muted)'>│</span> ${lang === "en" ? "M.Sc. CS — EMSI Casablanca, 2025" : "Master en Informatique — EMSI, 2025"}`),
    line(`  <span style='color:var(--terminal-muted)'>│</span> Location  <span style='color:var(--terminal-cyan)'>${esc(data.location)}</span>`),
    line(`  <span style='color:var(--terminal-muted)'>│</span> Status    <span style='color:var(--terminal-green)'>● ${lang === "en" ? "Open to opportunities" : "Ouvert aux opportunités"}</span>`),
    line(`  <span style='color:var(--terminal-muted)'>└</span> Remote    <span style='color:var(--terminal-yellow)'>${lang === "en" ? "Available" : "Disponible"}</span>`),
    blank(),
  ];
}

export function cmdAbout(lang: Lang = "en"): OutputLine[] {
  const data = translations[lang].personal;
  return [
    blank(),
    line(`<span style='color:var(--terminal-cyan)'>╔══════════════════════════════════════════════════════════════╗</span>`),
    line(
      `<span style='color:var(--terminal-cyan)'>║</span>  <span style='color:var(--terminal-yellow);font-weight:700'>${esc(data.name).toUpperCase()}</span>  <span style='color:var(--terminal-muted)'>// ${esc(data.title)}</span>                  <span style='color:var(--terminal-cyan)'>║</span>`
    ),
    line(`<span style='color:var(--terminal-cyan)'>╚══════════════════════════════════════════════════════════════╝</span>`),
    blank(),
    ...data.bio.map((b) => line(`  ${esc(b)}`)),
    blank(),
    line(`  <span style='color:var(--terminal-white)'>${data.location}</span>`),
    blank(),
    line(`  <span style='color:var(--terminal-dim)'>─────────────────────────────────────────────────────────────</span>`),
    line(
      `  <span style='color:var(--terminal-muted)'>${lang === "en" ? "Try" : "Essayer"}:</span> <span style='color:var(--terminal-green)'>projects</span> <span style='color:var(--terminal-muted)'>·</span> <span style='color:var(--terminal-green)'>skills</span> <span style='color:var(--terminal-muted)'>·</span> <span style='color:var(--terminal-green)'>contact</span>`
    ),
    blank(),
  ];
}

export function cmdSkills(lang: Lang = "en"): OutputLine[] {
  const data = translations[lang].skills;
  const lines: OutputLine[] = [blank(), line(`<span style='color:var(--terminal-yellow)'>// ${lang === "en" ? "SKILLS & STACK" : "COMPÉTENCES & STACK"}</span>`), blank()];

  data.forEach((cat) => {
    const c = colorMap[cat.color as keyof typeof colorMap] || colorMap.muted;
    lines.push(line(`  <span ${c} style='font-weight:700'>${esc(cat.category)}</span>`));
    cat.items.forEach(({ name, level }) => {
      const filled = Math.round(level / 5);
      const bar = "█".repeat(filled) + "░".repeat(20 - filled);
      lines.push(
        line(
          `  <span style='display:inline-block;width:190px;color:var(--terminal-muted);font-size:12px'>${esc(name)}</span>  <span style='color:var(--terminal-green);font-size:11px;letter-spacing:1px'>${bar}</span>  <span style='color:var(--terminal-dim);font-size:11px'>${level}%</span>`
        )
      );
    });
    lines.push(blank());
  });

  return lines;
}

export function cmdProjects(lang: Lang = "en"): OutputLine[] {
  const data = translations[lang].projects;
  const lines: OutputLine[] = [blank(), line(`<span style='color:var(--terminal-yellow)'>// ${lang === "en" ? "FEATURED PROJECTS" : "PROJETS PHARES"}</span>`), blank()];

  data.forEach((p) => {
    const sc = colorMap[p.statusColor as keyof typeof colorMap] || colorMap.muted;
    lines.push(
      line(
        `  <span style='color:var(--terminal-muted)'>[${p.num}]</span> <span ${sc} style='font-weight:700'>${esc(p.title)}</span>  <span style='font-size:11px;border:1px solid var(--terminal-border);padding:1px 5px;color:var(--terminal-dim)'>${p.status}</span>`
      )
    );
    lines.push(line(`  <span style='color:var(--terminal-muted)'>     ${esc(p.org)}</span>`));
    lines.push(blank());
    wrapText(p.description, 65).forEach((l) =>
      lines.push(line(`       <span style='color:var(--terminal-muted)'>${esc(l)}</span>`))
    );
    lines.push(blank());
    const tags = p.stack
      .map(
        (t) =>
          `<span style='color:var(--terminal-dim);font-size:11px;border:1px solid var(--terminal-border);padding:1px 5px'>${esc(t)}</span>`
      )
      .join(" ");
    lines.push(line(`       <span style='color:var(--terminal-muted)'>stack :</span> ${tags}`));
    if (p.github) {
      lines.push(
        line(
          `       <span style='color:var(--terminal-muted)'>link  :</span> <a href='${p.github}' target='_blank' rel='noopener' style='color:var(--terminal-cyan)'>${esc(p.github)}</a>`
        )
      );
    }
    lines.push(blank());
    lines.push(line(`  <span style='color:var(--terminal-border)'>──────────────────────────────────────────────────────────────</span>`));
    lines.push(blank());
  });

  return lines;
}

export function cmdExperience(lang: Lang = "en"): OutputLine[] {
  const data = translations[lang].experience;
  const lines: OutputLine[] = [
    blank(),
    line(`<span style='color:var(--terminal-yellow)'>// ${lang === "en" ? "EXPERIENCE & EDUCATION" : "EXPÉRIENCE & ÉDUCATION"}</span>`),
    blank(),
  ];

  data.forEach((item) => {
    const bc = item.type === "work" ? "style='color:var(--terminal-green)'" : "style='color:var(--terminal-cyan)'";
    const borderColor = item.type === "work" ? "var(--terminal-green)" : "var(--terminal-cyan)";
    lines.push(
      line(
        `  <span ${bc} style='font-size:11px;padding:1px 6px;border:1px solid ${borderColor}'>${item.badge}</span>  <span style='color:var(--terminal-white);font-weight:700'>${esc(item.role)}</span>`
      )
    );
    lines.push(line(`         <span style='color:var(--terminal-muted)'>${esc(item.org)}</span>`));
    lines.push(line(`         <span style='color:var(--terminal-dim)'>${item.period}</span>`));
    item.points.forEach((pt) =>
      lines.push(line(`         <span style='color:var(--terminal-muted)'>→</span> <span style='color:var(--terminal-muted)'>${esc(pt)}</span>`))
    );
    lines.push(blank());
  });

  return lines;
}

export function cmdContact(lang: Lang = "en"): OutputLine[] {
  const isEn = lang === "en";
  return [
    blank(),
    line(`<span style='color:var(--terminal-yellow)'>// CONTACT</span>`),
    blank(),
    line(
      `  <span style='color:var(--terminal-muted)'>email    →</span>  <a href='mailto:${personal.email}' style='color:var(--terminal-cyan)'>${esc(personal.email)}</a>`
    ),
    line(
      `  <span style='color:var(--terminal-muted)'>linkedin →</span>  <a href='${personal.linkedin}' target='_blank' rel='noopener' style='color:var(--terminal-cyan)'>${esc(personal.linkedin)}</a>`
    ),
    line(
      `  <span style='color:var(--terminal-muted)'>github   →</span>  <a href='${personal.github}' target='_blank' rel='noopener' style='color:var(--terminal-cyan)'>${esc(personal.github)}</a>`
    ),
    line(`  <span style='color:var(--terminal-muted)'>phone    →</span>  <span style='color:var(--terminal-muted)'>${esc(personal.phone)}</span>`),
    blank(),
    line(`  <span style='color:var(--terminal-muted)'>status   →</span>  <span style='color:var(--terminal-green)'>● ${isEn ? "Actively looking for opportunities" : "Recherche activement des opportunités"}</span>`),
    line(
      `  <span style='color:var(--terminal-muted)'>location →</span>  <span style='color:var(--terminal-muted)'>${esc(translations[lang].personal.location)} · ${isEn ? "Remote-friendly" : "Ouvert au télétravail"}</span>`
    ),
    blank(),
    line(`  <span style='color:var(--terminal-dim)'>${isEn ? "I respond to emails within 24h. Let's build something." : "Je réponds aux emails sous 24h. Construisons quelque chose."}</span>`),
    blank(),
  ];
}

export function cmdSocial(): OutputLine[] {
  return [
    blank(),
    line(
      `  <a href='${personal.github}' target='_blank' rel='noopener' style='color:var(--terminal-cyan)'>→ GitHub</a>     ${esc(personal.github)}`
    ),
    line(
      `  <a href='${personal.linkedin}' target='_blank' rel='noopener' style='color:var(--terminal-cyan)'>→ LinkedIn</a>   ${esc(personal.linkedin)}`
    ),
    line(
      `  <a href='mailto:${personal.email}' style='color:var(--terminal-cyan)'>→ Email</a>      ${esc(personal.email)}`
    ),
    blank(),
  ];
}

export function cmdLs(): OutputLine[] {
  return [
    blank(),
    ...["about/", "skills/", "projects/", "experience/", "contact/"].map((d) =>
      line(`<span style='color:var(--terminal-cyan)'>drwxr-xr-x</span>  ${d}`)
    ),
    ...["cv.pdf", "README.md"].map((f) =>
      line(`<span style='color:var(--terminal-white)'>-rw-r--r--</span>  ${f}`)
    ),
    blank(),
  ];
}

export function cmdPwd(): OutputLine[] {
  return [blank(), line(`  <span style='color:var(--terminal-muted)'>/home/taha/portfolio/2025</span>`), blank()];
}

export function cmdDate(): OutputLine[] {
  const now = new Date();
  const dateStr = now.toLocaleDateString("en-GB", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const timeStr = now.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  return [
    blank(),
    line(`  <span style='color:var(--terminal-green)'>${esc(dateStr)}</span>  <span style='color:var(--terminal-muted)'>${esc(timeStr)}</span>`),
    blank(),
  ];
}

export function cmdEcho(args: string): OutputLine[] {
  if (!args.trim()) return [blank(), line(`  <span style='color:var(--terminal-muted)'>usage: echo &lt;text&gt;</span>`), blank()];
  return [blank(), line(`  <span style='color:var(--terminal-white)'>${esc(args)}</span>`), blank()];
}

export function cmdOpen(arg: string, lang: Lang = "en"): OutputLine[] {
  const isEn = lang === "en";
  const numArg = arg.trim();
  const num = parseInt(numArg, 10);
  const data = translations[lang].projects;
  const project = data.find((p) => p.num === String(num).padStart(2, "0"));

  if (!project) {
    return [
      blank(),
      line(`  <span style='color:var(--terminal-red)'>${isEn ? "project not found" : "projet non trouvé"}:</span> <span style='color:var(--terminal-dim)'>${esc(numArg)}</span>`),
      line(`  <span style='color:var(--terminal-muted)'>${isEn ? "Usage" : "Usage"}: <span style='color:var(--terminal-green)'>open &lt;1-${data.length}&gt;</span></span>`),
      blank(),
    ];
  }
  const url = project.github;
  if (url) window.open(url, "_blank", "noopener");
  return [
    blank(),
    line(`  <span style='color:var(--terminal-green)'>↗</span> ${isEn ? "Opening" : "Ouverture de"} <span style='color:var(--terminal-white)'>${esc(project.title)}</span>`),
    line(`  <span style='color:var(--terminal-muted)'>${esc(url ?? "")}</span>`),
    blank(),
  ];
}

export function cmdTheme(arg: string, currentTheme: string, lang: Lang = "en"): OutputLine[] {
  const isEn = lang === "en";
  const themes = ["matrix", "amber", "modern", "dark"];
  const val = arg.trim().toLowerCase();

  if (!val) {
    return [
      blank(),
      line(`<span style='color:var(--terminal-yellow)'>// ${isEn ? "THEMES" : "THÈMES"}</span>`),
      line(`  ${isEn ? "Available" : "Disponibles"}: <span style='color:var(--terminal-green)'>${themes.join(", ")}</span>`),
      line(`  ${isEn ? "Usage" : "Usage"}: <span style='color:var(--terminal-cyan)'>theme &lt;name&gt;</span>`),
      blank(),
    ];
  }

  if (!themes.includes(val)) {
    return [
      blank(),
      line(`  <span style='color:var(--terminal-red)'>${isEn ? "Invalid theme" : "Thème invalide"}:</span> ${esc(val)}`),
      line(`  ${isEn ? "Try" : "Essayer"}: <span style='color:var(--terminal-green)'>${themes.join(", ")}</span>`),
      blank(),
    ];
  }

  return [
    blank(),
    line(`  <span style='color:var(--terminal-green)'>✓</span> ${isEn ? "Theme set to" : "Thème réglé sur"} <span style='color:var(--terminal-white)'>${esc(val)}</span>`),
    blank(),
  ];
}

export function cmdLang(arg: string, currentLang: Lang): { output: OutputLine[]; newLang?: Lang } {
  const isEn = currentLang === "en";
  const val = arg.trim().toLowerCase();

  if (!val) {
    return {
      output: [
        blank(),
        line(`<span style='color:var(--terminal-yellow)'>// LANGUAGE / LANGUE</span>`),
        line(`  ${isEn ? "Current" : "Actuelle"}: <span style='color:var(--terminal-green)'>${currentLang}</span>`),
        line(`  Usage: <span style='color:var(--terminal-cyan)'>lang &lt;en|fr&gt;</span>`),
        blank(),
      ],
    };
  }

  if (val === "en" || val === "fr") {
    return {
      output: [
        blank(),
        line(`  <span style='color:var(--terminal-green)'>✓</span> ${val === "en" ? "Language set to English" : "Langue réglée sur Français"}`),
        blank(),
      ],
      newLang: val as Lang,
    };
  }

  return {
    output: [
      blank(),
      line(`  <span style='color:var(--terminal-red)'>Error:</span> ${val} ${isEn ? "is not supported" : "n'est pas supporté"}.`),
      line(`  ${isEn ? "Try" : "Essayer"}: <span style='color:var(--terminal-green)'>en, fr</span>`),
      blank(),
    ],
  };
}

export function cmdNotFound(cmd: string, lang: Lang = "en"): OutputLine[] {
  const isEn = lang === "en";
  return [
    blank(),
    line(
      `  <span style='color:var(--terminal-red)'>${isEn ? "command not found" : "commande non trouvée"}:</span> <span style='color:var(--terminal-dim)'>${esc(cmd)}</span>`
    ),
    line(
      `  <span style='color:var(--terminal-muted)'>${isEn ? "Type" : "Tapez"}</span> <span style='color:var(--terminal-green)'>help</span> <span style='color:var(--terminal-muted)'>${isEn ? "to see available commands" : "pour voir les commandes"}</span>`
    ),
    blank(),
  ];
}

export function welcomeLines(lang: Lang = "en"): OutputLine[] {
  const data = translations[lang].personal;
  const isEn = lang === "en";
  const now = new Date();
  return [
    line(
      `<pre style='color:var(--terminal-green);font-size:clamp(8px, 1.8vw, 14px);line-height:1.1;margin-bottom:10px;text-align:center'>████████╗ █████╗ ██╗  ██╗ █████╗ \n╚══██╔══╝██╔══██╗██║  ██║██╔══██╗\n   ██║   ███████║███████║███████║\n   ██║   ██╔══██║██╔══██║██╔══██║\n   ██║   ██║  ██║██║  ██║██║  ██║\n   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝</pre>`
    ),
    blank(),
    line(
      `  <span style='color:var(--terminal-white);font-weight:700'>${esc(data.name)}</span>  <span style='color:var(--terminal-muted)'>—</span>  <span style='color:var(--terminal-muted)'>${esc(data.title)}</span>`
    ),
    line(`  <span style='color:var(--terminal-muted)'>${esc(data.location)}  ·  ${isEn ? "Open to remote" : "Ouvert au télétravail"}  ·  ${isEn ? "Available now" : "Disponible actuellement"}</span>`),
    blank(),
    line(
      `  <span style='color:var(--terminal-muted)'>${isEn ? "Last login" : "Dernière connexion"}: ${now.toDateString()} ${now.toLocaleTimeString()}</span>`
    ),
    blank(),
    line(
      `  ${isEn ? "Type" : "Tapez"} <span style='color:var(--terminal-green)'>help</span> ${isEn ? "for commands" : "pour les commandes"}. ${isEn ? "Use" : "Utilisez"} <span style='color:var(--terminal-yellow)'>↑ ↓</span> ${isEn ? "for history" : "pour l'historique"}. <span style='color:var(--terminal-yellow)'>Tab</span> ${isEn ? "to autocomplete" : "pour l'autocomplétion"}.`
    ),
    blank(),
    line(`<span style='color:var(--terminal-dim)'>  ─────────────────────────────────────────────────────────────</span>`),
    blank(),
  ];
}

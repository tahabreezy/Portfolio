import { personal, skills, projects, experience } from "./data";

export type OutputLine = {
  id: string;
  html: string;
};

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
  green: "style='color:#00ff88'",
  cyan: "style='color:#00d4ff'",
  yellow: "style='color:#f5c842'",
  muted: "style='color:#555'",
};

// ─── COMMANDS ────────────────────────────────────────────────────────────────

export function cmdHelp(): OutputLine[] {
  return [
    blank(),
    line(`<span style='color:#f5c842'>┌─ COMMANDS ───────────────────────────────────────────────────┐</span>`),
    line(`<span style='color:#f5c842'>│</span>`),
    ...[
      ["about", "Who I am & what I do"],
      ["skills", "Tech stack & proficiency levels"],
      ["projects", "4 featured projects with details"],
      ["experience", "Work history & education"],
      ["contact", "Email, LinkedIn, GitHub, phone"],
      ["download cv", "Get my resume as PDF"],
      ["social", "All professional links"],
      ["whoami", "Quick identity card"],
      ["date", "Print current date & time"],
      ["echo <text>", "Echo text back to terminal"],
      ["open <1-4>", "Open a project link in new tab"],
      ["ls", "List all sections"],
      ["clear", "Clear the terminal"],
      ["pwd", "Current working directory"],
    ].map(([c, d]) =>
      line(
        `<span style='color:#f5c842'>│</span>  <span style='color:#00d4ff;display:inline-block;width:130px'>${c}</span><span style='color:#555'>${d}</span>`
      )
    ),
    line(`<span style='color:#f5c842'>│</span>`),
    line(`<span style='color:#f5c842'>└──────────────────────────────────────────────────────────────┘</span>`),
    blank(),
  ];
}

export function cmdWhoami(): OutputLine[] {
  return [
    blank(),
    line(`  <span style='color:#00ff88'>●</span> <span style='color:#e8e8e8;font-weight:700'>${esc(personal.name)}</span>`),
    line(`  <span style='color:#555'>│</span> ${esc(personal.title)}`),
    line(`  <span style='color:#555'>│</span> M.Sc. CS — EMSI Casablanca, 2025`),
    line(`  <span style='color:#555'>│</span> Location  <span style='color:#00d4ff'>${esc(personal.location)}</span>`),
    line(`  <span style='color:#555'>│</span> Status    <span style='color:#00ff88'>● Open to opportunities</span>`),
    line(`  <span style='color:#555'>└</span> Remote    <span style='color:#f5c842'>Available</span>`),
    blank(),
  ];
}

export function cmdAbout(): OutputLine[] {
  return [
    blank(),
    line(`<span style='color:#00d4ff'>╔══════════════════════════════════════════════════════════════╗</span>`),
    line(
      `<span style='color:#00d4ff'>║</span>  <span style='color:#f5c842;font-weight:700'>${esc(personal.name).toUpperCase()}</span>  <span style='color:#555'>// ${esc(personal.title)}</span>                  <span style='color:#00d4ff'>║</span>`
    ),
    line(`<span style='color:#00d4ff'>╚══════════════════════════════════════════════════════════════╝</span>`),
    blank(),
    line(`  I build systems where AI agents collaborate, debate, and act.`),
    line(`  My focus: <span style='color:#00ff88'>LLM orchestration</span>, <span style='color:#00d4ff'>workflow automation</span>,`),
    line(`  and <span style='color:#f5c842'>scalable backend engineering</span>.`),
    blank(),
    line(`  At <span style='color:#e8e8e8'>Brain Gen Technology</span> I designed &amp; shipped a production`),
    line(`  multi-agent trading platform — 20+ APIs, autonomous agents,`),
    line(`  zero human intervention at runtime.`),
    blank(),
    line(
      `  Targeting roles in <span style='color:#00d4ff'>AI/ML Engineering</span>, <span style='color:#00d4ff'>Automation</span>,`
    ),
    line(`  <span style='color:#00d4ff'>Backend</span>, and <span style='color:#00d4ff'>Data Engineering</span>.`),
    blank(),
    line(`  <span style='color:#333'>─────────────────────────────────────────────────────────────</span>`),
    line(
      `  <span style='color:#555'>Try:</span> <span style='color:#00ff88'>projects</span> <span style='color:#555'>·</span> <span style='color:#00ff88'>skills</span> <span style='color:#555'>·</span> <span style='color:#00ff88'>contact</span>`
    ),
    blank(),
  ];
}

export function cmdSkills(): OutputLine[] {
  const lines: OutputLine[] = [blank(), line(`<span style='color:#f5c842'>// SKILLS & STACK</span>`), blank()];

  skills.forEach((cat) => {
    const c = colorMap[cat.color] || colorMap.muted;
    lines.push(line(`  <span ${c} style='font-weight:700'>${esc(cat.category)}</span>`));
    cat.items.forEach(({ name, level }) => {
      const filled = Math.round(level / 5);
      const bar = "█".repeat(filled) + "░".repeat(20 - filled);
      lines.push(
        line(
          `  <span style='display:inline-block;width:190px;color:#555;font-size:12px'>${esc(name)}</span>  <span style='color:#00ff88;font-size:11px;letter-spacing:1px'>${bar}</span>  <span style='color:#444;font-size:11px'>${level}%</span>`
        )
      );
    });
    lines.push(blank());
  });

  return lines;
}

export function cmdProjects(): OutputLine[] {
  const lines: OutputLine[] = [blank(), line(`<span style='color:#f5c842'>// FEATURED PROJECTS</span>`), blank()];

  projects.forEach((p) => {
    const sc = colorMap[p.statusColor] || colorMap.muted;
    lines.push(
      line(
        `  <span style='color:#555'>[${p.num}]</span> <span ${sc} style='font-weight:700'>${esc(p.title)}</span>  <span style='font-size:11px;border:1px solid #222;padding:1px 5px;color:#444'>${p.status}</span>`
      )
    );
    lines.push(line(`  <span style='color:#555'>     ${esc(p.org)}</span>`));
    lines.push(blank());
    wrapText(p.description, 65).forEach((l) =>
      lines.push(line(`       <span style='color:#666'>${esc(l)}</span>`))
    );
    lines.push(blank());
    const tags = p.stack
      .map(
        (t) =>
          `<span style='color:#3a3a3a;font-size:11px;border:1px solid #1e1e1e;padding:1px 5px'>${esc(t)}</span>`
      )
      .join(" ");
    lines.push(line(`       <span style='color:#555'>stack :</span> ${tags}`));
    if (p.github) {
      lines.push(
        line(
          `       <span style='color:#555'>link  :</span> <a href='${p.github}' target='_blank' rel='noopener' style='color:#00d4ff;text-decoration:underline'>${esc(p.github)}</a>`
        )
      );
    }
    lines.push(blank());
    lines.push(line(`  <span style='color:#1e1e1e'>──────────────────────────────────────────────────────────────</span>`));
    lines.push(blank());
  });

  return lines;
}

export function cmdExperience(): OutputLine[] {
  const lines: OutputLine[] = [
    blank(),
    line(`<span style='color:#f5c842'>// EXPERIENCE & EDUCATION</span>`),
    blank(),
  ];

  experience.forEach((item) => {
    const bc = item.type === "work" ? "style='color:#00ff88'" : "style='color:#00d4ff'";
    const borderColor = item.type === "work" ? "#00ff88" : "#00d4ff";
    lines.push(
      line(
        `  <span ${bc} style='font-size:11px;padding:1px 6px;border:1px solid ${borderColor}'>${item.badge}</span>  <span style='color:#e8e8e8;font-weight:700'>${esc(item.role)}</span>`
      )
    );
    lines.push(line(`         <span style='color:#555'>${esc(item.org)}</span>`));
    lines.push(line(`         <span style='color:#333'>${item.period}</span>`));
    item.points.forEach((pt) =>
      lines.push(line(`         <span style='color:#555'>→</span> <span style='color:#555'>${esc(pt)}</span>`))
    );
    lines.push(blank());
  });

  return lines;
}

export function cmdContact(): OutputLine[] {
  return [
    blank(),
    line(`<span style='color:#f5c842'>// CONTACT</span>`),
    blank(),
    line(
      `  <span style='color:#555'>email    →</span>  <a href='mailto:${personal.email}' style='color:#00d4ff'>${esc(personal.email)}</a>`
    ),
    line(
      `  <span style='color:#555'>linkedin →</span>  <a href='${personal.linkedin}' target='_blank' rel='noopener' style='color:#00d4ff'>${esc(personal.linkedin)}</a>`
    ),
    line(
      `  <span style='color:#555'>github   →</span>  <a href='${personal.github}' target='_blank' rel='noopener' style='color:#00d4ff'>${esc(personal.github)}</a>`
    ),
    line(`  <span style='color:#555'>phone    →</span>  <span style='color:#555'>${esc(personal.phone)}</span>`),
    blank(),
    line(`  <span style='color:#555'>status   →</span>  <span style='color:#00ff88'>● Actively looking for opportunities</span>`),
    line(
      `  <span style='color:#555'>location →</span>  <span style='color:#666'>${esc(personal.location)} · Remote-friendly</span>`
    ),
    blank(),
    line(`  <span style='color:#444'>I respond to emails within 24h. Let's build something.</span>`),
    blank(),
  ];
}

export function cmdSocial(): OutputLine[] {
  return [
    blank(),
    line(
      `  <a href='${personal.github}' target='_blank' rel='noopener' style='color:#00d4ff'>→ GitHub</a>     ${esc(personal.github)}`
    ),
    line(
      `  <a href='${personal.linkedin}' target='_blank' rel='noopener' style='color:#00d4ff'>→ LinkedIn</a>   ${esc(personal.linkedin)}`
    ),
    line(
      `  <a href='mailto:${personal.email}' style='color:#00d4ff'>→ Email</a>      ${esc(personal.email)}`
    ),
    blank(),
  ];
}

export function cmdLs(): OutputLine[] {
  return [
    blank(),
    ...["about/", "skills/", "projects/", "experience/", "contact/"].map((d) =>
      line(`<span style='color:#00d4ff'>drwxr-xr-x</span>  ${d}`)
    ),
    ...["cv.pdf", "README.md"].map((f) =>
      line(`<span style='color:#e8e8e8'>-rw-r--r--</span>  ${f}`)
    ),
    blank(),
  ];
}

export function cmdPwd(): OutputLine[] {
  return [blank(), line(`  /home/taha/portfolio/2025`), blank()];
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
    line(`  <span style='color:#00ff88'>${esc(dateStr)}</span>  <span style='color:#555'>${esc(timeStr)}</span>`),
    blank(),
  ];
}

export function cmdEcho(args: string): OutputLine[] {
  if (!args.trim()) return [blank(), line(`  <span style='color:#555'>usage: echo <text></span>`), blank()];
  return [blank(), line(`  <span style='color:#e8e8e8'>${esc(args)}</span>`), blank()];
}

export function cmdOpen(arg: string): OutputLine[] {
  const num = parseInt(arg.trim(), 10);
  const project = projects.find((p) => p.num === String(num).padStart(2, "0"));
  if (!project) {
    return [
      blank(),
      line(`  <span style='color:#ff5555'>project not found:</span> <span style='color:#666'>${esc(arg.trim())}</span>`),
      line(`  <span style='color:#555'>Usage: <span style='color:#00ff88'>open <1-${projects.length}></span></span>`),
      blank(),
    ];
  }
  const url = project.live ?? project.github;
  if (url) window.open(url, "_blank", "noopener");
  return [
    blank(),
    line(`  <span style='color:#00ff88'>↗</span> Opening <span style='color:#e8e8e8'>${esc(project.title)}</span>`),
    line(`  <span style='color:#555'>${esc(url ?? "")}</span>`),
    blank(),
  ];
}

export function cmdNotFound(cmd: string): OutputLine[] {
  return [
    blank(),
    line(
      `  <span style='color:#ff5555'>command not found:</span> <span style='color:#666'>${esc(cmd)}</span>`
    ),
    line(
      `  <span style='color:#555'>Type</span> <span style='color:#00ff88'>help</span> <span style='color:#555'>to see available commands.</span>`
    ),
    blank(),
  ];
}

export function welcomeLines(): OutputLine[] {
  const now = new Date();
  return [
    line(
      `<pre style='color:#00ff88;font-size:clamp(8px, 1.8vw, 14px);line-height:1.1;margin-bottom:10px;text-align:center'>████████╗ █████╗ ██╗  ██╗ █████╗ \n╚══██╔══╝██╔══██╗██║  ██║██╔══██╗\n   ██║   ███████║███████║███████║\n   ██║   ██╔══██║██╔══██║██╔══██║\n   ██║   ██║  ██║██║  ██║██║  ██║\n   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝</pre>`
    ),
    blank(),
    line(
      `  <span style='color:#e8e8e8;font-weight:700'>${esc(personal.name)}</span>  <span style='color:#555'>—</span>  <span style='color:#666'>${esc(personal.title)}</span>`
    ),
    line(`  <span style='color:#555'>${esc(personal.location)}  ·  Open to remote  ·  Available now</span>`),
    blank(),
    line(
      `  <span style='color:#555'>Last login: ${now.toDateString()} ${now.toLocaleTimeString()}</span>`
    ),
    blank(),
    line(
      `  Type <span style='color:#00ff88'>help</span> for commands. Use <span style='color:#f5c842'>↑ ↓</span> for history. <span style='color:#f5c842'>Tab</span> to autocomplete.`
    ),
    blank(),
    line(`<span style='color:#1e1e1e'>  ─────────────────────────────────────────────────────────────</span>`),
    blank(),
  ];
}

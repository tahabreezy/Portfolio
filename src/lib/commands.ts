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
  green: "style='color:var(--terminal-green)'",
  cyan: "style='color:var(--terminal-cyan)'",
  yellow: "style='color:var(--terminal-yellow)'",
  muted: "style='color:var(--terminal-muted)'",
};

// ─── COMMANDS ────────────────────────────────────────────────────────────────

export function cmdHelp(): OutputLine[] {
  return [
    blank(),
    line(`<span style='color:var(--terminal-yellow)'>┌─ COMMANDS ───────────────────────────────────────────────────┐</span>`),
    line(`<span style='color:var(--terminal-yellow)'>│</span>`),
    ...[
      ["about", "Who I am & what I do"],
      ["skills", "Tech stack & proficiency levels"],
      ["projects", "4 featured projects with details"],
      ["experience", "Work history & education"],
      ["contact", "Email, LinkedIn, GitHub, phone"],
      ["download cv", "Get my resume as PDF"],
      ["theme <name>", "Switch theme (matrix, amber, modern, dark)"],
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
        `<span style='color:var(--terminal-yellow)'>│</span>  <span style='color:var(--terminal-cyan);display:inline-block;width:130px'>${c}</span><span style='color:var(--terminal-muted)'>${d}</span>`
      )
    ),
    line(`<span style='color:var(--terminal-yellow)'>│</span>`),
    line(`<span style='color:var(--terminal-yellow)'>└──────────────────────────────────────────────────────────────┘</span>`),
    blank(),
  ];
}

export function cmdWhoami(): OutputLine[] {
  return [
    blank(),
    line(`  <span style='color:var(--terminal-green)'>●</span> <span style='color:var(--terminal-white);font-weight:700'>${esc(personal.name)}</span>`),
    line(`  <span style='color:var(--terminal-muted)'>│</span> ${esc(personal.title)}`),
    line(`  <span style='color:var(--terminal-muted)'>│</span> M.Sc. CS — EMSI Casablanca, 2025`),
    line(`  <span style='color:var(--terminal-muted)'>│</span> Location  <span style='color:var(--terminal-cyan)'>${esc(personal.location)}</span>`),
    line(`  <span style='color:var(--terminal-muted)'>│</span> Status    <span style='color:var(--terminal-green)'>● Open to opportunities</span>`),
    line(`  <span style='color:var(--terminal-muted)'>└</span> Remote    <span style='color:var(--terminal-yellow)'>Available</span>`),
    blank(),
  ];
}

export function cmdAbout(): OutputLine[] {
  return [
    blank(),
    line(`<span style='color:var(--terminal-cyan)'>╔══════════════════════════════════════════════════════════════╗</span>`),
    line(
      `<span style='color:var(--terminal-cyan)'>║</span>  <span style='color:var(--terminal-yellow);font-weight:700'>${esc(personal.name).toUpperCase()}</span>  <span style='color:var(--terminal-muted)'>// ${esc(personal.title)}</span>                  <span style='color:var(--terminal-cyan)'>║</span>`
    ),
    line(`<span style='color:var(--terminal-cyan)'>╚══════════════════════════════════════════════════════════════╝</span>`),
    blank(),
    line(`  I build systems where AI agents collaborate, debate, and act.`),
    line(`  My focus: <span style='color:var(--terminal-green)'>LLM orchestration</span>, <span style='color:var(--terminal-cyan)'>workflow automation</span>,`),
    line(`  and <span style='color:var(--terminal-yellow)'>scalable backend engineering</span>.`),
    blank(),
    line(`  At <span style='color:var(--terminal-white)'>Brain Gen Technology</span> I designed &amp; shipped a production`),
    line(`  multi-agent trading platform — 20+ APIs, autonomous agents,`),
    line(`  zero human intervention at runtime.`),
    blank(),
    line(
      `  Targeting roles in <span style='color:var(--terminal-cyan)'>AI/ML Engineering</span>, <span style='color:var(--terminal-cyan)'>Automation</span>,`
    ),
    line(`  <span style='color:var(--terminal-cyan)'>Backend</span>, and <span style='color:var(--terminal-cyan)'>Data Engineering</span>.`),
    blank(),
    line(`  <span style='color:var(--terminal-dim)'>─────────────────────────────────────────────────────────────</span>`),
    line(
      `  <span style='color:var(--terminal-muted)'>Try:</span> <span style='color:var(--terminal-green)'>projects</span> <span style='color:var(--terminal-muted)'>·</span> <span style='color:var(--terminal-green)'>skills</span> <span style='color:var(--terminal-muted)'>·</span> <span style='color:var(--terminal-green)'>contact</span>`
    ),
    blank(),
  ];
}

export function cmdSkills(): OutputLine[] {
  const lines: OutputLine[] = [blank(), line(`<span style='color:var(--terminal-yellow)'>// SKILLS & STACK</span>`), blank()];

  skills.forEach((cat) => {
    const c = colorMap[cat.color] || colorMap.muted;
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

export function cmdProjects(): OutputLine[] {
  const lines: OutputLine[] = [blank(), line(`<span style='color:var(--terminal-yellow)'>// FEATURED PROJECTS</span>`), blank()];

  projects.forEach((p) => {
    const sc = colorMap[p.statusColor] || colorMap.muted;
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
          `       <span style='color:var(--terminal-muted)'>link  :</span> <a href='${p.github}' target='_blank' rel='noopener' style='color:var(--terminal-cyan);text-decoration:underline'>${esc(p.github)}</a>`
        )
      );
    }
    lines.push(blank());
    lines.push(line(`  <span style='color:var(--terminal-border)'>──────────────────────────────────────────────────────────────</span>`));
    lines.push(blank());
  });

  return lines;
}

export function cmdExperience(): OutputLine[] {
  const lines: OutputLine[] = [
    blank(),
    line(`<span style='color:var(--terminal-yellow)'>// EXPERIENCE & EDUCATION</span>`),
    blank(),
  ];

  experience.forEach((item) => {
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

export function cmdContact(): OutputLine[] {
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
    line(`  <span style='color:var(--terminal-muted)'>status   →</span>  <span style='color:var(--terminal-green)'>● Actively looking for opportunities</span>`),
    line(
      `  <span style='color:var(--terminal-muted)'>location →</span>  <span style='color:var(--terminal-muted)'>${esc(personal.location)} · Remote-friendly</span>`
    ),
    blank(),
    line(`  <span style='color:var(--terminal-dim)'>I respond to emails within 24h. Let's build something.</span>`),
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

export function cmdOpen(arg: string): OutputLine[] {
  const num = parseInt(arg.trim(), 10);
  const project = projects.find((p) => p.num === String(num).padStart(2, "0"));
  if (!project) {
    return [
      blank(),
      line(`  <span style='color:var(--terminal-red)'>project not found:</span> <span style='color:var(--terminal-dim)'>${esc(arg.trim())}</span>`),
      line(`  <span style='color:var(--terminal-muted)'>Usage: <span style='color:var(--terminal-green)'>open &lt;1-${projects.length}&gt;</span></span>`),
      blank(),
    ];
  }
  const url = project.live ?? project.github;
  if (url) window.open(url, "_blank", "noopener");
  return [
    blank(),
    line(`  <span style='color:var(--terminal-green)'>↗</span> Opening <span style='color:var(--terminal-white)'>${esc(project.title)}</span>`),
    line(`  <span style='color:var(--terminal-muted)'>${esc(url ?? "")}</span>`),
    blank(),
  ];
}

export function cmdTheme(arg: string): OutputLine[] {
  const themes = ["matrix", "amber", "modern", "dark"];
  const val = arg.trim().toLowerCase();

  if (!val) {
    return [
      blank(),
      line(`<span style='color:var(--terminal-yellow)'>// THEMES</span>`),
      line(`  Available: <span style='color:var(--terminal-green)'>${themes.join(", ")}</span>`),
      line(`  Usage: <span style='color:var(--terminal-cyan)'>theme &lt;name&gt;</span>`),
      blank(),
    ];
  }

  if (!themes.includes(val)) {
    return [
      blank(),
      line(`  <span style='color:var(--terminal-red)'>Invalid theme:</span> ${esc(val)}`),
      line(`  Try: <span style='color:var(--terminal-green)'>${themes.join(", ")}</span>`),
      blank(),
    ];
  }

  return [
    blank(),
    line(`  <span style='color:var(--terminal-green)'>✓</span> Theme set to <span style='color:var(--terminal-white)'>${esc(val)}</span>`),
    blank(),
  ];
}

export function cmdNotFound(cmd: string): OutputLine[] {
  return [
    blank(),
    line(
      `  <span style='color:var(--terminal-red)'>command not found:</span> <span style='color:var(--terminal-dim)'>${esc(cmd)}</span>`
    ),
    line(
      `  <span style='color:var(--terminal-muted)'>Type</span> <span style='color:var(--terminal-green)'>help</span> <span style='color:var(--terminal-muted)'>to see available commands.</span>`
    ),
    blank(),
  ];
}

export function welcomeLines(): OutputLine[] {
  const now = new Date();
  return [
    line(
      `<pre style='color:var(--terminal-green);font-size:clamp(8px, 1.8vw, 14px);line-height:1.1;margin-bottom:10px;text-align:center'>████████╗ █████╗ ██╗  ██╗ █████╗ \n╚══██╔══╝██╔══██╗██║  ██║██╔══██╗\n   ██║   ███████║███████║███████║\n   ██║   ██╔══██║██╔══██║██╔══██║\n   ██║   ██║  ██║██║  ██║██║  ██║\n   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝</pre>`
    ),
    blank(),
    line(
      `  <span style='color:var(--terminal-white);font-weight:700'>${esc(personal.name)}</span>  <span style='color:var(--terminal-muted)'>—</span>  <span style='color:var(--terminal-muted)'>${esc(personal.title)}</span>`
    ),
    line(`  <span style='color:var(--terminal-muted)'>${esc(personal.location)}  ·  Open to remote  ·  Available now</span>`),
    blank(),
    line(
      `  <span style='color:var(--terminal-muted)'>Last login: ${now.toDateString()} ${now.toLocaleTimeString()}</span>`
    ),
    blank(),
    line(
      `  Type <span style='color:var(--terminal-green)'>help</span> for commands. Use <span style='color:var(--terminal-yellow)'>↑ ↓</span> for history. <span style='color:var(--terminal-yellow)'>Tab</span> to autocomplete.`
    ),
    blank(),
    line(`<span style='color:var(--terminal-dim)'>  ─────────────────────────────────────────────────────────────</span>`),
    blank(),
  ];
}

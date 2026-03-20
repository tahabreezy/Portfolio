"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  OutputLine,
  Lang,
  cmdHelp,
  cmdWhoami,
  cmdAbout,
  cmdSkills,
  cmdProjects,
  cmdExperience,
  cmdContact,
  cmdSocial,
  cmdLs,
  cmdPwd,
  cmdDate,
  cmdEcho,
  cmdOpen,
  cmdTheme,
  cmdLang,
  cmdNotFound,
  welcomeLines,
} from "@/lib/commands";
import { personal, translations } from "@/lib/data";
import Boot from "./Boot";
import AsciiBackground from "./AsciiBackground";
import SnakeGame from "./SnakeGame";
import { trackEvent } from "@/lib/monitor";

const SHORTCUTS = [
  "help",
  "about",
  "skills",
  "projects",
  "experience",
  "contact",
  "download cv",
  "clear",
  "crt",
  "snake",
];

const ALL_COMMANDS = [
  "help",
  "whoami",
  "about",
  "skills",
  "projects",
  "experience",
  "contact",
  "social",
  "download cv",
  "date",
  "echo",
  "open",
  "ls",
  "pwd",
  "theme",
  "lang",
  "clear",
  "crt",
  "snake",
];

function promptLine(cmd: string): OutputLine {
  return {
    id: `prompt-${Date.now()}-${Math.random()}`,
    html: `<span style='color:#00ff88'>taha@portfolio</span><span style='color:#333'>:</span><span style='color:#00ff88'>~</span><span style='color:#333'>$</span> <span style='color:#e8e8e8'>${cmd.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</span>`,
  };
}

export default function TerminalPortfolio() {
  const [booted, setBooted] = useState(false);
  const [lines, setLines] = useState<OutputLine[]>([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [clock, setClock] = useState("");
  const [showAscii, setShowAscii] = useState(true);
  const [showCrt, setShowCrt] = useState(false);
  const [isGameMode, setIsGameMode] = useState(false);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  const termRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);

  // Clock
  useEffect(() => {
    const tick = () =>
      setClock(
        new Date().toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);

  // Scroll to bottom
  useEffect(() => {
    if (termRef.current) {
      termRef.current.scrollTop = termRef.current.scrollHeight;
    }
  }, [lines]);

  // Focus input on click
  const focusInput = useCallback(() => inputRef.current?.focus(), []);

  const [theme, setTheme] = useState<string>("matrix");
  const [lang, setLang] = useState<Lang>("en");
  const [mounted, setMounted] = useState(false);

  // Load theme and lang from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("terminal-theme");
    if (savedTheme) setTheme(savedTheme);

    const savedLang = localStorage.getItem("terminal-lang") as Lang;
    if (savedLang && (savedLang === "en" || savedLang === "fr")) {
      setLang(savedLang);
    } else {
      // Auto-detect browser language
      const browserLang = navigator.language.split("-")[0];
      if (browserLang === "fr") setLang("fr");
    }

    const savedAscii = localStorage.getItem("terminal-ascii");
    if (savedAscii !== null) setShowAscii(savedAscii === "true");

    const savedCrt = localStorage.getItem("terminal-crt");
    if (savedCrt !== null) setShowCrt(savedCrt === "true");

    setMounted(true);
  }, []);

  // Save theme and lang to localStorage
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("terminal-theme", theme);
      localStorage.setItem("terminal-lang", lang);
      localStorage.setItem("terminal-ascii", showAscii.toString());
      localStorage.setItem("terminal-crt", showCrt.toString());
    }
  }, [theme, lang, showAscii, showCrt, mounted]);

  const appendLines = useCallback((newLines: OutputLine[]) => {
    setLines((prev) => [...prev, ...newLines]);
  }, []);

  const streamLines = useCallback(
    (linesToStream: OutputLine[], delayMs = 55) => {
      linesToStream.forEach((l, i) => {
        setTimeout(() => {
          setLines((prev) => [...prev, l]);
        }, i * delayMs);
      });
    },
    []
  );

  const handleBoot = useCallback(() => {
    setBooted(true);
    const wl = welcomeLines(lang);
    streamLines(wl, 55);
    setTimeout(() => inputRef.current?.focus(), wl.length * 55 + 100);
  }, [streamLines, lang]);

  const runCommand = useCallback(
    (raw: string) => {
      const fullCmd = raw.trim();
      const [cmd, ...argsArr] = fullCmd.split(" ");
      const args = argsArr.join(" ");
      const cmdLower = cmd.toLowerCase();

      setInput("");
      setHistIdx(-1);

      if (fullCmd) {
        appendLines([promptLine(fullCmd)]);
        setHistory((h) => [fullCmd, ...h]);
      }

      trackEvent("COMMAND_RUN", { name: cmdLower, args });

      switch (cmdLower) {
        case "help":
          appendLines(cmdHelp(lang));
          break;
        case "whoami":
          appendLines(cmdWhoami(lang));
          break;
        case "about":
          appendLines(cmdAbout(lang));
          break;
        case "skills":
          appendLines(cmdSkills(lang));
          break;
        case "projects":
          appendLines(cmdProjects(lang));
          break;
        case "experience":
          appendLines(cmdExperience(lang));
          break;
        case "contact":
          appendLines(cmdContact(lang));
          break;
        case "social":
          appendLines(cmdSocial());
          break;
        case "download":
          if (args.toLowerCase() === "cv") {
            const a = document.createElement("a");
            a.href = personal.cv;
            a.download = "cv_taha_azaghar.pdf";
            a.click();
            appendLines([
              { id: `dl-${Date.now()}`, html: `  <span style='color:var(--terminal-green)'>Fetching</span> cv_taha_azaghar.pdf <span style='color:var(--terminal-muted)'>...</span>` },
              { id: `dl2-${Date.now()}`, html: `  <span style='color:var(--terminal-green)'>✓</span> <span style='color:var(--terminal-muted)'>Download initiated.</span>` },
            ]);
          } else {
            appendLines(cmdNotFound(fullCmd, lang));
          }
          break;
        case "theme":
          const themeArgs = args.trim().toLowerCase();
          if (["matrix", "amber", "modern", "dark"].includes(themeArgs)) {
            setTheme(themeArgs);
          }
          appendLines(cmdTheme(args, theme, lang));
          break;
        case "lang":
          const { output, newLang } = cmdLang(args, lang);
          if (newLang) setLang(newLang);
          appendLines(output);
          break;
        case "ascii":
          const asciiArg = args.trim().toLowerCase();
          if (asciiArg === "on") {
            setShowAscii(true);
            appendLines([{ id: `ascii-${Date.now()}`, html: "  <span style='color:var(--terminal-green)'>✓</span> ASCII background enabled." }]);
          } else if (asciiArg === "off") {
            setShowAscii(false);
            appendLines([{ id: `ascii-${Date.now()}`, html: "  <span style='color:var(--terminal-red)'>✗</span> ASCII background disabled." }]);
          } else {
            appendLines([{ id: `ascii-${Date.now()}`, html: lang === "en" ? "  Usage: <span style='color:var(--terminal-cyan)'>ascii &lt;on|off&gt;</span>" : "  Utilisation : <span style='color:var(--terminal-cyan)'>ascii &lt;on|off&gt;</span>" }]);
          }
          break;
        case "crt":
          const crtArg = args.trim().toLowerCase();
          if (crtArg === "on") {
            setShowCrt(true);
            appendLines([{ id: `crt-${Date.now()}`, html: "  <span style='color:var(--terminal-green)'>✓</span> CRT effects enabled." }]);
          } else if (crtArg === "off") {
            setShowCrt(false);
            appendLines([{ id: `crt-${Date.now()}`, html: "  <span style='color:var(--terminal-red)'>✗</span> CRT effects disabled." }]);
          } else {
            appendLines([{ id: `crt-${Date.now()}`, html: lang === "en" ? "  Usage: <span style='color:var(--terminal-cyan)'>crt &lt;on|off&gt;</span>" : "  Utilisation : <span style='color:var(--terminal-cyan)'>crt &lt;on|off&gt;</span>" }]);
          }
          break;
        case "snake":
          setIsGameMode(true);
          appendLines([{ id: `snake-${Date.now()}`, html: "  <span style='color:var(--terminal-green)'>🐍</span> Launching Snake... (Press ESC to exit)" }]);
          break;
        case "date":
          appendLines(cmdDate());
          break;
        case "echo":
          appendLines(cmdEcho(args));
          break;
        case "open":
          appendLines(cmdOpen(args, lang));
          break;
        case "ls":
          appendLines(cmdLs());
          break;
        case "pwd":
          appendLines(cmdPwd());
          break;
        case "clear":
          setLines([]);
          break;
        case "":
          break;
        default:
          appendLines(cmdNotFound(fullCmd, lang));
      }
    },
    [appendLines, setTheme, setLang, theme, lang]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        runCommand(input);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setHistIdx((i) => {
          const next = Math.min(i + 1, history.length - 1);
          setInput(history[next] ?? "");
          return next;
        });
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setHistIdx((i) => {
          if (i <= 0) {
            setInput("");
            return -1;
          }
          const next = i - 1;
          setInput(history[next] ?? "");
          return next;
        });
      } else if (e.key === "Tab") {
        e.preventDefault();
        const val = input.toLowerCase().trim();
        const match = ALL_COMMANDS.find(
          (c) => c.startsWith(val) && c !== val
        );
        if (match) setInput(match);
      } else if (e.key === "l" && e.ctrlKey) {
        e.preventDefault();
        setLines([]);
      }
    },
    [input, history, runCommand]
  );

  return (
    <div className={`crt-container h-full w-full ${showCrt ? "crt-enabled" : ""}`}>
      {!booted && <Boot onComplete={handleBoot} lang={lang} />}
      <AsciiBackground enabled={showAscii} mousePos={mousePos} />

      {isGameMode && (
        <div className="absolute inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <SnakeGame onExit={(score) => {
            setIsGameMode(false);
            appendLines([{ id: `game-exit-${Date.now()}`, html: `  <span style='color:var(--terminal-green)'>GAME OVER!</span> Final Score: <span style='color:var(--terminal-yellow)'>${score}</span>` }]);
            setTimeout(() => inputRef.current?.focus(), 50);
          }} />
        </div>
      )}

      <div
        ref={mainRef}
        className={`flex flex-col w-screen h-screen bg-black/40 backdrop-blur-[1px] theme-${theme} ${showCrt ? "crt-curve crt-screen" : ""}`}
        onClick={focusInput}
        onMouseMove={(e) => setMousePos({ x: e.clientX, y: e.clientY })}
      >
        {/* Titlebar */}
        <div className="flex-shrink-0 flex items-center gap-2.5 px-4 py-2.5 bg-terminal-bg3 border-b border-terminal-border">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56] cursor-pointer hover:brightness-125 transition-all" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e] cursor-pointer hover:brightness-125 transition-all" />
          <div className="w-3 h-3 rounded-full bg-[#27c93f] cursor-pointer hover:brightness-125 transition-all" />
          <div className="flex-1 text-center text-[11px] text-terminal-dim tracking-wider">
            taha@portfolio: ~ — bash
          </div>
          <div className="text-[11px] text-terminal-dim min-w-[80px] text-right font-mono">
            {clock}
          </div>
        </div>

        {/* Terminal output */}
        <div
          ref={termRef}
          className="flex-1 overflow-y-auto overflow-x-hidden terminal-px pt-5 pb-2 terminal-scroll"
        >
          {lines.map((l) => (
            <div
              key={l.id}
              className="output-line mb-0.5 whitespace-pre-wrap break-words leading-relaxed text-terminal-text"
              dangerouslySetInnerHTML={{ __html: l.html }}
            />
          ))}
        </div>

        {/* Input row */}
        <div className="flex-shrink-0 flex items-center terminal-px py-3 border-t border-terminal-border bg-black/40">
          <div className="flex items-center">
            <span className="text-terminal-green font-mono text-sm whitespace-nowrap">
              taha@portfolio
            </span>
            <span className="text-terminal-dim mx-1">:</span>
            <span className="text-terminal-green font-mono text-sm">~</span>
            <span className="text-terminal-dim mx-1">$</span>
          </div>

          <div className="flex-1 relative flex items-center ml-2 overflow-hidden">
            {/* Visual Output */}
            <span className="text-terminal-white font-mono text-sm whitespace-pre">
              {input}
            </span>
            <span className="cursor-blink" />

            {/* Hidden Input */}
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="absolute inset-0 w-full h-full bg-transparent border-none outline-none text-transparent caret-transparent font-mono text-sm"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
              aria-label="Terminal input"
            />
          </div>
        </div>

        {/* Quick command shortcuts */}
        <div className="flex-shrink-0 flex flex-wrap justify-center gap-2 terminal-px py-2 border-t border-terminal-border bg-black/60">
          {SHORTCUTS.map((cmd) => (
            <button
              key={cmd}
              onClick={(e) => {
                e.stopPropagation();
                trackEvent("SHORTCUT_CLICK", { name: cmd });
                runCommand(cmd);
              }}
              className="text-[11px] text-terminal-dim cursor-pointer px-2 py-0.5 border border-terminal-border rounded-sm hover:text-terminal-green hover:border-[#2a2a2a] hover:bg-terminal-bg2 transition-all select-none"
            >
              {cmd === "download cv" ? (lang === "en" ? "download cv" : "télécharger cv") : cmd}
            </button>
          ))}
          <button
            onClick={(e) => {
              e.stopPropagation();
              runCommand(`lang ${lang === "en" ? "fr" : "en"}`);
            }}
            className="text-[11px] text-terminal-cyan font-bold cursor-pointer px-2 py-0.5 border border-terminal-cyan/30 rounded-sm hover:bg-terminal-cyan/10 transition-all select-none"
          >
            {lang === "en" ? "FR" : "EN"}
          </button>
        </div>
      </div>
    </div>
  );
}

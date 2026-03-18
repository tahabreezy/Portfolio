"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  OutputLine,
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
  cmdNotFound,
  welcomeLines,
} from "@/lib/commands";
import { personal } from "@/lib/data";
import Boot from "./Boot";

const SHORTCUTS = [
  "help",
  "about",
  "skills",
  "projects",
  "experience",
  "contact",
  "download cv",
  "clear",
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
  "ls",
  "pwd",
  "cat about",
  "clear",
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

  const termRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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

  const appendLines = useCallback((newLines: OutputLine[]) => {
    setLines((prev) => [...prev, ...newLines]);
  }, []);

  const handleBoot = useCallback(() => {
    setBooted(true);
    appendLines(welcomeLines());
    setTimeout(() => inputRef.current?.focus(), 100);
  }, [appendLines]);

  const runCommand = useCallback(
    (raw: string) => {
      const cmd = raw.trim().toLowerCase();
      setInput("");
      setHistIdx(-1);

      if (raw.trim()) {
        appendLines([promptLine(raw.trim())]);
        setHistory((h) => [raw.trim(), ...h]);
      }

      switch (cmd) {
        case "help":
          appendLines(cmdHelp());
          break;
        case "whoami":
          appendLines(cmdWhoami());
          break;
        case "about":
        case "cat about":
          appendLines(cmdAbout());
          break;
        case "skills":
          appendLines(cmdSkills());
          break;
        case "projects":
          appendLines(cmdProjects());
          break;
        case "experience":
          appendLines(cmdExperience());
          break;
        case "contact":
          appendLines(cmdContact());
          break;
        case "social":
          appendLines(cmdSocial());
          break;
        case "download cv":
          appendLines([
            { id: `dl-${Date.now()}`, html: `  <span style='color:#00ff88'>Fetching</span> cv_taha_azaghar.pdf <span style='color:#555'>...</span>` },
            { id: `dl2-${Date.now()}`, html: `  <span style='color:#00ff88'>✓</span> <span style='color:#555'>Download initiated. Place cv.pdf in /public to enable.</span>` },
            { id: `dl3-${Date.now()}`, html: `` },
          ]);
          {
            const a = document.createElement("a");
            a.href = personal.cv;
            a.download = "cv_taha_azaghar.pdf";
            a.click();
          }
          break;
        case "ls":
          appendLines(cmdLs());
          break;
        case "pwd":
          appendLines(cmdPwd());
          break;
        case "clear":
          setLines(welcomeLines());
          break;
        case "":
          break;
        default:
          appendLines(cmdNotFound(cmd));
      }
    },
    [appendLines]
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
        setLines(welcomeLines());
      }
    },
    [input, history, runCommand]
  );

  return (
    <>
      {!booted && <Boot onComplete={handleBoot} />}

      <div
        className="flex flex-col w-screen h-screen bg-terminal-bg"
        onClick={focusInput}
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
          className="flex-1 overflow-y-auto overflow-x-hidden px-7 pt-5 pb-2 terminal-scroll"
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
        <div className="flex-shrink-0 flex items-center px-7 py-3 border-t border-terminal-border bg-terminal-bg">
          <span className="text-terminal-green font-mono text-sm whitespace-nowrap">
            taha@portfolio
          </span>
          <span className="text-terminal-dim mx-1">:</span>
          <span className="text-terminal-green font-mono text-sm">~</span>
          <span className="text-terminal-dim mx-1">$</span>
          <span className="ml-1" />
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent border-none outline-none text-terminal-white font-mono text-sm caret-terminal-green"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
          />
        </div>

        {/* Quick command shortcuts */}
        <div className="flex-shrink-0 flex flex-wrap gap-2 px-7 py-2 border-t border-terminal-border bg-[#0c0c0c]">
          {SHORTCUTS.map((cmd) => (
            <button
              key={cmd}
              onClick={(e) => {
                e.stopPropagation();
                runCommand(cmd);
              }}
              className="text-[11px] text-terminal-dim cursor-pointer px-2 py-0.5 border border-terminal-border rounded-sm hover:text-terminal-green hover:border-[#2a2a2a] hover:bg-terminal-bg2 transition-all select-none"
            >
              {cmd}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

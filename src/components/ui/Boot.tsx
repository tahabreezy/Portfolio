"use client";

import { useEffect, useState } from "react";
import { Lang } from "@/lib/commands";
import { trackEvent } from "@/lib/monitor";

const BOOT_MESSAGES = {
  en: [
    "Loading kernel modules...",
    "Mounting portfolio filesystem...",
    "Initializing AI subsystems...",
    "Starting n8n agent daemon...",
    "Connecting LangChain core...",
    "Portfolio ready.",
  ],
  fr: [
    "Chargement des modules noyau...",
    "Montage du système de fichiers...",
    "Initialisation des sous-systèmes IA...",
    "Démarrage du démon n8n...",
    "Connexion au cœur LangChain...",
    "Portfolio prêt.",
  ],
};

const ASCII = `
 ████████╗ █████╗ ██╗  ██╗ █████╗ 
 ╚══██╔══╝██╔══██╗██║  ██║██╔══██╗
    ██║   ███████║███████║███████║
    ██║   ██╔══██║██╔══██║██╔══██║
    ██║   ██║  ██║██║  ██║██║  ██║
    ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝
`;

export default function Boot({
  onComplete,
  lang = "en",
}: {
  onComplete: () => void;
  lang?: Lang;
}) {
  useEffect(() => {
    trackEvent("VISIT_START");
  }, []);

  const messages = BOOT_MESSAGES[lang as Lang] || BOOT_MESSAGES.en;
  const [status, setStatus] = useState(messages[0]);
  const [progress, setProgress] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // Animate progress bar
    const progressTimer = setTimeout(() => setProgress(100), 50);

    // Cycle through status messages
    let msgIdx = 0;
    const msgTimer = setInterval(() => {
      msgIdx++;
      if (msgIdx < messages.length) {
        setStatus(messages[msgIdx]);
      }
    }, 360);

    // Fade out and complete
    const fadeTimer = setTimeout(() => setFading(true), 2300);
    const doneTimer = setTimeout(() => onComplete(), 2800);

    return () => {
      clearTimeout(progressTimer);
      clearInterval(msgTimer);
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete, messages]);

  return (
    <div
      className={`fixed inset-0 z-50 bg-terminal-bg flex flex-col items-center justify-center transition-opacity duration-500 ${
        fading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <pre
        className="ascii-glitch text-terminal-green leading-tight text-center whitespace-pre"
        style={{ fontSize: "clamp(7px, 1.1vw, 12px)" }}
      >
        {ASCII}
      </pre>

      <p className="text-[#444] text-[12px] mt-5 tracking-widest font-mono">
        {status}
      </p>

      <div className="w-56 h-0.5 bg-[#1a1a1a] mt-3 rounded-sm overflow-hidden">
        <div
          className="h-full bg-terminal-green rounded-sm transition-all duration-[1900ms] ease-in-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Taha Azaghar — AI & Automation Engineer",
  description:
    "Portfolio of Taha Azaghar, AI & Automation Engineer based in Casablanca, Morocco. Specializing in LLM orchestration, multi-agent systems, workflow automation, and full-stack engineering.",
  keywords: [
    "AI Engineer",
    "Automation Engineer",
    "LangChain",
    "n8n",
    "FastAPI",
    "React",
    "Casablanca",
    "Morocco",
    "Software Engineer",
  ],
  authors: [{ name: "Taha Azaghar" }],
  openGraph: {
    title: "Taha Azaghar — AI & Automation Engineer",
    description:
      "Building intelligent systems that turn complex workflows into automated pipelines.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "Taha Azaghar — AI & Automation Engineer",
    description: "Building intelligent systems that automate the complex.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

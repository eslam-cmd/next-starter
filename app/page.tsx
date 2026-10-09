"use client";
import { Terminal, RefreshCw, Send, Check } from "lucide-react";
export default function HomePage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col justify-between p-8 font-sans">
      {/* Header */}
      <header className="text-xs text-neutral-500 font-mono">
        Next.js Starter Template
      </header>

      {/* Main Content */}
      <main className="max-w-xl">
        <h1 className="text-3xl font-semibold tracking-tight text-neutral-50 mb-3">
          Welcome to your Next.js project
        </h1>
        <p className="text-neutral-400 text-sm leading-relaxed mb-6">
          A clean, minimalistic foundation built with Next.js App Router and Tailwind CSS.
          Designed to be fast, lightweight, and ready for development.
        </p>

        <div className="inline-block px-3 py-1.5 rounded bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-300">
          Get started by editing <code className="text-neutral-100">src/app/page.js</code>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-xs text-neutral-500 font-mono">
        Created by <span className="text-neutral-300">Eslam Hadaya</span>
      </footer>
    </div>
  );
}
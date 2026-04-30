import { useState } from "react";
import Editor from "@monaco-editor/react";
import { FerroUIRenderer } from "@ferroui/renderer";
import { usePlaygroundStream } from "./hooks/usePlaygroundStream";
import { CommandCenter } from "./components/CommandCenter";
import {
  Play,
  Loader2,
  AlertCircle,
  Layout,
  Code,
  MessageSquare,
  Activity,
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function App() {
  const [prompt, setPrompt] = useState("");
  const [showCommandCenter, setShowCommandCenter] = useState(true);
  const { layout, status, isGenerating, error, generate, chunks, publicKey } =
    usePlaygroundStream();

  const handleGenerate = () => {
    if (prompt.trim() && !isGenerating) {
      generate(prompt);
    }
  };

  return (
    <div className="flex flex-col h-screen w-full bg-[#0a0a0a] text-white font-sans overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#111] z-20">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center font-bold italic">
            F
          </div>
          <h1 className="text-xl font-semibold tracking-tight">
            FerroUI Playground
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowCommandCenter(!showCommandCenter)}
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-widest transition-all border",
              showCommandCenter
                ? "bg-blue-600/10 border-blue-500/50 text-blue-400"
                : "bg-white/5 border-white/10 text-white/40 hover:text-white/70",
            )}
          >
            <Activity className="w-3.5 h-3.5" />
            Command Center
          </button>
          <div
            className={cn(
              "flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium",
              isGenerating
                ? "bg-blue-500/20 text-blue-400"
                : "bg-green-500/20 text-green-400",
            )}
          >
            {isGenerating ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <div className="w-2 h-2 rounded-full bg-current" />
            )}
            {status}
          </div>
        </div>
      </header>

      {/* Main Content: Multi-pane Layout */}
      <main className="flex flex-1 overflow-hidden">
        {/* Left Pane: Prompt Input */}
        <div className="w-[20%] min-w-[280px] border-r border-white/10 flex flex-col p-6 bg-[#0f0f0f]">
          <div className="flex items-center gap-2 mb-4 text-white/60">
            <MessageSquare className="w-4 h-4" />
            <h2 className="text-sm font-medium uppercase tracking-wider">
              Prompt
            </h2>
          </div>
          <textarea
            className="flex-1 w-full p-4 rounded-lg bg-white/5 border border-white/10 focus:border-blue-500 outline-none resize-none text-sm leading-relaxed placeholder:text-white/20"
            placeholder="Describe the UI layout you want to generate..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={isGenerating}
          />
          <button
            onClick={handleGenerate}
            disabled={isGenerating || !prompt.trim()}
            className="mt-6 flex items-center justify-center gap-2 w-full py-3 px-4 bg-blue-600 hover:bg-blue-500 disabled:bg-white/10 disabled:text-white/30 rounded-lg font-semibold transition-all"
          >
            {isGenerating ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Play className="w-5 h-5 fill-current" />
            )}
            {isGenerating ? "Generating..." : "Generate Layout"}
          </button>

          {error && (
            <div className="mt-4 p-4 rounded-lg bg-red-500/10 border border-red-500/20 flex gap-3 text-red-400 text-sm">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <p>{error}</p>
            </div>
          )}
        </div>

        {/* Middle Pane: Live Renderer */}
        <div className="flex-1 flex flex-col min-w-0 bg-black relative">
          <div className="absolute top-4 left-6 flex items-center gap-2 z-10 text-white/40">
            <Layout className="w-4 h-4" />
            <span className="text-xs font-medium uppercase tracking-widest">
              Live Preview
            </span>
          </div>
          <div className="flex-1 overflow-auto p-12 custom-scrollbar">
            {layout ? (
              <div className="w-full h-full max-w-5xl mx-auto shadow-2xl rounded-xl overflow-hidden border border-white/5 bg-[#111]">
                <FerroUIRenderer layout={layout} />
              </div>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-white/20 gap-4">
                <Layout className="w-16 h-16 opacity-10" />
                <p className="text-lg font-light tracking-tight text-white/40">
                  Enter a prompt to see the layout
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Panes Container */}
        <div
          className={cn(
            "flex transition-all duration-300 ease-in-out border-l border-white/10",
            showCommandCenter ? "w-1/2" : "w-1/3",
          )}
        >
          {/* Schema View */}
          {!showCommandCenter && (
            <div className="flex-1 flex flex-col bg-[#111]">
              <div className="flex items-center gap-2 p-4 border-b border-white/5 text-white/60">
                <Code className="w-4 h-4" />
                <h2 className="text-sm font-medium uppercase tracking-wider">
                  Generated Schema
                </h2>
              </div>
              <div className="flex-1">
                <Editor
                  height="100%"
                  defaultLanguage="json"
                  theme="vs-dark"
                  value={
                    layout
                      ? JSON.stringify(layout, null, 2)
                      : "// Schema will appear here"
                  }
                  options={{
                    readOnly: true,
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                    fontSize: 12,
                    lineNumbers: "on",
                    renderLineHighlight: "all",
                    padding: { top: 20 },
                  }}
                />
              </div>
            </div>
          )}

          {/* Command Center View */}
          {showCommandCenter && (
            <CommandCenter
              chunks={chunks}
              publicKey={publicKey}
              isGenerating={isGenerating}
              status={status}
            />
          )}
        </div>
      </main>
    </div>
  );
}

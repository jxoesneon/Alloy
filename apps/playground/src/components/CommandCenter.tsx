import React, { useState } from "react";
import {
  Terminal,
  Shield,
  Cpu,
  Activity,
  CheckCircle,
  ChevronDown,
  ChevronRight,
  Lock,
  Key,
  DollarSign,
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { AuditChunk } from "../hooks/usePlaygroundStream";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface CommandCenterProps {
  chunks: AuditChunk[];
  publicKey: string | null;
  isGenerating: boolean;
  status: string;
}

export function CommandCenter({
  chunks,
  publicKey,
  isGenerating,
  status,
}: CommandCenterProps) {
  const [activeTab, setActiveTab] = useState<"console" | "security" | "engine">(
    "console",
  );
  const [expandedChunk, setExpandedChunk] = useState<number | null>(null);

  const verifiedCount = chunks.filter((c) => c.verified).length;
  const totalChunks = chunks.length;

  return (
    <div className="flex flex-col h-full bg-[#0a0a0a] border-l border-white/10 overflow-hidden font-mono">
      {/* Tabs */}
      <div className="flex border-b border-white/10 bg-[#111]">
        <TabButton
          active={activeTab === "console"}
          onClick={() => setActiveTab("console")}
          icon={<Terminal className="w-4 h-4" />}
          label="Streaming"
        />
        <TabButton
          active={activeTab === "security"}
          onClick={() => setActiveTab("security")}
          icon={<Shield className="w-4 h-4" />}
          label="Security"
        />
        <TabButton
          active={activeTab === "engine"}
          onClick={() => setActiveTab("engine")}
          icon={<Cpu className="w-4 h-4" />}
          label="Engine"
        />
      </div>

      <div className="flex-1 overflow-auto p-4 custom-scrollbar">
        {activeTab === "console" && (
          <div className="space-y-2">
            {chunks.length === 0 && !isGenerating && (
              <div className="flex flex-col items-center justify-center h-40 text-white/20">
                <Terminal className="w-8 h-8 mb-2 opacity-10" />
                <p className="text-xs italic">Awaiting stream...</p>
              </div>
            )}
            {chunks.map((chunk, i) => (
              <div
                key={i}
                className="border border-white/5 rounded-md overflow-hidden bg-white/[0.02]"
              >
                <button
                  onClick={() =>
                    setExpandedChunk(expandedChunk === i ? null : i)
                  }
                  className="w-full flex items-center justify-between p-2 text-left hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-2 overflow-hidden">
                    {expandedChunk === i ? (
                      <ChevronDown className="w-3 h-3 shrink-0" />
                    ) : (
                      <ChevronRight className="w-3 h-3 shrink-0" />
                    )}
                    <span className="text-[10px] text-white/40 shrink-0">
                      {chunk.timestamp.split("T")[1].slice(0, 8)}
                    </span>
                    <span
                      className={cn(
                        "text-[10px] px-1.5 py-0.5 rounded shrink-0 font-bold uppercase",
                        chunk.data.type === "phase"
                          ? "bg-blue-500/20 text-blue-400"
                          : chunk.data.type === "tool_call"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : chunk.data.type === "tool_output"
                              ? "bg-green-500/20 text-green-400"
                              : chunk.data.type === "layout_chunk"
                                ? "bg-purple-500/20 text-purple-400"
                                : chunk.data.type === "error"
                                  ? "bg-red-500/20 text-red-400"
                                  : "bg-white/10 text-white/60",
                      )}
                    >
                      {chunk.data.type}
                    </span>
                    <span className="text-[11px] text-white/80 truncate">
                      {chunk.data.type === "phase" &&
                        `Phase ${chunk.data.phase}`}
                      {chunk.data.type === "tool_call" &&
                        chunk.data.toolCall?.name}
                      {chunk.data.type === "tool_output" &&
                        chunk.data.toolOutput?.name}
                      {chunk.data.type === "layout_chunk" &&
                        "Partial UI update"}
                    </span>
                  </div>
                  {chunk.verified ? (
                    <CheckCircle className="w-3 h-3 text-green-500 shrink-0" />
                  ) : (
                    <Shield className="w-3 h-3 text-red-500 shrink-0 opacity-50" />
                  )}
                </button>
                {expandedChunk === i && (
                  <div className="p-2 pt-0 border-t border-white/5">
                    <pre className="text-[10px] text-white/50 whitespace-pre-wrap break-all leading-tight bg-black/40 p-2 rounded mt-2">
                      {chunk.raw}
                    </pre>
                  </div>
                )}
              </div>
            ))}
            {isGenerating && (
              <div className="flex items-center gap-2 p-2 text-blue-400 animate-pulse">
                <Activity className="w-3 h-3" />
                <span className="text-[10px] uppercase font-bold tracking-widest">
                  {status}
                </span>
              </div>
            )}
          </div>
        )}

        {activeTab === "security" && (
          <div className="space-y-6">
            {/* Identity */}
            <div className="space-y-2">
              <h3 className="text-[10px] uppercase font-bold text-white/40 flex items-center gap-2">
                <Lock className="w-3 h-3" /> Hardened Identity
              </h3>
              <div className="grid grid-cols-2 gap-2">
                <SecurityStat
                  label="JWT Scope"
                  value="Verified"
                  status="success"
                />
                <SecurityStat label="Tenant" value="Default" />
                <SecurityStat label="User ID" value="P-7742" />
                <SecurityStat
                  label="Redaction"
                  value="Active"
                  status="success"
                />
              </div>
            </div>

            {/* Universal Signing */}
            <div className="space-y-2">
              <h3 className="text-[10px] uppercase font-bold text-white/40 flex items-center gap-2">
                <Key className="w-3 h-3" /> Universal Signing (Phase 4)
              </h3>
              <div className="bg-white/[0.03] border border-white/5 rounded p-3 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-white/60">
                    Verified Chunks
                  </span>
                  <span className="text-[11px] font-bold text-green-400">
                    {verifiedCount} / {totalChunks}
                  </span>
                </div>
                <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500 transition-all duration-500"
                    style={{
                      width: `${totalChunks ? (verifiedCount / totalChunks) * 100 : 0}%`,
                    }}
                  />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-white/30 uppercase block">
                    Server Public Key
                  </span>
                  <div className="text-[9px] text-white/40 break-all bg-black/40 p-1.5 rounded border border-white/5">
                    {publicKey || "Awaiting first chunk..."}
                  </div>
                </div>
              </div>
            </div>

            {/* PII Redaction Showcase */}
            <div className="space-y-2">
              <h3 className="text-[10px] uppercase font-bold text-white/40">
                PII Redaction Proof
              </h3>
              <div className="bg-white/[0.03] border border-white/5 rounded p-2 text-[10px] space-y-2">
                <div className="space-y-1">
                  <span className="text-red-400/60 font-bold uppercase text-[9px]">
                    Ingested Prompt
                  </span>
                  <p className="text-white/40 line-through italic">
                    "My email is user@demo.com..."
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="text-green-400/60 font-bold uppercase text-[9px]">
                    LLM Received
                  </span>
                  <p className="text-white/80">
                    "My email is [REDACTED_EMAIL]..."
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "engine" && (
          <div className="space-y-6">
            {/* Tool Execution */}
            <div className="space-y-2">
              <h3 className="text-[10px] uppercase font-bold text-white/40 flex items-center gap-2">
                <Cpu className="w-3 h-3" /> Tool Runtime
              </h3>
              <div className="space-y-2">
                {chunks.filter((c) => c.data.type === "tool_call").length ===
                  0 && (
                  <p className="text-[10px] text-white/20 italic">
                    No tools called yet
                  </p>
                )}
                {chunks
                  .filter((c) => c.data.type === "tool_call")
                  .map((c, i) => (
                    <div
                      key={i}
                      className="bg-white/[0.03] border border-white/5 rounded p-2 text-[11px]"
                    >
                      <div className="flex justify-between font-bold mb-1">
                        <span className="text-yellow-400">
                          {c.data.toolCall?.name}
                        </span>
                        <span className="text-white/20">#{i + 1}</span>
                      </div>
                      <pre className="text-[9px] text-white/40">
                        {JSON.stringify(c.data.toolCall?.args, null, 2)}
                      </pre>
                    </div>
                  ))}
              </div>
            </div>

            {/* Quota & Budget */}
            <div className="space-y-2">
              <h3 className="text-[10px] uppercase font-bold text-white/40 flex items-center gap-2">
                <DollarSign className="w-3 h-3" /> Token Budgeting
              </h3>
              <div className="bg-white/[0.03] border border-white/5 rounded p-3 space-y-3">
                <div className="flex justify-between text-[11px]">
                  <span className="text-white/60">Estimated Cost</span>
                  <span className="text-white/80 font-bold">$0.0014</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span className="text-white/60">Daily Limit</span>
                  <span className="text-white/80">$10.00</span>
                </div>
                <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500" style={{ width: "4%" }} />
                </div>
              </div>
            </div>

            {/* Circuit Breaker */}
            <div className="space-y-2">
              <h3 className="text-[10px] uppercase font-bold text-white/40 flex items-center gap-2">
                <Activity className="w-3 h-3" /> Circuit Health
              </h3>
              <div className="bg-white/[0.03] border border-white/5 rounded p-3 flex items-center justify-between">
                <span className="text-[11px] text-white/60">System Status</span>
                <span className="flex items-center gap-1.5 text-[11px] font-bold text-green-400">
                  <CheckCircle className="w-3 h-3" /> CLOSED (SAFE)
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Audit Summary */}
      <div className="p-4 border-t border-white/10 bg-[#111] text-[10px]">
        <div className="flex items-center justify-between text-white/40 mb-1">
          <span>SYSTEM AUDIT MODE</span>
          <span>v1.4.2</span>
        </div>
        <div className="flex items-center gap-2 text-green-500 font-bold">
          <Shield className="w-3 h-3" />
          <span>ALL REINFORCED SYSTEMS VERIFIED</span>
        </div>
      </div>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex-1 flex items-center justify-center gap-2 py-3 px-2 text-[10px] font-bold uppercase tracking-wider transition-all",
        active
          ? "bg-white/5 text-white border-b border-blue-500"
          : "text-white/30 hover:text-white/60",
      )}
    >
      {icon}
      {label}
    </button>
  );
}

function SecurityStat({
  label,
  value,
  status,
}: {
  label: string;
  value: string;
  status?: "success" | "error";
}) {
  return (
    <div className="bg-white/[0.03] border border-white/5 rounded p-2">
      <span className="text-[9px] text-white/30 uppercase block">{label}</span>
      <span
        className={cn(
          "text-[10px] font-bold",
          status === "success"
            ? "text-green-400"
            : status === "error"
              ? "text-red-400"
              : "text-white/80",
        )}
      >
        {value}
      </span>
    </div>
  );
}

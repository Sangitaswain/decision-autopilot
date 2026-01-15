import React from "react";

export default function ActiveDecision() {
    return (
        <section className="w-full">
            {/* Label */}
            <p className="text-xs uppercase tracking-wider text-gray-500 mb-3">
                Active Decision
            </p>

            {/* Decision Input */}
            <div className="relative">
                <div className="flex items-center bg-[#111827] border border-[#1F2937] rounded-lg px-5 py-4 focus-within:border-cyan-400 transition">
                    <span className="text-cyan-400 mr-2">{">"}</span>
                    <input
                        type="text"
                        placeholder="Should I quit college to build an AI startup?"
                        defaultValue="Should I quit college to build an AI startup?"
                        className="w-full bg-transparent text-gray-100 text-lg placeholder-gray-500 focus:outline-none"
                    />
                    {/* Fake caret glow */}
                    <span className="ml-1 h-5 w-[2px] bg-cyan-400 animate-pulse" />
                </div>
            </div>

            {/* Context Signals */}
            <div className="flex flex-wrap gap-3 mt-5">
                <ContextPill label="Time horizon" value="12 months" />
                <ContextPill label="Stakes" value="High" highlight />
                <ContextPill label="Reversible" value="No" warning />
            </div>
        </section>
    );
}

function ContextPill({
    label,
    value,
    highlight,
    warning,
}: {
    label: string;
    value: string;
    highlight?: boolean;
    warning?: boolean;
}) {
    return (
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm
      ${warning
                ? 'bg-orange-500/10 border-orange-500/30 text-orange-300'
                : highlight
                    ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300'
                    : 'bg-[#0B1220] border-[#1F2937] text-gray-300'
            }`}
        >
            <span className="text-gray-500">{label}:</span>
            <span>{value}</span>
        </div>
    );
}

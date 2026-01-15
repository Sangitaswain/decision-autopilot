import { motion } from "framer-motion";
import { useState } from "react";

export default function LiveDecisionPreview() {
    const [confidenceValue] = useState(0.68);

    return (
        <div className="flex flex-col max-w-lg w-full bg-surface/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
            
            {/* Optional inner glow effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

            {/* Decision Text - HEAVIEST WEIGHT */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-8 relative z-10"
            >
                <p className="text-3xl md:text-4xl text-primary font-sans font-semibold leading-tight tracking-tight drop-shadow-sm">
                    "Should we delay launch to fix reliability issues?"
                </p>
            </motion.div>

            {/* Stakes - MEDIUM WEIGHT */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-col gap-3 mb-8 border-l-2 border-white/10 pl-5 relative z-10"
            >
                <div className="flex items-center gap-3 text-sm">
                    <span className="text-muted font-mono tracking-wide text-xs uppercase">Timeline</span>
                    <span className="text-primary/90 font-medium">Launch in 14 days</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                    <span className="text-muted font-mono tracking-wide text-xs uppercase">At stake</span>
                    <span className="text-primary/90 font-medium">$2.4M revenue</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                    <span className="text-muted font-mono tracking-wide text-xs uppercase">Impact</span>
                    <span className="text-primary/90 font-medium">23 engineers blocked</span>
                </div>
            </motion.div>

            {/* System Confidence - SMALL BUT BRIGHT */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex items-center gap-3 mb-8 relative z-10"
            >
                <div className="flex items-center gap-2 bg-black/20 px-3 py-1.5 rounded-full border border-white/5">
                    <div className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse"></div>
                    <span className="text-[10px] uppercase tracking-wider text-muted font-mono">
                        Confidence
                    </span>
                </div>
                <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.8 }}
                    className="text-2xl text-amber-500 font-mono font-bold tracking-tight"
                >
                    {(confidenceValue * 100).toFixed(0)}%
                </motion.span>
            </motion.div>

            {/* Provisional Verdict - QUIET BUT FIRM */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                className="inline-flex items-center gap-3 bg-white/[0.05] px-5 py-4 rounded-xl border border-white/[0.08] w-full relative z-10"
            >
                <span className="text-[10px] uppercase tracking-wider text-muted font-mono shrink-0">
                    Recommendation
                </span>
                <span className="text-base text-primary font-semibold tracking-tight">
                    Delay → Controlled Pilot
                </span>
            </motion.div>

        </div>
    );
}

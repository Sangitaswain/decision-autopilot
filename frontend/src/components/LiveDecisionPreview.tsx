import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const SYSTEM_LOGS = [
    "Re-evaluating risk assumptions",
    "Simulating failure scenarios",
    "Confidence stabilizing",
    "No new contradictions detected"
];

export default function LiveDecisionPreview() {
    const [step, setStep] = useState(0); // 0: Init, 1: Question, 2: Rows, 3: Confidence, 4: Verdict
    const [confidence, setConfidence] = useState(0);
    const [statusLog, setStatusLog] = useState(SYSTEM_LOGS[0]);
    const [activeRowCycle, setActiveRowCycle] = useState<number | null>(null);

    // Layer 1 & 2: Temporal Entry Sequence
    useEffect(() => {
        const runSequence = async () => {
            // Step 1: Question Appears (Immediate)
            await new Promise(r => setTimeout(r, 200));
            setStep(1);

            // Step 2: Rows Appear (Staggered)
            await new Promise(r => setTimeout(r, 600));
            setStep(2);

            // Step 3: Confidence Calculation Starts
            await new Promise(r => setTimeout(r, 800));
            setStep(3);

            // Animate Confidence Count Up (61 -> 68)
            let current = 0;
            const target = 68;
            const interval = setInterval(() => {
                current += 2;
                if (current >= target) {
                    current = target;
                    clearInterval(interval);
                    // Step 4: Verdict Appears after calculation
                    setTimeout(() => setStep(4), 400);
                }
                setConfidence(current);
            }, 30);
        };

        runSequence();
    }, []);

    // Micro-Auto-Cycle (Status Text)
    useEffect(() => {
        const interval = setInterval(() => {
            setStatusLog(prev => {
                const idx = SYSTEM_LOGS.indexOf(prev);
                return SYSTEM_LOGS[(idx + 1) % SYSTEM_LOGS.length];
            });
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    // Ongoing Micro-Animation: Subtle Row Cycling (after load)
    useEffect(() => {
        if (step < 4) return; // Only start after verdict appears
        
        const cycleRows = async () => {
            await new Promise(r => setTimeout(r, 3000)); // Initial delay
            while (true) {
                for (let i = 0; i < 3; i++) {
                    setActiveRowCycle(i);
                    await new Promise(r => setTimeout(r, 2000));
                    setActiveRowCycle(null);
                    await new Promise(r => setTimeout(r, 1500));
                }
            }
        };
        
        cycleRows();
    }, [step]);

    const rows = [
        { label: "Timeline", value: "Launch in 14 days" },
        { label: "At stake", value: "$2.4M revenue" },
        { label: "Impact", value: "23 engineers blocked" }
    ];

    return (
        <motion.div 
            // Layer 1: Card Activation
            initial={{ opacity: 0, scale: 0.985 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex flex-col max-w-lg w-full bg-surface/60 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-[0_0_40px_-12px_rgba(79,70,229,0.15)] relative overflow-hidden group"
        >
            
            {/* Aesthetic: Inner Radial Gradient for Depth */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_50%)] pointer-events-none" />

            {/* Option A: Grid Drift */}
            <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden">
                <motion.div 
                    animate={{ x: ["-10%", "-5%"], y: ["-10%", "-5%"] }}
                    transition={{ duration: 40, repeat: Infinity, repeatType: "mirror", ease: "linear" }}
                    className="w-[200%] h-[200%] bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"
                />
            </div>

            {/* Aesthetic: High-Tech Scanning Line */}
            <motion.div
                animate={{ top: ["0%", "100%"], opacity: [0, 0.6, 0] }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent pointer-events-none z-0"
            />

            {/* One-time Border Glow Pulse */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.4, 0] }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="absolute inset-0 rounded-3xl border-2 border-amber-500/50 pointer-events-none"
            />

            {/* Micro-Status Text (Top Right) */}
            <div className="absolute top-6 right-8 h-6 flex items-center justify-end overflow-hidden z-20">
                <AnimatePresence mode="wait">
                    <motion.p
                        key={statusLog}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-[10px] font-mono text-cyan-200 tracking-wider uppercase whitespace-nowrap"
                    >
                        {statusLog}
                    </motion.p>
                </AnimatePresence>
            </div>

            {/* Step 1: Question Text */}
            <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: step >= 1 ? 1 : 0, y: step >= 1 ? 0 : 8 }}
                transition={{ duration: 0.3 }}
                className="mb-8 relative z-10 pr-20"
            >
                <p className="text-3xl md:text-4xl text-white font-sans font-semibold leading-tight tracking-tight drop-shadow-lg shadow-black/50">
                    "Should we delay launch to fix reliability issues?"
                </p>
            </motion.div>

            {/* Step 2: Information Arrival (Rows) */}
            <div className="flex flex-col gap-4 mb-10 border-l-2 border-white/10 pl-6 relative z-10">
                {rows.map((row, index) => (
                    <motion.div 
                        key={row.label}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ 
                            opacity: step >= 2 ? (activeRowCycle === index ? 1 : 0.7) : 0, 
                            x: step >= 2 ? 0 : -8 
                        }}
                        transition={{ duration: 0.4, delay: index * 0.12 }} // Staggered delay
                        className="flex items-center gap-4 text-sm origin-left"
                    >
                        <span className="font-mono tracking-wide text-xs uppercase text-slate-400 w-20 shrink-0">{row.label}</span>
                        <span className="font-medium text-slate-200">{row.value}</span>
                    </motion.div>
                ))}
            </div>

            {/* Step 3: Confidence */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: step >= 3 ? 1 : 0 }}
                transition={{ duration: 0.4 }}
                className="flex items-center gap-3 mb-10 relative z-10"
            >
                <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10 backdrop-blur-md">
                    <motion.div 
                        animate={{ scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        className="h-2 w-2 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.4)]" 
                    />
                    <span className="text-[10px] uppercase tracking-wider text-slate-400 font-mono">
                        {step < 4 ? "Calculating..." : "Confidence"}
                    </span>
                </div>
                <span className="text-3xl text-amber-500 font-mono font-bold tracking-tight drop-shadow-[0_0_10px_rgba(245,158,11,0.2)]">
                    {confidence > 0 ? `${confidence}%` : "--"}
                </span>
            </motion.div>

            {/* Step 4: Verdict Confirmation */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: step >= 4 ? 1 : 0, y: step >= 4 ? 0 : 10 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative z-10 w-full"
            >
                <p className="text-[10px] uppercase tracking-wider text-slate-500 font-mono mb-2 ml-1">Provisional Verdict</p>
                <div className="inline-flex items-center gap-3 bg-gradient-to-r from-white/[0.08] to-white/[0.02] px-6 py-5 rounded-xl border border-white/[0.1] w-full shadow-[0_0_30px_-5px_rgba(0,0,0,0.3)] relative overflow-hidden group/verdict">
                    {/* Subtle inner shimmer for verdict */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-shimmer" />
                    
                    <span className="text-lg text-white font-medium tracking-tight relative z-10">
                        Delay → <span className="text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.3)] font-semibold">Controlled Pilot</span>
                    </span>
                    
                    {/* Border glow on hover/active */}
                    <div className="absolute inset-0 rounded-xl border border-emerald-500/20 opacity-0 group-hover/verdict:opacity-100 transition-opacity duration-500" />
                </div>
            </motion.div>

        </motion.div>
    );
}

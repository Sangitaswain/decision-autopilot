import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import ConfidenceMeter from "./ConfidenceMeter";

const lines = [
    "Assumption detected: Demand elasticity > 1.2",
    "Risk flagged: Regulatory approval latency (High)",
    "Second-order effect identified: Hiring freeze risk",
    "Counterfactual generated: Delay expansion by 90 days",
    "Experiment proposed: Germany-only pilot",
    "Confidence score updated → 0.72",
];

export default function LiveDecisionTrace() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((i) => (i + 1) % lines.length);
        }, 1800);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="mt-8 md:mt-0 flex flex-col max-w-lg">

            {/* Dominant Anchor */}
            <div className="mb-8">
                <p className="text-[11px] uppercase tracking-wider text-neutral-500 mb-3 font-mono font-medium">Decision under analysis</p>
                <p className="text-3xl md:text-4xl text-primary font-sans font-semibold leading-tight tracking-tight">
                    “Expand product to EU market”
                </p>
            </div>

            {/* Pinned Trace Column */}
            <div className="relative pl-6 border-l-2 border-white/10 mb-6 w-full ml-[1px]">
                <div className="text-base text-neutral-300 font-mono h-12 relative w-full text-left flex items-center">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute w-full"
                        >
                            {lines[index].includes("Risk") ? (
                                <span className="flex items-center gap-3">
                                    <span className="text-amber-500">⚠</span>
                                    <span>Risk flagged: <span className="text-amber-500 font-medium">Regulatory latency (High)</span></span>
                                </span>
                            ) : lines[index].includes("Confidence") ? (
                                <span className="flex items-center gap-3">
                                    <span className="text-neutral-500">→</span>
                                    <span>Confidence score updated <span className="text-neutral-600 mx-2">→</span> <span className="text-amber-500 font-bold">0.72</span></span>
                                </span>
                            ) : (
                                <span className="flex items-center gap-3">
                                    <span className="text-neutral-500">→</span>
                                    {lines[index]}
                                </span>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* Confidence Meter - Aligned manually to match the border overlap */}
            <div className="pl-6">
                <ConfidenceMeter />
            </div>
        </div>
    );
}

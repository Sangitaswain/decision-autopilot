import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BGPattern } from "@/components/ui/bg-pattern";
import LiveDecisionPreview from "@/components/LiveDecisionPreview";

const Home: React.FC = () => {
    const [currentThought, setCurrentThought] = useState(0);
    const [agentHover, setAgentHover] = useState<number | null>(null);
    const [barsAnimated, setBarsAnimated] = useState(false);
    const [activeAgentIndex, setActiveAgentIndex] = useState<number>(0);

    const thoughts = [
        "Analyzing assumptions…",
        "Generating failure scenarios…",
        "Simulating outcomes…",
        "Synthesizing confidence…"
    ];

    const agents = [
        {
            name: "Decompose",
            desc: "We break your decision into atomic claims, KPIs, and core assumptions.",
            output: "Assumption Graph"
        },
        {
            name: "Attack",
            desc: "We intentionally try to break your decision before reality does.",
            output: "Risk Registry"
        },
        {
            name: "Test",
            desc: "We design rapid experiments to validate critical uncertainties.",
            output: "Experiment Protocol"
        },
        {
            name: "Decide",
            desc: "We synthesize evidence into a final verdict: Proceed, Pivot, or Abort.",
            output: "Final Verdict"
        },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentThought((prev) => (prev + 1) % thoughts.length);
        }, 1200);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        setTimeout(() => setBarsAnimated(true), 500);
    }, []);

    // Helper component for the sticky list
    const AgentItem = ({ agent, index, activeIndex }: { agent: any, index: number, activeIndex: number }) => {
        const isActive = index === activeIndex;
        return (
            <motion.div 
                animate={{
                    opacity: isActive ? 1 : 0.3,
                    filter: isActive ? 'blur(0px)' : 'blur(0.5px)',
                    scale: isActive ? 1 : 0.98
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className={`p-4 rounded-lg transition-all duration-500 border relative ${isActive ? 'bg-surface/80 border-white/10' : 'border-transparent'}`}
            >
                {isActive && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.15 }}
                        className="absolute inset-0 bg-gold/20 blur-xl rounded-lg -z-10"
                    />
                )}
                <div className="flex items-center gap-3">
                    <span className={`font-mono text-xs transition-colors duration-300 ${isActive ? 'text-gold' : 'text-muted'}`}>0{index + 1}</span>
                    <span className={`font-sans font-medium transition-colors duration-300 ${isActive ? 'text-primary' : 'text-secondary'}`}>{agent.name}</span>
                </div>
            </motion.div>
        );
    };

    return (
        <div className="min-h-screen bg-background text-primary font-sans relative">

            {/* Background Pattern */}
            <BGPattern variant="grid" mask="fade-edges" fill="#1E293B" size={32} />

            {/* HERO SECTION */}
            <section className="max-w-7xl mx-auto px-6 pt-24 pb-16 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">

                    {/* Left: Marketing */}
                    <div className="text-center lg:text-left">
                        <h1 className="font-sans text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
                            <motion.span
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                className="inline-block"
                            >
                                Make high-stakes{" "}
                            </motion.span>
                            <motion.span
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                className="font-script italic text-gold font-normal inline-block"
                            >
                                decisions
                            </motion.span>
                            <br />
                            <motion.span
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.5 }}
                                className="inline-block"
                            >
                                with <span className="text-white">confidence.</span>
                            </motion.span>
                        </h1>

                        <motion.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.7 }}
                            className="text-secondary text-lg md:text-xl max-w-2xl mx-auto lg:mx-0 mb-8 font-normal leading-relaxed"
                        >
                            Decision Autopilot is a multi-agent AI system that breaks, attacks, and validates your strategy before you commit.
                        </motion.p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                            <button className="bg-white hover:bg-gray-100 text-black font-sans font-medium px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                                Stress-test a decision
                            </button>
                            <button className="border border-white/20 hover:border-white/40 hover:bg-white/5 text-primary font-sans font-medium px-8 py-4 rounded-full transition-all duration-300">
                                How it works
                            </button>
                        </div>
                    </div>

                    {/* Right: Intelligence */}
                    <div className="hidden lg:flex justify-center lg:justify-end pb-8 relative">
                        {/* Aesthetic Glow Effect */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />
                        <LiveDecisionPreview />
                    </div>

                </div>
            </section>

            {/* SCROLL-BASED AGENT ACTIVATION */}
            <section className="max-w-4xl mx-auto px-6 py-24 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

                    {/* Sticky Agent List */}
                    <div className="sticky top-24 space-y-2">
                        <p className="text-xs uppercase tracking-wider text-muted mb-6 font-mono pl-4">System Agents</p>
                        {agents.map((agent, i) => (
                            <AgentItem key={i} agent={agent} index={i} activeIndex={activeAgentIndex} />
                        ))}
                    </div>

                    {/* Agent Details (Scrollable) */}
                    <div className="space-y-48 py-12">
                        {agents.map((agent, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0.2, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ margin: "-20% 0px -20% 0px", amount: 0.6 }}
                                onViewportEnter={() => setActiveAgentIndex(i)}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                                className="min-h-[200px] flex flex-col justify-center"
                            >
                                <motion.div 
                                    initial={{ scaleX: 0 }}
                                    whileInView={{ scaleX: 1 }}
                                    viewport={{ margin: "-20% 0px -20% 0px", amount: 0.6 }}
                                    transition={{ duration: 0.4, delay: 0.1 }}
                                    className="h-px w-12 bg-gold/50 mb-4 origin-left"
                                />
                                <motion.h3 
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ margin: "-20% 0px -20% 0px", amount: 0.6 }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                    className="font-display text-2xl font-bold text-primary mb-3"
                                >
                                    {agent.name}
                                </motion.h3>
                                <motion.p 
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ margin: "-20% 0px -20% 0px", amount: 0.6 }}
                                    transition={{ duration: 0.5, delay: 0.3 }}
                                    className="text-secondary text-lg leading-relaxed mb-4"
                                >
                                    {agent.desc}
                                </motion.p>
                                <motion.p 
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ margin: "-20% 0px -20% 0px", amount: 0.6 }}
                                    transition={{ duration: 0.4, delay: 0.4 }}
                                    className="font-mono text-xs text-gold/80 bg-gold/5 px-3 py-1.5 rounded w-fit border border-gold/10"
                                >
                                    Output: {agent.output}
                                </motion.p>
                            </motion.div>
                        ))}
                    </div>

                </div>
            </section>

            {/* FAKE DEMO SECTION */}
            <DemoSection />

            {/* WHY THIS IS DIFFERENT */}
            <DifferentiatorSection />

            {/* FINAL CTA */}
            <section className="max-w-xl mx-auto px-6 py-16 text-center relative z-10">
                <motion.p 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-primary text-2xl font-display font-semibold mb-6"
                >
                    Ready to break your next decision?
                </motion.p>
                <motion.button 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    whileHover={{ 
                        scale: 1.05,
                        boxShadow: "0 0 30px rgba(251, 146, 60, 0.4)",
                        backgroundColor: "rgba(251, 146, 60, 1)"
                    }}
                    animate={{
                        boxShadow: [
                            "0 0 0px rgba(251, 146, 60, 0)",
                            "0 0 20px rgba(251, 146, 60, 0.3)",
                            "0 0 0px rgba(251, 146, 60, 0)"
                        ]
                    }}
                    transition={{
                        duration: 0.6,
                        delay: 0.2,
                        boxShadow: {
                            duration: 3,
                            repeat: Infinity,
                            repeatDelay: 5
                        }
                    }}
                    className="bg-accent text-background font-display font-bold px-10 py-5 rounded-lg text-lg relative group"
                >
                    <span className="relative z-10 group-hover:translate-x-0.5 inline-block transition-transform duration-200">
                        Start Now
                    </span>
                </motion.button>
            </section>

            {/* Footer */}
            <footer className="border-t border-border mt-16 relative z-10">
                <div className="max-w-5xl mx-auto px-6 py-8 text-center">
                    <p className="text-xs text-muted">
                        Decision Autopilot — Multi-Agent Decision Intelligence
                    </p>
                </div>
            </footer>
        </div>
    );
};

function DifferentiatorSection() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const messages = [
        { context: "Chatbots answer questions.", statement: "We challenge decisions." },
        { context: "Most tools predict.", statement: "We stress-test." },
        { context: "Most AI explains.", statement: "We force action." }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prev => (prev + 1) % messages.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="max-w-2xl mx-auto px-6 py-16 text-center relative z-10 h-48 flex items-center justify-center">
            <div className="space-y-3">
                <motion.p 
                    key={`context-${currentIndex}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 0.7, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5 }}
                    className="text-secondary text-lg"
                >
                    {messages[currentIndex].context}
                </motion.p>
                <motion.p 
                    key={`statement-${currentIndex}`}
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="font-script italic text-3xl text-gold"
                >
                    {messages[currentIndex].statement}
                </motion.p>
            </div>
        </section>
    );
}

function DemoSection() {
    const [displayText, setDisplayText] = useState("");
    const [showCursor, setShowCursor] = useState(true);
    const [assumptionsCount, setAssumptionsCount] = useState(0);
    const [riskCount, setRiskCount] = useState(0);
    const [confidenceCount, setConfidenceCount] = useState(0);
    const [step, setStep] = useState(0);
    const [statusIndex, setStatusIndex] = useState(0);

    const statusMessages = [
        "Monitoring assumptions...",
        "Re-evaluating risk...",
        "Tracking confidence...",
        "Validating verdict..."
    ];

    const fullText = "Should I quit college to build an AI startup?";

    useEffect(() => {
        const runSequence = async () => {
            // Reset state
            setDisplayText("");
            setAssumptionsCount(0);
            setRiskCount(0);
            setConfidenceCount(0);
            setStep(0);

            await new Promise(r => setTimeout(r, 500));
            for (let i = 0; i <= fullText.length; i++) {
                setDisplayText(fullText.slice(0, i));
                await new Promise(r => setTimeout(r, 20));
            }
            setStep(1);

            await new Promise(r => setTimeout(r, 400));
            setStep(2);
            
            const assumptionDuration = 500;
            const assumptionStart = Date.now();
            const animateAssumptions = () => {
                const now = Date.now();
                const progress = Math.min((now - assumptionStart) / assumptionDuration, 1);
                setAssumptionsCount(Math.floor(progress * 7));
                if (progress < 1) requestAnimationFrame(animateAssumptions);
            };
            requestAnimationFrame(animateAssumptions);

            await new Promise(r => setTimeout(r, 200));
            const riskDuration = 400;
            const riskStart = Date.now();
            const animateRisk = () => {
                const now = Date.now();
                const progress = Math.min((now - riskStart) / riskDuration, 1);
                setRiskCount(Math.floor(progress * 3));
                if (progress < 1) requestAnimationFrame(animateRisk);
            };
            requestAnimationFrame(animateRisk);

            await new Promise(r => setTimeout(r, 200));
            const confDuration = 800;
            const confStart = Date.now();
            const animateConf = () => {
                const now = Date.now();
                const progress = Math.min((now - confStart) / confDuration, 1);
                setConfidenceCount(61 + Math.floor(progress * (72 - 61)));
                if (progress < 1) requestAnimationFrame(animateConf);
            };
            requestAnimationFrame(animateConf);

            await new Promise(r => setTimeout(r, 1200));
            setStep(3);

            // Hold verdict for 3 seconds, then loop
            await new Promise(r => setTimeout(r, 3000));
            runSequence();
        };

        runSequence();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => setShowCursor(prev => !prev), 500);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setStatusIndex(prev => (prev + 1) % statusMessages.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="max-w-3xl mx-auto px-6 py-16 relative z-10">
            <p className="text-center text-muted text-xs uppercase tracking-wider mb-6">Try it in 10 seconds</p>

            <div className="bg-surface border border-border rounded-2xl p-8 space-y-6 relative">
                {/* Top-right status indicator */}
                <motion.div 
                    className="absolute top-4 right-4 text-[9px] text-muted uppercase tracking-wider font-mono"
                    key={statusIndex}
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 0.5, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    transition={{ duration: 0.4 }}
                >
                    {statusMessages[statusIndex]}
                </motion.div>
                {/* Animated Input */}
                <div>
                    <p className="text-xs text-muted uppercase tracking-wider mb-2">Type a decision ↓</p>
                    <div className="bg-background border border-border rounded-lg p-4 font-mono text-sm flex items-center gap-2">
                        <span className="text-primary">{displayText}</span>
                        <span className={`text-accent transition-opacity duration-100 ${showCursor ? 'opacity-100' : 'opacity-0'}`}>▍</span>
                    </div>
                </div>

                {/* Animated Results */}
                <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                        <p className="text-xs text-muted uppercase tracking-wider mb-1">Assumptions</p>
                        <motion.p 
                            animate={{ scale: step >= 2 ? [1, 1.1, 1] : 1 }}
                            transition={{ duration: 0.3 }}
                            className="font-display text-4xl font-bold text-primary"
                        >
                            {step >= 2 ? assumptionsCount : 0}
                        </motion.p>
                        <motion.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: step >= 2 && assumptionsCount === 7 ? 1 : 0 }}
                            className="text-[9px] text-muted mt-1"
                        >
                            Unstated beliefs detected
                        </motion.p>
                    </div>
                    <div className="text-center">
                        <p className="text-xs text-muted uppercase tracking-wider mb-1">High-Risk</p>
                        <motion.p 
                            animate={{ 
                                scale: step >= 2 && riskCount > 0 ? [1, 1.2, 1] : 1,
                                color: step >= 2 && riskCount > 0 ? ["var(--accent)", "#fb923c", "var(--accent)"] : "var(--accent)"
                            }}
                            transition={{ duration: 0.4 }}
                            className="font-display text-4xl font-bold text-accent"
                        >
                            {step >= 2 ? riskCount : 0}
                        </motion.p>
                        <motion.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: step >= 2 && riskCount === 3 ? 1 : 0 }}
                            className="text-[9px] text-orange-400/80 mt-1"
                        >
                            Failure paths identified
                        </motion.p>
                    </div>
                    <div className="text-center">
                        <p className="text-xs text-muted uppercase tracking-wider mb-1">Confidence</p>
                        <motion.div className="relative inline-block">
                            <p className="font-display text-4xl font-bold text-primary">
                                {step >= 2 ? confidenceCount : 0}%
                            </p>
                            {step >= 2 && confidenceCount === 72 && (
                                <motion.div 
                                    animate={{ 
                                        opacity: [0.2, 0.4, 0.2],
                                        scale: [1, 1.05, 1]
                                    }}
                                    transition={{ 
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                    className="absolute inset-0 blur-lg bg-accent/40"
                                />
                            )}
                        </motion.div>
                        <motion.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: step >= 2 && confidenceCount === 72 ? 1 : 0 }}
                            className="text-[9px] text-accent/80 mt-1"
                        >
                            Confidence stabilizing
                        </motion.p>
                    </div>
                </div>

                {/* Animated Verdict */}
                <div className="border-t border-border pt-6">
                    <motion.div 
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: step >= 3 ? 1 : 0 }}
                        transition={{ duration: 0.8 }}
                        className="h-px bg-border w-full mb-6 origin-center"
                    />
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: step >= 3 ? 0.6 : 0 }}
                        transition={{ delay: 0.5 }}
                        className="text-xs text-muted uppercase tracking-wider text-center mb-2"
                    >
                        System Recommendation
                    </motion.p>
                    <motion.p 
                        initial={{ scale: 0.9, opacity: 0, filter: "blur(10px)" }}
                        animate={{ 
                            scale: step >= 3 ? 1 : 0.9,
                            opacity: step >= 3 ? 1 : 0,
                            filter: step >= 3 ? "blur(0px)" : "blur(10px)"
                        }}
                        transition={{ duration: 0.6, delay: 0.7, type: "spring" }}
                        className="font-display text-3xl font-bold text-accent text-center relative"
                    >
                        DELAY
                        {step >= 3 && (
                            <motion.span
                                animate={{
                                    opacity: [0, 0.3, 0],
                                    scale: [0.95, 1.05, 0.95]
                                }}
                                transition={{
                                    duration: 2.5,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                className="absolute inset-0 blur-xl bg-accent/30"
                            />
                        )}
                    </motion.p>
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: step >= 3 ? 1 : 0 }}
                        transition={{ delay: 1.2 }}
                        className="text-xs text-muted text-center mt-2"
                    >
                        Based on risk asymmetry
                    </motion.p>
                </div>
            </div>
        </section>
    );
}

export default Home;

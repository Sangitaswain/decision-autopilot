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
            <div className={`p-4 rounded-lg transition-all duration-500 border border-transparent ${isActive ? 'bg-surface border-white/5' : 'opacity-40'}`}>
                <div className="flex items-center gap-3">
                    <span className={`font-mono text-xs ${isActive ? 'text-gold' : 'text-muted'}`}>0{index + 1}</span>
                    <span className={`font-sans font-medium ${isActive ? 'text-primary' : 'text-secondary'}`}>{agent.name}</span>
                </div>
            </div>
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
                        <h1 className="font-sans text-5xl md:text-7xl font-bold tracking-tight mb-6 animate-slide-up leading-tight">
                            Make high-stakes <span className="font-script italic text-gold font-normal">decisions</span><br />
                            with <span className="text-white">confidence.</span>
                        </h1>

                        <p className="text-secondary text-lg md:text-xl max-w-2xl mx-auto lg:mx-0 mb-8 animate-fade-in font-normal leading-relaxed">
                            Decision Autopilot is a multi-agent AI system that breaks, attacks, and validates your strategy before you commit.
                        </p>

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
                                initial={{ opacity: 0.2 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ margin: "-20% 0px -20% 0px", amount: 0.6 }}
                                onViewportEnter={() => setActiveAgentIndex(i)}
                                className="min-h-[200px] flex flex-col justify-center"
                            >
                                <div className="h-px w-12 bg-gold/50 mb-4"></div>
                                <h3 className="font-display text-2xl font-bold text-primary mb-3 text-glow">{agent.name}</h3>
                                <p className="text-secondary text-lg leading-relaxed mb-4">{agent.desc}</p>
                                <p className="font-mono text-xs text-gold/80 bg-gold/5 px-3 py-1.5 rounded w-fit border border-gold/10">
                                    Output: {agent.output}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                </div>
            </section>

            {/* FAKE DEMO SECTION */}
            <section className="max-w-3xl mx-auto px-6 py-16 relative z-10">
                <p className="text-center text-muted text-xs uppercase tracking-wider mb-6">Try it in 10 seconds</p>

                <div className="bg-surface border border-border rounded-2xl p-8 space-y-6">
                    {/* Fake Input */}
                    <div>
                        <p className="text-xs text-muted uppercase tracking-wider mb-2">Type a decision ↓</p>
                        <div className="bg-background border border-border rounded-lg p-4 font-mono text-sm flex items-center gap-2">
                            <span className="text-primary">Should I quit college to build an AI startup?</span>
                            <span className="text-accent animate-pulse">▍</span>
                        </div>
                    </div>

                    {/* Fake Results */}
                    <div className="grid grid-cols-3 gap-4">
                        <div className="text-center">
                            <p className="text-xs text-muted uppercase tracking-wider mb-1">Assumptions</p>
                            <p className="font-display text-4xl font-bold text-primary">7</p>
                        </div>
                        <div className="text-center">
                            <p className="text-xs text-muted uppercase tracking-wider mb-1">High-Risk</p>
                            <p className="font-display text-4xl font-bold text-accent">3</p>
                        </div>
                        <div className="text-center">
                            <p className="text-xs text-muted uppercase tracking-wider mb-1">Confidence</p>
                            <p className="font-display text-4xl font-bold text-primary">72%</p>
                        </div>
                    </div>

                    {/* Verdict */}
                    <div className="border-t border-border pt-6">
                        <p className="text-xs text-muted uppercase tracking-wider text-center mb-2">System Recommendation</p>
                        <p className="font-display text-3xl font-bold text-accent text-center">DELAY</p>
                    </div>
                </div>
            </section>

            {/* WHY THIS IS DIFFERENT */}
            <section className="max-w-2xl mx-auto px-6 py-16 space-y-8 text-center relative z-10">
                <div className="space-y-2">
                    <p className="text-secondary text-lg">Chatbots answer questions.</p>
                    <p className="font-script italic text-3xl text-gold">We challenge decisions.</p>
                </div>
                <div className="space-y-2">
                    <p className="text-secondary text-lg">Most tools predict.</p>
                    <p className="font-script italic text-3xl text-gold">We stress-test.</p>
                </div>
                <div className="space-y-2">
                    <p className="text-secondary text-lg">Most AI explains.</p>
                    <p className="font-script italic text-3xl text-gold">We force action.</p>
                </div>
            </section>

            {/* FINAL CTA */}
            <section className="max-w-xl mx-auto px-6 py-16 text-center relative z-10">
                <p className="text-primary text-2xl font-display font-semibold mb-6">
                    Ready to break your next decision?
                </p>
                <button className="bg-accent hover:scale-105 hover:glow-accent text-background font-display font-bold px-10 py-5 rounded-lg transition-all duration-300 text-lg">
                    Launch Decision Autopilot
                </button>
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

export default Home;

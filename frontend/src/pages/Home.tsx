import React, { useState, useEffect } from "react";

const Home: React.FC = () => {
    const [currentThought, setCurrentThought] = useState(0);
    const [agentHover, setAgentHover] = useState<number | null>(null);
    const [barsAnimated, setBarsAnimated] = useState(false);

    const thoughts = [
        "Analyzing assumptions…",
        "Generating failure scenarios…",
        "Simulating outcomes…",
        "Synthesizing confidence…"
    ];

    const agents = [
        {
            name: "Decision Input",
            desc: "We capture your decision context and extract core variables."
        },
        {
            name: "Decomposition Engine",
            desc: "We break your decision into atomic claims, KPIs, and core assumptions."
        },
        {
            name: "Adversarial Stress Test",
            desc: "We intentionally try to break your decision before reality does."
        },
        {
            name: "Experiment Planner",
            desc: "We design rapid experiments to validate critical uncertainties."
        },
        {
            name: "Confidence Synthesizer",
            desc: "We synthesize evidence into a final verdict: Proceed, Pivot, or Abort."
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

    return (
        <div className="min-h-screen bg-background text-primary font-sans">

            {/* NAVBAR */}
            <nav className="border-b border-border bg-background/90 backdrop-blur-sm sticky top-0 z-50">
                <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
                    <span className="font-display font-bold text-lg">Decision Autopilot</span>
                    <div className="flex gap-6 text-sm text-secondary">
                        <a href="#" className="hover:text-accent transition-colors">Demo</a>
                        <a href="#" className="hover:text-accent transition-colors">Docs</a>
                        <a href="#" className="hover:text-accent transition-colors">GitHub</a>
                    </div>
                </div>
            </nav>

            {/* SYSTEM STATUS BAR */}
            <div className="border-b border-border bg-surface/50">
                <div className="max-w-6xl mx-auto px-6 py-3 flex flex-wrap gap-6 text-xs font-mono">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        <span className="text-muted">System:</span>
                        <span className="text-accent">Active</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-muted">Agents:</span>
                        <span className="text-primary">4</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-muted">Avg Decision Time:</span>
                        <span className="text-primary">~12s</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-muted">Mode:</span>
                        <span className="text-accent">Demo</span>
                    </div>
                </div>
            </div>

            {/* HERO + DECISION CARD */}
            <section className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                {/* Left: Text + Motion */}
                <div className="space-y-6">
                    <h1 className="font-display text-5xl md:text-6xl font-bold tracking-tight leading-tight animate-slide-up">
                        Before you decide,<br />
                        <span className="text-accent">stress-test it.</span>
                    </h1>

                    <p className="text-secondary text-lg leading-relaxed">
                        Decision Autopilot breaks your decisions, attacks them, and tells you what to do next.
                    </p>

                    {/* Typing Animation */}
                    <div className="h-6 flex items-center">
                        <p className="text-muted text-sm font-mono animate-pulse-glow">
                            {thoughts[currentThought]}
                        </p>
                    </div>

                    <button className="bg-accent hover:scale-105 hover:glow-accent text-background font-display font-semibold px-8 py-4 rounded-lg transition-all duration-300">
                        Stress-test a decision
                    </button>
                </div>

                {/* Right: BIG DECISION CARD */}
                <div className="bg-surface border border-border rounded-2xl p-8 shadow-2xl animate-fade-in">
                    <div className="flex items-center gap-2 mb-6">
                        <div className="w-2 h-2 bg-accent rounded-full"></div>
                        <span className="text-xs font-mono text-muted uppercase tracking-wider">Decision</span>
                    </div>

                    <p className="font-display text-xl md:text-2xl font-semibold text-primary mb-8 leading-snug">
                        "Should I quit college to build an AI startup?"
                    </p>

                    <div className="border-t border-border pt-6 mb-6">
                        <p className="text-xs text-muted uppercase tracking-wider mb-4">Signals Detected</p>
                        <div className="space-y-2 text-sm">
                            <p className="flex justify-between">
                                <span className="text-secondary">• Assumptions:</span>
                                <span className="text-primary font-semibold">7</span>
                            </p>
                            <p className="flex justify-between">
                                <span className="text-secondary">• Risks:</span>
                                <span className="text-accent font-semibold">3 (1 High)</span>
                            </p>
                            <p className="flex justify-between">
                                <span className="text-secondary">• Uncertainty:</span>
                                <span className="text-primary font-semibold">68%</span>
                            </p>
                        </div>
                    </div>

                    <div className="border-t border-border pt-6">
                        <p className="text-xs text-muted uppercase tracking-wider mb-3">System Recommendation</p>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <span className="text-accent text-2xl">→</span>
                                <span className="font-display text-3xl font-bold text-accent">DELAY</span>
                            </div>
                            <div className="text-right">
                                <p className="text-xs text-muted">Confidence</p>
                                <p className="font-display text-2xl font-bold text-primary">72%</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* AGENT PIPELINE MODULE */}
            <section className="max-w-2xl mx-auto px-6 py-16">
                <p className="text-xs text-muted uppercase tracking-wider text-center mb-8">System Pipeline</p>

                <div className="flex flex-col items-center gap-3">
                    {agents.map((agent, i, arr) => (
                        <React.Fragment key={i}>
                            <div
                                onMouseEnter={() => setAgentHover(i)}
                                onMouseLeave={() => setAgentHover(null)}
                                className={`
                                    bg-surface border rounded-xl px-6 py-4 text-center w-full max-w-md cursor-pointer
                                    transition-all duration-300
                                    ${agentHover === i
                                        ? 'border-accent scale-105 glow-accent'
                                        : 'border-border'}
                                `}
                            >
                                <span className="font-display font-semibold text-primary text-sm">
                                    {agent.name}
                                </span>
                            </div>
                            {i < arr.length - 1 && (
                                <div className="text-muted text-xl">↓</div>
                            )}
                        </React.Fragment>
                    ))}
                </div>

                {/* Agent Description */}
                <div className="min-h-[60px] flex items-center justify-center mt-8">
                    {agentHover !== null && (
                        <p className="text-secondary text-sm text-center max-w-md animate-fade-in">
                            <span className="text-accent font-semibold">{agents[agentHover].name}:</span>{" "}
                            {agents[agentHover].desc}
                        </p>
                    )}
                </div>
            </section>

            {/* LIVE SIGNALS PANEL */}
            <section className="max-w-4xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Card 1 */}
                    <div className="bg-surface border border-border rounded-xl p-6 text-center">
                        <p className="text-xs text-muted uppercase tracking-wider mb-3">Assumptions</p>
                        <div className="w-full h-2 bg-background rounded-full overflow-hidden mb-3">
                            <div
                                className={`h-full bg-accent rounded-full transition-all duration-1000 ${barsAnimated ? 'w-[87.5%]' : 'w-0'}`}
                            ></div>
                        </div>
                        <p className="font-display text-3xl font-bold text-primary">7</p>
                        <p className="text-xs text-muted mt-1">detected</p>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-surface border border-border rounded-xl p-6 text-center">
                        <p className="text-xs text-muted uppercase tracking-wider mb-3">Risk Exposure</p>
                        <div className="w-full h-2 bg-background rounded-full overflow-hidden mb-3">
                            <div
                                className={`h-full bg-accent rounded-full transition-all duration-1000 ${barsAnimated ? 'w-[50%]' : 'w-0'}`}
                            ></div>
                        </div>
                        <p className="font-display text-3xl font-bold text-accent">3</p>
                        <p className="text-xs text-muted mt-1">High: 1</p>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-surface border border-border rounded-xl p-6 text-center">
                        <p className="text-xs text-muted uppercase tracking-wider mb-3">Decision Confidence</p>
                        <div className="w-full h-2 bg-background rounded-full overflow-hidden mb-3">
                            <div
                                className={`h-full bg-accent rounded-full transition-all duration-1000 ${barsAnimated ? 'w-[72%]' : 'w-0'}`}
                            ></div>
                        </div>
                        <p className="font-display text-3xl font-bold text-primary">72%</p>
                        <p className="text-xs text-muted mt-1">confidence</p>
                    </div>
                </div>
            </section>

            {/* DIFFERENTIATION BLOCK */}
            <section className="max-w-4xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left */}
                    <div className="bg-surface/50 border border-border rounded-xl p-6">
                        <p className="font-display font-semibold text-lg mb-4 text-secondary">Typical AI Tools</p>
                        <ul className="space-y-2 text-sm text-secondary">
                            <li>• Answer questions</li>
                            <li>• Reactive</li>
                            <li>• No memory</li>
                        </ul>
                    </div>

                    {/* Right */}
                    <div className="bg-surface border border-accent/30 rounded-xl p-6">
                        <p className="font-display font-semibold text-lg mb-4 text-accent">Decision Autopilot</p>
                        <ul className="space-y-2 text-sm text-primary">
                            <li>• Challenges decisions</li>
                            <li>• Proactive</li>
                            <li>• Multi-agent reasoning</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* MICRO DEMO INPUT */}
            <section className="max-w-3xl mx-auto px-6 py-16">
                <p className="text-center text-muted text-xs uppercase tracking-wider mb-6">Try it in 10 seconds</p>

                <div className="bg-surface border border-border rounded-2xl p-8 space-y-6">
                    {/* Input */}
                    <div>
                        <p className="text-xs text-muted uppercase tracking-wider mb-3">Type a decision ↓</p>
                        <div className="bg-background border border-accent/30 rounded-lg p-4 font-mono text-sm flex items-center gap-2">
                            <span className="text-primary">Should I quit college to build an AI startup?</span>
                            <span className="text-accent animate-pulse">▍</span>
                        </div>
                    </div>

                    {/* Output */}
                    <div className="space-y-2 text-sm font-mono">
                        <p className="text-accent">→ Assumptions detected: 7</p>
                        <p className="text-accent">→ High-risk factors: 3</p>
                        <p className="text-accent">→ Recommendation: DELAY</p>
                    </div>
                </div>
            </section>

            {/* FINAL CTA */}
            <section className="max-w-xl mx-auto px-6 py-16 text-center">
                <p className="text-primary text-2xl font-display font-semibold mb-6">
                    Ready to break your next decision?
                </p>
                <button className="bg-accent hover:scale-105 hover:glow-accent text-background font-display font-bold px-10 py-5 rounded-lg transition-all duration-300 text-lg">
                    Launch Decision Autopilot
                </button>
            </section>

            {/* Footer */}
            <footer className="border-t border-border mt-16">
                <div className="max-w-6xl mx-auto px-6 py-8 text-center">
                    <p className="text-xs text-muted">
                        Decision Autopilot — Multi-Agent Decision Intelligence
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Home;

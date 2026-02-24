import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code, Presentation, Palette, Terminal, Gamepad, Camera, MapPin, Smile, ChevronDown, Award, Rocket, Cpu, Binary, Layers } from "lucide-react";

const eventsData = {
    technical: [
        {
            name: "Paper Presentation",
            icon: <Presentation size={24} />,
            desc: "Architect the future. Showcase original research in Neural Networks, NLP, and Computer Vision.",
            teamSize: "1-2",
            rules: ["Topic must be AI/ML related", "10-min slot + 2-min QA", "Digital copy required"],
            theme: "Computational Intelligence"
        },
        {
            name: "Web Wizards",
            icon: <Layers size={24} />,
            desc: "UI/UX Engineering challenge. Build a futuristic dashboard for mission-critical AI systems.",
            teamSize: "1-2",
            rules: ["Open stack: React/Vite/Next", "Mobile responsive required", "Theme: Post-Human Design"],
            theme: "Interface Design"
        },
        {
            name: "Mock Interview",
            icon: <Cpu size={24} />,
            desc: "The Crucible. Test your grit against senior engineers in a simulate high-tier tech hiring loop.",
            teamSize: "1",
            rules: ["Live coding round", "System design discussion", "HR Behavioral screening"],
            theme: "Career Readiness"
        },
        {
            name: "Code Combat",
            icon: <Binary size={24} />,
            desc: "Fast-tracked algorithmic war. Solve complex optimizations under extreme time pressure.",
            teamSize: "1",
            rules: ["O(log N) efficiency focus", "Hidden test cases", "No LLM assistance"],
            theme: "Pure Logic"
        },
    ],
    nonTechnical: [
        {
            name: "E-Sports Arena",
            icon: <Gamepad size={24} />,
            desc: "Digital Gladiators. Tactical shooters and MOBA tournaments in a high-refresh-rate environment.",
            teamSize: "1-5",
            rules: ["Zero toxicity policy", "Bring your peripherals", "Double elimination bracket"],
            theme: "Reaction Speed"
        },
        {
            name: "Lens Master",
            icon: <Camera size={24} />,
            desc: "Visual storytelling. Capture the intersection of humanity and technology during PravahaAI.",
            teamSize: "1",
            rules: ["RAW format submissions", "No AI generation allowed", "Visual narrative score"],
            theme: "Cinematic Eye"
        },
        {
            name: "Treasure Hunt",
            icon: <MapPin size={24} />,
            desc: "Decrypt the campus. Use logical triggers and pattern recognition to locate the hidden core.",
            teamSize: "2-4",
            rules: ["Logical riddles only", "Timed checkpoints", "Team synchronization required"],
            theme: "Exploration"
        },
        {
            name: "Fun Junction",
            icon: <Rocket size={24} />,
            desc: "The Social Layer. Quick-fire games designed for networking and cognitive breaks.",
            teamSize: "1-2",
            rules: ["High engagement focus", "Instant rewards", "Dynamic game rotations"],
            theme: "Cognitive Break"
        },
    ],
};

function EventCard({ event }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "circOut" }}
            className="glass rounded-none border border-white/5 relative group hover:border-accent-primary/40 overflow-hidden active:scale-[0.98] transition-all"
        >
            {/* Reactive Touch Glow */}
            <div className="absolute inset-0 bg-accent-primary/0 group-active:bg-accent-primary/[0.03] transition-colors" />

            <div className="absolute top-0 right-0 p-1 bg-accent-primary/10 mono text-[8px] text-accent-primary font-black uppercase tracking-tighter">
                {event.theme}
            </div>

            <div className="p-8 relative z-10">
                <div className="flex justify-between items-start mb-10">
                    <div className="w-12 h-12 flex items-center justify-center bg-white/[0.03] border border-white/10 text-accent-primary transition-all duration-500 group-active:bg-accent-primary group-active:text-bg-primary">
                        {event.icon}
                    </div>
                    <div className="mono text-[9px] font-black text-body-text/50 uppercase tracking-[0.2em] border border-white/5 px-3 py-1">
                        Team: {event.teamSize}
                    </div>
                </div>

                <h3 className="text-2xl font-black mb-4 text-highlight tracking-tight">
                    {event.name}
                </h3>
                <p className="text-sm text-body-text/80 mb-8 leading-relaxed font-light min-h-[4rem]">
                    {event.desc}
                </p>

                <div className="flex flex-col gap-4">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="flex items-center justify-between text-[10px] font-black uppercase tracking-[0.3em] text-accent-primary group-hover:text-highlight transition-colors py-2"
                    >
                        Module Data <ChevronDown size={14} className={`transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`} />
                    </button>

                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                            >
                                <ul className="text-[11px] text-body-text/60 space-y-3 py-6 border-t border-white/5 mono">
                                    {event.rules.map((rule, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <span className="text-accent-primary mt-1">▸</span> {rule}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <a
                        href="#register"
                        className="w-full py-5 text-center bg-transparent border border-white/10 text-[10px] font-black uppercase tracking-[0.4em] group-hover:border-accent-primary hover:bg-white/5 transition-all active:bg-accent-primary/10"
                    >
                        Initialize
                    </a>
                </div>
            </div>

            {/* Mobile Scanline Effect */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-accent-primary/20 animate-scanline pointer-events-none" />
        </motion.div>
    );
}

export default function Events() {
    const [activeTab, setActiveTab] = useState("technical");

    return (
        <section id="events" className="py-20 md:py-32 px-4 md:px-6 bg-bg-primary">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 gap-12">
                    <div className="max-w-xl">
                        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="mono text-[10px] text-accent-primary font-black uppercase tracking-[0.5em] mb-4">
                            Symposium Protocol
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-7xl font-black mb-4 uppercase"
                        >
                            Event <span className="text-accent-primary">Matrix</span>
                        </motion.h2>
                    </div>

                    <div className="flex w-full md:w-auto p-1 bg-white/[0.02] border border-white/5">
                        {["technical", "nonTechnical"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`flex-1 md:flex-none px-6 md:px-10 py-4 text-[10px] font-black uppercase tracking-[0.3em] transition-all ${activeTab === tab
                                    ? "bg-accent-primary text-bg-primary"
                                    : "text-body-text hover:text-highlight"
                                    }`}
                            >
                                {tab === "technical" ? "Technical" : "Non-Tech"}
                            </button>
                        ))}
                    </div>
                </div>

                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-1"
                >
                    <AnimatePresence mode="popLayout">
                        {eventsData[activeTab].map((event) => (
                            <EventCard key={event.name} event={event} />
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
}

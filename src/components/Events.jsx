import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code, Presentation, Palette, Terminal, Gamepad, Camera, MapPin, Smile, ChevronDown, Award } from "lucide-react";

const eventsData = {
    technical: [
        {
            name: "Paper Presentation",
            icon: <Presentation size={24} />,
            desc: "Showcase your research and innovations in AI & Machine Learning.",
            teamSize: "1-2",
            rules: ["Topic must be AI/ML related", "10 mins presentation", "Q&A session"],
        },
        {
            name: "Web Wizards",
            icon: <Palette size={24} />,
            desc: "Design a futuristic UI/UX for a mission-critical AI platform.",
            teamSize: "1-2",
            rules: ["Tool: Figma or HTML/CSS", "Time: 2 hours", "Theme: Futuristic AI"],
        },
        {
            name: "Mock Interview",
            icon: <Terminal size={24} />,
            desc: "Simulate a high-stakes tech interview with industry standards.",
            teamSize: "1",
            rules: ["Resume screening", "Technical round", "HR round"],
        },
        {
            name: "Code Combat",
            icon: <Code size={24} />,
            desc: "Competitive programming challenge to test your algorithmic speed.",
            teamSize: "1",
            rules: ["Language: C++, Python, Java", "Online platform", "Time: 90 mins"],
        },
    ],
    nonTechnical: [
        {
            name: "E-Sports Arena",
            icon: <Gamepad size={24} />,
            desc: "Battle it out in the ultimate gaming tournament of the year.",
            teamSize: "1-5",
            rules: ["Games: VALORANT, BGMI", "Fair play only", "Single elimination"],
        },
        {
            name: "Lens Master",
            icon: <Camera size={24} />,
            desc: "Capture the essence of the symposium through your lens.",
            teamSize: "1",
            rules: ["DSLR or Mobile allowed", "Raw images required", "Theme: Tech Life"],
        },
        {
            name: "Treasure Hunt",
            icon: <MapPin size={24} />,
            desc: "Solve cryptic AI-themed puzzles to find the ultimate prize.",
            teamSize: "2-4",
            rules: ["QR code based", "Campus wide", "Fastest team wins"],
        },
        {
            name: "Fun Junction",
            icon: <Smile size={24} />,
            desc: "A collection of quick, high-energy games and social events.",
            teamSize: "1-2",
            rules: ["Spot registration", "High interaction", "Instant prizes"],
        },
    ],
};

function EventCard({ event }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.div
            layout
            transition={{ duration: 0.3 }}
            className="glass rounded-xl overflow-hidden group hover:border-accent-primary/50 transition-colors"
        >
            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-accent-primary/10 rounded-lg text-accent-primary">
                        {event.icon}
                    </div>
                    <div className="flex items-center gap-1 mono text-[10px] font-bold text-accent-primary border border-accent-primary/20 px-2 py-1 rounded">
                        <Award size={10} /> TEAM: {event.teamSize}
                    </div>
                </div>

                <h3 className="text-xl font-bold mb-2 text-highlight group-hover:text-accent-primary transition-colors">
                    {event.name}
                </h3>
                <p className="text-sm text-body-text mb-6 line-clamp-2">
                    {event.desc}
                </p>

                <div className="flex flex-col gap-3">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-body-text hover:text-highlight transition-colors"
                    >
                        Guidelines <ChevronDown size={14} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                    </button>

                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                            >
                                <ul className="text-xs text-body-text/80 space-y-2 py-4 border-t border-white/5">
                                    {event.rules.map((rule, i) => (
                                        <li key={i} className="flex items-center gap-2">
                                            <div className="w-1 h-1 rounded-full bg-accent-primary" /> {rule}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <a
                        href="#register"
                        className="w-full py-3 text-center bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-[0.2em] group-hover:bg-accent-primary group-hover:text-bg-primary transition-all duration-300"
                    >
                        Join Event
                    </a>
                </div>
            </div>
        </motion.div>
    );
}

export default function Events() {
    const [activeTab, setActiveTab] = useState("technical");

    return (
        <section id="events" className="py-24 px-6 bg-bg-primary">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-black mb-4"
                    >
                        Choose Your <span className="text-accent-primary">Battlefield</span>
                    </motion.h2>
                    <div className="w-20 h-1 bg-accent-primary mx-auto mb-12" />

                    <div className="flex justify-center gap-4">
                        {["technical", "nonTechnical"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${activeTab === tab
                                        ? "bg-accent-primary text-bg-primary shadow-[0_0_20px_rgba(0,245,255,0.3)]"
                                        : "text-body-text hover:text-highlight hover:bg-white/5"
                                    }`}
                            >
                                {tab === "technical" ? "Technical" : "Non-Technical"}
                            </button>
                        ))}
                    </div>
                </div>

                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
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

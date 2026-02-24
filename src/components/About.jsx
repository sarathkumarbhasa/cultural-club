import { motion } from "framer-motion";

const stats = [
    { label: "Events", value: "10+", delay: 0 },
    { label: "Categories", value: "2", delay: 0.2 },
    { label: "Experience", value: "1 Unforgettable", delay: 0.4 },
];

export default function About() {
    return (
        <section id="about" className="relative py-24 md:py-32 px-6 overflow-hidden bg-bg-secondary">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                {/* Left: Description */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight">
                        Defining the Future of <span className="text-accent-primary">AI & ML</span>
                    </h2>
                    <p className="text-lg text-body-text leading-relaxed max-w-xl">
                        PravahaAI is a premium technical symposium designed for the next generation of engineers.
                        Hosted by the Department of AIML at AITS Tirupati, we bring together minds to explore
                        the fluid boundaries of intelligence. Experience cinematic
                        innovation, engineered competitions, and the flow of modern tech.
                    </p>
                </motion.div>

                {/* Right: Stats */}
                <div className="grid grid-cols-1 gap-6">
                    {stats.map((stat, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: stat.delay }}
                            className="glass-cyan p-8 group hover:border-accent-primary/40 transition-colors"
                        >
                            <div className="text-3xl md:text-4xl font-black text-highlight mb-1">
                                {stat.value}
                            </div>
                            <div className="mono text-xs uppercase tracking-[0.2em] text-accent-primary font-bold">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

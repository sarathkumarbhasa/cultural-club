export default function Footer() {
    return (
        <footer className="py-12 px-6 bg-bg-primary border-t border-white/5">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                <div>
                    <span className="text-xl font-black tracking-tighter text-highlight">
                        PRAVAHA<span className="text-accent-primary">AI</span>
                    </span>
                    <p className="text-xs text-body-text mt-2 uppercase tracking-widest">
                        AITS Tirupati · AIML Department
                    </p>
                </div>

                <div className="flex gap-8">
                    {["Terms", "Privacy", "Contact"].map(item => (
                        <a key={item} href="#" className="text-[10px] uppercase tracking-widest text-body-text hover:text-accent-primary transition-colors">
                            {item}
                        </a>
                    ))}
                </div>

                <div className="text-[10px] text-body-text/50 uppercase tracking-[0.2em]">
                    © 2025 All Rights Reserved
                </div>
            </div>
        </footer>
    );
}

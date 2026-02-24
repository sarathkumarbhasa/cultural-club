import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 flex justify-between items-center pointer-events-none">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="pointer-events-auto"
      >
        <span className="text-xl font-black tracking-tighter text-highlight">
          PRAVAHA<span className="text-accent-primary">AI</span>
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="hidden md:flex gap-8 pointer-events-auto"
      >
        {["About", "Events", "Register"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="text-xs uppercase tracking-[0.2em] font-medium text-body-text hover:text-accent-primary transition-colors duration-300"
          >
            {item}
          </a>
        ))}
      </motion.div>
    </nav>
  );
}

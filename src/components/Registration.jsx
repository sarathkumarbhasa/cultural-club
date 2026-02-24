import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, CheckCircle2, AlertCircle, Loader2, ChevronDown } from "lucide-react";

const eventOptions = {
    technical: ["Paper Presentation", "Web Wizards", "Mock Interview", "Code Combat"],
    nonTechnical: ["E-Sports Arena", "Lens Master", "Treasure Hunt", "Fun Junction"]
};

export default function Registration() {
    const [formData, setFormData] = useState({
        name: "",
        mobile: "",
        college: "",
        year: "1st Year",
        eventCategory: "technical",
        eventName: "",
        teamSize: "1",
        teamMembers: "",
        imageBase64: "",
    });

    const [status, setStatus] = useState("idle");
    const [preview, setPreview] = useState(null);
    const fileInputRef = useRef(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                alert("File size must be less than 2MB");
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, imageBase64: reader.result });
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.imageBase64) {
            alert("Please upload an image (Payment Proof/ID)");
            return;
        }
        setStatus("loading");

        const payload = {
            ...formData,
            timestamp: new Date().toISOString()
        };

        try {
            await fetch("https://script.google.com/macros/s/AKfycby-Yp52lZvYPaREDFWZUdGkQ2k5K6Gmy6K0QCp3yq-SZ35lUPFvxjmHxFrWS83Ikem2/exec", {
                method: "POST",
                mode: "no-cors",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });
            setStatus("success");
        } catch (err) {
            console.error(err);
            setStatus("error");
        }
    };

    return (
        <section id="register" className="py-20 md:py-32 px-4 md:px-6 bg-bg-secondary relative">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent-primary/20 to-transparent" />

            <div className="max-w-4xl mx-auto relative z-10">
                <div className="flex flex-col items-center mb-20 text-center">
                    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="mono text-[10px] text-accent-primary tracking-[0.6em] uppercase font-black mb-6">
                        Registration Node
                    </motion.div>
                    <h2 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter uppercase italic">Authorize <span className="text-accent-primary">Access</span></h2>
                    <div className="h-1 w-20 bg-accent-primary mb-8" />
                    <p className="text-body-text/60 max-w-lg font-light leading-relaxed">Submit your credentials to initiate the symposium flow. Ensure all data fields are valid for digital clearance.</p>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="glass p-0.5 md:p-1 shadow-2xl"
                >
                    <div className="bg-bg-primary p-6 sm:p-8 md:p-16 border border-white/5">
                        {status === "success" ? (
                            <div className="text-center py-20 flex flex-col items-center">
                                <motion.div initial={{ scale: 0, rotate: -45 }} animate={{ scale: 1, rotate: 0 }} className="p-6 bg-accent-primary/10 rounded-full mb-10">
                                    <CheckCircle2 size={60} className="text-accent-primary" />
                                </motion.div>
                                <h3 className="text-4xl font-black mb-6 uppercase tracking-tight">Access <span className="text-accent-primary font-mono tracking-normal">Granted</span></h3>
                                <p className="text-body-text mb-12 max-w-sm font-light">Your registration packet has been encrypted and stored. Check your mobile for confirmation.</p>
                                <button
                                    onClick={() => { setStatus("idle"); setPreview(null); }}
                                    className="px-12 py-5 border border-accent-primary text-accent-primary font-black uppercase text-[10px] tracking-[0.4em] hover:bg-accent-primary hover:text-bg-primary transition-all shadow-[0_0_30px_rgba(0,245,255,0.2)]"
                                >
                                    Return to Start
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-12">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                                    {/* Name */}
                                    <div className="group relative">
                                        <label className="mono text-[8px] uppercase tracking-widest text-accent-primary font-black mb-2 block">Identity Code (Full Name)</label>
                                        <input
                                            required
                                            type="text"
                                            className="w-full bg-transparent border-b border-white/10 py-4 focus:border-accent-primary transition-all outline-none text-highlight font-light tracking-wider"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                        <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-accent-primary transition-all duration-500 group-focus-within:w-full" />
                                    </div>

                                    {/* Mobile */}
                                    <div className="group relative">
                                        <label className="mono text-[8px] uppercase tracking-widest text-accent-primary font-black mb-2 block">Communication Link (Mobile)</label>
                                        <input
                                            required
                                            type="tel"
                                            className="w-full bg-transparent border-b border-white/10 py-4 focus:border-accent-primary transition-all outline-none text-highlight font-light tracking-wider"
                                            value={formData.mobile}
                                            onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                                        />
                                        <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-accent-primary transition-all duration-500 group-focus-within:w-full" />
                                    </div>

                                    {/* College */}
                                    <div className="group relative lg:col-span-2">
                                        <label className="mono text-[8px] uppercase tracking-widest text-accent-primary font-black mb-2 block">Nexus Origin (College)</label>
                                        <input
                                            required
                                            type="text"
                                            className="w-full bg-transparent border-b border-white/10 py-4 focus:border-accent-primary transition-all outline-none text-highlight font-light tracking-wider"
                                            value={formData.college}
                                            onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                                        />
                                        <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-accent-primary transition-all duration-500 group-focus-within:w-full" />
                                    </div>

                                    {/* Year */}
                                    <div className="group relative">
                                        <label className="mono text-[8px] uppercase tracking-widest text-accent-primary font-black mb-2 block">Cyclic Tier (Year)</label>
                                        <select
                                            className="w-full bg-transparent border-b border-white/10 py-4 focus:border-accent-primary transition-all outline-none text-highlight appearance-none cursor-pointer font-light"
                                            value={formData.year}
                                            onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                                        >
                                            {["1st Year", "2nd Year", "3rd Year", "4th Year"].map(y => (
                                                <option key={y} className="bg-bg-primary" value={y}>{y}</option>
                                            ))}
                                        </select>
                                        <ChevronDown className="absolute right-0 bottom-4 text-body-text pointer-events-none" size={14} />
                                    </div>

                                    {/* Category */}
                                    <div className="group relative">
                                        <label className="mono text-[8px] uppercase tracking-widest text-accent-primary font-black mb-2 block">Combat Sector (Category)</label>
                                        <div className="flex gap-4 mt-2">
                                            {["technical", "nonTechnical"].map(cat => (
                                                <button
                                                    key={cat}
                                                    type="button"
                                                    onClick={() => setFormData({ ...formData, eventCategory: cat, eventName: "" })}
                                                    className={`flex-1 py-3 text-[9px] font-black uppercase tracking-widest border transition-all ${formData.eventCategory === cat ? "border-accent-primary text-accent-primary bg-accent-primary/5" : "border-white/5 text-body-text/40 hover:border-white/20"
                                                        }`}
                                                >
                                                    {cat === "technical" ? "Technical" : "Non-Tech"}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Event Name */}
                                    <div className="group relative lg:col-span-2">
                                        <label className="mono text-[8px] uppercase tracking-widest text-accent-primary font-black mb-2 block">Designated Module (Event)</label>
                                        <select
                                            required
                                            className="w-full bg-transparent border-b border-white/10 py-4 focus:border-accent-primary transition-all outline-none text-highlight appearance-none cursor-pointer font-light"
                                            value={formData.eventName}
                                            onChange={(e) => setFormData({ ...formData, eventName: e.target.value })}
                                        >
                                            <option value="" disabled className="bg-bg-primary text-body-text/30">Select Deployment</option>
                                            {eventOptions[formData.eventCategory].map(evt => (
                                                <option key={evt} className="bg-bg-primary" value={evt}>{evt}</option>
                                            ))}
                                        </select>
                                        <ChevronDown className="absolute right-0 bottom-4 text-body-text pointer-events-none" size={14} />
                                    </div>
                                </div>

                                {/* Team Info */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end">
                                    <div className="group relative">
                                        <label className="mono text-[8px] uppercase tracking-widest text-accent-primary font-black mb-2 block">Unit Count</label>
                                        <input
                                            required type="number" min="1" max="5"
                                            className="w-full bg-transparent border-b border-white/10 py-4 focus:border-accent-primary outline-none text-highlight font-light"
                                            value={formData.teamSize}
                                            onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                                        />
                                    </div>
                                    {parseInt(formData.teamSize) > 1 && (
                                        <div className="md:col-span-2 group relative">
                                            <label className="mono text-[8px] uppercase tracking-widest text-accent-primary font-black mb-2 block">Unit Designations (Names)</label>
                                            <input
                                                required type="text" placeholder="Separate with commas"
                                                className="w-full bg-transparent border-b border-white/10 py-4 focus:border-accent-primary outline-none text-highlight font-light placeholder:text-body-text/20"
                                                value={formData.teamMembers}
                                                onChange={(e) => setFormData({ ...formData, teamMembers: e.target.value })}
                                            />
                                        </div>
                                    )}
                                </div>

                                {/* File Upload */}
                                <div className="space-y-6">
                                    <label className="mono text-[8px] uppercase tracking-widest text-accent-primary font-black">Visual Confirmation (ID / Proof)</label>
                                    <div
                                        onClick={() => fileInputRef.current?.click()}
                                        className={`group relative h-48 border border-white/5 bg-white/[0.01] flex flex-col items-center justify-center cursor-pointer transition-all hover:bg-white/[0.03] hover:border-accent-primary/20 ${preview && 'border-accent-primary/30'}`}
                                    >
                                        {preview ? (
                                            <img src={preview} alt="Preview" className="w-full h-full object-cover opacity-60" />
                                        ) : (
                                            <div className="flex flex-col items-center gap-4 group-hover:scale-110 transition-transform duration-500">
                                                <Upload size={32} className="text-body-text/30 group-hover:text-accent-primary transition-colors" />
                                                <span className="mono text-[9px] uppercase tracking-[0.4em] text-body-text/40">Upload Packet</span>
                                            </div>
                                        )}
                                        <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageChange} />
                                    </div>
                                </div>

                                <button
                                    disabled={status === "loading"}
                                    className="group relative w-full h-20 bg-accent-primary flex items-center justify-center gap-4 transition-all hover:bg-white active:scale-[0.99] disabled:opacity-50"
                                >
                                    {status === "loading" ? (
                                        <Loader2 className="animate-spin text-bg-primary" size={24} />
                                    ) : (
                                        <>
                                            <span className="text-bg-primary font-black uppercase tracking-[0.5em] text-xs">Authorize Full Deployment</span>
                                        </>
                                    )}
                                    <div className="absolute inset-0 shadow-[0_0_50px_rgba(0,245,255,0.4)] pointer-events-none group-hover:shadow-[0_0_60px_rgba(255,255,255,0.4)] transition-all" />
                                </button>
                            </form>
                        )}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

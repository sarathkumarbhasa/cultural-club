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

    const [status, setStatus] = useState("idle"); // idle, loading, success, error
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
            const response = await fetch("https://script.google.com/macros/s/AKfycby-Yp52lZvYPaREDFWZUdGkQ2k5K6Gmy6K0QCp3yq-SZ35lUPFvxjmHxFrWS83Ikem2/exec", {
                method: "POST",
                mode: "no-cors",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            // Since we use no-cors, we won't get a proper JSON response, but we can assume success if no error thrown
            setStatus("success");
        } catch (err) {
            console.error(err);
            setStatus("error");
        }
    };

    return (
        <section id="register" className="py-24 px-6 bg-bg-secondary relative overflow-hidden">
            {/* Decorative blur */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent-primary/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-3xl mx-auto relative z-10">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-black mb-4 uppercase tracking-tight">Secure Your <span className="text-accent-primary">Slot</span></h2>
                    <p className="text-body-text">Complete the registration to receive your digital entry pass.</p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="glass rounded-2xl p-8 md:p-12 shadow-2xl"
                >
                    {status === "success" ? (
                        <div className="text-center py-12">
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex justify-center mb-6">
                                <CheckCircle2 size={80} className="text-accent-primary" />
                            </motion.div>
                            <h3 className="text-2xl font-bold mb-4">Registration Successful!</h3>
                            <p className="text-body-text mb-8">Your data has been securely transmitted. See you at the symposium.</p>
                            <button
                                onClick={() => { setStatus("idle"); setFormData({ ...formData, imageBase64: "" }); setPreview(null); }}
                                className="px-8 py-3 bg-white/5 border border-white/10 hover:bg-white/10 transition-colors uppercase text-xs font-bold tracking-widest"
                            >
                                Register Another
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Name */}
                                <div className="space-y-2">
                                    <label className="mono text-[10px] uppercase tracking-widest text-accent-primary font-bold">Full Name</label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="Enter your name"
                                        className="w-full bg-white/5 border-b border-white/20 px-0 py-3 focus:border-accent-primary transition-colors outline-none text-highlight placeholder:text-body-text/40"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>

                                {/* Mobile */}
                                <div className="space-y-2">
                                    <label className="mono text-[10px] uppercase tracking-widest text-accent-primary font-bold">Mobile Number</label>
                                    <input
                                        required
                                        type="tel"
                                        placeholder="e.g. 9876543210"
                                        className="w-full bg-white/5 border-b border-white/20 px-0 py-3 focus:border-accent-primary transition-colors outline-none text-highlight placeholder:text-body-text/40"
                                        value={formData.mobile}
                                        onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* College */}
                                <div className="space-y-2">
                                    <label className="mono text-[10px] uppercase tracking-widest text-accent-primary font-bold">College Name</label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="Enter your college"
                                        className="w-full bg-white/5 border-b border-white/20 px-0 py-3 focus:border-accent-primary transition-colors outline-none text-highlight placeholder:text-body-text/40"
                                        value={formData.college}
                                        onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                                    />
                                </div>

                                {/* Year */}
                                <div className="space-y-2 relative">
                                    <label className="mono text-[10px] uppercase tracking-widest text-accent-primary font-bold">Year of Study</label>
                                    <select
                                        className="w-full bg-transparent border-b border-white/20 px-0 py-3 focus:border-accent-primary transition-colors outline-none text-highlight appearance-none cursor-pointer"
                                        value={formData.year}
                                        onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                                    >
                                        <option className="bg-bg-secondary" value="1st Year">1st Year</option>
                                        <option className="bg-bg-secondary" value="2nd Year">2nd Year</option>
                                        <option className="bg-bg-secondary" value="3rd Year">3rd Year</option>
                                        <option className="bg-bg-secondary" value="4th Year">4th Year</option>
                                    </select>
                                    <ChevronDown className="absolute right-0 bottom-3 text-body-text pointer-events-none" size={16} />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Category */}
                                <div className="space-y-2">
                                    <label className="mono text-[10px] uppercase tracking-widest text-accent-primary font-bold">Event Category</label>
                                    <div className="flex gap-2">
                                        {["technical", "nonTechnical"].map(cat => (
                                            <button
                                                key={cat}
                                                type="button"
                                                onClick={() => setFormData({ ...formData, eventCategory: cat, eventName: "" })}
                                                className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-widest border transition-all ${formData.eventCategory === cat ? "border-accent-primary text-accent-primary bg-accent-primary/10" : "border-white/10 text-body-text"
                                                    }`}
                                            >
                                                {cat === "technical" ? "Technical" : "Non-Tech"}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Event Name */}
                                <div className="space-y-2 relative">
                                    <label className="mono text-[10px] uppercase tracking-widest text-accent-primary font-bold">Event Name</label>
                                    <select
                                        required
                                        className="w-full bg-transparent border-b border-white/20 px-0 py-3 focus:border-accent-primary transition-colors outline-none text-highlight appearance-none cursor-pointer"
                                        value={formData.eventName}
                                        onChange={(e) => setFormData({ ...formData, eventName: e.target.value })}
                                    >
                                        <option value="" disabled>Select an event</option>
                                        {eventOptions[formData.eventCategory].map(evt => (
                                            <option key={evt} className="bg-bg-secondary" value={evt}>{evt}</option>
                                        ))}
                                    </select>
                                    <ChevronDown className="absolute right-0 bottom-3 text-body-text pointer-events-none" size={16} />
                                </div>
                            </div>

                            {/* Team Size */}
                            <div className="space-y-2">
                                <label className="mono text-[10px] uppercase tracking-widest text-accent-primary font-bold">Team Size (Incl. You)</label>
                                <input
                                    required
                                    type="number"
                                    min="1"
                                    max="5"
                                    placeholder="1"
                                    className="w-full bg-white/5 border-b border-white/20 px-0 py-3 focus:border-accent-primary transition-colors outline-none text-highlight"
                                    value={formData.teamSize}
                                    onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                                />
                            </div>

                            {parseInt(formData.teamSize) > 1 && (
                                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="space-y-2">
                                    <label className="mono text-[10px] uppercase tracking-widest text-accent-primary font-bold">Team Member Names</label>
                                    <textarea
                                        required
                                        placeholder="Enter names separated by commas"
                                        className="w-full bg-white/5 border-b border-white/20 px-0 py-3 focus:border-accent-primary transition-colors outline-none text-highlight min-h-[80px] resize-none"
                                        value={formData.teamMembers}
                                        onChange={(e) => setFormData({ ...formData, teamMembers: e.target.value })}
                                    />
                                </motion.div>
                            )}

                            {/* Image Upload */}
                            <div className="space-y-4">
                                <label className="mono text-[10px] uppercase tracking-widest text-accent-primary font-bold">Image Upload (ID / Proof)</label>
                                <div
                                    onClick={() => fileInputRef.current?.click()}
                                    className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center gap-4 cursor-pointer transition-all ${preview ? 'border-accent-primary/50 bg-accent-primary/5' : 'border-white/10 hover:border-accent-primary/20'
                                        }`}
                                >
                                    {preview ? (
                                        <div className="relative w-full aspect-video md:aspect-[21/9] rounded-lg overflow-hidden border border-white/10">
                                            <img src={preview} alt="Upload preview" className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                                <p className="text-white text-xs font-bold uppercase tracking-widest">Change Image</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="p-4 bg-white/5 rounded-full text-body-text group-hover:text-accent-primary transition-colors">
                                                <Upload size={32} />
                                            </div>
                                            <div className="text-center">
                                                <p className="text-sm text-highlight font-medium">Click to upload image</p>
                                                <p className="text-xs text-body-text mt-1">PNG, JPG up to 2MB</p>
                                            </div>
                                        </>
                                    )}
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                    />
                                </div>
                            </div>

                            <button
                                disabled={status === "loading"}
                                className="w-full py-5 bg-accent-primary text-bg-primary font-black uppercase tracking-[0.3em] flex items-center justify-center gap-2 hover:shadow-[0_0_40px_rgba(0,245,255,0.4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {status === "loading" ? (
                                    <>
                                        <Loader2 className="animate-spin" size={20} />
                                        Processing...
                                    </>
                                ) : (
                                    "Finalize Registration"
                                )}
                            </button>

                            {status === "error" && (
                                <div className="flex items-center gap-2 text-red-400 text-xs font-bold justify-center">
                                    <AlertCircle size={14} /> Failed to submit. Please try again.
                                </div>
                            )}
                        </form>
                    )}
                </motion.div>
            </div>
        </section>
    );
}

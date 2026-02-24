import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TARGET_DATE = new Date('2026-03-13T09:00:00');

export default function Countdown() {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    function calculateTimeLeft() {
        const difference = +TARGET_DATE - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        } else {
            timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }

        return timeLeft;
    }

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const ScrambleDigit = ({ value }) => {
        const [displayValue, setDisplayValue] = useState(value);
        const [isGlitching, setIsGlitching] = useState(false);

        useEffect(() => {
            setIsGlitching(true);
            let iterations = 0;
            const interval = setInterval(() => {
                setDisplayValue(Math.floor(Math.random() * 10).toString());
                iterations++;
                if (iterations > 6) {
                    clearInterval(interval);
                    setDisplayValue(value);
                    setIsGlitching(false);
                }
            }, 40);

            return () => clearInterval(interval);
        }, [value]);

        return (
            <div className={`relative w-8 md:w-14 h-16 md:h-24 flex items-center justify-center bg-white/[0.02] border border-white/5 mx-[1px] transition-all duration-200 ${isGlitching ? 'border-accent-primary/40 bg-accent-primary/5' : ''}`}>
                <span className={`text-3xl md:text-6xl font-black mono tracking-tighter ${isGlitching ? 'text-accent-primary brightness-150' : 'text-highlight'}`}>
                    {displayValue}
                </span>
                {isGlitching && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 0] }}
                        className="absolute inset-0 bg-accent-primary/5 pointer-events-none"
                    />
                )}
            </div>
        );
    };

    const TimeBlock = ({ value, label }) => {
        const digits = value.toString().padStart(2, '0').split('');
        return (
            <div className="flex flex-col items-center px-2 md:px-8 border-x border-white/5">
                <div className="flex">
                    {digits.map((d, i) => <ScrambleDigit key={i} value={d} />)}
                </div>
                <span className="mono text-[7px] md:text-[9px] uppercase tracking-[0.4em] text-accent-primary/60 mt-4 font-black">
                    {label}
                </span>
            </div>
        );
    };

    return (
        <div className="py-24 bg-bg-primary flex flex-col items-center justify-center relative overflow-hidden border-y border-white/5">
            {/* Ambient Data Grid */}
            <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-accent-primary/5 rounded-full blur-[100px] pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative z-10 flex flex-col items-center"
            >
                <div className="flex items-center gap-6 mb-16">
                    <div className="h-[1px] w-6 md:w-12 bg-accent-primary/20" />
                    <span className="mono text-[8px] md:text-[10px] text-accent-primary uppercase tracking-[0.8em] font-black">
                        Temporal Decryption Matrix
                    </span>
                    <div className="h-[1px] w-6 md:w-12 bg-accent-primary/20" />
                </div>

                <div className="flex items-center backdrop-blur-xl p-4 md:p-12 border border-white/10 bg-black/40 shadow-2xl">
                    <TimeBlock value={timeLeft.days} label="Days" />
                    <div className="text-accent-primary/10 text-xl md:text-3xl font-thin pb-8 px-2 md:px-4">/</div>
                    <TimeBlock value={timeLeft.hours} label="Hours" />
                    <div className="text-accent-primary/10 text-xl md:text-3xl font-thin pb-8 px-2 md:px-4">/</div>
                    <TimeBlock value={timeLeft.minutes} label="Mins" />
                    <div className="text-accent-primary/10 text-xl md:text-3xl font-thin pb-8 px-2 md:px-4">/</div>
                    <TimeBlock value={timeLeft.seconds} label="Secs" />
                </div>

                <div className="mt-16 flex flex-col items-center gap-4">
                    <div className="flex gap-4">
                        {[1, 2, 3, 4, 5].map(i => (
                            <motion.div
                                key={i}
                                animate={{ height: [4, 12, 4], opacity: [0.2, 1, 0.2] }}
                                transition={{ duration: 1, delay: i * 0.1, repeat: Infinity }}
                                className="w-1 bg-accent-primary"
                            />
                        ))}
                    </div>
                    <div className="text-center">
                        <div className="mono text-[10px] text-highlight/50 uppercase tracking-[0.4em] mb-1">
                            Target: March 13. 2026 // 09:00:00
                        </div>
                        <div className="mono text-[8px] text-accent-primary/30 uppercase tracking-[0.2em]">
                            AITS Tirupati // AIML Department // PravahaAI
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

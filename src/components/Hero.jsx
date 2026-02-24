import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Float } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';
import { motion } from 'framer-motion';

function NeuralNetwork() {
    const ref = useRef();
    const sphere = useMemo(() => random.inSphere(new Float32Array(5000), { radius: 1.5 }), []);

    useFrame((state, delta) => {
        ref.current.rotation.x -= delta / 15;
        ref.current.rotation.y -= delta / 20;
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    color="#00F5FF"
                    size={0.004}
                    sizeAttenuation={true}
                    depthWrite={false}
                    opacity={0.6}
                />
            </Points>
        </group>
    );
}

export default function Hero() {
    return (
        <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-bg-primary">
            {/* Three.js Background */}
            <div className="absolute inset-0 z-0">
                <Canvas camera={{ position: [0, 0, 1] }}>
                    <NeuralNetwork />
                </Canvas>
            </div>

            {/* Overlays */}
            <div className="absolute inset-0 z-10 bg-grid opacity-30 pointer-events-none" />
            <div className="absolute inset-0 z-10 bg-gradient-to-b from-bg-primary via-transparent to-bg-primary pointer-events-none" />

            {/* Content */}
            <div className="relative z-20 text-center px-6 max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="mb-6"
                >
                    <span className="mono text-[10px] md:text-xs uppercase tracking-[0.5em] text-accent-primary font-black px-4 py-1 border border-accent-primary/20 rounded-full bg-accent-primary/5">
                        Department of AIML · AITS Tirupati
                    </span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
                    animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                    transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
                    className="text-7xl md:text-9xl lg:text-[11rem] font-black mb-4 tracking-tighter text-highlight"
                >
                    Pravaha<span className="text-accent-primary">AI</span>
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    transition={{ duration: 1, delay: 0.6 }}
                    className="h-[1px] w-24 bg-accent-primary mx-auto mb-8 shadow-[0_0_15px_rgba(0,245,255,0.8)]"
                />

                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="text-xl md:text-3xl font-light text-body-text mb-14 tracking-[0.1em] uppercase"
                >
                    Flow of Intelligence
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 1 }}
                    className="flex flex-col sm:flex-row gap-6 justify-center"
                >
                    <a
                        href="#register"
                        className="group relative px-12 py-5 bg-accent-primary text-bg-primary font-black text-xs tracking-[0.3em] uppercase overflow-hidden"
                    >
                        <span className="relative z-10">Register Now</span>
                        <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                        <div className="absolute inset-0 shadow-[0_0_50px_rgba(0,245,255,1)]" />
                    </a>
                    <a
                        href="#events"
                        className="group px-12 py-5 border border-white/10 text-highlight font-black text-xs tracking-[0.3em] uppercase hover:bg-white/5 transition-all hover:border-accent-primary"
                    >
                        Explore Events
                    </a>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4"
            >
                <div className="w-[1px] h-16 bg-gradient-to-b from-accent-primary to-transparent" />
                <span className="mono text-[8px] uppercase tracking-[0.4em] text-accent-primary font-bold">Initiate Flow</span>
            </motion.div>
        </section>
    );
}

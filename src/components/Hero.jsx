import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Float } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';
import { motion } from 'framer-motion';

function NeuralNetwork() {
    const ref = useRef();
    const sphere = useMemo(() => random.inSphere(new Float32Array(3000), { radius: 1.5 }), []);

    useFrame((state, delta) => {
        ref.current.rotation.x -= delta / 10;
        ref.current.rotation.y -= delta / 15;
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    color="#00F5FF"
                    size={0.005}
                    sizeAttenuation={true}
                    depthWrite={false}
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

            {/* Grid Overlay */}
            <div className="absolute inset-0 z-10 bg-grid opacity-20 pointer-events-none" />
            <div className="absolute inset-0 z-10 bg-gradient-to-b from-bg-primary/0 via-bg-primary/50 to-bg-primary pointer-events-none" />

            {/* Content */}
            <div className="relative z-20 text-center px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-4"
                >
                    <span className="mono text-[10px] md:text-xs uppercase tracking-[0.4em] text-accent-primary font-bold">
                        AIML Department · AITS Tirupati
                    </span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black mb-2 tracking-tighter bg-gradient-to-b from-highlight to-highlight/30 bg-clip-text text-transparent break-words max-w-full"
                >
                    PravahaAI
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-xl md:text-2xl font-light text-body-text mb-12 tracking-wide"
                >
                    Flow of Intelligence
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <a
                        href="#register"
                        className="px-10 py-4 bg-accent-primary text-bg-primary font-bold text-sm tracking-widest uppercase hover:scale-105 transition-transform active:scale-95 shadow-[0_0_30px_rgba(0,245,255,0.4)]"
                    >
                        Register Now
                    </a>
                    <a
                        href="#events"
                        className="px-10 py-4 border border-accent-primary/50 text-accent-primary font-bold text-sm tracking-widest uppercase hover:bg-accent-primary/10 transition-colors"
                    >
                        Explore Events
                    </a>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
            >
                <div className="w-[1px] h-12 bg-gradient-to-b from-accent-primary/50 to-transparent" />
                <span className="mono text-[8px] uppercase tracking-[0.2em] text-body-text">Scroll</span>
            </motion.div>
        </section>
    );
}

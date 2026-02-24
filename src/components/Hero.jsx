import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, AdaptiveDpr, Preload } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';
import { motion } from 'framer-motion';

function NeuralNetwork() {
    const ref = useRef();
    // Optimized particle count for mobile mist effect
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const particleCount = isMobile ? 1500 : 6000;
    const sphere = useMemo(() => random.inSphere(new Float32Array(particleCount), { radius: 1.5 }), [particleCount]);

    useFrame((state, delta) => {
        // limit rotation speed and ensure it's frame-rate independent
        if (ref.current) {
            ref.current.rotation.x -= delta / 20;
            ref.current.rotation.y -= delta / 30;
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={true}>
                <PointMaterial
                    transparent
                    color="#00F5FF"
                    size={isMobile ? 0.002 : 0.004}
                    sizeAttenuation={true}
                    depthWrite={false}
                    opacity={isMobile ? 0.3 : 0.5}
                />
            </Points>
        </group>
    );
}

export default function Hero() {
    return (
        <section className="relative h-screen min-h-[600px] w-full flex flex-col items-center justify-center overflow-hidden bg-bg-primary">
            {/* Ambient Depth Blobs */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className={`absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent-primary/5 rounded-full ${isMobile ? 'blur-[60px]' : 'blur-[120px]'} animate-pulse`} />
                <div className={`absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-accent-secondary/5 rounded-full ${isMobile ? 'blur-[50px]' : 'blur-[100px]'}`} />
                <div className={`absolute top-[40%] right-[10%] w-[20%] h-[20%] bg-accent-primary/10 rounded-full ${isMobile ? 'blur-[40px]' : 'blur-[80px]'}`} />
            </div>

            {/* Three.js Background */}
            <div className="absolute inset-0 z-0">
                <Canvas camera={{ position: [0, 0, 1] }} dpr={[1, 2]}>
                    <AdaptiveDpr pixelated={isMobile} />
                    <NeuralNetwork />
                    <Preload all />
                </Canvas>
            </div>

            {/* Grid Overlay */}
            <div className="absolute inset-0 z-10 bg-grid opacity-20 pointer-events-none" />
            <div className="absolute inset-0 z-10 bg-gradient-to-b from-bg-primary/20 via-bg-primary/60 to-bg-primary pointer-events-none" />

            {/* Content */}
            <div className="relative z-20 text-center px-6 flex flex-col items-center max-w-full overflow-hidden">
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-6 md:mb-8"
                >
                    <span className="mono text-[9px] md:text-xs uppercase tracking-[0.5em] text-accent-primary font-black px-4 py-1.5 border border-accent-primary/20 bg-accent-primary/5 rounded-full">
                        AIML · AITS Tirupati
                    </span>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="relative mb-6 md:mb-8"
                >
                    <h1 className="text-[12vw] sm:text-7xl md:text-9xl lg:text-[11rem] font-black tracking-tight leading-none bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent italic uppercase select-none">
                        Pravaha<span className="text-accent-primary not-italic">AI</span>
                    </h1>
                    {/* Decorative line for mobile impact */}
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 md:w-24 h-[2px] bg-accent-primary shadow-[0_0_15px_rgba(0,245,255,0.8)]" />
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-base sm:text-xl md:text-2xl font-light text-body-text/80 mb-12 md:mb-16 tracking-[0.2em] uppercase max-w-[280px] sm:max-w-none"
                >
                    Flow of <span className="text-highlight font-medium">Intelligence</span>
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full sm:w-auto px-10 sm:px-0"
                >
                    <a
                        href="#register"
                        className="w-full sm:w-auto px-12 py-5 bg-accent-primary text-bg-primary font-black text-xs tracking-[0.4em] uppercase hover:bg-white transition-all shadow-[0_0_40px_rgba(0,245,255,0.3)] active:scale-95 text-center"
                    >
                        Initialize
                    </a>
                    <a
                        href="#events"
                        className="w-full sm:w-auto px-12 py-5 border border-white/10 text-highlight font-black text-xs tracking-[0.4em] uppercase hover:bg-white/5 transition-all text-center"
                    >
                        Explore
                    </a>
                </motion.div>
            </div>

        </section>
    );
}

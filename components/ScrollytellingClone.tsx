'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshTransmissionMaterial } from '@react-three/drei';
import { useRef,  useMemo, Suspense } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import * as THREE from 'three';

// Visual Content inside the Glass Brick
function BrickContent({ type = 'chart', color }: { type?: 'chart' | 'bars' | 'coin'; color: string }) {
  // Always call hooks at the top level
  const points = useMemo(() => {
     const pts = [];
     for(let i=0; i<5; i++) {
        // Use a simple deterministic psuedo-random based on index to avoid hydration mismatch/impure render
        const y = Math.sin(i * 1.5) * 0.2; 
        pts.push(new THREE.Vector3((i/4 - 0.5), y, 0));
     }
     return pts;
  }, []);
  
  const lineGeometry = useMemo(() => {
     const curve = new THREE.CatmullRomCurve3(points);
     return new THREE.TubeGeometry(curve, 32, 0.02, 8, false);
  }, [points]);

  if (type === 'bars') {
    return (
      <group position={[-0.2, -0.2, 0]}>
        {[0.2, 0.4, 0.3, 0.5, 0.4].map((h, i) => (
          <mesh key={i} position={[i * 0.15, h/2, 0]}>
             <boxGeometry args={[0.08, h, 0.02]} />
             <meshBasicMaterial color={color} transparent opacity={0.6} />
          </mesh>
        ))}
      </group>
    );
  }
  
  if (type === 'coin') {
     return (
        <group>
           <mesh rotation={[Math.PI/2, 0, 0]}>
              <cylinderGeometry args={[0.3, 0.3, 0.05, 32]} />
              <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
           </mesh>
           <mesh rotation={[Math.PI/2, 0, 0]} position={[0, 0, 0.1]}>
              <cylinderGeometry args={[0.2, 0.2, 0.05, 32]} />
              <meshBasicMaterial color="#ffffff" transparent opacity={0.2} />
           </mesh>
        </group>
     )
  }

  return (
    <mesh geometry={lineGeometry}>
      <meshBasicMaterial color={color} />
    </mesh>
  );
}

function GlassBrick({ position, rotation, scale, color, content }: any) {
  const mesh = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.2;
      mesh.current.rotation.x = rotation[0] + Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
    }
  });

  return (
    <group position={position} rotation={rotation} scale={scale || [1, 1, 1]}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.2}>
        <mesh ref={mesh}>
          <boxGeometry args={[1.5, 2, 0.2]} />
          <MeshTransmissionMaterial
            transmission={0.9}
            roughness={0.2}
            thickness={0.5}
            ior={1.5}
            chromaticAberration={0.06}
            color={color}
            transparent
            opacity={0.7}
          />
          {/* Internal Content */}
          <group position={[0, 0, 0]} scale={[0.8, 0.8, 0.8]}>
             <BrickContent type={content} color={color === '#ffffff' ? '#22D3EE' : '#ffffff'} />
          </group>
        </mesh>
        
        {/* Glow */}
        <mesh position={[0, 0, -0.2]} scale={[1.6, 2.1, 1]}>
           <planeGeometry />
           <meshBasicMaterial color={color} transparent opacity={0.15} />
        </mesh>
      </Float>
    </group>
  );
}

function GlassBricksScene({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame(() => {
    if (groupRef.current) {
      // Rotate the entire group based on scroll
      groupRef.current.rotation.y = scrollRef.current * Math.PI * 0.5;
    }
  });

  return (
    <group ref={groupRef}>
      <GlassBrick 
        position={[-2, 0, 0]} 
        rotation={[0, 0.2, 0]} 
        color="#4338CA"
        content="chart"
      />
      <GlassBrick 
        position={[2, 1, -1]} 
        rotation={[0, -0.2, 0]} 
        color="#6366F1" 
        content="bars"
      />
      
      <GlassBrick 
        position={[-1, -2, 1]} 
        rotation={[0.2, 0, 0]} 
        color="#22D3EE"
        content="coin"
      />
      <GlassBrick 
        position={[3, -1, 0.5]} 
        rotation={[-0.1, 0, 0]} 
        color="#A855F7"
        content="chart"
      />
    </group>
  );
}

const scrollContent = [
  {
    category: 'Prime Brokerage',
    title: 'Modern Prime.',
    description: 'A platform built for speed, reliability, and scale. We handle the complexity so you can focus on trading.',
  },
  {
    category: 'Clearing & Custody',
    title: 'Secure & Efficient.',
    description: 'Real-time clearing and settlement with automated risk management and comprehensive reporting.',
  },
  {
    category: 'Execution',
    title: 'Smart Routing.',
    description: 'Advanced algorithms and direct market access ensuring best execution for your strategies.',
  },
];

function ScrollContentItem({ item, index, scrollYProgress }: { item: any, index: number, scrollYProgress: MotionValue<number> }) {
    const sectionStart = index / scrollContent.length;
    const sectionEnd = (index + 1) / scrollContent.length;

    const opacity = useTransform(
        scrollYProgress,
        [sectionStart, sectionStart + 0.1, sectionEnd - 0.1, sectionEnd],
        [0, 1, 1, 0]
    );
    
    const y = useTransform(
        scrollYProgress,
        [sectionStart, sectionStart + 0.1, sectionEnd - 0.1, sectionEnd],
        [50, 0, 0, -50]
    );

    return (
        <motion.div 
            style={{ opacity, y }}
            className="absolute top-1/2 left-0 w-full transform -translate-y-1/2 px-4 md:px-12"
        >
          <div className="max-w-xl">
            <span className="text-[#22D3EE] font-mono text-sm tracking-wider mb-4 block">
              0{index + 1}
            </span>
            <h2 className="heading-lg text-white mb-6">
              {item.title}
            </h2>
            <p className="text-xl text-white/70 leading-relaxed">
              {item.description}
            </p>
            <div className="mt-8">
              <button className="text-white hover:text-[#22D3EE] transition-colors flex items-center gap-2 group">
                Learn more 
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>
          </div>
        </motion.div>
    );
}

function ProgressItem({ index, scrollYProgress }: { index: number, scrollYProgress: MotionValue<number> }) {
     const sectionStart = index / scrollContent.length;
    const sectionEnd = (index + 1) / scrollContent.length;

    const height = useTransform(
        scrollYProgress,
        [sectionStart, sectionEnd],
        ['0%', '100%']
    );

    return (
        <div className="w-1 h-32 bg-white/10 rounded-full relative overflow-hidden">
            <motion.div 
              style={{ height }}
              className="absolute top-0 left-0 w-full bg-[#22D3EE]"
            />
        </div>
    );
}

export default function ScrollytellingClone() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const scrollRef = useRef(0);
  
  // Sync scroll progress to ref for 3D useFrame
  useMemo(() => {
      // scrollYProgress.on returns a cleanup function
      return scrollYProgress.on('change', (v) => {
          scrollRef.current = v;
      });
  }, [scrollYProgress]);

  return (
    <section ref={containerRef} className="relative h-[300vh] bg-[#2E21DE]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* 3D Background */}
        <div className="absolute inset-0 w-full h-full">
          <Canvas
            camera={{ position: [0, 0, 6], fov: 45 }}
            gl={{
                antialias: false,
                alpha: true,
                powerPreference: 'high-performance',
                stencil: false,
                depth: true,
              }}
              dpr={[1, 1.5]}
              performance={{ min: 0.5 }}
          >
            <Suspense fallback={null}>
                {/* Lighting */}
                <ambientLight intensity={0.4} />
                <directionalLight position={[10, 10, 5]} intensity={1} />
                <pointLight position={[-5, 0, 5]} intensity={2} color="#22D3EE" />
                
                <GlassBricksScene scrollRef={scrollRef} />
            </Suspense>
          </Canvas>
        </div>

        {/* Text Content Layer */}
        <div className="absolute inset-0 z-10 section-container flex items-center">
            <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-12">
                <div className="relative h-[400px]">
                     {scrollContent.map((item, index) => (
                        <ScrollContentItem 
                            key={index} 
                            item={item} 
                            index={index} 
                            scrollYProgress={scrollYProgress} 
                        />
                     ))}
                </div>
                
                {/* Progress Indicators */}
                <div className="hidden lg:flex flex-col gap-4 items-end justify-center">
                   {scrollContent.map((_, index) => (
                      <ProgressItem 
                        key={index} 
                        index={index} 
                        scrollYProgress={scrollYProgress} 
                      />
                   ))}
                </div>
            </div>
        </div>
      </div>
    </section>
  );
}

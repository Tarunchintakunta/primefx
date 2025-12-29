'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshTransmissionMaterial, Text } from '@react-three/drei';
import { useRef, useMemo, Suspense } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';

// Dashboard Glass Panel Component
interface DashboardPanelProps {
  position: [number, number, number];
  rotation: [number, number, number];
  scale?: [number, number, number];
  color: string;
  children: React.ReactNode;
  delay?: number;
}

function DashboardPanel({ position, rotation, scale, color, children, delay = 0 }: DashboardPanelProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = rotation[1] + Math.sin(state.clock.elapsedTime * 0.2 + delay) * 0.05;
      meshRef.current.rotation.x = rotation[0] + Math.sin(state.clock.elapsedTime * 0.3 + delay) * 0.02;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.4 + delay) * 0.1;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.1} floatIntensity={0.2}>
      <group position={position} rotation={rotation} scale={scale || [1, 1, 1]}>
        <mesh ref={meshRef}>
          <boxGeometry args={[1, 0.6, 0.05]} />
          <MeshTransmissionMaterial
            transmission={0.95}
            roughness={0.1}
            thickness={1.5}
            ior={1.4}
            chromaticAberration={0.02}
            color={color}
            transparent
            opacity={0.6}
            resolution={256}
          />
          {/* Content inside the glass */}
          <group position={[0, 0, 0.03]}>
            {children}
          </group>
        </mesh>
        
        {/* Glow behind */}
        <mesh position={[0, 0, -0.1]} scale={[1.05, 1.05, 1]}>
          <planeGeometry args={[1, 0.6]} />
          <meshBasicMaterial color={color} transparent opacity={0.15} />
        </mesh>
      </group>
    </Float>
  );
}

// Simple Chart Line Component
function ChartLine({ points, color }: { points: THREE.Vector3[]; color: string }) {
  const geometry = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3(points);
    return new THREE.TubeGeometry(curve, 32, 0.015, 8, false);
  }, [points]);

  return (
    <mesh geometry={geometry}>
      <meshBasicMaterial color={color} toneMapped={false} />
    </mesh>
  );
}

// Forex Card Component
function ForexCard({ pair, price, change, isPositive }: { pair: string, price: string, change: string, isPositive: boolean }) {
  return (
    <group>
       <Text position={[-0.35, 0.15, 0]} fontSize={0.1} color="white" anchorX="left">
        {pair}
      </Text>
      <Text position={[-0.35, -0.05, 0]} fontSize={0.15} color="white" anchorX="left">
        {price}
      </Text>
      <Text position={[-0.35, -0.22, 0]} fontSize={0.08} color={isPositive ? "#4ade80" : "#f87171"} anchorX="left">
        {change}
      </Text>
      
       {/* Simple mini chart */}
       <group position={[0.25, 0, 0]}>
          {[0.1, 0.2, -0.05, 0.15, 0.05].map((y, i) => (
             <mesh key={i} position={[(i-2)*0.08, isPositive ? y*0.5 : -y*0.5, 0]}>
               <boxGeometry args={[0.06, 0.015, 0.01]} />
               <meshBasicMaterial color={isPositive ? "#4ade80" : "#f87171"} />
             </mesh>
          ))}
          {/* Connecting line */}
          <mesh rotation={[0,0, isPositive ? 0.5 : -0.5]}>
             <boxGeometry args={[0.4, 0.005, 0.01]} />
             <meshBasicMaterial color={isPositive ? "#4ade80" : "#f87171"} opacity={0.5} transparent />
          </mesh>
       </group>
    </group>
  );
}

// Floating Ticker Coin Component
interface FloatingTickerProps {
  position: [number, number, number];
  rotation: [number, number, number];
  symbol: string;
  color: string;
  delay?: number;
}

function FloatingTicker({ position, rotation, symbol, color, delay = 0 }: FloatingTickerProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = rotation[0] + state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = rotation[1] + state.clock.elapsedTime * 0.3;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5 + delay) * 0.2;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <group position={position} rotation={[Math.PI / 2, 0, 0]}>
        {/* Coin Shape */}
        <mesh ref={meshRef}>
          <cylinderGeometry args={[0.6, 0.6, 0.1, 32]} />
          <MeshTransmissionMaterial
            transmission={0.95}
            roughness={0.1}
            thickness={0.5}
            ior={1.5}
            chromaticAberration={0.04}
            color={color}
            transparent
            opacity={0.8}
          />
        </mesh>
        
        {/* Text on Front */}
        <Text 
          position={[0, 0.1, 0]} 
          rotation={[-Math.PI / 2, 0, 0]} 
          fontSize={0.35} 
          color="white" 
          anchorX="center" 
          anchorY="middle"
          fontWeight="bold"
        >
          {symbol}
        </Text>
        
        {/* Text on Back (Reverse) */}
        <Text 
          position={[0, -0.1, 0]} 
          rotation={[Math.PI / 2, 0, 0]} 
          fontSize={0.35} 
          color="white" 
          anchorX="center" 
          anchorY="middle"
          fontWeight="bold"
        >
          {symbol}
        </Text>
      </group>
    </Float>
  );
}


// 3D Dashboard Scene
function DashboardScene() {
  // Chart points
  const linePoints1 = useMemo(() => [
    new THREE.Vector3(-0.4, -0.1, 0),
    new THREE.Vector3(-0.2, 0.1, 0),
    new THREE.Vector3(0, -0.05, 0),
    new THREE.Vector3(0.2, 0.15, 0),
    new THREE.Vector3(0.4, 0.2, 0),
  ], []);

  const linePoints2 = useMemo(() => [
    new THREE.Vector3(-0.4, 0.2, 0),
    new THREE.Vector3(-0.2, 0, 0),
    new THREE.Vector3(0, 0.1, 0),
    new THREE.Vector3(0.2, -0.1, 0),
    new THREE.Vector3(0.4, 0.05, 0),
  ], []);

  const linePoints4 = useMemo(() => [
    new THREE.Vector3(-0.35, 0.1, 0),
    new THREE.Vector3(0, -0.15, 0),
    new THREE.Vector3(0.35, 0.1, 0),
  ], []);

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
      <pointLight position={[-5, 5, 5]} intensity={1} color="#22D3EE" />
      <pointLight position={[5, -5, 5]} intensity={1} color="#A855F7" />

      <group rotation={[0.1, -0.3, 0]}>
        {/* Floating Tickers - Coins/Logos */}
        {/* Gold (XAU) */}
        <FloatingTicker position={[-3.5, 2, -2]} rotation={[0.5, 0, 0]} symbol="Au" color="#FFD700" delay={0} />
        {/* Tesla (TSLA) */}
        <FloatingTicker position={[3.5, -2, -1]} rotation={[-0.5, 0.5, 0]} symbol="TSLA" color="#E31937" delay={1} />
        {/* Bitcoin (BTC) */}
        <FloatingTicker position={[4, 2, -3]} rotation={[0, 0, 0.5]} symbol="₿" color="#F7931A" delay={2} />

        {/* Main Central Panel */}
        <DashboardPanel 
          position={[0, 0, 0]} 
          rotation={[0, 0, 0]} 
          scale={[4, 3, 1]}
          color="#4338CA"
          delay={0}
        >
          <group scale={[0.8, 0.8, 1]}>
             <ChartLine points={linePoints1} color="#22D3EE" />
             {/* Simple accent circles */}
             <mesh position={[0.4, 0.2, 0]}>
               <sphereGeometry args={[0.05]} />
               <meshBasicMaterial color="#22D3EE" />
             </mesh>
             <mesh position={[-0.4, -0.1, 0]}>
               <sphereGeometry args={[0.03]} />
               <meshBasicMaterial color="#22D3EE" opacity={0.5} transparent />
             </mesh>
          </group>
        </DashboardPanel>
        
        {/* Side Panel Left - Forex Card */}
        <DashboardPanel 
          position={[-2.8, 1.2, 1]} 
          rotation={[0, 0.3, 0]} 
          scale={[2, 1.5, 1]}
          color="#6366F1"
          delay={1}
        >
          <group scale={[1.2, 1.2, 1]}>
             <ForexCard pair="EUR/USD" price="1.0845" change="+0.45%" isPositive={true} />
          </group>
        </DashboardPanel>
        
        {/* Side Panel Right */}
        <DashboardPanel 
          position={[3.2, -1.2, 0.5]} 
          rotation={[0, -0.2, 0]} 
          scale={[2.5, 1.8, 1]}
          color="#8B5CF6"
          delay={2}
        >
           <group scale={[1, 1, 1]}>
             <ChartLine points={linePoints2} color="#F472B6" />
           </group>
        </DashboardPanel>

        {/* New Extra Panel 1 (Top Right) - Forex Card */}
        <DashboardPanel 
          position={[2.5, 2.0, -1]} 
          rotation={[0.1, -0.1, 0]} 
          scale={[1.8, 1.2, 1]}
          color="#EC4899"
          delay={3}
        >
           <group scale={[1, 1, 1]}>
             <ForexCard pair="GBP/JPY" price="182.40" change="-0.12%" isPositive={false} />
           </group>
        </DashboardPanel>

        {/* New Extra Panel 2 (Bottom Left) */}
        <DashboardPanel 
          position={[-3.0, -1.8, 0]} 
          rotation={[-0.1, 0.2, 0]} 
          scale={[2.0, 1.4, 1]}
          color="#06B6D4"
          delay={4}
        >
           <group scale={[0.9, 0.9, 1]}>
             <ChartLine points={linePoints4} color="white" />
           </group>
        </DashboardPanel>
      </group>
    </>
  );
}

// Main Hero Component
export default function HeroClone() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden pt-24">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Canvas
          camera={{ position: [0, 0, 7], fov: 45 }}
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
            <DashboardScene />
          </Suspense>
        </Canvas>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 section-container flex flex-col items-center justify-center min-h-screen text-center pointer-events-none">
        <motion.div
           initial={{ opacity: 0, y: 40 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, delay: 0.4 }}
           className="max-w-5xl pointer-events-auto"
        >
          {/* Enhanced Title */}
          <h1 className="heading-xl text-white mb-8 drop-shadow-2xl">
            Speed, Transparency and Scale for Sophisticated Investors™
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-6 mt-12 pointer-events-auto"
        >
          {/* Improved Visibility Buttons */}
          <button className="px-10 py-4 bg-white text-[#2E21DE] text-lg font-bold rounded-full hover:bg-gray-50 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_25px_rgba(255,255,255,0.4)] hover:-translate-y-0.5 min-w-[180px]">
            Get Started
          </button>
          <button className="px-10 py-4 text-white text-lg font-bold rounded-full border-2 border-white/30 hover:bg-white/10 transition-all hover:-translate-y-0.5 hover:border-white/60 backdrop-blur-sm min-w-[180px]">
            Learn More
          </button>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#2E21DE] to-transparent z-10" />
    </section>
  );
}

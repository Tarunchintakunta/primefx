"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial } from "@react-three/drei";
import { useRef, Suspense } from "react";
import { motion } from "framer-motion";
import * as THREE from "three";

// Glass Sheet Component
function GlassSheet({
  position,
  rotation,
  index,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  index: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  // Gentle rotation animation
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.3 + index) * 0.1;
      meshRef.current.rotation.x =
        Math.cos(state.clock.elapsedTime * 0.2 + index) * 0.05;
    }
  });

  return (
    <Float
      speed={1.5}
      rotationIntensity={0.3}
      floatIntensity={0.5}
      floatingRange={[-0.1, 0.1]}
    >
      <mesh ref={meshRef} position={position} rotation={rotation}>
        <boxGeometry args={[3, 4, 0.1]} />
        <MeshTransmissionMaterial
          transmission={1.0}
          roughness={0.1}
          thickness={2.0}
          ior={1.5}
          chromaticAberration={0.05}
          backside={true}
          color="#8b5cf6"
          transparent={true}
          opacity={0.8}
        />
      </mesh>
    </Float>
  );
}


// 3D Scene
function Scene() {
  return (
    <>
      {/* Ambient lighting */}
      <ambientLight intensity={0.5} />

      {/* Directional lights for glass reflections */}
      <directionalLight position={[10, 10, 5]} intensity={1} color="#8b5cf6" />
      <directionalLight
        position={[-10, -10, -5]}
        intensity={0.5}
        color="#3b82f6"
      />

      {/* Point lights for dramatic effect */}
      <pointLight position={[0, 5, 5]} intensity={1} color="#a78bfa" />
      <pointLight position={[0, -5, -5]} intensity={0.5} color="#60a5fa" />

      {/* Glass Sheets */}
      <GlassSheet position={[-2, 0, 0]} rotation={[0, 0.3, 0]} index={0} />
      <GlassSheet position={[0, 0.5, -1]} rotation={[0, -0.2, 0]} index={1} />
      <GlassSheet position={[2, -0.3, 0.5]} rotation={[0, 0.5, 0]} index={2} />

      {/* Optional: Add orbit controls for development (remove in production) */}
      {/* <OrbitControls enableZoom={false} enablePan={false} /> */}
    </>
  );
}



// Main Hero3D Component
export default function Hero3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden"
    >
      {/* 3D Canvas */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 50 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
          }}
          dpr={[1, 2]}
        >
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </div>

      {/* Hero Content Overlay */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="section-container text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <h1 className="gradient-text mb-6 text-balance">
              Institutional-Grade
              <br />
              Forex Liquidity
            </h1>
          </motion.div>

          <motion.p
            className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto text-balance"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            Access deep liquidity pools with razor-thin spreads. Trade with
            leverage up to 1:500 on MT5 and cTrader platforms.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <button className="btn-premium text-white">
              Open Live Account
            </button>
            <button className="btn-premium text-white">Try Demo</button>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <div className="glass-card p-6 rounded-2xl">
              <div className="text-4xl font-bold gradient-text mb-2">0.0</div>
              <div className="text-gray-400">Pip Spreads</div>
            </div>
            <div className="glass-card p-6 rounded-2xl">
              <div className="text-4xl font-bold gradient-text mb-2">1:500</div>
              <div className="text-gray-400">Max Leverage</div>
            </div>
            <div className="glass-card p-6 rounded-2xl">
              <div className="text-4xl font-bold gradient-text mb-2">
                &lt;10ms
              </div>
              <div className="text-gray-400">Execution Speed</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Gradient Overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50 pointer-events-none z-5" />
    </section>
  );
}

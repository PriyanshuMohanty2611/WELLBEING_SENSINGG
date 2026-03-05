import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float, ContactShadows, PresentationControls } from '@react-three/drei';
import * as THREE from 'three';

const AvatarModel = ({ health }) => {
  const meshRef = useRef();
  const { stress_score = 30, energy_score = 70 } = health || {};

  // Color mapping based on stress
  const color = useMemo(() => {
    if (stress_score > 70) return "#ff2d55"; // Red for high stress
    if (stress_score > 40) return "#ffcc00"; // Yellow for moderate
    return "#00f2ff"; // Cyber Cyan for calm
  }, [stress_score]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      // Get material direct access
      const material = meshRef.current.material;
      if (material) {
        material.distort = 0.3 + (stress_score / 200);
        material.speed = 2 + (stress_score / 50);
      }
      
      // Pulse animation on the mesh itself
      const scale = 1.5 + (Math.sin(t * 2) * 0.05); // Base scale 1.5
      meshRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <Sphere ref={meshRef} args={[1, 100, 100]} scale={1.5}>
          <MeshDistortMaterial
            color={color}
            roughness={0.1}
            metalness={1}
            distort={0.4}
            speed={2}
          />
        </Sphere>
      </Float>
      
      {/* Particle Ring around Avatar */}
      <ParticleRing color={color} count={stress_score > 60 ? 200 : 100} />
    </group>
  );
};

const ParticleRing = ({ count = 100, color }) => {
  const points = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 2.2 + Math.random() * 0.5;
      p[i * 3] = Math.cos(angle) * radius;
      p[i * 3 + 1] = (Math.random() - 0.5) * 2;
      p[i * 3 + 2] = Math.sin(angle) * radius;
    }
    return p;
  }, [count]);

  const ref = useRef();
  useFrame((state) => {
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.5;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={points} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color={color} transparent opacity={0.6} sizeAttenuation />
    </points>
  );
};

const DigitalTwin = ({ health }) => {
  return (
    <div className="w-full h-96 relative cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        <pointLight position={[-10, -10, -10]} color="red" />
        
        <PresentationControls global config={{ mass: 2, tension: 500 }} snap={{ mass: 4, tension: 1500 }} rotation={[0, 0.3, 0]} polar={[-Math.PI / 3, Math.PI / 3]} azimuth={[-Math.PI / 1.4, Math.PI / 1.4]}>
          <AvatarModel health={health} />
        </PresentationControls>
        
        <ContactShadows position={[0, -2.5, 0]} opacity={0.4} scale={10} blur={2} far={4.5} />
      </Canvas>
    </div>
  );
};

export default DigitalTwin;

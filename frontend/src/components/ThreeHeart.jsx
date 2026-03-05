import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, GradientTexture, MeshWobbleMaterial } from '@react-three/drei';
import * as THREE from 'three';

const HeartShape = ({ bpm = 72, stress = 30 }) => {
  const meshRef = useRef();
  const wireRef = useRef();
  
  const heartShape = useMemo(() => {
    const shape = new THREE.Shape();
    const x = -0.5, y = -0.5;
    shape.moveTo(x + 0.5, y + 0.5);
    shape.bezierCurveTo(x + 0.5, y + 0.5, x + 0.4, y, x, y);
    shape.bezierCurveTo(x - 0.6, y, x - 0.6, y + 0.7, x - 0.6, y + 0.7);
    shape.bezierCurveTo(x - 0.6, y + 1.1, x - 0.3, y + 1.54, x + 0.5, y + 1.9);
    shape.bezierCurveTo(x + 1.2, y + 1.54, x + 1.6, y + 1.1, x + 1.6, y + 0.7);
    shape.bezierCurveTo(x + 1.6, y + 0.7, x + 1.6, y, x + 1, y);
    shape.bezierCurveTo(x + 0.7, y, x + 0.5, y + 0.5, x + 0.5, y + 0.5);
    return shape;
  }, []);

  const extrudeSettings = {
    depth: 0.4, bevelEnabled: true, bevelSegments: 3, steps: 2, bevelSize: 0.1, bevelThickness: 0.1,
  };

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const pulseFreq = (bpm / 60) * 2; // Beats per second * multiplier
    if (meshRef.current) {
      const scale = 1 + Math.sin(time * pulseFreq * Math.PI) * 0.1;
      meshRef.current.scale.set(scale, scale, scale);
      meshRef.current.rotation.y = Math.sin(time * 0.2) * 0.1;
      wireRef.current.scale.set(scale * 1.05, scale * 1.05, scale * 1.05);
      wireRef.current.rotation.y = meshRef.current.rotation.y;
    }
  });

  const mainColor = stress > 60 ? "#ff2d55" : "#00f2ff";

  return (
    <group rotation={[0, 0, Math.PI]}>
      <mesh ref={meshRef}>
        <extrudeGeometry args={[heartShape, extrudeSettings]} />
        <MeshDistortMaterial
          color={mainColor}
          speed={2}
          distort={0.2}
          radius={1}
          emissive={mainColor}
          emissiveIntensity={0.5}
        />
      </mesh>
      <mesh ref={wireRef}>
        <extrudeGeometry args={[heartShape, extrudeSettings]} />
        <meshBasicMaterial color={mainColor} wireframe transparent opacity={0.2} />
      </mesh>
    </group>
  );
};

const Particles = ({ count = 50 }) => {
  const points = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 10;
      p[i * 3 + 1] = (Math.random() - 0.5) * 10;
      p[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return p;
  }, [count]);

  const pointsRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    pointsRef.current.rotation.y = time * 0.1;
    pointsRef.current.rotation.z = time * 0.05;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={points}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#ff2d55"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

const ThreeHeart = ({ animate = true }) => {
  return (
    <div className="w-full h-80 relative">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        
        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
          <HeartShape />
        </Float>
        
        <Particles count={100} />
      </Canvas>
    </div>
  );
};

export default ThreeHeart;

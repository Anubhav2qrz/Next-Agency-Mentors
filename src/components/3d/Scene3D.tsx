import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Box, Torus, Text3D, Environment } from '@react-three/drei';
import * as THREE from 'three';

function FloatingGeometry() {
  const meshRef = useRef<THREE.Mesh>(null);
  const torusRef = useRef<THREE.Mesh>(null);
  const sphereRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.3;
    }
    if (torusRef.current) {
      torusRef.current.rotation.x += 0.005;
      torusRef.current.rotation.z += 0.01;
      torusRef.current.position.x = Math.cos(state.clock.elapsedTime * 0.5) * 2;
    }
    if (sphereRef.current) {
      sphereRef.current.position.y = Math.cos(state.clock.elapsedTime * 0.7) * 0.5;
      sphereRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.3) * 1.5;
    }
  });

  return (
    <>
      {/* Central rotating cube */}
      <Box ref={meshRef} args={[1, 1, 1]} position={[0, 0, 0]}>
        <meshStandardMaterial 
          color="#00ffff" 
          emissive="#00ffff"
          emissiveIntensity={0.2}
          wireframe
        />
      </Box>

      {/* Floating torus */}
      <Torus ref={torusRef} args={[0.8, 0.3, 16, 32]} position={[2, 1, -1]}>
        <meshStandardMaterial 
          color="#bf00ff" 
          emissive="#bf00ff"
          emissiveIntensity={0.3}
        />
      </Torus>

      {/* Floating sphere */}
      <Sphere ref={sphereRef} args={[0.5]} position={[-2, 0.5, 1]}>
        <meshStandardMaterial 
          color="#ff1493" 
          emissive="#ff1493"
          emissiveIntensity={0.2}
          transparent
          opacity={0.8}
        />
      </Sphere>

      {/* Additional geometric shapes */}
      <Box args={[0.5, 0.5, 0.5]} position={[3, -1, 2]}>
        <meshStandardMaterial 
          color="#4169e1" 
          emissive="#4169e1"
          emissiveIntensity={0.1}
        />
      </Box>

      <Torus args={[0.4, 0.1, 8, 16]} position={[-3, 1.5, -2]} rotation={[Math.PI / 4, 0, 0]}>
        <meshStandardMaterial 
          color="#00ffff" 
          emissive="#00ffff"
          emissiveIntensity={0.2}
        />
      </Torus>
    </>
  );
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00ffff" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#bf00ff" />
      <spotLight
        position={[0, 10, 0]}
        angle={0.15}
        penumbra={1}
        intensity={1}
        color="#ffffff"
      />
    </>
  );
}

interface Scene3DProps {
  className?: string;
}

export function Scene3D({ className = "" }: Scene3DProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [5, 5, 5], fov: 60 }}
        className="bg-transparent"
      >
        <Suspense fallback={null}>
          <Lights />
          <FloatingGeometry />
          <Environment preset="night" />
          <OrbitControls 
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.5}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 4}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
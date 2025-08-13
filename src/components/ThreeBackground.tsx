
import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense, useRef } from 'react';
import { Mesh, Vector3 } from 'three';
import { OrbitControls } from '@react-three/drei';

const FloatingGeometry = ({ position, color, speed }: { position: [number, number, number], color: string, speed: number }) => {
  const meshRef = useRef<Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += speed;
      meshRef.current.rotation.y += speed * 0.8;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.5;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <dodecahedronGeometry args={[0.8, 0]} />
      <meshStandardMaterial 
        color={color} 
        wireframe={Math.random() > 0.5}
        transparent
        opacity={0.7}
        emissive={color}
        emissiveIntensity={0.1}
      />
    </mesh>
  );
};

const Scene = () => {
  const groupRef = useRef<any>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002;
    }
  });

  const geometries = Array.from({ length: 8 }, (_, i) => ({
    position: [
      (Math.random() - 0.5) * 15,
      (Math.random() - 0.5) * 15,
      (Math.random() - 0.5) * 15
    ] as [number, number, number],
    color: ['#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#ec4899'][Math.floor(Math.random() * 6)],
    speed: 0.01 + Math.random() * 0.02
  }));

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} color="#8b5cf6" intensity={0.8} />
      <pointLight position={[-10, -10, -10]} color="#06b6d4" intensity={0.6} />
      <pointLight position={[0, 10, -10]} color="#10b981" intensity={0.4} />
      
      {geometries.map((geom, index) => (
        <FloatingGeometry
          key={index}
          position={geom.position}
          color={geom.color}
          speed={geom.speed}
        />
      ))}
    </group>
  );
};

const ThreeBackground = () => {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ 
          position: [0, 0, 12], 
          fov: 60,
          near: 0.1,
          far: 1000
        }}
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
        style={{ background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a3e 50%, #2d1b69 100%)' }}
      >
        <Suspense fallback={null}>
          <Scene />
          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            autoRotate 
            autoRotateSpeed={0.3}
            enableDamping
            dampingFactor={0.05}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ThreeBackground;

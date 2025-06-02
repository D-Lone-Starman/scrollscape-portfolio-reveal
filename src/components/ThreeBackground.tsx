
import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense, useRef } from 'react';
import { Mesh, Vector3 } from 'three';
import { OrbitControls } from '@react-three/drei';

const FloatingGeometry = ({ position, color, speed }: { position: Vector3, color: string, speed: number }) => {
  const meshRef = useRef<Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += speed;
      meshRef.current.rotation.y += speed * 0.8;
      meshRef.current.position.y += Math.sin(state.clock.elapsedTime * speed) * 0.01;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <dodecahedronGeometry args={[0.5, 0]} />
      <meshStandardMaterial 
        color={color} 
        wireframe={Math.random() > 0.5}
        transparent
        opacity={0.6}
      />
    </mesh>
  );
};

const Scene = () => {
  const groupRef = useRef<any>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001;
    }
  });

  const geometries = Array.from({ length: 12 }, (_, i) => ({
    position: new Vector3(
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 20
    ),
    color: ['#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'][Math.floor(Math.random() * 5)],
    speed: 0.005 + Math.random() * 0.01
  }));

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} color="#8b5cf6" intensity={1} />
      <pointLight position={[-10, -10, -10]} color="#06b6d4" intensity={0.5} />
      
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
        camera={{ position: [0, 0, 10], fov: 75 }}
        style={{ background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a3e 50%, #2d1b69 100%)' }}
      >
        <Suspense fallback={null}>
          <Scene />
          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            autoRotate 
            autoRotateSpeed={0.5}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ThreeBackground;


import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense, useRef } from 'react';
import { Mesh, Vector3 } from 'three';
import { OrbitControls } from '@react-three/drei';

const FloatingGeometry = ({ position, color, speed, geometryType }: { 
  position: [number, number, number], 
  color: string, 
  speed: number,
  geometryType: string 
}) => {
  const meshRef = useRef<Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += speed;
      meshRef.current.rotation.y += speed * 0.8;
      meshRef.current.rotation.z += speed * 0.5;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.5;
    }
  });

  const renderGeometry = () => {
    const size = 0.6 + Math.random() * 0.4;
    switch (geometryType) {
      case 'cube':
        return <boxGeometry args={[size, size, size]} />;
      case 'pyramid':
        return <coneGeometry args={[size, size * 1.5, 4]} />;
      case 'octahedron':
        return <octahedronGeometry args={[size, 0]} />;
      case 'icosahedron':
        return <icosahedronGeometry args={[size, 0]} />;
      case 'dodecahedron':
      default:
        return <dodecahedronGeometry args={[size, 0]} />;
    }
  };

  return (
    <mesh ref={meshRef} position={position}>
      {renderGeometry()}
      <meshStandardMaterial 
        color={color} 
        wireframe={Math.random() > 0.6}
        transparent
        opacity={0.7}
        emissive={color}
        emissiveIntensity={0.1}
        metalness={0.3}
        roughness={0.4}
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

  const geometryTypes = ['cube', 'pyramid', 'octahedron', 'icosahedron', 'dodecahedron'];
  const colors = ['#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#ec4899', '#3b82f6', '#f97316'];

  const geometries = Array.from({ length: 15 }, (_, i) => ({
    position: [
      (Math.random() - 0.5) * 18,
      (Math.random() - 0.5) * 18,
      (Math.random() - 0.5) * 18
    ] as [number, number, number],
    color: colors[Math.floor(Math.random() * colors.length)],
    speed: 0.008 + Math.random() * 0.015,
    geometryType: geometryTypes[Math.floor(Math.random() * geometryTypes.length)]
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
          geometryType={geom.geometryType}
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

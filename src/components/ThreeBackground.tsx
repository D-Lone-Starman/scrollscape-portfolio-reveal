
import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense, useRef, useMemo } from 'react';
import { Mesh } from 'three';
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

  const { geometry, wireframe } = useMemo(() => {
    const size = 0.6 + (position[0] + position[1] + position[2]) * 0.1; // Deterministic size based on position
    const isWireframe = (position[0] + position[1]) % 2 > 0.6; // Deterministic wireframe
    
    switch (geometryType) {
      case 'cube':
        return { 
          geometry: <boxGeometry args={[size, size, size]} />,
          wireframe: isWireframe
        };
      case 'pyramid':
        return { 
          geometry: <coneGeometry args={[size, size * 1.5, 4]} />,
          wireframe: isWireframe
        };
      case 'octahedron':
        return { 
          geometry: <octahedronGeometry args={[size, 0]} />,
          wireframe: isWireframe
        };
      case 'icosahedron':
        return { 
          geometry: <icosahedronGeometry args={[size, 0]} />,
          wireframe: isWireframe
        };
      case 'dodecahedron':
      default:
        return { 
          geometry: <dodecahedronGeometry args={[size, 0]} />,
          wireframe: isWireframe
        };
    }
  }, [geometryType, position]);

  return (
    <mesh ref={meshRef} position={position}>
      {geometry}
      <meshStandardMaterial 
        color={color} 
        wireframe={wireframe}
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

  const geometries = useMemo(() => {
    const geometryTypes = ['cube', 'pyramid', 'octahedron', 'icosahedron', 'dodecahedron'];
    const colors = ['#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#ec4899', '#3b82f6', '#f97316'];
    
    return Array.from({ length: 15 }, (_, i) => {
      // Use index-based deterministic "randomness" for consistent results
      const seedX = Math.sin(i * 12.9898) * 43758.5453;
      const seedY = Math.sin(i * 78.233) * 43758.5453;
      const seedZ = Math.sin(i * 39.346) * 43758.5453;
      
      return {
        position: [
          (seedX - Math.floor(seedX) - 0.5) * 18,
          (seedY - Math.floor(seedY) - 0.5) * 18,
          (seedZ - Math.floor(seedZ) - 0.5) * 18
        ] as [number, number, number],
        color: colors[i % colors.length],
        speed: 0.008 + ((i % 10) / 10) * 0.015,
        geometryType: geometryTypes[i % geometryTypes.length]
      };
    });
  }, []);

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
        gl={{ 
          antialias: true,
          alpha: false,
          powerPreference: "high-performance"
        }}
        onCreated={({ gl }) => {
          gl.setClearColor('#0f0f23');
        }}
      >
        <Suspense fallback={
          <div className="flex items-center justify-center h-full">
            <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
          </div>
        }>
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

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

interface ShapeProps {
  shapeType: string;
  wireframe: boolean;
  isDarkMode: boolean;
}

export default function Shape({ shapeType, wireframe, isDarkMode }: ShapeProps) {
  const meshRef = useRef<Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.005;
      meshRef.current.rotation.y += 0.005;
    }
  });

  const getGeometry = () => {
    switch (shapeType) {
      case 'sphere':
        return <sphereGeometry args={[1, 32, 32]} />;
      case 'torus':
        return <torusGeometry args={[1, 0.4, 32, 64]} />;
      case 'torusKnot':
        return <torusKnotGeometry args={[1, 0.4, 128, 16]} />;
      case 'octahedron':
        return <octahedronGeometry args={[1]} />;
      default:
        return <boxGeometry args={[1, 1, 1]} />;
    }
  };

  const mainColor = isDarkMode ? '#4287f5' : '#2563eb';
  const wireframeColor = isDarkMode ? '#00ff88' : '#10b981';

  return (
    <group>
      {/* Solid shape */}
      <mesh ref={meshRef}>
        {getGeometry()}
        <meshStandardMaterial
          color={mainColor}
          roughness={0.2}
          metalness={0.8}
          wireframe={wireframe}
          transparent={true}
          opacity={wireframe ? 0.3 : 1}
        />
      </mesh>
      
      {/* Wireframe overlay */}
      {wireframe && (
        <mesh ref={meshRef}>
          {getGeometry()}
          <meshBasicMaterial
            color={wireframeColor}
            wireframe={true}
            transparent={true}
            opacity={isDarkMode ? 0.2 : 0.4}
          />
        </mesh>
      )}
    </group>
  );
} 
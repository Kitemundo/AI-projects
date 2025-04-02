import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

interface ShapeProps {
  shapeType: string;
  wireframe: boolean;
  isDarkMode: boolean;
  customColor?: string;
}

export default function Shape({ shapeType, wireframe, isDarkMode, customColor }: ShapeProps) {
  const meshRef = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      switch (shapeType) {
        case 'torusKnot':
          // Complex rotation for torusKnot
          meshRef.current.rotation.x += 0.003;
          meshRef.current.rotation.y += 0.005;
          meshRef.current.rotation.z += 0.002;
          break;
        case 'sphere':
          // Smooth, gentle rotation for sphere
          meshRef.current.rotation.x += 0.002;
          meshRef.current.rotation.y += 0.003;
          break;
        case 'icosahedron':
          // Fast rotation for icosahedron
          meshRef.current.rotation.x += 0.006;
          meshRef.current.rotation.y += 0.004;
          break;
        case 'dodecahedron':
          // Alternating rotation for dodecahedron
          meshRef.current.rotation.x += Math.sin(state.clock.elapsedTime) * 0.003;
          meshRef.current.rotation.y += Math.cos(state.clock.elapsedTime) * 0.003;
          break;
        case 'capsule':
          // Tumbling rotation for capsule
          meshRef.current.rotation.x += 0.004;
          meshRef.current.rotation.z += 0.003;
          break;
        default:
          // Default rotation for other shapes
          meshRef.current.rotation.x += 0.005;
          meshRef.current.rotation.y += 0.005;
      }
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
      case 'icosahedron':
        return <icosahedronGeometry args={[1]} />;
      case 'dodecahedron':
        return <dodecahedronGeometry args={[1]} />;
      case 'cone':
        return <coneGeometry args={[0.5, 2, 32]} />;
      case 'cylinder':
        return <cylinderGeometry args={[0.5, 0.5, 2, 32]} />;
      case 'capsule':
        return <capsuleGeometry args={[0.5, 1, 4, 8]} />;
      default:
        return <boxGeometry args={[1, 1, 1]} />;
    }
  };

  const mainColor = customColor || (isDarkMode ? '#4287f5' : '#2563eb');
  const wireframeColor = isDarkMode ? '#00ff88' : '#10b981';

  return (
    <group>
      {/* Solid shape */}
      <mesh ref={meshRef}>
        {getGeometry()}
        <meshStandardMaterial
          color={mainColor}
          roughness={isDarkMode ? 0.2 : 0.3}
          metalness={isDarkMode ? 0.8 : 0.6}
          wireframe={wireframe}
          transparent={true}
          opacity={wireframe ? (isDarkMode ? 0.3 : 0.4) : 1}
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
            opacity={isDarkMode ? 0.2 : 0.3}
          />
        </mesh>
      )}
    </group>
  );
} 
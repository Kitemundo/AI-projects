import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';
import * as THREE from 'three';

interface ShapeProps {
  shapeType: string;
  wireframe: boolean;
  isDarkMode: boolean;
  customColor?: string;
}

// Define a simple shape for ExtrudeGeometry
const extrudeShape = new THREE.Shape();
const x = -1, y = -1;
extrudeShape.moveTo(x + 0.5, y + 0.5);
extrudeShape.bezierCurveTo(x + 0.5, y + 0.5, x + 0.4, y, x, y);
extrudeShape.bezierCurveTo(x - 0.6, y, x - 0.6, y + 0.7, x - 0.6, y + 0.7);
extrudeShape.bezierCurveTo(x - 0.6, y + 1.1, x - 0.3, y + 1.54, x + 0.5, y + 1.9);
extrudeShape.bezierCurveTo(x + 1.2, y + 1.54, x + 1.6, y + 1.1, x + 1.6, y + 0.7);
extrudeShape.bezierCurveTo(x + 1.6, y + 0.7, x + 1.6, y, x + 1.0, y);
extrudeShape.bezierCurveTo(x + 0.7, y, x + 0.5, y + 0.5, x + 0.5, y + 0.5);

const extrudeSettings = {
  steps: 2,
  depth: 0.5,
  bevelEnabled: true,
  bevelThickness: 0.1,
  bevelSize: 0.1,
  bevelOffset: 0,
  bevelSegments: 1
};

// Define points for LatheGeometry
const lathePoints = [];
for (let i = 0; i < 10; i++) {
  lathePoints.push(new THREE.Vector2(Math.sin(i * 0.2) * 0.5 + 0.5, (i - 5) * 0.2));
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
        // Adjusted cone args slightly for better default appearance
        return <coneGeometry args={[1, 1.5, 32]} />;
      case 'cylinder':
        // Adjusted cylinder args slightly
        return <cylinderGeometry args={[0.7, 0.7, 1.5, 32]} />;
      case 'capsule':
        return <capsuleGeometry args={[0.5, 1, 4, 8]} />;
      // --- New Shapes ---
      case 'plane':
        return <planeGeometry args={[2, 2]} />; // Simple 2x2 plane
      case 'circle':
        return <circleGeometry args={[1, 32]} />; // Circle with radius 1
      case 'ring':
        return <ringGeometry args={[0.5, 1, 32]} />; // Ring with inner/outer radius
      case 'tetrahedron':
        return <tetrahedronGeometry args={[1]} />; // Tetrahedron with radius 1
      case 'lathe':
        return <latheGeometry args={[lathePoints]} />; // Use predefined points
      case 'extrude':
        return <extrudeGeometry args={[extrudeShape, extrudeSettings]} />; // Use predefined shape/settings
      // --- End New Shapes ---
      default: // cube
        return <boxGeometry args={[1.5, 1.5, 1.5]} />; // Slightly larger box
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
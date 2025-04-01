import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Shape from './Shape';

interface SceneProps {
  selectedShape: string;
  wireframe: boolean;
  isDarkMode: boolean;
}

export default function Scene({ selectedShape, wireframe, isDarkMode }: SceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5] }}
      style={{ width: '100%', height: '100vh' }}
    >
      <color attach="background" args={[isDarkMode ? '#1a1a1a' : '#ffffff']} />
      <ambientLight intensity={isDarkMode ? 0.5 : 0.7} />
      <pointLight position={[10, 10, 10]} intensity={isDarkMode ? 1 : 1.2} />
      <Shape 
        shapeType={selectedShape} 
        wireframe={wireframe} 
        isDarkMode={isDarkMode}
      />
      <OrbitControls enableZoom={true} autoRotate autoRotateSpeed={2} />
    </Canvas>
  );
} 
'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the Scene component with no SSR
const Scene = dynamic(() => import('./components/Scene'), { ssr: false });

export default function Home() {
  const [selectedShape, setSelectedShape] = useState('cube');
  const [wireframe, setWireframe] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const shapes = ['cube', 'sphere', 'torus', 'torusKnot', 'octahedron'];

  return (
    <main className="min-h-screen flex flex-col">
      <div className="fixed top-4 left-4 z-10 flex gap-4 items-center">
        <select
          value={selectedShape}
          onChange={(e) => setSelectedShape(e.target.value)}
          className="px-4 py-2 rounded-md bg-white text-black border border-gray-300"
        >
          {shapes.map((shape) => (
            <option key={shape} value={shape}>
              {shape.charAt(0).toUpperCase() + shape.slice(1)}
            </option>
          ))}
        </select>
        <label className={`flex items-center gap-2 ${isDarkMode ? 'text-white bg-black' : 'text-black bg-white'} bg-opacity-50 px-4 py-2 rounded-md`}>
          <input
            type="checkbox"
            checked={wireframe}
            onChange={(e) => setWireframe(e.target.checked)}
            className="w-4 h-4"
          />
          Wireframe
        </label>
        <label className={`flex items-center gap-2 ${isDarkMode ? 'text-white bg-black' : 'text-black bg-white'} bg-opacity-50 px-4 py-2 rounded-md`}>
          <input
            type="checkbox"
            checked={isDarkMode}
            onChange={(e) => setIsDarkMode(e.target.checked)}
            className="w-4 h-4"
          />
          Dark Mode
        </label>
      </div>
      <div className="flex-1">
        <Scene selectedShape={selectedShape} wireframe={wireframe} isDarkMode={isDarkMode} />
      </div>
    </main>
  );
} 
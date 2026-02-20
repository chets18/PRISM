'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import Viewport from '@/components/Viewport';

type ComponentData = {
  id: string;
  type: string;
  position: [number, number, number];
};

export default function Home() {
  const [components, setComponents] = useState<ComponentData[]>([]);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const handleDrop = (type: string, position: [number, number, number]) => {
    const newComponent: ComponentData = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      position,
    };
    setComponents((prev) => [...prev, newComponent]);
    setSelectedId(newComponent.id);
  };

  const updatePosition = (id: string, newPosition: [number, number, number]) => {
    setComponents(prev => prev.map(c => c.id === id ? { ...c, position: newPosition } : c));
  };

  return (
    <main className={`flex flex-col h-screen overflow-hidden transition-colors duration-200 ${theme === 'dark' ? 'bg-[#121212] text-white' : 'bg-gray-100 text-gray-900'}`}>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar theme={theme} />
        <Viewport
          theme={theme}
          components={components}
          onDrop={handleDrop}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
          updatePosition={updatePosition}
        />
      </div>
    </main>
  );
}
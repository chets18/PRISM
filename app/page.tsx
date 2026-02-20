'use client';

import React, { useState } from 'react';
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

  const handleDrop = (type: string, position: [number, number, number]) => {
    const newComponent: ComponentData = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      position: [
        (Math.random() - 0.5) * 4, // Spread them out slightly
        0.5,
        (Math.random() - 0.5) * 4
      ],
    };
    setComponents((prev) => [...prev, newComponent]);
  };

  return (
    <main className="flex flex-col h-screen overflow-hidden bg-[#121212] text-white">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <Viewport components={components} onDrop={handleDrop} />
      </div>
    </main>
  );
}
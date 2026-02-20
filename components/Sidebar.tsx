'use client';

import React, { useState } from 'react';

const SearchIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
    </svg>
);

const components = [
    { id: 'cube', name: 'Cube', icon: '📦', category: 'Basic' },
    { id: 'sphere', name: 'Sphere', icon: '⚽', category: 'Basic' },
    { id: 'cylinder', name: 'Cylinder', icon: '🔋', category: 'Basic' },
    { id: 'cone', name: 'Cone', icon: '🍦', category: 'Basic' },
    { id: 'torus', name: 'Torus', icon: 'donut', category: 'Basic' },
    { id: 'capsule', name: 'Capsule', icon: '💊', category: 'Basic' },
    { id: 'servo', name: 'Servo Motor', icon: '⚙️', category: 'Robotics' },
    { id: 'sensor', name: 'IR Sensor', icon: '👁️', category: 'Robotics' },
    { id: 'beam', name: 'Structural Beam', icon: '📏', category: 'Robotics' },
    { id: 'hub', name: 'Control Hub', icon: '📟', category: 'Robotics' },
];

interface SidebarProps {
    theme: 'dark' | 'light';
}

export default function Sidebar({ theme }: SidebarProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const isDark = theme === 'dark';

    const filteredComponents = components.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDragStart = (e: React.DragEvent, type: string) => {
        e.dataTransfer.setData('componentType', type);
    };

    const categories = Array.from(new Set(components.map(c => c.category)));

    return (
        <aside className={`w-64 h-[calc(100vh-64px)] flex flex-col z-40 border-r transition-colors duration-200 ${isDark ? 'bg-[#1e1e1e] border-[#333]' : 'bg-gray-50 border-gray-200'}`}>
            <div className={`p-4 border-b ${isDark ? 'border-[#333]' : 'border-gray-200'}`}>
                <div className="relative group">
                    <div className={`absolute inset-y-0 left-3 flex items-center pointer-events-none transition-colors ${isDark ? 'text-gray-500 group-focus-within:text-cyan-400' : 'text-gray-400 group-focus-within:text-cyan-600'}`}>
                        <SearchIcon />
                    </div>
                    <input
                        type="text"
                        placeholder="Search parts..."
                        className={`w-full rounded-md py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 transition-all placeholder:text-gray-600 ${isDark ? 'bg-[#121212] border-[#444] text-gray-200 focus:border-cyan-500/50 focus:ring-cyan-500/20' : 'bg-white border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500/10'}`}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                {categories.map(category => {
                    const catComponents = filteredComponents.filter(c => c.category === category);
                    if (catComponents.length === 0) return null;

                    return (
                        <div key={category} className="mb-6">
                            <h3 className={`text-[10px] font-bold uppercase tracking-widest mb-4 px-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{category}</h3>
                            <div className="grid grid-cols-2 gap-3">
                                {catComponents.map((comp) => (
                                    <div
                                        key={comp.id}
                                        draggable
                                        onDragStart={(e) => handleDragStart(e, comp.id)}
                                        className={`group flex flex-col items-center justify-center p-4 rounded-lg cursor-grab active:cursor-grabbing transition-all shadow-sm border ${isDark ? 'bg-[#252525] border-[#333] hover:bg-[#2a2a2a] hover:border-cyan-500/30' : 'bg-white border-gray-200 hover:bg-gray-50 hover:border-cyan-500/30'}`}
                                    >
                                        <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                                            {comp.id === 'torus' ? '🍩' : comp.icon}
                                        </div>
                                        <span className={`text-[11px] font-medium transition-colors ${isDark ? 'text-gray-400 group-hover:text-gray-200' : 'text-gray-600 group-hover:text-gray-900'}`}>
                                            {comp.name}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}

                {filteredComponents.length === 0 && (
                    <div className="text-center py-10">
                        <span className={`text-xs ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>No components found</span>
                    </div>
                )}
            </div>

            <div className={`p-3 border-t transition-colors ${isDark ? 'bg-[#1a1a1a] border-[#333]' : 'bg-white border-gray-200'}`}>
                <div className="flex items-center justify-between px-2">
                    <span className={`text-[10px] ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{components.length} Components total</span>
                    <div className="flex gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse"></div>
                        <span className={`text-[10px] ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>System Ready</span>
                    </div>
                </div>
            </div>
        </aside>
    );
}

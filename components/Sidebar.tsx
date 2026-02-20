'use client';

import React, { useState } from 'react';

const SearchIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
    </svg>
);

const components = [
    { id: 'cube', name: 'Cube', icon: '📦' },
    { id: 'sphere', name: 'Sphere', icon: '⚽' },
    { id: 'cylinder', name: 'Cylinder', icon: '🔋' },
    { id: 'cone', name: 'Cone', icon: '🍦' },
    { id: 'torus', name: 'Torus', icon: '🍩' },
    { id: 'capsule', name: 'Capsule', icon: '💊' },
];

export default function Sidebar() {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredComponents = components.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDragStart = (e: React.DragEvent, type: string) => {
        e.dataTransfer.setData('componentType', type);
    };

    return (
        <aside className="w-64 h-[calc(100vh-64px)] bg-[#1e1e1e] border-r border-[#333] flex flex-col z-40">
            <div className="p-4 border-b border-[#333]">
                <div className="relative group">
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-500 group-focus-within:text-cyan-400 transition-colors">
                        <SearchIcon />
                    </div>
                    <input
                        type="text"
                        placeholder="Search parts..."
                        className="w-full bg-[#121212] border border-[#444] rounded-md py-2 pl-10 pr-4 text-sm text-gray-200 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all placeholder:text-gray-600"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4 px-1">Basic Components</h3>
                <div className="grid grid-cols-2 gap-3">
                    {filteredComponents.map((comp) => (
                        <div
                            key={comp.id}
                            draggable
                            onDragStart={(e) => handleDragStart(e, comp.id)}
                            className="group flex flex-col items-center justify-center p-4 bg-[#252525] border border-[#333] rounded-lg cursor-grab active:cursor-grabbing hover:bg-[#2a2a2a] hover:border-cyan-500/30 transition-all shadow-lg"
                        >
                            <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                                {comp.icon}
                            </div>
                            <span className="text-[11px] font-medium text-gray-400 group-hover:text-gray-200">
                                {comp.name}
                            </span>
                        </div>
                    ))}
                </div>

                {filteredComponents.length === 0 && (
                    <div className="text-center py-10">
                        <span className="text-xs text-gray-600">No components found</span>
                    </div>
                )}
            </div>

            <div className="p-3 bg-[#1a1a1a] border-t border-[#333]">
                <div className="flex items-center justify-between px-2">
                    <span className="text-[10px] text-gray-500">6 Components total</span>
                    <div className="flex gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse"></div>
                        <span className="text-[10px] text-gray-500">System Ready</span>
                    </div>
                </div>
            </div>
        </aside>
    );
}

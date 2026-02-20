'use client';

import React from 'react';

const BellIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
        <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
);

const SettingsIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-1-1.72v-.51a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
        <circle cx="12" cy="12" r="3" />
    </svg>
);

export default function Navbar() {
    return (
        <nav className="flex items-center justify-between h-16 px-6 bg-[#1a1a1a] border-b border-[#333] text-white shadow-xl z-50">
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-cyan-500 rounded flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" className="w-5 h-5">
                        <path d="M12 2L2 7l10 5 10-5-10-5z" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M2 17l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
                <span className="text-xl font-bold tracking-tight text-white">RoboForge</span>
            </div>

            <div className="hidden md:flex items-center gap-10 text-sm font-medium text-gray-400">
                <a href="#" className="hover:text-cyan-400 transition-colors uppercase tracking-wider">Build</a>
                <a href="#" className="hover:text-cyan-400 transition-colors uppercase tracking-wider">Simulate</a>
                <a href="#" className="hover:text-cyan-400 transition-colors uppercase tracking-wider">Library</a>
                <a href="#" className="hover:text-cyan-400 transition-colors uppercase tracking-wider">Community</a>
            </div>

            <div className="flex items-center gap-5">
                <button className="p-2 hover:bg-[#2a2a2a] text-gray-400 hover:text-white rounded-full transition-colors relative">
                    <BellIcon />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-cyan-500 rounded-full"></span>
                </button>
                <button className="p-2 hover:bg-[#2a2a2a] text-gray-400 hover:text-white rounded-full transition-colors">
                    <SettingsIcon />
                </button>
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-600 to-blue-700 flex items-center justify-center text-xs font-bold border border-white/20 hover:scale-105 cursor-pointer transition-transform">
                    JD
                </div>
            </div>
        </nav>
    );
}

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

const SunIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
);

const MoonIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
);

interface NavbarProps {
    theme: 'dark' | 'light';
    toggleTheme: () => void;
}

export default function Navbar({ theme, toggleTheme }: NavbarProps) {
    const isDark = theme === 'dark';

    return (
        <nav className={`flex items-center justify-between h-16 px-6 border-b transition-colors duration-200 z-50 ${isDark ? 'bg-[#1a1a1a] border-[#333] text-white' : 'bg-white border-gray-200 text-gray-900 shadow-sm'}`}>
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-cyan-500 rounded flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" className="w-5 h-5">
                        <path d="M12 2L2 7l10 5 10-5-10-5z" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M2 17l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
                <span className="text-xl font-bold tracking-tight">RoboForge</span>
            </div>

            <div className={`hidden md:flex items-center gap-10 text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                <a href="#" className="hover:text-cyan-500 transition-colors uppercase tracking-wider">Build</a>
                <a href="#" className="hover:text-cyan-400 transition-colors uppercase tracking-wider">Simulate</a>
                <a href="#" className="hover:text-cyan-400 transition-colors uppercase tracking-wider">Library</a>
                <a href="#" className="hover:text-cyan-400 transition-colors uppercase tracking-wider">Community</a>
            </div>

            <div className="flex items-center gap-4">
                <button
                    onClick={toggleTheme}
                    className={`p-2 rounded-full transition-colors ${isDark ? 'hover:bg-[#2a2a2a] text-gray-400 hover:text-white' : 'hover:bg-gray-100 text-gray-500 hover:text-gray-900'}`}
                >
                    {isDark ? <SunIcon /> : <MoonIcon />}
                </button>

                <button className={`p-2 rounded-full transition-colors relative ${isDark ? 'hover:bg-[#2a2a2a] text-gray-400 hover:text-white' : 'hover:bg-gray-100 text-gray-500 hover:text-gray-900'}`}>
                    <BellIcon />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-cyan-500 rounded-full"></span>
                </button>

                <button className={`p-2 rounded-full transition-colors ${isDark ? 'hover:bg-[#2a2a2a] text-gray-400 hover:text-white' : 'hover:bg-gray-100 text-gray-500 hover:text-gray-900'}`}>
                    <SettingsIcon />
                </button>

                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-600 to-blue-700 flex items-center justify-center text-xs font-bold border border-white/20 hover:scale-105 cursor-pointer transition-transform">
                    JD
                </div>
            </div>
        </nav>
    );
}

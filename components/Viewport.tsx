'use client';

import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, Grid, Environment, ContactShadows, PivotControls, useHelper } from '@react-three/drei';
import * as THREE from 'three';

type ComponentData = {
    id: string;
    type: string;
    position: [number, number, number];
};

interface ViewportProps {
    theme: 'dark' | 'light';
    components: ComponentData[];
    onDrop: (type: string, position: [number, number, number]) => void;
    selectedId: string | null;
    setSelectedId: (id: string | null) => void;
    updatePosition: (id: string, position: [number, number, number]) => void;
}

const Model = ({
    type,
    position,
    isSelected,
    onClick,
    onDragEnd
}: {
    type: string;
    position: [number, number, number];
    isSelected: boolean;
    onClick: (e: any) => void;
    onDragEnd: (newPos: [number, number, number]) => void;
}) => {
    const meshRef = useRef<THREE.Group>(null);

    const renderGeometry = () => {
        const materialColor = isSelected ? "#22d3ee" : "#0891b2";

        switch (type) {
            case 'cube':
                return <mesh castShadow receiveShadow><boxGeometry args={[1, 1, 1]} /><meshStandardMaterial color={materialColor} /></mesh>;
            case 'sphere':
                return <mesh castShadow receiveShadow><sphereGeometry args={[0.5, 32, 32]} /><meshStandardMaterial color={materialColor} /></mesh>;
            case 'cylinder':
                return <mesh castShadow receiveShadow><cylinderGeometry args={[0.5, 0.5, 1, 32]} /><meshStandardMaterial color={materialColor} /></mesh>;
            case 'cone':
                return <mesh castShadow receiveShadow><coneGeometry args={[0.5, 1, 32]} /><meshStandardMaterial color={materialColor} /></mesh>;
            case 'torus':
                return <mesh castShadow receiveShadow><torusGeometry args={[0.5, 0.2, 16, 100]} /><meshStandardMaterial color={materialColor} /></mesh>;
            case 'capsule':
                return <mesh castShadow receiveShadow><capsuleGeometry args={[0.4, 0.8, 4, 18]} /><meshStandardMaterial color={materialColor} /></mesh>;
            case 'servo':
                return (
                    <group>
                        <mesh castShadow receiveShadow position={[0, -0.1, 0]}><boxGeometry args={[0.6, 0.4, 0.6]} /><meshStandardMaterial color={materialColor} /></mesh>
                        <mesh castShadow receiveShadow position={[0, 0.2, 0]}><cylinderGeometry args={[0.2, 0.2, 0.2, 16]} /><meshStandardMaterial color="#333" /></mesh>
                    </group>
                );
            case 'sensor':
                return (
                    <group>
                        <mesh castShadow receiveShadow><boxGeometry args={[0.4, 0.2, 0.1]} /><meshStandardMaterial color="#222" /></mesh>
                        <mesh castShadow receiveShadow position={[-0.1, 0, 0.06]}><sphereGeometry args={[0.04, 8, 8]} /><meshStandardMaterial color="#ff0000" /></mesh>
                        <mesh castShadow receiveShadow position={[0.1, 0, 0.06]}><sphereGeometry args={[0.04, 8, 8]} /><meshStandardMaterial color="#ff0000" /></mesh>
                    </group>
                );
            case 'beam':
                return <mesh castShadow receiveShadow><boxGeometry args={[0.2, 2, 0.2]} /><meshStandardMaterial color="#888" /></mesh>;
            case 'hub':
                return (
                    <group>
                        <mesh castShadow receiveShadow><boxGeometry args={[1, 0.3, 0.8]} /><meshStandardMaterial color="#444" /></mesh>
                        <mesh castShadow receiveShadow position={[0, 0.16, 0]}><boxGeometry args={[0.6, 0.05, 0.4]} /><meshStandardMaterial color="#111" /></mesh>
                    </group>
                );
            default:
                return null;
        }
    };

    return (
        <PivotControls
            active={isSelected}
            anchor={[0, 0, 0]}
            depthTest={false}
            displayValues={false}
            lineWidth={2}
            fixed={false}
            onDragEnd={() => {
                if (meshRef.current) {
                    const worldPos = new THREE.Vector3();
                    meshRef.current.getWorldPosition(worldPos);
                    onDragEnd([worldPos.x, worldPos.y, worldPos.z]);
                }
            }}
        >
            <group
                ref={meshRef}
                position={position}
                onClick={(e) => {
                    e.stopPropagation();
                    onClick(e);
                }}
            >
                {renderGeometry()}
            </group>
        </PivotControls>
    );
};

export default function Viewport({
    theme,
    components,
    onDrop,
    selectedId,
    setSelectedId,
    updatePosition
}: ViewportProps) {
    const isDark = theme === 'dark';

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        const type = e.dataTransfer.getData('componentType');

        // Simplified drop: 0, 0.5, 0
        onDrop(type, [0, 0.5, 0]);
    };

    return (
        <div
            className={`flex-1 relative overflow-hidden transition-colors duration-200 ${isDark ? 'bg-[#121212]' : 'bg-gray-200'}`}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => setSelectedId(null)}
        >
            <Canvas shadows camera={{ position: [5, 5, 5], fov: 50 }}>
                <color attach="background" args={[isDark ? '#121212' : '#e5e7eb']} />

                <Suspense fallback={null}>
                    <ambientLight intensity={isDark ? 0.5 : 0.8} />
                    <pointLight position={[10, 10, 10]} intensity={isDark ? 1.5 : 2} castShadow />
                    <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />

                    <Grid
                        infiniteGrid
                        fadeDistance={50}
                        fadeStrength={3}
                        cellSize={1}
                        sectionSize={5}
                        sectionColor={isDark ? "#333" : "#bbb"}
                        cellColor={isDark ? "#222" : "#ccc"}
                    />

                    {components.map((comp) => (
                        <Model
                            key={comp.id}
                            type={comp.type}
                            position={comp.position}
                            isSelected={selectedId === comp.id}
                            onClick={() => setSelectedId(comp.id)}
                            onDragEnd={(newPos) => updatePosition(comp.id, newPos)}
                        />
                    ))}

                    <ContactShadows position={[0, -0.01, 0]} opacity={isDark ? 0.4 : 0.2} scale={20} blur={2.4} far={4.5} />
                    <Environment preset="city" />
                </Suspense>

                <OrbitControls makeDefault enabled={!selectedId} />
            </Canvas>

            <div className="absolute bottom-6 right-6 flex flex-col gap-3">
                <div className={`px-3 py-1.5 backdrop-blur border rounded-md text-[10px] uppercase tracking-widest ${isDark ? 'bg-[#1a1a1a]/80 border-[#333] text-gray-500' : 'bg-white/80 border-gray-200 text-gray-400'}`}>
                    {selectedId ? 'Edit Mode' : 'Orbit View'}
                </div>
                {selectedId && (
                    <div className={`px-3 py-1.5 backdrop-blur border border-cyan-500/30 rounded-md text-[10px] text-cyan-500 uppercase tracking-widest animate-pulse ${isDark ? 'bg-cyan-500/5' : 'bg-cyan-500/10'}`}>
                        Part Selected
                    </div>
                )}
            </div>
        </div>
    );
}

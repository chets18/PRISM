'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Grid, Environment, ContactShadows } from '@react-three/drei';

type ComponentData = {
    id: string;
    type: string;
    position: [number, number, number];
};

interface ViewportProps {
    components: ComponentData[];
    onDrop: (type: string, position: [number, number, number]) => void;
}

const Model = ({ type, position }: { type: string; position: [number, number, number] }) => {
    switch (type) {
        case 'cube':
            return (
                <mesh position={position} castShadow receiveShadow>
                    <boxGeometry args={[1, 1, 1]} />
                    <meshStandardMaterial color="#06b6d4" />
                </mesh>
            );
        case 'sphere':
            return (
                <mesh position={position} castShadow receiveShadow>
                    <sphereGeometry args={[0.5, 32, 32]} />
                    <meshStandardMaterial color="#06b6d4" />
                </mesh>
            );
        case 'cylinder':
            return (
                <mesh position={position} castShadow receiveShadow>
                    <cylinderGeometry args={[0.5, 0.5, 1, 32]} />
                    <meshStandardMaterial color="#06b6d4" />
                </mesh>
            );
        case 'cone':
            return (
                <mesh position={position} castShadow receiveShadow>
                    <coneGeometry args={[0.5, 1, 32]} />
                    <meshStandardMaterial color="#06b6d4" />
                </mesh>
            );
        case 'torus':
            return (
                <mesh position={position} castShadow receiveShadow>
                    <torusGeometry args={[0.5, 0.2, 16, 100]} />
                    <meshStandardMaterial color="#06b6d4" />
                </mesh>
            );
        case 'capsule':
            return (
                <mesh position={position} castShadow receiveShadow rotateX={Math.PI / 2}>
                    <capsuleGeometry args={[0.4, 0.8, 4, 18]} />
                    <meshStandardMaterial color="#06b6d4" />
                </mesh>
            );
        default:
            return null;
    }
};

export default function Viewport({ components, onDrop }: ViewportProps) {
    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        const type = e.dataTransfer.getData('componentType');

        // In a real app, we'd unproject the mouse coords. 
        // Here we'll just drop at 0,0,0 or calculate roughly.
        // Simplifying: Always drop at origin for now or slightly offset
        onDrop(type, [0, 0.5, 0]);
    };

    return (
        <div
            className="flex-1 bg-[#121212] relative overflow-hidden"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        >
            <Canvas shadows camera={{ position: [5, 5, 5], fov: 50 }}>
                <color attach="background" args={['#121212']} />

                <Suspense fallback={null}>
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={1.5} castShadow />
                    <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />

                    <Grid
                        infiniteGrid
                        fadeDistance={50}
                        fadeStrength={3}
                        cellSize={1}
                        sectionSize={5}
                        sectionColor="#333"
                        cellColor="#222"
                    />

                    {components.map((comp) => (
                        <Model key={comp.id} type={comp.type} position={comp.position} />
                    ))}

                    <ContactShadows position={[0, -0.01, 0]} opacity={0.4} scale={20} blur={2.4} far={4.5} />
                    <Environment preset="city" />
                </Suspense>

                <OrbitControls makeDefault />
            </Canvas>

            <div className="absolute bottom-6 right-6 flex flex-col gap-3">
                <div className="px-3 py-1.5 bg-[#1a1a1a]/80 backdrop-blur border border-[#333] rounded-md text-[10px] text-gray-500 uppercase tracking-widest">
                    Perspective View
                </div>
            </div>
        </div>
    );
}

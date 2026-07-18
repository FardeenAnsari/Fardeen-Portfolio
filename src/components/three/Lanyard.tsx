"use client";

import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Physics, RigidBody, useSphericalJoint, RapierRigidBody } from '@react-three/rapier';
import { Environment, Lightformer, useTexture, CubicBezierLine } from '@react-three/drei';
import * as THREE from 'three';

function Card({ anchorRef, cardRef }: { anchorRef: React.RefObject<RapierRigidBody | null>, cardRef: React.RefObject<RapierRigidBody | null> }) {
  const [dragged, setDragged] = useState(false);
  const vec = new THREE.Vector3();
  const { mouse, viewport } = useThree();

  const [frontTexture, backTexture] = useTexture([
    '/assets/lanyard/front-card.png',
    '/assets/lanyard/back-card.png'
  ]);

  // Adjust texture orientation if needed
  frontTexture.colorSpace = THREE.SRGBColorSpace;
  backTexture.colorSpace = THREE.SRGBColorSpace;
  backTexture.wrapS = THREE.RepeatWrapping;
  backTexture.repeat.x = -1; // Flip back texture

  useSphericalJoint(anchorRef, cardRef, [
    [0, -1, 0], // Anchor local position
    [0, 2.5, 0],  // Card local position
  ]);

  useFrame((state) => {
    if (dragged && cardRef.current) {
      // Pull towards mouse
      vec.set((mouse.x * viewport.width) / 2, (mouse.y * viewport.height) / 2, 0);
      const current = cardRef.current.translation();
      const dist = vec.distanceTo(current);
      const force = vec.sub(current).multiplyScalar(150 * dist); // Spring force
      cardRef.current.applyImpulse(force, true);
    } else if (cardRef.current && !dragged) {
      // Idle animation: slight rotation towards mouse
      cardRef.current.applyTorqueImpulse({ x: mouse.y * -0.5, y: mouse.x * 0.5, z: 0 }, true);
    }
  });

  return (
    <RigidBody
      ref={cardRef}
      colliders="cuboid"
      angularDamping={7}
      linearDamping={6}
      type="dynamic"
      mass={2}
      position={[0, -2, 0]}
    >
      <mesh
        onPointerDown={(e) => {
          e.stopPropagation();
          setDragged(true);
          (e.target as HTMLElement)?.setPointerCapture?.(e.pointerId);
        }}
        onPointerUp={(e) => {
          e.stopPropagation();
          setDragged(false);
          (e.target as HTMLElement)?.releasePointerCapture?.(e.pointerId);
        }}
      >
        {/* Width: 3, Height: 4.5, Depth: 0.05 */}
        <boxGeometry args={[3, 4.5, 0.05]} />
        <meshPhysicalMaterial attach="material-0" color="#E7D8C8" roughness={0.25} metalness={0.15} />
        <meshPhysicalMaterial attach="material-1" color="#E7D8C8" roughness={0.25} metalness={0.15} />
        <meshPhysicalMaterial attach="material-2" color="#E7D8C8" roughness={0.25} metalness={0.15} />
        <meshPhysicalMaterial attach="material-3" color="#E7D8C8" roughness={0.25} metalness={0.15} />
        <meshPhysicalMaterial attach="material-4" map={frontTexture} clearcoat={1} roughness={0.25} metalness={0.15} />
        <meshPhysicalMaterial attach="material-5" map={backTexture} clearcoat={1} roughness={0.25} metalness={0.15} />
      </mesh>
    </RigidBody>
  );
}

function String({ anchorRef, cardRef }: { anchorRef: React.RefObject<RapierRigidBody | null>, cardRef: React.RefObject<RapierRigidBody | null> }) {
  const stringRef = useRef<any>();
  
  useFrame(() => {
    if (anchorRef.current && cardRef.current && stringRef.current) {
      const p1 = anchorRef.current.translation();
      const p2 = cardRef.current.translation();
      // Draw bezier curve from anchor down to card top
      const topOfCard = new THREE.Vector3(p2.x, p2.y + 2.5, p2.z);
      
      // Control points for a natural hanging string
      const v1 = new THREE.Vector3(p1.x, p1.y, p1.z);
      const v2 = new THREE.Vector3(p1.x, p1.y - 1, p1.z);
      const v3 = new THREE.Vector3(topOfCard.x, topOfCard.y + 1, topOfCard.z);
      
      stringRef.current.setPoints(v1, v2, v3, topOfCard);
    }
  });

  return (
    <CubicBezierLine
      ref={stringRef}
      start={[0, 0, 0]}
      end={[0, 0, 0]}
      midA={[0, 0, 0]}
      midB={[0, 0, 0]}
      color="#3B2A1E"
      lineWidth={4}
    />
  );
}

function Scene() {
  const anchorRef = useRef<RapierRigidBody>(null);
  const cardRef = useRef<RapierRigidBody>(null);
  
  return (
    <>
      {/* Invisible anchor at the top */}
      <RigidBody ref={anchorRef} type="fixed" position={[0, 4, 0]} colliders={false} />
      
      {/* The interactive Card */}
      <Card anchorRef={anchorRef} cardRef={cardRef} />

      {/* The connecting string */}
      <String anchorRef={anchorRef} cardRef={cardRef} />

      <Environment resolution={256}>
        {/* Warm key light */}
        <Lightformer form="rect" intensity={2} color="#FFF8F0" position={[5, 5, 5]} target={[0, 0, 0]} />
        {/* Cool rim light */}
        <Lightformer form="rect" intensity={1} color="#FFF8F0" position={[-5, 5, -5]} target={[0, 0, 0]} />
        {/* Bronze fill */}
        <Lightformer form="circle" intensity={3} color="#C08552" position={[0, -5, 5]} target={[0, 0, 0]} />
      </Environment>
    </>
  );
}

export default function Lanyard() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="w-full h-[420px] md:h-full cursor-grab active:cursor-grabbing">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 35 }}
        dpr={[1, 1.5]}
        frameloop="always"
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.5} />
        <Physics gravity={[0, -28, 0]}>
          <Scene />
        </Physics>
      </Canvas>
    </div>
  );
}

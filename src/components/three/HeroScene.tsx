"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float, Lightformer } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

/**
 * Hero 3D: dvije velike zagrade "( )" iz loga kao staklasto-metalni lukovi,
 * plus akcentne točke. Reagiraju na miš (rotacija grupe + otvaranje zagrada).
 * Optimizirano: niska geometrija, dpr ≤ 1.5, bez sjena, pauza kad nije vidljivo.
 */

const ACCENT = "#C9D600";

function Paren({ side }: { side: -1 | 1 }) {
  const ref = useRef<THREE.Mesh>(null);
  const geo = useMemo(() => new THREE.TorusGeometry(2.1, 0.13, 20, 80, Math.PI * 0.66), []);
  useFrame(({ pointer }, dt) => {
    const m = ref.current;
    if (!m) return;
    // Zagrade se lagano "otvaraju" kad je miš bliže rubu.
    const spread = 1.55 + Math.abs(pointer.x) * 0.5;
    m.position.x = THREE.MathUtils.damp(m.position.x, side * spread, 3, dt);
  });
  // Luk zakrenut tako da otvor gleda prema sredini: "(" lijevo, ")" desno.
  const rotZ = side === -1 ? Math.PI * 0.67 : -Math.PI * 0.33;
  return (
    <mesh ref={ref} geometry={geo} position={[side * 1.55, 0, 0]} rotation={[0, 0, rotZ]}>
      <meshPhysicalMaterial
        color="#8f99a3"
        metalness={0.7}
        roughness={0.24}
        clearcoat={1}
        clearcoatRoughness={0.12}
        envMapIntensity={1.8}
      />
    </mesh>
  );
}

function Dots() {
  const pts = useMemo(
    () =>
      [
        [-3.4, 1.6, -1],
        [3.6, -1.4, -0.5],
        [0.2, 2.6, -2],
        [-2.2, -2.4, -1.5],
        [2.4, 2.1, -2.5],
      ] as [number, number, number][],
    [],
  );
  return (
    <>
      {pts.map((p, i) => (
        <Float key={i} speed={1.2 + i * 0.2} rotationIntensity={0} floatIntensity={1.4}>
          <mesh position={p}>
            <sphereGeometry args={[0.07 + (i % 3) * 0.03, 16, 16]} />
            <meshStandardMaterial color="#a9b2ba" metalness={0.6} roughness={0.35} />
          </mesh>
        </Float>
      ))}
    </>
  );
}

function Rig({ children }: { children: React.ReactNode }) {
  const g = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  // Na širokim ekranima scena ide desno od teksta; na užima se centrira i smanjuje.
  // Zagrade se protežu ±3.8 jedinice od centra grupe; držimo ih unutar ekrana.
  const scale = Math.min(1, viewport.width / 10);
  const half = viewport.width / 2;
  const offsetX = Math.max(0, half - 3.9 * scale - 0.3);
  useFrame(({ pointer, clock }, dt) => {
    const grp = g.current;
    if (!grp) return;
    const t = clock.elapsedTime;
    grp.position.x = THREE.MathUtils.damp(grp.position.x, offsetX, 3, dt);
    grp.scale.setScalar(scale);
    const tx = pointer.y * 0.3 + Math.sin(t * 0.4) * 0.05;
    const ty = pointer.x * 0.4 + Math.cos(t * 0.3) * 0.06;
    grp.rotation.x = THREE.MathUtils.damp(grp.rotation.x, tx, 2.5, dt);
    grp.rotation.y = THREE.MathUtils.damp(grp.rotation.y, ty, 2.5, dt);
    grp.position.y = Math.sin(t * 0.6) * 0.12;
  });
  return <group ref={g}>{children}</group>;
}

/** Pauza render loopa kad canvas nije u viewportu (štedi bateriju i CPU). */
function VisibilityGate() {
  const { gl, invalidate, setFrameloop } = useThree();
  useEffect(() => {
    const el = gl.domElement;
    const io = new IntersectionObserver(
      ([e]) => {
        setFrameloop(e.isIntersecting ? "always" : "never");
        if (e.isIntersecting) invalidate();
      },
      { threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [gl, invalidate, setFrameloop]);
  return null;
}

export default function HeroScene() {
  const [ready, setReady] = useState(false);
  return (
    <div
      className="absolute inset-0 transition-opacity duration-1000"
      style={{ opacity: ready ? 1 : 0 }}
      aria-hidden="true"
    >
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 8.5], fov: 38 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        onCreated={() => setReady(true)}
        eventSource={typeof document !== "undefined" ? document.body : undefined}
        eventPrefix="client"
        style={{ pointerEvents: "none" }}
      >
        <VisibilityGate />
        <ambientLight intensity={0.25} />
        <directionalLight position={[4, 6, 5]} intensity={2.2} />
        <pointLight position={[-5, -3, 3]} intensity={6} color={ACCENT} distance={14} />
        <Environment resolution={128}>
          <group rotation={[-Math.PI / 3, 0, 0]}>
            <Lightformer intensity={4} position={[0, 5, -9]} scale={[10, 6, 1]} color="#F5F5F2" />
            <Lightformer intensity={0.7} position={[-6, 2, 6]} scale={[4, 8, 1]} color={ACCENT} />
            <Lightformer intensity={0.9} position={[7, -3, 4]} scale={[6, 3, 1]} color="#a9b2ba" />
          </group>
        </Environment>
        <Rig>
          <Float speed={1} rotationIntensity={0.15} floatIntensity={0.4}>
            <Paren side={-1} />
            <Paren side={1} />
          </Float>
          <Dots />
        </Rig>
      </Canvas>
    </div>
  );
}

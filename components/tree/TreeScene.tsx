"use client";

import { Canvas, useFrame, type ThreeEvent } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

export type Branch = { label: string };

type Props = {
  branches: Branch[];
  active: number | null;
  onActivate: (index: number) => void;
  reducedMotion: boolean;
  compact: boolean;
};

// Logo colours: leaves run from blue on the left to teal on the right, trunk is navy.
const LEAF_BLUE = new THREE.Color("#2a86cf");
const LEAF_TEAL = new THREE.Color("#2b8e7d");
const LEAF_DEEP = new THREE.Color("#24465f");
const LEAF_LIT = new THREE.Color("#7cc8f2");
const BARK = "#1d3a50";
const SAP = "#38b6ff";

const BASE_Y = -2.15;
const FORK_Y = -0.35;
const GROW_SECONDS = 1.6;

/** Deterministic pseudo-random numbers so the tree looks the same on every visit. */
function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

function easeOut(t: number) {
  return 1 - Math.pow(1 - Math.min(Math.max(t, 0), 1), 3);
}

function buildBranches(count: number) {
  return Array.from({ length: count }, (_, i) => {
    const t = count === 1 ? 0.5 : i / (count - 1);
    const phi = -1.1 + t * 2.2;
    const reach = 1.95 + (i % 2) * 0.25;
    const tip = new THREE.Vector3(
      Math.sin(phi) * reach,
      FORK_Y + 0.7 + Math.cos(phi) * reach * 0.95,
      (i % 2 === 0 ? 0.35 : -0.3) * Math.cos(phi),
    );
    const mid = new THREE.Vector3(tip.x * 0.42, FORK_Y + (tip.y - FORK_Y) * 0.45, tip.z * 0.4);
    // Sap runs from the roots up the trunk and out along the branch.
    const sapPath = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, BASE_Y, 0),
      new THREE.Vector3(0, (BASE_Y + FORK_Y) / 2, 0),
      new THREE.Vector3(0, FORK_Y, 0),
      mid,
      tip,
    ]);
    const limb = new THREE.CatmullRomCurve3([new THREE.Vector3(0, FORK_Y - 0.15, 0), mid, tip]);
    return { tip, limb, sapPath, side: tip.x < -0.05 ? -1 : 1 };
  });
}

function Trunk() {
  const geometry = useMemo(() => {
    const pts = [
      new THREE.Vector2(0.0, BASE_Y),
      new THREE.Vector2(0.42, BASE_Y),
      new THREE.Vector2(0.24, BASE_Y + 0.25),
      new THREE.Vector2(0.17, BASE_Y + 0.9),
      new THREE.Vector2(0.15, FORK_Y - 0.2),
      new THREE.Vector2(0.2, FORK_Y + 0.05),
      new THREE.Vector2(0.0, FORK_Y + 0.15),
    ];
    return new THREE.LatheGeometry(pts, 28);
  }, []);
  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial color={BARK} roughness={0.75} />
    </mesh>
  );
}

function Roots() {
  const curves = useMemo(
    () =>
      [-1.5, -0.7, 0.8, 1.6].map(
        (x, i) =>
          new THREE.CatmullRomCurve3([
            new THREE.Vector3(0, BASE_Y + 0.1, 0),
            new THREE.Vector3(x * 0.45, BASE_Y - 0.02, (i % 2 ? 0.2 : -0.2)),
            new THREE.Vector3(x, BASE_Y - 0.06, (i % 2 ? 0.35 : -0.35)),
          ]),
      ),
    [],
  );
  return (
    <group>
      {curves.map((c, i) => (
        <mesh key={i}>
          <tubeGeometry args={[c, 20, 0.035, 6, false]} />
          <meshStandardMaterial color={BARK} roughness={0.8} />
        </mesh>
      ))}
    </group>
  );
}

function Limb({ curve, growStart, reducedMotion }: { curve: THREE.CatmullRomCurve3; growStart: number; reducedMotion: boolean }) {
  const ref = useRef<THREE.Mesh>(null);
  const geometry = useMemo(() => new THREE.TubeGeometry(curve, 40, 0.05, 8, false), [curve]);
  const total = geometry.index ? geometry.index.count : 0;

  useFrame(({ clock }) => {
    const progress = reducedMotion ? 1 : easeOut((clock.elapsedTime - growStart) / 0.9);
    geometry.setDrawRange(0, Math.floor(total * progress));
    if (ref.current) ref.current.visible = progress > 0;
  });

  return (
    <mesh ref={ref} geometry={geometry}>
      <meshStandardMaterial color="#23506f" roughness={0.7} />
    </mesh>
  );
}

function Leaves({
  branches,
  active,
  count,
  reducedMotion,
}: {
  branches: ReturnType<typeof buildBranches>;
  active: number | null;
  count: number;
  reducedMotion: boolean;
}) {
  const ref = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const color = useMemo(() => new THREE.Color(), []);

  const leaves = useMemo(() => {
    const rand = rng(7);
    const centre = new THREE.Vector3(0, 0.75, 0);
    return Array.from({ length: count }, () => {
      // Points in an ellipsoidal shell, like the round canopy in the logo.
      const u = rand() * Math.PI * 2;
      const v = Math.acos(2 * rand() - 1);
      const r = 0.45 + Math.pow(rand(), 0.8) * 0.55;
      const pos = new THREE.Vector3(
        Math.sin(v) * Math.cos(u) * 2.45 * r,
        Math.cos(v) * 1.65 * r,
        Math.sin(v) * Math.sin(u) * 0.95 * r,
      ).add(centre);
      if (pos.y < FORK_Y + 0.35) pos.y = FORK_Y + 0.35 + rand() * 0.4;
      const out = pos.clone().sub(new THREE.Vector3(0, FORK_Y, 0)).normalize();
      let nearest = 0;
      let best = Infinity;
      branches.forEach((b, i) => {
        const d = b.tip.distanceToSquared(pos);
        if (d < best) {
          best = d;
          nearest = i;
        }
      });
      const mix = THREE.MathUtils.clamp((pos.x + 2.4) / 4.8, 0, 1);
      const base = LEAF_BLUE.clone().lerp(LEAF_TEAL, mix);
      if (pos.x > 0.4 && pos.y < 0.55 && rand() > 0.35) base.lerp(LEAF_DEEP, 0.75);
      return {
        pos,
        quat: new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), out),
        size: 0.75 + rand() * 0.5,
        phase: rand() * Math.PI * 2,
        delay: 0.5 + pos.distanceTo(centre) * 0.35 + rand() * 0.25,
        branch: nearest,
        base,
        glow: 0,
      };
    });
  }, [branches, count]);

  useEffect(() => {
    const mesh = ref.current;
    if (!mesh) return;
    leaves.forEach((l, i) => mesh.setColorAt(i, l.base));
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  }, [leaves]);

  useFrame(({ clock }, delta) => {
    const mesh = ref.current;
    if (!mesh) return;
    const t = clock.elapsedTime;
    let colorsDirty = false;
    leaves.forEach((l, i) => {
      const grow = reducedMotion ? 1 : easeOut((t - l.delay) / 0.6);
      const target = active !== null && l.branch === active ? 1 : 0;
      const next = THREE.MathUtils.damp(l.glow, target, 8, delta);
      if (Math.abs(next - l.glow) > 0.002) {
        l.glow = next;
        color.copy(l.base).lerp(LEAF_LIT, l.glow * 0.65);
        mesh.setColorAt(i, color);
        colorsDirty = true;
      }
      const sway = reducedMotion ? 0 : Math.sin(t * 1.3 + l.phase) * 0.12;
      dummy.position.copy(l.pos);
      dummy.quaternion.copy(l.quat);
      dummy.rotateZ(sway);
      const s = l.size * grow * (1 + l.glow * 0.3);
      dummy.scale.set(0.055 * s, 0.13 * s, 0.022 * s);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
    if (colorsDirty && mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  });

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, leaves.length]} frustumCulled={false}>
      <sphereGeometry args={[1, 10, 8]} />
      <meshStandardMaterial roughness={0.55} metalness={0.05} />
    </instancedMesh>
  );
}

function Sap({
  branches,
  active,
  count,
  reducedMotion,
}: {
  branches: ReturnType<typeof buildBranches>;
  active: number | null;
  count: number;
  reducedMotion: boolean;
}) {
  const ref = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const point = useMemo(() => new THREE.Vector3(), []);
  const drops = useMemo(() => {
    const rand = rng(21);
    return Array.from({ length: count }, (_, i) => ({
      branch: i % branches.length,
      t: rand(),
      speed: 0.12 + rand() * 0.1,
      rand,
    }));
  }, [branches.length, count]);

  useFrame(({ clock }, delta) => {
    const mesh = ref.current;
    if (!mesh) return;
    const visible = reducedMotion || clock.elapsedTime > GROW_SECONDS;
    drops.forEach((d, i) => {
      if (!reducedMotion) {
        d.t += d.speed * Math.min(delta, 0.05);
        if (d.t > 1) {
          d.t = 0;
          // Most new sap flows to the branch the visitor is looking at.
          d.branch =
            active !== null && d.rand() < 0.7 ? active : Math.floor(d.rand() * branches.length);
        }
      }
      branches[d.branch].sapPath.getPointAt(d.t, point);
      dummy.position.copy(point);
      const fade = Math.sin(Math.PI * d.t);
      dummy.scale.setScalar(visible ? 0.03 + fade * 0.025 : 0);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, drops.length]} frustumCulled={false} renderOrder={10}>
      <sphereGeometry args={[1, 8, 6]} />
      <meshBasicMaterial color={SAP} depthTest={false} transparent opacity={0.95} />
    </instancedMesh>
  );
}

function Tip({
  position,
  index,
  active,
  onActivate,
}: {
  position: THREE.Vector3;
  index: number;
  active: boolean;
  onActivate: (index: number) => void;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const mat = useRef<THREE.MeshStandardMaterial>(null);
  const colour = useMemo(() => new THREE.Color(), []);

  useFrame((_, delta) => {
    if (!ref.current || !mat.current) return;
    const target = active ? 1.75 : 1;
    const s = THREE.MathUtils.damp(ref.current.scale.x, target, 10, delta);
    ref.current.scale.setScalar(s);
    colour.set(active ? "#1d72b2" : "#ffffff");
    mat.current.color.lerp(colour, Math.min(1, delta * 10));
  });

  const select = (e: ThreeEvent<PointerEvent | MouseEvent>) => {
    e.stopPropagation();
    onActivate(index);
  };

  return (
    <group position={position}>
      <mesh ref={ref}>
        <sphereGeometry args={[0.1, 20, 16]} />
        <meshStandardMaterial ref={mat} color="#ffffff" roughness={0.35} emissive="#0f2433" emissiveIntensity={0.05} />
      </mesh>
      <mesh
        onPointerOver={(e) => {
          select(e);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => (document.body.style.cursor = "")}
        onClick={select}
      >
        <sphereGeometry args={[0.32, 8, 6]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
    </group>
  );
}

function Tree({ branches: labels, active, onActivate, reducedMotion, compact }: Props) {
  const group = useRef<THREE.Group>(null);
  const branches = useMemo(() => buildBranches(labels.length), [labels.length]);

  useFrame(({ clock, pointer }, delta) => {
    if (!group.current) return;
    const t = clock.elapsedTime;
    const idle = reducedMotion ? 0 : Math.sin(t * 0.25) * 0.22;
    const targetY = idle + (reducedMotion ? 0 : pointer.x * 0.25);
    const targetX = reducedMotion ? 0 : -pointer.y * 0.06;
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, targetY, 2.5, delta);
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, targetX, 2.5, delta);
    const intro = reducedMotion ? 1 : 0.9 + easeOut(t / GROW_SECONDS) * 0.1;
    group.current.scale.setScalar(intro);
  });

  return (
    <group ref={group} position={[0, -0.05, 0]}>
      <Trunk />
      <Roots />
      {branches.map((b, i) => (
        <Limb key={i} curve={b.limb} growStart={0.15 + i * 0.06} reducedMotion={reducedMotion} />
      ))}
      <Leaves branches={branches} active={active} count={compact ? 320 : 520} reducedMotion={reducedMotion} />
      <Sap branches={branches} active={active} count={compact ? 36 : 64} reducedMotion={reducedMotion} />
      {branches.map((b, i) => (
        <Tip key={i} index={i} position={b.tip} active={active === i} onActivate={onActivate} />
      ))}
      {/* One label that follows the active branch keeps the canopy readable. */}
      {active !== null && (
        <group position={branches[active].tip}>
          <Html
            position={[branches[active].side * 0.2, 0.02, 0]}
            style={{
              pointerEvents: "none",
              transform: `translate(${branches[active].side < 0 ? "-100%" : "0"}, -50%)`,
            }}
          >
            <span className="tree-label is-active">{labels[active].label}</span>
          </Html>
        </group>
      )}
    </group>
  );
}

export default function TreeScene(props: Props) {
  const host = useRef<HTMLDivElement>(null);
  const [onScreen, setOnScreen] = useState(true);

  // Stop rendering while the hero is scrolled away.
  useEffect(() => {
    const el = host.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={host} style={{ position: "absolute", inset: 0 }}>
      <Canvas
        frameloop={onScreen ? "always" : "never"}
        dpr={[1, 1.75]}
        camera={{ position: [0, 0.2, 8.6], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        aria-hidden="true"
      >
        <ambientLight intensity={1.1} />
        <directionalLight position={[3, 5, 4]} intensity={1.6} />
        <directionalLight position={[-4, 2, -2]} intensity={0.5} color="#bfe3ff" />
        <Tree {...props} />
      </Canvas>
    </div>
  );
}

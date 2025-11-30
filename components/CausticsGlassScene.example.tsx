'use client';

/**
 * EXAMPLE: How to customize the scene with your own models
 * 
 * Option 1: Use your own GLB model
 * Option 2: Use simple Three.js primitives
 * Option 3: Mix both
 */

import * as THREE from 'three';
import { useRef, useState } from 'react';
import { easing } from 'maath';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  useGLTF,
  Caustics,
  Environment,
  Lightformer,
  PerformanceMonitor,
  AccumulativeShadows,
  RandomizedLight,
  MeshTransmissionMaterial,
} from '@react-three/drei';

// ============================================
// OPTION 1: Using Your Own GLB Model
// ============================================
function SceneWithCustomGLB(props: any) {
  // Load your custom GLB model
  const { nodes, materials } = useGLTF('/your-custom-model.glb');

  return (
    <group {...props} dispose={null}>
      {/* Replace these with your model's node names */}
      {/* Use gltfjsx to see what nodes are available: npx gltfjsx your-model.glb */}
      <mesh geometry={nodes.YourObject1?.geometry} material={materials.YourMaterial1} castShadow />
      <mesh geometry={nodes.YourObject2?.geometry} material={materials.YourMaterial2} castShadow />
      
      {/* Add caustics to transparent objects */}
      <Caustics
        color={[1, 0.8, 0.8]}
        focus={[0, -1.2, 0]}
        lightSource={[-1.2, 3, -2]}
        intensity={0.005}
      >
        <mesh geometry={nodes.GlassObject?.geometry} castShadow receiveShadow>
          <MeshTransmissionMaterial
            thickness={0.05}
            chromaticAberration={0.05}
            envMapIntensity={1.5}
          />
        </mesh>
      </Caustics>
    </group>
  );
}

// ============================================
// OPTION 2: Using Simple Primitives (No GLB needed)
// ============================================
function SceneWithPrimitives(props: any) {
  return (
    <group {...props} dispose={null}>
      {/* A colorful box */}
      <mesh position={[-2, 0, 0]} castShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="orange" />
      </mesh>

      {/* A sphere */}
      <mesh position={[0, 0, 0]} castShadow>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="blue" />
      </mesh>

      {/* A torus */}
      <mesh position={[2, 0, 0]} castShadow>
        <torusGeometry args={[0.5, 0.2, 16, 100]} />
        <meshStandardMaterial color="green" />
      </mesh>

      {/* A glass-like cylinder with caustics */}
      <Caustics
        color={[1, 0.8, 0.8]}
        focus={[0, -1.2, 0]}
        lightSource={[-1.2, 3, -2]}
        intensity={0.005}
      >
        <mesh position={[0, 1, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.3, 0.3, 1, 32]} />
          <MeshTransmissionMaterial
            thickness={0.05}
            chromaticAberration={0.05}
            envMapIntensity={1.5}
          />
        </mesh>
      </Caustics>
    </group>
  );
}

// ============================================
// OPTION 3: Mix of GLB and Primitives
// ============================================
function SceneMixed(props: any) {
  // Load a GLB model
  const { nodes, materials } = useGLTF('/your-model.glb');

  return (
    <group {...props} dispose={null}>
      {/* From GLB model */}
      <mesh geometry={nodes.MainObject?.geometry} material={materials.MainMaterial} castShadow />
      
      {/* Add primitives around it */}
      <mesh position={[2, 0, 0]} castShadow>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color="red" />
      </mesh>
    </group>
  );
}

// ============================================
// Environment Component (same for all)
// ============================================
function Env({ perfSucks }: { perfSucks: boolean }) {
  const ref = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!perfSucks && ref.current) {
      const easingObj = easing as any;
      if (easingObj?.damp3) {
        easingObj.damp3(
          ref.current.rotation,
          [Math.PI / 2, 0, state.clock.elapsedTime / 5 + state.pointer.x],
          0.2,
          delta
        );
        easingObj.damp3(
          state.camera.position,
          [Math.sin(state.pointer.x / 4) * 9, 1.25 + state.pointer.y, Math.cos(state.pointer.x / 4) * 9],
          0.5,
          delta
        );
      }
      state.camera.lookAt(0, 0, 0);
    }
  });

  return (
    <Environment frames={perfSucks ? 1 : Infinity} preset="city" resolution={256} background blur={0.8}>
      <Lightformer intensity={4} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={[10, 10, 1]} />
      <group rotation={[Math.PI / 2, 1, 0]}>
        {[2, -2, 2, -4, 2, -5, 2, -9].map((x, i) => (
          <Lightformer
            key={i}
            intensity={1}
            rotation={[Math.PI / 4, 0, 0]}
            position={[x, 4, i * 4]}
            scale={[4, 1, 1]}
          />
        ))}
      </group>
      <group ref={ref}>
        <Lightformer
          intensity={5}
          form="ring"
          color="red"
          rotation-y={Math.PI / 2}
          position={[-5, 2, -1]}
          scale={[10, 10, 1]}
        />
      </group>
    </Environment>
  );
}

// ============================================
// Main Component - Choose which Scene to use
// ============================================
export default function ExampleCausticsScene() {
  const [perfSucks, degrade] = useState(false);

  return (
    <section className="w-full h-screen relative">
      <Canvas
        shadows
        dpr={[1, perfSucks ? 1.5 : 2]}
        camera={{ position: [20, 0.9, 20], fov: 26 }}
      >
        <PerformanceMonitor onDecline={() => degrade(true)} />
        <color attach="background" args={['#f0f0f0']} />
        <group position={[0, -0.5, 0]} rotation={[0, -0.75, 0]}>
          {/* CHOOSE ONE: */}
          {/* <SceneWithCustomGLB /> */}
          <SceneWithPrimitives />
          {/* <SceneMixed /> */}
          
          <AccumulativeShadows
            frames={100}
            alphaTest={0.85}
            opacity={0.8}
            color="red"
            scale={20}
            position={[0, -0.005, 0]}
          >
            <RandomizedLight
              amount={8}
              radius={6}
              ambient={0.5}
              intensity={1}
              position={[-1.5, 2.5, -2.5]}
              bias={0.001}
            />
          </AccumulativeShadows>
        </group>
        <Env perfSucks={perfSucks} />
      </Canvas>
    </section>
  );
}


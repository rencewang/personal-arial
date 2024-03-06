import React, { useState, useEffect, useRef } from 'react';

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Canvas, extend, useThree, useFrame } from '@react-three/fiber';
import {
  Bloom,
  EffectComposer,
  DepthOfField,
  Noise,
} from '@react-three/postprocessing';

import '../styles/general.scss';

extend({ OrbitControls });

const Controls = () => {
  const orbitRef = useRef(); // assign it to a variable
  const { camera, gl } = useThree();

  useFrame(() => {
    orbitRef.current.update(); // append it to the render hook from react-fiber
  });

  return (
    <orbitControls
      autoRotate
      // maxPolarAngle={Math.PI / 3}
      // minPolarAngle={Math.PI / 3}
      minDistance={10}
      maxDistance={150}
      rotateSpeed={0.3}
      autoRotateSpeed={0.3}
      enablePan={false}
      args={[camera, gl.domElement]}
      ref={orbitRef} // returning ref to control
    />
  );
};

const Star = () => {
  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(300));
  const size = Math.random() + 1;

  return (
    <mesh position={[x, y, z]}>
      <sphereGeometry args={[size, 25, 25]} />
      <meshStandardMaterial
        emissive="#faee1c"
        emissiveIntensity={0.5}
        toneMapped={false}
        // roughness={0.1}
        metalness={1}
        // bumpScale={0.005}
        // clearcoat={1}
        // clearcoatRoughness={1}
        // radius={1}
        // distort={0.4}
      />
    </mesh>
  );
};

const ThreeCanvas = () => {
  // Checking broswer size for three.js zoom
  const isBrowser = typeof window !== 'undefined';
  let fov;
  if (isBrowser) {
    fov = window.innerWidth > 500 ? 40 : 75;
  }

  const [stars] = useState(
    Array(300)
      .fill()
      .map((key) => <Star key={key} />)
  );

  return (
    <Canvas
      camera={{ position: [0, 0, 90], fov: fov, near: 0.1, far: 1000 }}
      onCreated={({ gl }) => {
        gl.shadowMap.enabled = true;
        gl.shadowMap.type = THREE.PCFSoftShadowMap;
      }}
    >
      <ambientLight intensity={0.8} />
      <spotLight position={[0, 200, 0]} intensity={1} penumbra={1} castShadow />
      <Controls />

      <mesh rotation={[20, 10, 50]}>
        <sphereGeometry args={[15, 100, 100]} />
        <meshStandardMaterial
          // color={'#000000'}
          // roughness={0.1}
          metalness={1}
          // bumpScale={0.005}
          // clearcoat={1}
          // clearcoatRoughness={1}
          // radius={1}
          // distort={0.4}
          emissive="#fff"
          emissiveIntensity={0.5}
          toneMapped={false}
          wireframe={true}
        />
      </mesh>

      <EffectComposer multisampling={0} disableNormalPass={true}>
        <DepthOfField
          focusDistance={0}
          focalLength={0.02}
          bokehScale={2}
          height={1000}
        />
        <Bloom
          luminanceThreshold={0}
          luminanceSmoothing={0.9}
          height={300}
          opacity={3}
        />

        <Noise opacity={0.025} />
      </EffectComposer>

      {stars}
    </Canvas>
  );
};

export default ThreeCanvas;

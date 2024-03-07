import React, { useState, useRef } from 'react';

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Canvas, extend, useThree, useFrame } from '@react-three/fiber';
import {
  Bloom,
  EffectComposer,
  DepthOfField,
  Noise,
  Vignette,
} from '@react-three/postprocessing';
import { KernelSize } from 'postprocessing';

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
      minDistance={150}
      maxDistance={150}
      rotateSpeed={0.3}
      autoRotateSpeed={0.05}
      enablePan={false}
      enableRotate={false}
      args={[camera, gl.domElement]}
      ref={orbitRef} // returning ref to control
    />
  );
};

const Star = () => {
  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(200));
  const size = Math.random() * 10;

  return (
    <mesh position={[x, y, z]}>
      <sphereGeometry args={[size, 25, 25]} />
      <meshStandardMaterial emissive="#010101" emissiveIntensity={1} />
    </mesh>
  );
};

const ThreeCanvas = () => {
  const [stars] = useState(
    Array(50)
      .fill()
      .map((key) => <Star key={key} />)
  );

  return (
    <Canvas
      camera={{ position: [0, 100, 90], fov: 50 }}
      gl={{
        powerPreference: 'high-performance',
      }}
    >
      <fog color="#ccc" attach="fog" near={100} far={300} />
      <Controls />
      <EffectComposer multisampling={0} disableNormalPass={true}>
        <DepthOfField focusDistance={10} focalLength={0} height={10} />
        <Bloom
          kernelSize={KernelSize.LARGE}
          luminanceThreshold={1}
          luminanceSmoothing={1}
          mipmapBlur={false}
          height={10}
          opacity={100}
        />
        <Noise opacity={0.1} />
        <Vignette eskil={false} offset={0.1} darkness={0.4} />
      </EffectComposer>

      {stars}
    </Canvas>
  );
};

export default ThreeCanvas;

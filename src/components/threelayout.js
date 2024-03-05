import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'gatsby';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Canvas, extend, useThree, useFrame } from '@react-three/fiber';

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
      autoRotateSpeed={1.5}
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
      <meshStandardMaterial color="#EAA206" />
    </mesh>
  );
};

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    var timerID = setInterval(() => tick(), 1000);
    return () => {
      clearInterval(timerID);
    };
  });

  function tick() {
    setTime(new Date());
  }

  return <span>{time.toLocaleTimeString()}</span>;
};

const greetingArray = [
  'The waves come after midnight.',
  'Fall asleep to revolution, then wake up next to a sad excuse.',
  "Isn't it pretty to think so?",
  'The lies I weave are all so intricate.',
  "Don't you know there's a part of me that longs to go?",
  "Why settle for less when there's more?",
  'To be honest, what I liked, were the things I didn’t know.',
  'Pray for everything we lost, buy back the secrets.',
  'Would you believe me now, if I say I got caught up in a wave?',
  'So I let it happen again, almost gave it away.',
  "I'm still not sure if fear's a rival or close relative to truth.",
  "There's no going back against this California feeling.",
  "You win some and lose some, 'long as the outcome's income.",
  'I want it all, and then some.',
  "Either way, we're not alone. I'll find a new place to be from.",
  'On a hard dry surface, you have to engrave the truth.',
  "Look at the world, so close, and I'm halfway to it.",
  'But now, more will go with age.',
  'You are what you love, not who loves you.',
  'In your darkest hours you will stumble on a secret power.',
  'Some days I run for cover some I only run my mouth.',
  'Try to shine. Stay wild.',
  'When it rains it pours, so stay thirsty like before.',
  'It’s a train wreck, but I won’t crash it.',
  'Turn around and you’ll see what I see.',
  "If it's all in my head tell me now.",
  'It is no bad thing to celebrate a simple life.',
  'How long will it be cute?',
  'It strengthens me to know the truth at last.',
  'Criticize a little something because somebody has to.',
  'Am I extreme?',
  'But it frightens me, the thought against my chest.',
  'This love will come back to me.',
  "If everything is not fine in the end, then it's not the end.",
  "You miss all the shots you don't take.",
  'He who has a why can bear almost any how.',
  'Walking through a lot of rainstorms makes one clean.',
  "The world will break your heart ten ways to Sunday. That's guaranteed.",
  "Most things don't exist.",
  'There in the rear-view mirror disappearing now.',
  "Now I'm dodging plot holes in my sunburnt Silverado.",
  'Are you happy?',
  "But that's impossible.",
  'Are you still there? Good.',
  'In Paris you asked me if I was afraid.',
  "I don't mean to keep making it about me.",
  'Maybe I should see them for myself.',
  'Remember that they may be behind you.',
  "I'm gonna start again.",
  "There's still a lot I haven't put into words yet.",
];

// Main render function
const Layout = ({ children }) => {
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
  const [greetingText] = useState(
    greetingArray[Math.floor(Math.random() * greetingArray.length)]
  );

  // Ensure footer does not pre-render at build time
  const footerRef = useRef();
  useEffect(() => {
    footerRef.current.style.display = 'block';
    console.log('changed');
  }, []);

  // Ensure page is scrolled to top on page change
  const contentRef = useRef();
  useEffect(() => {
    contentRef.current.scrollTop = 0;
  }, [children]);

  // Add option to strip or fill background
  const canvasRef = useRef();
  const [stripButtonText, changeStripButtonText] = useState('Fill');
  const StripSite = () => {
    if (canvasRef.current.style.display === 'none') {
      changeStripButtonText('Strip');
      canvasRef.current.style.display = 'block';
      document.documentElement.style.setProperty(
        '--highlight-color',
        '#ffc131'
      );
      document.documentElement.style.setProperty(
        '--background-color',
        '#cdedee'
      );
    } else {
      canvasRef.current.style.display = 'none';
      changeStripButtonText('Fill');
      document.documentElement.style.setProperty(
        '--highlight-color',
        'transparent'
      );
      document.documentElement.style.setProperty(
        '--background-color',
        '#f8f8f8'
      );
    }
  };

  return (
    <main>
      <Helmet>
        <body style={{ overflow: 'hidden' }} />
      </Helmet>

      <header>
        <div id="top">
          <div
            className="link-button"
            onClick={() => StripSite(canvasRef)}
            aria-hidden="true"
          >
            {stripButtonText}
          </div>
          <div className="navigation">
            <nav>
              <Link to="/">info</Link>
            </nav>
            <nav>
              <Link to="/blog">writing</Link>
            </nav>
            <nav>
              <Link to="/project">project</Link>
            </nav>
            <nav>
              <Link to="/art">art</Link>
            </nav>
          </div>
        </div>
      </header>

      <section id="content" ref={contentRef}>
        {children}
      </section>

      <footer ref={footerRef}>
        <div id="bottom">
          <div id="clock">
            <Clock />
          </div>
          <div id="greeting">&ldquo;{greetingText}&rdquo;</div>
        </div>
      </footer>

      <section id="background"></section>

      {isBrowser && (
        <section id="canvas" ref={canvasRef} style={{ display: 'none' }}>
          <Canvas
            camera={{ position: [0, 0, 90], fov: fov, near: 0.1, far: 1000 }}
            onCreated={({ gl }) => {
              gl.shadowMap.enabled = true;
              gl.shadowMap.type = THREE.PCFSoftShadowMap;
            }}
          >
            <ambientLight intensity={0.8} />
            <spotLight
              position={[0, 200, 0]}
              intensity={1}
              penumbra={1}
              castShadow
            />
            <Controls />

            <mesh rotation={[20, 10, 50]}>
              <sphereGeometry args={[15, 100, 100]} />
              <meshStandardMaterial color="#E91C23" wireframe={true} />
            </mesh>

            {stars}
          </Canvas>
        </section>
      )}
    </main>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;

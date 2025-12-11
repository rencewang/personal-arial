import React, { useRef, useEffect } from 'react';

const WindCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width, height;
    let particles = [];
    const scale = 0.01; // Restored from user edit (Step 380)

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const particleCount = 2000;
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          speed: Math.random() * 0.5, // Restored from user edit (Step 381)
          history: [] // Trail
        });
      }
    };

    // Pseudo-noise function (Simplex/Perlin replacement)
    const noise = (x, y, z = 0) => {
      return Math.sin(x * scale + z) + Math.cos(y * scale + z);
    };

    const render = () => {
      // Fade effect for trails - slightly stronger fade for less "line" persistence
      ctx.fillStyle = 'rgba(255, 255, 255, 0.15)'; 
      ctx.fillRect(0, 0, width, height);

      ctx.strokeStyle = '#1e1cd8'; // Blue
      // ctx.lineWidth = 0.5; // Restored from Step 372
      // Using 0.8 as it might have been better? Step 372 used 0.5. Let's stick to 0.5 as per 372.
      ctx.lineWidth = 0.5;
      
      // Calculate Chaos Level (0 to 1) over time
      // Oscillates every ~20 seconds
      const time = Date.now() * 0.0003;
      const chaos = (Math.sin(time) + 1) / 2; 

      ctx.beginPath();
      particles.forEach(p => {
        // Order: Flow field angle
        const noiseAngle = noise(p.x, p.y, time * 0.1) * Math.PI * 2;
        
        // Disorder: Random noise or offset
        // We mix the noise angle with random jitter based on chaos level
        const randomOffset = (Math.random() - 0.5) * Math.PI * 4 * chaos;
        
        const angle = noiseAngle + randomOffset;
        
        // Speed also varies with chaos (faster in disorder)
        const currentSpeed = p.speed * (1 + chaos * 2);

        const vx = Math.cos(angle) * currentSpeed;
        const vy = Math.sin(angle) * currentSpeed;

        p.x += vx;
        p.y += vy;

        // Wrap around
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Draw particle
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x - vx * (2 - chaos), p.y - vy * (2 - chaos)); // Shorter trails in chaos
      });
      ctx.stroke();

      animationFrameId = requestAnimationFrame(render);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />;
};

export default WindCanvas;

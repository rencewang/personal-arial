import React, { useRef, useEffect } from 'react';

const AsciiCanvas = () => {
  const canvasRef = useRef(null);
  // Ref for time must be at component level, or use a let inside effect if it doesn't need to persist across re-renders (it doesn't, actually).
  // But using a ref is safer if we want to pause/resume later.
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width, height;
    let cols, rows;

    // "ASCII Art" density characters
    const charSet = ' .:-=+*#'; 

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      cols = Math.floor(width / 12);
      rows = Math.floor(height / 14);
    };

    // Simple smooth noise function (Simplex-ish via sine plotting)
    const noise = (x, y, t) => {
      const sx = x * 0.05; // Zoom out for larger shapes
      const sy = y * 0.05;
      return Math.sin(sx + t) + Math.cos(sy + t * 0.5) + 
             Math.sin(sx * 0.5 - t) * Math.cos(sy * 0.5 + t);
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Background
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = '#1e1cd8';
      ctx.font = '12px monospace';

      const t = timeRef.current;
      timeRef.current += 0.001; // Speed

      if (!cols || !rows) return;

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const n = noise(x, y, t);
          
          // Noise usually ranges -2 to 2 roughly with this sum
          // Normalize mainly to -1 to 1 range effectively
          // Thresholding
          if (n > -0.5) { 
             // Map noise intensity to character density
             // Higher noise = denser character
             const intensity = (n + 1) / 3; // roughly 0 to 1
             const charIndex = Math.floor(Math.max(0, Math.min(1, intensity)) * (charSet.length - 1));
             const char = charSet[charIndex];
             
             if (char !== ' ') {
                ctx.fillText(char, x * 12, y * 14);
             }
          }
        }
      }

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

export default AsciiCanvas;

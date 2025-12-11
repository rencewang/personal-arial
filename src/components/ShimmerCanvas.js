import React, { useRef, useEffect } from "react";

const ShimmerCanvas = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let particles = [];
    let width, height;

    const initParticles = () => {
      particles = [];
      // Optimization: drastically reduced density from /100 to /800
      // 1080p: ~2000 particles instead of ~20000.
      const particleCount = Math.floor((width * height) / 100);

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          // Very slow vertical drift
          vx: (Math.random() - 0.5) * 0.1,
          vy: -Math.random() * 0.2 - 0.05, // Always up, but slow
          size: Math.random() * 1.5,
          // Sparkle properties
          alpha: Math.random(),
          alphaSpeed: Math.random() * 0.02 + 0.005,
          increasing: Math.random() > 0.5,
        });
      }
    };

    const resize = () => {
      if (containerRef.current) {
        width = containerRef.current.clientWidth;
        height = containerRef.current.clientHeight;
        canvas.width = width;
        canvas.height = height;
        initParticles();
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Twinkle (Alpha animation)
        if (p.increasing) {
          p.alpha += p.alphaSpeed;
          if (p.alpha >= 1) {
            p.alpha = 1;
            p.increasing = false;
          }
        } else {
          p.alpha -= p.alphaSpeed;
          if (p.alpha <= 0) {
            p.alpha = 0;
            p.increasing = true;
            // Reposition when completely invisible to act as a spawn
            if (Math.random() > 0.9) {
              p.x = Math.random() * width;
              p.y = Math.random() * height;
            }
          }
        }

        // Logic check: make sure alpha is valid
        if (p.alpha < 0) p.alpha = 0;
        if (p.alpha > 1) p.alpha = 1;

        // Wrap around logic
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Draw particle (Diamond / Star shape)
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = "#1e1cd8";

        // Draw Diamond
        ctx.beginPath();
        ctx.moveTo(p.x, p.y - p.size); // Top
        ctx.lineTo(p.x + p.size, p.y); // Right
        ctx.lineTo(p.x, p.y + p.size); // Bottom
        ctx.lineTo(p.x - p.size, p.y); // Left
        ctx.closePath();
        ctx.fill();

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", resize);
    resize();
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="canvas-container" ref={containerRef}>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default ShimmerCanvas;

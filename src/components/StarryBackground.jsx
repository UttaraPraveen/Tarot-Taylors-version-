import React, { useEffect, useRef } from 'react';

const StarryBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let animationFrameId;
    let stars = [];
    let particles = [];
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates for parallax
    let mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2 };

    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initStars();
    };
    window.addEventListener('resize', resize);

    const initStars = () => {
      stars = [];
      const count = Math.floor((width * height) / 7000); // Balanced density
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 1.6 + 0.4,
          twinkleSpeed: Math.random() * 0.015 + 0.005,
          phase: Math.random() * Math.PI * 2,
          color: Math.random() > 0.85 ? '#f3e5ab' : '#ffffff' // gold vs white stars
        });
      }
    };

    const spawnParticle = () => {
      if (particles.length < 60 && Math.random() < 0.08) {
        // Randomly select gold/amber, soft lavender, or magical rose hues
        const rand = Math.random();
        let hue = 43; // gold
        if (rand > 0.7) hue = 280; // lavender
        else if (rand > 0.4) hue = 340; // rose

        particles.push({
          x: Math.random() * width,
          y: height + Math.random() * 30,
          vx: (Math.random() - 0.5) * 0.5,
          vy: -(Math.random() * 0.8 + 0.3),
          size: Math.random() * 4 + 1.5,
          color: `hsla(${hue}, 85%, 75%, ${Math.random() * 0.25 + 0.1})`,
          life: 1,
          decay: Math.random() * 0.002 + 0.001
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Interpolate mouse coordinates for smooth parallax
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      const dx = (mouse.x - width / 2) * 0.04;
      const dy = (mouse.y - height / 2) * 0.04;

      // Draw Twinkling Stars
      stars.forEach((star) => {
        star.phase += star.twinkleSpeed;
        const opacity = Math.abs(Math.sin(star.phase));
        
        ctx.fillStyle = star.color;
        ctx.globalAlpha = opacity;
        
        // Offset using parallax
        let sx = star.x + dx * (star.size * 0.6);
        let sy = star.y + dy * (star.size * 0.6);

        // Keep inside bounds wrap around
        if (sx < 0) sx = width + (sx % width);
        if (sx > width) sx = sx % width;
        if (sy < 0) sy = height + (sy % height);
        if (sy > height) sy = sy % height;

        ctx.beginPath();
        ctx.arc(sx, sy, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw and Update Particles
      spawnParticle();
      particles = particles.filter((p) => {
        p.x += p.vx + dx * 0.008;
        p.y += p.vy + dy * 0.008;
        p.life -= p.decay;

        if (p.life <= 0 || p.x < 0 || p.x > width || p.y < -50) {
          return false;
        }

        ctx.beginPath();
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
        gradient.addColorStop(0, p.color);
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.globalAlpha = p.life;
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
        ctx.fill();

        return true;
      });

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(draw);
    };

    initStars();
    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ pointerEvents: 'none' }} />;
};

export default StarryBackground;

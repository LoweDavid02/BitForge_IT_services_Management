import React, { useEffect, useRef } from 'react';

const AntiGravityBackground = ({ children, className = '' }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle class
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.color = Math.random() > 0.5 ? '#0066FF' : '#00D4FF';
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Anti-gravity effect - float upward
        this.y -= 0.1;

        // Wrap around screen
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    // Create particles
    const createParticles = () => {
      const particleCount = Math.floor((canvas.width * canvas.height) / 15000);
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };
    createParticles();

    // Animation loop
    const animate = () => {
      ctx.fillStyle = 'rgba(10, 12, 16, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw connections between close particles
      particles.forEach((particle, index) => {
        particle.update();
        particle.draw();

        // Draw lines between nearby particles
        for (let j = index + 1; j < particles.length; j++) {
          const dx = particles[j].x - particle.x;
          const dy = particles[j].y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.strokeStyle = '#0066FF';
            ctx.globalAlpha = (1 - distance / 150) * 0.2;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className={`relative ${className}`}>
      {/* Animated Canvas Background */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full z-0"
        style={{ background: 'linear-gradient(135deg, #0a0c10 0%, #0d1117 50%, #0a0c10 100%)' }}
      />
      
      {/* Gradient Overlays for Depth */}
      <div className="fixed inset-0 bg-gradient-to-b from-transparent via-transparent to-bg-primary/50 pointer-events-none z-0" />
      <div className="fixed top-0 left-0 w-full h-96 bg-gradient-radial from-accent-blue/10 via-transparent to-transparent pointer-events-none z-0" />
      <div className="fixed bottom-0 right-0 w-full h-96 bg-gradient-radial from-purple-600/10 via-transparent to-transparent pointer-events-none z-0" />
      
      {/* Floating Orbs */}
      <div className="fixed top-1/4 left-1/4 w-64 h-64 bg-accent-blue/20 rounded-full blur-3xl animate-float z-0" style={{ animationDelay: '0s' }} />
      <div className="fixed bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-float-delayed z-0" style={{ animationDelay: '2s' }} />
      <div className="fixed top-1/2 left-1/2 w-48 h-48 bg-cyan-400/10 rounded-full blur-2xl animate-pulse z-0" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default AntiGravityBackground;

import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const ParticlesContainer = styled.canvas`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
`;

class Particle {
  constructor(x, y, ctx, options) {
    this.x = x;
    this.y = y;
    this.ctx = ctx;
    this.options = options;
    this.radius = Math.random() * 8 + 5;
    this.speed = Math.random() * 0.5 + 0.2;
    this.directionX = Math.random() * 2 - 1;
    this.directionY = Math.random() * 2 - 1;
    this.alpha = Math.random() * 0.5 + 0.5;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    this.ctx.fillStyle = `rgba(147, 112, 219, ${this.alpha})`;
    this.ctx.fill();
    
    this.ctx.shadowBlur = 15;
    this.ctx.shadowColor = 'rgba(147, 112, 219, 0.5)';
  }

  update(mousePosition) {
    this.x += this.directionX * this.speed;
    this.y += this.directionY * this.speed;

    if (this.x < 0 || this.x > this.ctx.canvas.width) this.directionX *= -1;
    if (this.y < 0 || this.y > this.ctx.canvas.height) this.directionY *= -1;

    if (mousePosition) {
      const dx = mousePosition.x - this.x;
      const dy = mousePosition.y - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 150) {
        const angle = Math.atan2(dy, dx);
        this.x -= Math.cos(angle) * 5;
        this.y -= Math.sin(angle) * 5;
      }
    }
  }
}

const Particles = () => {
  const canvasRef = useRef(null);
  const [mousePosition, setMousePosition] = useState(null);
  const particlesRef = useRef([]);
  const animationFrameRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      const numberOfParticles = Math.min(300, Math.floor((canvas.width * canvas.height) / 10000));
      const particles = [];
      
      for (let i = 0; i < numberOfParticles; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        particles.push(new Particle(x, y, ctx, {}));
      }
      
      particlesRef.current = particles;
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      ctx.shadowBlur = 15;
      ctx.shadowColor = 'rgba(147, 112, 219, 0.5)';
      
      particlesRef.current.forEach(particle => {
        particle.update(mousePosition);
        particle.draw();
      });

      const particles = particlesRef.current;
      for (let i = 0; i < particles.length; i++) {
        let closestParticles = 0;
        for (let j = i + 1; j < particles.length && closestParticles < 5; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 200) {
            ctx.beginPath();
            const opacity = 1 - (distance / 200);
            ctx.strokeStyle = `rgba(147, 112, 219, ${opacity})`;
            ctx.lineWidth = 3;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
            closestParticles++;
          }
        }
      }
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    const handleResize = () => {
      init();
    };

    init();
    animate();

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return <ParticlesContainer ref={canvasRef} />;
};

export default Particles; 
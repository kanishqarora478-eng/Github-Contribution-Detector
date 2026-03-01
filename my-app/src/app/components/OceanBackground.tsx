import { useEffect, useRef } from "react";
import { motion } from "motion/react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  opacity: number;
}

interface OceanBackgroundProps {
  intensity?: number;
}

export function OceanBackground({ intensity = 1 }: OceanBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Create particles
    const particleCount = 80;
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 3 + 1,
      speedY: Math.random() * 0.3 + 0.1,
      opacity: Math.random() * 0.5 + 0.3,
    }));

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle) => {
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy) || 1; // prevent division by zero

        if (distance < 150) {
          const force = (150 - distance) / 150;
          particle.x -= (dx / distance) * force * 2;
          particle.y -= (dy / distance) * force * 2;
        }

        particle.y -= particle.speedY * intensity;

        if (particle.y < -10) {
          particle.y = canvas.height + 10;
          particle.x = Math.random() * canvas.width;
        }

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(34, 211, 238, ${particle.opacity * intensity})`;
        ctx.shadowBlur = 10 * intensity;
        ctx.shadowColor = "#22D3EE";
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [intensity]);

  return (
    <>
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#0B1D3A] via-[#102A5E] to-[#1E3A8A]"
        animate={{
          background: [
            "radial-gradient(circle at 20% 50%, #1E3A8A 0%, #0B1D3A 50%)",
            "radial-gradient(circle at 80% 50%, #2563EB 0%, #102A5E 50%)",
            "radial-gradient(circle at 50% 80%, #1E3A8A 0%, #0B1D3A 50%)",
            "radial-gradient(circle at 20% 50%, #1E3A8A 0%, #0B1D3A 50%)",
          ],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />

      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ filter: "blur(1px)" }}
      />
    </>
  );
}
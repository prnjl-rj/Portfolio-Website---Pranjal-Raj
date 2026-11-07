import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

/**
 * Interactive 3D Perspective Tilt Card with Cursor Spotlight Glow
 * Uses Framer Motion springs for silky-smooth 3D rotation & specular sheen
 */
export function TiltCard({
  children,
  className,
  intensity = 10,
  glowColor = 'rgba(217, 70, 239, 0.22)',
  onClick,
  ...props
}) {
  const ref = useRef(null);
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50, opacity: 0 });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 22, stiffness: 220, mass: 0.6 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [intensity, -intensity]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-intensity, intensity]), springConfig);

  function handleMouseMove(e) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width || 1;
    const height = rect.height || 1;
    const localX = e.clientX - rect.left;
    const localY = e.clientY - rect.top;

    mouseX.set(localX / width - 0.5);
    mouseY.set(localY / height - 0.5);
    setSpotlight({
      x: (localX / width) * 100,
      y: (localY / height) * 100,
      opacity: 1,
    });
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
    setSpotlight((prev) => ({ ...prev, opacity: 0 }));
  }

  return (
    <div className="perspective-1400">
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        whileHover={{ scale: 1.015 }}
        transition={{ duration: 0.2 }}
        className={cn(
          'relative glass-surface rounded-2xl overflow-hidden transition-colors duration-300 group',
          onClick && 'cursor-pointer',
          className
        )}
        {...props}
      >
        {/* Dynamic radial spotlight tracking cursor */}
        <div
          className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-0"
          style={{
            opacity: spotlight.opacity,
            background: `radial-gradient(520px circle at ${spotlight.x}% ${spotlight.y}%, ${glowColor}, transparent 65%)`,
          }}
        />
        <div className="relative z-10 h-full">{children}</div>
      </motion.div>
    </div>
  );
}


"use client";

import React, { useEffect, useRef } from "react";

const ASCII_IMAGE_BASE64 = "data:image/jpeg;base64,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";

interface AsciiBackgroundProps {
  enabled: boolean;
  mousePos: { x: number; y: number };
}

const AsciiBackground: React.FC<AsciiBackgroundProps> = ({ enabled, mousePos }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const physicsRef = useRef({
    chars: [] as any[],
    particles: [] as any[],
    velocities: [] as any[],
    originalPositions: [] as any[],
    lastMouseMoveTime: 0,
    isAnimating: false,
    animationId: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const sourceMedia = imgRef.current;
    if (!canvas || !sourceMedia || !enabled) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const config = {
      mouseRadius: 70, // Increased for better reach
      intensity: 4,
      fontSize: 12,
      charSpacing: 0.6,
      lineHeight: 1,
      mousePersistence: 0.95,
      returnSpeed: 0.08,
      returnWhenStill: true,
      enableJiggle: true,
      jiggleIntensity: 0.15,
      detailFactor: 60,
      contrast: 110,
      brightness: 100,
      saturation: 100,
      useTransparentBackground: true,
      backgroundColor: "transparent",
    };

    const charSet = " .`^\",:;Il!i><~+_-?][}{1)(|/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$";

    const colorScheme = (r: number, g: number, b: number, brightness: number, saturation: number) => {
      const sat = saturation / 100;
      const gray = 0.2989 * r + 0.587 * g + 0.114 * b;
      const rSat = Math.max(0, Math.min(255, gray + sat * (r - gray)));
      const gSat = Math.max(0, Math.min(255, gray + sat * (g - gray)));
      const bSat = Math.max(0, Math.min(255, gray + sat * (b - gray)));
      return `rgb(${Math.round(rSat)},${Math.round(gSat)},${Math.round(bSat)})`;
    };

    function updateCanvasSize() {
      const canvas = canvasRef.current;
      if (!canvas) return { width: 0, height: 0 };
      const containerWidth = window.innerWidth;
      const containerHeight = window.innerHeight;
      const mediaRatio = sourceMedia!.height / sourceMedia!.width;
      let width, height;

      if (containerWidth * mediaRatio <= containerHeight) {
        width = containerWidth;
        height = width * mediaRatio;
      } else {
        height = containerHeight;
        width = height / mediaRatio;
      }

      canvas.width = width;
      canvas.height = height;
      return { width, height };
    }

    function applyContrastAndBrightness(imageData: ImageData) {
      const data = imageData.data;
      const contrastFactor = 1.1; // config.contrast
      for (let i = 0; i < data.length; i += 4) {
        data[i] = Math.max(0, Math.min(255, 128 + contrastFactor * (data[i] - 128)));
        data[i+1] = Math.max(0, Math.min(255, 128 + contrastFactor * (data[i+1] - 128)));
        data[i+2] = Math.max(0, Math.min(255, 128 + contrastFactor * (data[i+2] - 128)));
      }
      return imageData;
    }

    function generateAsciiArt() {
      const dimensions = updateCanvasSize();
      const columns = Math.round(Math.max(20, (dimensions.width / 1200) * config.detailFactor * 3));
      const aspectRatio = sourceMedia!.height / sourceMedia!.width;
      const rows = Math.ceil(columns * aspectRatio);

      const tempCanvas = document.createElement("canvas");
      tempCanvas.width = columns;
      tempCanvas.height = rows;
      const tempCtx = tempCanvas.getContext("2d");
      if (!tempCtx) return;

      tempCtx.drawImage(sourceMedia!, 0, 0, columns, rows);
      let imageData = tempCtx.getImageData(0, 0, columns, rows);
      imageData = applyContrastAndBrightness(imageData);

      const fontSizeX = dimensions.width / columns;
      const fontSizeY = fontSizeX * config.lineHeight;

      const physics = physicsRef.current;
      physics.chars = [];
      physics.particles = [];
      physics.velocities = [];
      physics.originalPositions = [];

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < columns; x++) {
          const posX = x * fontSizeX;
          const posY = y * fontSizeY;
          const index = (y * columns + x) * 4;
          const r = imageData.data[index];
          const g = imageData.data[index + 1];
          const b = imageData.data[index + 2];
          const brightness = 0.299 * r + 0.587 * g + 0.114 * b;
          const charIndex = Math.floor((brightness / 256) * charSet.length);
          const char = charSet[Math.min(charIndex, charSet.length - 1)];
          const color = colorScheme(r, g, b, brightness, config.saturation);

          physics.chars.push({ char, color });
          physics.particles.push({ x: posX, y: posY });
          physics.velocities.push({ x: 0, y: 0 });
          physics.originalPositions.push({ x: posX, y: posY });
        }
      }
    }

    function animate() {
      const physics = physicsRef.current;
      if (!physics.isAnimating || !canvasRef.current) return;
      const ctx = canvasRef.current.getContext("2d");
      if (!ctx) return;

      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      ctx.font = `${config.fontSize}px monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      for (let i = 0; i < physics.particles.length; i++) {
        const particle = physics.particles[i];
        const velocity = physics.velocities[i];
        const target = physics.originalPositions[i];

        const dx = particle.x - mousePos.x;
        const dy = particle.y - mousePos.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < config.mouseRadius) {
          const force = (1 - distance / config.mouseRadius) * config.intensity;
          const angle = Math.atan2(dy, dx);
          velocity.x += Math.cos(angle) * force * 0.3;
          velocity.y += Math.sin(angle) * force * 0.3;
        }

        if (config.enableJiggle) {
          velocity.x += (Math.random() - 0.5) * config.jiggleIntensity;
          velocity.y += (Math.random() - 0.5) * config.jiggleIntensity;
        }

        velocity.x *= config.mousePersistence;
        velocity.y *= config.mousePersistence;
        particle.x += velocity.x;
        particle.y += velocity.y;

        particle.x += (target.x - particle.x) * config.returnSpeed;
        particle.y += (target.y - particle.y) * config.returnSpeed;

        const charInfo = physics.chars[i];
        ctx.fillStyle = charInfo.color;
        ctx.fillText(charInfo.char, particle.x, particle.y);
      }
      physics.animationId = requestAnimationFrame(animate);
    }

    const initialize = () => {
      generateAsciiArt();
      physicsRef.current.isAnimating = true;
      animate();
    };

    if (sourceMedia.complete) {
      initialize();
    } else {
      sourceMedia.onload = initialize;
    }

    const handleResize = () => {
      updateCanvasSize();
      generateAsciiArt();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      physicsRef.current.isAnimating = false;
      cancelAnimationFrame(physicsRef.current.animationId);
    };
  }, [enabled, mousePos]);

  if (!enabled) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[-1] flex items-center justify-center overflow-hidden opacity-20 pointer-events-none"
    >
      <canvas ref={canvasRef} className="block max-w-full max-h-full" />
      <img ref={imgRef} src={ASCII_IMAGE_BASE64} alt="source" className="hidden" />
    </div>
  );
};

export default AsciiBackground;

"use client";

import { useEffect, useRef } from "react";
import createGlobe, { type COBEOptions } from "cobe";
import { useMotionValue, useSpring } from "motion/react";

const MOVEMENT_DAMPING = 1400;

export const GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 0,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 1.2,
  baseColor: [1, 1, 1],
  markerColor: [251 / 255, 100 / 255, 21 / 255],
  glowColor: [1, 1, 1],
  markers: [
    { location: [14.5995, 120.9842], size: 0.03 },
    { location: [19.076, 72.8777],   size: 0.1  },
    { location: [23.8103, 90.4125],  size: 0.05 },
    { location: [30.0444, 31.2357],  size: 0.07 },
    { location: [39.9042, 116.4074], size: 0.08 },
    { location: [-23.5505, -46.6333],size: 0.1  },
    { location: [19.4326, -99.1332], size: 0.1  },
    { location: [40.7128, -74.006],  size: 0.1  },
    { location: [34.6937, 135.5022], size: 0.05 },
    { location: [41.0082, 28.9784],  size: 0.06 },
  ],
};

/**
 * Globe renders a COBE WebGL spinning earth.
 *
 * Pass an explicit `size` (CSS pixels) to avoid the canvas-width-reads-zero
 * race condition that occurs with auto-detection on dynamic imports.
 * The WebGL buffer is rendered at size*2 for crisp retina displays.
 */
export function Globe({
  config = GLOBE_CONFIG,
  size = 600,
}: {
  config?: COBEOptions;
  size?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const phiRef    = useRef(0);
  const pointerInteracting = useRef<number | null>(null);

  const r  = useMotionValue(0);
  const rs = useSpring(r, { mass: 1, damping: 30, stiffness: 100 });

  const updatePointerInteraction = (value: number | null) => {
    pointerInteracting.current = value;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value !== null ? "grabbing" : "grab";
    }
  };

  const updateMovement = (clientX: number) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current;
      r.set(r.get() + delta / MOVEMENT_DAMPING);
    }
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    // Explicit pixel buffer — no CSS layout ambiguity
    const px = size * 2; // retina

    const globe = createGlobe(canvasRef.current!, {
      ...config,
      width:  px,
      height: px,
      onRender: (state: Record<string, any>) => {
        if (!pointerInteracting.current) phiRef.current += 0.005;
        state.phi    = phiRef.current + rs.get();
        state.width  = px;
        state.height = px;
      },
    // onRender is missing from COBEOptions typedef in this cobe version — cast to bypass
    } as any);

    // Fade in after first frame
    const raf = requestAnimationFrame(() => {
      if (canvasRef.current) canvasRef.current.style.opacity = "1";
    });

    return () => {
      cancelAnimationFrame(raf);
      globe.destroy();
    };
  // size and config are intentionally not reactive — pass stable refs if needed
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rs]);

  return (
    /* Explicit pixel square — no CSS aspect-ratio guessing */
    <div
      style={{
        width:    size,
        height:   size,
        margin:   "0 auto",
        position: "relative",
        maxWidth: "100%",
      }}
    >
      <canvas
        ref={canvasRef}
        width={size * 2}
        height={size * 2}
        style={{
          width:      "100%",
          height:     "100%",
          opacity:    0,
          transition: "opacity 500ms ease",
          cursor:     "grab",
          display:    "block",
        }}
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId);
          updatePointerInteraction(e.clientX);
        }}
        onPointerUp={()  => updatePointerInteraction(null)}
        onPointerOut={()  => updatePointerInteraction(null)}
        onMouseMove={(e)  => updateMovement(e.clientX)}
        onTouchMove={(e)  => e.touches[0] && updateMovement(e.touches[0].clientX)}
      />
    </div>
  );
}

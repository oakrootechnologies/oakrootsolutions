"use client";

import { useEffect, useRef } from "react";
import createGlobe from "cobe";

/**
 * Self-contained globe — zero abstraction, hardcoded canvas size.
 * Bypasses every CSS-layout / dynamic-import race condition.
 */
export default function GlobeWidget() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // WebGL framebuffer size (2× for retina)
    const BUFFER = 1400;

    let phi      = 0;
    let pointerX: number | null = null;
    let drag     = 0;

    const globe = createGlobe(canvas, {
      devicePixelRatio: 2,
      width:   BUFFER,
      height:  BUFFER,
      phi:     0,
      theta:   0.25,
      dark:    0,
      diffuse: 2,
      mapSamples:   16000,
      mapBrightness: 4,
      baseColor:   [0.88, 0.86, 1.0] as [number, number, number],
      markerColor: [0.18, 0.82, 0.72] as [number, number, number],
      glowColor:   [0.55, 0.45, 0.95] as [number, number, number],
      markers: [
        { location: [19.076,   72.877] as [number,number], size: 0.07 },
        { location: [40.712,  -74.006] as [number,number], size: 0.09 },
        { location: [51.507,   -0.127] as [number,number], size: 0.06 },
        { location: [35.676,  139.650] as [number,number], size: 0.05 },
        { location: [-33.868, 151.209] as [number,number], size: 0.05 },
        { location: [1.352,   103.819] as [number,number], size: 0.04 },
        { location: [48.856,    2.352] as [number,number], size: 0.05 },
        { location: [25.204,   55.270] as [number,number], size: 0.05 },
        { location: [22.319,  114.169] as [number,number], size: 0.04 },
      ],
      onRender(state) {
        if (pointerX === null) phi += 0.004;
        state.phi    = phi + drag;
        state.width  = BUFFER;
        state.height = BUFFER;
      },
    });

    // Fade in after the first rendered frame
    requestAnimationFrame(() => {
      canvas.style.opacity = "1";
    });

    // Drag-to-spin handlers
    const onDown = (x: number) => { pointerX = x; };
    const onMove = (x: number) => {
      if (pointerX === null) return;
      drag    += (x - pointerX) / 1400;
      pointerX = x;
    };
    const onUp = () => { pointerX = null; };

    const pd = (e: PointerEvent) => { canvas.setPointerCapture(e.pointerId); onDown(e.clientX); };
    const pm = (e: PointerEvent) => onMove(e.clientX);
    const pu = ()                 => onUp();
    const tm = (e: TouchEvent)   => { if (e.touches[0]) onMove(e.touches[0].clientX); };

    canvas.addEventListener("pointerdown", pd);
    canvas.addEventListener("pointermove", pm);
    canvas.addEventListener("pointerup",   pu);
    canvas.addEventListener("pointerout",  pu);
    canvas.addEventListener("touchmove",   tm);

    return () => {
      globe.destroy();
      canvas.removeEventListener("pointerdown", pd);
      canvas.removeEventListener("pointermove", pm);
      canvas.removeEventListener("pointerup",   pu);
      canvas.removeEventListener("pointerout",  pu);
      canvas.removeEventListener("touchmove",   tm);
    };
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "0 24px" }}>
      <canvas
        ref={canvasRef}
        /* HTML attributes set the WebGL buffer size upfront */
        width={1400}
        height={1400}
        style={{
          width:     700,
          height:    700,
          maxWidth:  "100%",
          opacity:   0,
          transition:"opacity 600ms ease",
          cursor:    "grab",
          display:   "block",
        }}
      />
    </div>
  );
}

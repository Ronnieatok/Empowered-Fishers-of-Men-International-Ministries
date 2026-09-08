"use client";

import Image, { ImageProps } from "next/image";
import { useEffect, useState } from "react";

/**
 * MorphImage
 * -----------------------------------------------------------------------
 * Wraps next/image and animates its clip-path between a rotation of
 * organic "blob" polygons. All presets share the same vertex count so
 * the browser can interpolate cleanly between them via a CSS transition
 * — JS's job is just deciding *which* shape is active and *when*, not
 * computing the interpolation itself.
 *
 * Two modes:
 * - "ambient": cycles automatically on a timer. Use for singular
 *   showcase images (a portrait, a feature photo).
 * - "hover": sits as a plain rounded rect until hovered/focused, then
 *   morphs to a blob. Use for grids where 8 independently-animating
 *   shapes at once would look chaotic rather than polished.
 *
 * Accessibility: honors prefers-reduced-motion by freezing on the first
 * shape and skipping the timer/hover transition entirely, consistent
 * with the global reduced-motion handling in globals.css.
 */

const BLOB_SHAPES = [
  "polygon(0% 6%, 92% 0%, 100% 88%, 8% 100%)",
  "polygon(4% 0%, 100% 10%, 96% 100%, 0% 92%)",
  "polygon(2% 12%, 88% 0%, 100% 82%, 14% 100%)",
  "polygon(8% 2%, 96% 8%, 92% 96%, 4% 90%)",
];

const RECT_SHAPE = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";

interface MorphImageProps extends Omit<ImageProps, "className"> {
  className?: string;
  imageClassName?: string;
  mode?: "ambient" | "hover";
  intervalMs?: number;
  /** Which blob preset to start on — lets siblings desync visually. */
  startIndex?: number;
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    query.addEventListener("change", handler);
    return () => query.removeEventListener("change", handler);
  }, []);

  return reduced;
}

export default function MorphImage({
  className = "",
  imageClassName = "",
  mode = "ambient",
  intervalMs = 3200,
  startIndex = 0,
  ...imageProps
}: MorphImageProps) {
  const reducedMotion = usePrefersReducedMotion();
  const [shapeIndex, setShapeIndex] = useState(startIndex % BLOB_SHAPES.length);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (mode !== "ambient" || reducedMotion) return;
    const id = window.setInterval(() => {
      setShapeIndex((i) => (i + 1) % BLOB_SHAPES.length);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [mode, intervalMs, reducedMotion]);

  const activeShape = reducedMotion
    ? RECT_SHAPE
    : mode === "ambient"
      ? BLOB_SHAPES[shapeIndex]
      : hovered
        ? BLOB_SHAPES[shapeIndex]
        : RECT_SHAPE;

  return (
    <div
      onMouseEnter={
        mode === "hover"
          ? () => {
              setShapeIndex((i) => (i + 1) % BLOB_SHAPES.length);
              setHovered(true);
            }
          : undefined
      }
      onMouseLeave={mode === "hover" ? () => setHovered(false) : undefined}
      className={`overflow-hidden transition-[clip-path] duration-[1200ms] ease-in-out ${className}`}
      style={{ clipPath: activeShape }}
    >
      <Image {...imageProps} className={imageClassName} />
    </div>
  );
}

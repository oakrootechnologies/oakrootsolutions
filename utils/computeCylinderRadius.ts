/**
 * Compute the radius for a cylindrical band of N panels with edge-to-edge alignment
 * Uses chord-based formula: r = W / (2 * sin(PI / N))
 * 
 * @param N - Number of panels
 * @param W - Panel width in pixels
 * @param spacingFactor - Multiplier for spacing adjustment (default 0.995 for seam removal)
 * @returns Radius in pixels (rounded to integer to avoid sub-pixel seams)
 * 
 * @example
 * ```ts
 * const radius = computeCylinderRadius(20, 320, 0.995);
 * // Returns approximately 1018px for 20 panels of 320px width
 * ```
 */
export function computeCylinderRadius(N: number, W: number, spacingFactor: number = 0.995): number {
  if (N < 3) {
    // Minimum radius for very small N to prevent division issues
    return 500;
  }
  
  // Chord-based radius formula for edge-to-edge alignment
  // r = W / (2 * sin(PI / N))
  const rawRadius = W / (2 * Math.sin(Math.PI / N));
  
  // Apply spacing factor and round to integer to avoid sub-pixel seams
  return Math.round(rawRadius * spacingFactor);
}






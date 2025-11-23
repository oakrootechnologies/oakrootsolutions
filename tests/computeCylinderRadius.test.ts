import { computeCylinderRadius } from '@/utils/computeCylinderRadius';

describe('computeCylinderRadius', () => {
  it('should compute correct radius for 20 panels of 320px width', () => {
    const radius = computeCylinderRadius(20, 320, 0.995);
    // Expected: 320 / (2 * sin(PI/20)) * 0.995 ≈ 1018px
    expect(radius).toBeGreaterThan(1000);
    expect(radius).toBeLessThan(1025);
  });

  it('should compute correct radius for 12 panels of 300px width', () => {
    const radius = computeCylinderRadius(12, 300, 0.995);
    // Expected: 300 / (2 * sin(PI/12)) * 0.995 ≈ 580px
    expect(radius).toBeGreaterThan(570);
    expect(radius).toBeLessThan(590);
  });

  it('should return minimum radius for N < 3', () => {
    const radius1 = computeCylinderRadius(2, 320, 0.995);
    const radius2 = computeCylinderRadius(1, 320, 0.995);
    expect(radius1).toBe(500);
    expect(radius2).toBe(500);
  });

  it('should apply spacing factor correctly', () => {
    const radius1 = computeCylinderRadius(20, 320, 1.0);
    const radius2 = computeCylinderRadius(20, 320, 0.995);
    expect(radius2).toBeLessThan(radius1);
  });

  it('should return integer values (no sub-pixel seams)', () => {
    const radius = computeCylinderRadius(20, 320, 0.995);
    expect(Number.isInteger(radius)).toBe(true);
  });

  it('should handle different panel widths', () => {
    const radius1 = computeCylinderRadius(20, 280, 0.995);
    const radius2 = computeCylinderRadius(20, 400, 0.995);
    expect(radius2).toBeGreaterThan(radius1);
  });

  it('should handle different numbers of panels', () => {
    const radius1 = computeCylinderRadius(10, 320, 0.995);
    const radius2 = computeCylinderRadius(30, 320, 0.995);
    // More panels = smaller radius for same width
    expect(radius2).toBeLessThan(radius1);
  });
});






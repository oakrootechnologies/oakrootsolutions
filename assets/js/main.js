/**
 * Main JavaScript file for Oakroot Website
 * Integrates Three.js and GSAP animations
 */

import * as THREE from 'three';
import { gsap } from 'gsap';

// Initialize Three.js scene (if needed)
import { initThreeScene } from './three-scene.js';

// Initialize animations
import { initAnimations } from './animations.js';

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
  console.log('Oakroot Website Initialized');
  
  // Initialize Three.js scene
  initThreeScene();
  
  // Initialize GSAP animations
  initAnimations();
});

// Export for use in WordPress if needed
window.Oakroot = {
  THREE,
  gsap,
};


/**
 * Three.js 3D Scene Setup
 * Inspired by clouarchitects.com's interactive 3D project ring
 */

import * as THREE from 'three';

let scene, camera, renderer;
let projectRing;

/**
 * Initialize Three.js scene
 */
export function initThreeScene() {
  const canvas = document.querySelector('#three-canvas');
  
  if (!canvas) {
    console.log('Three.js canvas not found, skipping 3D scene initialization');
    return;
  }

  // Create scene
  scene = new THREE.Scene();
  
  // Create camera
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  camera.position.z = 5;
  
  // Create renderer
  renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true,
  });
  renderer.setSize(width, height);
  renderer.setPixelRatio(window.devicePixelRatio);
  
  // Create project ring (placeholder - customize based on design)
  createProjectRing();
  
  // Handle window resize
  window.addEventListener('resize', onWindowResize);
  
  // Start animation loop
  animate();
}

/**
 * Create the 3D project ring
 * Customize this based on the actual design requirements
 */
function createProjectRing() {
  const geometry = new THREE.TorusGeometry(2, 0.3, 16, 100);
  const material = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.8,
    roughness: 0.2,
  });
  
  projectRing = new THREE.Mesh(geometry, material);
  scene.add(projectRing);
  
  // Add lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);
  
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(5, 5, 5);
  scene.add(directionalLight);
}

/**
 * Animation loop
 */
function animate() {
  requestAnimationFrame(animate);
  
  if (projectRing) {
    projectRing.rotation.x += 0.01;
    projectRing.rotation.y += 0.01;
  }
  
  renderer.render(scene, camera);
}

/**
 * Handle window resize
 */
function onWindowResize() {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}


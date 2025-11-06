/**
 * GSAP Animations
 * Sophisticated text and element animations inspired by clouarchitects.com
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

/**
 * Initialize all GSAP animations
 */
export function initAnimations() {
  // Animate text on load
  animateTextOnLoad();
  
  // Scroll-triggered animations
  setupScrollAnimations();
  
  // Parallax effects
  setupParallaxEffects();
}

/**
 * Animate text elements on page load
 */
function animateTextOnLoad() {
  // Animate headings
  gsap.from('.animate-text', {
    duration: 1,
    y: 50,
    opacity: 0,
    stagger: 0.2,
    ease: 'power3.out',
  });
  
  // Animate paragraphs
  gsap.from('.animate-paragraph', {
    duration: 1.2,
    y: 30,
    opacity: 0,
    delay: 0.3,
    ease: 'power2.out',
  });
}

/**
 * Setup scroll-triggered animations
 */
function setupScrollAnimations() {
  // Fade in elements on scroll
  gsap.utils.toArray('.fade-in-on-scroll').forEach((element) => {
    gsap.fromTo(
      element,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  });
  
  // Slide in from sides
  gsap.utils.toArray('.slide-in-left').forEach((element) => {
    gsap.fromTo(
      element,
      {
        x: -100,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
        },
      }
    );
  });
  
  gsap.utils.toArray('.slide-in-right').forEach((element) => {
    gsap.fromTo(
      element,
      {
        x: 100,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
        },
      }
    );
  });
}

/**
 * Setup parallax effects
 */
function setupParallaxEffects() {
  gsap.utils.toArray('.parallax-element').forEach((element) => {
    gsap.to(element, {
      yPercent: -50,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  });
}

/**
 * Smooth scroll for navigation links
 */
export function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        gsap.to(window, {
          duration: 1,
          scrollTo: {
            y: target,
            offsetY: 80,
          },
          ease: 'power2.inOut',
        });
      }
    });
  });
}


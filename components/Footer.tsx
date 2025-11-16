'use client';

import Link from 'next/link';
import { FaLinkedinIn, FaInstagram, FaTwitter, FaFacebookF, FaYoutube } from 'react-icons/fa';

export default function Footer() {
  const servicesLinks = [
    { name: 'Web Design', href: '/services/web-design' },
    { name: 'Digital Marketing', href: '/services/digital-marketing' },
    { name: 'App Development', href: '/services/app-development' },
    { name: 'Branding', href: '/services/branding' },
    { name: 'Graphic Design', href: '/services/graphic-design' },
    { name: 'Video & Photo', href: '/services/video-photo' },
  ];

  const aboutLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Our Talent', href: '/talent' },
    { name: 'Careers', href: '/careers' },
    { name: 'Contact Us', href: '/contact' },
  ];

  return (
    <footer className="w-full bg-black text-white px-4 py-12 lg:px-16 lg:pt-24 lg:pb-12">
      {/* Top Section Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 lg:gap-12 mb-8 lg:mb-16">
        {/* Brand Column (Column 1) - Spans 2 columns on large screens */}
        <div className="lg:col-span-2">
          {/* Logo */}
          <h2 className="text-2xl lg:text-3xl font-bold text-white">OAKROOT</h2>
          
          {/* Slogan */}
          <p className="mt-4 lg:mt-6 text-base lg:text-lg text-neutral-300 max-w-sm">
            Elevating Brands Through Creative Strategy & Conversion-Focused Marketing
          </p>

          {/* Demo Button */}
          <Link
            href="/contact"
            className="mt-6 lg:mt-8 inline-block bg-white text-black font-semibold rounded-full py-2.5 px-6 lg:py-3 lg:px-8 hover:bg-neutral-100 transition-colors text-sm lg:text-base"
          >
            Book a Demo
          </Link>
        </div>

        {/* Services Column (Column 2) */}
        <div className="flex flex-col">
          <h3 className="font-semibold text-neutral-400 mb-4">Services</h3>
          <ul className="flex flex-col gap-3">
            {servicesLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="text-white hover:text-neutral-300 transition-colors"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* About Column (Column 3) */}
        <div className="flex flex-col">
          <h3 className="font-semibold text-neutral-400 mb-4">About</h3>
          <ul className="flex flex-col gap-3">
            {aboutLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="text-white hover:text-neutral-300 transition-colors"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full border-t border-neutral-800" />

      {/* Sub-Footer */}
      <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4 mt-8">
        {/* Copyright Text */}
        <p className="text-sm text-neutral-400">
          © 2025 Oakroot Solutions. All rights reserved.
        </p>

        {/* Social Icons */}
        <div className="flex flex-row gap-5">
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-400 text-xl hover:text-white transition-colors"
            aria-label="LinkedIn"
          >
            <FaLinkedinIn />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-400 text-xl hover:text-white transition-colors"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-400 text-xl hover:text-white transition-colors"
            aria-label="Twitter"
          >
            <FaTwitter />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-400 text-xl hover:text-white transition-colors"
            aria-label="Facebook"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-400 text-xl hover:text-white transition-colors"
            aria-label="YouTube"
          >
            <FaYoutube />
          </a>
        </div>
      </div>
    </footer>
  );
}


# Quick Start Guide

## ✅ Dependencies Installed

All JavaScript dependencies have been successfully installed:

- ✅ **Three.js** (v0.168.0) - For 3D graphics and interactive elements
- ✅ **GSAP** (v3.13.0) - For animations
- ✅ **GSAP ScrollTrigger** - For scroll-based animations
- ✅ **GSAP ScrollToPlugin** - For smooth scrolling

## 📁 Project Structure

```
oakroot/
├── assets/
│   ├── js/
│   │   ├── main.js          # Main entry point
│   │   ├── three-scene.js   # Three.js 3D scene setup
│   │   └── animations.js    # GSAP animations
│   ├── css/
│   │   └── style.css        # Main stylesheet
│   └── images/             # Image assets folder
├── dist/
│   └── bundle.js           # Built JavaScript bundle (ready for WordPress)
├── node_modules/           # Installed dependencies
├── package.json            # Project configuration
├── webpack.config.js       # Webpack build configuration
└── README.md               # Full documentation
```

## 🚀 Next Steps

### For WordPress Integration:

1. **Build the bundle** (already done):
   ```bash
   npm run build
   ```

2. **Follow WordPress Integration Guide**:
   - See `wordpress-integration.md` for detailed instructions
   - Copy `dist/bundle.js` and `assets/` folder to your WordPress theme
   - Add enqueue code to `functions.php`

3. **Install WordPress Plugins**:
   - **WPML**: https://wpml.org/ (for multilingual support)
   - **Bricks Builder**: https://bricksbuilder.io/ (for page building)

### For Development:

1. **Development mode with hot reload**:
   ```bash
   npm run dev
   ```

2. **Test the sample HTML**:
   - Open `sample-html.html` in a browser
   - Make sure `dist/bundle.js` exists (run `npm run build` first)

3. **Watch mode for auto-building**:
   ```bash
   npm run watch
   ```

## 📝 Important Notes

- The bundle size is ~787KB (includes Three.js + GSAP) - this is normal
- WordPress plugins (WPML, Bricks Builder) must be installed separately in WordPress
- JavaScript libraries are ready to use in your WordPress theme
- See `wordpress-integration.md` for complete WordPress setup instructions

## 🎨 Animation Classes

Use these CSS classes in your HTML/WordPress content:

- `.animate-text` - Animates on page load
- `.animate-paragraph` - Animates paragraphs on load
- `.fade-in-on-scroll` - Fades in when scrolled into view
- `.slide-in-left` - Slides in from left
- `.slide-in-right` - Slides in from right
- `.parallax-element` - Parallax scrolling effect

## 🔗 Reference Websites

- **clouarchitects.com** - Inspiration for 3D ring and GSAP animations
- **designindc.com** - Inspiration for Bricks Builder layout


# 🚀 NEXUS DRINKS - Futuristic 3D Landing Page

A premium drinks website featuring cutting-edge 3D animations, zero-gravity bottle effects, and cosmic visual design. Built for Gen-Z and trendsetters who appreciate innovative digital experiences.

## ✨ Features

### 🎯 Core Design Elements
- **3D Floating Bottles**: Zero-gravity bottles with glowing liquid swirling inside
- **Neon UI Elements**: Sleek glass morphism navigation and interface components
- **Cosmic Background**: Moody gradient galaxy atmosphere with particle effects
- **Interactive Animations**: Mouse-responsive 3D objects and smooth scroll effects
- **Modern Typography**: Orbitron and Exo 2 fonts for futuristic aesthetics

### 🌈 Color Palette
- **Electric Blue** (#00f5ff) - Primary accent color
- **Violet** (#8000ff) - Secondary cosmic accent
- **Magenta** (#ff0080) - Energy accent
- **Soft Cyan** (#00ffff) - Liquid effects
- **Deep Space Gradients** - Background atmosphere

### 🔧 Technical Features
- **Three.js 3D Graphics**: Real-time 3D bottle rendering with physics-based materials
- **GSAP Animations**: Smooth, performant animations and scroll triggers
- **Glass Morphism**: Modern translucent UI elements with backdrop blur
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Particle System**: Dynamic cosmic particle effects
- **Shader Materials**: Custom fragment and vertex shaders for special effects

### 🎮 Interactive Elements
- **Mouse Tracking**: 3D objects respond to cursor movement
- **Scroll Animations**: Parallax and reveal effects triggered by scroll position
- **Hover Effects**: Collection items with dynamic glow effects
- **Smooth Navigation**: Animated scrolling between sections
- **Flavor Cycling**: Automatic rotation of drink flavors with color indicators

## 🛠️ Technologies Used

- **HTML5**: Semantic structure and accessibility
- **CSS3**: Advanced animations, gradients, and glass morphism effects
- **JavaScript ES6+**: Modern JavaScript with modules and async/await
- **Three.js**: 3D graphics and WebGL rendering
- **GSAP**: Professional-grade animation library
- **ScrollTrigger**: Scroll-based animation triggers
- **Web Fonts**: Google Fonts integration (Orbitron, Exo 2)

## 🚀 Getting Started

### Prerequisites
- Modern web browser with WebGL support
- Node.js (for development server)

### Installation

1. **Clone or download the project**
   ```bash
   # If using git
   git clone <repository-url>
   cd futuristic-drinks-landing
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   - Navigate to `http://localhost:5173` (or the port shown in terminal)
   - For direct file access, open `index.html` in a modern browser

### Alternative Setup (No Build Tools)
Simply open `index.html` directly in a modern browser. All dependencies are loaded via CDN.

## 📁 Project Structure

```
futuristic-drinks-landing/
├── index.html          # Main HTML structure
├── styles.css          # Complete CSS with animations and effects
├── script.js           # JavaScript with Three.js and GSAP
├── package.json        # Project dependencies and scripts
└── README.md          # Project documentation
```

## 🎨 Design Philosophy

### Gen-Z Aesthetic
- **Bold Typography**: Large, impactful headings with gradient effects
- **Neon Accents**: Electric blue and violet color scheme
- **Glass Elements**: Modern translucent UI components
- **Immersive Experience**: Full-screen 3D environment

### User Experience
- **Progressive Disclosure**: Content reveals as users scroll
- **Visual Hierarchy**: Clear navigation and call-to-action placement
- **Performance First**: Optimized animations and efficient rendering
- **Accessibility**: Semantic HTML and keyboard navigation support

## 🌟 Key Sections

1. **Hero Section**
   - Animated title reveal with staggered timing
   - Floating 3D bottles in background
   - Primary and secondary CTA buttons
   - Stats indicators and flavor selectors

2. **Collection Preview**
   - Three featured drink variants
   - Interactive hover effects
   - Cosmic-themed product presentation

3. **Floating UI Elements**
   - Purity and gravity stats display
   - Flavor indicator with cycling colors
   - Scroll progression indicator

## 🔧 Customization

### Colors
Modify the CSS custom properties in `styles.css`:
```css
:root {
  --primary-cyan: #00f5ff;
  --secondary-violet: #8000ff;
  --accent-magenta: #ff0080;
}
```

### 3D Objects
Adjust bottle positioning and animation in `script.js`:
```javascript
// Modify bottle floating behavior
bottle.userData = {
    floatSpeed: 0.5,      // Animation speed
    amplitude: 2,         // Float distance
    rotationSpeed: 0.01   // Rotation speed
};
```

### Content
Update text content directly in `index.html` or add new sections following the existing structure.

## 📱 Browser Support

- **Chrome/Edge**: Full support for all features
- **Firefox**: Full support for all features
- **Safari**: Full support (iOS 12+)
- **Mobile**: Optimized responsive design

## 🎯 Performance Optimizations

- **Efficient Rendering**: Limited particle count and optimized shaders
- **Responsive Images**: Scalable vector graphics and CSS gradients
- **Code Splitting**: Modular JavaScript structure
- **Memory Management**: Proper cleanup of Three.js resources

## 🚀 Future Enhancements

- **WebXR Support**: VR/AR integration for immersive experiences
- **Audio Integration**: Spatial audio effects synchronized with animations
- **Product Configurator**: Interactive drink customization
- **E-commerce Integration**: Shopping cart and checkout functionality
- **Social Sharing**: Instagram-worthy screenshot generation

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Feel free to submit issues, fork the repository, and create pull requests for any improvements.

---

**Built with ❤️ for the future of web experiences**


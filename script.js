// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Global variables
let scene, camera, renderer, bottles = [], particles = [], mixer;
let mouseX = 0, mouseY = 0;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    initThreeJS();
    initAnimations();
    initScrollEffects();
    initInteractivity();
});

// Three.js Initialization
function initThreeJS() {
    const container = document.getElementById('three-container');
    
    // Scene setup
    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x0a0a0f, 50, 200);
    
    // Camera setup
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;
    
    // Renderer setup
    renderer = new THREE.WebGLRenderer({ 
        alpha: true, 
        antialias: true,
        powerPreference: "high-performance"
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);
    
    // Lighting setup
    setupLighting();
    
    // Create bottles
    createBottles();
    
    // Create particle system
    createParticleSystem();
    
    // Start animation loop
    animate();
    
    // Handle window resize
    window.addEventListener('resize', onWindowResize);
    document.addEventListener('mousemove', onMouseMove);
}

// Lighting setup
function setupLighting() {
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
    scene.add(ambientLight);
    
    // Main directional light
    const directionalLight = new THREE.DirectionalLight(0x00f5ff, 1);
    directionalLight.position.set(10, 10, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);
    
    // Neon accent lights
    const neonLight1 = new THREE.PointLight(0x8000ff, 1, 100);
    neonLight1.position.set(-20, 10, 10);
    scene.add(neonLight1);
    
    const neonLight2 = new THREE.PointLight(0xff0080, 0.8, 100);
    neonLight2.position.set(20, -10, 5);
    scene.add(neonLight2);
    
    const neonLight3 = new THREE.PointLight(0x00ffff, 0.6, 100);
    neonLight3.position.set(0, 15, -10);
    scene.add(neonLight3);
}

// Create floating bottles
function createBottles() {
    const bottleGeometry = createBottleGeometry();
    
    // Bottle materials with different colors
    const materials = [
        createBottleMaterial(0x00f5ff, 'Cosmic Blue'),
        createBottleMaterial(0x8000ff, 'Violet Nebula'),
        createBottleMaterial(0x00ffff, 'Cyan Storm')
    ];
    
    for (let i = 0; i < 3; i++) {
        const bottle = new THREE.Group();
        
        // Bottle body
        const bottleMesh = new THREE.Mesh(bottleGeometry, materials[i]);
        bottleMesh.castShadow = true;
        bottleMesh.receiveShadow = true;
        bottle.add(bottleMesh);
        
        // Liquid inside bottle
        const liquidGeometry = new THREE.SphereGeometry(0.8, 16, 16);
        const liquidMaterial = new THREE.MeshPhongMaterial({
            color: materials[i].color,
            transparent: true,
            opacity: 0.6,
            shininess: 100
        });
        const liquid = new THREE.Mesh(liquidGeometry, liquidMaterial);
        liquid.position.y = -0.5;
        bottle.add(liquid);
        
        // Position bottles
        bottle.position.x = (i - 1) * 15 + (Math.random() - 0.5) * 5;
        bottle.position.y = Math.random() * 10 - 5;
        bottle.position.z = Math.random() * 20 - 10;
        
        // Random rotation
        bottle.rotation.x = Math.random() * Math.PI;
        bottle.rotation.y = Math.random() * Math.PI;
        bottle.rotation.z = Math.random() * Math.PI;
        
        // Store animation properties
        bottle.userData = {
            originalPosition: bottle.position.clone(),
            floatSpeed: 0.5 + Math.random() * 0.5,
            rotationSpeed: 0.01 + Math.random() * 0.01,
            amplitude: 2 + Math.random() * 3
        };
        
        bottles.push(bottle);
        scene.add(bottle);
    }
}

// Create bottle geometry
function createBottleGeometry() {
    const shape = new THREE.Shape();
    
    // Bottle outline
    shape.moveTo(0, -3);
    shape.lineTo(1.5, -3);
    shape.lineTo(1.5, 1);
    shape.lineTo(1, 1.5);
    shape.lineTo(1, 2);
    shape.lineTo(0.5, 2.5);
    shape.lineTo(0.5, 3);
    shape.lineTo(-0.5, 3);
    shape.lineTo(-0.5, 2.5);
    shape.lineTo(-1, 2);
    shape.lineTo(-1, 1.5);
    shape.lineTo(-1.5, 1);
    shape.lineTo(-1.5, -3);
    shape.lineTo(0, -3);
    
    const extrudeSettings = {
        depth: 0.5,
        bevelEnabled: true,
        bevelSegments: 2,
        steps: 2,
        bevelSize: 0.1,
        bevelThickness: 0.1
    };
    
    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
}

// Create bottle material
function createBottleMaterial(color, name) {
    return new THREE.MeshPhysicalMaterial({
        color: color,
        metalness: 0.1,
        roughness: 0.1,
        transmission: 0.9,
        transparent: true,
        opacity: 0.8,
        reflectivity: 1,
        envMapIntensity: 1,
        clearcoat: 1,
        clearcoatRoughness: 0
    });
}

// Create particle system
function createParticleSystem() {
    const particleCount = 200;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    
    const colorPalette = [
        new THREE.Color(0x00f5ff),
        new THREE.Color(0x8000ff),
        new THREE.Color(0xff0080),
        new THREE.Color(0x00ffff)
    ];
    
    for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        
        // Random positions
        positions[i3] = (Math.random() - 0.5) * 100;
        positions[i3 + 1] = (Math.random() - 0.5) * 100;
        positions[i3 + 2] = (Math.random() - 0.5) * 100;
        
        // Random colors
        const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
        colors[i3] = color.r;
        colors[i3 + 1] = color.g;
        colors[i3 + 2] = color.b;
        
        // Random sizes
        sizes[i] = Math.random() * 3 + 1;
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    
    const material = new THREE.ShaderMaterial({
        uniforms: {
            time: { value: 0 }
        },
        vertexShader: `
            attribute float size;
            varying vec3 vColor;
            uniform float time;
            
            void main() {
                vColor = color;
                vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                gl_PointSize = size * (300.0 / -mvPosition.z) * (1.0 + sin(time + position.x * 0.01) * 0.5);
                gl_Position = projectionMatrix * mvPosition;
            }
        `,
        fragmentShader: `
            varying vec3 vColor;
            
            void main() {
                float dist = distance(gl_PointCoord, vec2(0.5));
                if (dist > 0.5) discard;
                float alpha = 1.0 - (dist * 2.0);
                gl_FragColor = vec4(vColor, alpha * 0.8);
            }
        `,
        transparent: true,
        vertexColors: true,
        blending: THREE.AdditiveBlending
    });
    
    const particleSystem = new THREE.Points(geometry, material);
    particles.push(particleSystem);
    scene.add(particleSystem);
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    
    const time = Date.now() * 0.001;
    
    // Animate bottles
    bottles.forEach((bottle, index) => {
        const userData = bottle.userData;
        
        // Floating motion
        bottle.position.y = userData.originalPosition.y + 
            Math.sin(time * userData.floatSpeed + index) * userData.amplitude;
        
        // Gentle rotation
        bottle.rotation.x += userData.rotationSpeed;
        bottle.rotation.y += userData.rotationSpeed * 0.7;
        bottle.rotation.z += userData.rotationSpeed * 0.3;
        
        // Mouse interaction
        const mouseInfluence = 0.0005;
        bottle.rotation.y += mouseX * mouseInfluence;
        bottle.rotation.x += mouseY * mouseInfluence;
    });
    
    // Animate particles
    particles.forEach(particleSystem => {
        particleSystem.rotation.y += 0.002;
        particleSystem.material.uniforms.time.value = time;
        
        // Particle floating
        const positions = particleSystem.geometry.attributes.position.array;
        for (let i = 0; i < positions.length; i += 3) {
            positions[i + 1] += Math.sin(time + positions[i] * 0.01) * 0.01;
        }
        particleSystem.geometry.attributes.position.needsUpdate = true;
    });
    
    // Camera movement based on mouse
    camera.position.x += (mouseX * 0.01 - camera.position.x) * 0.05;
    camera.position.y += (-mouseY * 0.01 - camera.position.y) * 0.05;
    camera.lookAt(scene.position);
    
    renderer.render(scene, camera);
}

// GSAP Animations
function initAnimations() {
    // Animate UI elements on load
    gsap.from('.nav-container', {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: 'power2.out'
    });
    
    // Animate floating UI elements
    gsap.from('.ui-element', {
        scale: 0,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        delay: 1,
        ease: 'back.out(1.7)'
    });
    
    // Continuous floating animation for UI elements
    gsap.to('.ui-stats', {
        y: '+=10',
        duration: 3,
        yoyo: true,
        repeat: -1,
        ease: 'power1.inOut'
    });
    
    gsap.to('.ui-flavor', {
        y: '-=15',
        duration: 4,
        yoyo: true,
        repeat: -1,
        ease: 'power1.inOut',
        delay: 1
    });
    
    // Flavor dot cycling
    const flavorDots = document.querySelectorAll('.flavor-dot');
    let currentDot = 0;
    
    setInterval(() => {
        flavorDots.forEach(dot => dot.classList.remove('active'));
        flavorDots[currentDot].classList.add('active');
        currentDot = (currentDot + 1) % flavorDots.length;
        
        // Update flavor text
        const flavorTexts = ['Cosmic Blue', 'Violet Nebula', 'Cyan Storm'];
        document.querySelector('.flavor-text').textContent = flavorTexts[currentDot];
    }, 2000);
}

// Scroll-triggered animations
function initScrollEffects() {
    // Hero section parallax
    gsap.to('.hero-content', {
        y: -100,
        opacity: 0.5,
        scrollTrigger: {
            trigger: '.hero-section',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
        }
    });
    
    // Collection items animation
    gsap.from('.collection-item', {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
            trigger: '.collection-section',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        }
    });
    
    // Section title reveal
    gsap.from('.section-title', {
        scale: 0.5,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
            trigger: '.section-title',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });
    
    // Bottle movement on scroll
    ScrollTrigger.create({
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: self => {
            const progress = self.progress;
            bottles.forEach((bottle, index) => {
                bottle.position.z = -10 + progress * 20;
                bottle.rotation.y += 0.01 * (index + 1);
            });
        }
    });
}

// Interactive features
function initInteractivity() {
    // Navigation link smooth scrolling
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                gsap.to(window, {
                    scrollTo: target,
                    duration: 1.5,
                    ease: 'power2.inOut'
                });
            }
        });
    });
    
    // CTA button interactions
    document.querySelectorAll('.cta-primary, .nav-order-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            // Add purchase logic here
            gsap.to(btn, {
                scale: 0.95,
                duration: 0.1,
                yoyo: true,
                repeat: 1
            });
            
            // Show success message or redirect
            console.log('Order button clicked - implement purchase flow');
        });
    });
    
    // Collection item hover effects
    document.querySelectorAll('.collection-item').forEach(item => {
        item.addEventListener('mouseenter', () => {
            gsap.to(item.querySelector('.item-glow'), {
                scale: 1.2,
                duration: 0.3
            });
        });
        
        item.addEventListener('mouseleave', () => {
            gsap.to(item.querySelector('.item-glow'), {
                scale: 1,
                duration: 0.3
            });
        });
    });
    
    // Navbar background on scroll
    ScrollTrigger.create({
        start: 'top -50',
        end: 99999,
        toggleClass: {
            targets: '.glass-nav',
            className: 'scrolled'
        }
    });
}

// Event handlers
function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onMouseMove(event) {
    mouseX = (event.clientX - windowHalfX) / windowHalfX;
    mouseY = (event.clientY - windowHalfY) / windowHalfY;
}

// Add additional CSS for scrolled navbar
const style = document.createElement('style');
style.textContent = `
    .glass-nav.scrolled {
        background: rgba(10, 10, 15, 0.9);
        backdrop-filter: blur(30px);
        border-bottom-color: rgba(0, 245, 255, 0.4);
    }
`;
document.head.appendChild(style);
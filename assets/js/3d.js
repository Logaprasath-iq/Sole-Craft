// Sole Craft 3D Parallax & Particle Engine

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('canvas-3d');
  const shoeWrapper = document.querySelector('.interactive-shoe-wrapper');
  const shoeImgContainer = document.querySelector('.shoe-image-container');

  // 1. WebGL Background Particle Sparkles (Three.js)
  if (container && typeof THREE !== 'undefined') {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Particles
    const particleCount = 100;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 6; // X
      positions[i + 1] = (Math.random() - 0.5) * 6; // Y
      positions[i + 2] = (Math.random() - 0.5) * 6; // Z
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: 0xD4AF37, // Gold sparkles
      size: 0.05,
      transparent: true,
      opacity: 0.8
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Animation Loop
    const clock = new THREE.Clock();

    function animate() {
      requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();
      
      // Rotate particle field slowly
      particles.rotation.y = elapsed * 0.04;
      particles.rotation.x = elapsed * 0.02;

      renderer.render(scene, camera);
    }
    animate();

    // Resize Handler
    window.addEventListener('resize', () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    });
  }

  // 2. 3D Parallax Mouse Tilt for the Shoe
  if (shoeWrapper && shoeImgContainer) {
    shoeWrapper.addEventListener('mousemove', (e) => {
      const rect = shoeWrapper.getBoundingClientRect();
      
      // Calculate mouse coordinates relative to the element (from -1 to 1)
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      // Apply 3D rotation based on mouse coordinates
      const maxRotateX = 25; // max rotation degrees
      const maxRotateY = 25;
      
      const rotateX = -y * maxRotateX;
      const rotateY = x * maxRotateY;

      shoeImgContainer.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });

    shoeWrapper.addEventListener('mouseleave', () => {
      // Smoothly return to center
      shoeImgContainer.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
      shoeImgContainer.style.transition = 'transform 0.5s ease-out';
    });

    shoeWrapper.addEventListener('mouseenter', () => {
      // Disable transition delay during active tracking
      shoeImgContainer.style.transition = 'transform 0.05s ease-out';
    });
  }
});

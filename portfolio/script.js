// Mobile nav toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu  = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('show');
});

// Close mobile menu when a link is clicked
document.querySelectorAll('#nav-menu a').forEach(a=>{
  a.addEventListener('click', () => navMenu.classList.remove('show'));
});

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor=>{
  anchor.addEventListener('click', function(e){
    const target = document.querySelector(this.getAttribute('href'));
    if(target){
      e.preventDefault();
      target.scrollIntoView({behavior:'smooth', block:'start'});
    }
  });
});
let scene, camera, renderer, robot;
let mouseX = 0, mouseY = 0;

// Init Scene
scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
camera.position.set(0, 1.5, 3);

renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('robotCanvas'), alpha: true });
renderer.setSize(300, 300);
renderer.setPixelRatio(window.devicePixelRatio);

// Light
const light = new THREE.HemisphereLight(0xffffff, 0x444444, 1);
scene.add(light);

const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(5, 10, 7.5);
scene.add(dirLight);

// Load Robot Model
const loader = new THREE.GLTFLoader();
loader.load('cute-robot-companion.glb', (gltf) => {
    robot = gltf.scene;
    robot.scale.set(1.2, 1.2, 1.2);
    scene.add(robot);
}, undefined, (error) => {
    console.error('Error loading robot:', error);
});

// Mouse Tracking
document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
    mouseY = -(event.clientY / window.innerHeight - 0.5) * 2;
});

// Animate
function animate() {
    requestAnimationFrame(animate);

    if (robot) {
        robot.rotation.y += (mouseX * Math.PI / 4 - robot.rotation.y) * 0.05;
        robot.rotation.x += (mouseY * Math.PI / 8 - robot.rotation.x) * 0.05;
        robot.position.y = Math.sin(Date.now() * 0.002) * 0.05; // Floating
    }

    renderer.render(scene, camera);
}

animate();

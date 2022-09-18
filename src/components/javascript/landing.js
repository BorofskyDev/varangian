import * as THREE from 'three';
import wood from '../../assets/textures/ball2.png'

// LOAD
const textureLoader = new THREE.TextureLoader()

const normalTexture = textureLoader.load(wood)

// Canvas
const canvas = document.querySelector('canvas')

// SCENE

const scene = new THREE.Scene();

// Objects
const sphereGeometry = new THREE.SphereGeometry(1, 64, 64);

// MATERIALS

const material = new THREE.MeshStandardMaterial();
material.metalness = 0.1;
material.roughness = 0.2;
material.normalMap = normalTexture;

material.color = new THREE.Color(0x292929);

// MESH
const sphere = new THREE.Mesh(sphereGeometry, material);
sphere.position.set(1, 0, -1) 
scene.add(sphere);

// LIGHT 1
const pointLight1 = new THREE.PointLight(0x40c1ac, 2);
pointLight1.position.set(0, -6.5, -1);
pointLight1.intensity = 2;

scene.add(pointLight1);

// LIGHT 2
const pointLight2 = new THREE.PointLight(0x40c1ac, 2);
pointLight2.position.set(0, -6.5, -1);
pointLight2.intensity = 2;

scene.add(pointLight2);

// LIGHT 2
const pointLight3 = new THREE.PointLight(0x6b40c1, 2);
pointLight3.position.set(-6.5, 0, -3);
pointLight3.intensity = 2;

scene.add(pointLight3);

// LIGHT 2
const pointLight4 = new THREE.PointLight(0x7a0021, 2);
pointLight4.position.set(6.5, 0, 0);
pointLight4.intensity = 2;

scene.add(pointLight4);



const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 2;
scene.add(camera);

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  // MAKE THREEJS BACKGROUND TRANSPARENT
  alpha: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */

document.addEventListener('mousemove', onDocumentMouseMove);

let mouseX = 0;
let mouseY = 0;

let targetX = 0;
let targetY = 0;

const windowX = window.innerWidth / 2;
const windowY = window.innerHeight / 2;

function onDocumentMouseMove(event) {
  mouseX = event.clientX - windowX;
  mouseY = event.clientY - windowY;
}

const updateSphere = (event) => {
  sphere.position.y = window.scrollY * 0.001;
};

window.addEventListener('scroll', updateSphere);

const clock = new THREE.Clock();

const tick = () => {
  targetX = mouseX * 0.001;
  targetY = mouseY * 0.001;

  const elapsedTime = clock.getElapsedTime();

  // Update objects
  sphere.rotation.y = 0.2 * elapsedTime;

  sphere.rotation.y += 0.05 * (targetX - sphere.rotation.y);
  sphere.rotation.x += 0.05 * (targetX - sphere.rotation.x);
//   sphere.position.z += -0.01 * (targetY - sphere.rotation.x);

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
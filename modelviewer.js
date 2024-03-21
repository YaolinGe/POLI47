// Import necessary components from Three.js
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

// Initialize the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add some ambient light
const ambientLight = new THREE.AmbientLight(0x404040); // Soft white light
scene.add(ambientLight);

// Optionally, add a directional light for better visibility
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 3, 5);
scene.add(directionalLight);

// Initialize GLTFLoader
const loader = new GLTFLoader();
loader.load(
    'chapel.glb', // Update this path to your GLB file's location
    function (gltf) {
        scene.add(gltf.scene); // Add the loaded scene to the scene

        // Optional: Adjust the model position
        gltf.scene.position.set(0, 0, 0);

        // Optional: This is a good place to start any animations if your model has them
        // animateModel(gltf);
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded'); // Optional: Console log to show the loading progress
    },
    function (error) {
        console.error('An error happened', error); // Log errors if the model fails to load
    }
);

// Set the camera position back a bit so we can view the model
camera.position.z = 5;

// Animation loop to render the scene and camera
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();

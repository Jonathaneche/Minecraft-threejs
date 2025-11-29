import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import Stats from 'three/examples/jsm/libs/stats.module.js'
import { World } from './world';
import { createUI } from './ui';
import { Player } from './player';

//Stats
const stats = new Stats();
document.body.appendChild(stats.dom);

// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x80a0e0);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

//Setup camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight);
camera.position.set(-32, 16, -32)

//Control Setup
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.target.set(16, 0, 16);
controls.update();

//Scene setup
const scene = new THREE.Scene();
const world = new World();
world.generate();
scene.add(world);

// Player
const player = new Player(scene)


//Lights
function setupLights() {
    const sun = new THREE.DirectionalLight();
    sun.position.set(50, 50, 50);
    sun.castShadow = true;
    sun.shadow.camera.left = -50;
    sun.shadow.camera.right = 50;
    sun.shadow.camera.bottom = -50;
    sun.shadow.camera.top = 50;
    sun.shadow.camera.near = -0.1;
    sun.shadow.camera.far = 100;
    sun.shadow.bias = -0.00005;
    sun.shadow.mapSize = new THREE.Vector2(512, 512);
    scene.add(sun);

    //const shadowHelper = new THREE.CameraHelper(sun.shadow.camera);

    const ambient = new THREE.AmbientLight();
    ambient.intensity = 0.1;
    scene.add(ambient);
}

//Render loop
let previousTime = performance.now();
function animate() {
    let currentTime = performance.now()
    let dt = (currentTime - previousTime) / 1000;
    requestAnimationFrame(animate)
    player.applyInputs(dt);
    renderer.render(scene, player.camera);
    stats.update();
    controls.update();

    previousTime = currentTime;
}

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth /  window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    //controls.update()
})

setupLights();
createUI(world);
animate();


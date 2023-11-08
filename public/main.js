// Import the required Three.js modules
import * as THREE from "three";
import { getOrbitalCamera, getPerspectiveCamera } from "./helpers.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FlyControls } from "three/examples/jsm/controls/FlyControls";
import { getGuiControls } from "./gui.js";
import { Planet, getSun } from "./spaceObjects.js";

// Globals
const guiControls = getGuiControls();
let t0 = new Date();

let scene, renderer;
let camera;

const camControls = {
  orbitControl: null,
  flyControl: null,
};
const cameras = {
  oCamera: null,
  pCamera: null,
};

let sun;
let planets = [];

// Start functions
init();
animate();

// Init function
function init() {
  // Main scene
  scene = new THREE.Scene();

  // Renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Cameras and Controls
  // Perspective
  cameras.pCamera = getPerspectiveCamera(THREE, 75);
  // Set the camera position
  cameras.pCamera.position.z = 5;
  scene.add(cameras.pCamera);
  // Set Flight Controls
  camControls.flyControl = new FlyControls(
    cameras.pCamera,
    renderer.domElement
  );
  camControls.flyControl.dragToLook = true;
  camControls.flyControl.movementSpeed = guiControls.movementSpeed / 1000;
  camControls.flyControl.rollSpeed = guiControls.rollSpeed / 1000;

  // Orbital
  cameras.oCamera = getOrbitalCamera(THREE, 0, 0, 5);
  scene.add(cameras.oCamera);

  // Create a controls object for the orbital camera
  camControls.orbitControl = new OrbitControls(
    cameras.oCamera,
    renderer.domElement
  );
  // Add Light
  // Create an ambient light
  const ambientLight = new THREE.AmbientLight(0x404040, 0.5); // Set the color and intensity

  // Add the ambient light to the scene
  scene.add(ambientLight);
  // Add SunLight
  const sunLight = new THREE.SpotLight(0xffffff, 1);
  sunLight.position.set(0, 0, 0);
  sunLight.angle = Math.PI;
  sunLight.distance = 1000;
  sunLight.castShadow = true;
  sunLight.shadow.mapSize.width = 1024; // Adjust as needed
  sunLight.shadow.mapSize.height = 1024; // Adjust as needed
  sunLight.shadow.radius = 1; // This sets the shadow quality

  scene.add(sunLight);

  // Planitarium
  // Can't add sun, it blocks the light.... not sure of the solution

  sun = getSun(THREE);
  //sun = { position: { x: 0, y: 0 } };
  scene.add(sun);
  planets.push(sun);

  // Planets
  // THREE, scene, radius, textureName, orbitalBody, distance, speed, f1, f2
  const earth = new Planet(THREE, scene, 0.3, "earth", sun, 2, 0.5, 1, 1.5);
  planets.push(earth);

  const moon = new Planet(THREE, scene, 0.05, "moon", earth.mesh, 0.5, 1, 2, 1);
  planets.push(moon);

  const mars = new Planet(THREE, scene, 0.25, "mars", sun, 4, 0.21, 1, 2);
  planets.push(mars);

  const neptune = new Planet(THREE, scene, 1.1, "neptune", sun, 8.5, 1.5, 2, 1);
  planets.push(neptune);

  const saturn = new Planet(THREE, scene, 0.8, "saturn", sun, 20, 0.2, 1, 1);
  planets.push(saturn);

  const mercury = new Planet(
    THREE,
    scene,
    0.5,
    "mercury",
    saturn.mesh,
    1,
    -2,
    1,
    2
  );
  planets.push(mercury);

  const uranus = new Planet(
    THREE,
    scene,
    0.25,
    "uranus",
    saturn.mesh,
    2,
    0.21,
    1,
    2
  );
  planets.push(uranus);

  const venus = new Planet(THREE, scene, 0.15, "venus", sun, 1.5, 1, 1, 1);
  planets.push(venus);
}

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  // Animation Logic Here
  //cube.rotation.x += 0.01;

  // Camera Logic and Controls here
  if (guiControls.orbitalCamera) {
    let newCenter = new THREE.Vector3(0, 0, 0);
    camera = cameras.oCamera;
    if (guiControls.orbitCenter > 0) {
      const oBody = planets[guiControls.orbitCenter];
      newCenter = new THREE.Vector3(
        oBody.mesh.position.x,
        oBody.mesh.position.y,
        0
      );
    }

    camControls.orbitControl.target.copy(newCenter);
  } else {
    camera = cameras.pCamera;
    camControls.flyControl.movementSpeed = guiControls.movementSpeed / 1000;
    camControls.flyControl.rollSpeed = guiControls.rollSpeed / 1000;
  }

  // Update Cam Controls
  camControls.orbitControl.update();
  let t1 = new Date();
  let secs = (t1 - t0) / 1000;
  camControls.flyControl.update(1 * secs);

  // Update Planets

  for (let i = 1; i < planets.length; i++) {
    const planet = planets[i];
    planet.update();
  }
  renderer.render(scene, camera);
}

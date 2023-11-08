// Made this to hide functions I dont want to see

// Create cameras
export function getPerspectiveCamera(three, fov) {
  const pCamera = new three.PerspectiveCamera(
    fov,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  return pCamera;
}

// Orbital Camera
export function getOrbitalCamera(three, x, y, z) {
  const orbitalCamera = new three.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  orbitalCamera.position.set(x, y, z);

  return orbitalCamera;
}

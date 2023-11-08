export class Planet {
  constructor(three, scene, radius, texture, oBody, oDist, oVelocity, f1, f2) {
    //Size
    this.radius = radius;

    // Three.js information
    this.scene = scene;
    this.mesh;

    // color and texture
    this.textureLoc = "./textures/" + texture + ".jpg";

    // Orbit Information
    this.oBody = oBody;
    this.oDist = oDist;
    this.oVelocity = oVelocity;
    this.orbit;
    // Drawing Orbit
    this.f1 = f1;
    this.f2 = f2;

    this.createPlanet(three);
    this.createOrbitPath(three);
  }

  createPlanet(THREE) {
    // Texture
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(this.textureLoc);

    // Geometry
    const geometry = new THREE.SphereGeometry(this.radius, 10, 10);
    const material = new THREE.MeshPhongMaterial({ map: texture });
    this.mesh = new THREE.Mesh(geometry, material);

    // Add the planet to the scene
    this.scene.add(this.mesh);
  }

  createOrbitPath(THREE) {
    // Draw the planet's orbital path as an ellipse
    const ellipse = new THREE.EllipseCurve(
      this.oBody.position.x,
      this.oBody.position.y,
      this.f1 * this.oDist,
      this.f2 * this.oDist
    );

    // Create a set of points that approximate the ellipse
    const points = ellipse.getPoints(50);

    // Convert the points into a format suitable for rendering
    const orbitGeometry = new THREE.BufferGeometry().setFromPoints(points);

    // Create a material for rendering the orbital path
    const orbitMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });

    // Create a line object to represent the visual path of the planet's orbit
    this.orbit = new THREE.Line(orbitGeometry, orbitMaterial);

    // Add the orbit to the scene
    this.scene.add(this.orbit);
  }

  update() {
    // Update the planet's position based on its orbital speed
    const angle = Date.now() * (this.oVelocity / 1000); // Time-based animation
    const x = this.oBody.position.x + Math.cos(angle) * this.oDist * this.f1;
    const y = this.oBody.position.y + Math.sin(angle) * this.oDist * this.f2;
    this.mesh.position.set(x, y, 0);

    this.orbit.position.set(this.oBody.position.x, this.oBody.position.y, 0);
  }
}

export function getSun(three) {
  // Create a loader for the texture
  const textureLoader = new three.TextureLoader();

  // Load the texture from the provided image path
  const texture = textureLoader.load("./textures/sun.jpg");
  // Create objects and add them to the scene
  const geometry = new three.SphereGeometry(1);
  const material = new three.MeshBasicMaterial({
    map: texture,
  });
  const sun = new three.Mesh(geometry, material);
  sun.castShadow = false;

  return sun;
}

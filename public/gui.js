import { GUI } from "three/examples/jsm/libs/dat.gui.module";

export function getGuiControls() {
  const gui = new GUI();
  const guiControls = {
    orbitalCamera: true,
    orbitCenter: 0,
    movementSpeed: 1,
    rollSpeed: 1,
  };

  const camControlsFolder = gui.addFolder("Camera controls");
  camControlsFolder
    .add(guiControls, "movementSpeed")
    .name("Fly Move Speed")
    .step(1)
    .min(1)
    .max(10);
  camControlsFolder
    .add(guiControls, "orbitCenter")
    .name("Orbit Planet")
    .step(1)
    .min(0)
    .max(6);
  camControlsFolder
    .add(guiControls, "rollSpeed")
    .name("Fly Roll Speed")
    .step(1)
    .min(1)
    .max(10);
  camControlsFolder.add(guiControls, "orbitalCamera").name("Orbital Camera");
  return guiControls;
}

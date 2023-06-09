import Precarga from "./assets/scenes/Precarga.js";
import MenuPrincipal from "./assets/scenes/MenuPrincipal.js";
import Pausa from "./assets/scenes/Pausa.js";
import Perder from "./assets/scenes/Perder.js";
import NivelSuperado from "./assets/scenes/NivelSuperado.js";
import Tutorial from "./assets/scenes/Tutorial.js";
import Creditos from "./assets/scenes/Creditos.js";
import Nivel1 from "./assets/scenes/Nivel1.js";
import Nivel2 from "./assets/scenes/Nivel2.js";
import Nivel3 from "./assets/scenes/Nivel3.js";
import JuegoGanado from "./assets/scenes/JuegoGanado.js";



// Create a new Phaser config object
const config = {
  type: Phaser.AUTO,
  width: 1920,
  height: 1080,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    min: {
      width: 1280,
      height: 720,
    },
    max: {
      width: 1920,
      height: 1080,
    },
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
  // List of scenes to load
  // Only the first scene will be shown
  // Remember to import the scene before adding it to the list
  scene: [Precarga, MenuPrincipal, Nivel1, Nivel2, Nivel3, JuegoGanado, Pausa, Perder, Tutorial, Creditos, NivelSuperado],
};

// Create a new Phaser game instance
window.game = new Phaser.Game(config);

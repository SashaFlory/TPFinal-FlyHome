export default class Nivel1 extends Phaser.Scene {
  constructor() {
    // key of the scene
    // the key will be used to start the scene by other scenes
    super("nivel1");
  }

  init() {
    // this is called before the scene is created
    // init variables
    // take data passed from other scenes
    // data object param {}
  }

  preload() {
    this.load.image("Cielo", "public/images/Fondo1.png");
  }

  create() {
    // create game objects
    this.add.image(400, 300, "Cielo");

  }

  update() {
    // update game objects
  }
}

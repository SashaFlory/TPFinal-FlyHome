export default class Precarga extends Phaser.Scene {
  constructor() {
    // key of the scene
    // the key will be used to start the scene by other scenes
    super("precarga");
  }

  preload() {
    // load assets
    this.load.tilemapTiledJSON("map1", "./public/tilemaps/nivel1.json");
    this.load.image("tilesCielo1", "./public/images/Fondo1.png");
    this.load.image("tilesParallax", "./public/images/Parallax1.png");
    
    this.load.spritesheet("birdie", "./public/images/Personaje.png", {
      frameWidth: 205,
      frameHeight: 146,
    });

    this.load.spritesheet("aguila", "./public/images/Aguila.png", {
      frameWidth: 359,
      frameHeight: 166,
    });


  }

  create() {
    // create game objects
    this.scene.start("nivel1");
  }

  update() {
    // update game objects
  }
}

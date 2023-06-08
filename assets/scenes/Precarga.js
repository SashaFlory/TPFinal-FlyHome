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
    this.load.image("flyHome", "./public/images/Titulo.png");
    this.load.image("perdiste", "./public/images/PerderPP.png");
    this.load.image("bReintentar", "./public/images/BotonReintentar.png");
    this.load.image("bReintentar-P", "./public/images/BotonReintentarP.png");
    this.load.image("bMenu", "./public/images/BotonMenu.png");
    this.load.image("bMenu-P", "./public/images/BotonMenuP.png");
    this.load.image("bVolver", "./public/images/BotonVolver.png");
    this.load.image("bVolver-P", "./public/images/BotonVolver-P.png");
    this.load.image("bSiguiente", "./public/images/BotonSiguiente.png");
    this.load.image("bSiguiente-P", "./public/images/BotonSiguiente-P.png");
    this.load.image("tutorial", "./public/images/TutorialPP.png");
    this.load.image("creditos", "./public/images/CreditosPP.png");
    
    this.load.spritesheet("birdie", "./public/images/Personaje.png", {
      frameWidth: 210,
      frameHeight: 146,
    });

    this.load.spritesheet("aguila", "./public/images/Aguila.png", {
      frameWidth: 359,
      frameHeight: 166,
    });

    this.load.spritesheet("llegada", "./public/images/Nido.png", {
      frameWidth: 223.5,
      frameHeight: 129,
    });

  }

  create() {
    // create game objects
    this.anims.create({
      key: "birdieVuela",
      frames: this.anims.generateFrameNumbers("birdie", { start: 0, end: 1 }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "aguilaVuela",
      frames: this.anims.generateFrameNumbers("aguila", { start: 0, end: 1 }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "pioPio",
      frames: this.anims.generateFrameNumbers("llegada", { start: 0, end: 1 }),
      frameRate: 5,
      repeat: -1,
    });

    this.scene.start("menuPrincipal");
  }

  update() {
    // update game objects
  }
}

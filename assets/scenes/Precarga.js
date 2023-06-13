export default class Precarga extends Phaser.Scene {
  constructor() {
    // key of the scene
    // the key will be used to start the scene by other scenes
    super("precarga");
  }

  preload() {
    //TITULO
    this.load.image("flyHome", "./public/images/Titulo.png");

    //FONDO Y PARALLAX
    this.load.tilemapTiledJSON("map1", "./public/tilemaps/nivel1.json");
    this.load.image("tilesCielo1", "./public/images/Fondo1.png");
    this.load.image("tilesParallax1", "./public/images/Parallax1.png");

    //INTERFAZ
    this.load.image("vidas3", "./public/images/Corazon3.png");
    this.load.image("vidas2", "./public/images/Corazon2.png");
    this.load.image("vidas1", "./public/images/Corazon1.png");

    //POP UPs
    this.load.image("perdiste", "./public/images/PerderPP.png");
    this.load.image("tutorial", "./public/images/TutorialPP.png");
    this.load.image("creditos", "./public/images/CreditosPP.png");
    this.load.image("superado", "./public/images/SuperadoPP.png");

    //BOTONES
    this.load.image("bReintentar", "./public/images/BotonReintentar.png");
    this.load.image("bReintentar-P", "./public/images/BotonReintentarP.png");
    this.load.image("bMenu", "./public/images/BotonMenu.png");
    this.load.image("bMenu-P", "./public/images/BotonMenuP.png");
    this.load.image("bVolver", "./public/images/BotonVolver.png");
    this.load.image("bVolver-P", "./public/images/BotonVolver-P.png");
    this.load.image("bSiguiente", "./public/images/BotonSiguiente.png");
    this.load.image("bSiguiente-P", "./public/images/BotonSiguiente-P.png");
    
    //FRUTAS
    this.load.image("uva1", "./public/images/Uva1.png");
    this.load.image("uva2", "./public/images/Uva2.png");
    this.load.image("uva3", "./public/images/Uva3.png");
    this.load.image("cereza", "./public/images/Cereza.png");
    
    this.load.spritesheet("birdie", "./public/images/Personaje.png", {
      frameWidth: 218,
      frameHeight: 152,
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
    this.anims.create({
      key: "birdieVuela",
      frames: this.anims.generateFrameNumbers("birdie", { start: 0, end: 11 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "birdieChoca",
      frames: [{ key: "birdie", frame: 12 }],
      frameRate: 20,
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
}

export default class Precarga extends Phaser.Scene {
  constructor() {
    super("precarga");
  }

  preload() {
    //FONDO Y PARALLAX
    this.load.tilemapTiledJSON("map1", "./public/tilemaps/nivel1.json");
    this.load.tilemapTiledJSON("map2", "./public/tilemaps/nivel2.json");
    this.load.tilemapTiledJSON("map3", "./public/tilemaps/nivel3.json");
    this.load.image("menuP", "./public/images/MenuPrincipal.png");
    this.load.image("tilesCielo1", "./public/images/Fondo1.png");
    this.load.image("tilesParallax1", "./public/images/Parallax1.png");
    this.load.image("tilesCielo2", "./public/images/Fondo2.png");
    this.load.image("tilesParallax2", "./public/images/Parallax2.png");
    this.load.image("tilesCielo3", "./public/images/Fondo3.png");
    this.load.image("tilesParallax3", "./public/images/Parallax3.png");

    //INTERFAZ
    this.load.image("barraUI", "./public/images/UIBarra.png");
    this.load.image("vida", "./public/images/Corazon.png");
    this.load.image("relojUI", "./public/images/UIReloj.png");
    this.load.image("uvaUI", "./public/images/UIUva.png");
    this.load.image("semillasUI", "./public/images/UISemillas.png");

    this.load.spritesheet('bMenu', './public/images/BotonMenu.png', { frameWidth: 230, frameHeight: 45 });
    this.load.spritesheet('bSiguiente', './public/images/BotonSiguiente.png', { frameWidth: 230, frameHeight: 45 });
    this.load.spritesheet('bReintentar', './public/images/BotonReintentar.png', { frameWidth: 230, frameHeight: 45 });
    this.load.spritesheet('bVolver', './public/images/BotonVolver.png', { frameWidth: 68, frameHeight: 86 });
    this.load.spritesheet('bPausa', './public/images/BotonPausa.png', { frameWidth: 82, frameHeight: 81 });

    //POP UPs
    this.load.image("popUp", "./public/images/PopUp.png");
    this.load.image("tutorial", "./public/images/TutorialPP.png");
    this.load.image("creditos", "./public/images/CreditosPP.png");

    //FRUTAS
    this.load.image("uva1", "./public/images/Uva1.png");
    this.load.image("uva2", "./public/images/Uva2.png");
    this.load.image("uva3", "./public/images/Uva3.png");
    this.load.image("cereza", "./public/images/Cereza.png");

    this.load.image("bala", "./public/images/Semilla.png");
    
    this.load.spritesheet("birdie", "./public/images/Personaje.png", {
      frameWidth: 218,
      frameHeight: 152,
    });
    this.load.spritesheet("aguila", "./public/images/Aguila.png", {
      frameWidth: 365,
      frameHeight: 150,
    });
    this.load.spritesheet("avispa", "./public/images/Avispa.png", {
      frameWidth: 187,
      frameHeight: 133,
    });
    this.load.spritesheet("paloma", "./public/images/Paloma.png", {
      frameWidth: 300.5,
      frameHeight: 209,
    });
    this.load.spritesheet("puf", "./public/images/NubeDesaparece.png", {
      frameWidth: 283,
      frameHeight: 231,
    });

    this.load.spritesheet("tomate", "./public/images/Tomate.png", {
      frameWidth: 165,
      frameHeight: 147,
    });
    this.load.spritesheet("recolectado", "./public/images/Recolectado.png", {
      frameWidth: 162,
      frameHeight: 165,
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
      frames: this.anims.generateFrameNumbers("aguila", { start: 0, end: 3 }),
      frameRate: 4,
      repeat: -1,
    });

    this.anims.create({
      key: "avispaVuela",
      frames: this.anims.generateFrameNumbers("avispa", { start: 0, end: 3 }),
      frameRate: 8,
      repeat: -1,
    });

    this.anims.create({
      key: "palomaVuela",
      frames: this.anims.generateFrameNumbers("paloma", { start: 0, end: 3 }),
      frameRate: 4,
      repeat: -1,
    });

    this.anims.create({
      key: "pioPio",
      frames: this.anims.generateFrameNumbers("llegada", { start: 0, end: 1 }),
      frameRate: 4,
      repeat: -1,
    });

    this.anims.create({
      key: "brillo",
      frames: this.anims.generateFrameNumbers("recolectado", { start: 0, end: 3 }),
      frameRate: 15,
      hideOnComplete: true
    });
    this.anims.create({
      key: "salsaTomate",
      frames: this.anims.generateFrameNumbers("tomate", { start: 1, end: 4 }),
      frameRate: 11,
      hideOnComplete: true
    });
    this.anims.create({
      key: "desaparece",
      frames: this.anims.generateFrameNumbers("puf", { start: 0, end: 3 }),
      frameRate: 11,
      hideOnComplete: true
    });

    this.scene.start("menuPrincipal");
  }
}

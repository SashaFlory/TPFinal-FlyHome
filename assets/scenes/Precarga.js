export default class Precarga extends Phaser.Scene {
  constructor() {
    super("precarga");
  }

  preload() {
    //VIDEO
    this.load.video('presentacion', "./public/video/Intro.mp4");

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
    this.load.image("ganador", "./public/images/JuegoGanado.png");

    //MUSICA Y FX
    this.load.audio('menuMusica', "./public/audio/SpringDay.mp3");
    this.load.audio('juegoMusica', "./public/audio/HappyUkelele.mp3");
    this.load.audio('entrarUI', "./public/audio/Entrar.mp3");
    this.load.audio('salirUI', "./public/audio/Salir.mp3");
    this.load.audio('cuenta', "./public/audio/CuentaR.mp3");
    this.load.audio('cuak', "./public/audio/Cuak.mp3");
    this.load.audio('recolectado', "./public/audio/Recolectado.mp3");
    this.load.audio('victoria', "./public/audio/Victoria.mp3");
    this.load.audio('derrota', "./public/audio/Derrota.mp3");
    this.load.audio('tomate', "./public/audio/Tomate.mp3");
    this.load.audio('disparo', "./public/audio/Disparo.mp3");

    //INTERFAZ
    this.load.image("titulo", "./public/images/Titulo.png");
    this.load.image("barraUI", "./public/images/UIBarra.png");
    this.load.image("vida", "./public/images/Corazon.png");
    this.load.image("relojUI", "./public/images/UIReloj.png");
    this.load.image("uvaUI", "./public/images/UIUva.png");
    this.load.image("semillasUI", "./public/images/UISemillas.png");
    this.load.image("estrella", "./public/images/Estrella.png");

    this.load.spritesheet('bMenu', './public/images/BotonMenu.png', { frameWidth: 106.5, frameHeight: 112 });
    this.load.spritesheet('bJugar', './public/images/BotonJugar.png', { frameWidth: 224.5, frameHeight: 68 });
    this.load.spritesheet('bTutorial', './public/images/BotonTutorial.png', { frameWidth: 307.5, frameHeight: 51 });
    this.load.spritesheet('bCreditos', './public/images/BotonCreditos.png', { frameWidth: 307.5, frameHeight: 51 });
    this.load.spritesheet('bSiguiente', './public/images/BotonSiguiente.png', { frameWidth: 96.5, frameHeight: 62 });
    this.load.spritesheet('bReintentar', './public/images/BotonReintentar.png', { frameWidth: 73.5, frameHeight: 86 });
    this.load.spritesheet('bVolver', './public/images/BotonVolver.png', { frameWidth: 68, frameHeight: 86 });
    this.load.spritesheet('bPausa', './public/images/BotonPausa.png', { frameWidth: 82, frameHeight: 81 });

    //POP UPs
    this.load.image("pausaPP", "./public/images/Pausa.png");
    this.load.image("popUp", "./public/images/PopUp.png");
    this.load.image("tutorial", "./public/images/TutorialPP.png");
    this.load.image("creditos", "./public/images/CreditosPP.png");
    this.load.image("perdedor", "./public/images/PerderPP.png");

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

    let presentacion = this.add.video(0, 0, "presentacion").setOrigin(0).setInteractive(); 

    presentacion.play();

    presentacion.on("complete", () => {
      this.scene.start("menuPrincipal");
    });

    presentacion.on("pointerdown", () => {
      this.scene.start("menuPrincipal");
    });

    
  }
}

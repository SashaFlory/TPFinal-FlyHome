export default class Nivel1 extends Phaser.Scene {
  constructor() {
    // key of the scene
    // the key will be used to start the scene by other scenes
    super("nivel1");
  }

  init() {
    this.vidas = 3;
    this.ganador = false;
    this.perdedor = false;
  }

  create() {
    // create game objects
    const map = this.make.tilemap({ key: "map1" });

    const capaFondo = map.addTilesetImage("Fondo1", "tilesCielo1");
    const capaParallax = map.addTilesetImage("Parallax1", "tilesParallax");

    const fondoLayer = map.createLayer("fondo", capaFondo, 0, 0);
    const nubesLayer = map.createLayer("nubes", capaParallax, 0, 0);
    const arbolesLayer = map.createLayer("arboles", capaParallax, 0, 0);
    const margenLayer = map.createLayer("margen", capaParallax, 0, 0);

    const objectosLayer = map.getObjectLayer("objetos");

    let spawnPoint = map.findObject("objetos", (obj) => obj.name === "jugador");
    console.log(spawnPoint);
    this.jugador = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, "birdie");
    this.jugador.setCollideWorldBounds(true);

    this.enemigos = this.physics.add.group();


    objectosLayer.objects.forEach((objData) => {
      //console.log(objData.name, objData.type, objData.x, objData.y);

      const { x = 0, y = 0, name } = objData;
      switch (name) {
        case "aguila": {
          // add star to scene
          // console.log("estrella agregada: ", x, y);
          const aguila = this.enemigos.create(x, y, "aguila");
          break;
        }
      }
    });

    this.physics.add.overlap(this.jugador, this.enemigos, this.vidaMenos, null, this);

    this.cursors = this.input.keyboard.createCursorKeys();

    this.vidaTexto = this.add.text(20, 20, "Vidas: 3", {
      fontSize: "50px",
      fill: "#111111"
    })

    this.vidaTexto.setScrollFactor(0);


    //add camera to follow player
    this.cameras.main.startFollow(this.jugador);
    // world bounds
    this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    //camera dont go out of the map
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
  }

  update() {
    // update game objects
    this.jugador.anims.play("birdieVuela", true);

    if (this.cursors.right.isDown) {
      this.jugador.setVelocityX(500);
    } else if (this.cursors.up.isDown) {
      this.jugador.setVelocityY(-400);
    } else if (this.cursors.down.isDown) {
      this.jugador.setVelocityY(400);
    } else {
      this.jugador.setVelocityY(0);
    };

  }

  vidaMenos(jugador, enemigo) {
    enemigo.disableBody(true, true);

    this.vidas--

    this.vidaTexto.setText(
      "Vidas: " +
      this.vidas
    )

    if(this.vidas<=0) {
      this.perdedor = true;
      this.scene.launch("perder");
      this.scene.pause("nivel1")
    }
  }
}

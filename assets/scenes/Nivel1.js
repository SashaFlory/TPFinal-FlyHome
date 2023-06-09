import { MOVIMIENTOS } from "../../utils.js";

export default class Nivel1 extends Phaser.Scene {
  constructor() {
    super("nivel1");
  }

  init() {
    this.vidas = 3;
    this.ganador = false;
    this.perdedor = false;
    this.puntaje = 0;

    this.cuentaRegresiva = 3;
  }

  create() {
    // create game objects
    const map = this.make.tilemap({ key: "map1" });

    const capaFondo = map.addTilesetImage("Fondo1", "tilesCielo1");
    const capaParallax = map.addTilesetImage("Parallax1", "tilesParallax1");

    const fondoLayer = map.createLayer("fondo", capaFondo, 0, 0);
    const nubesLayer = map.createLayer("nubes", capaParallax, 0, 0);
    const arbolesLayer = map.createLayer("arboles", capaParallax, 0, 0);
    const margenLayer = map.createLayer("margen", capaParallax, 0, 0);

    const objectosLayer = map.getObjectLayer("objetos");

    let spawnPoint = map.findObject("objetos", (obj) => obj.name === "jugador");
    console.log(spawnPoint);
    this.jugador = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, "birdie");
    this.jugador.setCollideWorldBounds(true);

    spawnPoint = map.findObject("objetos", (obj) => obj.name === "nido");
    this.nido = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, "llegada");

    this.enemigos = this.physics.add.group();

    this.frutas = this.physics.add.group();

    objectosLayer.objects.forEach((objData) => {
      //console.log(objData.name, objData.type, objData.x, objData.y);
      const { x = 0, y = 0, name } = objData;
      switch (name) {
        case "aguila": {
          const aguila = this.enemigos.create(x, y, "aguila");
          break;
        }
      }
    });
    this.physics.add.overlap(this.jugador, this.enemigos, this.vidaMenos, null, this);

    objectosLayer.objects.forEach((objData) => {
      //console.log(objData.name, objData.type, objData.x, objData.y);
      const { x = 0, y = 0, name } = objData;
      switch (name) {
        case "uva1": {
          const uva1 = this.frutas.create(x, y, "uva1");
          break;
        }
      }
    });
    // objectosLayer.objects.forEach((objData) => {
    //   //console.log(objData.name, objData.type, objData.x, objData.y);
    //   const { x = 0, y = 0, name } = objData;
    //   switch (name) {
    //     case "uva2": {
    //       const uva2 = this.frutas.create(x, y, "uva2");
    //       break;
    //     }
    //   }
    // });
    this.physics.add.overlap(this.jugador, this.frutas, this.frutaRecolectada, null, this);

    this.physics.add.overlap(this.jugador, this.nido, this.esGanador, null, this);

    this.cursors = this.input.keyboard.createCursorKeys();

    this.vidaTexto = this.add.text(20, 20, "Vidas: 3", {
      fontSize: "50px",
      fill: "#111111"
    })
    this.cuentaTexto = this.add.text(300, 20, "cuenta regresiva: 3", {
      fontSize: "50px",
      fill: "#111111"
    })
    this.frutaTexto = this.add.text(1000, 20, "Puntos: 0", {
      fontSize: "50px",
      fill: "#111111"
    })
    this.vidaTexto.setScrollFactor(0);
    this.cuentaTexto.setScrollFactor(0);
    this.frutaTexto.setScrollFactor(0);

    //add camera to follow player
    this.cameras.main.startFollow(this.jugador);
    // world bounds
    this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    //camera dont go out of the map
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    this.time.addEvent({
      delay: 1000,
      callback: this.actualizarCuentaRegresiva,
      callbackScope: this,
      loop: true,
    });

  }

  update() {
    
    this.jugador.anims.play("birdieVuela", true);

    if (this.cursors.up.isDown) {
      this.jugador.setVelocityY(-MOVIMIENTOS.y);
    } else if (this.cursors.down.isDown) {
      this.jugador.setVelocityY(MOVIMIENTOS.y);
    } else {
      this.jugador.setVelocityY(0);
    };

    this.nido.anims.play("pioPio", true);

  }

  actualizarCuentaRegresiva() {
    this.cuentaRegresiva--
    console.log(this.cuentaRegresiva)

    this.cuentaTexto.setText(
      "cuenta regresiva: " +
      this.cuentaRegresiva
    )

    if(this.cuentaRegresiva <= 0) {
      this.jugador.setVelocityX(500);
      this.cuentaTexto.setText("")
    }
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

  frutaRecolectada(jugador, fruta) {
    fruta.disableBody(true, true);

    this.puntaje++;

    this.frutaTexto.setText(
      "Puntos: " +
      this.puntaje
    );

  }

  esGanador(jugador, nido) {
    this.scene.pause("nivel1");
    this.scene.launch("nivelSuperado");
  }
}

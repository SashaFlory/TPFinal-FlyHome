import { MOVIMIENTOS, FRUTA_PUNTOS } from "../../utils.js";

export default class Nivel1 extends Phaser.Scene {
  constructor() {
    super("nivel1");
  }

  init() {
    this.vidas = 3;
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

    // this.enemigos.children.each((aguila) => {
    //   aguila.anims.play("aguilaVuela");
    // });

    this.physics.add.overlap(this.jugador, this.enemigos, this.vidaMenos, null, this);

    objectosLayer.objects.forEach((objData) => {
      //console.log(objData.name, objData.type, objData.x, objData.y);
      const { x = 0, y = 0, name } = objData;
      switch (name) {
        case "uva1": {
          const uva1 = this.frutas.create(x, y, "uva1");
          uva1.puntuacion = FRUTA_PUNTOS.puntosU1;
          break;
        }
      }
    });

     objectosLayer.objects.forEach((objData) => {
       //console.log(objData.name, objData.type, objData.x, objData.y);
       const { x = 0, y = 0, name } = objData;
       switch (name) {
         case "uva2": {
           const uva2 = this.frutas.create(x, y, "uva2");
           uva2.puntuacion = FRUTA_PUNTOS.puntosU2;
           break;
        }
      }
    });

    this.physics.add.overlap(this.jugador, this.frutas, this.frutaRecolectada, null, this);
    this.physics.add.overlap(this.jugador, this.nido, this.esGanador, null, this);

    this.cursors = this.input.keyboard.createCursorKeys();

    const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
    const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

    this.cuentaTexto = this.add.text(screenCenterX, screenCenterY, "3", {
      fontFamily: "impact",
      fontSize: "300px",
      fill: "#111111"
    }).setOrigin(0.5);

    this.puntuacionUI = this.add.image(800, 55, "uva1").setSize(0.01);
    this.frutaTexto = this.add.text(855, 20, "0", {
      fontFamily: "impact",
      fontSize: "50px",
      fill: "#111111"
    })

    this.puntuacionUI.setScrollFactor(0);
    this.frutaTexto.setScrollFactor(0);

    this.tres = this.add.image(150, 50, "vidas3");
    this.dos = this.add.image(110, 50, "vidas2");
    this.uno = this.add.image(70, 50, "vidas1");

    this.tres.setScrollFactor(0);
    this.dos.setScrollFactor(0);
    this.uno.setScrollFactor(0);


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
    
    if (this.cursors.space.isDown) {
      this.scene.pause("nivel1");
      this.scene.launch("pausa")
    }

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
      this.cuentaRegresiva
    )

    if(this.cuentaRegresiva <= 0) {
      this.jugador.setVelocityX(MOVIMIENTOS.x1);
      this.jugador.anims.play("birdieVuela", true);
      this.cuentaTexto.setText("")

      this.enemigos.children.each((aguila) => {
        aguila.anims.play("aguilaVuela");
      });
    }
  }

  vidaMenos(jugador, enemigo) {
    enemigo.disableBody(true, true);
    
    this.vidas--
    
    this.jugador.anims.stop(true);
    this.jugador.anims.play("birdieChoca", true);   //hacer que dure menos

    console.log("vida perdida -- vidas totales:", this.vidas);
   
    if(this.vidas==2){
      this.tres.visible = false;
    } else if (this.vidas==1) {
      this.dos.visible = false;
    } else if(this.vidas<=0) {
      this.uno.visible = false;
      this.scene.launch("perder");
      this.scene.pause("nivel1")
    }

  }

  frutaRecolectada(jugador, fruta) {
    fruta.disableBody(true, true);

    this.puntaje += fruta.puntuacion;

    console.log("fruta recolectada:", fruta, "puntos obtenidos:", fruta.puntuacion);
    console.log("puntos totales:", this.puntaje);

    this.frutaTexto.setText(
      this.puntaje
    );

  }

  esGanador(jugador, nido) {
    this.scene.pause("nivel1");
    this.scene.launch("nivelSuperado", {puntaje: this.puntaje});
  }
}

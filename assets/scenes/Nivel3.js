import { MOVIMIENTOS, FRUTA_PUNTOS, AVANZAR_IZQ } from "../../utils.js";

export default class Nivel3 extends Phaser.Scene {
  constructor() {
    super("nivel3");
  }
  init(data) {
    this.puntajeFinal = data.puntosTotal;
    console.log("puntajeFinal:", this.puntajeFinal);
    
    this.vidas = 3;
    this.puntaje = 0;

    this.semillas = 0;

    console.log("BALAS: ", this.semillas);
    
    this.cuentaRegresiva = 3;
  }
  
  create() {
    const map = this.make.tilemap({ key: "map3" });

    const capaFondo = map.addTilesetImage("Fondo3", "tilesCielo3");
    const capaParallax = map.addTilesetImage("Parallax3", "tilesParallax3");
  
    const fondoLayer = map.createLayer("fondo", capaFondo, 0, 0);
    const lejanoLayer = map.createLayer("lejano", capaParallax, 0, 0);
    const cercanoLayer = map.createLayer("cercano", capaParallax, 0, 0);
      
    const objectosLayer = map.getObjectLayer("objetos");
  
    let spawnPoint = map.findObject("objetos", (obj) => obj.name === "jugador");
    console.log(spawnPoint);
    this.jugador = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, "birdie");
    this.jugador.setCollideWorldBounds(true);
  
    spawnPoint = map.findObject("objetos", (obj) => obj.name === "nido");
    this.nido = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, "llegada");
    this.nido.body.setSize(220, 1200);
  
    this.enemigos = this.physics.add.group();
    this.balas = this.physics.add.group();
    this.frutas = this.physics.add.group();

    const margenLayer = map.createLayer("margen", capaParallax, 0, 0);
  
    objectosLayer.objects.forEach((objData) => {
      //console.log(objData.name, objData.type, objData.x, objData.y);
      const { x = 0, y = 0, name } = objData;
      switch (name) {
        case "paloma": {
          const paloma = this.enemigos.create(x, y, "paloma");
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
          uva1.puntuacion = FRUTA_PUNTOS.puntosU1;
          uva1.balas = 0;
           break;
        }
        case "uva2": {
          const uva2 = this.frutas.create(x, y, "uva2");
          uva2.puntuacion = FRUTA_PUNTOS.puntosU2;
          uva2.balas = 0;
          break;
        }
        case "uva3": {
          const uva3 = this.frutas.create(x, y, "uva3");
          uva3.puntuacion = FRUTA_PUNTOS.puntosU3;
          uva3.balas = 0;
          break;
        }
        case "tomate": {
          const tomate = this.frutas.create(x, y, "tomate");
          tomate.puntuacion = FRUTA_PUNTOS.puntosT;
          tomate.balas = 0;
          break;
        }
        case "cereza": {
          const cereza = this.frutas.create(x, y, "cereza");
          cereza.puntuacion = 0;
          cereza.balas = 3;
          break;
        }
      }
    });
  
    this.physics.add.overlap(this.jugador, this.frutas, this.frutaRecolectada, null, this);
    this.physics.add.overlap(this.balas, this.enemigos, this.muereEnemigo, null, this);
    this.physics.add.overlap(this.jugador, this.nido, this.esGanador, null, this);
  
    this.cursors = this.input.keyboard.createCursorKeys();
    this.keys = this.input.keyboard.addKeys({p:  Phaser.Input.Keyboard.KeyCodes.P});
    this.input.keyboard.on("keydown-SPACE", this.disparar, this);
  
    const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
    const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
  
    this.cuentaTexto = this.add.text(screenCenterX, screenCenterY, "3", {
      fontFamily: "impact",
      fontSize: "300px",
      fill: "#111111"
    }).setOrigin(0.5);

    this.barra = this.add.image(0, 2, "barraUI").setOrigin(0);
    this.barra.setScrollFactor(0);

    let botonP = this.add.sprite(60, 60, "bPausa").setInteractive();
    botonP.setFrame(0);

    botonP.on("pointerover", () => {
      botonP.setFrame(1);
    })
    botonP.on("pointerdown", () => {
      botonP.setFrame(1);
      this.scene.pause("nivel3");
      this.scene.launch("pausa");
    })
     botonP.on("pointerout", () => {
      botonP.setFrame(0);
    })
    botonP.setScrollFactor(0);

    this.uno = this.add.image(280, 60, "vida");
    this.dos = this.add.image(370, 60, "vida");
    this.tres = this.add.image(460, 60, "vida");
    this.uno.setScrollFactor(0);
    this.dos.setScrollFactor(0);
    this.tres.setScrollFactor(0);

    this.tiempoUI = this.add.image(800, 55, "relojUI");
    this.tiempoTexto = this.add.text(880, 30, "0", {
      fontFamily: "impact",
      fontSize: "50px",
      fill: "#111111"
    })
    this.tiempoUI.setScrollFactor(0);
    this.tiempoTexto.setScrollFactor(0);

    this.puntuacionUI = this.add.image(1300, 60, "uvaUI");
    this.puntuacionTexto = this.add.text(1380, 30, "0", {
      fontFamily: "impact",
      fontSize: "50px",
      fill: "#111111"
    })
    this.puntuacionUI.setScrollFactor(0);
    this.puntuacionTexto.setScrollFactor(0);

    this.semillasUI = this.add.image(1600, 60, "semillasUI");
    this.semillasTexto = this.add.text(1680, 30, "0", {
      fontFamily: "impact",
      fontSize: "50px",
      fill: "#111111"
    })
    this.semillasUI.setScrollFactor(0);
    this.semillasTexto.setScrollFactor(0);
  
    this.cameras.main.startFollow(this.jugador);
    this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
  
    this.time.addEvent({
      delay: 1000,
      callback: this.actualizarCuentaRegresiva,
      callbackScope: this,
      loop: true,
    });
  
  }
  
  update() {
    this.cameras.main.setFollowOffset(-AVANZAR_IZQ, 0);

    if (this.keys.p.isDown) {
      this.scene.pause("nivel3");
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
      
      this.enemigos.children.each((paloma) => {
        paloma.anims.play("palomaVuela");
      });
    }
  }
  
  vidaMenos(jugador, enemigo) {
    enemigo.disableBody(true, true);
      
    this.vidas--
      
    this.jugador.anims.stop(true);
    this.jugador.anims.play("birdieChoca", true);
  
    console.log("vida perdida -- vidas totales:", this.vidas);
     
    if(this.vidas==2){
      this.tres.visible = false;
    } else if (this.vidas==1) {
      this.dos.visible = false;
    } else if(this.vidas<=0) {
      this.uno.visible = false;
      this.scene.launch("perder");
      this.scene.pause("nivel3")
    }
  
  }

  disparar() {
    if (this.semillas <= 0) {
      return; // No se puede disparar si no hay balas disponibles
    }
    const bala = this.balas.create(this.jugador.x, this.jugador.y, "bala");
    bala.setVelocityX(2000);

    this.semillas--;
    console.log("BALAS: ", this.semillas);
  }

  muereEnemigo(bala, enemigo) {
    bala.disableBody(true, true);

    enemigo.anims.stop();
    enemigo.disableBody(true, true);

    const explosion = this.add.sprite(enemigo.x, enemigo.y, "desaparece");
    explosion.play("desaparece", true);

    console.log("ENEMIGO DERROTADO");
  }
  
  frutaRecolectada(jugador, fruta) {
    fruta.anims.play("brillo", true);
    fruta.disableBody();
  
    this.puntaje += fruta.puntuacion;

    this.semillas += fruta.balas;
    this.semillasTexto.setText(
      this.semillas
    );
    console.log("BALAS: ", this.semillas);
  
    console.log("fruta recolectada:", fruta, "puntos obtenidos:", fruta.puntuacion);
    console.log("puntos totales:", this.puntaje);
  
    this.puntuacionTexto.setText(
      this.puntaje
    );
  
  }
  
  esGanador(jugador, nido) {
    this.puntajeFinal = this.puntajeFinal + this.puntaje;
    console.log("puntaje Final:", this.puntajeFinal);

    this.scene.pause("nivel3");
    this.scene.launch("nivelSuperado", {puntaje: this.puntaje, puntosTotal: this.puntajeFinal});
      
  }
}
import { MOVIMIENTOS, FRUTA_PUNTOS, AVANZAR_IZQ } from "../../utils.js";

export default class Nivel2 extends Phaser.Scene {
  constructor() {
    super("nivel2");
  }

  init(data) {
    this.puntajeFinal = data.puntosTotal;
    console.log("puntajeFinal:", this.puntajeFinal);

    this.cantidadEstrellas = 0;

    this.vidas = 3;
    this.puntaje = 0;

    this.tiempo = 30;

    this.cuentaRegresiva = 3;
  }
  
  create() {
    this.musica = this.sound.add("juegoMusica");
    this.musica.play({ loop: true });
    this.musica.setVolume(0.30);

    this.sound.add("cuak");
    this.sound.add("recolectado");
    this.sound.add("tomate");

    const map = this.make.tilemap({ key: "map2" });
  
    const capaFondo = map.addTilesetImage("Fondo2", "tilesCielo2");
    const capaParallax = map.addTilesetImage("Parallax2", "tilesParallax2");
  
    const fondoLayer = map.createLayer("fondo", capaFondo, 0, 0);
    const nubesLayer = map.createLayer("nubes", capaParallax, 0, 0);
    const lejanoLayer = map.createLayer("lejano", capaParallax, 0, 0);
    const medioLayer = map.createLayer("medio", capaParallax, 0, 0);
    const cercanoLayer = map.createLayer("cercano", capaParallax, 0, 0);
    const margenLayer = map.createLayer("margen", capaParallax, 0, 0);
  
    const objectosLayer = map.getObjectLayer("objetos");
  
    let spawnPoint = map.findObject("objetos", (obj) => obj.name === "jugador");
    console.log(spawnPoint);
    this.jugador = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, "birdie");
    this.jugador.setCollideWorldBounds(true);
    this.jugador.body.setSize(210, 140);
  
    spawnPoint = map.findObject("objetos", (obj) => obj.name === "nido");
    this.nido = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, "llegada");
    this.nido.body.setSize(220, 1500);
  
    this.enemigos = this.physics.add.group();
  
    this.frutas = this.physics.add.group();
  
    objectosLayer.objects.forEach((objData) => {
      //console.log(objData.name, objData.type, objData.x, objData.y);
      const { x = 0, y = 0, name } = objData;
      switch (name) {
        case "avispa": {
          const avispa = this.enemigos.create(x, y, "avispa")
          avispa.body.setSize(180, 110);
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
          break;
        }
        case "uva2": {
          const uva2 = this.frutas.create(x, y, "uva2");
          uva2.puntuacion = FRUTA_PUNTOS.puntosU2;
          break;
        }
        case "uva3": {
          const uva3 = this.frutas.create(x, y, "uva3");
          uva3.puntuacion = FRUTA_PUNTOS.puntosU3;
          break;
        }
        case "tomate": {
          const tomate = this.frutas.create(x, y, "tomate");
          tomate.puntuacion = FRUTA_PUNTOS.puntosT;
          break;
        }
      }
    });
  
    this.physics.add.overlap(this.jugador, this.frutas, this.frutaRecolectada, null, this);
    this.physics.add.overlap(this.jugador, this.nido, this.esGanador, null, this);
  
    this.cursors = this.input.keyboard.createCursorKeys();
    this.keys = this.input.keyboard.addKeys({p:  Phaser.Input.Keyboard.KeyCodes.P});
  
    const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
    const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
  
    this.cuentaTexto = this.add.text(screenCenterX, screenCenterY, "3", {
      fontFamily: "impact",
      fontSize: "300px",
      fill: "#111111"
    }).setOrigin(0.5);

    const mapWidth = map.widthInPixels;
    this.barra = this.physics.add.sprite(0, 2, "barraUI").setOrigin(0).setScrollFactor(0);
    this.barra.setImmovable();
    this.barra.body.setSize(mapWidth, 100);
    this.barra.body.setOffset(0, 0);

    this.physics.add.collider(this.jugador, this.barra);
  
    let botonP = this.add.sprite(60, 60, "bPausa").setInteractive();
    botonP.setFrame(0);

    botonP.on("pointerover", () => {
      botonP.setFrame(1);
    })
    botonP.on("pointerdown", () => {
      botonP.setFrame(1);
      this.scene.pause("nivel2");
      this.musica.pause();
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
    this.tiempoTexto = this.add.text(880, 30, "30", {
      fontFamily: "impact",
      fontSize: "50px",
      fill: "#111111"
    })
    this.tiempoUI.setScrollFactor(0);
    this.tiempoTexto.setScrollFactor(0);

    this.puntuacionUI = this.add.image(1300, 60, "uvaUI");
    this.puntuacionTexto = this.add.text(1380, 30, "0000", {
      fontFamily: "impact",
      fontSize: "50px",
      fill: "#111111"
    })
    this.puntuacionUI.setScrollFactor(0);
    this.puntuacionTexto.setScrollFactor(0);
  
  
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

    this.time.addEvent({
      delay: 1000,
      callback: this.temporizador,
      callbackScope: this,
      loop: true,
    });

  }
  
  update() {

    this.cameras.main.setFollowOffset(-AVANZAR_IZQ, 0);

    if (this.keys.p.isDown) {
      this.scene.pause("nivel2");
      this.musica.pause();
      this.scene.launch("pausa");
    } else {
      this.musica.resume();
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
      this.jugador.setVelocityX(MOVIMIENTOS.x3);
      this.jugador.anims.play("birdieVuela", true);
      this.cuentaTexto.setText("")
        
      this.enemigos.children.each((avispa) => {
        avispa.anims.play("avispaVuela");
      });
    }
  }
  
  temporizador() {
    if (this.cuentaRegresiva<=0) {
      if (this.tiempo === 0) {
        this.tiempoTexto.setText("0")
      };
      
      this.tiempoTexto.setText(
        this.tiempo
      );

      this.tiempo--;
    };
  };

  vidaMenos(jugador, enemigo) {
    enemigo.disableBody(true, true);

    this.sound.play("cuak");
      
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
      this.scene.pause("nivel2");
      this.musica.stop();
    }
  
  }
  
  frutaRecolectada(jugador, fruta) {

    if (fruta.texture.key === "tomate") {
      fruta.anims.play("salsaTomate", true);
      this.sound.play("tomate");
    } else {
      fruta.anims.play("brillo", true);
      this.sound.play("recolectado");
    }
    
    fruta.disableBody();
  
    this.puntaje += fruta.puntuacion;
  
    console.log("fruta recolectada:", fruta, "puntos obtenidos:", fruta.puntuacion);
    console.log("puntos totales:", this.puntaje);
  
    this.puntuacionTexto.setText(
      this.puntaje
    );
  
  }
  
  esGanador(jugador, nido) {
    this.puntajeFinal = this.puntajeFinal + this.puntaje;
    console.log("puntaje Final:", this.puntajeFinal);

    if (this.puntaje >= 500 && this.puntaje < 1200) {
      this.cantidadEstrellas += 1;
    } else if (this.puntaje >= 1200 && this.puntaje < 1900) {
      this.cantidadEstrellas += 2;
    } else if (this.puntaje >= 1900) {
      this.cantidadEstrellas += 3;
    };

    console.log("ESTRELLAS: ", this.cantidadEstrellas);

    this.scene.pause("nivel2");
    this.musica.stop();
    this.scene.launch("nivelSuperado", {puntaje: this.puntaje, puntosTotal: this.puntajeFinal, cantidadEstrellas: this.cantidadEstrellas});
      
  }
}
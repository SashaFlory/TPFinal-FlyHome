import { NIVELES } from "../../utils.js";

export default class NivelSuperado extends Phaser.Scene {
    constructor() {
      super("nivelSuperado");
    }

    init(data) {
        this.puntaje = data.puntaje;

        this.cantidadEstrellas = data.cantidadEstrellas;

        this.puntajeFinal = data.puntosTotal;

        console.log(data);
      
        this.nivelActualNombre = this.obtenerNivelEnPausa();
        this.nivelActualIndex = NIVELES.indexOf(this.nivelActualNombre);
    }

    create() {
        this.add.image(960, 540, "popUp");

        this.estrellaDos = this.add.image(850, 330, "estrella");
        this.estrellaUno = this.add.image(960, 330, "estrella");
        this.estrellaTres = this.add.image(1070, 330, "estrella");

        this.resumen = this.add.text(868, 430, "Puntuación: ", {
        fontFamily: "tahoma",
        fontSize: "35px",
        fill: "#CC6600",
        });

        this.numeros = this.add.text(885, 470, "0000", {
        fontFamily: "impact",
        fontSize: "70px",
        fill: "#CC6600"
        })

        //BOTON SIGUIENTE NIVEL
        let botonS = this.add.image(1120, 760, "bSiguiente").setInteractive();
        botonS.setFrame(0);
        botonS.on("pointerover", () => {
            botonS.setFrame(1);
        })
        botonS.on("pointerdown", () => {
            botonS.setFrame(1);
            this.scene.stop(this.nivelActualNombre);
            this.scene.start(NIVELES[this.nivelActualIndex + 1], {puntosTotal: this.puntajeFinal});
        })
        botonS.on("pointerout", () => {
            botonS.setFrame(0);
        })

        //REINTENTAR
        let botonR = this.add.sprite(800, 750, "bReintentar").setInteractive();
        botonR.setFrame(0);
        botonR.on("pointerover", () => {
            botonR.setFrame(1);
        })
        botonR.on("pointerdown", () => {
            botonR.setFrame(1);
            this.scene.start(this.obtenerNivelEnPausa());
        })
        botonR.on("pointerout", () => {
            botonR.setFrame(0);
        })

        //MENU PRINCIPAL
        let botonM = this.add.sprite(960, 750, "bMenu").setInteractive();
        botonM.setFrame(0);
        botonM.on("pointerover", () => {
            botonM.setFrame(1);
        })
        botonM.on("pointerdown", () => {
            botonM.setFrame(1);
            this.scene.stop(this.obtenerNivelEnPausa());
            this.scene.start("menuPrincipal");
        })
        botonM.on("pointerout", () => {
            botonM.setFrame(0);
        })
    }

    update() {
        this.numeros.setText(
            this.puntaje
        );

        if (this.cantidadEstrellas == 2) {
            this.estrellaTres.visible = false;
        } else if (this.cantidadEstrellas == 1) {
            this.estrellaTres.visible = false;
            this.estrellaDos.visible = false;
        } else if (this.cantidadEstrellas == 0) {
            this.estrellaTres.visible = false;
            this.estrellaDos.visible = false;
            this.estrellaUno.visible = false;
        };

    }

    obtenerNivelEnPausa(){
        const nivelEnPausa = this.scene.manager.scenes.find(scene => scene.scene.isPaused());
        return nivelEnPausa? nivelEnPausa.scene.key : null;
    }
  
  }
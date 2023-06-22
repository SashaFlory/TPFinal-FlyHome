import { NIVELES } from "../../utils.js";

export default class NivelSuperado extends Phaser.Scene {
    constructor() {
      super("nivelSuperado");
    }

    init(data) {
        this.puntaje = data.puntaje;

        this.puntajeFinal = data.puntosTotal;

        console.log(data);
      
        this.nivelActualNombre = this.obtenerNivelEnPausa();
        this.nivelActualIndex = NIVELES.indexOf(this.nivelActualNombre);
    }

    create() {
        this.add.image(960, 540, "popUp");

        this.resumen = this.add.text(750, 400, "Puntos totales: ", {
        fontFamily: "impact",
        fontSize: "40px",
        fill: "#111111"
        });

        //BOTON SIGUIENTE NIVEL
        let botonS = this.add.image(1100, 750, "bSiguiente").setInteractive();
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
        let botonR = this.add.sprite(960, 600, "bReintentar").setInteractive();
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
        let botonM = this.add.sprite(960, 660, "bMenu").setInteractive();
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
        this.resumen.setText(
            "Puntos totales: " +
            this.puntaje
        );
    }

    obtenerNivelEnPausa(){
        const nivelEnPausa = this.scene.manager.scenes.find(scene => scene.scene.isPaused());
        return nivelEnPausa? nivelEnPausa.scene.key : null;
    }
  
  }
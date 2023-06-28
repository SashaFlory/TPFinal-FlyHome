export default class JuegoGanado extends Phaser.Scene {
    constructor() {
      super("juegoGanado");
    }

    init (data) {
        this.puntajeFinal = data.puntosTotal;

        console.log("puntajeFinal:", this.puntajeFinal);
    }

    create() {
        this.add.image(0, 0, "ganador").setOrigin(0);

        this.add.text(370, 120, "Puntuación final:", {
        fontFamily: "tahoma",
        fontSize: "40px",
        fill: "#111111"
        })

        this.add.text(350, 180, this.puntajeFinal, {
        fontFamily: "impact",
        fontSize: "150px",
        fill: "#111111"
        })

        this.add.text(230, 500, "Gracias por jugar :)", {
            fontFamily: "tahoma",
            fontSize: "70px",
            fill: "#111111"
            })
       
        //MENU PRINCIPAL
        let botonM = this.add.sprite(510, 800, "bMenu").setInteractive();
        botonM.setFrame(0);
        botonM.on("pointerover", () => {
            botonM.setFrame(1);
        })
        botonM.on("pointerdown", () => {
            botonM.setFrame(1);
            this.scene.stop("juegoGanado");
            this.scene.start("menuPrincipal");
        })
        botonM.on("pointerout", () => {
            botonM.setFrame(0);
        })
    }
  
  }
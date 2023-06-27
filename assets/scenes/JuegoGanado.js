export default class JuegoGanado extends Phaser.Scene {
    constructor() {
      super("juegoGanado");
    }

    init (data) {
        this.puntajeFinal = data.puntosTotal;

        console.log("puntajeFinal:", this.puntajeFinal);
    }

    create() {
        this.add.image(0, 0, "tilesCielo1").setOrigin(0);

        this.add.text(500, 500, this.puntajeFinal, {
        fontFamily: "impact",
        fontSize: "40px",
        fill: "#111111"
        })
       
        //MENU PRINCIPAL
        let botonM = this.add.sprite(960, 660, "bMenu").setInteractive();
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
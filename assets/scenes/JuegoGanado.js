export default class JuegoGanado extends Phaser.Scene {
    constructor() {
      super("juegoGanado");
    }

    init (data) {
        //this.puntajeFinal = data.puntosTotal;
        this.puntajeFinal = 1580;

        console.log("puntajeFinal:", this.puntajeFinal);
    }

    create() {
        this.sound.add("victoria");
        this.sound.add("entrarUI");
        
        this.sound.play("victoria");

        this.add.image(0, 0, "ganador").setOrigin(0);
        
        this.add.text(355, 220, "Puntuación final:", {
        fontFamily: "tahoma",
        fontSize: "40px",
        fill: "#4E3A23"
        })

        this.add.text(350, 280, this.puntajeFinal, {
        fontFamily: "impact",
        fontSize: "150px",
        fill: "#4E3A23"
        })

        this.add.text(245, 555, "¡Gracias por jugar!", {
            fontFamily: "tahoma",
            fontSize: "65px",
            fill: "#4E3A23"
            })
       
        //MENU PRINCIPAL
        let botonM = this.add.sprite(80, 80, "bMenu").setInteractive();
        botonM.setFrame(0);
        botonM.on("pointerover", () => {
            botonM.setFrame(1);
        })
        botonM.on("pointerdown", () => {
            botonM.setFrame(1);
            this.sound.play("entrarUI");
            this.scene.stop("juegoGanado");
            this.scene.start("menuPrincipal");
        })
        botonM.on("pointerout", () => {
            botonM.setFrame(0);
        })
    }
  
  }
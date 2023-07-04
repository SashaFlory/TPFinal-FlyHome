export default class Perder extends Phaser.Scene {
    constructor() {
      super("perder");
    }

    create() {
        this.sound.add("entrarUI");
        this.sound.add("derrota");

        this.add.image(0, 0, "pausaPP").setOrigin(0);
        this.add.image(960, 540, "perdedor");

        this.sound.play("derrota");

        this.add.text(790, 270, "¡Has perdido! ", {
            fontFamily: "impact",
            fontSize: "60px",
            fill: "#CC6600",
            });
       
        //REINTENTAR
        let botonR = this.add.sprite(840, 760, "bReintentar").setInteractive();
        botonR.setFrame(0);
        botonR.on("pointerover", () => {
            botonR.setFrame(1);
        })
        botonR.on("pointerdown", () => {
            botonR.setFrame(1);
            this.sound.play("entrarUI");
            this.scene.start(this.obtenerNivelEnPausa());
        })
        botonR.on("pointerout", () => {
            botonR.setFrame(0);
        })

        //MENU PRINCIPAL
        let botonM = this.add.sprite(1060, 750, "bMenu").setInteractive();
        botonM.setFrame(0);
        botonM.on("pointerover", () => {
            botonM.setFrame(1);
        })
        botonM.on("pointerdown", () => {
            botonM.setFrame(1);
            this.sound.play("entrarUI");
            this.scene.stop(this.obtenerNivelEnPausa());
            this.scene.start("menuPrincipal");
        })
        botonM.on("pointerout", () => {
            botonM.setFrame(0);
        })
    }

    obtenerNivelEnPausa(){
        const nivelEnPausa = this.scene.manager.scenes.find(scene => scene.scene.isPaused());
        return nivelEnPausa? nivelEnPausa.scene.key : null;
    }
  
  }
  
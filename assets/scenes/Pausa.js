export default class Pausa extends Phaser.Scene {
    constructor() {
      super("pausa");
    }

    create() {
        this.sound.add("entrarUI");
        this.sound.add("salirUI");

        this.add.image(0, 0, "pausaPP").setOrigin(0);

        this.add.text(830, 300, "PAUSA", {
            fontFamily: "impact",
            fontSize: "100px",
            fill: "#CC6600"
        })
        
        this.keys = this.input.keyboard.addKeys({p:  Phaser.Input.Keyboard.KeyCodes.P});
       
        //REINTENTAR
        let botonR = this.add.sprite(1150, 550, "bReintentar").setInteractive();
        botonR.setFrame(0);
        botonR.on("pointerover", () => {
            botonR.setFrame(1);
        })
        botonR.on("pointerdown", () => {
            botonR.setFrame(1);
            this.sound.play("entrarUI");
            this.scene.start(this.obtenerNivelEnPausa());
            this.scene.stop("pausa");
        })
        botonR.on("pointerout", () => {
            botonR.setFrame(0);
        })

        //MENU PRINCIPAL
        let botonM = this.add.sprite(960, 550, "bMenu").setInteractive();
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

        //boton VOLVER
        let botonV = this.add.sprite(755, 555, "bVolver").setInteractive();
        botonV.setFrame(0);

        botonV.on("pointerover", () => {
            botonV.setFrame(1);
        })
        botonV.on("pointerdown", () => {
            botonV.setFrame(1);
            this.sound.play("salirUI");
            this.scene.resume(this.obtenerNivelEnPausa());
            this.scene.stop("pausa");
        })
         botonV.on("pointerout", () => {
             botonV.setFrame(0);
         })
    }

    update() {
        
        if (this.keys.p.isDown) {
            this.sound.play("salirUI");
            this.scene.resume(this.obtenerNivelEnPausa());
            this.scene.stop("pausa");
        }
    }

    obtenerNivelEnPausa(){
        const nivelEnPausa = this.scene.manager.scenes.find(scene => scene.scene.isPaused());
        return nivelEnPausa? nivelEnPausa.scene.key : null;
    }
  
  }
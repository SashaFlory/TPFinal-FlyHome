export default class Pausa extends Phaser.Scene {
    constructor() {
      super("pausa");
    }

    create() {
        this.add.image(960, 500, "popUp");

        this.add.text(900, 300, "PAUSA", {
            fontFamily: "impact",
            fontSize: "50px",
            fill: "#CC6600"
        })
        
        this.cursors = this.input.keyboard.createCursorKeys();

        this.keys = this.input.keyboard.addKeys({p:  Phaser.Input.Keyboard.KeyCodes.P});
       
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

        //boton VOLVER
        let botonV = this.add.sprite(660, 750, "bVolver").setInteractive();
        botonV.setFrame(0);

        botonV.on("pointerover", () => {
            botonV.setFrame(1);
        })
        botonV.on("pointerdown", () => {
            botonV.setFrame(1);
            this.scene.resume(this.obtenerNivelEnPausa());
            this.scene.stop("pausa");
        })
         botonV.on("pointerout", () => {
             botonV.setFrame(0);
         })
    }

    update() {
        
        if (this.keys.p.isDown) {
            this.scene.resume(this.obtenerNivelEnPausa());
            this.scene.stop("pausa");
        }
    }

    obtenerNivelEnPausa(){
        const nivelEnPausa = this.scene.manager.scenes.find(scene => scene.scene.isPaused());
        return nivelEnPausa? nivelEnPausa.scene.key : null;
    }
  
  }
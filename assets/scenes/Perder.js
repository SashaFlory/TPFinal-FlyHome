export default class Perder extends Phaser.Scene {
    constructor() {
      super("perder");
    }

    //PROBAR CAMBIO ENTRE ESCENA ACTUAL CON SENTENCIA IF
    
    create() {
        this.add.image(960, 540, "popUp");

        this.add.text(820, 320, "¡Has perdido! ", {
            fontFamily: "impact",
            fontSize: "50px",
            fill: "#CC6600",
            });
       
        //REINTENTAR
        let botonR = this.add.sprite(820, 780, "bReintentar").setInteractive();
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
        let botonM = this.add.sprite(1090, 780, "bMenu").setInteractive();
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

    obtenerNivelEnPausa(){
        const nivelEnPausa = this.scene.manager.scenes.find(scene => scene.scene.isPaused());
        return nivelEnPausa? nivelEnPausa.scene.key : null;
    }
  
  }
  
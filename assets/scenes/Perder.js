export default class Perder extends Phaser.Scene {
    constructor() {
      super("perder");
    }

    //PROBAR CAMBIO ENTRE ESCENA ACTUAL CON SENTENCIA IF
    
    create() {
        this.add.image(960, 540, "popUp");
       
        //REINTENTAR
        let botonR = this.add.sprite(960, 600, "bReintentar").setInteractive();
        botonR.setFrame(0);
        botonR.on("pointerover", () => {
            botonR.setFrame(1);
        })
        botonR.on("pointerdown", () => {
            botonR.setFrame(1);
            this.scene.start("nivel1");
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
            this.scene.stop("nivel1");
            this.scene.start("menuPrincipal");
        })
        botonM.on("pointerout", () => {
            botonM.setFrame(0);
        })
    }
  
  }
  
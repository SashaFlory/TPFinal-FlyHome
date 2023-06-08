export default class Perder extends Phaser.Scene {
    constructor() {
      // key of the scene
      // the key will be used to start the scene by other scenes
      super("perder");
    }

    create() {
        //PARA LAS ESCENAS TUTORIAL Y CRÉDITOS HACER THIS.SCENE.LAUNCH --> POP UP
        this.add.image(960, 540, "perdiste");
       
        let botonR = this.add.image(960, 600, "bReintentar").setInteractive();
        botonR.on("pointerover", () => {
            botonR.setTexture("bReintentar-P");
        })
        botonR.on("pointerdown", () => {
            botonR.setTexture("bReintentar-P");
            this.scene.start("nivel1");
        })
        botonR.on("pointerout", () => {
            botonR.setTexture("bReintentar");
        })

        let botonM = this.add.image(960, 660, "bMenu").setInteractive();
        botonM.on("pointerover", () => {
            botonM.setTexture("bMenu-P");
        })
        botonM.on("pointerdown", () => {
            botonM.setTexture("bMenu-P");
            this.scene.stop("nivel1");
            this.scene.start("menuPrincipal");
        })
        botonM.on("pointerout", () => {
            botonM.setTexture("bMenu");
        })
    }
  
  }
  
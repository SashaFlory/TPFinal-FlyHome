export default class Tutorial extends Phaser.Scene {
    constructor() {
      // key of the scene
      // the key will be used to start the scene by other scenes
      super("tutorial");
    }

    create() {
        //PARA LAS ESCENAS TUTORIAL Y CRÉDITOS HACER THIS.SCENE.LAUNCH --> POP UP
        this.add.image(960, 540, "tutorial");

       //boton VOLVER
        let botonV = this.add.image(660, 780, "bVolver").setInteractive();
        botonV.on("pointerover", () => {
            botonV.setTexture("bVolver-P");
        })
        botonV.on("pointerdown", () => {
            botonV.setTexture("bVolver-P");
            this.scene.start("menuPrincipal");
        })
        botonV.on("pointerout", () => {
            botonV.setTexture("bVolver");
        })

    }
  
  }
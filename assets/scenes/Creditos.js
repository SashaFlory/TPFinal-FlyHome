export default class Creditos extends Phaser.Scene {
    constructor() {
      // key of the scene
      // the key will be used to start the scene by other scenes
      super("creditos");
    }

    create() {
        //PARA LAS ESCENAS TUTORIAL Y CRÉDITOS HACER THIS.SCENE.LAUNCH --> POP UP
        this.add.image(960, 540, "creditos");
        
       //boton VOLVER
        let botonV = this.add.sprite(680, 770, "bVolver").setInteractive();
        botonV.setFrame(0);

        botonV.on("pointerover", () => {
            botonV.setFrame(1);
        })
        botonV.on("pointerdown", () => {
            botonV.setFrame(1);
            this.scene.start("menuPrincipal");
        })
         botonV.on("pointerout", () => {
             botonV.setFrame(0);
         })

    }
  
  }
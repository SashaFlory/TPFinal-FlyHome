export default class Creditos extends Phaser.Scene {
    constructor() {
      // key of the scene
      // the key will be used to start the scene by other scenes
      super("creditos");
    }

    create() {
        this.sound.add("salirUI");

        this.add.image(960, 540, "creditos");

        this.musica = this.scene.get('menuPrincipal').music;
        
       //boton VOLVER
        let botonV = this.add.sprite(680, 770, "bVolver").setInteractive();
        botonV.setFrame(0);

        botonV.on("pointerover", () => {
            botonV.setFrame(1);
        })
        botonV.on("pointerdown", () => {
            botonV.setFrame(1);
            this.sound.play("salirUI");
            this.scene.resume("menuPrincipal");
            this.scene.stop("creditos");
        })
         botonV.on("pointerout", () => {
             botonV.setFrame(0);
         })

    }
  
  }
export default class Tutorial extends Phaser.Scene {
    constructor() {
      super("tutorial");
    }

    create() {
        this.sound.add("salirUI");

        this.add.image(960, 540, "tutorial");

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
           this.scene.stop("tutorial")
       })
        botonV.on("pointerout", () => {
            botonV.setFrame(0);
        })

    }
  
  }
export default class Tutorial extends Phaser.Scene {
    constructor() {
      super("tutorial");
    }

    create() {
        this.add.image(960, 540, "tutorial");

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
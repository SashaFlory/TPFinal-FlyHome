export default class MenuPrincipal extends Phaser.Scene {
    constructor() {
      // key of the scene
      // the key will be used to start the scene by other scenes
      super("menuPrincipal");
    }

    create() {
      //PARA LAS ESCENAS TUTORIAL Y CRÉDITOS HACER THIS.SCENE.LAUNCH --> POP UP
      this.add.image(0, 0, "tilesCielo1").setScale(2);
      this.add.image(960, 320, "flyHome");

      let botonJ = this.add.text(850, 600, "JUGAR", {
        fontSize: "60px",
        fill: "#111111",
      }).setInteractive()

      botonJ.on("pointerover", () => {
        this.add.text(850, 600, "JUGAR", {
          fontSize: "60px",
          fill: "#FFFFFF",
        })
        })
        
      botonJ.on("pointerdown", () => {
        this.scene.start("nivel1");})

      botonJ.on("pointerout", () => {
        this.add.text(850, 600, "JUGAR", {
          fontSize: "60px",
          fill: "#111111",
        })
        ;})
    }
  
    update() {
      // update game objects
    }
  }
  
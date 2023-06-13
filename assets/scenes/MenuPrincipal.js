export default class MenuPrincipal extends Phaser.Scene {
    constructor() {
      super("menuPrincipal");
    }

    create() {
      this.add.image(0, 0, "tilesCielo1").setScale(2);
      this.add.image(960, 320, "flyHome");

      //JUEGO
      let botonJ = this.add.text(850, 620, "JUGAR", {
        fontFamily: "impact",
        fontSize: "60px",
        fill: "#111111",
      }).setInteractive()

      botonJ.on("pointerover", () => {
        this.add.text(850, 620, "JUGAR", {
          fontFamily: "impact",
          fontSize: "60px",
          fill: "#FFFFFF",
        });})

      botonJ.on("pointerdown", () => {
        this.scene.start("nivel2");})

      botonJ.on("pointerout", () => {
        this.add.text(850, 620, "JUGAR", {
          fontFamily: "impact",
          fontSize: "60px",
          fill: "#111111",
        });})

        //TUTORIAL
        let botonT = this.add.text(550, 900, "Tutorial", {
          fontFamily: "impact",
          fontSize: "60px",
          fill: "#111111",
        }).setInteractive()

        botonT.on("pointerover", () => {
          this.add.text(550, 900, "Tutorial", {
            fontFamily: "impact",
            fontSize: "60px",
            fill: "#FFFFFF",
          });})

        botonT.on("pointerdown", () => {
          this.scene.pause("menuPrincipal");
          this.scene.launch("tutorial");})

        botonT.on("pointerout", () => {
          this.add.text(550, 900, "Tutorial", {
            fontFamily: "impact",
            fontSize: "60px",
            fill: "#111111",
          });})

          //CREDITOS
          let botonC = this.add.text(1050, 900, "Créditos", {
            fontFamily: "impact",
            fontSize: "60px",
            fill: "#111111",
          }).setInteractive()
  
          botonC.on("pointerover", () => {
            this.add.text(1050, 900, "Créditos", {
              fontFamily: "impact",
              fontSize: "60px",
              fill: "#FFFFFF",
            });})
  
          botonC.on("pointerdown", () => {
            this.scene.pause("menuPrincipal");
            this.scene.launch("creditos");})
  
          botonC.on("pointerout", () => {
            this.add.text(1050, 900, "Créditos", {
              fontFamily: "impact",
              fontSize: "60px",
              fill: "#111111",
            });})
    }
  
  }
  
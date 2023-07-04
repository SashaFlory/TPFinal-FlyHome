export default class MenuPrincipal extends Phaser.Scene {
    constructor() {
      super("menuPrincipal");
    }

    create() {
      this.musica = this.sound.add("menuMusica");
      this.musica.play({ loop: true });
      this.musica.setVolume(0.5);

      this.sound.add("entrarUI");

      this.add.image(0, 0, "menuP").setOrigin(0);
      
      //JUEGO
      let botonJ = this.add.image(1370, 500, "bJugar").setInteractive();
      botonJ.setFrame(0);
      botonJ.on("pointerover", () => {
        botonJ.setFrame(1);
      })
      botonJ.on("pointerdown", () => {
        botonJ.setFrame(1);
        this.sound.play("entrarUI");
        this.scene.start("nivel1");
        this.musica.stop();
        this.scene.stop("menuPrincipal");
      })
      botonJ.on("pointerout", () => {
        botonJ.setFrame(0);
      })

      //TUTORIAL
      let botonT = this.add.image(1370, 680, "bTutorial").setInteractive();
      botonT.setFrame(0);
      botonT.on("pointerover", () => {
        botonT.setFrame(1);
      })
      botonT.on("pointerdown", () => {
        botonT.setFrame(1);
        this.sound.play("entrarUI");
        this.scene.pause("menuPrincipal");
        this.scene.launch("tutorial");})
      botonT.on("pointerout", () => {
        botonT.setFrame(0);
      })

      //CREDITOS
      let botonC = this.add.image(1370, 860, "bCreditos").setInteractive();
      botonC.setFrame(0);
      botonC.on("pointerover", () => {
        botonC.setFrame(1);
      })
      botonC.on("pointerdown", () => {
        botonC.setFrame(1);
        this.sound.play("entrarUI");
        this.scene.pause("menuPrincipal");
        this.scene.launch("creditos");})
      botonC.on("pointerout", () => {
        botonC.setFrame(0);
      })

    }
  
  }
  
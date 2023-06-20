export default class NivelSuperado extends Phaser.Scene {
    constructor() {
      super("nivelSuperado");
    }

    init(data) {
        this.puntaje1 = data.puntaje1;
        this.puntaje2 = data.puntaje2;
        this.puntaje3 = data.puntaje3;

        console.log(data);
    }

    create() {
        this.add.image(960, 540, "popUp");

        this.resumen = this.add.text(750, 400, "Puntos totales: ", {
        fontFamily: "impact",
        fontSize: "40px",
        fill: "#111111"
        });
       
        //BOTON SIGUIENTE NIVEL
        let botonS = this.add.image(1100, 750, "bSiguiente").setInteractive();
        botonS.setFrame(0);
        botonS.on("pointerover", () => {
            botonS.setFrame(1);
        })
        botonS.on("pointerdown", () => {
            botonS.setFrame(1);
            this.scene.stop("nivel1");
            this.scene.start("nivel2");
        })
        botonS.on("pointerout", () => {
            botonS.setFrame(0);
        })

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

    update() {
        this.resumen.setText(
            "Puntos totales: " +
            this.puntaje1
        );
    }
  
  }
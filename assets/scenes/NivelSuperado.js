export default class NivelSuperado extends Phaser.Scene {
    constructor() {
      super("nivelSuperado");
    }

    init(data) {
        this.puntaje = data.puntaje;
        console.log(data);

    }

    create() {
        this.add.image(960, 540, "superado");

        this.resumen = this.add.text(750, 400, "Puntos totales: ", {
        fontFamily: "impact",
        fontSize: "40px",
        fill: "#111111"
        });
       
        //BOTON REINTENTAR
        let botonR = this.add.image(800, 750, "bReintentar").setInteractive();
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
        //BOTON SIGUIENTE NIVEL
        let botonS = this.add.image(1100, 750, "bSiguiente").setInteractive();
        botonS.on("pointerover", () => {
            botonS.setTexture("bSiguiente-P");
        })
        botonS.on("pointerdown", () => {
            botonS.setTexture("bSiguiente-P");
            this.scene.stop("nivel1");
            this.scene.start("nivel2");
        })
        botonS.on("pointerout", () => {
            botonS.setTexture("bSiguiente");
        })
        //BOTON MENU PRINCIPAL
        let botonM = this.add.image(960, 800, "bMenu").setInteractive();
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

    update() {
        this.resumen.setText(
            "Puntos totales: " +
            this.puntaje
        );
    }
  
  }
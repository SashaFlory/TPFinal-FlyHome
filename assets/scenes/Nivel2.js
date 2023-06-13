export default class Nivel2 extends Phaser.Scene {
    constructor() {
      super("nivel2");
    }

    create() {
        this.add.image(960, 540, "flyHome");
    }
  
  }
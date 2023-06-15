import { MOVIMIENTOS, FRUTA_PUNTOS } from "../../utils.js";

export default class Nivel3 extends Phaser.Scene {
    constructor() {
      super("nivel3");
    }

    create() {
        this.add.image(0, 0, "tilesCielo3");
        this.add.sprite(100, 300, "birdie")
       

    }
  
  }
import * as PIXI from "pixi.js";
import { Game } from "./game";
  //Player
export class Turtle extends PIXI.Sprite {
  private xspeed = 0;
  private yspeed = 0;

  //game
  private mygame: Game;

  //Object
  constructor(mygame: Game, texture: PIXI.Texture) {
    super(texture);
    this.xspeed = 0;
    this.yspeed = 0;
    this.x = 200;
    this.y = 400;
    this.scale.set(0.7);
    this.mygame = mygame;

    //KeyboardControls
    window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e));
    window.addEventListener("keyup", (e: KeyboardEvent) => this.onKeyUp(e));
  }
  public hit() {
    this.x = window.innerWidth + 100;
  }
  //swim
  public swim() {
    this.x += this.xspeed;
    this.y += this.yspeed;
  }
  //shoot bubbles
  private shoot() {
    this.mygame.shootBubble(this.x, this.y);
  }

  //besturing met arrowkey
  private onKeyDown(e: KeyboardEvent): void {
    switch (e.key.toUpperCase()) {
      case " ":
        this.shoot();
        break;
      case "ARROWLEFT":
        this.xspeed = -5;
        break;
      case "ARROWRIGHT":
        this.xspeed = 5;
        break;
      case "ARROWUP":
        this.yspeed = -5;
        break;
      case "ARROWDOWN":
        this.yspeed = 5;
        break;
    }
  }

  private onKeyUp(e: KeyboardEvent): void {
    switch (e.key.toUpperCase()) {
      case " ":
        break;
      case "A":
      case "D":
      case "ARROWLEFT":
      case "ARROWRIGHT":
        this.xspeed = 0;
        break;
      case "W":
      case "S":
      case "ARROWUP":
      case "ARROWDOWN":
        this.yspeed = 0;
        break;
    }


  }
  keepInScreen(){
    if (this.getBounds().left > this.mygame.pixi.screen.right){
        this.x = -this.getBounds().width
    }

}
  }

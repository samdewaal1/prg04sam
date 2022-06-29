import * as PIXI from "pixi.js";
import { Jelly } from "./jelly";
import { Turtle } from "./turtle";
import { Bubble } from "./bubble";
import { UI } from "./UI"


import jellyImage from "./images/jelly.png";
import turtleImage from "./images/turtle.png";
import bubbleImage from "./images/bubble.png";
import waterImage from "./images/tilingwater.png";

export class Game {
  pixi: PIXI.Application;
  interface: UI;
  private loader: PIXI.Loader;
  private jellys: Jelly[] = [];
  private bubbles: Bubble[] = [];
  private turtle: Turtle;
  public container: PIXI.Container

  

  constructor() {
    const container = document.getElementById("container")!
    
    this.pixi = new PIXI.Application({ width: 1920, height: 1080 })
    container.appendChild(this.pixi.view)
    this.interface = new UI()
    this.loader = new PIXI.Loader();
    this.loader
      .add("jellyTexture", jellyImage)
      .add("bubbleTexture", bubbleImage)
      .add("waterTexture", waterImage)
      .add("turtleTexture", turtleImage);
      
    this.loader.load(() => this.startGame());
  }


  private startGame() {
    let bg = new PIXI.TilingSprite(
      this.loader.resources["waterTexture"].texture!,
      this.pixi.screen.width,
      this.pixi.screen.height
    );
    this.pixi.stage.addChild(bg);
    this.pixi.stage.addChild(this.interface);

    for (let i = 0; i < 14; i++) {
      let jelly = new Jelly(this.loader.resources["jellyTexture"].texture!);
      this.pixi.stage.addChild(jelly);
      this.jellys.push(jelly);
    }

    this.turtle = new Turtle(
      this,
      this.loader.resources["turtleTexture"].texture!
    );
    this.pixi.stage.addChild(this.turtle);
    this.pixi.ticker.add(() => this.update());
    
 
  }


  public shootBubble(bx: number, by: number) {
    let bubble = new Bubble(
      bx,
      by,
      this,
      this.loader.resources["bubbleTexture"].texture!
    );
    this.pixi.stage.addChild(bubble);
    this.bubbles.push(bubble);
  }

  public removeBubble(bubble: Bubble) {
    this.bubbles = this.bubbles.filter((b) => b !== bubble);
  }


  private update() {
    for (let jelly of this.jellys) {
      jelly.swim();
      for (let b of this.bubbles) {
        if (this.collision(b, jelly)) {
          b.hit();
          jelly.hit();
          this.interface.addScore(1)
          console.log("hit")


        }
      }
    }
    for (let bubble of this.bubbles) {
      bubble.update();
    }

    this.turtle.swim();


  }
  
  private collision(sprite1: PIXI.Sprite, sprite2: PIXI.Sprite) {
    const bounds1 = sprite1.getBounds();
    const bounds2 = sprite2.getBounds();

    return (
      bounds1.x < bounds2.x + bounds2.width &&
      bounds1.x + bounds1.width > bounds2.x &&
      bounds1.y < bounds2.y + bounds2.height &&
      bounds1.y + bounds1.height > bounds2.y
      
    );
  }

  }
  new Game()
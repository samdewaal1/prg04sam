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
  private pixi: PIXI.Application;
  private loader: PIXI.Loader;
  private jellys: Jelly[] = [];
  private bubbles: Bubble[] = [];
  private turtle: Turtle;
  private ui:UI
  public container: PIXI.Container

  constructor() {
    const container = document.getElementById("container")!
    this.pixi = new PIXI.Application({ width: 1920, height: 1080 })
    container.appendChild(this.pixi.view)
    this.ui = new UI(this)
    this.loader = new PIXI.Loader();
    this.loader
      .add("jellyTexture", jellyImage)
      .add("bubbleTexture", bubbleImage)
      .add("waterTexture", waterImage)
      .add("turtleTexture", turtleImage);

    this.loader.onProgress.add((loader) => this.showProgress(loader));
    this.loader.onError.add((arg) => {
      console.error(arg);
    });
    this.loader.load(() => this.startGame());
  }

  private showProgress(p: PIXI.Loader) {
    console.log(p.progress);
  }


  private startGame() {
    let bg = new PIXI.TilingSprite(
      this.loader.resources["waterTexture"].texture!,
      this.pixi.screen.width,
      this.pixi.screen.height
    );
    this.pixi.stage.addChild(bg);

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

    private gameOverButton : PIXI.Sprite

    private gameOver(){
        console.log("game over")
        this.pixi.stop()
        this.gameOverButton = new PIXI.Sprite(PIXI.Texture.WHITE) // jouw eigen sprite hier
        this.gameOverButton.width = 100
        this.gameOverButton.height = 50
        this.gameOverButton.x = 400
        this.gameOverButton.y = 200
        this.gameOverButton.interactive = true
        this.gameOverButton.buttonMode = true
        this.gameOverButton.on('pointerdown', () => this.resetGame())

        this.pixi.stage.addChild(this.gameOverButton)
    }

    private resetGame(){
        // verwijder de game over button
        this.gameOverButton.destroy() 
        // voorbeeld van het verwijderen van game elementen
        for (let bubble of this.bubbles) {
            bubble.destroy()
        }
        this.bubbles = []
        // herstart pixi
        this.pixi.start()
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
          console.log(this.checkCollisions())

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
  private checkCollisions() {
    for (let bubble of this.bubbles) {
        for (let jelly of this.jellys) {
            if(this.collision(bubble, jelly)){
                this.ui.updateScore(10)
                break
            }
        }
    }
  }}
  new Game()
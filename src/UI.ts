import * as PIXI from "pixi.js"
import { Game } from "./Game"

export class UI extends PIXI.Container {

    scoreField:PIXI.Text
    nameField:PIXI.Text

    constructor(){
        super()
        const style = new PIXI.TextStyle({
            fontFamily: 'ArcadeFont',
            fontSize: 40,
            fontWeight: 'bold',
            fill: ['#ffffff']
        })
    
        this.scoreField = new PIXI.Text(`Score : 0`, style)
        this.addChild(this.scoreField)
        this.scoreField.x = 10
        this.scoreField.y = 10

        this.nameField = new PIXI.Text(``, style)
        this.addChild(this.nameField)
        this.nameField.x = 10
        this.nameField.y = 10
    }
    score:number = 0

    // voeg een getal toe aan de score
    addScore(n:number) {
        this.score += n
        this.scoreField.text = `Score : ${this.score}`
    }
}

import * as PIXI from "pixi.js"
import { Game } from "./Game"


export class UI {
    public container : PIXI.Container
    private scoreField: PIXI.Text
    private game:Game
    private score:number = 0

    constructor(game: Game) { 
        this.game = game
        const container = document.getElementById("container")!
        const style = new PIXI.TextStyle({
            fontFamily: 'ArcadeFont',
            fontSize: 40,
            fontWeight: 'bold',
            fill: ['#ffffff']
        })
    
        this.scoreField = new PIXI.Text('Score : 0', style)
        this.scoreField.x = 20
        this.scoreField.y = 20

 
    }


}

// import dot from "./dot"



const canvas = document.createElement('canvas')


class game {
    constructor() {
        this.init()


    }




    init() {
        this.game = canvas
        document.body.appendChild(this.game)
        this.ctx = this.game.getContext('2d')
        this.itemColor = 'red'  
        this.board = new board(this)
        this.createBrick()
        this.loop()
        this.startGame()
    }
    startGame() {
        setInterval(() => this.shape.fall(), 500)
    }
    loop() {
        this.update()
        this.clearRect()
        this.draw()
        setTimeout(() => this.loop(), 30)
    }
    clearRect() {
        this.ctx.clearRect(0, 0, gameWidth, gameHeight)
    }
    createBrick(){
        this.shape=new brick(this)
    }
    update() {

    }

    draw() {
        const _this = this
        // // this.d.draw()
        this.board.run()
        this.shape.draw()
        // console.log(this)
        // this.data.forEach((item, index) => {
        //     item.draw()
        // })
        // console.log(this.data)


    }




}

const g = new game()

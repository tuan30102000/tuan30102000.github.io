class dot {
    constructor(game, x, y) {
        this.game = game
        this.size = dotSize
        this.col = y
        this.row = x

    }
    //fall
    hitBottom() {
        return this.row == gameHeight / dotSize - 1
    }
    canFall() {
        if (this.hitBottom()) return false
        if (this.game.board.checkEmttyCell(this.col, this.row + 1)) return false
        return true
    }
    fall() {
        if (this.canFall()) this.row += 1
    }

    //left
    hitLeft() {
        return this.col == 0
    }
    canMoveLeft() {
        if (this.hitLeft()) return false
        if (this.game.board.checkEmttyCell(this.col-1, this.row)) return false
        return true
    }
    moveLeft() {
        if (this.canMoveLeft()) this.col -= 1
    }

    //right
    hitRight() {
        return this.col == gameWidth / dotSize - 1
    }
    canMoveRight() {
        if (this.hitRight()) return false
        if (this.game.board.checkEmttyCell(this.col + 1, this.row)) return false
        return true
    }
    moveRight() {
        if (this.canMoveRight()) this.col += 1
    }



    draw() {
        this.game.ctx.fillStyle = 'red'
        const y = this.size * this.row
        const x = this.size * this.col
        this.game.ctx.fillRect(x + 1, y + 1, this.size - 1, this.size - 1)
        // this.fall()
    }
    addToBoard() {
        this.game.board.addToBoardData(this.row + 5, this.col)
    }
}



const _ = 0
const x = 1

class board {
    constructor(game) {
        this.game = game
        this.width = gameWidth
        this.height = gameHeight
        this.game.game.width = this.width
        this.listDot = []
        this.game.game.height = this.height
        this.data = [
            [_, _, _, _, _, _, _, _, _, _,],
            [_, _, _, _, _, _, _, _, _, _,],
            [_, _, _, _, _, _, _, _, _, _,],
            [_, _, _, _, _, _, _, _, _, _,],
            [_, _, _, _, _, _, _, _, _, _,],
            [_, _, _, _, _, _, _, _, _, _,],
            [_, _, _, _, _, _, _, _, _, _,],
            [_, _, _, _, _, _, _, _, _, _,],
            [_, _, _, _, _, _, _, _, _, _,],
            [_, _, _, _, _, _, _, _, _, _,],
            [_, _, _, _, _, _, _, _, _, _,],
            [_, _, _, _, _, _, _, _, _, _,],
            [_, _, _, _, _, _, _, _, _, _,],
            [_, _, _, _, _, _, _, _, _, _,],
            [_, _, _, _, _, _, _, _, _, _,],
            [_, _, _, _, _, _, _, _, _, _,],
            [_, _, _, _, _, _, _, _, _, _,],
            [_, _, _, _, _, _, _, _, _, _,],
            [_, _, _, _, _, _, _, _, _, _,],
            [_, _, _, _, _, _, _, _, _, _,],
            [_, _, _, _, _, _, _, _, _, _,],
            [_, _, _, _, _, _, _, _, _, _,],
            [_, _, _, _, _, _, _, _, _, _,],
            [_, _, _, _, _, _, _, _, _, _,],
            [_, _, _, _, _, _, _, _, _, _,],

        ]
    }
    checkEmttyCell(col, row) {
            return !!this.data[row + 5][col]
    }
    run() {
        const _this = this
        this.data.forEach((itemX, iX) => {
            itemX.forEach((itemY, iY) => {
                if (itemY) {
                    this.listDot.push(new dot(this.game, iX - 5, iY))
                }
            })
        })

        this.listDot.forEach(item => item.draw())
    }
    addToBoardData(row, col) {
        this.data[row][col] = x
    }
}
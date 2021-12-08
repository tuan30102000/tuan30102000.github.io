class brick {
    constructor(game) {
        this.game = game
        this.init()
        this.col = rangeRandom(8)
        this.row = -5
        this.shape = this.createShape()
        this.createDot()
    }
    init() {
        this.handleEvent()
    }
    removeEvent() {
        document.removeEventListener('keydown',this.handleMove.bind(this))
    }
    handleEvent(){
        document.addEventListener('keydown',this.handleMove.bind(this))
    }
    handleMove(e) {
        
            switch (e.keyCode) {
                case 37:
                    this.moveLeft()
                    // console.log(this)
                    break;
                case 39:
                    this.moveRight()
                    break;
                case 32:
                    this.roate()
                    break;

                default:
                    break;
            }
        

    }
    //fall
    canFall() {
        return this.listDot.every(item => {
            return item.canFall()
        })
    }
    fall() {
        if (this.canFall()) {
            this.listDot.forEach(item => item.fall())
            this.row++
        }
        else {
            this.removeEvent()
            this.addToBoard()
            this.game.createBrick()
        }
    }
    //left
    canMoveLeft() {
        return this.listDot.every(item => {
            return item.canMoveLeft()
        })
    }
    moveLeft() {
        if (this.canMoveLeft()) {
            this.listDot.forEach(item => item.moveLeft())
            this.col--
        }
    }
    //right
    canMoveRight() {
        return this.listDot.every(item => {
            return item.canMoveRight()
        })
    }
    moveRight() {
        if (this.canMoveRight()) {
            this.listDot.forEach(item => item.moveRight())
            this.col++
        }
       
    }
    createShape() {
        const data = [
            [
                [x, _,],
                [x, _,],
                [x, x,],
            ],
            [
                [x,],
                [x,],
                [x,],
                [x,],
            ],
            [

                [x, x, _],
                [_, x, x],
            ],
            [
                [x, x,],
                [x, x,],

            ],
            [
                [_, x,],
                [_, x,],
                [x, x,],
            ],
            [
                [_, x,],
                [x, x,],
                [_, x,],
            ],
            [
                [_, x, x],
                [x, x, _],

            ],
        ]

        return data[rangeRandom(6)]
    }

    addToBoard() {
        this.listDot.forEach(item => {
            item.addToBoard()
        })
    }
    createDot() {
        this.game.clearRect()
        const arr = []
        const x = this.x
        const _this = this
        this.shape.forEach((itemRow, iRow) => {
            itemRow.forEach((itemCol, iCol) => {
                if (itemCol) {
                    arr.push(new dot(_this.game, this.row + iRow, this.col + iCol))
                }
            })
        })
        // console.log(arr)
        this.listDot = arr
        // this.listDot.forEach(item => item.draw())
    }
    draw() {
        this.listDot.forEach(item => item.draw())
    }
    roate() {
        let lengthItem = this.shape[0].length
        let lengthArr = this.shape.length

        let newData = []
        for (let i = 0; i < lengthItem; i++) {
            let newArr = []
            for (let j = 0; j < lengthArr; j++) {
                newArr.push(this.shape[lengthArr - j - 1][i])
            }
            newData.push(newArr)

        }

        this.shape = newData
        this.createDot()
        this.draw()
    }
}
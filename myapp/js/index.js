// import randomColor from 'randomColor'

const GAME_STATUS = {
    PENDING: 'pending',
    PLAYING: 'playing',
    FAIL: 'fail',
    COMPLETE: 'complete'
}

const PAIRS_COUNT = 8
const GAME_TIME = 40
const audioClickSound = document.getElementById('click-sound')
const audioPointSound = document.getElementById('point-sound')
const audioCoundownSound = document.getElementById('coundown-sound')
const audioFailSound = document.getElementById('fail-sound')
const audioWinSound = document.getElementById('winner-sound')
const bodyElm = document.querySelector('body')
// const randomColor = () => {
//     let randomColor/*  = Math.floor(Math.random() * 16777215).toString(16); */
//     for (let i = 0; i <= 100000000000000000000; i++) {
//         randomColor = Math.floor(Math.random() * 16777215).toString(16);
//         if (randomColor != '#000000') break
//     }
//     return '#' + randomColor
// }
function rangeRandom(min, max) {
    return (Math.random() * (max - min) + min).toFixed(0);
    // min = Math.ceil(min);
    // max = Math.floor(max);
    // return Math.floor(Math.random() * (max - min + 1)) + min;
}
function randomListNumber(length, max) {
    const listRandom = []
    while (listRandom.length < length) {
        const index = rangeRandom(0, max - 1)
        if (!listRandom.includes(index)) listRandom.push(index)
    }
    return listRandom
}

function positionToXY(number, s) {
    return {
        x: Math.floor(number / s), y: number % s
    }
}

class O {
    constructor(index, color, parrentElm, pushItem) {
        this.elm = document.createElement('li')
        this.color = color
        this.pushItem = pushItem
        this.currentColor = '#000'
        this.elm.innerHTML = `
        <div class="w-full main" style=\'background-color:${this.color};\' ></div>
        `
        this.canClick = true
        this.changeCurrentColor()
        this.elm.classList.add('playing-item')
        this.parrentElm = parrentElm
        this.handleEvent()
    }
    changeCurrentColor() {
        this.elm.style.backgroundColor = this.currentColor
    }

    render() {
        this.parrentElm.appendChild(this.elm)
    }
    showColor() {
        this.elm.classList.add('active')
        this.canClick = false

    }
    setCannotClick() {
        this.canClick = false
    }
    hideColor() {
        this.elm.classList.remove('active')
        this.canClick = true
    }
    handleEvent() {
        this.elm.onclick = () => {
            if (!this.canClick) return
            this.pushItem(this)
            audioClickSound.play()
            // this.timeOutId = setTimeout(() => {
            //     this.hideColor()
            // }, 2000)

        }
    }
}

class game {
    constructor() {
        this.status = GAME_STATUS.PENDING
        this.elm = $('#app')

        this.renderStart()
    }
    createParrentElm() {
        const parrentElm = document.createElement('ul')
        this.parrentElm = parrentElm
        this.parrentElm.classList.add('grid-parrent')
    }
    createTimeElm() {
        this.timeElm = document.createElement('p')
        $(this.timeElm).text(GAME_TIME)
        $(this.timeElm).addClass('game-timer')
        this.countTime()
    }
    createReplayBtn(classBtn = 'playing') {
        this.replayBtn = document.createElement('div')
        const img = document.createElement('img')
        img.src = './img/60825.png'
        this.replayBtn.appendChild(img)
        this.replayBtn.classList.add('btn-replay')
        this.replayBtn.classList.add(classBtn)
        $(this.replayBtn).click(this.handleReplay.bind(this))
    }
    createPointElm() {
        this.pointElm = document.createElement('p')
        $(this.pointElm).text('0')
        $(this.pointElm).addClass('game-point')
    }
    createEndingTitle() {
        let titleContent = `Tiếc quá còn ${PAIRS_COUNT - this.completeColor.length} cặp màu nữa thôi làm lại nhé`;
        // let titleContent = `Bông thối`;
        if (this.status == GAME_STATUS.COMPLETE) titleContent = 'Chúc mừng bạn đã hoàn thành trò chơi trong ' + (GAME_TIME - this.timePlay) + 's'
        this.titleElm = document.createElement('p')
        $(this.titleElm).text(titleContent)
        $(this.titleElm).addClass('title-ending')

    }
    pushComparePair(o) {
        if (this.comparePair.includes(o)) return
        if (this.comparePair.length == 0) {
            this.comparePair.push(o)
            o.showColor()
            this.timeOutId = setTimeout(() => this.removeItemComparePair(o), 2000)
            return
        }
        if (this.comparePair.length == 1) {
            this.comparePair.push(o)
            o.showColor()
            clearTimeout(this.timeOutId)
            this.handleComparePair()
            return
        }
        if (this.comparePair.length == 2) {
            clearTimeout(this.timeOutId)
            this.clearComparePair()
            this.pushComparePair(o)
        }
    }
    removeItemComparePair(o) {
        if (!this.comparePair.includes(o)) return
        this.comparePair = this.comparePair.filter(item => item != o)
        o.hideColor()
    }
    clearComparePair() {
        if (this.comparePair.length < 2) return
        if (this.comparePair.length == 2) {
            this.comparePair.forEach(item => this.removeItemComparePair(item))
        }

    }

    handleComparePair() {
        if (this.comparePair.length != 2) return
        if (this.comparePair[0].color === this.comparePair[1].color) {
            this.addComppleteColor(this.comparePair[0].color)
            this.comparePair = []
            return
        }
        this.timeOutId = setTimeout(() => this.clearComparePair(), 2000)

    }
    addComppleteColor(color) {
        audioPointSound.play()
        this.completeColor.push(color)
        // $(this.pointElm).text('0' + this.completeColor.length)
        bodyElm.style.backgroundColor = color
        if (this.completeColor.length == PAIRS_COUNT) this.changeComplete()
    }
    changeComplete() {
        this.status = GAME_STATUS.COMPLETE
        clearInterval(this.intervalCountTimePlay)
        audioCoundownSound.pause()
        audioWinSound.play()
        this.changeEndUi()


    }
    changeFailure() {
        this.status = GAME_STATUS.FAIL
        clearInterval(this.intervalCountTimePlay)
        clearTimeout(this.timeOutId)
        audioFailSound.play()
        this.dataPlay.forEach(item => item.setCannotClick())
        this.changeEndUi()
    }

    randomListColor() {
        const length = PAIRS_COUNT
        let arr = []
        for (let i = 0; i < length; i++) {
            arr.push(randomColor())
        }
        const randomRange = randomListNumber(PAIRS_COUNT * 2, PAIRS_COUNT * 2)
        const listXY = randomRange.map((item, i) => {
            const a = {
                index: i,
                color: arr[Math.floor(item / 2)]
            }
            return a
        })

        listXY.forEach(item => this.dataPlay[item.index] = new O(item.index, item.color, this.parrentElm, this.pushComparePair.bind(this)))
    }
    renderStart() {
        const self = this
        const startElm = document.createElement('div')
        startElm.classList.add('start-box')
        const html =
            `<div class="start-title">Color Matching</div>
            <div class="start-btn-box"><button>Start game</button></div>`
        $(startElm).html(html)
        this.startElm = startElm
        this.elm.append(startElm)
        this.getStartBtn().click(() => {
            self.changePlayingStatus()
        })
    }
    countTime() {
        this.intervalCountTimePlay = setInterval(() => {
            if (this.timePlay == 5) audioCoundownSound.play()
            $(this.timeElm).text(`0${this.timePlay}`.slice(-2) + '')
            if (this.timePlay == 0) {
                this.changeFailure()
            } else {
                this.timePlay--
            }
        }, 1000)
    }
    renderPlaying() {
        this.randomListColor()
        $(this.parrentElm).empty()
        this.elm.append(this.timeElm)
        this.elm.append(this.replayBtn)
        this.elm.append(this.parrentElm)
        this.dataPlay.forEach(item => item.render())

    }
    handleReplay() {
        clearInterval(this.intervalCountTimePlay)
        clearTimeout(this.timeOutId)

        $(this.timeElm).text(GAME_TIME)
        this.changePlayingStatus()
    }
    clearEml() {
        this.elm.empty()
    }
    getStartBtn() {
        return $('.start-box button')
    }
    changeEndUi() {
        $(this.elm).empty()
        this.createEndingTitle()
        this.createReplayBtn('ending')
        this.elm.append(this.titleElm)
        this.elm.append(this.replayBtn)
    }
    changePlayingStatus() {
        this.dataPlay = []
        this.completeColor = []
        this.comparePair = []
        this.timePlay = GAME_TIME
        this.createParrentElm()
        this.createReplayBtn()
        this.createTimeElm()
        this.status = GAME_STATUS.PLAYING
        this.clearEml()
        this.renderPlaying()
    }
}

const game1 = new game()
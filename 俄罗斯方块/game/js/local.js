class Local {
    // 游戏对象
    game;
    timer = null;
    timer2 = null;
    socket;
    constructor (socket) {
        this.socket = socket
    }
    // 绑定键盘时间
    bindKeyEvent (game, socket) {
        socket.on('addTailLine', lines => {
            this.game.addTailLine(lines)
            socket.emit('addLineDone', lines)
        })
        socket.on('stop', data => {
            this.game.gameOver()
            this.stop(true)
        })
        socket.on('leave', data => {
            this.stop('对方掉线了')
        })
        document.onkeydown = function (e) {
            if(e.keyCode === 38) { // up
                game.rotate()
                socket.emit('rotate')
            } else if(e.keyCode === 39) { // right
                game.right()
                socket.emit('right')
            } else if(e.keyCode === 40) { // down
                game.down()
                socket.emit('down')
            } else if(e.keyCode === 37) { // left
                game.left() 
                socket.emit('left')
            } else if(e.keyCode === 32) { // space
                game.fall()
                socket.emit('fall')
            }
        } 
    }

    unBindKeyEvent () {
        document.onkeydown = null
    }

    move() {
        if (!this.game.down()) {
            this.game.fixed()
            this.socket.emit('fixed')
            let clear = this.game.clear()
            this.socket.emit('clear')
            if (clear > 1) {
                let lines = this.makeRandomLine(clear - 1)
                this.socket.emit('addTailLine', lines)
            }
            if (this.game.gameOver()) {
                this.stop(false)
                this.socket.emit('stop')
            } else {
                let nextIndex = Math.floor(Math.random() * 10) + 1
                let nextRotatePos = Math.floor(Math.random() * 3) + 1
                let next = SquareFactory.makeSquare(nextIndex, nextRotatePos)
                this.game.performNext(next)
                this.socket.emit('performNext', {nextIndex, nextRotatePos})
            }
        } else {
            this.socket.emit('down')
        }
    }

    makeRandomLine(num) {
        let lines = []
        for (let i = 0; i < num; i++) {
            let line = []
            let zeroCount = 0
            let oneCount = 0
            for (let j = 0; j < 10; j++) {
                if (zeroCount > 3) {
                    line.push(1)
                } else if (oneCount === 0 && j === 9) {
                    line.push(0)
                } else {
                    let Tag = Math.floor(Math.random() * 2)
                    line.push(Tag)
                    if (Tag === 1) {
                        oneCount ++
                    } else {
                        zeroCount ++
                    }
                }
            }
            lines.push(line)
        }
        return lines
    }

    // 开始游戏
    start () {
        let doms = {
            gameDiv: document.getElementById('local-game'),
            nextDiv: document.getElementById('local-next'),
            timeSpan: document.getElementById('local-time'),
            scoreSpan: document.getElementById('local-score'),
            gameOverDiv: document.getElementById('local-game-over')
        }
        this.game = new Game()
        let curIndex = Math.floor(Math.random() * 10) + 1
        let curRotatePos = Math.floor(Math.random() * 3) + 1
        let nextIndex = Math.floor(Math.random() * 10) + 1
        let nextRotatePos = Math.floor(Math.random() * 3) + 1
        let cur = SquareFactory.makeSquare(curIndex, curRotatePos)
        let next = SquareFactory.makeSquare(nextIndex, nextRotatePos)
        this.game.init(doms, cur, next)
        this.socket.emit('init', {curIndex, curRotatePos, nextIndex, nextRotatePos})
        this.bindKeyEvent(this.game, this.socket)
        this.timer = setInterval(() => {
            this.move()
        }, 400);
    }

    stop(flag) {
        this.game.gameOver()
        if (this.timer) {
            clearInterval(this.timer)
            this.timer = null
            clearInterval(this.timer2)
            this.timer2 = null
            this.unBindKeyEvent()
            this.game.stop(flag)
        }
    }

}
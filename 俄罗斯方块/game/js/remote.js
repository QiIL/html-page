class Remote {
    // 游戏对象
    game;
    socket
    // 绑定键盘时间
    constructor (socket) {
        this.socket = socket
    }
    bindKeyEvent () {
        this.socket.on('init', data => {
            this.start(data.curIndex, data.curRotatePos, data.nextIndex, data.nextRotatePos)
        })
        this.socket.on('left', data => {
            this.game.left()
        })
        this.socket.on('down', data => {
            this.game.down()
        })
        this.socket.on('rotate', data => {
            this.game.rotate()
        })
        this.socket.on('right', data => {
            this.game.right()
        })
        this.socket.on('fall', data => {
            this.game.fall()
        })
        this.socket.on('fixed', data => {
            this.game.fixed()
        })
        this.socket.on('clear', data => {
            this.game.clear()
        })
        this.socket.on('stopOk', data => {
            this.game.gameOver()
            this.game.stop(true)
        })
        this.socket.on('addLineDone', lines => {
            this.game.addTailLine(lines)
        })
        this.socket.on('performNext', data => {
            let next = SquareFactory.makeSquare(data.nextIndex, data.nextRotatePos)
            this.game.performNext(next)
        })
    }

    // 开始游戏
    start (curIndex, curRotatePos, nextIndex, nextRotatePos) {
        let doms = {
            gameDiv: document.getElementById('remote-game'),
            nextDiv: document.getElementById('remote-next'),
            timeSpan: document.getElementById('remote-time'),
            scoreSpan: document.getElementById('remote-score'),
            gameOverDiv: document.getElementById('remote-game-over')
        }
        this.game = new Game()
        let cur = SquareFactory.makeSquare(curIndex, curRotatePos)
        let next = SquareFactory.makeSquare(nextIndex, nextRotatePos)
        this.game.init(doms, cur, next)
    }

    stop(flag) {
        this.game.gameOver()
        this.game.stop(flag)
        this.socket.emit('stopOk')
    }
}
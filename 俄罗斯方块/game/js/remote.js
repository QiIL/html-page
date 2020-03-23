class Remote {
    // 游戏对象
    game;
    timer = null;
    timer2 = null;
    // 绑定键盘时间
    bindKeyEvent (game) {
        document.getElementById('rotate').onclick = function() {
            game.rotate()
        }
        document.getElementById('right').onclick = function() {
            game.right()
        }
        document.getElementById('down').onclick = function() {
            game.down()
        }
        document.getElementById('left').onclick = function() {
            game.left()
        }

        document.getElementById('fall').onclick = function() {
            game.fall()
        }
        document.getElementById('performNext').onclick = function() {
            game.performNext()
        }
        document.getElementById('fixed').onclick = function() {
            game.fixed()
        }
        document.getElementById('clear').onclick = function() {
            game.clear()
        }
        document.getElementById('gameOver').onclick = function() {
            document.getElementById('rotate').onclick = null
            document.getElementById('right').onclick = null
            document.getElementById('down').onclick = null
            document.getElementById('left').onclick = null
            document.getElementById('fall').onclick = null
            document.getElementById('performNext').onclick = null
            document.getElementById('fixed').onclick = null
            document.getElementById('clear').onclick = null
            document.getElementById('gameOver').onclick = null
            document.getElementById('addTime').onclick = null
            document.getElementById('addTailLine').onclick = null
            document.getElementById('addScore').onclick = null
            game.stop(true)
        }
        document.getElementById('addTime').onclick = function() {
            game.addTime()
        }
        document.getElementById('addTailLine').onclick = function() {
            game.addTailLine([[0,1,0,1,1,1,1,1,0,1]])
        }
        document.getElementById('addScore').onclick = function() {
            game.addScore(10)
        }
    }

    // unBindKeyEvent () {
        
    // }

    move() {
        if (!this.game.down()) {
            this.game.fixed()
            this.game.clear()
            if (this.game.gameOver()) {
                this.stop()
            } else {
                this.game.performNext()
            }
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

    maybeAddLine() {
        let num = Math.floor(Math.random() * 3)
        if (num < 3) {
            let lines = this.makeRandomLine(num)
            this.game.addTailLine(lines)
        }
        console.log('do add')
    }

    // 开始游戏
    start () {
        let doms = {
            gameDiv: document.getElementById('remote-game'),
            nextDiv: document.getElementById('remote-next'),
            timeSpan: document.getElementById('remote-time'),
            scoreSpan: document.getElementById('remote-score'),
            gameOverDiv: document.getElementById('remote-game-over')
        }
        this.game = new Game()
        this.game.init(doms)
        this.bindKeyEvent(this.game)
        // this.timer = setInterval(() => {
        //     this.move()
        // }, 200);
        // this.timer2 = setInterval(() => {
        //     this.maybeAddLine()
        // }, 1000);
    }

    stop() {
        if (this.timer) {
            clearInterval(this.timer)
            this.timer = null
            // clearInterval(this.timer2)
            // this.timer2 = null
            this.unBindKeyEvent()
            this.game.stop(false)
        }
    }
}
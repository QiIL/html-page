class Local {
    // 游戏对象
    game;
    timer = null;
    timer2 = null;
    // 绑定键盘时间
    bindKeyEvent (game) {
        document.onkeydown = function (e) {
            if(e.keyCode === 38) { // up
                game.rotate()
            } else if(e.keyCode === 39) { // right
                game.right()
            } else if(e.keyCode === 40) { // down
                game.down()
            } else if(e.keyCode === 37) { // left
                game.left() 
            } else if(e.keyCode === 32) { // space
                game.fall()
            }
        } 
    }

    unBindKeyEvent () {
        document.onkeydown = null
    }

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
            gameDiv: document.getElementById('game'),
            nextDiv: document.getElementById('next'),
            timeSpan: document.getElementById('time'),
            scoreSpan: document.getElementById('score'),
            gameOverDiv: document.getElementById('game-over')
        }
        this.game = new Game()
        this.game.init(doms)
        this.bindKeyEvent(this.game)
        this.timer = setInterval(() => {
            this.move()
        }, 200);
        this.timer2 = setInterval(() => {
            this.maybeAddLine()
        }, 1000);
    }

    stop() {
        if (this.timer) {
            clearInterval(this.timer)
            this.timer = null
            clearInterval(this.timer2)
            this.timer2 = null
            this.unBindKeyEvent()
            this.game.stop(false)
        }
    }
}
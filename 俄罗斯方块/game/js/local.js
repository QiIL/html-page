class Local {
    // 游戏对象
    game;
    timer = null;
    // 绑定键盘时间
    bindKeyEvent (game) {
        document.onkeydown = function (e) {
            console.log(e.keyCode)
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

    // 开始游戏
    start () {
        let doms = {
            gameDiv: document.getElementById('game'),
            nextDiv: document.getElementById('next')
        }
        this.game = new Game()
        console.log('init game')
        this.game.init(doms)
        this.bindKeyEvent(this.game)
        this.timer = setInterval(() => {
            this.move()
        }, 200);
    }

    stop() {
        if (this.timer) {
            clearInterval(this.timer)
            this.timer = null
            this.unBindKeyEvent()
        }
    }
}
class Game {
    // dom 元素
    gameDivs = []
    nextDivs = []
    gameDiv
    nextDiv
    timeSpan
    timer
    time
    scoreSpan
    score
    gameOverDiv
    // 游戏矩阵
    gameData = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]
    nextData = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]
    // 动态元素
    cur
    next
    // 初始化div
    initDivs (container, data, divs) {
        for (let row = 0; row < data.length; row++) {
            let rowDiv = []
            for (let col = 0; col < data[row].length; col++) {
                let newNode = document.createElement('div')
                newNode.className = 'none'
                newNode.style.top = (row * 20) + 'px'
                newNode.style.left = (col * 20) + 'px'
                container.appendChild(newNode)
                rowDiv.push(newNode)
            }
            divs.push(rowDiv)
        }
    }

    refresh (data, divs) {
        for (let row = 0; row < data.length; row++) {
            for (let col = 0; col < data[row].length; col++) {
                if (data[row][col] === 0) {
                    divs[row][col].className = 'none'
                } else if (data[row][col] === 1) {
                    divs[row][col].className = 'done'
                } else {
                    divs[row][col].className = 'current'
                }
            }
        }
    }

    // 检测点是否合法
    checkPos(pos, x, y) {
        if (pos.x + x < 0) {
            return false
        } else if (pos.x + x >= this.gameData.length) {
            return false
        } else if (pos.y + y < 0) {
            return false
        } else if (pos.y + y >= this.gameData[0].length) {
            return false
        } else if (this.gameData[pos.x+x][pos.y+y] === 1) {
            return false
        } else {
            return true
        }
    }

    moveCheck(test, data) {
        for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < data[i].length; j++) {
                if (data[i][j] !== 0) {
                    if (!this.checkPos(test, i, j)) {
                        return false
                    }
                }
            }
        }
        return true
    }

    // 检测数据是否合法
    canDown() {
        let test = {}
        test.x = this.cur.origin.x + 1
        test.y = this.cur.origin.y
        return this.moveCheck(test, this.cur.data)
    }
    // 检测数据是否合法
    canLeft() {
        let test = {}
        test.x = this.cur.origin.x
        test.y = this.cur.origin.y - 1
        console.log(test)
        return this.moveCheck(test, this.cur.data)
    }
    // 检测数据是否合法
    canRight() {
        let test = {}
        test.x = this.cur.origin.x
        test.y = this.cur.origin.y + 1
        console.log(test)
        return this.moveCheck(test, this.cur.data)
    }

    // 设置数据
    setData() {
        for (let i = 0; i < this.cur.data.length; i++) {
            for (let j = 0; j < this.cur.data[i].length; j++) {
                if (this.checkPos(this.cur.origin, i, j)) {
                    this.gameData[this.cur.origin.x + i][this.cur.origin.y + j] = this.cur.data[i][j]
                }
            }
        }
    }

    // 清除旧数据
    clearData() {
        for (let i = 0; i < this.cur.data.length; i++) {
            for (let j = 0; j < this.cur.data[i].length; j++) {
                if (this.checkPos(this.cur.origin, i, j)) {
                    this.gameData[this.cur.origin.x + i][this.cur.origin.y + j] = 0
                }
            }
        }
    }

    // 清除行
    clear() {
        let clearLine = 0
        for (let i = this.gameData.length - 1; i > 0; i--) {
            let needClean = true
            for (let j = 0; j < this.gameData[i].length; j++) {
                if (this.gameData[i][j] !== 1) {
                    needClean = false
                    break
                }
            }
            if (needClean) {
                for (let k = i; k > 0; k--) {
                    for (let j = 0; j < this.gameData[i].length; j++) {
                        this.gameData[k][j] = this.gameData[k-1][j]
                    }
                }
                for (let k = 0; k < this.gameData[0].length; k++) {
                    this.gameData[0][k] = 0
                }
                i++
                clearLine++
            }
        }
        if (clearLine > 0) {
            this.addScore(10 * Math.pow(2, clearLine - 1))
        }
    }
    
    // 下移
    down() {
        console.log('do down')
        if (this.canDown()) {
            this.clearData()
            this.cur.origin.x = this.cur.origin.x + 1
            this.setData()
            this.refresh(this.gameData, this.gameDivs)
            return true
        } else {
            false
        }
    }
    
    // 左
    left() {
        if (this.canLeft()) {
            this.clearData()
            this.cur.origin.y = this.cur.origin.y - 1
            this.setData()
            this.refresh(this.gameData, this.gameDivs)
        }
    }

    // 右
    right() {
        if (this.canRight()) {
            this.clearData()
            this.cur.origin.y = this.cur.origin.y + 1
            this.setData()
            this.refresh(this.gameData, this.gameDivs)
        }
    }
    
    // 下坠
    fall () {
        let CanDown = false
        do {
            CanDown = this.down()
        } while(CanDown)
    }

    // 旋转
    rotate () {
        if (this.moveCheck(this.cur.origin, this.cur.getRotate())) {
            this.clearData()
            this.cur.rotate()
            this.setData()
            this.refresh(this.gameData, this.gameDivs)
        }
    }

    // 固定
    fixed() {
        for (let i = 0; i < this.cur.data.length; i++) {
            for (let j = 0; j < this.cur.data[i].length; j++) {
                if (this.checkPos(this.cur.origin, i, j)) {
                    if (this.gameData[this.cur.origin.x + i][this.cur.origin.y + j] === 2) {
                        this.gameData[this.cur.origin.x + i][this.cur.origin.y + j] = 1
                    }
                }
            }
        }
        this.refresh(this.gameData, this.gameDivs)
        this.addScore(4)
    }

    addScore(Add) {
        this.score = this.score + Add,
        this.scoreSpan.innerHTML = this.score
    }

    // 把下一个拉出来
    performNext() {
        this.cur = this.next
        this.next = SquareFactory.makeSquare(0, 0)
        this.setData()
        this.refresh(this.gameData, this.gameDivs)
        this.refresh(this.next.data, this.nextDivs)
    }

    // 游戏结束了
    gameOver() {
        for(let i = 0; i < this.gameData[1].length; i++) {
            if (this.gameData[1][i] === 1) {
                return true
            }
        }
        return false
    }

    // 加时间
    addTime() {
        this.time = this.time + 1
        this.timeSpan.innerHTML = this.time
    }

    // 停止
    stop(Bool) {
        clearInterval(this.timer)
        this.timer = null
        if (Bool) {
            this.gameOverDiv.innerHTML = '666'
        } else {
            this.gameOverDiv.innerHTML = '菜'
        }
    }

    // 添加行
    addTailLine(lines) {
        for (let i = 0; i < this.gameData.length - lines.length; i++) {
            this.gameData[i] = this.gameData[i+lines.length]
        }
        for (let i = 0; i < lines.length; i++) {
            this.gameData[this.gameData.length - lines.length + i] = lines[i]
        }
        this.cur.origin.x = this.cur.origin.x - lines.length
        if (this.cur.origin.x < 0) {
            this.cur.origin.x = 0
        }
        // console.log(this.gameData)
        this.refresh(this.gameData, this.gameDivs)
    }

    // 初始化
    init (doms) {
        this.gameDiv = doms.gameDiv
        this.nextDiv = doms.nextDiv
        this.gameOverDiv = doms.gameOverDiv
        this.time = 0
        this.score = 0
        this.timeSpan = doms.timeSpan
        this.scoreSpan = doms.scoreSpan
        this.cur = SquareFactory.makeSquare(0, 0)
        this.next = SquareFactory.makeSquare(0, 0)
        this.setData()
        this.initDivs(this.gameDiv, this.gameData, this.gameDivs)
        this.initDivs(this.nextDiv, this.next.data, this.nextDivs)
        this.refresh(this.gameData, this.gameDivs)
        this.refresh(this.next.data, this.nextDivs)
        this.scoreSpan.innerHTML = this.score
        this.timer = setInterval(() => {
            this.addTime()
        }, 1000);
    }

}
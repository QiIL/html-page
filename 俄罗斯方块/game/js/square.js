class Square {
    data // 基础数据
    origin // 原点: {x,y}
    rotates // 旋转数据
    rotatePos = 0 // 旋转数据点
    
    constructor(data, rotates, origin, rotatePos) {
        this.data = data
        this.rotates = rotates
        this.origin = origin
        this.rotatePos = rotatePos
    }

    rotate() {
        this.rotatePos = (this.rotatePos + 1) % 4
        this.data = this.rotates[this.rotatePos]
    }

    getRotate() {
        return this.rotates[(this.rotatePos + 1) % 4]
    }

}
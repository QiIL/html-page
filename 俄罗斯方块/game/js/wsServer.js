const server = require('http').createServer();
const io = require('socket.io')(server);
let count = 0
let socketMap = {}

io.on('connection', client => {
    count ++
    client.socketCount = count
    socketMap[count] = client

    if (count % 2 == 1) {
        client.emit('waiting', 'waiting for another player')
    } else {
        client.emit('start')
        socketMap[count - 1].emit('start')
    }

    client.on('init', data => {
        let oppositeClient = getOppositeClient(client)
        oppositeClient.emit('init', data)
    })

    client.on('down', data => {
        let oppositeClient = getOppositeClient(client)
        oppositeClient.emit('down', data)
    })

    client.on('rotate', data => {
        let oppositeClient = getOppositeClient(client)
        oppositeClient.emit('rotate', data)
    })

    client.on('left', data => {
        let oppositeClient = getOppositeClient(client)
        oppositeClient.emit('left', data)
    })

    client.on('right', data => {
        let oppositeClient = getOppositeClient(client)
        oppositeClient.emit('right', data)
    })

    client.on('fall', data => {
        let oppositeClient = getOppositeClient(client)
        oppositeClient.emit('fall', data)
    })

    client.on('fixed', data => {
        let oppositeClient = getOppositeClient(client)
        oppositeClient.emit('fixed', data)
    })

    client.on('clear', data => {
        let oppositeClient = getOppositeClient(client)
        oppositeClient.emit('clear', data)
    })

    client.on('stop', data => {
        let oppositeClient = getOppositeClient(client)
        oppositeClient.emit('stop', data)
    })

    client.on('stopOk', data => {
        let oppositeClient = getOppositeClient(client)
        oppositeClient.emit('stopOk', data)
    })

    client.on('performNext', data => {
        let oppositeClient = getOppositeClient(client)
        oppositeClient.emit('performNext', data)
    })

    client.on('addTailLine', lines => {
        let oppositeClient = getOppositeClient(client)
        oppositeClient.emit('addTailLine', lines)
    })

    client.on('addLineDone', lines => {
        let oppositeClient = getOppositeClient(client)
        oppositeClient.emit('addLineDone', lines)
    })

    client.on('disconnect', () => {
        let oppositeClient = getOppositeClient(client)
        oppositeClient.emit('leave')
    })

    client.on('error', err => {
        console.log(err)
    })
})

function getOppositeClient(client) {
    if (client.socketCount % 2 === 0) {
        if (socketMap[client.socketCount - 1]) {
            return socketMap[client.socketCount - 1]
        }
    } else {
        if (socketMap[client.socketCount + 1]) {
            return socketMap[client.socketCount + 1]
        }
    }
}

server.listen(8000);
console.log('server is listen on port:8000')
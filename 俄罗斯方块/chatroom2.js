const server = require('http').createServer();
const io = require('socket.io')(server);
let count = 0
io.on('connection', client => {
    console.log('client enter')
    count ++
    client.nickname = 'user' + count
    io.emit('enter', client.nickname + ' come in')
    client.on('message', data => {
        io.emit('message', client.nickname + ' says: ' + data)
    });
    client.on('disconnect', () => {
        io.emit('disconnect', client.nickname + ' left')
    });
});
server.listen(3000);
let ws = require("nodejs-websocket")
let count = 0;
let basename = 'user'
// Scream server example: "hi" -> "HI!!!"
let server = ws.createServer(function (conn) {
    console.log(`new connection ${basename}${count}`)
    count ++
    let mes = {}
    mes.type = 'enter'
    mes.name = 'user' + count
    mes.data =  mes.name + ' come in'
    borcast(JSON.stringify(mes))
	conn.on("text", function (str) {
		console.log("Received "+str)
        mes.type = 'msg'
        mes.data = mes.name + ' says: ' + str
		borcast(JSON.stringify(mes))
	})
	conn.on("close", function (code, reason) {
        mes.type = 'left'
        mes.data = mes.name + ' left'
        borcast(JSON.stringify(mes))
		console.log("Connection closed")
	})
    conn.on("error", function (err) {
        console.log("error")
        console.log(err)
    })
}).listen(3000)

console.log("server start on ws\"//localhost:3000")

function borcast (Str) {
    server.connections.forEach(connection => {
        connection.sendText(Str)
    })
}
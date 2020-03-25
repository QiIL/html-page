const socket = io("ws://localhost:3000")
let local = new Local(socket)
let remote = new Remote(socket)

socket.on('waiting', str => {
    document.getElementById('waiting').innerHTML = str
})

socket.on('start', () => {
    document.getElementById('waiting').innerHTML = ''
    local.start()
    remote.bindKeyEvent()
})

socket.on('stop', () => {
    local.stop(true)
    console.log('local stop ok')
    remote.stop(false)
    console.log('remote stop ok')
})
import socket from './model/socket'

socket.emit('pong client', `Hey there i'm a new one!`)

socket.on('ping server', message => {
    console.log(message);
    setTimeout(() => {
        socket.emit('pong client', 'Pong from ' + message.split(' ')[2])
    }, 2000)
})
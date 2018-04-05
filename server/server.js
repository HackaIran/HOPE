class Server {

    constructor () {
        this._io = null;
    }

    set io (io) {
        this._io = io;
        this.init();
    }

    get io () {
        return this._io;
    }

    init () {
        this.io.on('connection', onUserConnected);
    }

}

const names = ['Bear', 'Lion', 'Chicken', 'Whale', 'Fish'];

const onUserConnected = socket => {
    const name = names[Math.floor(names.length * Math.random())]
    socket.on('pong client', message => {
        console.log(message);
        setTimeout(() => {
            socket.emit('ping server', `Ping from ${name}`);
        }, 2000);
    });
};
const server = new Server;

module.exports = server;
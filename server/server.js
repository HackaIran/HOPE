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

const onUserConnected = socket => {
    
};

const server = new Server;

module.exports = server;
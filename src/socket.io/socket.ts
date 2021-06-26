import { Server as IOServer } from 'socket.io';
import { Server } from 'http';

export = async (io: IOServer, server: Server): Promise<void> => {
    const socket = io.listen(server);

    socket.on('connection', function (socket) {
        console.log('Client Connected');

        socket.on('message', function (data) {
            socket.broadcast.emit('server_message', data);
            socket.emit('server_message', data);
        });

        socket.on('disconnect', function () {
            console.log('Client Disconnected.');
        });
    });
};

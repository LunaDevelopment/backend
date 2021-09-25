import { Server as IOServer } from 'socket.io';
import { Server } from 'http';
import Resources from './dataholder';

export = async (io: IOServer, server: Server): Promise<void> => {
    const resources = new Resources(io);
    const socket = io.listen(server);

    socket.on('connection', (socket) => {
        console.log('Client Connected');

        socket.on('message', (data) => {
            socket.broadcast.emit('server_message', data);
            socket.emit('server_message', data);
        });

        socket.on('disconnect', () => {
            console.log(`${socket.id} disconnected`);
        });
    });
};

import { Server as IOServer, Socket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

export default class Resources {
    public rooms: any[] = [];

    constructor(private io: IOServer) {}

    async CreateRoom(
        roomid: string,
        players: string[],
        socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>
    ) {
        if (this.rooms.find((room) => room.roomid == roomid))
            return socket.emit('error', 'room with that id already created');

        this.rooms.push({
            roomid: roomid,
            playerData: []
        });

        socket.join(roomid);

        return this.io.to(roomid).emit('roomCreated', true);
    }
}

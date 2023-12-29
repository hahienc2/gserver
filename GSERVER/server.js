const { log } = require("console");
const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
        origin: 'http://localhost:7456',
        origin: 'http://localhost',
        origin: 'http://192.168.1.10:7457'

  }
});

httpServer.listen(3000);

var roomsGame = [];

var romfunction = {
    checkRooms() {
        if (roomsGame.length > 0) {
    for (let i = 0; i < roomsGame.length; i++) {
        if (roomsGame[i].id.length == 1) {
            // join room co sans
            return [true, roomsGame[i],i];
        } 
            }
            return [false];

} else return [false];
    },
    getRoom(i, _myid) {
       // romfunction.getRoom(i, _myid)
        let obj = new Object();
        obj.id = roomsGame[i].id;
        obj.phong = roomsGame[i].phong;
        obj.idsend = roomsGame[i].idsend;
        obj.myid = _myid;
        return obj;

    }
}

function myFunction(p1, p2) {
    return p1 * p2;
}
io.on('connection', function (socket) {
    console.log("CO Nnguoi ket noi " + socket.id);

    socket.on("tao-room", function (data) {
        let checkroom = romfunction.checkRooms();
        if (checkroom[0]) {
            let idz = checkroom[2];
            socket.join(checkroom[1].phong);
            socket.phong = checkroom[1].phong;
            roomsGame[idz].id.push(socket.id);
            let returnRoom = roomsGame[idz];
            returnRoom.idsend = socket.id;
            returnRoom.myid = socket.id;
            let idc = romfunction.getRoom(idz, returnRoom.id[0])
            socket.emit("tao-room-return", returnRoom);
            //io.sockets.in(socket.phong).emit("tao-room-return", returnRoom);
            // gui cho id cu the
            io.to(returnRoom.id[0]).emit("tao-room-return", idc);
            // gui cho tat ca id con lai socket.broadcast.emit

        } else {
            let ran = Math.floor(Math.random() * 10) + "" + (Math.random() + 1).toString(36).substring(7);

            socket.join(ran);
            socket.phong = ran;

            var obj = new Object();
            obj.phong = socket.phong;
            obj.id = [];
            obj.id.push(socket.id);
            //obj.idchuphong = socket.id;
            obj.idsend = socket.id;
            obj.myid = socket.id;
            obj.gamePlay = [];
            for (let i = 0; i < 10; i++) {
                obj.gamePlay[i] = [];
                for (let j = 0; j < 20; j++) {
                    obj.gamePlay[i][j] = 0;
                }

            }
            roomsGame.push(obj);
            socket.emit("tao-room-return", roomsGame[roomsGame.length -1]);
        }

    })
    socket.on("disconnect", function () {
        console.log("Ngat ket noi " + socket.id);
    })

    socket.on("danh-co", function (data) {
        io.sockets.in(socket.phong).emit("danh-co-return", socket.id)
    })

    socket.on("Client-send-data", function (data) {
        console.log(socket.id + " gui len sv:  " + data);
        io.sockets.emit("server-send-data", data + "888")
    })
})
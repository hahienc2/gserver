const { log } = require("console");
const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:7456',
    origin: 'http://localhost',
    origin: 'http://192.168.1.15:7456',
    origin: 'http://192.168.1.10:7456'

  }
});

httpServer.listen(3000);

var rooms = [];
var playcard = null;

var roomsGame = [];

var romfunction = {
  checkRooms() {
    if (roomsGame.length > 0) {
      for (let i = 0; i < roomsGame.length; i++) {
        if (roomsGame[i].id.length == 1) {
          // join room co sans
          return [true, roomsGame[i], i];
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

  },
  roomidx(roomid) {
    let _plcard = playcard;
    let _roomcard = _plcard.mess.users;
   // console.log(roomid);
    for (let i = 0; i < _roomcard.length; i++) {
      if (_roomcard[i].id == roomid) return i;
    }
    console.log("can't get id romidx");
  }
}



function myFunction(p1, p2) {
  return p1 * p2;
}
io.on('connection', function (socket) {
  console.log("CO Nnguoi ket noi " + socket.id);
  socket.on("available-room", function (data) {
    if (rooms.length >= 1 && rooms[0].users.length >= 2) {
      rooms = [];
    }
    socket.emit("available-room", rooms);

  })

  socket.on("create-room", function (data) {
    if (rooms.length < 1) {
      let ran = Math.floor(Math.random() * 10) + "" + (Math.random() + 1).toString(36).substring(7);
      socket.join(ran);
      let _socketid = socket.id;
      socket.roomsid = ran;
      console.log("socket.roomsid " + socket.roomsid);


      let _roomy = {
        clients: 1,
        createdAt: null,
        maxClients: null,
        metadata: {
          user: {
            id: _socketid,
          },
          private: 0
        },
        name: "cardGame",
        processId: null,
        roomId: ran,
        users: []
      }

      _roomy.users.push(_socketid);
      rooms.push(_roomy);
      let _roomx = { hasJoined: true, id: ran, socid: _socketid, users: _roomy.users };

      socket.emit("create-room", _roomx);
    } else {
      socket.join(rooms[0].roomId);
      let _socketid = socket.id;
      rooms[0].users.push(_socketid);
      let _roomx = { hasJoined: true, id: rooms[0].roomId, socid: _socketid, users: rooms[0].users };

      let _ro = { users: rooms[0].users };
      socket.roomsid = rooms[0].roomId;
      console.log("socket.roomsid " + socket.roomsid);
      socket.emit("create-room", _roomx);
      io.in(rooms[0].roomId).emit("create-room-update", _ro);
    }
  })

  socket.on("start-room", function (res) {
    let _socketid = socket.id;

    let dataz = {
      "turn": 0,
      "userID": _socketid,
      "action": "before",
      "mess": {
        "users": [
          {
            "id": rooms[0].users[0],
            "cards": [
              {
                "type": 2,
                "value": 13
              },
              {
                "type": 4,
                "value": 7
              },
              {
                "type": 4,
                "value": 11
              },
              {
                "type": 4,
                "value": 12
              },
              {
                "type": 3,
                "value": 13
              },
              {
                "type": 4,
                "value": 10
              },
              {
                "type": 2,
                "value": 6
              },
              {
                "type": 1,
                "value": 8
              },
              {
                "type": 2,
                "value": 8
              }
            ],
            "turn": 0,
            "cardTurn": [],
            "cardEat": [],
            "pairs": []
          },
          {
            "id": rooms[0].users[1],
            "cards": [
              {
                "type": 3,
                "value": 5
              },
              {
                "type": 1,
                "value": 10
              },
              {
                "type": 3,
                "value": 4
              },
              {
                "type": 1,
                "value": 11
              },
              {
                "type": 1,
                "value": 7
              },
              {
                "type": 4,
                "value": 5
              },
              {
                "type": 1,
                "value": 4
              },
              {
                "type": 4,
                "value": 1
              },
              {
                "type": 3,
                "value": 9
              }
            ],
            "turn": 1,
            "cardTurn": [],
            "cardEat": [],
            "pairs": []
          }
        ],
        "turns": 0,
        "pool": [
          {
            "type": 4,
            "value": 3
          },
          {
            "type": 3,
            "value": 6
          },
          {
            "type": 1,
            "value": 13
          },
          {
            "type": 4,
            "value": 2
          },
          {
            "type": 3,
            "value": 10
          },
          {
            "type": 1,
            "value": 1
          },
          {
            "type": 4,
            "value": 13
          },
          {
            "type": 2,
            "value": 3
          },
          {
            "type": 2,
            "value": 5
          },
          {
            "type": 2,
            "value": 2
          },
          {
            "type": 1,
            "value": 9
          },
          {
            "type": 1,
            "value": 3
          },
          {
            "type": 3,
            "value": 1
          },
          {
            "type": 3,
            "value": 12
          },
          {
            "type": 4,
            "value": 8
          },
          {
            "type": 1,
            "value": 2
          },
          {
            "type": 4,
            "value": 9
          },
          {
            "type": 2,
            "value": 4
          },
          {
            "type": 1,
            "value": 5
          },
          {
            "type": 3,
            "value": 11
          },
          {
            "type": 1,
            "value": 12
          },
          {
            "type": 4,
            "value": 4
          },
          {
            "type": 3,
            "value": 7
          },
          {
            "type": 2,
            "value": 9
          },
          {
            "type": 3,
            "value": 8
          },
          {
            "type": 2,
            "value": 11
          },
          {
            "type": 2,
            "value": 1
          },
          {
            "type": 2,
            "value": 12
          },
          {
            "type": 4,
            "value": 6
          },
          {
            "type": 2,
            "value": 7
          },
          {
            "type": 3,
            "value": 2
          },
          {
            "type": 3,
            "value": 3
          },
          {
            "type": 1,
            "value": 6
          },
          {
            "type": 2,
            "value": 10
          }
        ],
        "action": "before"
      }
    }

    playcard = dataz;
    io.in(rooms[0].roomId).emit('start-room', dataz);
  })

  socket.on("send-card", function (data) {

    let a = {
      action: 'after',
      type: 'action',
      turn: 0
    } // boc bai
    let b = {
      action: 'before',
      type: 'action',
      turn: 1,
    }

    let _socketid = socket.id;
    let _roomsid = socket.roomsid;


    if (_roomsid != null) {
      playcard.userID = _socketid; // id cua thang gui msg len sv
      playcard.action = 'before';
      let listcard = playcard.mess.users[romfunction.roomidx(_socketid)].cards;
      for (let i = 0; i < listcard.length; i++) {
        if (listcard[i].type == data.type && listcard[i].value == data.value) {
          playcard.mess.users[romfunction.roomidx(_socketid)].cards.splice(i, 1);

          let cardt = data;
          playcard.mess.users[romfunction.roomidx(_socketid)].cardTurn.push(cardt);
              var objcheck = new Object();
              objcheck.check = false;
              objcheck.card = cardt;
              playcard.check = objcheck;

            //  console.log(_socketid + " danh bai");
           //   console.log(data);

        }

      }

      let playcarddata = playcard;
      io.in(_roomsid).emit('play-card', playcarddata);
    }

  })

  socket.on("getPool", function (data) {
    let _socketid = socket.id;
    let _roomsid = socket.roomsid;
    console.log(_socketid + " boc bai");

    if (_roomsid != null) {
      playcard.userID = _socketid;
      playcard.action = 'after';
      var firstcard = playcard.mess.pool.shift();
      playcard.mess.users[romfunction.roomidx(_socketid)].cards.push(firstcard);

      let playcarddata = playcard;
      io.in(_roomsid).emit('play-card', playcarddata);
    }

  })

  socket.on("match", function (data) {
    let _socketid = socket.id;
    let _roomsid = socket.roomsid;
    let _clientID = romfunction.roomidx(_socketid);
    let idThangBiAnbai;
    if(romfunction.roomidx(_socketid) == 0) idThangBiAnbai =1;
    else idThangBiAnbai =0;

    if (_roomsid != null) {
      playcard.userID = _socketid;
      playcard.action = 'between';

      let last = playcard.mess.users[idThangBiAnbai].cardTurn.pop(); 
      playcard.mess.users[_clientID].cards.push(last);
      playcard.mess.users[_clientID].cardEat.push(last);

      // di chuyen bai trong cardTurn cho cân bằng
      // thằng ăn là thằng id _clientID
      let cardturn1 = playcard.mess.users[idThangBiAnbai].cardTurn.length;
      let cardturn0 = playcard.mess.users[_clientID].cardTurn.length;
      if(cardturn1 < cardturn0){
        let chuyencard = playcard.mess.users[_clientID].cardTurn.pop();
        playcard.mess.users[idThangBiAnbai].cardTurn.push(chuyencard);
      }
      playcard.mess.users[idThangBiAnbai].cardTurn.length

      let playcarddata = playcard;
      io.in(_roomsid).emit('play-card', playcarddata);
    }

  })

  socket.on("disconnect", function () {
    console.log("Ngat ket noi " + socket.id);
  })


})
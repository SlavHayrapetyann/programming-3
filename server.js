weath = "winter"
//! Requiring modules  --  START
var Grass = require("./modules/Grass.js");
var GrassEater = require("./modules/GrassEater.js");
var AllEater = require("./modules/AllEater.js");
var Coronavirus = require("./modules/Coronavirus.js"); 
var Bomb = require("./modules/Bomb.js");
var Bomblow = require("./modules/Bomblow.js");
let random = require('./modules/random');
var fs = require("fs")
//! Requiring modules  --  END

//! Setting global arrays  --  START
grassArr = [];
grassEaterArr = [];
AllEaterArr = [];
CoronavirusArr = [];
BombArr = [];
BomblowArr = [];
matrix = [];
//! Setting global arrays  -- END




//! Creating MATRIX -- START
function matrixGenerator(matrixSize, grass, grassEater, AllEater, Coronavirus, Bomb, Bomblow) {
    for (let i = 0; i < matrixSize; i++) {
        matrix[i] = [];
        for (let o = 0; o < matrixSize; o++) {
            matrix[i][o] = 0;
        }
    }
    for (let i = 0; i < grass; i++) {
        let customX = Math.floor(random(matrixSize)); // 0-9
        let customY = Math.floor(random(matrixSize)); // 4
        matrix[customY][customX] = 1;
    }
    for (let i = 0; i < grassEater; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 2;
    }
    for (let i = 0; i < AllEater; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 3;
    }
    for (let i = 0; i < Coronavirus; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 4;
    }
    for (let i = 0; i < Bomb; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 5;
    }
    for (let i = 0; i < Bomblow; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 6;
    }
}
matrixGenerator(50, 20, 20, 20, 20, 20);
//! Creating MATRIX -- END



function weather() {
    if (weath == "winter") {
        weath = "spring"
    }
    else if (weath == "spring") {
        weath = "summer"
    }
    else if (weath == "summer") {
        weath = "autumn"
    }
    else if (weath == "autumn") {
        weath = "winter"
    }
    io.sockets.emit('weather', weath)
}
setInterval(weather, 5000);

//! SERVER STUFF  --  START
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);
//! SERVER STUFF END  --  END



function creatingObjects() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                var grass = new Grass(x, y);
                grassArr.push(grass);
            }
            else if (matrix[y][x] == 2) {
                var grassEater = new GrassEater(x, y);
                grassEaterArr.push(grassEater);
            }
            else if (matrix[y][x] == 3) {
                var allEater = new AllEater(x, y);
                AllEaterArr.push(allEater);
            }
            else if (matrix[y][x] == 4) {
                var corona = new Coronavirus(x, y);
                CoronavirusArr.push(corona);
            }
            else if (matrix[y][x] == 5) {
                var bomb = new Bomb(x, y);
                BombArr.push(bomb);
            }
            else if (matrix[y][x] == 6) {
                var bomblow = new Bomblow(x, y);
                BomblowArr.push(bomblow);
            }
            
        }
    }
}

function game() {
    if (grassArr[0] !== undefined) {
        if(weath != 'autumn') {
            for (var i in grassArr) {
                grassArr[i].mul();
            }
        }
        
    }
    if (grassEaterArr[0] !== undefined) {
        for (var i in grassEaterArr) {
            grassEaterArr[i].eat();
        }
    }
    if (AllEaterArr[0] !== undefined) {
        for (var i in AllEaterArr) {
            AllEaterArr[i].eat();
        }
    }
    if (CoronavirusArr[0] !== undefined) {
        for (var i in CoronavirusArr) {
            CoronavirusArr[i].infect();
        }
    }
    if (BombArr[0] !== undefined) {
        for (var i in BombArr) {
            BombArr[i].move();
        }
    }
    if (BomblowArr[0] !== undefined) {
        for (var i in BomblowArr) {
            BomblowArr[i].energya();
        }
    }

    //! Object to send
    let sendData = {
        matrix: matrix,
        grassCounter: grassArr.length,
        grassEaterCounter: grassEaterArr.length,
        AllEaterCounter: AllEaterArr.length,
        CoronavirusCounter: CoronavirusArr.length,
        BombCounter: BombArr.length,
        BombBlowCounter: BomblowArr.length
    }

    //! Send data over the socket to clients who listens "data"
    io.sockets.emit("data", sendData);
}



setInterval(game, 1000)

//// Add event
function kill() {
    grassArr = [];
    grassEaterArr = [];
    AllEaterArr = [];
    CoronavirusArr = [];
    BombArr = [];
    BomblowArr = [];
    
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            matrix[y][x] = 0;
        }
    }
    io.sockets.emit("send matrix", matrix)
}
io.on('connection', function (socket) {
    creatingObjects();
    socket.on("kill", kill);
});
////   Create static Json
var statistics = {};

setInterval(function () {
    statistics.grass = grassArr.length;
    statistics.grassEater = grassEaterArr.length;
    statistics.AllEater = AllEaterArr.length;
    statistics.Coronavirus = CoronavirusArr.length;
    statistics.Bomb = BombArr.length;
    statistics.Bomblow = BomblowArr.length;
    fs.writeFile("statistics.json", JSON.stringify(statistics), function () {
    })
}, 1000)

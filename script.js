function generator(matY, matX, matNum) {
    matrix = [];  
    for (let y = 0; y < matY; y++) {
        matrix[y] = [];
        for (let x = 0; x < matX; x++) {
            matrix[y][x] = 0;
        }
    }
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            for (let z = 0; z < matY; z++) {
                let num1 = Math.round(Math.random() * (matY * matNum));
                if (num1 == 0) {
                    let num = Math.round(Math.random() * matNum);
                    if (matrix[i][j] == 0) {
                        matrix[i][j] = num;
                    }         
                }
            } 
        }
    }
}

let side = 10;

function setup() {
    // frameRate(5);
    createCanvas(500,500);
    generator(50, 50, 4);
    background('gray');


    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                matrix[y][x] = new Grass(x, y, 1);
            }
            else if (matrix[y][x] == 2) {
                matrix[y][x] = new GrassEater(x, y, 2);
            }
            else if (matrix[y][x] == 3) {
                matrix[y][x] = new AllEater(x, y, 3)
            }
            else if (matrix[y][x] == 4){
                matrix[y][x] = new Bomb(x, y, 4)
            }
            else if (matrix[y][x] == 6){
                matrix[y][x] = new BombBlow(x, y, 6)
            }
            else if (matrix[y][x] == 5){
                matrix[y][x] = new Coronavirus(x, y, 5)
            }
        }
    }
}


function draw() {

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            var obj = matrix[y][x];

            if (obj.index == 1) {
                obj.mul();
            }
            else if (obj.index == 2) {
                obj.eat();
            }
            else if (obj.index == 3) {
                obj.eat();
            }
            else if (obj.index == 4) {
                obj.move();
            }
            else if (obj.index == 6) {
                obj.energya();
            }
            else if (obj.index == 5) {
                obj.infect();
            }
        }
    }
    background("gray");
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            var obj = matrix[y][x];

            if (obj.index == 1) {
                fill("green");
                rect(x * side, y * side, side, side);
                
            }
            else if (obj.index == 2) {
                fill("yellow");
                rect(x * side, y * side, side, side);               
            }
            else if (obj.index == 3) {
                fill("red");
                rect(x * side, y * side, side, side);
            }
            else if (obj.index == 4) {
                fill("blue");
                rect(x * side, y * side, side, side);
            }
            else if (obj.index == 5) {
                fill(148, 0, 211);
                rect(x * side, y * side, side, side);
            }
            else if (obj.index == 6) {
                fill(173,216,230);
                rect(x * side, y * side, side, side);
            }
        }
    }
}

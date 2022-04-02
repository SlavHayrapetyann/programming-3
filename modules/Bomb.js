var LiveForm = require("./LiveForm");
var random = require("./random.js");
var BombBlow = require("./Bomblow.js");

module.exports = class Bomb {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.energy = 15;
	}

	getNewCoordinates() {
		this.directions = [
			[this.x - 1, this.y - 1],
			[this.x, this.y - 1],
			[this.x + 1, this.y - 1],
			[this.x - 1, this.y],
			[this.x + 1, this.y],
			[this.x - 1, this.y + 1],
			[this.x, this.y + 1],
			[this.x - 2, this.y - 2],
			[this.x - 1, this.y - 2],
			[this.x - 2, this.y - 1],
			[this.x, this.y - 2],
			[this.x + 2, this.y - 2],
			[this.x + 1, this.y - 2],
			[this.x + 2, this.y - 1],
			[this.x - 2, this.y],
			[this.x + 2, this.y],
			[this.x - 2, this.y + 2],
			[this.x + 1, this.y + 2],
			[this.x - 1, this.y + 2],
			[this.x - 2, this.y + 1],
			[this.x, this.y + 2],
		];
	}



	chooseCell(num) {
		this.getNewCoordinates();
		var found = [];
		for (var i in this.directions) {
			var x = this.directions[i][0];
			var y = this.directions[i][1];
			if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
				if (matrix[y][x] == num) {
					found.push(this.directions[i]);
				}
				else {
					var obj = matrix[y][x];
					if (obj.index == num) {
						found.push(this.directions[i]);
					}
				}
			}
		}
		return found;
	}

	move() {
		this.energy--;
		var emptyCells = this.chooseCell(0);
		var newCell = random(emptyCells);

		if (newCell) {
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 3;
            matrix[this.y][this.x] = 0;
            this.y = y;
            this.x = x;
        }
        if (this.energy <= 0) {
            this.die();
        }
	}


	// blow() {
	// 	let blowCells = this.chooseCell(1) || this.chooseCell(2) || this.chooseCell(3) || this.chooseCell(0) || this.chooseCell(5);
	// 	if(blowCells){
	// 		for (let i = 0; i < blowCells.length; i++) {
	// 			let x = blowCells[i][0];
	// 			let y = blowCells[i][1];
				
				
	// 			if(matrix[y][x] == 1){
	// 				for (let i in grassArr) {
	// 					if (grassArr[i].x == x && grassArr[i].y == y) {
	// 						grassArr.splice(i, 1)
	// 					}
	// 				}
	// 			}
	// 			if(matrix[y][x] == 2){
	// 				for (let i in grassEaterArr) {
	// 					if (grassEaterArr[i].x == x && grassEaterArr[i].y == y) {
	// 						grassEaterArr.splice(i, 1)
	// 					}
	// 				}
	// 			}
	// 			if(matrix[y][x] == 3){
	// 				for (let i in AllEaterArr) {
	// 					if (AllEaterArr[i].x == x && AllEaterArr[i].y == y) {
	// 						AllEaterArr.splice(i, 1)
	// 					}
	// 				}
	// 			}
	// 			if(matrix[y][x] == 5){
	// 				for (let i in CoronavirusArr) {
	// 					if (CoronavirusArr[i].x == x && CoronavirusArr[i].y == y) {
	// 						CoronavirusArr.splice(i, 1)
	// 					}
	// 				}
	// 			}

	// 			matrix[y][x] = 6;
	// 			matrix[y][x] = new BombBlow(x, y);
				
	// 		}
	// 	}
		
		// if(blowCells){
		// 	for (let i = 0; i < blowCells.length; i++) {
		// 		let x = randomCell[0];
        //         let y = randomCell[1];

        //         matrix[y][x] = 0;
                    
		// 		let bomblow = new Bomblow(x, y);
        //         BomblowArr.push(bomblow);
		// 	}
		// }

		// let enemyCells = this.chooseCell(1) || this.chooseCell(2) || this.chooseCell(3) || this.chooseCell(5);

		// if(enemyCells){
        //     for (let i = 0; i <= 2; i++) {
        //         let randomCell = random(blowCells);
        //         if(randomCell){
        //             let x = randomCell[0];
        //             let y = randomCell[1];

        //             matrix[y][x] = 0;

		// 			let bomb = new Bomb(x, y);
        //             BombArr.push(bomb);
        //         }
        //     }
        // }
	// 	this.die();
	// }

	die() {
		matrix[this.y][this.x] = 0;

		for (let i in BombArr) {
            if (BombArr[i].x == this.x && BombArr[i].y == this.y) {
                BombArr.splice(i, 1)
            }
        }
	}
}
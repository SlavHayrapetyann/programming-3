var LiveForm = require("./LiveForm");
var random = require("./random.js");

module.exports = class Coronavirus extends LiveForm {
	constructor(x, y) {
		super(x, y)
		this.energy = 3;
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
			[this.x + 1, this.y + 1]
		];
	}

	chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character);
    }

	infect(){
		let randCells = random(this.chooseCell(3));

		if(randCells){
			let x = randCells[0];
			let y = randCells[1];

			matrix[y][x] = 4;
            let corona = new Coronavirus(x, y);
            CoronavirusArr.push(corona);

            for (let i in AllEaterArr) {
                if (AllEaterArr[i].x == x && AllEaterArr[i].y == y) {
                    AllEaterArr.splice(i, 1)
                    
                }
            }
		}
		else {
			this.move();
		}
	}

	move() {
        this.energy--;
		var emptyCells = this.chooseCell(0);
		var newCell = random(emptyCells);

		if (newCell) {
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 4;
            matrix[this.y][this.x] = 0;
            this.y = y;
            this.x = x;
        }
        if (this.energy <= 0) {
            this.die();
        }
	}
	
	die() {
		matrix[this.y][this.x] = 0;

		for (let i in CoronavirusArr) {
            if (CoronavirusArr[i].x == this.x && CoronavirusArr[i].y == this.y) {
                CoronavirusArr.splice(i, 1)
            }
        }
	}
}
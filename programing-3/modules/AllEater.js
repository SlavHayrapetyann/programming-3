var LiveForm = require("./LiveForm");
var random = require("./random.js");

module.exports = class AllEater extends LiveForm {
	constructor(x, y) {
		super(x, y)
		this.energy = 20;
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

	move() {
        this.energy--;
		var emptyCells = this.chooseCell(0);
		var newCell = random(emptyCells);

		if (newCell) {
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 2;
            matrix[this.y][this.x] = 0;
            this.y = y;
            this.x = x;
        }
        if (this.energy < 0) {
            this.die();
        }
	}

	// covid(){
	// 	 matrix[this.y][this.x] = new Coronavirus(this.x, this.y, 5);
	// }

    eat() {
		// let number = Math.round(Math.random() * 1000);
		let emptyCells = this.chooseCell(1);
		let newCell = random(emptyCells);
        let emptyCells1 = this.chooseCell(2);
		let newCell1 = random(emptyCells1);
		
		if (newCell) { //  && number != 19

            this.energy++;
			let x = newCell[0];
			let y = newCell[1];

			matrix[y][x] = 2;
            matrix[this.y][this.x] = 0;

            for (let i in grassArr) {
                if (grassArr[i].x == x && grassArr[i].y == y) {
                    grassArr.splice(i, 1)
                }
            }

			this.x = x;
            this.y = y;
			

			if (this.energy >= 30) {
				this.mul();
			}
		} else if (newCell1) { //  && number != 19

            this.energy++;
			let x = newCell1[0];
			let y = newCell1[1];

			matrix[y][x] = 2;
            matrix[this.y][this.x] = 0;

            for (let i in grassEaterArr) {
                if (grassEaterArr[i].x == x && grassEaterArr[i].y == y) {
                    grassEaterArr.splice(i, 1)
                }
            }

			this.x = x;
            this.y = y;
			

			if (this.energy >= 30) {
				this.mul();
			}
		}
		else if(number == 21){
			this.covid();
		}
		else {
			this.move();
		}
	}


	mul() {
		var emptyCells = this.chooseCell(0);
		var newCell = random(emptyCells);

		if (newCell) {
			var newX = newCell[0];
			var newY = newCell[1];

			matrix[newY][newX] = new AllEater(newX, newY, 3);
			this.energy = 4;
		}
	}

	die() {
		matrix[this.y][this.x] = 0;
	}
}
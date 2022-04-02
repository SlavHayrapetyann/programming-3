var LiveForm = require("./LiveForm");
var random = require("./random.js");
var Coronavirus = require("./Coronavirus.js");

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
            matrix[y][x] = 3;
            matrix[this.y][this.x] = 0;
            this.y = y;
            this.x = x;
        }
        if (this.energy <= 0) {
            this.die();
        }
	}

	covid(){
		this.die()
		 matrix[this.y][this.x] = 4;
		 
		let corona = new Coronavirus(this.x, this.y);
        CoronavirusArr.push(corona);
	}

    eat() {
		let number = Math.round(Math.random() * 1000);
		let emptyCells = this.chooseCell(1);
		let newCell = random(emptyCells);
        let emptyCells1 = this.chooseCell(2);
		let newCell1 = random(emptyCells1);
		
		if (newCell && number != 19) {

            this.energy++;
			let x = newCell[0];
			let y = newCell[1];

			matrix[y][x] = 3;
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
		} 
		// else if (newCell1) {

        //     this.energy++;
		// 	let x = newCell1[0];
		// 	let y = newCell1[1];

		// 	matrix[y][x] = 2;
        //     matrix[this.y][this.x] = 0;

        //     for (let i in grassEaterArr) {
        //         if (grassEaterArr[i].x == x && grassEaterArr[i].y == y) {
        //             grassEaterArr.splice(i, 1)
        //         }
        //     }

		// 	this.x = x;
        //     this.y = y;
			

		// 	if (this.energy >= 30) {
		// 		this.mul();
		// 	}
		// }
		else if(number == 19){
			this.covid();
		}
		else {
			this.move();
		}
	}


	mul() {
		let emptyCells = this.chooseCell(0);
		let newCell = random(emptyCells);

		if (newCell) {
			let x = newCell[0];
			let y = newCell[1];

			matrix[y][x] = 3;
            let allEater = new AllEater(x, y);
            AllEaterArr.push(allEater);
			this.energy = 4;
		}
	}

	die() {
		matrix[this.y][this.x] = 0;

		for (let i in AllEaterArr) {
            if (AllEaterArr[i].x == this.x && AllEaterArr[i].y == this.y) {
                AllEaterArr.splice(i, 1)
            }
        }
	}
}
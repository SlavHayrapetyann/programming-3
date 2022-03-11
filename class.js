class Grass {
	constructor(x, y, index) {
		this.x = x;
		this.y = y;
		this.index = index;
		this.multiply = 0;
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

	chooseCell(num) {
		var found = [];
		for (var i in this.directions) {
			var x = this.directions[i][0];
			var y = this.directions[i][1];
			if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {

				if (matrix[y][x] == num) {
					found.push(this.directions[i]);
				}
			}
		}
		return found;
	}

	mul() {
		this.multiply++;
		var emptyCells = this.chooseCell(0);
		var newCell = random(emptyCells);

		if (newCell && this.multiply >= 1) {
			var newX = newCell[0];
			var newY = newCell[1];
			matrix[newY][newX] = new Grass(newX, newY, 1);
			this.multiply = 0;

		}
	}


}

class GrassEater {
	constructor(x, y, index) {
		this.x = x;
		this.y = y;
		this.index = index;
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
		var emptyCells = this.chooseCell(0);
		var newCell = random(emptyCells);

		if (newCell) {
			var newX = newCell[0];
			var newY = newCell[1];

			matrix[newY][newX] = matrix[this.y][this.x];
			matrix[this.y][this.x] = 0;

			this.x = newX;
			this.y = newY;
		}

		this.energy--;
		if (this.energy <= 0) {
			this.die();
		}
	}

	eat() {
		var grassCells = this.chooseCell(1);
		var newCell = random(grassCells);

		if (newCell) {

			var newX = newCell[0];
			var newY = newCell[1];

			matrix[newY][newX] = matrix[this.y][this.x];
			matrix[this.y][this.x] = 0;

			this.x = newX;
			this.y = newY;
			this.energy++;

			if (this.energy >= 24) {
				this.mul();
			}
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

			matrix[newY][newX] = new GrassEater(newX, newY, 2);
			this.energy = 10;
		}
	}

	die() {
		matrix[this.y][this.x] = 0;
	}
}

class AllEater {
	constructor(x, y, index) {
		this.x = x;
		this.y = y;
		this.index = index;
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
		var emptyCells = this.chooseCell(0);
		var newCell = random(emptyCells);

		if (newCell) {
			var newX = newCell[0];
			var newY = newCell[1];

			matrix[newY][newX] = matrix[this.y][this.x];
			matrix[this.y][this.x] = 0;

			this.x = newX;
			this.y = newY;
		}

		this.energy--;
		if (this.energy <= 0) {
			this.die();
		}
	}

	covid(){
		 matrix[this.y][this.x] = new Coronavirus(this.x, this.y, 5);
	}

	eat() {
		let number = Math.round(Math.random() * 1000);
		let emptyCells = this.chooseCell(1) || this.chooseCell(2);
		let newCell = random(emptyCells);

		
		if (newCell && number != 21) {

			var newX = newCell[0];
			var newY = newCell[1];

			matrix[newY][newX] = matrix[this.y][this.x];
			matrix[this.y][this.x] = 0;

			this.x = newX;
			this.y = newY;
			this.energy++;

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

class Bomb {
	constructor(x, y, index) {
		this.x = x;
		this.y = y;
		this.index = index;
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
		let emptyCellsArr = [this.chooseCell(0), this.chooseCell(1)];
        let emptyCells = random(emptyCellsArr);
		let newCell = random(emptyCells);

		if (newCell) {
			var newX = newCell[0];
			var newY = newCell[1];

			matrix[newY][newX] = matrix[this.y][this.x];
			matrix[this.y][this.x] = 0;

			this.x = newX;
			this.y = newY;
		}

		this.energy--;
		if (this.energy <= 0) {
			this.blow();
		}
	}

	blow() {
		let blowCells = this.chooseCell(1) || this.chooseCell(2) || this.chooseCell(3) || this.chooseCell(0);
		if(blowCells){
			for (let i = 0; i < blowCells.length; i++) {
				let newX = blowCells[i][0];
				let newY = blowCells[i][1];
                matrix[newY][newX] = 0;
				matrix[newY][newX] = new BombBlow(newX, newY, 6);
			}
		}

		let enemyCells = this.chooseCell(1) || this.chooseCell(2) || this.chooseCell(3) || this.chooseCell(5);

		if(enemyCells){
            for (let i = 0; i <= 2; i++) {
                let randomCell = random(blowCells);
                if(randomCell){
                    let newX = randomCell[0];
                    let newY = randomCell[1];
					// let randNum = Math.round(Math.random() * 1);
					// if(randNum){
						matrix[newY][newX] = new Bomb(newX, newY, 4);
					// }
                }
            }
        }
		this.die();
	}

	die() {
		matrix[this.y][this.x] = 0;
	}
}

class BombBlow {
	constructor(x, y, index) {
		this.x = x;
		this.y = y;
		this.index = index;
		this.energy = 10;
	}

	energya(){
		this.energy--;
		if (this.energy <= 0) {
			this.die();
		}
	}
	die() {
		matrix[this.y][this.x] = 0;
	}
}

class Coronavirus {
	constructor(x, y, index) {
		this.x = x;
		this.y = y;
		this.index = index;
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

	infect(){
		let grassGrassEaterCellsArr = [this.chooseCell(2), this.chooseCell(3)];
		let cellsArr = random(grassGrassEaterCellsArr);
		let randCells = random(cellsArr);

		if(randCells){
			let newX = randCells[0];
			let newY = randCells[1];

			matrix[newY][newX] = new Coronavirus(newX, newY, 5);
		}
		else {
			this.move();
		}
	}

	move() {
		let emptyCellsArr = [this.chooseCell(0), this.chooseCell(1)];
        let emptyCells = random(emptyCellsArr);
		let newCell = random(emptyCells);

		if (newCell) {
			let newX = newCell[0];
			let newY = newCell[1];

			matrix[newY][newX] = matrix[this.y][this.x];
			matrix[this.y][this.x] = 0;

			this.x = newX;
			this.y = newY;
			this.energy--;
		if (this.energy <= 0) {
			this.die();
		}
		}

		
	}
	
	die() {
		
		matrix[this.y][this.x] = 0;
	}
}
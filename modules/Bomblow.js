var LiveForm = require("./LiveForm");
var random = require("./random.js");

module.exports = class BombBlow extends LiveForm {
	constructor(x, y) {
		super(x, y)
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

		for (let i in BomblowArr) {
            if (BomblowArr[i].x == this.x && BomblowArr[i].y == this.y) {
                BomblowArr.splice(i, 1)
            }
        }
	}
}
function Tonneau() {
	this.x = 20;
	this.y = 20;

	this.xsp = 1;
	this.ysp = 0;

	this.sens = false;

	this.d = 15;

	// Gestion des Collision avec les échelles et joueur
	this.xCol = this.x - this.d/2;
	this.yCol = this.y - this.d/2;
	
	this.display = function() {
		this.xCol = this.x - this.d/2;
		this.yCol = this.y - this.d/2;

		push();
		translate(this.x,this.y);
		if (this.sens) {
			rotate(radians(frameCount%360 * -5));
		}
		else {
			rotate(radians(frameCount%360 * 5));
		}
		
		strokeWeight(1);
        stroke(35);
		fill(200,100,0);
		ellipse(0, 0, this.d);
		noStroke();

		fill(0);
		ellipse(0, 0, this.d, 2);
		pop();


		
	}

	this.gravity = function(sol) {
		if (this.x + this.d >= 300) {
			this.sens =  true;
			
		}
		if (this.x <= 0) {
			this.sens = false;
		}

		//////////////////////////////

		if (this.sens) {
			if (sol) {
				this.ysp = 0.2;
				this.xsp = -2;
			}
			else {
				this.ysp = 2;
				this.xsp = -0.2;
			}
		}
		else {
			if (sol) {
				this.ysp = 0.2;
				this.xsp = 2;
			}
			else {
				this.ysp = 2;
				this.xsp = 0.2;
			}
		}

		/////////////////////////////////

		this.y += this.ysp;
		this.x += this.xsp;
	}
}
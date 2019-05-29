function Echelle(x, y, ht) {
	this.x = x;
	this.y = y;

	this.ht = ht;
	this.lg = 15;

	this.bar = 2;

	this.r = 0;
	this.v = 150;
	this.b = 225;

	this.display = function() {
		

		noStroke();
		fill(this.r,this.v,this.b);
		rect(this.x, this.y, this.bar, this.ht);

		noStroke();
		fill(this.r,this.v,this.b);
		rect(this.x + this.lg - this.bar, 
			 this.y, this.bar, this.ht);

		for (var i = 3; i < this.ht ; i += 6) {
			noStroke();
			rect(this.x, this.y + i, this.lg, this.bar);
		}
	}
}
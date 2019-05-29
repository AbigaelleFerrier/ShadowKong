function Mur(x,y) {
	
	//VAR OBJ // 
	this.x = x;
	this.y = y;
	this.d = 5;

	////////////

	this.display = function() {
		noStroke();
		fill(255,20,20);
		rect(this.x, this.y, this.d, this.d);
	}


	
}
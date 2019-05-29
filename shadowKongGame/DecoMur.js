function DecoMur(x,y, h, l) {
	
	//VAR OBJ // 
	this.x = x;
	this.y = y;

	this.h = h;
	this.l = l;
	

	////////////

	this.display = function() {
		noStroke();
		fill(100,20,20);
		rect(this.x, this.y, this.h, this.l);
	}


	
}
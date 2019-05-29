function Player() {

	// VARIABLE OBJ //
		//Position
		this.x = width / 40 ;
		this.y = height - height / 40 - 1;

		//this.x=0; <- pour tricher efficacement 
		//this.y=0; <- pour tricher efficacement ^.^

		//Vitesse Déplacement
		this.xsp = 0;
		this.ysp = 0;

		//Taille
		this.ht = height / 40;
		this.lg = width / 40;

		//Jump
		this.jump = true;
	//////////////////




	this.move = function(EchelleCollision, EchelleCollisionHaut) {
		if (keyIsDown(UP_ARROW)) 	{ 
			if (EchelleCollision) {
				this.ysp = -5;
			}
			else if (this.jump) {
				this.ysp = -10;
				this.jump = false; 
			} // ↑


		}
		
		if (keyIsDown(LEFT_ARROW)) 	{ 
			if (! (this.x -  4 < 0) ) {
				this.xsp = -2; // ←
			}
		} 

		if (keyIsDown(RIGHT_ARROW)) { 
			if (! (this.x + this.lg + 4 > width) ) {
				this.xsp = 2;  // →	
			}
			
		}

		if (keyIsDown(DOWN_ARROW)) 	{ 
			if (EchelleCollisionHaut) {
				this.ysp = +3;
			} // ↓
			else if (!this.jump && (this.y + this.ht + 5 ) < height ) {
				this.ysp = +1;
			}
		}
	}


	this.getXpied = function() {
		return (this.x + this.lg / 2);
	}
	this.getYpied = function() {
		return (this.y + this.ht);
	}










	this.display = function() {
		fill(255);
		rect(this.x += this.xsp, this.y += this.ysp, this.lg, this.ht);
	}

	this.gravity = function(collision, distance) {
		this.xsp *= 0.6;
		this.ysp *= 0.9;


		//si il n'est pas tout en bas et que tombe est à false
		if (! (this.y + this.ht >= height) && ! collision  ) {
			this.y += 3;
		}

		if(collision) {
			this.jump = true; //on reset le jump
		}

		if ( ! (distance < 3) && collision ) {
			this.y -= 2;
		}
		
		
		
	}
}
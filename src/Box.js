/* 
 * Classe des box (bouge l'image de la box lorsque sa div est déplacée
 * et gère le déplacement en diagonale et le rebond sur les murs) 
 */

Box = function() {
	// Vitesse de déplacement de l'image 
	this.speed = 8;
	// Position de la div
	this.id = 0;
	// Sur une cible 
	this.onTarget = false;
	// Taille des cases  
	this.boxWidth = 40;
	this.boxHeight = 40;
	// Direction de déplacement 
	this.direction = 1;
	// Déplacement en diagonale  
	this.hit = false;
	this.hitDirection = "";
}

// Méthodes updatées dans la boucle 
Box.prototype.update = function() {

	// Rafraîchissement de la position de l'image 
	this.moveImage();

	// Déplacement en diagonale 
	this.bounce();
}

// Déplacement de l'image 
Box.prototype.moveImage = function() {

	// Rafraîchissement de la position de l'image 
	this.image.css('left', this.image.x);
	this.image.css('top', this.image.y);

	if (this.x > this.image.x) {
		this.image.x += this.speed;
	}
	if (this.x < this.image.x) {
		this.image.x -= this.speed;
	}
	if (this.y > this.image.y) {
		this.image.y += this.speed;
	}
	if (this.y < this.image.y) {
		this.image.y -= this.speed;
	}
}

// Déplacement en diagonale avec rebond si possible 
Box.prototype.bounce = function() {

	if (this.hit && this.image.x == this.x && this.image.y == this.y) {

		// Test de direction
		if (this.hitDirection == "BOTTOMRIGHT") {

			// Si collision avec un mur, rebond 
			if ((currentLevel[this.id + moveVertical] == wallCase && currentLevel[this.id - 8] != wallCase && currentLevel[this.id - 8] != boxCase) ||
				(currentLevel[this.id + moveHorizontal] == wallCase && currentLevel[this.id + 8] != wallCase && currentLevel[this.id + 8] != boxCase)) {
				// Définition de la direction de rebond  
				if (currentLevel[this.id + moveVertical] == wallCase && currentLevel[this.id - 8] != wallCase) this.direction = 1;
				else this.direction = -1;
				// Déplacement de la box 
				console.log("Croucrou");
				this.x += this.boxWidth * this.direction;
				this.y -= this.boxHeight * this.direction;
				currentLevel[this.id] = groundCase;
				this.id -= 8 * this.direction;
				currentLevel[this.id] = boxCase;
				this.hit = false;
			}
			else if (currentLevel[this.id + 10] != wallCase && currentLevel[this.id + moveVertical] != wallCase) {

				console.log("Cracra");
				// Déplacement de la box 
				this.x += this.boxWidth;
				this.y += this.boxHeight;
				currentLevel[this.id] = groundCase;
				this.id += 10;
				currentLevel[this.id] = boxCase;
				this.hit = false;
			}
			else this.hit = false;
		}
		else if (this.hitDirection == "BOTTOMLEFT") {

			// Si collision avec un mur, rebond 
			if ((currentLevel[this.id + moveVertical] == wallCase && currentLevel[this.id - 10] != wallCase && currentLevel[this.id - 10] != boxCase) ||
				(currentLevel[this.id - moveHorizontal] == wallCase && currentLevel[this.id + 10] != wallCase && currentLevel[this.id + 10] != boxCase)) {
				console.log("Croucrou");
				// Définition de la direction de rebond  
				if (currentLevel[this.id + moveVertical] == wallCase && currentLevel[this.id - 10] != wallCase) this.direction = 1;
				else this.direction = -1;
				// Déplacement de la box 
				this.x -= this.boxWidth * this.direction;
				this.y -= this.boxHeight * this.direction;
				currentLevel[this.id] = groundCase;
				this.id -= 10 * this.direction;
				currentLevel[this.id] = boxCase;
				this.hit = false;
			}
			else if (currentLevel[this.id + 8] != wallCase && currentLevel[this.id + moveVertical] != wallCase) {
				// Déplacement de la box 
				console.log("Cracra");
				this.x -= this.boxWidth;
				this.y += this.boxHeight;
				currentLevel[this.id] = groundCase;
				this.id += 8;
				currentLevel[this.id] = boxCase;
				this.hit = false;
			}
			else this.hit = false;
		}
		else if (this.hitDirection == "TOPRIGHT") {

			// Si collision avec un mur, rebond 
			if ((currentLevel[this.id - moveVertical] == wallCase && currentLevel[this.id + 10] != wallCase && currentLevel[this.id + 10] != boxCase) ||
				(currentLevel[this.id + moveHorizontal] == wallCase && currentLevel[this.id - 10] != wallCase && currentLevel[this.id - 10] != boxCase)) {
				console.log("Croucrou");
				// Si rebond à l'horizontal, direction positive 
				if (currentLevel[this.id - moveVertical] == wallCase && currentLevel[this.id + 10] != wallCase) this.direction = 1;
				else this.direction = -1;
				// Déplacement de la box 
				this.x += this.boxWidth * this.direction;
				this.y += this.boxHeight * this.direction;
				currentLevel[this.id] = groundCase;
				this.id += 10 * this.direction;
				currentLevel[this.id] = boxCase;
				this.hit = false;
			}
			else if (currentLevel[this.id - 8] != wallCase && currentLevel[this.id - moveVertical] != wallCase) {
				// Déplacement de la box 
				console.log("Cracra");
				this.x += this.boxWidth;
				this.y -= this.boxHeight;
				currentLevel[this.id] = groundCase;
				this.id -= 8;
				currentLevel[this.id] = boxCase;
				this.hit = false;
			}
			else this.hit = false;
		}
		else if (this.hitDirection == "TOPLEFT") {

			// Si collision avec un mur, rebond 
			if ((currentLevel[this.id - moveVertical] == wallCase && currentLevel[this.id + 8] != wallCase && currentLevel[this.id + 8] != boxCase) ||
				(currentLevel[this.id - moveHorizontal] == wallCase && currentLevel[this.id - 8] != wallCase && currentLevel[this.id - 8] != boxCase)) {
				console.log("Croucrou");
				// Si rebond à l'horizontal, direction positive 
				if (currentLevel[this.id - moveVertical] == wallCase && currentLevel[this.id + 8] != wallCase) this.direction = 1;
				else this.direction = -1;
				// Déplacement de la box 
				this.x -= this.boxWidth * this.direction;
				this.y += this.boxHeight * this.direction;
				currentLevel[this.id] = groundCase;
				this.id += 8 * this.direction;
				currentLevel[this.id] = boxCase;
				this.hit = false;
			}
			else if (currentLevel[this.id - 10] != wallCase && currentLevel[this.id - moveVertical] != wallCase) {
				// Déplacement de la box 
				console.log("Cracra");
				this.x -= this.boxWidth;
				this.y -= this.boxHeight;
				currentLevel[this.id] = groundCase;
				this.id -= 10;
				currentLevel[this.id] = boxCase;
				this.hit = false;
			}
			else this.hit = false;
		}
	};                         
}
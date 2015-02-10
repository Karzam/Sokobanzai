/* 
 * Classe player (mouvements du personnage et poussement des bonzaïs, 
 * main feature et undo/redo)
 */

Player = function() {
	// Création de l'image 
	$('#tileset').append('<div id="player" class="tile"></div>');
	this.image = $('#player');
	// Vitesse de déplacement de l'image 
	this.image.speed = 8;
	// Position de la div 
	this.id = 0;
	// Coefficient de direction de déplacement 
	this.moveCoeff = 1;
	// Coefficient de direction de frappe 
	this.hitCoeff = 1;
	// Déplacement de la div
	this.moveLength = null;
	this.moveDiagonal = null;
	// Taille des cases  
	this.boxWidth = 40;
	this.boxHeight = 40;
	// Tableau undo 
	this.undoArray = [];

}

// Méthodes updatées dans la boucle 
Player.prototype.update = function() {

	// Evènement de déplacement 	
	this.getMove();

	// Déplacement de l'image 
	this.moveImage();

	// Evènement de main feature 
	this.getHit();
}

// Evènement de déplacement 
Player.prototype.getMove = function() {

	if (controller.left && currentLevel[this.id - moveHorizontal] != wallCase) {
		this.move('LEFT');
	} 
	else if (controller.top && currentLevel[this.id - moveVertical] != wallCase) {
		this.move('TOP');
	} 
	else if (controller.right && currentLevel[this.id + moveHorizontal] != wallCase) {
		this.move('RIGHT');
	} 
	else if (controller.bottom && currentLevel[this.id + moveVertical] != wallCase) {
		this.move('BOTTOM');
	} 
}

// Déplacement de la div 
Player.prototype.move = function(direction) {

	for (var i = 0; i < boxArray.length; i++) {
		var box = boxArray[i];

		this.moveCoeffList = {
			RIGHT: 1,
			LEFT: -1,
			TOP: -1,
			BOTTOM: 1
		}
		this.moveLengthList = {
			RIGHT: moveHorizontal,
			LEFT: moveHorizontal,
			TOP: moveVertical,
			BOTTOM: moveVertical
		}
		 
		this.moveCoeff = this.moveCoeffList[direction];
		this.moveLength = this.moveLengthList[direction];

		// Si box à côté et pas de collision possible 
		if ((controller.left || controller.right || controller.top || controller.bottom) && 
			box.id == this.id + (this.moveLength * this.moveCoeff) && 
			currentLevel[this.id + (this.moveLength * 2 * this.moveCoeff)] != wallCase && 
			currentLevel[this.id + (this.moveLength * 2 * this.moveCoeff)] != boxCase) {
			// Augmentation du nombre de pas 
			userInterface.step++;
			// Enregistrement du tableau dans le tableau d'undo 
			this.undoArray.push(currentLevel);
			// Décalage de la position du player 
			if (direction == 'RIGHT' || direction == 'LEFT') this.x += this.boxWidth * this.moveCoeff;
			else this.y += this.boxWidth * this.moveCoeff;
			this.id += this.moveLength * this.moveCoeff;
			currentLevel[this.id] = playerCase;
			currentLevel[this.id - (this.moveLength * this.moveCoeff)] = groundCase;
			// Décalage de la position de la box			
			if (direction == 'RIGHT' || direction == 'LEFT') box.x += this.boxWidth * this.moveCoeff; 
			else box.y += this.boxWidth * this.moveCoeff; 
			box.id += this.moveLength * this.moveCoeff;
			currentLevel[this.id + (this.moveLength * this.moveCoeff)] = boxCase;
			// Fin du déplacement
			if (direction == 'RIGHT') controller.right = false; 
			else if (direction == 'LEFT') controller.left = false; 
			else if (direction == 'TOP') controller.top = false; 
			else if (direction == 'BOTTOM') controller.bottom = false; 
		}
		// Sinon si aucun objet à côté 
		else if ((controller.left || controller.right || controller.top || controller.bottom) && 
			(currentLevel[this.id + (this.moveLength * this.moveCoeff)] == groundCase || 
			currentLevel[this.id + (this.moveLength * this.moveCoeff)] == targetCase)) {
			// Augmentation du nombre de pas 
			userInterface.step++;
			// Enregistrement du tableau dans le tableau d'undo 
			this.undoArray.push(currentLevel);
			// Décalage de la position du player
			if (direction == 'RIGHT' || direction == 'LEFT') this.x += this.boxWidth * this.moveCoeff;
			else this.y += this.boxWidth * this.moveCoeff;
			this.id += this.moveLength * this.moveCoeff;
			currentLevel[this.id] = playerCase;
			// Décalage de la position du sol
			currentLevel[this.id - (this.moveLength * this.moveCoeff)] = groundCase;
			// Fin du déplacement
			if (direction == 'RIGHT') controller.right = false;
			else if (direction == 'LEFT') controller.left = false; 
			else if (direction == 'TOP') controller.top = false;
			else if (direction == 'BOTTOM')controller.bottom = false; 
		}
	}

	/*if (controller.left || controller.right || controller.top || controller.bottom) {
			this.undoArray.push(currentLevel);
		}*/
}

// Déplacement de l'image 
Player.prototype.moveImage = function() {

	// Rafraîchissement de la position de l'image 
	this.image.css('left', this.image.x);
	this.image.css('top', this.image.y);

	if (this.x > this.image.x) {
		this.image.x += this.image.speed;
	}
	else if (this.x < this.image.x) {
		this.image.x -= this.image.speed;
	}
	else if (this.y > this.image.y) {
		this.image.y += this.image.speed;
	}
	else if (this.y < this.image.y) {
		this.image.y -= this.image.speed;
	}
}

// Evènement de main feature  
Player.prototype.getHit = function() {

	for (var i = 0; i < boxArray.length; i++) {
		var box = boxArray[i];

		if (controller.space && this.id + 10 == box.id && userInterface.hit > 0) {
			this.hit('BOTTOMRIGHT', box);
		}
		else if (controller.space && this.id - 10 == box.id && userInterface.hit > 0) {
			this.hit('TOPLEFT', box);
		}
		else if (controller.space && this.id + 8 == box.id && userInterface.hit > 0) {
			this.hit('BOTTOMLEFT', box);
		}
		else if (controller.space && this.id - 8 == box.id && userInterface.hit > 0) {
			this.hit('TOPRIGHT', box);
		}
	}
}

// Main feature 
Player.prototype.hit = function(direction, box) {

	// Définition de la direction de frappe de la box 
	if (direction == 'BOTTOMRIGHT') {
		this.hitCoeff = 1;
		this.moveDiagonal = 10;
	}
	else if (direction == 'TOPLEFT') {
		this.hitCoeff = -1;
		this.moveDiagonal = 10;
	}
	else if (direction == 'BOTTOMLEFT') {
		this.hitCoeff = 1;
		this.moveDiagonal = 8;
	}
	else if (direction == 'TOPRIGHT') {
		this.hitCoeff = -1;
		this.moveDiagonal = 8;
	}

	// Si aucune collision possible 
	if (player.id + this.moveDiagonal * this.hitCoeff == box.id && currentLevel[box.id + this.moveDiagonal * this.hitCoeff] != wallCase && currentLevel[box.id + this.moveDiagonal * this.hitCoeff] != boxCase && 
		!(currentLevel[this.id + moveVertical * this.hitCoeff] == wallCase && currentLevel[this.id + moveHorizontal * this.hitCoeff] == wallCase) &&
		!(currentLevel[box.id + moveVertical * this.hitCoeff] == wallCase && currentLevel[box.id + moveHorizontal * this.hitCoeff] == wallCase)) {
		// Baisse du nombre de frappes restantes 
		userInterface.hit--;
		box.hitDirection = direction;
		box.hit = true;
		// Déplacement de la box en diagonale 
		if (direction == 'BOTTOMLEFT' || direction == 'TOPRIGHT') box.x -= this.boxWidth * this.hitCoeff;
		else box.x += this.boxWidth * this.hitCoeff;
		box.y += this.boxHeight * this.hitCoeff;
		currentLevel[box.id] = groundCase;
		box.id += this.moveDiagonal * this.hitCoeff;
		currentLevel[box.id] = boxCase;
		controller.space = false;
	}
}

// Undo 
/*Player.prototype.undo = function() {
	if (this.undoArray.length > 0) {
		// Reduction du nombre de pas 
		userInterface.step--;
		// Suppression du tableau 
		$('.tile').remove();
		// Affichage de l'ancien tableau 
		currentLevel = this.undoArray[this.undoArray.length - 1];
		tileset.createTileset(currentLevel);
	}*/

	/*console.log(this.undoArray);
	if (this.undoArray.length > 0) {
		console.log(currentLevel);
		currentLevel = this.undoArray[this.undoArray.length-1];
		this.undoArray.splice(this.undoArray.length - 1);
		//console.log(currentLevel);
	} else {
		console.log("BOUHIA");
	}
}*/	

// Redo 
/*Player.prototype.redo = function() {
	if (this.redoArray.length > 0) {
		// Augmentation du nombre de pas 
		userInterface.step++; 
		// Suppression de la dernière position du player 
		var posArray = this.redoArray[this.redoArray.length - 2];
		// Changement de position du player
		this.x = posArray[0];
		this.y = posArray[1];
		this.id = posArray[2];
		// Suppression du tableau redo
		this.redoArray.splice(this.redoArray.length - 1);
	}
}*/
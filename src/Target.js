/* 
 * Classe des cibles (changent d'image lorsqu'elles sont 
 *	complétées)
 */

Target = function() {
	// Position de la div
	this.id = 0;
	// Cible complète 
	this.completed = null;
}

// Méthodes updatées dans la boucle 
Target.prototype.update = function() {

	// Rafraîchissement de la position de l'image 
	this.image.css('left', this.image.x);
	this.image.css('top', this.image.y);

	// Cible complétée 
	this.checkCompleted();
}

// Test de cible complétée 
Target.prototype.checkCompleted = function() {

	for (var i = 0; i < boxArray.length; i++) {
		var box = boxArray[i];

		if (this.completed == null && (this.image.x == box.image.x && this.image.y == box.image.y)) {
			this.image.css('background-image', 'url("../assets/bonzaiInsidePot.png")');
			box.image.css('background-image', 'url("../assets/invisible.png")');
			box.onTarget = true;
			targetCompleted++;
			this.completed = box;
		}
		else if (this.completed == box && box.onTarget && (this.x != box.image.x || this.y != box.image.y)) {
			this.image.css('background-image', 'url("../assets/pot.png")');
			box.image.css('background-image', 'url("../assets/bonzai.png")');
			targetCompleted--;
			this.completed = null;
		}
	}
}
/* 
 * Classe de l'interface (gère l'afichage du nombre de pas 
 * et du nombre de main features restantes)
 */

UserInterface = function() {
	// Nombre de pas effectués 
	this.step = 0;
	// Nombre de frappes restantes 
	this.hit = hit;
}

// Méthodes updatées dans la boucle 
UserInterface.prototype.update = function() {

	// Nombre de pas
	this.updateStep();

	// Nombre de frappes 
	this.updateHit();
}

// Mis à jour du nombre de pas effectués 
UserInterface.prototype.updateStep = function() {
	
	$('#score p').text("X" + this.step);
}

// Mis à jour du nombre de frappes restantes 
UserInterface.prototype.updateHit = function() {

	$('#special p').text("X" + this.hit);
}
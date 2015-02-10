/* 
 * Classe controller (définit l'état pressé ou relâché des touches)
 */

Controller = function() {
	// Initialisation clavier 
	document.onkeydown = this.onKeyDown.bind(this);
	document.onkeyup = this.onKeyUp.bind(this);
	// Touches 
	this.left = false;
	this.top = false;
	this.bottom = false;
	this.right = false;
	this.space = false;
}

// Touche appuyée 
Controller.prototype.onKeyDown = function(event) {
	if (event.keyCode == 37) {
		this.left = true;
	}
	if (event.keyCode == 38) {
		this.top = true;
	}
	if (event.keyCode == 40) {
		this.bottom = true;
	}
	if (event.keyCode == 39) {
		this.right = true;
	}
	if (event.keyCode == 32) {
		this.space = true;
	}
}

// Touche relâchée 
Controller.prototype.onKeyUp = function(event) {
	if (event.keyCode == 37) {
		this.left = false;
	}
	if (event.keyCode == 38) {
		this.top = false;
	}
	if (event.keyCode == 40) {
		this.bottom = false;
	}
	if (event.keyCode == 39) {
		this.right = false;
	}
	if (event.keyCode == 32) {
		this.space = false;
	}
}
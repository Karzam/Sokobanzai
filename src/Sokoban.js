/* 
 * Classe manager de l'initialisation des objets 
 * et de leur rafraîchissement 
 */
var requestAnimId;

// Création des objets 
var controller;
var userInterface;
var tileset;
var player;
var boxArray;
var targetArray;
var targetCompleted;
var currentLevel;
var win;

//Déplacement des divs
var moveHorizontal = 1;
var moveVertical = 9;

// Symboles des objets
var playerCase = "@";
var targetCase = ".";
var wallCase = "#";
var boxCase = "$";
var groundCase = " ";

Sokoban = function() {
}

// Initialisation 
Sokoban.prototype.init = function() {

	// Contrôle du player  
	controller = new Controller();

	// Création du player 
	player = new Player();

	// Interface utilisateur 
	userInterface = new UserInterface(); 

	// Liste des box 
	boxArray = [];

	// Liste des cibles 
	targetArray = [];

	// Cibles complètes
	targetCompleted = 0;

	// Tileset 
	tileset = new Tileset();

	// Création du tileset
	tileset.createTileset(currentLevel);

	// Win
	win = new Win();

	requestAnimId = window.requestAnimationFrame(function() {
		sokoban.update();
	});
}

// Boucle principale 
Sokoban.prototype.update = function() {

	// Interface utilisateur 
	userInterface.update();

	// Player
	player.update();

	// Box 
	for (var i = 0; i < boxArray.length; i++) {
		boxArray[i].update();
	}

	// Cibles 
	for (var i = 0; i < targetArray.length; i++) {
		targetArray[i].update();
	}

	// Win 
	win.update();

	requestAnimId = window.requestAnimationFrame(function() {
		sokoban.update();
	});
}
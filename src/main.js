(function() {

	var requestAnimId;

	// Initialisation 
	function init() {

		// Contrôle du player  
		controller = new Controller();

		// Interface utilisateur 
		userInterface = new UserInterface(); 

		// Tileset 
		tileset = new Tileset();

		// Liste des box 
		boxArray = [];

		// Liste des cibles 
		targetArray = [];

		// Cibles complètes
		targetCompleted = 0;

		// Création du tileset
		currentLevel = window['level' + sessionStorage.getItem('levelSelected')];
		tileset.createTileset(currentLevel);
		
		requestAnimId = window.requestAnimationFrame(update);
	}

	// Boucle principale 
	function update() {

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

		requestAnimId = window.requestAnimationFrame(update);
	}

	window.onload = init;

})();
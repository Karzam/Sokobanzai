/* 
 * Récupère le niveau sélectionné et créé le tableau correspondant 
 */

var levelSelected;
var sokoban; 
var currentLevel;
var par;
var hit;

// Si click sur un niveau 
for (var i = 1; i <= 15; i++) {

    $('#' + i).click(function() {

		// Récupération du level 	
    	levelSelected = this.id; 

    	// Si niveau non locké 
		if (!maps['levelDesign'][levelSelected - 1]['locked']) {
    	
			// Affichage du level
			$("#select").hide();
			$("link").attr({rel:"stylesheet", href:"../css/level.css"});
			$("#game").fadeIn("slow");    	
			
			// Remplissage du tableau de level 
			currentLevel = [];
			converse();
			
			// Par et main feature associés au niveau 
			par = maps['levelDesign'][levelSelected - 1]["par"];
			hit = maps['levelDesign'][levelSelected - 1]["hit"];

			// Lancement du jeu 
			sokoban = new Sokoban();
			sokoban.init();
    	}
	});
}

/*
 * Passe au niveau suivant sur le winscreen 
 */
$('#nextLevel').click(function() {	
	if (levelSelected != 15) {
		// Niveau suivant 
		levelSelected++;

		// Destruction du précédent level 
		$("#tileset").empty();

		// Affichage du level
		$("#winscreen").hide();
		$("link").attr({rel:"stylesheet", href:"../css/level.css"});
		$("#game").fadeIn("slow");    	
		
		// Remplissage du tableau de level 
		currentLevel = [];
		converse();
		
		// Par et main feature associés au niveau 
		par = maps['levelDesign'][levelSelected - 1]["par"];
		hit = maps['levelDesign'][levelSelected - 1]["hit"];

		// Lancement du jeu 
		sokoban = new Sokoban();
		sokoban.init();
   	}
});

/* 
 * Restart le niveau sur le winscreen 
 */ 
$('.restartLevel, #restart').click(function() {	
	// Destruction du précédent level 
	$("#tileset").empty();
	
	// Affichage du level
	$("#winscreen").hide();
	$("link").attr({rel:"stylesheet", href:"../css/level.css"});
	$("#game").fadeIn("slow");    	
	
	// Remplissage du tableau de level 
	currentLevel = [];
	converse();
	
	// Par et main feature associés au niveau 
	par = maps['levelDesign'][levelSelected - 1]["par"];
	hit = maps['levelDesign'][levelSelected - 1]["hit"];

	// Lancement du jeu 
	sokoban = new Sokoban();
	sokoban.init();
});
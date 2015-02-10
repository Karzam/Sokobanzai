/* 
 * Classe du Winscreen (vérifie si le jeu est gagné, 
 * envoie le score sur le serveur et l'affiche sur le winscreen)
 */
 
Win = function() {
	// Level terminé
	this.levelFinished = false;
	// Score
	this.score = 0;
}

// Méthodes updatées dans la boucle 
Win.prototype.update = function() {

	// Test si le jeu est gagné 
	this.checkWin(); 
}

// Test si le jeu est gagné  
Win.prototype.checkWin = function() {

	if (targetCompleted == targetArray.length && !this.levelFinished) {
		this.levelFinished = true;

		// Définition du score 
		userInterface <= par ? this.score = 1 : this.score = 2;

		// Envoi du score et du level
		$.ajax({
			type: "POST",
			url: "../php/score.php",
			data: {	login: login, 
					score: this.score,
					level: levelSelected }
		}).done(function() {
			// Redirection vers le winscreen 
			$("#game").hide();
			$("link").attr({rel:"stylesheet", href:"../css/winscreen.css"});
			$("#winscreen").fadeIn("slow");
			// Affichage du score
			win.displayScore();
		});
	}
}

// Affichage du score 
Win.prototype.displayScore = function() {

	$("#finalScore").html('SCORE : ' + this.score);
	$("#finalScore").css({
		"color": "#800", 
		"font-family": "Karate",
		"font-size": "2em",
		"padding-top": "1em",
		"text-align": "center" 
	});
}
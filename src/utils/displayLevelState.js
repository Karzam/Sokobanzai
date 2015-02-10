/* 
 * Affiche l'état des niveaux 
 */ 
$(".goSelect").click(function() {

	// Affichage de l'écran de sélection 
	$("#title, #game").hide();
	$("link").attr({rel:"stylesheet", href:"../css/select.css"});
	$("#select").fadeIn("slow");

 	// Level locké 
	for (var i = 0; i < 15; i++) {

		if (maps['levelDesign'][i]['locked']) {
			$("#" + parseInt(i + 1)).removeClass('level').addClass('levelLock');
		}
	}
});
// Affichage initial 
$("#title").hide();
$("#select").hide();
$("#game").hide();
$("#help").hide();
$("#scores").hide();
$("#winscreen").hide();


// Ecran titre
$(".goTitle").click(function() {

	$("#help, #scores, #select, #home").hide();
	$("link").attr({rel:"stylesheet", href:"../css/title.css"});
	$("#title").fadeIn("slow");
});

// Ecran d'aide  
$(".goHelp").click(function() {

	$("#title").hide();
	$("link").attr({rel:"stylesheet", href:"../css/help.css"});
	$("#help").fadeIn("slow");
});

// Ecran des highscores
$(".goScores").click(function() {

	$("#title").hide();
	$("link").attr({rel:"stylesheet", href:"../css/highscores.css"});
	$("#scores").fadeIn("slow");
});

// Retour à l'écran de sélection depuis un level 
$(".returnSelect").click(function() {

	// Destruction du level en cours 
	$("#tileset").empty();

	$("#game, #winscreen").hide();
	$("link").attr({rel:"stylesheet", href:"../css/select.css"});
	$("#select").fadeIn("slow");
});
var login;

$(document).ready(function() {
    
    $('#loginForm').on('submit', function(e) {
        // Empêchement du navigateur de soumettre le formulaire 
        e.preventDefault();  
 
        // Récupération du pseudo rentré
        login = $('#login').val();

        // Vérification de remplissage du champ
        if (login === '') {
            alert('Rentrez un nom apprenti ninja !');

        } else {

            $.ajax({
                url: "../php/connexion.php",
                type: "POST",
                data: {login: login}
                }).done(function() {
                    // Affichage de l'écran titre 
                    $("#home").hide();
                    $("link").attr({rel:"stylesheet", href:"../css/title.css"});
                    $("#title").fadeIn("slow");
                });
            }
    });
});
<?php 

error_reporting(E_ALL);
include('config.php');

try { 

	$connexion = new PDO($source, $utilisateur);
	// Recherche du pseudo saisi
	$requete = "SELECT * FROM user WHERE pseudo = '" . $_POST['login'] . "'";
	$resultat = $connexion->query($requete);

	if ($resultat->rowCount() > 0) {

		// Pseudo existant 
	}
	else {
		// Sinon, création d'un nouveau pseudo et connexion 
		$requete = "INSERT INTO user(pseudo) VALUES ('".$_POST['login']."')";
		$resultat = $connexion->query($requete);
	}   
}

catch (PDOException $e) {
	
	print 'Erreur PDO : '.$e->getMessage().'<br />';
	die();
}

?>
<?php 

error_reporting(E_ALL);
include('config.php');

try {

	$connexion = new PDO($source, $utilisateur);
	// Stockage du score du level
	$requete = "SELECT Score FROM scores WHERE IDLevel = '".$_POST['level']."' AND LoginPlayer = '".$_POST['login']."'";
	$resultat = $connexion->query($requete);

	if ($resultat->rowCount() > 0) {

		// Si niveau déjà fini, changement du score si supérieur
		$requete = "UPDATE scores SET Score = '".$_POST['score']."' WHERE IDLevel = '".$_POST['level']."' AND LoginPlayer = '".$_POST['login']."' AND Score < '".$_POST['score']."'";
		$resultat = $connexion->query($requete);
	}
	else {

		// Si niveau jamais fini, stockage du nouveau score 
		$requete = "INSERT INTO scores(LoginPlayer, IDLevel, Score) VALUES ('".$_POST['login']."', '".$_POST['level']."', '".$_POST['score']."')";
		$resultat = $connexion->query($requete);
	} 
}

catch (PDOException $e) {
	
	print 'Erreur PDO : '.$e->getMessage().'<br />';
	die();
}

?>
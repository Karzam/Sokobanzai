/* 
 * Classe de la grille (crée les tiles du level sélectionné 
 * et les images des objets déplaçables)
 */

Tileset = function() {
	this.tilePath = null;
}

// Création des levels 
Tileset.prototype.createTileset = function(lvl) {

	// Titre du niveau 
	$('h1').html('NIVEAU ' + levelSelected);

	for (var i = 0; i < lvl.length; i++) {

		this.x = (i % 9) * 40;
		this.y = Math.floor(i / 9) * 40;

		$("#tileset").append('<div id="tile' + i + '" class=tile></div>');
		$("#tile" + i).css("left", this.x);
		$("#tile" + i).css("top", this.y);

		switch(lvl[i]) {
			// Sol
			case " ":
				this.tilePath = "../assets/ground.png";
				break;
			// Mur
			case "#":
				this.tilePath = "../assets/wall.png";
				break;
			// Box 
			case "$": 
				var box = new Box();
				box.id = i;
				boxArray.push(box);
				// Création de l'image
				$('#tileset').append('<div id="box' + i + '" class="box"></div>');
				box.image = $('#box' + i);
				this.tilePath = "../assets/ground.png";
				// Position dans le tableau
				box.x = this.x;
				box.y = this.y;
				// Position de l'image 
				box.image.x = box.x;
				box.image.y = box.y;	
				this.tilePath = "../assets/ground.png";
				break;
			// Cible 
			case ".": 
				var target = new Target();
				target.id = i;
				targetArray.push(target);
				// Création de l'image
				$('#tileset').append('<div id="target' + i + '" class="target"></div>');
				target.image = $('#target' + i);
				this.tilePath = "../assets/ground.png";
				// Position dans le tableau
				target.x = this.x;
				target.y = this.y;
				// Position de l'image 
				target.image.x = target.x;
				target.image.y = target.y;
				this.tilePath = "../assets/ground.png";
				break;
			// Mur invisible
			case "-": 
				this.tilePath = "../assets/invisible.png";
				break;
			// Player
			case "@":  	
				player.id = i;
				// Position dans le tableau
				player.x = this.x;
				player.y = this.y;
				// Position de l'image 
				player.image.x = this.x;
				player.image.y = this.y;
				this.tilePath = "../assets/ground.png";
			break;
		}

		$("#tile" + i).css("background-image", "url('" + this.tilePath + "')");
	}
}
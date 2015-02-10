/* 
 * Convertit la map JSON en tableau javascript  
 */ 
function converse() {
	
	for (var i = 0; i < 9; i++) {
		for (var j = 0; j < 9; j++) {
			currentLevel.push(maps['levelDesign'][levelSelected - 1]["map"][i][j]);
		}
	}
}
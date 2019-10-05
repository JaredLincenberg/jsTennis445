$(document).ready(function() {
	// UNCOMMENT WHEN TURNING IN
	//update_scores();



	var testScore = 10;
	var gameArea = {
		canvas : document.getElementById('gameCanvas'),
		start : function() {
			this.canvas.height = 500;
			this.canvas.width = 500;
			this.context = this.canvas.getContext('2d')
			this.frameNumber = 0;
		},
		clear : function() {
			this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		}
	}
	initGame();

	gameArea.start();

	// UNCOMMENT WHEN TURNING IN
	//highscore(testScore);

});

function initGame() {
	displayCourt();
	drawLoop();
}
function displayCourt() {
	
}


function drawLoop(){

}


$(document).ready(function() {
	// UNCOMMENT WHEN TURNING IN
	//update_scores();
	var testScore = 10;
	var gameArea = {
		canvas : document.getElementById('gameCanvas'),
		start : function() {
			this.canvas.height = 650;
			this.canvas.width = 400;
			this.context = this.canvas.getContext('2d')
			this.frameNumber = 0;
		},
		clear : function() {
			this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		}
	}
	initGame(gameArea);

	gameArea.start();

	// UNCOMMENT WHEN TURNING IN
	//highscore(testScore);

});

function initGame(gameArea) {
	displayCourt(gameArea);
	drawLoop(gameArea);
}
function displayCourt(gameArea) {
	var gameCourt = new Image();
	//370
	//629
	gameCourt.onload = function () {
		var xCenteringPoint =(gameArea.canvas.width-gameCourt.width)/2;
		var yCenteringPoint = (gameArea.canvas.height-gameCourt.height)/2;
		gameArea.context.drawImage(gameCourt,xCenteringPoint,yCenteringPoint);
		console.log(gameArea.canvas.width);
	};
	gameCourt.src = "images/court.png"
}


function drawLoop(){

}


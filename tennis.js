
$(document).ready(function() {
	// UNCOMMENT WHEN TURNING IN
	//update_scores();
	var testScore = 10;
	var gameArea = {
		canvas : document.getElementById('gameCanvas'),
		start : function() {
			this.canvas.height = 370;
			this.canvas.width = 629;
			this.context = this.canvas.getContext('2d')
			this.frameNumber = 0;
		},
		clear : function() {
			this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		}
	}
	var tennisBall = {
		height: 25,
		width: 25,
		xPos: 400,
		yPos: 200,
		ball: new Image(),
		set source(file){
			this.ball.src = file;
		},
		draw : function () {
			tennisBall.ball.onload = function () {
				var can = tennisBall;
				gameArea.context.drawImage(this,can.xPos,can.yPos, can.width, can.height);
				console.log(this);
			}
		}
	}
	var playerRacket = {
		height: 50,
		width: 10,
		xPos: 100,
		yPos: 300,
		draw : function () {
			// gameArea.context.beginPath();
			gameArea.context.fillStyle = "#FF0000";
			gameArea.context.fillRect(this.xPos,this.yPos,this.xPos+this.width,this.yPos+this.height);
			//gameArea.context.stroke();
		}
	}
	initGame(gameArea);
	
	gameArea.start();
	tennisBall.source = "images/tennisBallTest.png";
	tennisBall.draw();
	playerRacket.draw();
	// UNCOMMENT WHEN TURNING IN
	//highscore(testScore);

});
	



function initGame(gameArea) {
	//displayCourt(gameArea);
	drawLoop(gameArea);
}



function drawLoop(){

}


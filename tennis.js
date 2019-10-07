
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
				gameArea.context.drawImage(this, can.xPos, can.yPos, can.width, can.height);
			}
		}
	}
	var playerRacket = {
		height: 50,
		width: 10,
		xPos: 40,
		yPos: 300,
		draw : function () {
			gameArea.context.fillStyle = "#FF0000";
			gameArea.context.fillRect(this.xPos, this.yPos, this.width, this.height);
		}
	}
	var computerRacket = {
		height: 50,
		width: 10,
		xPos: 590,
		yPos: 300,
		draw : function () {
			gameArea.context.fillStyle = "#FF0000";
			gameArea.context.fillRect(this.xPos,this.yPos,this.width,this.height);
		}
	}
	initGame();
	
	
	
	



	function initGame() {
		//displayCourt(gameArea);
		gameArea.start();
		gameArea.clear();
		tennisBall.source = "images/tennisBallTest.png";
		drawLoop();
	}



	function drawLoop(){
		tennisBall.draw();
		playerRacket.draw();
		computerRacket.draw();
	}





	// UNCOMMENT WHEN TURNING IN
	//highscore(testScore);

});
	






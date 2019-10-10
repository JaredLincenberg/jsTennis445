$(document).ready(function() {
	// UNCOMMENT WHEN TURNING IN
	//update_scores();
	document.addEventListener("keypress", keyEvent, false);
	window.setInterval(function(){
		drawLoop();
	  }, 16);

	var testScore = 10;
	var computerScore = 0;
	var playerScore = 0;
	var racketSpeed = 5;
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
		xSpeed: 3,
		ySpeed: 0,
		ball: new Image(),
		set source(file){
			this.ball.src = file;
		},
		draw : function () {
			gameArea.clear();
			gameArea.context.drawImage(this.ball, this.xPos, this.yPos);
		},
		updateBall: function() {
			if(this.xPos < 25) {
				if((this.yPos + this.height) >= playerRacket.yPos && this.xPos <= (playerRacket.yPos + playerRacket.height)){
					this.xSpeed *= -1;
				}
				computerScore++;
			}
			if(this.xPos > 580){
				this.xSpeed *= -1;
				playerScore++;
			}
			if(this.yPos > 358 || this.yPos < 12){
				this.ySpeed *= -1;
			}
			
			this.xPos += this.xSpeed;
			this.yPos += this.ySpeed;
		}
	}
	var playerRacket = {
		height: 50,
		width: 10,
		xPos: 20,
		yPos: 300,
		draw : function () {
			gameArea.context.fillStyle = "#FF0000";
			gameArea.context.fillRect(this.xPos, this.yPos, this.width, this.height);
		}
	}
	var computerRacket = {
		height: 50,
		width: 10,
		xPos: 602,
		yPos: 300,
		draw : function () {
			gameArea.context.fillStyle = "#FF0000";
			gameArea.context.fillRect(this.xPos,this.yPos,this.width,this.height);
			if(tennisBall.xSpeed > 0){
				this.yPos = tennisBall.yPos - this.height / 2 + tennisBall.height / 2;
			}
		}
	}
	initGame();
	
	


	function initGame() {
		//displayCourt(gameArea);
		gameArea.start();
		gameArea.clear();
		tennisBall.source = "images/ball.gif";
		drawLoop();
	}



	function drawLoop(){
		tennisBall.updateBall();
		tennisBall.draw();
		playerRacket.draw();
		computerRacket.draw();
	}


	function keyEvent(event) {
		switch(event.keyCode) {
			case 119:
				// w
				playerRacket.yPos-=racketSpeed;
				break;
			case 65:
				// a
				break;
			case 115:
				// s
				playerRacket.yPos+=racketSpeed;
				break;
			case 68:
				// d
				break;	
		}	
	}


	// UNCOMMENT WHEN TURNING IN
	//highscore(testScore);

});
	






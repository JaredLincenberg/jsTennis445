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
			this.context.font ="30px Arial";
			this.context.fillText(playerScore.toString(), 100, 100);
			this.context.fillText(computerScore.toString(), 500, 100);
		},
		clear : function() {
			this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		},
		drawText : function(text, x, y) {
			this.context.fillText(text, x, y);
		}
	}
	var tennisBall = {
		height: 25,
		width: 25,
		xPos: 400,
		yPos: 200,
		xDir: Math.random() * (4) - 2,
		yDir: Math.random() * (4) - 2,
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
				computerScore++;
				resetField();
			}
			if(this.xPos > 580){
				playerScore++;
				resetField();
			}
			if(this.yPos + this.height > 358 || this.yPos < 12){
				this.yDir *= -1;
			}
			if(this.yPos + this.height >= playerRacket.yPos && this.yPos <= playerRacket.yPos+playerRacket.height){
				if(this.xPos >= playerRacket.xPos && this.xPos <= playerRacket.xPos+playerRacket.width){
					this.xDir *= -1.1;
					this.yDir *= 1.1;
				}
			}

			if(this.yPos >= computerRacket.yPos && this.yPos <= computerRacket.yPos+computerRacket.height){
				if(this.xPos + this.width >= computerRacket.xPos && this.xPos + this.width <= computerRacket.xPos+computerRacket.width){
					this.xDir *= -1.1;
					this.yDir *= 1.1;
				}
			}

			this.xPos += this.xDir;
			this.yPos += this.yDir;
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
			if(tennisBall.yPos < this.yPos){
				this.yPos--;
			} else if(tennisBall.yPos > this.yPos){
				this.yPos++;
			}
			gameArea.context.fillRect(this.xPos,this.yPos,this.width,this.height);
		}
	}
	initGame();
	
	


	function initGame() {
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
		gameArea.drawText(playerScore.toString(), 5, 40);
		gameArea.drawText(computerScore.toString(), 610, 40);
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

	function resetField() {
		gameArea.clear();
		
		tennisBall.xPos = 400;
		tennisBall.yPos = 200;
		tennisBall.xDir = Math.random() * (4) - 2;
		tennisBall.yDir = Math.random() * (4) - 2;
	}

	// UNCOMMENT WHEN TURNING IN
	//highscore(testScore);

});
	
$(document).ready(function() {
	// UNCOMMENT WHEN TURNING IN
	
	document.addEventListener("keypress", keyEvent, false);
	document.getElementById("canvasstart").addEventListener("click",() => startNewGame());
	

	var testScore = 10;
	var computerScore = 0;
	var playerScore = 0;
	var racketSpeed = 7;
	var hasReported = false;
	var gameArea = {
		canvas : document.getElementById('gameCanvas'),
		start : function() {
			computerScore = 0;
			playerScore = 0;
			this.canvas.height = 370;
			this.canvas.width = 629;
			this.context = this.canvas.getContext('2d')
			this.frameNumber = 0;
			this.context.font ="30px Arial";
			// this.context.fillText("You", 100, 100);
			// this.context.fillText("Computer", 500, 100);
		},
		clear : function() {
			this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		},
		drawText : function() {
			$("p.canvaslive").html("Lives: " + (3-computerScore));
			$("p.canvasscore").html("Score: " + playerScore);
		},
		drawCanvasText : function() {
			this.context.font ="20px Arial";
			this.context.fillText("You", 0, 30);
			this.context.fillText("Computer", 540, 30);
		}
	}
	var tennisBall = {
		height: 25,
		width: 25,
		xPos: 300,
		yPos: 200,
		xySpeed: 2,
		xDir: -2,
		yDir: 0.1,
		maxThetaUp: 0,
		maxThetaDown: 0,
		adjTheta: 0,
		ball: new Image(),
		set source(file){
			this.ball.src = file;
		},
		resetBall : function () {
			this.height = 25;
			this.width = 25;
			this.xPos = 300;
			this.yPos = 200;
			this.xySpeed = 2;
			this.xDir = -2;
			this.yDir = 0.1;
			this.maxThetaUp = 0;
			this.maxThetaDown = 0;
			this.adjTheta = 0;
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
			if(this.xPos > 602){
				resetField();
			}
			if(this.yPos + this.height > 358 || this.yPos < 12){
				this.yDir *= -1;
			}
			if(this.yPos + this.height >= playerRacket.yPos && this.yPos <= playerRacket.yPos+playerRacket.height){
				if(this.xPos >= playerRacket.xPos && this.xPos <= playerRacket.xPos+playerRacket.width){
					// the ball moves down
					if(Math.random() >= 0.5){
						this.maxThetaDown = (338 - this.yPos) / 583;
						this.adjTheta = this.maxThetaDown * Math.random();
						this.yDir = Math.sin(this.adjTheta) * this.xySpeed;
						this.xDir = Math.cos(this.adjTheta) * this.xySpeed;					
					}
					// the ball moves up
					else{
						this.maxThetaUp = (this.yPos - 49) / 583;
						this.adjTheta = this.maxThetaUp * Math.random();
						this.yDir = -1 * Math.sin(this.adjTheta) * this.xySpeed;
						this.xDir = Math.cos(this.adjTheta) * this.xySpeed;	
					}
					
					/* update computer racket speed based on ball angle and position*/		
					hypotenuse = (602 - this.xPos) / Math.cos(this.adjTheta);
					timeToReach = hypotenuse / this.xySpeed;
					// the ball is moving down
					if(this.yDir > 0){
						ballLandingY = Math.tan(this.adjTheta) * (602 - this.xPos) + this.yPos;
					}
					// the ball moving up
					else{
						ballLandingY = this.yPos - Math.tan(this.adjTheta) * (602 - this.xPos);
					}
					// paddle is on the left
					if(computerRacket.yPos - ballLandingY > 0){
						targetDistance = Math.abs(computerRacket.yPos - ballLandingY);
						computerRacket.adjSpeed = (-1) * targetDistance / timeToReach;	
					}
					// paddle is on the right
					else{
						targetDistance = Math.abs(computerRacket.yPos - ballLandingY + computerRacket.height/2);
						computerRacket.adjSpeed = targetDistance / timeToReach;	
					}
					
					// speeds up
					this.xySpeed += 0.3;	
					console.log(this.xySpeed);
					
				}
				
			}

			if(this.yPos + this.height >= computerRacket.yPos && this.yPos <= computerRacket.yPos + computerRacket.height){
				if(this.xPos + this.width >= computerRacket.xPos && this.xPos + this.width <= computerRacket.xPos + computerRacket.width){
					// the ball moves down
					if(Math.random() >= 0.5){
						this.maxThetaDown = (338 - this.yPos) / 583;
						adjTheta = this.maxThetaDown * Math.random();
						this.yDir = Math.sin(adjTheta) * this.xySpeed;
						this.xDir = -1 * Math.cos(adjTheta) * this.xySpeed;					
					}
					// the ball moves up
					else{
						this.maxThetaUp = (this.yPos - 49) / 583;
						adjTheta = this.maxThetaUp * Math.random();
						this.yDir = -1 * Math.sin(adjTheta) * this.xySpeed;
						this.xDir = -1 * Math.cos(adjTheta) * this.xySpeed;	
					}
					playerScore++;
				}
			}
			this.xPos += this.xDir;
			this.yPos += this.yDir;
		}
	}
	var playerRacket = {
		height: 70,
		width: 40,
		xPos: 0,
		yPos: 300,
		racket: new Image(),
		set source(file){
			this.racket.src = file;
		},
		draw : function () {
			gameArea.context.drawImage(this.racket, this.xPos, this.yPos, this.width, this.height);
		}
	}
	var computerRacket = {
		height: 70,
		width: 40,
		xPos: 580,
		yPos: 300,
		adjSpeed: 0,
		racket: new Image(),
		set source(file){
			this.racket.src = file;
		},
		draw : function () {
			gameArea.context.fillStyle = "#FF0000";
			
			if(tennisBall.xDir > 0 && this.yPos > 0 && this.yPos < 370 ){
				this.yPos += this.adjSpeed;
			}					
			gameArea.context.drawImage(this.racket, this.xPos, this.yPos, this.width, this.height);
		}
	}
	initGame();

	function initGame() {

		gameArea.start();
		// gameArea.drawText();
		// gameArea.drawCanvasText();
		tennisBall.source = "images/ball.gif";
		playerRacket.source = "images/playerracket.png";
		computerRacket.source = "images/computerracket.png";
		// startNewGame();
		
	}
	function startNewGame() {
		update_scores();
		hasReported = false;
		gameArea.start();
		gameArea.clear();
		console.log("start");
		// drawLoop();
		runGame();
		
	}
	function runGame() {
		window.setTimeout(()=>window.setInterval(function(){
			drawLoop();
	  	}, 16),1000);
	}
	function lose(){
		if(computerScore >= 3){
			
			return true;
		}
		else{
			return false;
		}
	}
	
	function printGameOver(){
		gameArea.context.font ="50px Arial";
		gameArea.context.fillText("Game Over", 180, 200);
		if (!hasReported) {
			hasReported = true;
			highscore(playerScorer);
			
		}
	}
	
	function drawLoop(){
		if(!lose()){			
			tennisBall.updateBall();
			tennisBall.draw();
			playerRacket.draw();
			computerRacket.draw();		
			gameArea.drawText();
			// gameArea.drawCanvasText();
		}
		else{
			printGameOver();
		}
	}

	function keyEvent(event) {
		switch(event.keyCode) {
			case 119:
				// w
				if(playerRacket.yPos > 0){
					playerRacket.yPos-=racketSpeed;
				}
				break;
			case 65:
				// a
				break;
			case 115:
				// s
				if(playerRacket.yPos + playerRacket.height < 370){
					playerRacket.yPos+=racketSpeed;
				}
				break;
			case 68:
				// d
				break;	
		}	
	}

	function resetField() {
		gameArea.clear();
		
		tennisBall.resetBall();
		tennisBall.xPos = 400;
		tennisBall.yPos = 200;
		tennisBall.xDir = -3;
		tennisBall.yDir = 0.1;
	}

	// UNCOMMENT WHEN TURNING IN
	//

});
	
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var raccoonImg = document.getElementById("raccoon");
var raccoon = new Raccoon();

function startRaccoon() {
  setInterval(animate, 50); //adjust timing w/ this
}

function animate () {
  clearBackground();
  raccoon.move();
  raccoon.draw();
}

function clearBackground() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

document.addEventListener("keydown", handleKeyDown, true);
document.addEventListener("keyup", handleKeyUp, true);

function handleKeyDown(event) {
  if(event.key == 'w') {
	if(!raccoon.movingUp)
		raccoon.goUp();
  }
  else if(event.key == 's') {
	if(!raccoon.movingDown)
		raccoon.goDown();
  }
  else if(event.key == 'a') {
	if(!raccoon.movingLeft)
		raccoon.goLeft();
  }
  else if(event.key == 'd') {
	if(!raccoon.movingRight)
		raccoon.goRight();
  }
}

function handleKeyUp(event) {
  if(event.key == 'w') {
	raccoon.movingUp = false;
  }
  else if(event.key == 's') {
	raccoon.movingDown = false;
  }
  else if(event.key == 'a') {
	raccoon.movingLeft = false;
  }
  else if(event.key == 'd') {
	raccoon.movingRight = false;
  }
}



function Raccoon() {
  this.x = 100;
  this.y = 100;

  this.speed = 5;

  this.movingLeft = false;
	this.movingRight = false;
	this.movingUp = false;
	this.movingDown = false;

  this.goLeft = function() {
		this.stopAll();
		this.movingLeft = true;
		//this.currentSpriteSheet = this.leftSpriteSheet;
		//this.currImage = 0;
	}

	this.goRight = function() {
		this.stopAll();
		this.movingRight = true;
		//this.currentSpriteSheet = this.rightSpriteSheet;
		//this.currImage = 0;
	}

	this.goUp = function() {
		this.stopAll();
		this.movingUp = true;
		//this.currentSpriteSheet = this.upSpriteSheet;
		//this.currImage = 0;
	}

	this.goDown = function() {
		this.stopAll();
		this.movingDown = true;
		//this.currentSpriteSheet = this.downSpriteSheet;
		//this.currImage = 0;
	}

	this.stopAll = function() {
		this.movingUp = false;
		this.movingDown = false;
		this.movingLeft = false;
		this.movingRight = false;
	}

	this.move = function() {
		if(this.movingUp) {
			this.y -= this.speed;
		}
		else if(this.movingDown) {
			this.y += this.speed;
		}
		else if(this.movingLeft) {
			this.x -= this.speed;
		}
		else if(this.movingRight) {
			this.x += this.speed;
		}
	}

	this.draw = function() {
    /*
		var ssX = 0, ssY = 0;

		if(this.movingRight) {
			ssX = this.currImage*this.imageWidth;
		}
		else if(this.movingLeft) {
			ssX = this.leftSpriteSheet.width - (this.currImage + 1)*this.imageWidth;
		}
		else if(this.movingUp) {
			ssY = this.upSpriteSheet.height - (this.currImage + 1)*this.imageHeight;
		}
		else if(this.movingDown) {
			ssY = this.currImage*this.imageHeight;
		}

		context.drawImage( this.currentSpriteSheet,
						ssX , ssY, this.imageWidth, this.imageHeight,
						this.x, this.y, this.imageWidth, this.imageHeight );
		this.currImage++;
		this.currImage %= this.numbImages;
    */

    ctx.drawImage(raccoonImg, this.x, this.y);
  }


}

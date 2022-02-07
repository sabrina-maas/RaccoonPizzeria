var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

/*var testThing = new InteractableObject("test", 40, 40, 100, 100);

var walls = [];
walls.push(testThing);

var raccoonImg = new Image();
raccoonImg.src = "images/raccoonV1.png";
var raccoon = new Raccoon();


raccoonImg.onload = function () {
  setInterval(animate, 50);
}



function animate () {
  clearBackground();
  raccoon.move();
  raccoon.draw();

  testThing.draw();
}*/


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

function detectCollision(obj1, obj2) {
	var a = obj1.x < obj2.x + obj2.width;
	var b = obj1.x + obj1.width > obj2.x;
	var c = obj1.y < obj2.y + obj2.height;
	var d = obj1.y + obj1.height > obj2.y;

	console.log(`X ${a} ${b} ${c} ${d}`);

	/*return (	obj1.x < obj2.x + obj2.width &&
				obj1.x + obj1.width > obj2.x &&
			  obj1.y < obj2.y + obj2.height &&
			  obj1.y + obj1.height > obj2.y );*/
	
	if (raccoon.movingDown) { alert("test: " + a + b + c + d); alert (obj1.x + obj1.width); alert(obj1.x);alert(obj1.y);}
		
}

class Raccoon {

	constructor() {
		this.x = 200;
		this.y = 200;

		this.speed = 5;

		this.movingLeft = false;
		this.movingRight = false;
		this.movingUp = false;
		this.movingDown = false;
	}
	
	

	goLeft() {
		this.stopAll();
		this.movingLeft = true;
		//this.currentSpriteSheet = this.leftSpriteSheet;
		//this.currImage = 0;
	}

	goRight = function() {
		this.stopAll();
		this.movingRight = true;
		//this.currentSpriteSheet = this.rightSpriteSheet;
		//this.currImage = 0;
	}

	goUp = function() {
		this.stopAll();
		this.movingUp = true;
		//this.currentSpriteSheet = this.upSpriteSheet;
		//this.currImage = 0;
	}

	goDown = function() {
		this.stopAll();
		this.movingDown = true;
		//this.currentSpriteSheet = this.downSpriteSheet;
		//this.currImage = 0;
	}

	stopAll = function() {
		this.movingUp = false;
		this.movingDown = false;
		this.movingLeft = false;
		this.movingRight = false;
	}

	move = function() {
		if(this.movingUp) {
			this.y -= this.speed;
			//add sprite sheet logic to each of these
		}
		if(this.movingDown) {
			this.y += this.speed;
		}
		if(this.movingLeft) {
			this.x -= this.speed;
		}
		if(this.movingRight) {
			this.x += this.speed;
		}
		//collision detection logic
		this.collisionAboutToHappen = false;

	  	//check each wall for a collision with the thing
	  	/*for(var p in walls) {
			if(detectCollision(walls[p], this)) {
				collisionAboutToHappen = true;
			}*/
		for(var currWall = 0; currWall < walls.length; currWall++) {
			this.collisionAboutToHappen = detectCollision(this, walls[currWall]);
			if (this.collisionAboutToHappen)
				alert("collision detected");
		}

		//if necessary, undo the motion
		if(this.collisionAboutToHappen) {
			if(this.moveRight) this.x -= this.speed;
			if(this.moveLeft) this.x += this.speed;
			if(this.moveDown) this.y -= this.speed;
			if(this.moveUp) this.y += this.speed;
	  	}

	  }
	

	draw = function() {
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

class InteractableObject {

	constructor(type, x, y, width, height) {

		this.type = type;
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;

	}

    

	draw = function() {
		if (type == "test") {
			ctx.fillStyle = "blue";
			ctx.fillRect(this.x, this.y, this.width, this.height);
		}
	}
  }

//var testThing = new InteractableObject("test", 40, 40, 100, 100);

var walls = [];
//walls.push(testThing);

var raccoonImg = new Image();
raccoonImg.src = "images/raccoonV1.png";
var raccoon = new Raccoon();

raccoonImg.onload = function () {
	setInterval(animate, 50);
}
  
  
  
function animate () {
	clearBackground();
	raccoon.move();
	raccoon.draw();
  
	//testThing.draw();
}
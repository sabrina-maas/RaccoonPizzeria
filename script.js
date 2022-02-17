var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var raccoonImg = new Image();
raccoonImg.src = "images/raccoonV1.png";

var refrigeratorImg = new Image();
refrigeratorImg.src = "images/tempRefrigerator.jpg";

var tomatoImg = new Image();
tomatoImg.src = "images/tempTomato.jpg";
//var refrigeratorMenuBackground = new Image();
//refrigeratorMenuBackground.src = 


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

document.addEventListener("click", handleClick, true);

function handleClick(event) {
	this.clickX = event.pageX;
	this.clickY = event.pageY;

	for(var pos = 0; pos < clickables.length; pos++) {
		if( this.clickX < clickables[pos].x + clickables[pos].width &&
			this.clickX > clickables[pos].x &&
			this.clickY < clickables[pos].y + clickables[pos].height &&
			this.clickY > clickables[pos].y) {
				clickables[pos].click();
		} 
	}			
}

function detectCollision(obj1, obj2) {

	return ( obj1.x < obj2.x + obj2.width &&
				obj1.x + obj1.width > obj2.x &&
			  obj1.y < obj2.y + obj2.height &&
			  obj1.y + obj1.height > obj2.y );

	}

class Ingredient {
	constructor (name, img, num) {
		this.name = name;
		this.img = img;
		this.num = num;
	}

	changeNum = function (quantity) {
		this.num += quantity;
	}
}

var wheat = new Ingredient("wheat", tomatoImg, 0);
var dough = new Ingredient("dough", tomatoImg, 0);
var tomato = new Ingredient("tomato", tomatoImg, 0);
var sauce = new Ingredient("sauce", tomatoImg, 0);
var milk = new Ingredient("milk", tomatoImg, 0);
var cheese = new Ingredient("cheese", tomatoImg, 0);

var ingredients = [];
ingredients.push(wheat, dough, tomato, sauce, milk, cheese);

class Raccoon {

	constructor() {
		this.x = 200;
		this.y = 200;

		this.width = 100;
		this.height = 100;

		this.speed = 5;

		this.movingLeft = false;
		this.movingRight = false;
		this.movingUp = false;
		this.movingDown = false;
	}
	
	goLeft = function() {
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
			if(this.collisionAboutToHappen) break;
		}

		//if necessary, undo the motion
		if(this.collisionAboutToHappen) {
			if(this.movingRight) this.x -= this.speed;
			if(this.movingLeft) this.x += this.speed;
			if(this.movingDown) this.y -= this.speed;
			if(this.movingUp) this.y += this.speed;
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

class Wall {
	constructor(x, y, width, height) {

		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;

	}

	//will not call this function in final product, only present for developing
	draw = function() {

		ctx.fillStyle = "blue";
		ctx.fillRect(this.x, this.y, this.width, this.height);
		
	}
  }

//   class Appliance  {
// 		constructor(x, y, width, height) {

// 			this.x = x;
// 			this.y = y;
// 			this.width = width;
// 			this.height = height;

// 		}

		// draw = function () {

		// 	ctx.drawImage(this.img, this.x, this.y, this.width, this.height);

		// }

//   }
  class Refrigerator {
	  constructor(x, y, width, height) {

			this.x = x;
			this.y = y;
			this.width = width;
			this.height = height;
			this.name = refrigerator;

			this.menuOpen = false;
			
	  }

	  draw = function () {

		ctx.drawImage(refrigeratorImg, this.x, this.y, this.width, this.height);

	}

	  drawMenu = function() {
		  if(this.menuOpen) {
			//ctx.drawImage(refrigeratorMenuBackground, 100, 100, 500, 500);
			ctx.fillStyle = "grey";
			ctx.fillRect(300, 50, 400, 400);

			this.numColumns = 4;
			this.imgSpacingX = 100;
			this.imgSpacingY = 100;
			this.currImg = 0;
			this.currRow = 0;
			for(var pos = 0; pos < ingredients.length; pos++) {
				ctx.drawImage(ingredients[pos].img, 310 + (this.imgSpacingX*this.currImg), 60 + (this.imgSpacingY*this.currRow), 50, 50);

				ctx.fillStyle = "white";
				ctx.font = '12px serif';
				ctx.textAlign = "center";
				ctx.fillText(ingredients[pos].name, 310 + (this.imgSpacingX*this.currImg) + 25, 60 + (this.imgSpacingY*this.currRow) + 60);
				ctx.fillText(ingredients[pos].num, 310 + (this.imgSpacingX*this.currImg) + 25, 60 + (this.imgSpacingY*this.currRow) + 75);

				this.currImg++;
				if(this.currImg == this.numColumns) {
					this.currImg = 0;
					this.currRow++;
				}					
			}	
		  }
	  }
	  
	  click = function () {
		  if(this.menuOpen) { this.menuOpen = false; }
		  else { this.menuOpen = true; }
	  }
  }


//walls
var leftBound = new Wall(0, 0, 10, canvas.height);
var topBound = new Wall(0, 0, canvas.width, 10);
var rightBound = new Wall(canvas.width - 10, 0, 10, canvas.height);
var bottomBound = new Wall(0, canvas.height - 10, canvas.width, 10);
var centerTopBound = new Wall(canvas.width/2 - 5, 0, 10, canvas.height/2);

//appliances
var refrigerator = new Refrigerator(100, 20, 80, 180);

var walls = [];
walls.push(leftBound, rightBound, topBound, bottomBound); //perimeter
walls.push(centerTopBound); //interior walls
walls.push(refrigerator); //interior objects

var clickables = [];
clickables.push(refrigerator);

var menus = [];
menus.push(refrigerator);


var raccoon = new Raccoon();

raccoonImg.onload = function () {
	setInterval(animate, 50);
}
  
  
function animate () {

	clearBackground();
	raccoon.move();
	raccoon.draw();

	for (var w in walls)
		walls[w].draw();

	for(var m in menus)
		menus[m].drawMenu();

}
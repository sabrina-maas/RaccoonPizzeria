var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var raccoonImg = new Image();
raccoonImg.src = "images/raccoonV1.png";

var refrigeratorImg = new Image();
refrigeratorImg.src = "images/tempRefrigerator.jpg";

var pizzaOvenImg0 = new Image();
pizzaOvenImg0.src = "images/tempPizzaOven0.jpg";
var pizzaOvenImg1 = new Image();
pizzaOvenImg1.src = "images/tempPizzaOven1.jpg";

var stoveImg0 = new Image();
stoveImg0.src = "images/tempStove0.jpg";
var stoveImg1 = new Image();
stoveImg1.src = "images/tempStove1.jpg";

var cheesePressImg0 = new Image();
cheesePressImg0.src = "images/cheesePressImg0.png";
var cheesePressImg1 = new Image();
cheesePressImg1.src = "images/cheesePressImg1.png";

var mixerImg0 = new Image();
mixerImg0.src = "images/mixerImg0.png";
var mixerImg1 = new Image();
mixerImg1.src = "images/mixerImg1.png";


var forwardCowImg = new Image();
forwardCowImg.src = "images/cowRight.png";
var backwardCowImg = new Image();
backwardCowImg.src = "images/cowLeft.png";

var tomatoImg = new Image();
tomatoImg.src = "images/tempTomato.jpg";
//var refrigeratorMenuBackground = new Image();
//refrigeratorMenuBackground.src =

var tomatoPlantImg0 = new Image();
tomatoPlantImg0.src = "images/tempTomatoPlant0.jpg";
var tomatoPlantImg1 = new Image();
tomatoPlantImg1.src = "images/tempTomatoPlant1.jpg";

var wheatPlantImg0 = new Image();
wheatPlantImg0.src = "images/wheatPlantImg0.jpg";
var wheatPlantImg1 = new Image();
wheatPlantImg1.src = "images/wheatPlantImg1.jpg";

var cheesePizzaImg = new Image();
cheesePizzaImg.src = "images/cheesePizza.jpg";

function clearBackground() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}


document.addEventListener("keydown", handleKeyDown, true);
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

  else if(event.key == 'Escape') {
	for(var m in menus)
		menus[m].menuOpen = false;
  }
}

document.addEventListener("keyup", handleKeyUp, true);
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

  if(pizzaOven.menuOpen) {
	  pizzaOven.pizzaNum(event.key);
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

var wheat = new Ingredient("wheat", tomatoImg, 1);
var dough = new Ingredient("dough", tomatoImg, 0);
var tomato = new Ingredient("tomato", tomatoImg, 0);
var sauce = new Ingredient("sauce", tomatoImg, 0);
var milk = new Ingredient("milk", tomatoImg, 0);
var cheese = new Ingredient("cheese", tomatoImg, 0);
var peperoni = new Ingredient("peperoni", tomatoImg, 0);
var ham = new Ingredient("ham", tomatoImg, 0);
var olive = new Ingredient("olive", tomatoImg, 0);
var pineapple = new Ingredient("pineapple", tomatoImg, 0); //replace images with the correct ones later

var ingredients = [wheat, dough, tomato, sauce, milk, cheese,peperoni, ham, olive, pineapple];
var pizzaIngredients = [dough, sauce, cheese, peperoni, ham, olive, pineapple];

class Plant {
	constructor(name, img0, img1, canHarvest, num) {
		this.name = name;
		this.img0 = img0;
		this.img1 = img1;
		this.x = 0;
		this.y = 0;
		this.width = 50;
		this.height = 50;
		this.canHarvest = canHarvest;
		this.num = num;
	}

	click = function() {
		if(this.canHarvest) {
			for(var pos = 0; pos < ingredients.length; pos++) {
				if(ingredients[pos].name == this.name) {
					ingredients[pos].changeNum(1);
					alert("one " + ingredients[pos].name + " added to refrigerator");
				}
			}
			this.canHarvest = false;
		}
		else {
			//display message
			alert("nothing to harvest");
		}
	}
}

class Garden {
	constructor() {
		this.numWheat = 1;
		this.numTomatoes = 1;
		//add other plants
	}
	draw = function() {
		ctx.fillStyle = "brown";
		ctx.fillRect(600, 300, 400, 300);

		this.numColumns = 4;
		this.plantSpacingX = 100;
		this.plantSpacingY = 100;
		this.currPlant = 0;
		this.currRow = 0;

		for(var pos = 0; pos < plants.length; pos++) {
			plants[pos].x = 610 + (this.plantSpacingX*this.currPlant);
			plants[pos].y = 310 + (this.plantSpacingY*this.currRow);

			if(plants[pos].canHarvest) {
				ctx.drawImage(plants[pos].img1, plants[pos].x, plants[pos].y, plants[pos].width, plants[pos].height);
			}
			else {
				ctx.drawImage(plants[pos].img0, plants[pos].x, plants[pos].y, plants[pos].width, plants[pos].height);
			}

			this.currImg++;
			if(this.currImg == this.numColumns) {
				this.currImg = 0;
				this.currRow++;
			}
		}
	}
}

class Cow {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.vx = 1;
		this.vy = .5;
		this.width = 80;
		this.height = 80;

		this.canMilk = true;
		this.milkCooldown = 60000;

		//super important edits
	}

	move = function() {
		// ctx.beginPath();
		// ctx.stroke();

		this.x += this.vx;
		if (this.x + this.width >= pasture.x + pasture.width || this.x <= pasture.x) {
			this.vx = -this.vx;
		}

		if (this.vx <= 0) {
			ctx.drawImage(forwardCowImg, this.x, this.y, this.width, this.height);
		}
		else {
			ctx.drawImage(backwardCowImg, this.x, this.y, this.width, this.height);
		}

		this.y += this.vy;
		if (this.y + this.height >= pasture.y + pasture.height || this.y <= pasture.y) {
		  this.vy = -this.vy;

		}
	}

	click = function() {
		if(this.canMilk) {
			milk.changeNum(1);
			this.canMilk = false;
			var self = this;
				this.timer = setTimeout(function() {
					self.canMilk = true;
					}, this.milkCooldown);
			alert("one milk added to refrigerator");
		}
		else {
			alert("this cow does not have any milk right now");
		}
	}
}

var cow1 = new Cow(550, 50);
var cow2 = new Cow(canvas.width / 7, canvas.width / 2);
var cow3 = new Cow(canvas.width / 2, canvas.width / 5);
var cow4 = new Cow(canvas.width / 3, canvas.width / 4);

var cows = [cow1]; //add other cows to cow array as cows purchased in game

class Pasture {
	constructor() {
		this.x = 500;
		this.y = 10;
		this.width = 500;
		this.height = 200;
	}

	draw = function() {
		ctx.fillStyle = "green";
		ctx.fillRect(this.x, this.y, this.width, this.height);

		for(var pos = 0; pos < cows.length; pos++) {
			cows[pos].move();
		}
	}
}

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

  class Refrigerator {
	  constructor() {
			this.name = "refrigerator";
			this.x = 100;
			this.y = 20;
			this.width = 80;
			this.height = 180;

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

class Appliance {
	constructor(name, img0, img1, x, y, width, height, ingredient, product) {
		this.name = name;
		this.img0 = img0; //images: one for inactive, 1 for working
		this.img1 = img1;
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.state = 0;
		this.ingredient = ingredient;
		this.product = product;
	}

	draw = function() {
		if(this.state == 0) {
			ctx.drawImage(this.img0, this.x, this.y, this.width, this.height);
		}
		else if (this.state == 1) {
			ctx.drawImage(this.img1, this.x, this.y, this.width, this.height);
		}
		else if (this.state == 2) {
			ctx.drawImage(this.img0, this.x, this.y, this.width, this.height);
			//also draw thing above that indicates that it is ready to be collected (box for now)
			ctx.fillStyle = "blue";
			ctx.fillRect(this.x, this.y, 10, 10);
		}
	}

	click = function () {
		if(this.state == 0) {
			if(this.ingredient.num > 0) {
				this.ingredient.changeNum(-1);
				this.state = 1;
				var self = this;
				this.timer = setTimeout(function() {
					self.state = 2;
					}, 4000);
			}
			else {
				alert("not enough " + this.ingredient.name + " :(");
			}
		} else if(this.state == 2) {
			this.state = 0;
			this.product.changeNum(1);
			alert("one " + this.product.name + " added to refrigerator");
		}
	}
}

class PizzaOven {
	constructor() {
		this.x = 350;
		this.y = 375;
		this.width = 100;
		this.height = 100;
		this.state = 0;
		this.menuOpen = false;

		this.selectedPizza = -1;
	}

	draw = function() {
		if(this.state == 0) {
			ctx.drawImage(pizzaOvenImg0, this.x, this.y, this.width, this.height);
		}

	}

	drawMenu = function() {
		for(var pos = 0; pos < pizzas.length; pos++) pizzas[pos].go();

		if(this.menuOpen) {
			ctx.fillStyle = "grey";
			ctx.fillRect(200, 50, 600, 400);

			this.numColumns = 2;
			this.imgSpacingX = 80;
			this.imgSpacingY = 80;
			this.currImg = 0;
			this.currRow = 0;
			for(var pos = 0; pos < pizzaIngredients.length; pos++) {
				ctx.drawImage(pizzaIngredients[pos].img, 210 + (this.imgSpacingX*this.currImg), 60 + (this.imgSpacingY*this.currRow), 50, 50);

				ctx.fillStyle = "white";
				ctx.font = '12px serif';
				ctx.textAlign = "center";
				ctx.fillText(pizzaIngredients[pos].name, 210 + (this.imgSpacingX*this.currImg) + 25, 60 + (this.imgSpacingY*this.currRow) + 60);
				ctx.fillText(pizzaIngredients[pos].num, 210 + (this.imgSpacingX*this.currImg) + 25, 60 + (this.imgSpacingY*this.currRow) + 75);

				this.currImg++;
				if(this.currImg == this.numColumns) {
					this.currImg = 0;
					this.currRow++;
				}
			}
		}
	}

	click = function() {
		if(this.state == 0) this.menuOpen = true;
		//if(this.state == 2)
	}

	pizzaNum = function(keyInput) {

	}
}

class Pizza {
	constructor(name, image, value) {
		this.name = name;
		this.image = image;
		this.value = value;

		this.canMake = false;

		this.ingredients = [];
		if(this.name = "cheese pizza") {
			this.ingredients.push(dough, sauce, cheese);
		}
    else if(this.name = "peperoni pizza") {
      this.ingredients.push(dough, sauce, cheese, peperoni);
    }
    else if(this.name = "olive pizza") {
      this.ingredients.push(dough, sauce, cheese, pizza,olive);
    }
    else if(this.name = "hawaiian pizza") {
      this.ingredients.push(dough, sauce, cheese, ham, pineapple);
    }
	}

	go = function() {
		for (var pos = 0; pos < this.ingredients.length; pos++) {
			if(ingredients[pos].num < 1)
				this.canMake = false;
		}
	}

}

var cheesePizza = new Pizza("cheese pizza", cheesePizzaImg, 7);
var peperoniPizza = new Pizza("peperoni pizza", cheesePizzaImg, 7);
var olivePizza = new Pizza("olive pizza", cheesePizzaImg, 7);
var hawaiianPizza = new Pizza("hawaiian pizza", cheesePizzaImg, 7);
var pizzas = [cheesePizza,peperoniPizza,olivePizza,hawaiianPizza];


//walls
var leftBound = new Wall(0, 0, 10, canvas.height);
var topBound = new Wall(0, 0, canvas.width, 10);
var rightBound = new Wall(canvas.width - 10, 0, 10, canvas.height);
var bottomBound = new Wall(0, canvas.height - 10, canvas.width, 10);
var centerTopBound = new Wall(canvas.width/2 - 5, 0, 10, canvas.height/2);

//farm/garden
var pasture = new Pasture();
var garden = new Garden();
var wheatPlant = new Plant("wheat", wheatPlantImg0,wheatPlantImg1, true, 1);
var tomatoPlant = new Plant("tomato", tomatoPlantImg0, tomatoPlantImg1, true, 3);
  //add all other possible plants, set num to zero


var plants = [];
plants.push(tomatoPlant,wheatPlant);



//appliances
var refrigerator = new Refrigerator();
var pizzaOven = new PizzaOven();
var mixer = new Appliance("mixer", mixerImg0, mixerImg1, 200, 360, 80, 120, wheat, dough);
var stove = new Appliance("stove", stoveImg0, stoveImg1, 180, 50, 80, 150, tomato, sauce);
var cheesePress = new Appliance("cheese press", cheesePressImg0, cheesePressImg1, 30, 345, 120, 150, milk, cheese);

var walls = [];
walls.push(leftBound, rightBound, topBound, bottomBound); //perimeter
walls.push(centerTopBound); //interior walls
walls.push(refrigerator, pizzaOven, stove,cheesePress,mixer); //interior objects

var clickables = [];
clickables.push(refrigerator, pizzaOven, stove, cheesePress,mixer);
clickables.push(tomatoPlant);
for (var pos = 0; pos < cows.length; pos++) clickables.push(cows[pos]);

var menus = [];
menus.push(refrigerator, pizzaOven);


var raccoon = new Raccoon();

raccoonImg.onload = function () {
	setInterval(animate, 50);
}


function animate () {

	clearBackground();

	pasture.draw();
	garden.draw();

	raccoon.move();
	raccoon.draw();

	for (var w in walls)
		walls[w].draw();

	for (var m in menus)
		menus[m].drawMenu();

}

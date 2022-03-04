var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var raccoonLeftImg = new Image();
raccoonLeftImg.src = "images/raccoonLeft.png";
var raccoonRightImg = new Image();
raccoonRightImg.src = "images/raccoonRight.png";
var raccoonLeftAImg = new Image();
raccoonLeftAImg.src = "images/raccoonLeftA.png";
var raccoonLeftBImg = new Image();
raccoonLeftBImg.src = "images/raccoonLeftB.png";
var raccoonRightAImg = new Image();
raccoonRightAImg.src = "images/raccoonRightA.png";
var raccoonRightBImg = new Image();
raccoonRightBImg.src = "images/raccoonRightB.png";

var ghostRaccoonImg = new Image();
ghostRaccoonImg.src = "images/ghostRaccoon.jpg";

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

var pineapplePlantImg0 = new Image();
pineapplePlantImg0.src = "images/pineapplePlant0.jpg";
var pineapplePlantImg1 = new Image();
pineapplePlantImg1.src ="images/pineapplePlant1.jpg";

var cheesePizzaImg = new Image();
cheesePizzaImg.src = "images/cheesePizza.jpg";
var pepperoniPizzaImg = new Image();
pepperoniPizzaImg.src = "images/pepperoniPizza.png";
var olivePizzaImg = new Image();
olivePizzaImg.src = "images/olivePizza.jpg";
var hawaiianPizzaImg = new Image();
hawaiianPizzaImg.src = "images/hawaiianPizza.jpg";
var everythingPizzaImg = new Image();
everythingPizzaImg.src = "images/everythingPizza.jpg";

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
			pizzeria.menuOpen = false;
	}

	else if(event.key == 'ArrowRight')
		if(pizzeria.objectiveMet)
			pizzeria.nextDay();

	if(pizzaOven.menuOpen) {
		if(event.key == '1')
			pizzaOven.select(pizzas[0]);  
		if(event.key == '2')
			pizzaOven.select(pizzas[1]);
		if(event.key == '3')
			pizzaOven.select(pizzas[2]);
		if(event.key == '4')
			pizzaOven.select(pizzas[3]);
		if(event.key == '5')
			pizzaOven.select(pizzas[4]);
		if(event.key == '6')
			pizzaOven.select(pizzas[5]);
		if(event.key == '7')
			pizzaOven.select(pizzas[6]);
		if(event.key == '8')
			pizzaOven.select(pizzas[7]);
		if(event.key == '9')
			pizzaOven.select(pizzas[8]);
		
		if(event.key == 'Enter')
			pizzaOven.bake();
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
var cheese = new Ingredient("cheese", tomatoImg, 0); //replace images with the correct ones later
var peperoni = new Ingredient("peperoni", tomatoImg, 0);
var ham = new Ingredient("ham", tomatoImg, 0);
var olive = new Ingredient("olive", tomatoImg, 0);
var pineapple = new Ingredient("pineapple", tomatoImg, 0); 

var ingredients = [wheat, dough, tomato, sauce, milk, cheese, peperoni, ham, olive, pineapple];
var pizzaIngredients = [dough, sauce, cheese, peperoni, ham, olive, pineapple];

class Plant {
	constructor(name, img0, img1, canHarvest, num, harvestNum) {
		this.name = name;
		this.img0 = img0;
		this.img1 = img1;
		this.x = 0;
		this.y = 0;
		this.width = 50;
		this.height = 50;
		this.canHarvest = canHarvest;
		this.num = num;
		this.harvestNum = harvestNum;
	}

	click = function() {
		if(this.canHarvest) {
			for(var pos = 0; pos < ingredients.length; pos++) {
				if(ingredients[pos].name == this.name) {
					ingredients[pos].changeNum(this.harvestNum);
					alert(ingredients[pos].name + " added to refrigerator");
				}
			}
			this.canHarvest = false;
		}
		else {
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
		ctx.fillStyle = "#786054";
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

			this.currPlant++;
			if(this.currPlant == this.numColumns) {
				this.currPlant = 0;
				this.currRow++;
			}				
		}
	}
}

class Cow {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.vx = .5;
		this.vy = .25;
		this.width = 100;
		this.height = 80;

		this.canMilk = true;
		this.milkCooldown = 30000;
	}

	move = function() {
		this.x += this.vx;
		if (this.x + this.width >= pasture.x + pasture.width || this.x <= pasture.x) {
			this.vx = -this.vx;
		}

		if (this.vx <= 0) {
			ctx.drawImage(forwardCowImg, 0, 10, 100, 80, this.x, this.y, this.width, this.height);
		}
		else { 
			ctx.drawImage(backwardCowImg, 0, 10, 100, 80, this.x, this.y, this.width, this.height); 
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
var cow2 = new Cow(750, 60);
var cow3 = new Cow(550, 50);
var cow4 = new Cow(850, 60);

var cows = [cow1]; //add other cows to cow array as cows purchased in game

var fenceImg = new Image();
fenceImg.src = "images/fence.png";

class Pasture {
	constructor() {
		this.x = 505;
		this.y = 10;
		this.width = 500 - 15;
		this.height = 200;
	}
	
	draw = function() {
		ctx.fillStyle = "#64906D";
		ctx.fillRect(this.x, this.y, this.width, this.height);

		for(var pos = 0; pos < cows.length; pos++) {
			cows[pos].move();
		}
		ctx.drawImage(fenceImg, 505, 165, 485/2 - 60, 50);
		ctx.drawImage(fenceImg, 505 + 485/2 + 60, 165, 485/2 - 60, 50);
	}
}

class Raccoon {
	constructor() {
		this.x = 200;
		this.y = 200;

		this.width = 100;
		this.height = 90;

		this.speed = 5;

		this.movingLeft = false;
		this.movingRight = false;
		this.movingUp = false;
		this.movingDown = false;

		this.lastDirection = "right";
		this.count = 0;
		this.currImg = 0;
		this.images = [raccoonRightImg, raccoonRightAImg, raccoonRightBImg];
	}

	goLeft = function() {
		this.stopAll();
		this.movingLeft = true;
		this.lastDirection = "left";
		//this.currentSpriteSheet = this.leftSpriteSheet;
		//this.currImage = 0;
	}
	goRight = function() {
		this.stopAll();
		this.movingRight = true;
		this.lastDirection = "right";
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
		if(!this.movingRight && !this.movingLeft && !this.movingUp && !this.movingDown) {
			this.currImg = 0;
			if(this.lastDirection == "right")
				ctx.drawImage(raccoonRightImg, 0, 10, 100, 90, this.x, this.y, 100, 90);
			if(this.lastDirection == "left")
				ctx.drawImage(raccoonLeftImg, 0, 10, 100, 90, this.x, this.y, 100, 90);
		}
		else {
			if(this.movingRight)
				this.images = [raccoonRightImg, raccoonRightAImg, raccoonRightBImg];
			if(this.movingLeft)
				this.images = [raccoonLeftImg, raccoonLeftAImg, raccoonLeftBImg];
			if(this.movingUp || this.movingDown) {
				if(this.lastDirection == "right")
					this.images = [raccoonRightImg, raccoonRightAImg, raccoonRightBImg];
				else if (this.lastDirection == "left")
					this.images = [raccoonLeftImg, raccoonLeftAImg, raccoonLeftBImg];
			}

			ctx.drawImage(this.images[this.currImg], 0, 10, 100, 90, this.x, this.y, 100, 90);
			this.count++;
			if(this.count % 2 == 0) this.currImg++;
			if(this.currImg == 2)
				this.currImg = 0;
		}
	}
}

class Wall {
	constructor(x, y, width, height, color) {

		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.color = color;

	}

	//will not call this function in final product, only present for developing
	draw = function() {
		if(this.color != "none") {
			ctx.fillStyle = this.color;
			ctx.fillRect(this.x, this.y, this.width, this.height);
		}
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
			ctx.fillStyle = "pink";
			ctx.fillRect(300, 50, 400, 400);

			ctx.fillStyle = "white";
			ctx.font = '32px serif';
			ctx.textAlign = "center";
			ctx.fillText("refrigerator", 500, 90);

			this.numColumns = 4;
			this.imgSpacingX = 100;
			this.imgSpacingY = 100;
			this.currImg = 0;
			this.currRow = 0;
			for(var pos = 0; pos < ingredients.length; pos++) {
				ctx.drawImage(ingredients[pos].img, 325 + (this.imgSpacingX*this.currImg), 120 + (this.imgSpacingY*this.currRow), 50, 50);

				ctx.fillStyle = "white";
				ctx.font = '12px serif';
				ctx.textAlign = "center";
				ctx.fillText(ingredients[pos].name, 325 + (this.imgSpacingX*this.currImg) + 25, 120 + (this.imgSpacingY*this.currRow) + 60);
				ctx.fillText(ingredients[pos].num, 325 + (this.imgSpacingX*this.currImg) + 25, 120 + (this.imgSpacingY*this.currRow) + 75);

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
		}
		else if(this.state == 2) {
			this.state = 0;
			this.product.changeNum(1);
			alert("one " + this.product.name + " added to refrigerator");
		}
	}
}

class Pizza {
	constructor(name, img, value) {
		this.name = name;
		this.img = img;
		this.value = value;

		this.canMake = false;
		
		this.ingredients = [];
		if(this.name == "cheese pizza") {
			this.ingredients.push(dough, sauce, cheese);
		}
		else if(this.name == "peperoni pizza") {
			this.ingredients.push(dough, sauce, cheese, peperoni);
		}
		else if(this.name == "olive pizza") {
			this.ingredients.push(dough, sauce, cheese, olive);
		}
		else if(this.name == "hawaiian pizza") {
			this.ingredients.push(dough, sauce, cheese, ham, pineapple);
		}
		else if(this.name == "everything pizza") {
			this.ingredients.push(dough, sauce, cheese, peperoni, olive, ham, pineapple);
		}
	}
}

var cheesePizza = new Pizza("cheese pizza", cheesePizzaImg, 7);
var peperoniPizza = new Pizza("peperoni pizza", pepperoniPizzaImg, 8);
var olivePizza = new Pizza("olive pizza", olivePizzaImg, 8);
var hawaiianPizza = new Pizza("hawaiian pizza", hawaiianPizzaImg, 10);
var everythingPizza = new Pizza("everything pizza", everythingPizzaImg, 0);

var pizzas = [cheesePizza, peperoniPizza, olivePizza, hawaiianPizza];

class PizzaOven {
	constructor() {
		this.x = 200;
		this.y = 375;
		this.width = 100;
		this.height = 100;
		this.state = 0;
		this.menuOpen = false;

		this.selectedPizza = 0;
	}

	draw = function() {
		if(this.state == 0)
			ctx.drawImage(pizzaOvenImg0, this.x, this.y, this.width, this.height);
		else if(this.state == 1)
			ctx.drawImage(pizzaOvenImg1, this.x, this.y, this.width, this.height);
		else if(this.state == 2) {
			ctx.drawImage(pizzaOvenImg0, this.x, this.y, this.width, this.height);
			ctx.fillStyle = "blue";
			ctx.fillRect(this.x, this.y, 10, 10);
		}
	}

	drawMenu = function() {
		if(this.menuOpen) {
			ctx.fillStyle = "grey";
			ctx.fillRect(200, 50, 600, 400);

			//pizza ingredients display
			this.numIngredientColumns = 2;
			this.ingredientSpacingX = 80;
			this.ingredientSpacingY = 80;
			this.currIngredient = 0;
			this.currIngredientRow = 0;
			ctx.fillStyle = "white";
			ctx.font = '18px serif';
			ctx.textAlign = "center";
			ctx.fillText("ingredients", 210 + 50 + 15, 70);
			for(var pos = 0; pos < pizzaIngredients.length; pos++) {
				ctx.drawImage(pizzaIngredients[pos].img, 210 + (this.ingredientSpacingX*this.currIngredient), 80 + (this.ingredientSpacingY*this.currIngredientRow), 50, 50);

				ctx.fillStyle = "white";
				ctx.font = '12px serif';
				ctx.textAlign = "center";
				ctx.fillText(pizzaIngredients[pos].name, 210 + (this.ingredientSpacingX*this.currIngredient) + 25, 80 + (this.ingredientSpacingY*this.currIngredientRow) + 60);
				ctx.fillText(pizzaIngredients[pos].num, 210 + (this.ingredientSpacingX*this.currIngredient) + 25, 80 + (this.ingredientSpacingY*this.currIngredientRow) + 75);

				this.currIngredient++;

				if(this.currIngredient == this.numIngredientColumns) {
					this.currIngredient = 0;
					this.currIngredientRow++;
				}					
			}
			
			//determine which pizzas can be made			
			for(var ppos = 0; ppos < pizzas.length; ppos++) {
				this.checkIngredients(pizzas[ppos]);				
			}

			//display the pizzas
			ctx.fillStyle = "white";
			ctx.font = '30px serif';
			ctx.textAlign = "center";
			ctx.fillText("pizza oven", 500, 115);

			ctx.font = '12px serif';
			ctx.fillText("press the number that corresponds to the pizza you would like", 500, 410);

			var possPizzas = 0;
			var pizzaSpacingX = 80;
			var pizzaSpacingY = 80;
			var currPizza = 0;
			var currPizzaRow = 0;
			ctx.fillStyle = "white";
			ctx.font = '18px serif';
			ctx.textAlign = "center";
			ctx.fillText("pizzas", 650 + 50 + 15, 70);
			for(var pos = 0; pos < pizzas.length; pos++) {
				if(pizzas[pos].canMake) {
					possPizzas++;
					ctx.drawImage(pizzas[pos].img, 660 + 80 - (pizzaSpacingX*currPizza), 80 + (pizzaSpacingY*currPizzaRow), 50, 50);

					ctx.fillStyle = "white";
					ctx.font = '12px serif';
					ctx.textAlign = "center";
					ctx.fillText(pizzas[pos].name, 660 + 80 - (pizzaSpacingX*currPizza) + 25, 80 + (pizzaSpacingY*currPizzaRow) + 60);
					ctx.fillText(possPizzas, 660 + 80 - (pizzaSpacingX*currPizza) + 25, 80 + (pizzaSpacingY*currPizzaRow) + 75);

					currPizza++;
					if(currPizza == 2) {
						currPizza = 0;
						currPizzaRow++;	
					}
				}
			}

			//display message if no pizzas possible
			if(possPizzas == 0) {
				ctx.fillStyle = "white";
				ctx.font = '18px serif';
				ctx.textAlign = "center";
				ctx.fillText("no pizzas possible", 710, 100);
			}
			
			//display selected pizza
			if(this.selectedPizza != 0) {
				ctx.drawImage(this.selectedPizza.img, 400, 190, 200, 200);
				ctx.fillStyle = "white";
				ctx.font = '18px serif';
				ctx.textAlign = "center";
				ctx.fillText(this.selectedPizza.name + " selected", 500, 160);
				ctx.fillText("press enter to bake", 500, 180);
			}

			//display message if no pizza selected
			if(this.selectedPizza == 0) {
				ctx.fillStyle = "black";
				ctx.fillRect(400, 150, 200, 200);
				ctx.fillStyle = "white";
				ctx.font = '18px serif';
				ctx.textAlign = "center";
				ctx.fillText("no pizza selected", 500, 200);
			}
		}
	}

	click = function() {
		if(this.state == 0) this.menuOpen = true;
		if(this.state == 2) {
			alert("one " + this.selectedPizza.name + " baked");
			pizzasBaked.push(this.selectedPizza);
			this.state = 0;
			this.checkIngredients(this.selectedPizza);
			allTimePizzasBaked.push(this.selectedPizza);
		}
	}

	checkIngredients = function(pizza) {
		var currPizzaIngredients = pizza.ingredients;
		for(var ipos = 0; ipos < currPizzaIngredients.length; ipos++) {
			if(ipos == currPizzaIngredients.length - 1 && currPizzaIngredients[ipos].num > 0) 
				pizza.canMake = true;

			if(currPizzaIngredients[ipos].num < 1) {
				pizza.canMake = false;
				if(pizza == this.selectedPizza) this.selectedPizza = 0;
				return;						
			}
		}
	}

	select = function(pizza) {
		if(pizza.canMake) {
			this.selectedPizza = pizza;
		}
	}

	bake = function() {
		if(this.selectedPizza.canMake) {
			for(var pos = 0; pos < this.selectedPizza.ingredients.length; pos++) {
				this.selectedPizza.ingredients[pos].changeNum(-1);
			}
			this.state = 1;
			var self = this;
			this.timer = setTimeout(function() { 
				self.state = 2;
			}, 8000);
			this.menuOpen = false;
		}
		else {
			this.selectedPizza = 0;
		}
	}
}

var pizzasBaked = [];
var allTimePizzasBaked = [];

class Shop {
	constructor() {
		this.x = 100;
		this.y = 600;
		this.width = 100;
		this.height = 40;

		this.menuOpen = false;
	}

	drawMenu = function() {
		if(this.menuOpen) {
			ctx.fillStyle = "grey";
			ctx.fillRect(300, 50, 400, 400);
		}
	}

	click = function() {
		if(this.menuOpen) this.menuOpen = false;
		else this.menuOpen = false;
	}
}

class Pizzeria {
	constructor() {
		this.day = 1;
		this.objectiveMet = false;
		this.menuOpen = true;
	}
	draw = function() {
		//kitchen floor
		ctx.fillStyle = "#FFEAEC";
		ctx.fillRect(10, 160, 490, 500 - 160 - 10);
		//kitchen wall
		ctx.fillStyle = "#99B7D6";
		ctx.fillRect (10, 10, 485, 150);
		//outside path
		ctx.fillStyle = "#AB9387";
		ctx.fillRect(1000/2, 10, 490, 490);
	}
	run = function() {
		this.menu();
		this.checkObjective();
	}
	menu = function() {
		if(this.menuOpen) {
			ctx.fillStyle = "pink";
			ctx.fillRect(200, 100, 600, 250);

			var message = [];
			var lineSpacing = 20;

			ctx.fillStyle = "white";
			ctx.font = '24px serif';
			ctx.textAlign = "center";
			ctx.fillText("day " + this.day, 550, 150);
			ctx.fillStyle = "grey";
			ctx.font = '12px serif';
			ctx.fillText("press 'esc' to close", 745, 340);

			ctx.drawImage(ghostRaccoonImg, 250, 150, 150, 150);

			if(this.day == 1) {
				message = ["welcome. the time has come,", 
				"and you are the kin of chef!", 
				"your first task is simple--make one cheese pizza.",
				"milk your cow, harvest your tomatoes and wheat,", 
				"then use the tools in your kitchen.",
				"good luck!"];
			}
			if(this.day == 2) {
				message = ["it is a new day! you have made pizza!",
				"congratulations chef! with a new day comes a new",
				"task! today you will make a pepperoni pizza",
				"you received pepperoni from the butcher today.",
				"remember, the pizzeria is in your hands now.",
				"you must not fail!!"];
			}
			if(this.day == 3) {
				message = ["hello chef!",
				"today's task is simple--two cheese pizzas",
				"and one olive pizza!",
				"you have everything you need available to you.",
				"you closer to greatness!!",
				"good luck, chef!"];
			}
			if(this.day == 4) {
				message = ["good morning chef! it is a new day!",
				"today you will make a hawaiian pizza!",
				"you received a pineapple plant during the night!",
				"use it wisely. i know that you can succeed!",
				"good luck, chef."];
			}
			if(this.day == 5) {
				message = ["hello chef...",
				"today's task is...unique...",
				"you must make an ~everything pizza~",
				"...a pizza with...everything...",
				"see you tomorrow!"];
			}

			ctx.fillStyle = "white";
			ctx.font = '18px serif';
			ctx.textAlign = "left";
			for(var pos = 0; pos < message.length; pos++) {
				ctx.fillText(message[pos], 430, 180 + (lineSpacing*pos));			
			}
		}
	}
	checkObjective = function() {
		ctx.fillStyle = "white";
		ctx.fillRect(890, 440, 100, 50);
		ctx.fillStyle = "black";
		ctx.font = '10px serif';
		ctx.textAlign = "center";
		var objective;
		if(this.day == 1) {
			objective = "bake one cheese pizza";
			for(var pos = 0; pos < pizzasBaked.length; pos ++)
				if(pizzasBaked[pos] == cheesePizza)
					this.objectiveMet = true;
		}
		if(this.day == 2) {
			objective = "pepperoni pizza";
			for(var pos = 0; pos < pizzasBaked.length; pos++)
				if(pizzasBaked[pos] == peperoniPizza)
					this.objectiveMet = true;
		}
		if(this.day == 3) {
			objective = "2 cheese, 1 olive"
			var cheesePizzaCount = 0;
			for(var p = 0; p < pizzasBaked.length; p++)
				if(pizzasBaked[p] == cheesePizza)
					cheesePizzaCount++;
			for(var p = 0; p < pizzasBaked.length; p++)
				if(pizzasBaked[p] == olivePizza && cheesePizzaCount >= 2) {
					this.objectiveMet = true;
				}
		}
		if(this.day == 4) {
			objective = "hawaiian pizza";
			for(var p = 0; p < pizzasBaked.length; p++)
				if(pizzasBaked[p] == hawaiianPizza)
					this.objectiveMet = true;
		}
		if(this.day == 5) {
			objective = "everything pizza";
			for(var p = 0; p < pizzasBaked.length; p++)
				if(pizzasBaked[p] == everythingPizza)
					this.objectiveMet = true;
		}
		if(this.day == 6) {
			var profit = 0;
			for(var pos = 0; pos < allTimePizzasBaked.length; pos++)
				profit += allTimePizzasBaked[pos].value;
			ctx.fillStyle = "pink";
			ctx.fillRect(0, 0, 1000, 500);
			ctx.fillStyle = "white";
			ctx.font = '24px serif';
			ctx.textAlign = "center";
			ctx.fillText("you died after consuming 'everything pizza'", 500, 150);
			ctx.fillText("you made " + profit + " raccoon dollars", 500, 175);
			ctx.fillText("refresh to restart", 500, 200);
			ctx.drawImage(ghostRaccoonImg, 450, 250);
			ctx.fillText('"we are together again!"', 500, 375);
			ctx.fillText("-poppa raccoon", 500, 395);
		}

		if(this.objectiveMet) {
			ctx.fillText("objective met", 940, 455);
			ctx.fillText("press -> to proceed", 940, 470);
			ctx.fillText("to day " + (this.day + 1), 940, 485);
		}
		else {
			if(this.day != 6) {
				ctx.fillText("objective:", 940, 455);
				ctx.fillText(objective, 940, 470);
			}
		}
	}
	nextDay = function() {
		this.day++;
		this.objectiveMet = false;
		pizzasBaked = [];
		raccoon.x = 200;
		raccoon.y = 200;
		this.menuOpen = true;

		for(var pos = 0; pos < plants.length; pos++)
			plants[pos].canHarvest = true;
		for(var pos = 0; pos < cows.length; pos++) {
			cows[pos].canMilk = true;
		}

		//new day gifts/supplies
		if(this.day == 2) {
			peperoni.num = 50;
			cows.push(cow2);
			clickables.push(cow2);
		}
		if(this.day == 3) {
			olive.num = 13;
			plants.push(wheatPlant2, tomatoPlant2);
			clickables.push(wheatPlant2, tomatoPlant2);
		}
		if(this.day == 4) {
			plants.push(pineapplePlant, pineapplePlant2, pineapplePlant3);
			clickables.push(pineapplePlant, pineapplePlant2, pineapplePlant3);
			ham.num = 18
			cows.push(cow3);
			clickables.push(cow3);
		}
		if(this.day == 5) {
			pizzas.push(everythingPizza);
		}
	}
}

var pizzeria = new Pizzeria();

//walls
var leftBound = new Wall(0, 0, 10, canvas.height, "#3D3B3C");
var topBound = new Wall(0, 0, canvas.width, 10, "#3D3B3C");
var rightBound = new Wall(canvas.width - 10, 0, 10, canvas.height, "#3D3B3C");
var bottomBound = new Wall(0, canvas.height - 10, canvas.width, 10, "#3D3B3C");

var centerTopBound = new Wall(canvas.width/2 - 5, 0, 10, 280, "#3D3B3C");
var centerBottomBound = new Wall(canvas.width/2 - 5, 400, 10, 90, "#3D3B3C");

var pastureBoundLeft = new Wall(505, 10 + 200 - 10, 485/2 - 60, 10, "none");
var pastureBoundRight = new Wall(505 + 485/2 + 60, 10 + 200 - 10, 485/2 - 60, 10, "none");


//farm/garden
var pasture = new Pasture();
var garden = new Garden();
var wheatPlant = new Plant("wheat", wheatPlantImg0,wheatPlantImg1, true, 1, 3);
var wheatPlant2 = new Plant("wheat", wheatPlantImg0,wheatPlantImg1, true, 1, 3);
var tomatoPlant = new Plant("tomato", tomatoPlantImg0, tomatoPlantImg1, true, 1, 3);
var tomatoPlant2 = new Plant("tomato", tomatoPlantImg0, tomatoPlantImg1, true, 1, 3);
var pineapplePlant = new Plant("pineapple", pineapplePlantImg0, pineapplePlantImg1, true, 0, 1);
var pineapplePlant2 = new Plant("pineapple", pineapplePlantImg0, pineapplePlantImg1, true, 0, 1);
var pineapplePlant3 = new Plant("pineapple", pineapplePlantImg0, pineapplePlantImg1, true, 0, 1);

  //add all other possible plants, set num to zero


var plants = [];
plants.push(tomatoPlant, wheatPlant);

//appliances
var refrigerator = new Refrigerator();
var pizzaOven = new PizzaOven();
var mixer = new Appliance("mixer", mixerImg0, mixerImg1, 380, 50, 80, 120, wheat, dough);
var stove = new Appliance("stove", stoveImg0, stoveImg1, 180, 50, 80, 150, tomato, sauce);
var cheesePress = new Appliance("cheese press", cheesePressImg0, cheesePressImg1, 30, 345, 120, 150, milk, cheese);

var walls = [];
walls.push(leftBound, rightBound, topBound, bottomBound); //perimeter
walls.push(centerTopBound, centerBottomBound); //interior walls
walls.push(pastureBoundLeft, pastureBoundRight);
walls.push(refrigerator, pizzaOven, stove, cheesePress, mixer); //interior objects

var clickables = [];
clickables.push(refrigerator, pizzaOven, stove, cheesePress, mixer);
clickables.push(tomatoPlant, wheatPlant);
clickables.push(cow1);

var menus = [];
menus.push(refrigerator, pizzaOven);

var raccoon = new Raccoon();

raccoonLeftImg.onload = function () {
	setInterval(animate, 50);
}
  
  
function animate () {
	clearBackground();

	pizzeria.draw();

	pasture.draw();
	garden.draw();

	raccoon.move();
	raccoon.draw();

	for (var w in walls)
		walls[w].draw();
	for (var m in menus)
		menus[m].drawMenu();

	pizzeria.run();

}
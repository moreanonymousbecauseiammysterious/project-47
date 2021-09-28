const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var backgroundImg;
var alienBlaster, alienBlasterImg;
var jason, jasonImg;
var alien, alienImg;
var laser, laserImg;
var ground;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score = 0;

function preload(){
	backgroundImg = loadImage("mygamebg.png");
	alienBlasterImg = loadImage("alienblaster.png");
	jasonImg = loadImage("jason.png");
	alienImg = loadImage("alien.png");
	laserImg = loadImage("laser.png");
}

function setup() {
	createCanvas(800, 700);


	engine = Engine.create();
	world = engine.world;

	jason = createSprite(400,520,20,20);
	jason.addImage(jasonImg);
	jason.scale = 0.2;

	alienBlaster = createSprite(370,500,20,20);
	alienBlaster.addImage(alienBlasterImg);
	alienBlaster.scale = 0.15;

	laser = createSprite(alienBlaster.position.x,alienBlaster.position.y,20,20);
	laser.addImage(laserImg);
	laser.scale = 0.5;
	laser.visible = false;

	ground = createSprite(400,600,800,5);
	ground.visible = false;

	Engine.run(engine);
  
	alienGroup = new Group();

}


function draw() {
  rectMode(CENTER);
  background(backgroundImg);
if(gameState === PLAY){
	jason.x = mouseX;
	alienBlaster.x = mouseX;
	laser.x = alienBlaster.x;
  
	if(keyDown("SPACE")){
		laser.velocityY = -25;
		laser.visible = true;
	}
	stroke("black");
	fill("white");
	textSize(20);
	text("SCORE: "+score,650,50);
	if(laser.y<0){
	  laser.velocityY = 0;
	  laser.y = alienBlaster.y;
	  laser.visible = false;
	}
	spawnAliens();

	if(laser.collide(alienGroup)){
		laser.velocityY = 0;
		laser.y = alienBlaster.y;
		laser.visible = false;
		alienGroup.destroyEach();
		score++
	}

	drawSprites();
	if(alienGroup.isTouching(ground)){
		gameState = END;
	}
}
if(gameState === END){
	jason.visible = false;
	alienGroup.destroyEach();
	alienGroup.setVelocityYEach(0);
	alienBlaster.visible = false;
	background("red");
	strokeWeight(5);
	stroke("black");
	fill("white");
	textSize(30);
	text("GAME OVER",310,350);
	textSize(20);
	text("press R to restart the game",280,400);

	if(keyDown("R")){
		gameState = PLAY;
		jason.visible = true;
		alienBlaster.visible = true;
		score = 0;
	}
}
}

function spawnAliens(){
	if(frameCount % 55 === 0){
		alien = createSprite(random(10,790),-30,20,20);
		alien.addImage(alienImg);
		alien.scale = 0.03;
		alien.velocityY = random(7,15);
		alienGroup.add(alien);
		alien.lifetime = 800;
	}
}
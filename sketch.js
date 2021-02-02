var player;
var stone;
var w1,w2;



var score = 0;

var gameState = 0;

function preload(){
  playerStanding = loadImage("images/standing.png")
  playerJumping = loadImage("images/jumping.png")
  backgroundImg = loadImage("images/forest.jpg")
  stoneImg = loadImage("images/stone.png")
}

function setup() {
  createCanvas(displayWidth-100,displayHeight-150);
  
  w1 = createSprite(displayWidth/2,30,width,10);
  w1.visible = false;

  w2 = createSprite(displayWidth/2,displayHeight-30,width,10);
  w2.visible = false;

  player = createSprite(displayWidth/2,displayHeight/2,40,50);
  player.addImage(playerStanding)
  player.shapeColor = "yellow"

  stone = createSprite(player.x+500,random(20,1000),70,70);
  stone.addImage(stoneImg)
  stone.scale = 0.5

  textSize(25);
  fill("red") 
}

function draw() { 
  background(backgroundImg)

  drawSprites();

  player.collide(w1);
  player.collide(w2);

  camera.position.x = player.x;
  camera.position.y = displayHeight/2;
  
   if(gameState === 0){
       textSize(25);
       fill("red")
      text("Press Space To Begin, Up And Down Arrow To Control",(displayWidth/2)-100,displayHeight/4);
     
   }
  
  if(gameState === 1){

    if(frameCount%40 === 0){
      stone = createSprite(player.x+700,random(20,1000),70,70);
      stone.addImage(stoneImg)
      stone.scale = 0.5
    }
    player.x = player.x+20;
    w1.x = w1.x+20;
    w2.x = w2.x+20;
  }

    if(player.isTouching(stone)){
     gameState = 2;
    }

    if(gameState === 2){
      textSize(25);
      fill("red")
      text("GAME OVER, PRESS R TO RESTART",player.x,player.y);
    }

    if( keyIsDown(UP_ARROW)&&gameState === 1 ){
      player.addImage(playerJumping)
      player.y = player.y-20
    }
    if( keyIsDown(DOWN_ARROW)&&gameState === 1 ){
      player.addImage(playerStanding)
      player.y = player.y+20
    }

    if(keyWentDown(82)&&gameState ===2 ){
    gameState = 0;
    player.x = displayWidth/2;
    player.y = displayHeight/2;
    }

    if(keyWentDown(32)&&gameState === 0){
    gameState = 1;
    }
}
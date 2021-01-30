
var monkey , monkey_running,monkeyCollided;
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score = 0;
var invisibleGround;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  
  obstacleImage = loadImage("obstacle.png");
  
  monkeyCollided = loadAnimation("sprite_0.png")
 
}



function setup() {
  createCanvas(windowHeight,windowWidth);
  
  monkey = createSprite(100,300,20,20);
  monkey.addAnimation("monkey",monkey_running)
  
  
  invisibleGround = createSprite(200,windowHeight,windowWidth+1000,10)
  
  
  obstacleGroup = createGroup();
  bananaGroup = createGroup();
}


function draw() {
  
  background("white");
  
  monkey.scale = 0.15;
  if (monkey.isTouching(obstacleGroup)) {
    gameState = END;
  }
  
  if (gameState === PLAY) {
    if(keyDown("space")&& monkey.y >= windowHeight-100) {
        monkey.velocityY = -15;
        
    }
    if(monkey.isTouching(bananaGroup)) {
      score = score+1;
      bananaGroup.destroyEach()
    }
    
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8
  
    monkey.collide(invisibleGround)
    
    textSize(20)
    
    text("Score = "+score,280,50)
  
  monkey.debug = true;
  
   
  obstacles();
  bananas();
  }else if (gameState === END) {
    
    obstacleGroup.setVelocityXEach(0);
    
    bananaGroup.setVelocityXEach(0);
    textSize(20);
    text("GAMEOVER",150,200)
    monkey.collide(invisibleGround)
    
  
  }
  
  
  
  drawSprites();
}
function bananas() {
  if (frameCount%80===0){
    banana = createSprite(windowWidth+20,280,20,20);
    banana.addImage("banana",bananaImage);
    banana.scale = 0.1;
    banana.velocityX=-(5+score/5); 
     
    bananaGroup.add(banana);
    banana.y = Math.round(random(windowHeight-300,windowHeight-20 ))
    banana.setCollider("rectangle",0,0,20,400)
    banana.debug = true;
    
  
}
}
function obstacles() {
  if (frameCount%300===0) {
    obstacle = createSprite(windowWidth+20,windowHeight-20,20,20);
    obstacle.addImage("obstacle",obstacleImage)
    obstacle.scale = 0.15;
    obstacle.velocityX = -(10+score/5);
    obstacle.lifetime = 134;
    obstacleGroup.add(obstacle);
    obstacle.debug = true;
    obstacle.setCollider("rectangle",0,0,250,250)
  }
}





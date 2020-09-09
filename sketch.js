var banana,bananaImage,obstacle,obstacleImage,score,backImage,Monkey,MonkeyRunning,ground,invisibleGround;

function preload(){
MonkeyRunning=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  bananaImage=loadImage("banana.png");
  
  backImage=loadImage("jungle.jpg");
  
  obstacleImage=loadImage("stone.png");
}

function setup() {
  createCanvas(400, 400);

  ground = createSprite(300,150,200,20);
  ground.addImage(backImage);
  ground.x = ground.width /2;
  ground.velocityX = -2;
  
  invisibleGround=createSprite(10,390,400,20)
  invisibleGround.visible = false;
  Monkey=createSprite(55,320,20,50);
  Monkey.addAnimation("running", MonkeyRunning);
  Monkey.scale=0.1;
  
  score=0;
  
  foodGroup=new Group();
  obstaclesGroup= new Group();
 
}

function draw() {
  background(220);
  
  if(keyDown("space")&& Monkey.y>=280) {
    Monkey.velocityY = -10;
  }
  
  Monkey.velocityY = Monkey.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }                   
 Monkey.collide(invisibleGround);
  
  if(foodGroup.isTouching(Monkey)){
  score=score+2;
   foodGroup.destroyEach();
  }
  
  if(obstaclesGroup.isTouching(Monkey)){
  Monkey.scale=0.08;
  }
  
  drawSprites();
  obstacles();
  food();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score : "+ score,280,50);
}
function food(){
  if(World.frameCount%80===0){
  banana=createSprite(400,random(120,200));
  banana.addImage(bananaImage);
  banana.scale=0.08;
  banana.velocityX=-8;
  banana.lifetime=55;
  foodGroup.add(banana);
  }
  

}

function obstacles(){
  if(World.frameCount%200===0){
    obstacle=createSprite(400,350);
    obstacle.addImage(
    obstacleImage);
    obstacle.scale=0.15; 
    obstacle.velocityX=-9;
    obstaclesGroup.add(obstacle);
    obstacle.lifetime = 100; 
    switch(score){
      case 10:Monkey.scale=0.12;
        break;
      case 20:Monkey.scale=0.14;
        break;
      case 30:Monkey.scale=0.16;
        break;
      case 40:Monkey.scale=0.18;
        break;
      default:break;
  
    }

  

}
}
 var fishie, tubes1, tubes, tube1Image, tube2Image, fishieImage, ground, groundImage;
 var score=0;
 var clouds, cloudsImage, cloudsGroup;
 var coins;
var tubesGroup;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var gameOverImage, restartImage
var backgroundImage;
var rockIceImage,rockIceDownImage
var downwardSnowRockImage,upwardsSnowRockImage
var invisibleGround

function preload(){
 fishieImage= loadImage("plane.png");
  groundImage= loadImage("ground2.png");
  tube1Image= loadImage("tube.png");
  tube2Image= loadImage("tube2.png");
  backgroundImage= loadImage("backgroundImg.png");
  gameOverImage= loadImage("gameOver.gif");
  restartImage= loadImage("restart.png");
  cloudsImage= loadImage("cloud.png");
  rockIceImage = loadImage("rockIce.png");
  rockIceDownImage = loadImage("rockIceDown.png")
  downwardSnowRockImage = loadImage("DownwardSnowRock.png")
  upwardsSnowRockImage = loadImage("UpwardsSnowRock.png")
}


function setup() {
  createCanvas(displayWidth,windowHeight);

    
    fishie= createSprite(100,200,20,20);
    fishie.addImage(fishieImage);
    fishie.scale=0.5;
  
    ground =createSprite(displayWidth/2,windowHeight-50,displayWidth,20);
    ground.scale = 1.5
    ground.addImage(groundImage);
    ground.velocityX=-4;
  //ground.x = ground.width /2;

   gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImage);
  gameOver.scale=0.5;
  
  restart = createSprite(300,190);
  restart.addImage(restartImage);
  restart.scale=0.5;


   tubesGroup= new Group();
   tubes1Group= new Group();
   cloudsGroup= new Group();
   invisibleGround= createSprite(displayWidth/2,windowHeight-20,displayWidth,20)
   invisibleGround.visible=false



   

  
  
    
}

function draw() {
  background(backgroundImage);
 
  
  
   camera.position.x = fishie.x
   tubesGroup.collide(invisibleGround)
    if (gameState===PLAY){
      if(fishie.isTouching(cloudsGroup)){
        score= score+20;
      }
      //score = score + Math.round(getFrameRate()/60);
     // ground.velocityX = -(6 + 3*score/100);
      gameOver.visible= false;
      restart.visible=false;
    
      if(keyDown(UP_ARROW)){
        fishie.velocityY= -10;
      }
    
      fishie.velocityY= fishie.velocityY+0.5;
    
      if (ground.x < 0){
        ground.x = windowWidth/2;
      }
    
      //fishie.collide(tubesGroup);
      fishie.collide(ground);
      spawnUpTubes();
      spawnDownTubes();
      spawnClouds();
    
      if(fishie.isTouching(tubesGroup)||fishie.isTouching(tubes1Group)){
          gameState = END;
      }
    }
    else if (gameState === END) {
      gameOver.visible = true;
      restart.visible = true;
      
      //set velcity of each game object to 0
      ground.velocityX = 0;
      fishie.velocityY = 0;
      tubesGroup.setVelocityXEach(0);
      tubes1Group.setVelocityXEach(0);
      cloudsGroup.setVelocityXEach(0);
     // cloudsGroup.setVelocityXEach(0);
      
      //change the trex animation
      
      
      //set lifetime of the game objects so that they are never destroyed
     tubesGroup.setLifetimeEach(-1);
     tubes1Group.setLifetimeEach(-1);
     cloudsGroup.setLifetimeEach(-1);
      
      if(mousePressedOver(restart)) {
        reset();
      }
    }
    fill("black");
    textSize(28);
     text("SCORE: "+ score, displayWidth/2-50, 50);

  drawSprites();

  
 
 
}
function spawnUpTubes() {
  
    if (frameCount % 80 === 0){
      var rand= Math.round(random(1,3))
      tubes1 = createSprite(displayWidth,45,500,280);
      //tubes.y = Math.round(random(250,200));
     // tubes1.addImage(tube2Image);
     switch(rand){
       case 1:tubes1.addImage(tube2Image);
       break;
       case 2:tubes1.addImage(rockIceDownImage);
       break;
       case 3:{tubes1.addImage(downwardSnowRockImage);
        tubes1.scale = 2}
       break;
      default:break;
     } 
    // tubes1.scale=0.4;
      tubes1.velocityX= -4;
      tubes1.lifetime= displayWidth/4+50;
      tubes1Group.add(tubes1)
            
       }
    
   
  }
function spawnDownTubes() {
  
    if (frameCount % 150 === 0){
      var rand= Math.round(random(1,3))
      tubes = createSprite(displayWidth,windowHeight-70,);
      //tubes.y = Math.round(random(250,300));
     // tubes.addImage(tube1Image);
     tubes.collide(ground)
          switch(rand){
      case 1:tubes.addImage(tube1Image);
      break;
      case 2:tubes.addImage(rockIceImage);
      break;
      case 3:{tubes.addImage(upwardsSnowRockImage);
        tubes.scale = 2}
      break;
      default:break;}
     // tubes.scale=0.4;
      tubes.velocityX= -4;
      tubes.lifetime= displayWidth/4+50;
      tubesGroup.add(tubes)
      
       }
    
   
  }
  function spawnClouds() {
  
    if (frameCount % 60 === 0){
      clouds = createSprite(500,200,600,580);
     clouds.y = Math.round(random(50,350));
      clouds.addImage(cloudsImage);
      clouds.scale=0.3;
      clouds.velocityX= -4;
      clouds.lifetime= 500;
      cloudsGroup.add(clouds)
      
       }
    
   
  }

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
 tubesGroup.destroyEach();
 tubes1Group.destroyEach();
 cloudsGroup.destroyEach();
 // cloudsGroup.destroyEach();
 ground.velocityX=0;
  score = 0;
  
}

gameState = "READY" ;

var player,playerstanding,playerrunning,playerfalling ;
var obstacle,cloud,tree,obstacleImage,cloudImage,treeImage,obstacleGroup,objectGroup ;
var bg,bgImage ;
var restart,gameover,restartImage,gameoverImage ;
var runningsound,quitsound,gameoversound,jumpsound,startsound,checkpointsound ;

var score = 0 ;
var Highscore = 0 ;

function preload() {
  playerstanding = loadAnimation("IMAGES/A5.png") ;
  playerrunning = loadAnimation("IMAGES/A1.png","IMAGES/A2.png","IMAGES/A3.png","IMAGES/A4.png","IMAGES/A5.png","IMAGES/A6.png") ;
  playerfalling = loadAnimation("IMAGES/A7.png") ;
  cloudImage = loadImage("IMAGES/CLOUDFINAL.png") ;
  obstacleImage = loadImage("IMAGES/OBSTACLEFINAL.png") ;
  treeImage = loadImage("IMAGES/TREESFINAL.png") ;
  bgImage = loadImage("IMAGES/BGFINAL1.png") ;
  restartImage = loadImage("IMAGES/restart.png") ;
  gameoverImage = loadImage("IMAGES/gameOver.png") ;
  bg1Image = loadImage("IMAGES/BG1.jpg") ;
  startImage = loadImage("IMAGES/STARTFINAL.png") ;
  quitImage = loadImage("IMAGES/QUITFINAL.png") ;

  runningsound = loadSound("SOUNDS/salamisound-3036465-sfx-power-up-5-games.mp3") ;
  quitsound = loadSound("SOUNDS/salamisound-3185910-sfx-power-up-15-games.mp3") ;
  gameoversound = loadSound("SOUNDS/salamisound-4638139-sfx-power-up-29-games.mp3") ;
  jumpsound = loadSound("SOUNDS/salamisound-6180756-sfx-power-up-8-games.mp3") ;
  startsound = loadSound("SOUNDS/salamisound-8883228-sfx-power-up-1-games.mp3") ; 
  checkpointsound = loadSound("SOUNDS/salamisound-6196884-sfx-power-up-9-games.mp3") ;
}

function setup() {
   createCanvas(windowWidth-20,windowHeight-20);
  
   bg = createSprite(windowWidth/2,windowHeight/2) ;
   bg.addImage("bg",bgImage) ;
   bg.scale = 2.0 ;
   bg.visible = false ;

   player = createSprite(windowWidth/10,windowHeight-windowHeight/3) ;
  // player.addAnimation("standing",playerstanding) ;
  player.addAnimation("running",playerrunning) ;
  player.addAnimation("falling",playerfalling) ;
  
   player.scale = 2 ;
  // player.debug = true ;
   player.setCollider("rectangle",0,0,50,100) ;
   player.visible = false ;

   start = createSprite(windowWidth/3,windowHeight/2) ;
   restart = createSprite(windowWidth/2,windowHeight/2) ;
   gameover = createSprite(windowWidth/2,windowHeight/3) ;
   quit = createSprite(windowWidth/2,windowHeight*6/7) ; 

   start.addImage("start",startImage) ;
   restart.addImage("restart",restartImage) ;
   quit.addImage("quit",quitImage) ;
   gameover.addImage("gameover",gameoverImage) ; 

   start.visible = false ;
   restart.visible = false ;
   gameover.visible = false ;
   quit.visible = false ;

   invisibleGround = createSprite(windowWidth/2,windowHeight-windowHeight/8,windowWidth,50) ;
   invisibleGround.visible = false ;

   obstacleGroup = new Group ;
   objectGroup = new Group ;

   score = 0 ;

}

function draw() {
  background(0);  

 if(gameState === "READY"){
   image(bg1Image,0,0,windowWidth,windowHeight) ;
   start.visible = true ;
   quit.visible = true ;
   fill(0) ; 
   textSize(22) ;
   strokeWeight(2)
   text("Press start button to start the game ",windowWidth/3,windowHeight/5) ;
   text("Press space key for making the player jump and avoid the hurdles to loose",windowWidth/4,windowHeight/4) ;

   if(mousePressedOver(start)){
     start.scale = 0.01 ;
     quit.scale = 0.01 ;
     start.visible = false ;
     quit.visible = false ;
     gameState = "PLAY" ;
   }
  
   if(mousePressedOver(quit)){

     quitsound.play() ;
     quit.visible = false ;
     start.visible = false ;
     
     gameState ="QUIT" ;
   }
  }

 if(gameState === "QUIT"){
  image(bg1Image,0,0,windowWidth,windowHeight) ;
  fill(0) ;
  textSize(20) ;
  text("Thanks for visiting",windowWidth/4,windowHeight/4) ;
 }
 console.log(gameState) ;

  if(gameState === "PLAY"){

    if(score>0 && score%100 === 0){
     checkpointsound.play() ;
    }

    if(score > Highscore){
      Highscore = score ;
    }

    score = score+Math.round(getFrameRate()/60) ;

    player.visible = true ;
    bg.visible = true ;

    bg.velocityX = -(10)
    if(bg.x < -500){
      bg.x = windowWidth/2
    }
    if((touches.length > 0) || keyDown("space") && player.y > (windowHeight-windowHeight/2) ){
      jumpsound.play() ;
      player.velocityY = -20
      touches =  [] ;
    }
    player.velocityY =  player.velocityY+1 ;

    if(obstacleGroup.isTouching(player)){
      gameState = "END" ;
    }
    
   spawnObstacles() ;
   spawnObjects() ;

  
  }
  else if(gameState === "END"){
    gameover.visible = true ;
    restart.visible = true ;

    player.changeAnimation("falling",playerfalling) ;
    player.scale = 2.75 ;
    player.debug = true ;

    bg.velocityX = 0 ;
    player.velocityY = 0 ;
    obstacleGroup.setVelocityXEach (0) ;
    objectGroup.setVelocityXEach (0) ;

    if(mousePressedOver(restart)){
      reset() ;
    }
  }
   
   player.collide(invisibleGround) ;
   drawSprites();

   fill(0)
   textSize(25)
   text("SCORE : "+ score,windowWidth-200,windowHeight/8) ;
   text("HIGH SCORE : "+Highscore,windowWidth-300,windowHeight/14) ;

}

function spawnObstacles(){
  if(frameCount % 200 === 0){
    var obstacle = createSprite(windowWidth,windowHeight-windowHeight/5)
    obstacle.addImage("Obstacle",obstacleImage) ;
    obstacle.velocityX = -(6) ;
    obstacle.scale = 0.45 ;
    obstacle.lifetime = 1000 ;
    obstacleGroup.add(obstacle);
   // obstacle.debug = true ;
    obstacle.setCollider("rectangle",0,0,250,400) ;
  }
}
function spawnObjects(){
  if(frameCount % 150 === 0){
    var tree = createSprite(windowWidth,windowHeight/2.5)
    tree.addImage("tree",treeImage) ;
    tree.velocityX = -(6) ;
    tree.scale = 0.55 ;
    tree.lifetime = 1000 ;
    objectGroup.add(tree);

    var cloud = createSprite(windowWidth+windowWidth/2,windowHeight/8)
    cloud.y = Math.round(random(20,100)) ;
    cloud.addImage("cloud",cloudImage) ;
    cloud.velocityX = -(6) ;
    cloud.scale = 0.25 ;
    cloud.lifetime = 1000 ;
    objectGroup.add(cloud);
  }
}

function reset(){
  gameState = "PLAY" ;
  gameover.visible = false ;
  restart.visible = false ;

  obstacleGroup.destroyEach() ;
  objectGroup.destroyEach() ;

  player.changeAnimation("running",playerrunning) ;

  score = 0 ;
}

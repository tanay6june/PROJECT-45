gameState = "PLAY" ;

var player,playerstanding,playerrunning ;
var obstacle,cloud,tree,obstacleImage,cloudImage,treeImage,obstacleGroup,cloudGroup,treeGroup ;
var bg,bgImage ;
var restart,gameover,restartImage,gameoverImage ;

function preload() {
  playerstanding = loadAnimation("IMAGES/A5.png") ;
  playerrunning = loadAnimation("IMAGES/A1.png","IMAGES/A2.png","IMAGES/A3.png","IMAGES/A4.png","IMAGES/A5.png","IMAGES/A6.png") ;
  cloudImage = loadImage("IMAGES/CLOUD.png") ;
  obstacleImage = loadImage("IMAGES/OBSTACLE.png") ;
  treeImage = loadImage("IMAGES/TREES.png") ;
  bgImage = loadImage("IMAGES/BGFINAL1.png") ;
  restartImage = loadImage("IMAGES/restart.png") ;
  gameoverImage = loadImage("IMAGES/gameOver.png") ;
}

function setup() {
   createCanvas(windowWidth-20,windowHeight-20);
  
   bg = createSprite(windowWidth/2,windowHeight/2) ;
   bg.addImage("bg",bgImage) ;
   bg.scale = 1.5 ;

   player = createSprite(windowWidth/10,windowHeight-windowHeight/3) ;
  // player.addAnimation("standing",playerstanding) ;
   player.addAnimation("running",playerrunning) ;
   player.scale = 2 ;
  // player.debug = true ;
   player.setCollider("rectangle",0,0,50,100) ;

   invisibleGround = createSprite(windowWidth/2,windowHeight-windowHeight/8,windowWidth,50) ;
   invisibleGround.visible = false ;

   obstacleGroup = new Group ;
   objectGroup = new Group ;

}

function draw() {
  background(0);  

  if(gameState === "PLAY"){
    bg.velocityX = -(10)
    if(bg.x < -500){
      bg.x = windowWidth/2
    }
    if(keyDown("space") && player.y > (windowHeight-windowHeight/2) ){
      player.velocityY = -14
    }
    player.velocityY =  player.velocityY+1 ;
  }
   player.collide(invisibleGround) ;
   spawnObstacles() ;
   spawnObjects() ;

 drawSprites();

}

function spawnObstacles(){
  if(frameCount % 250 === 0){
    var obstacle = createSprite(windowWidth,windowHeight-windowHeight/5)
    obstacle.addImage("Obstacle",obstacleImage) ;
    obstacle.velocityX = -(6) ;
    obstacle.scale = 0.25 ;
    obstacle.lifetime = 1000 ;
    obstacleGroup.add(obstacle);
  }
}
function spawnObjects(){
  if(frameCount % 200 === 0){
    var tree = createSprite(windowWidth,windowHeight/2.5)
    tree.addImage("tree",treeImage) ;
    tree.velocityX = -(6) ;
    tree.scale = 0.55 ;
    tree.lifetime = 1000 ;
    objectGroup.add(tree);

    var cloud = createSprite(windowWidth+windowWidth/2,windowHeight/8)
    cloud.addImage("cloud",cloudImage) ;
    cloud.velocityX = -(6) ;
    cloud.scale = 0.25 ;
    cloud.lifetime = 1000 ;
    objectGroup.add(cloud);
  }
}

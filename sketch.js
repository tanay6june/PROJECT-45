gameState = "PLAY" ;

var player,playerstanding,playerrunning ;
var obstacle,cloud,tree,obstacleImage,cloudImage,treeImage,obstacleGroup,cloudGroup,treeGroup ;
var bg,bgImage ;

function preload() {
  playerstanding = loadAnimation("IMAGES/A5.png") ;
  playerrunning = loadAnimation("IMAGES/A1.png","IMAGES/A2.png","IMAGES/A3.png","IMAGES/A4.png","IMAGES/A5.png","IMAGES/A6.png") ;
  cloudImage = loadImage("IMAGES/CLOUD.png") ;
  obstacleImage = loadImage("IMAGES/OBSTACLE.png") ;
  treeImage = loadImage("IMAGES/TREES.png") ;
  bgImage = loadImage("IMAGES/BGFINAL.png") ;
}

function setup() {
   createCanvas(windowWidth-20,windowHeight-20);
  
   bg = createSprite(windowWidth/2,windowHeight/2) ;
   bg.addImage("bg",bgImage) ;
   bg.scale = 2.5 ;



   



}

function draw() {
  background(0);  

  if(gameState === "PLAY"){
    bg.velocityX = -(6)
    if(bg.x < -250){
      bg.x = windowWidth/2
    }
  }

 drawSprites();

}




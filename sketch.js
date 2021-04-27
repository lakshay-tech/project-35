var ballon, database;
var position;

function preload(){
  bg = loadImage("Hot Air Ballon-01.png")
  ballonimg = loadImage("Hot Air Ballon-03.png")
}

function setup() {
  
  database = firebase.database();
  console.log(database);
  createCanvas(800,400);
 
 
 ballon =  createSprite(400, 200, 50, 50);
 ballon.addImage(ballonimg)
 ballon.scale = 0.5
 ballon.shapeColor = "red"


 var ballonPosition = database.ref('balloon/position');
  ballonPosition.on("value", readPosition, showError);
}


function draw() {
  background(bg);

  if(keyDown(LEFT_ARROW)){
    ballon.x = ballon.x  -10;
  }
  else if(keyDown(RIGHT_ARROW)){
    ballon.x = ballon.x+10;
  }
  else if(keyDown(UP_ARROW)){
    ballon.y = ballon.y  -10;
  }
  else if(keyDown(DOWN_ARROW)){
    ballon.y = ballon.y  +10;
  }

  drawSprites();
}

function writePosition(x,y){
  database.ref('balloon/position').set({
    'x': position.x + x ,
    'y': position.y + y
  })
}

function readPosition(data){
  position = data.val();
  console.log(position.x);
  ballon.x = position.x;
  ballon.y = position.y;
}

function showError(){
  console.log("Error in writing to the database");
}

const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

var ground,left,right,bridge,jointLink,joint;
var stones = [];  
var bg_img;
var button_img;
var zombie1,zombie2,zombie3,zombie4,zombie;
var collided = false;
function preload(){
bg_img = loadImage("js/background.png");
zombie1 = loadImage("js/zombie1.png")
zombie2 = loadImage("js/zombie2.png")
zombie3 = loadImage("js/zombie3.png")
zombie4 = loadImage("js/zombie4.png")
button_img = loadImage("js/axe.png")
sadzombie = loadImage("js/sad.png");
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  engine = Engine.create();
  world = engine.world;
  frameRate(80);

  ground = new Base(width/2,height-20,width,20)
  left = new Base(200,height/2,400,100)
  right = new Base(width-200,height/2,400,100)
bridge = new Bridge(30,{x:150,y:height/2-140})
//change the position of joint to have a proper bridge
joint = new Base(width-250,height/2-100,10,20)

Matter.Composite.add(bridge.body,joint)
jointLink = new Link(bridge,joint)

zombie = createSprite(width/2,height-100)
//zombie.addImage(zombie1);
zombie.addAnimation("lefttoright", zombie1, zombie2, zombie1);
zombie.addAnimation("righttoleft", zombie3, zombie4, zombie3);
//add sadZombie image
zombie.addImage("sad", sadzombie);
zombie.scale=0.1;
zombie.velocityX=10;
for (var i = 0; i <= 8; i++) {
  var x = random(width / 2 - 100, width / 2 + -200); 
  var y = random(-40, 110);
  var stone = new Stone (x, y, 80, 80);
  stones.push(stone);
  }

  breakButton = createButton("");
 breakButton.position(width - 200, height / 2-50);
 breakButton.class("breakbutton");
 breakButton.mousePressed(cut);
}

function draw() {
  background(bg_img);

  Engine.update(engine);
//rectMode(CENTER)

 // ground.display();
  //left.display();
 // right.display();
 
 bridge.show();
  for (var stone of stones) {
    stone.display();
    var  pos = stone.body.position
    var distance = dist(zombie.position.x, zombie.position.y, pos.x, pos.y);
    //console.log(distance)
    if (distance <= 50) {
      zombie.velocityX = 0;
      Matter.Body.setVelocity(stone.body, { x: 10, y: -10 });
     
      collided = true;
      zombie.changeImage(sadzombie);
    }
  }
 
  
  if (zombie.position.x >= width - 300 && !collided) {
    zombie.velocityX = -10;
    zombie.changeAnimation("righttoleft");
  }

  if (zombie.position.x <= 300 && !collided) {
    zombie.velocityX = 10;
    zombie.changeAnimation("lefttoright");
  }
  // stone.display();

  

  drawSprites();
}

function cut() {
  console.log("in the function")
  jointLink.detach();
  setTimeout( () => {
    bridge.break();
  }, 1500);
}



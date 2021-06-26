//Create variables here
var food;
function preload()
{
	//load images here
  dogHappy= loadImage("images/dogImg1.png")
  dogSad= loadImage("images/dogImg.png")
  food1= loadImage("images/food1.png")
}

function setup() {
	createCanvas(800, 700);
  
  database= firebase.database()

  database.ref('food').on("value", readPosition)

  ground= createSprite(400,600,800,400)
  ground.shapeColor='green';

  dog= createSprite(400,400,50,50)
  dog.addImage(dogSad)
  dog.scale= 0.4

  foods= createSprite(300,350,50,50)
  foods.addImage(food1)
  foods.scale= 0.15

}


function draw() {  
 background("rgb(50,150,200)")
  drawSprites();
  //add styles here
  fill ("white")
  textSize(20)
  text("foods remaining : " + food,300,200)
  text("Press up arrow, to feed the dog" ,100,50)

  if(food===0){
    dog.addImage(dogHappy)
    dog.scale= 0.4
    foods.scale= 0.001
  }

  if(keyWentDown(UP_ARROW) && food!==0){
    food--
    writeStock(food)
  }
}

function readPosition(data){
  food = data.val()
}

function writeStock(data){
  database.ref('/').set({
    food:data
  })
}
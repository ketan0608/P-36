var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood,feed;
var foodObj;
var lastfeed,feedtime;

// //create feed and lastFed variable here
// var feed;
// var lastfeed;

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  feed = createButton("Feed")
  feed.position(740,95)
  feed.mousePressed(feedDog)
}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
 feedtime = database.ref("FeedTime")
feedtime.on("value",function(data){
lastfeed = data.val();
  })

  //write code to display text lastFed time here
if(lastfeed>=12){
fill("black");
textSize(20);
text("LAST FEED :" + lastfeed + "PM",300,30)
}else if(lastfeed===0){
  fill("red")
  textSize(20);
  text("LAST FEED : 12AM",300,30)
  }else{
  fill("yellow");
  textSize(20);
  text("LAST FEED :" + lastfeed + "AM",300,30)
}
 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

function feedDog(){
  dog.addImage(happyDog);

  //write code here to update food stock and last fed time
var storeFS = foodObj.getFoodStock();
if(storeFS<=0){
  foodObj.updateFoodStock(storeFS*0);
}else{
  foodObj.updateFoodStock(storeFS-1);
}
database.ref("/").update({
  Food:foodObj.getFoodStock(),
  FeedTime:hour()
})
}
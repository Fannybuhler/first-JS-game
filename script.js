let canvas = document.getElementById("myCanvas"); //link to html
let ctx = canvas.getContext("2d"); //so that we can paint on the canvas

let score = 0;

// APPLE
let xApple = getStartingPoint();
let yApple = -30; //starting position of apple (outside screen)
let dyApple = 0; //fruit movement on y-axis

// WASTE
let xWaste = getStartingPoint();
let yWaste = -30;
let dyWaste = 0;

// BASKET DIMENSIONS
let basketHeight = 60;
let basketWidth = 60;
let basketX = canvas.width / 2 - basketWidth / 2;

// KEYBOARD CONTROLS
let rightPressed = false; //false bc not pressed to begin with
let leftPressed = false;

// IMPORT IMAGES
let apple = document.getElementById("apple");
let waste = document.getElementById("waste");
let basket = document.getElementById("basket");

// KEYBOARD CONTROLS
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if (e.key == "ArrowRight") {
        rightPressed = true;
    } 
  
    else if (e.key == "ArrowLeft") {
        leftPressed = true;
    }
}   

function keyUpHandler(e) {
    if (e.key == "ArrowRight") {
        rightPressed = false;
    } 
    
    else if (e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

// RANDOM GENERATOR STARTING POINT X-AXIS
function getStartingPoint() {
  let possibleStartingPoints = [50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650,];
  let startingPoint = possibleStartingPoints [Math.floor(Math.random() * possibleStartingPoints.length)];
  return startingPoint;
}

function drawFruit() {
  ctx.drawImage(apple, xApple, yApple);
}

function drawWaste() {
  ctx.drawImage(waste, xWaste, yWaste);
}

function drawBasket() {
  ctx.drawImage(basket, basketX, canvas.height - basketHeight);
}

function drawScore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "black";
  ctx.fillText("Score: " + score, 8, 20);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawFruit();
  drawWaste();
  drawBasket();
  drawScore();

    if (xApple > basketX && xApple < basketX + basketWidth && yApple + dyApple > canvas.height - basketHeight) {
        score++;
        yApple = -30; //start over from top
        xApple = getStartingPoint(); //get new starting point for fruit x-axis
    } 
    
    else if (yApple + dyApple > canvas.height) {
        yApple = -30; //start over from top
        xApple = getStartingPoint(); //get new starting point for fruit x-axis
    }

    if (xWaste > basketX && xWaste < basketX + basketWidth && yWaste + dyWaste > canvas.height - basketHeight) {
        score--;
        yWaste = -30;
        xWaste = getStartingPoint();
    } 
    
    else if (yWaste + dyWaste > canvas.height) {
        yWaste = -30;
        xWaste = getStartingPoint();
    }

    if (rightPressed) {
        basketX += 5;
        // IF basket position + basket width > canvas width
        //Basket position stop/= canvas width - basket width
        if (basketX + basketWidth > canvas.width) {
        basketX = canvas.width - basketWidth;
        }
    } 
    
    else if (leftPressed) {
        basketX -= 5;
        //stop at 0 on canvas width (don't move outside frame)
        if (basketX < 0) {
        basketX = 0;
        }
    }

  yApple += dyApple;
  yWaste += dyWaste;
}

let interval = setInterval(draw, 10);

// BUTTONS
document.getElementById("start").addEventListener("click", function() {
    dyApple = 2.5;
    dyWaste = 3;
});

document.getElementById("pause").addEventListener("click", function() {
    dyApple = 0;
    dyWaste = 0;
});

document.getElementById("restart").addEventListener("click", function() {
    document.location.reload();
});

let canvas = document.getElementById("myCanvas"); //link to html
let ctx = canvas.getContext("2d"); //so that we can paint on the canvas

let score = 0;
let timeLeft = 30; //Set value to timer

// APPLE
let xApple = getStartingPoint();
let yApple = -30; //starting position of apple (outside screen)
let dyApple = 0; //fruit movement on y-axis

// WASTE
let xWaste = getStartingPoint();
let yWaste = -30;
let dyWaste = 0;

// BASKET DIMENSIONS
const basketHeight = 60;
const basketWidth = 60;
let basketX = canvas.width / 2 - basketWidth / 2;

// KEYBOARD CONTROLS
let rightPressed = false; //false bc not pressed to begin with
let leftPressed = false;

// IMPORT IMAGES
const apple = document.getElementById("apple");
const waste = document.getElementById("waste");
const basket = document.getElementById("basket");

// WRITE SCORE AFTER GAME IS FINISHED
let lastScore = document.getElementById("lastScore");

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

// DRAW STUFF ON CANVAS
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
  ctx.font = "12px 'Press Start 2P'";
  ctx.fillStyle = "black";
  ctx.fillText("Score: " + score, 8, 20);
}

function drawTimer() {
    ctx.font = "12px 'Press Start 2P'";
    ctx.fillStyle = "black";
    ctx.fillText("Time left: " + timeLeft + "s", canvas.width - 176, 20);
}

// TIMER
function countdown() {
    if (timeLeft == 0){
        timeOut();
    } else {
        timeLeft--;
    }
}

function timeOut() {
    lastScore.innerHTML = "Score: " + score
    clearInterval(interval);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    restartBtn();
}

// RUN ALL FUNCTIONS
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawFruit();
  drawWaste();
  drawBasket();
  drawScore();
  drawTimer();

    //If catching an apple
    if (xApple > basketX && xApple < basketX + basketWidth && yApple + dyApple > canvas.height - basketHeight) {
        score++;
        dyApple += 0.1 //Speed up apple drop speed
        yApple = -30; //start over from top
        xApple = getStartingPoint(); //get new starting point for fruit x-axis
        let appleSound = new Audio("appleSound.mp3")
        appleSound.play();
    } 
    
    else if (yApple + dyApple > canvas.height) {
        yApple = -30; //start over from top
        xApple = getStartingPoint(); //get new starting point for fruit x-axis
    }

    //If catching waste
    if (xWaste > basketX && xWaste < basketX + basketWidth && yWaste + dyWaste > canvas.height - basketHeight) {
        score--;
        dyWaste += 0.1;
        yWaste = -30;
        xWaste = getStartingPoint();
        let wasteSound = new Audio("wasteSound.mp3")
        wasteSound.play();
    } 
    
    else if (yWaste + dyWaste > canvas.height) {
        yWaste = -30;
        xWaste = getStartingPoint();
    }

    //If moving the basket
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

  yApple += dyApple; //give apple new y-axis position when it moves
  yWaste += dyWaste;
}

let interval = setInterval(draw, 10);

// BUTTONS
// start button click function
 let startBtn = document.querySelector(".start");
 startBtn.addEventListener("click", function() {
    dyApple = 2;
    dyWaste = 3;
    setInterval(countdown, 1000); //Placed here so that timer starts when button is clicked
    startBtn.classList.remove("showing");
    startBtn.classList.add("hidden");
});

// switch image on hover
let playBtn = document.getElementById("playBtn");
playBtn.addEventListener("mouseover", function(){
    playBtn.src = "images/playBtnPressed FIXED.png";
});

playBtn.addEventListener("mouseout", function(){
    playBtn.src = "images/playBtn.png"
});

// restart button click function
let restart = document.querySelector(".restart");
function restartBtn(){
        restart.classList.remove("hidden");
        restart.classList.add("showing");
        restart.addEventListener("click", function() {
            document.location.reload();
        });
};

// switch image on hover
let restartIcon = document.getElementById("restartBtn");
restartIcon.addEventListener("mouseover", function(){
    restartIcon.src = "images/restartBtnPressed.png";
})

restartIcon.addEventListener("mouseout", function(){
    restartIcon.src = "images/restartBtn.png";
})
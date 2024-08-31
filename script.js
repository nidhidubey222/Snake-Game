// // Game Constants & Variables
let inputDir = {x: 0, y: 0}; 
 const foodSound = new Audio('food.mp3');
 const gameOverSound = new Audio('gameover.mp3');
 const moveSound = new Audio('move.mp3');
const musicSound = new Audio('music.mp3');
 let speed = 5;
 let score = 0;
 let lastPaintTime = 0;
 //isme let karenge ki humara origin grid ke upar se hai
 let snakeArr = [
     {x: 10, y: 6}
  ];

 food = {x: 8, y: 7};

// Game Functions
// why to use request animation because there is no flicker just like in set interval
function main(ctime) {
   window.requestAnimationFrame(main);
//     // console.log(currtime)
//to change millisecond in second we divide it by 1000
    if((ctime - lastPaintTime)/1000 < 1/speed){
       return;
     }
     lastPaintTime = ctime;
     gameEngine();
 }

 function isCollide(snake) {
     // If you bump into yourself 
     for (let i = 1; i < snakeArr.length; i++) {
      if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){             return true;
         }
     }
    // If you bump into the wall
    if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0){
        return true;
     }
        
   return false;
 }

 function gameEngine(){
     // Part 1: Updating the snake array & Food
     if(isCollide(snakeArr)){
         gameOverSound.play();
         musicSound.pause();
         inputDir =  {x: 0, y: 0}; 
         alert("Game Over. Press any key to play again!");
         snakeArr = [{x: 13, y: 15}];
         musicSound.play();
         score = 0; 
     }

     // If you have eaten the food, increment the score and regenerate the food
     if(snakeArr[0].y === food.y && snakeArr[0].x ===food.x){
         foodSound.play();
         score += 5;
         if(score>hiscoreval){
             hiscoreval = score;
           localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
             hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
        }
        scoreBox.innerHTML = "Score: " + score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
      let a = 2;
         let b = 16;
         food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
    }

    // Moving the snake
    for (let i = snakeArr.length - 2; i>=0; i--) { 
        snakeArr[i+1] = {...snakeArr[i]};
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // Part 2: Display the snake and Food
    // Display the snake
   board.innerHTML = "";
     snakeArr.forEach((e, index)=>{
      //yha pe hum css add kar rhe hai with the help of js
         snakeElement = document.createElement('div');
         //yha pe hum snake ki body ko grid me set kar rhe h
        snakeElement.style.gridRowStart = e.y;
      snakeElement.style.gridColumnStart = e.x;

         if(index === 0){
            snakeElement.classList.add('head');
         }
         else{
             snakeElement.classList.add('snake');
         }
        board.appendChild(snakeElement);
    });
    // Display the food
     foodElement = document.createElement('div');
     foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
     foodElement.classList.add('food')
     board.appendChild(foodElement);


 }


// Main logic starts here
 musicSound.play();
 let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
 }
 else{
     hiscoreval = JSON.parse(hiscore);
     hiscoreBox.innerHTML = "HiScore: " + hiscore;
 }
//highly recommended to use this one insteadof set interval.
 window.requestAnimationFrame(main);
 window.addEventListener('keydown', e =>{
    inputDir = {x: 0, y: 1} // Start the game
    moveSound.play();
     switch (e.key) {
         case "ArrowUp":
             console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;//also known as velocity of snake
            inputDir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }

});
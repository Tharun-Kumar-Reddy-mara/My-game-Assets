const Canvas = document.getElementById("canvas");
const ctx = Canvas.getContext("2d");
const bgMusic = document.getElementById("bird");
const gameOver = document.getElementById("gameover");
let playerName = prompt("Enter Your Name to continue the game!");
canvas.width = 1300;
canvas.height = 610;
//background Music
bgMusic.play();


let spacePressed = false;
let hue = 0;
let frame = 0;
let angle = 0;
let score = 0;
let gameSpeed = 2;

//Score Text
let grd = ctx.createLinearGradient(0, 0, 0, 100);
grd.addColorStop(0, "#BDC1BD");
grd.addColorStop(0.4, "#1B1B19");
grd.addColorStop(0.5, "#030300");
grd.addColorStop(0.6, "#1B1B19");
grd.addColorStop(1, "#BDC1BD");

//Backgound Image and it's motion
const backgroundImage = new Image();
backgroundImage.src = "bg.png";
const bg = {
    x1: 0,
    x2: canvas.width,
    y1: 0,
    width: canvas.width,
    height: canvas.height,
}

function handleBackground() {
    if (bg.x1 <= -bg.width + gameSpeed) {
        bg.x1 = bg.width;
    } else {
        bg.x1 -= gameSpeed;
    }
    if (bg.x2 <= -bg.width + gameSpeed) {
        bg.x2 = bg.width;
    } else {
        bg.x2 -= gameSpeed;
    }

    ctx.drawImage(backgroundImage, bg.x1, bg.y1, bg.width, bg.height);
    ctx.drawImage(backgroundImage, bg.x2, bg.y1, bg.width, bg.height);
}

//hole game animation
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //background code
    handleBackground();
    //importing code from  bird.js
    bird.update();
    bird.draw();
    //score upating
    ctx.font = "100px Georgia";
    ctx.fillStyle = grd;
    ctx.fill();
    ctx.strokeText(score, canvas.width - 150, 100);
    ctx.fillText(score, canvas.width - 150, 100);
    //importing code from particle.js
    handleParticles();
    //importing code from obstacles.js
    handleObstacles();
    //coollision code
    handleCollisions();
    //impotin collioson and return zero to stop the funtion loop(handleCollisions())
    if (handleCollisions()) { return; }
    requestAnimationFrame(animate);
    //angle to move bird floating motion
    angle += 0.12;
    //which changes the color @particle.js
    hue += 5;
    //obstacles gap @obstacles.js
    frame++;
}

animate();

window.addEventListener("keydown", function(e) {
    if (e.code === "Space" || e.keyCode === 32 || e.key === "ArrowUp") {
        spacePressed = true;
    }
});

window.addEventListener("keyup", function(e) {
    if (e.code === "Space" || e.keyCode === 32 || e.key === "ArrowUp") {
        spacePressed = false;
        bird.frameX = 0;
    }
});

const bang = new Image();
bang.src = "bang.png";

function handleCollisions() {
    for (let i = 0; i < obstaclesArray.length; i++) {
        if ((bird.y < obstaclesArray[i].top + 4 || bird.y + bird.height > canvas.height - obstaclesArray[i].bottom - 3.5) && (bird.x + bird.width > obstaclesArray[i].x && bird.x < obstaclesArray[i].x + obstaclesArray[i].width)) {
            //gameover music
            gameOver.play();
            bgMusic.pause();
            ctx.drawImage(bang, bird.x, bird.y, 50, 50);
            //text after game exits
            let grad = ctx.createLinearGradient(0, 0, 750, 100);
            grad.addColorStop(0, "#F9FF33");
            grad.addColorStop(0.4, "#FE2107");
            grad.addColorStop(0.8, "#FFC300");
            grad.addColorStop(1, "#F9FF33");
            ctx.font = "35px Georgia";
            ctx.fillStyle = grad;
            ctx.fillText("Hai," + playerName + " you loose & Your Score :" + score, 200, canvas.height / 2);
            return true;
        }
    }
}
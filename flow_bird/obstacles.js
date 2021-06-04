const obstaclesArray = [];
class Obstacle {
    constructor() {
        this.top = Math.random() * (canvas.height / 2.2);
        this.bottom = Math.random() * (canvas.height / 2.2);
        this.x = canvas.width;
        this.width = 30;
        this.color = "hsla(" + hue + ",100%,50%,1)";
        this.counted = false;
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, 0, this.width, this.top);
        ctx.fillRect(this.x, canvas.height - this.bottom, this.width, this.bottom);

    }
    update() {
        this.x -= gameSpeed;
        this.draw();
        //score increasing
        if (!this.counted && this.x < bird.x) {
            score++;
            this.counted = true;
        }
    }
}

function handleObstacles() {

    if (frame % 150 === 0) {
        obstaclesArray.unshift(new Obstacle);
        //Score increment
        //score += 1;
    }
    for (i = 0; i < obstaclesArray.length; i++) {
        obstaclesArray[i].update();
    }
    if (obstaclesArray.length > 20) {
        obstaclesArray.pop(obstaclesArray[0]);
    }
}
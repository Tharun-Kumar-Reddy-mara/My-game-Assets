const waterArray = [];
class Water {
    constructor() {
        this.bottom = Math.random() * (canvas.height / 3);
        this.size = (Math.random() * 7) + 45;
        this.x = canvas.width;
        this.waterColor = "skyblue"
    }
    draw() {
        //water graphics
        ctx.fillStyle = this.waterColor;
        ctx.beginPath();
        ctx.arc(this.x, canvas.height - this.bottom + 220, this.size, 0, Math.PI * 2);
        ctx.fill();

    }
    update() {
        this.x -= gameSpeed;
        this.draw();
    }
}

function handleWater() {

    waterArray.unshift(new Water);
    for (i = 0; i < waterArray.length; i++) {
        waterArray[i].update();
    }
}
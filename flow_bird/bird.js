const birdSprite = new Image();
birdSprite.src = "spritesheet.png";

class Bird {
    constructor() {
        this.x = 250;
        this.y = 200;
        this.vy = 0;
        this.originalWidth = 3764 / 4;
        this.originalHeight = 680;
        this.width = this.originalWidth / 20;
        this.height = this.originalHeight / 20;
        this.weight = 1;
        this.frameX = 0;
    }
    update() {
        let curve = Math.sin(angle) * 20;

        if (this.y > Canvas.height - (this.height * 3)) {
            this.y = Canvas.height - (this.height * 3) + curve;
            this.vy = 0;
        } else {
            this.vy += this.weight;
            this.vy *= 0.9;
            this.y += this.vy;
        }
        if (this.y < 0 + this.height) {
            this.y = 0 + this.height;
            this.vy = 0;
        }
        if (spacePressed && this.y > this.height * 2) {
            this.flap();
        }
    }
    draw() {
        ctx.fillStyle = "pink";
        //ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(birdSprite, this.frameX * this.originalWidth, 0, this.originalWidth, this.originalHeight, this.x - 30, this.y - 12.5, this.width * 1.7, this.height * 1.7);
    }
    flap() {
        this.vy -= 2;
        if (this.frameX >= 4) {
            this.frame.x = 0;
        } else if (this.frameX % 2 === 0) {
            this.frameX++;
        }
    }
}

const bird = new Bird();
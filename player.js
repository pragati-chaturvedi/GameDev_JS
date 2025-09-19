import { Sitting, Running, Jumping, Falling, Rolling } from './playerState.js';
export class Player {
    constructor(game) {
        this.game = game;
        this.height = 91.3;
        this.width = 100;
        this.x = 0;
        this.y = this.game.height - this.height - this.game.groundMargin;
        this.image = document.getElementById("player");
        this.speedX = 0;
        this.speedY = 0;
        this.maxSpeed = 10;
        this.weight = 1;
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrame;
        this.fps = 20;
        this.frameInterval = 1000 / this.fps;
        this.frameTimer = 0;
        this.states = [new Sitting(this.game), new Running(this.game), new Jumping(this.game), new Falling(this.game), new Rolling(this.game)];
    }

    draw(context) {
        if (this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height);
        // drawImage arguments - image, source_image_x, source_image_y, source_image_height, canvas_x, canvas_y, canvas_width, canvas_height
        context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
    }

    update(input, deltaTime) {
        this.checkCollision();
        this.currentState.handleInput(input);
        // Horizontal Movement
        this.x += this.speedX;
        if (input.includes("ArrowRight")) this.speedX = this.maxSpeed;
        else if (input.includes("ArrowLeft")) this.speedX = -this.maxSpeed;
        else this.speedX = 0;

        // condition to keep player inside game area
        if (this.x < 0) this.x = 0;
        if (this.x > this.game.width - this.width) this.x = this.game.width - this.width;

        //vertical Movement
        this.y += this.speedY;
        if (!this.onGround()) this.speedY += this.weight;
        else this.speedY = 0;

        // sprite animation

        if (this.frameTimer > this.frameInterval) {
            this.frameTimer -= this.frameInterval;
            if (this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = 0;
        } else {
            this.frameTimer += deltaTime;
        }

    }

    onGround() {
        return this.y >= this.game.height - this.height - this.game.groundMargin;
    }

    setState(state, speed) {
        this.currentState = this.states[state];
        this.game.speed = this.game.maxSpeed * speed;
        this.currentState.enter();
    }

    checkCollision() {
        this.game.enemies.forEach(enemy => {
            if (
                enemy.x < this.x + this.width &&
                enemy.x + enemy.width > this.x &&
                enemy.y < this.y + this.height &&
                enemy.y + enemy.height > this.y
            ) {
                //collision detected
                enemy.markedForDeletion = true;
                this.game.score++;
            } else {
                //no collision
            }
        })
    }
}
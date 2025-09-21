import { Player } from "./player.js";
import { InputHandler } from "./input.js";
import { Background } from "./background.js";
import { FlyingEnemy, GroundEnemy, ClimbingEnemy } from "./enemy.js";
import { UI } from './UI.js';


window.addEventListener('load', function () {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = 900;
    canvas.height = 500;

    class Game {
        constructor(width, height) {
            this.width = width;
            this.height = height;
            this.groundMargin = 80;
            this.speed = 0;
            this.maxSpeed = 3;
            this.background = new Background(this);
            this.player = new Player(this);
            this.input = new InputHandler(this);
            this.UI = new UI(this);
            this.enemies = [];
            this.particles = [];
            this.collisions = [];
            this.floatingMessages = [];
            this.maxParticles = 100;
            this.enemyTimer = 0;
            this.enemyInterval = 1000;
            this.debug = false;
            this.score = 0;
            this.powerMode = 100;
            this.fontColor = 'black';
            this.time = 0;
            this.maxTime = 30000;
            this.winningScore = 40;
            this.gameOver = false;
            this.lives = 3;
            this.player.currentState = this.player.states[0];
            this.player.currentState.enter();
            this.sound = new Audio();
            this.sound.src = 'assets/sound/game_music.wav';
            this.sound.loop = true;
        }
        restart() {
            this.player.reset();
            this.enemies = [];
            this.particles = [];
            this.collisions = [];
            this.floatingMessages = [];
            this.enemyTimer = 0;
            this.enemyInterval = 1000;
            this.debug = false;
            this.score = 0;
            this.powerMode = 100;
            this.fontColor = 'black';
            this.time = 0;
            this.gameOver = false;
            this.lives = 3;
            this.player.currentState = this.player.states[0];
            this.player.currentState.enter();
        }
        restartGame() {
            this.restart();
            animate(0);
        }
        draw(context) {
            this.background.draw(context);
            this.player.draw(context);
            this.enemies.forEach(enemy => {
                enemy.draw(context);
            });
            this.particles.forEach(particle => {
                particle.draw(context);
            });
            this.collisions.forEach(collision => {
                collision.draw(context);
            });
            this.floatingMessages.forEach((message) => {
                message.draw(context);
            });
            this.UI.draw(context);
        }

        update(deltaTime) {
            this.sound.play().catch(() => { });

            // Time based game over logic
            this.time += deltaTime;
            if (this.time > this.maxTime) this.gameOver = true;
            if (this.player.currentState !== this.player.states[4] && this.powerMode < 100) this.powerMode += 0.3;

            this.background.update();
            this.player.update(this.input.keys, deltaTime);

            // handle Enemies
            if (this.enemyTimer > this.enemyInterval) {
                this.addEnemy();
                this.enemyTimer = 0;
            } else {
                this.enemyTimer += deltaTime;
            }

            this.enemies.forEach(enemy => {
                enemy.update(deltaTime);
            });

            // handle floating messages
            this.floatingMessages.forEach((message) => {
                message.update();
            });

            // handle collision sprites
            this.collisions.forEach((collision, index) => {
                collision.update(deltaTime);
            });

            // handle particles
            this.particles.forEach((particle, index) => {
                particle.update();
            });
            if (this.particles.length > this.maxParticles) {
                this.particles.length = this.maxParticles;
            }

            // deletion
            this.enemies = this.enemies.filter(enemy => !enemy.markedForDeletion);
            this.floatingMessages = this.floatingMessages.filter(message => !message.markedForDeletion);
            this.collisions = this.collisions.filter(collision => !collision.markedForDeletion);
            this.particles = this.particles.filter(particle => !particle.markedForDeletion);
        }

        addEnemy() {
            if (this.speed > 0 && Math.random() < 0.5) this.enemies.push(new GroundEnemy(this));
            else if (this.speed > 0) this.enemies.push(new ClimbingEnemy(this));

            this.enemies.push(new FlyingEnemy(this));
            // console.log(this.enemies);
        }
    }

    const game = new Game(canvas.width, canvas.height);
    // console.log(game);
    let lastTime = 0;
    const maxFPS = 60;
    const frameInterval = 1000 / maxFPS;

    function animate(timeStamp) {
        const deltaTime = timeStamp - lastTime;
        if (deltaTime >= frameInterval) {
            lastTime = timeStamp - (deltaTime % frameInterval);

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            game.gameFrame++;
            game.update(deltaTime);
            game.draw(ctx);
        }
        if (!game.gameOver) requestAnimationFrame(animate);
    }
    animate(0);
});
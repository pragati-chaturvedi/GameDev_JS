export class UI {
    constructor(game) {
        this.game = game;
        this.fontSize = 30;
        this.fontFamily = 'Creepster';
        this.livesImage = document.getElementById('lives');
        this.livesImageWidth = 25;
        this.livesImageHeight = 25;
        this.powerGridWidth = 100;
    }

    draw(context) {
        context.save();
        // shadow effect on text
        context.shadowOffsetX = 2;
        context.shadowOffsetY = 2;
        context.shadowColor = 'white';
        context.shadowBlur = 0;
        context.font = this.fontSize + 'px ' + this.fontFamily;
        context.textAlign = 'left';
        context.fillStyle = this.game.fontColor;
        // score
        context.fillText("Score: " + this.game.score, 20, 50);
        // timer 
        context.font = this.fontSize * 0.8 + 'px ' + this.fontFamily;
        context.fillText('Time: ' + (this.game.time * 0.001).toFixed(1), 20, 80);
        // lives
        for (let i = 0; i < this.game.lives; i++) {
            const imagePos = (this.game.width - this.livesImageWidth - 20) - this.livesImageWidth * i;
            context.drawImage(this.livesImage, imagePos, 25, this.livesImageWidth, this.livesImageWidth);
        }

        // power mode grid
        context.lineWidth = 2;
        context.strokeStyle = 'black';
        context.fillRect(this.game.width - this.powerGridWidth - 20, 70, this.powerGridWidth, 20);
        context.fillStyle = '#e0cb2bff';
        context.fillRect(this.game.width - this.powerGridWidth - 20, 70, this.game.powerMode, 20);
        context.fillStyle = 'black';

        // ===== How to play overlay BEFORE game starts =====
        if (!this.game.gameStarted && !this.game.gameOver) {
            context.textAlign = 'center';
            context.shadowColor = '#646464ff';
            context.fillStyle = 'white';
            context.font = this.fontSize * 2 + 'px ' + this.fontFamily;
            context.fillText('How to play', this.game.width * 0.5, this.game.height * 0.25);
            context.font = this.fontSize * 0.7 + 'px ' + this.fontFamily;
            context.fillStyle = '#dc6300ff';
            context.shadowColor = '#646464ff';
            context.fillText('⬅ ➡ : Move', this.game.width * 0.5, this.game.height * 0.25 + 30);
            context.fillText('⬆ : Jump', this.game.width * 0.5, this.game.height * 0.25 + 60);
            context.fillText('⬇ : Sit (ground) / Dive (air)', this.game.width * 0.5, this.game.height * 0.25 + 90);
            context.fillText('Shift (hold): Roll / Power Mode', this.game.width * 0.5, this.game.height * 0.25 + 120);
            context.fillText('Collect points by hitting enemies while rolling/diving', this.game.width * 0.5, this.game.height * 0.25 + 150);
            context.fillText('Avoid hits or you lose lives.', this.game.width * 0.5, this.game.height * 0.25 + 180);
            context.fillText("Try to score your best in 30 seconds !", this.game.width * 0.5, this.game.height * 0.25 + 210);
            context.fillText("Press any key or Touch screen to start", this.game.width * 0.5, this.game.height * 0.25 + 240);
            context.fillStyle = 'black';
        }

        // game over message
        if (this.game.gameOver) {
            context.textAlign = 'center';
            context.font = this.fontSize * 2 + 'px ' + this.fontFamily;
            if (this.game.score > this.game.winningScore) {
                //win condition message
                context.fillText('Boo-yah', this.game.width * 0.5, this.game.height * 0.5 - 20);
                context.font = this.fontSize * 0.7 + 'px ' + this.fontFamily;
                context.fillText('What are the creatures of the night afraid of? YOU!!!', this.game.width * 0.5, this.game.height * 0.5 + 20);
                context.fillText('To play again press Enter', this.game.width * 0.5, this.game.height * 0.5 + 50);
            } else {
                // Loose condition message
                context.fillText('Love at first bite?', this.game.width * 0.5, this.game.height * 0.5 - 20);
                context.font = this.fontSize * 0.7 + 'px ' + this.fontFamily;
                context.fillText("Nope. Better luck next time! Press 'Enter' to replay", this.game.width * 0.5, this.game.height * 0.5 + 20);
            }
        }
        context.restore();
    }
}
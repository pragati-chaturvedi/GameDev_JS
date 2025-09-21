export class InputHandler {
    constructor(game) {
        this.game = game;
        this.keys = [];
        window.addEventListener("keydown", (e) => {
            if ((e.key === "ArrowLeft" ||
                e.key === "ArrowRight" ||
                e.key === "ArrowUp" ||
                e.key === "ArrowDown" ||
                e.key === "Shift"
            ) && this.keys.indexOf(e.key) === -1) {
                this.keys.push(e.key)
            } else if (e.key === 'Enter' && this.game.gameOver) this.game.restartGame();
        });

        window.addEventListener("keyup", (e) => {
            if (e.key === "ArrowLeft" ||
                e.key === "ArrowRight" ||
                e.key === "ArrowUp" ||
                e.key === "ArrowDown" ||
                e.key === "Shift"
            ) {
                this.keys.splice(this.keys.indexOf(e.key), 1);
            }
        });
        window.addEventListener('touchstart', (e) => {
            console.log('start');
        });
        window.addEventListener('touchmove', (e) => {
            console.log('move');
        });
        window.addEventListener('touchend', (e) => {
            console.log('end');
        });
    }
}
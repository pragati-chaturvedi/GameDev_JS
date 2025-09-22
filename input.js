export class InputHandler {
    constructor(game) {
        this.game = game;
        this.keys = [];
        this.touchY = '';
        this.touchThreshold = 30;
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

        // Calculated touch start coordinates at touchstart event
        window.addEventListener('touchstart', (e) => {
            this.touchY = e.changedTouches[0].pageY;
        });
        // determined touch movement direction for swipe up and down
        window.addEventListener('touchmove', (e) => {
            const swipeDistance = e.changedTouches[0].pageY - this.touchY;
            if (swipeDistance < -this.touchThreshold && this.keys.indexOf('swipe up') === -1) this.keys.push('swipe up');
            else if (swipeDistance > this.touchThreshold && this.keys.indexOf('swipe down') === -1) this.keys.push('swipe down');
        });
        //cleaned up touch keys on touchend event
        window.addEventListener('touchend', (e) => {
            this.keys.splice(this.keys.indexOf('swipe up'), 1);
            this.keys.splice(this.keys.indexOf('swipe down'), 1);
        });
    }
}
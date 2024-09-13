class Timer {
    constructor() {
        this.delayTimer = 0;
        this.soundTimer = 0;
        this.interval = setInterval(this.update.bind(this), 16); // Update every 16 ms
    }

    update() {
        if (this.delayTimer > 0) this.delayTimer--;
        if (this.soundTimer > 0) {
            if (this.soundTimer === 1) {
                let audio = new Audio('beep.mp3');
                audio.play(); // Play sound when timer reaches 1
            }
            this.soundTimer--;
        }
    }
    
}

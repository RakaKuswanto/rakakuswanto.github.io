class Input {
    constructor() {
        this.keys = new Array(16).fill(false);

        // Keyboard event listener
        document.addEventListener('keydown', (event) => {
            const keyMap = {
                '1': 0x1, '2': 0x2, '3': 0x3, '4': 0xC,
                'Q': 0x4, 'W': 0x5, 'E': 0x6, 'R': 0xD,
                'A': 0x7, 'S': 0x8, 'D': 0x9, 'F': 0xE,
                'Z': 0xA, 'X': 0x0, 'C': 0xB, 'V': 0xF
            };
            if (keyMap[event.key.toUpperCase()] !== undefined) {
                this.keys[keyMap[event.key.toUpperCase()]] = true;
            }
        });

        document.addEventListener('keyup', (event) => {
            const keyMap = {
                '1': 0x1, '2': 0x2, '3': 0x3, '4': 0xC,
                'Q': 0x4, 'W': 0x5, 'E': 0x6, 'R': 0xD,
                'A': 0x7, 'S': 0x8, 'D': 0x9, 'F': 0xE,
                'Z': 0xA, 'X': 0x0, 'C': 0xB, 'V': 0xF
            };
            if (keyMap[event.key.toUpperCase()] !== undefined) {
                this.keys[keyMap[event.key.toUpperCase()]] = false;
            }
        });

        // Touchscreen event listener
        const touchButtons = document.querySelectorAll('.touch-btn');
        touchButtons.forEach(button => {
            const key = parseInt(button.getAttribute('data-key'), 16);

            button.addEventListener('touchstart', () => {
                this.keys[key] = true;
            });

            button.addEventListener('touchend', () => {
                this.keys[key] = false;
            });
        });
    }

    isKeyPressed(key) {
        return this.keys[key];
    }
}

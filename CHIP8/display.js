class Display {
    constructor(context) {
        this.context = context;
        this.width = 64;  // CHIP-8 display width
        this.height = 32; // CHIP-8 display height
        this.pixels = new Uint8Array(this.width * this.height); // Pixel array
    }

    // Clear the display by setting all pixels to 0 and redrawing the screen
    clear() {
        this.pixels.fill(0);
        this.render();
    }

    // Draw a sprite on the display, returns true if any pixel was flipped
    drawSprite(x, y, spriteData) {
        let collision = false;
        for (let row = 0; row < spriteData.length; row++) {
            let sprite = spriteData[row];
            for (let col = 0; col < 8; col++) {
                if ((sprite & (0x80 >> col)) !== 0) {
                    const posX = (x + col) % this.width;
                    const posY = (y + row) % this.height;
                    const pixelIndex = posX + (posY * this.width);

                    // Check for collision and update the pixel
                    if (this.pixels[pixelIndex] === 1) {
                        collision = true;
                    }
                    this.pixels[pixelIndex] ^= 1; // XOR with the pixel data
                }
            }
        }
        this.render(); // Re-render after drawing the sprite
        return collision;
    }

    // Render the pixel array on the canvas
    render() {
        const imageData = this.context.createImageData(this.width, this.height);
        for (let i = 0; i < this.pixels.length; i++) {
            const pixel = this.pixels[i] ? 255 : 0;
            imageData.data[i * 4 + 0] = pixel; // R
            imageData.data[i * 4 + 1] = pixel; // G
            imageData.data[i * 4 + 2] = pixel; // B
            imageData.data[i * 4 + 3] = 255;   // A
        }
        this.context.putImageData(imageData, 0, 0);
    }
}

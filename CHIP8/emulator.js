class Emulator {

    constructor(context) { 
        this.display = new Display(context);
        this.memory = new Memory();
        this.timer = new Timer();
        this.input = new Input(); // Inisialisasi input
        this.cpu = new CPU(this.display, this.memory, this.timer, this.input); // Pass input to CPU

        this.paused = false;
        this.stepMode = false;
    }    

    loadROM(romData) {
        try {
            if (romData instanceof Uint8Array) {
                this.memory.load(romData);
                console.log("ROM loaded successfully.");
            } else {
                throw new Error("Invalid ROM data format.");
            }
        } catch (error) {
            console.error("Failed to load ROM:", error.message);
        }
    }

    loadBytecode(bytecode) {
        try {
            this.memory.loadBytecode(bytecode);
            console.log("Bytecode loaded successfully.");
        } catch (error) {
            console.error("Failed to load bytecode:", error.message);
        }
    }

    updateMemory(startAddress, byteArray) {
        this.memory.updateMemoryBlock(startAddress, byteArray);
    }

    getMemoryBlock(startAddress, length) {
        return this.memory.getMemoryBlock(startAddress, length);
    }

    start() {
        this.emulationLoop();
    }

    emulationLoop() {
        if (!this.paused) {
            this.cpu.cycle(); // Continue cycling through CPU instructions
            this.timer.update(); // Ensure the timers are updated
            this.display.render(); // Redraw the display
        }
        if (!this.stepMode) {
            requestAnimationFrame(() => this.emulationLoop()); // Continue the loop
        }
        this.updateDebugInfo(); // Update debugger information if any
    }    

    step() {
        // Eksekusi satu siklus CPU
        this.cpu.cycle(); 
    
        // Perbarui timer setelah siklus berjalan
        this.timer.update();
    
        // Render display untuk memperbarui layar
        this.display.render(); 
    
        // Highlight posisi PC di tampilan memori setelah diperbarui
        let pc = this.cpu.PC;
        $('#memory-content tr').removeClass('highlight');
        $(`#memory-content tr[data-address='0x${pc.toString(16).padStart(3, '0')}']`).addClass('highlight');

        this.updateDebugInfo();
    }       

    toggleStepMode() {
        this.stepMode = !this.stepMode;
    }

    pause() {
        this.paused = true;
    }

    resume() {
        this.paused = false;
        this.emulationLoop();
    }

    reset() {
        this.display.clear(); // Clear the display
        this.memory = new Memory(); // Reinitialize memory
        this.timer = new Timer(); // Reset the timer
        this.input = new Input(); // Reset input
        this.cpu = new CPU(this.display, this.memory, this.timer, this.input); // Pass input to CPU
        this.paused = true; // Pause the emulation after resetting
    }    

    updateDebugInfo() {
        $('#debug-pc').text(`0x${this.cpu.PC.toString(16).padStart(3, '0')}`);
        $('#debug-sp').text(`0x${this.cpu.SP.toString(16).padStart(2, '0')}`);
        $('#debug-i').text(`0x${this.cpu.I.toString(16).padStart(3, '0')}`);
        $('#debug-dt').text(`${this.timer.delayTimer}`);
        $('#debug-st').text(`${this.timer.soundTimer}`);
        $('#debug-v').text(`[${this.cpu.V.map(v => `0x${v.toString(16).padStart(2, '0')}`).join(', ')}]`);
        $('#debug-stack').text(`[${this.cpu.stack.map(s => `0x${s.toString(16).padStart(3, '0')}`).join(', ')}]`);
    }

}

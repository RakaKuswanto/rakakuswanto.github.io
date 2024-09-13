class CPU {
    
    constructor(display, memory, timer, input) {
        this.V = new Uint8Array(16); // 16 registers, V0 - VF
        this.I = 0; // Index register
        this.PC = 0x200; // Program Counter starts at 0x200
        this.memory = memory; // Use shared memory object
        this.timer = timer;
        this.input = input;
        this.stack = [];
        this.SP = 0; // Stack pointer
        this.speed = 10;
        this.display = display; // Display passed from emulator
        this.paused = false;

        this.breakpoints = new Set(); // Menyimpan alamat breakpoints
        this.breakpointHit = false;
    }    

    cycle() {
        if (this.breakpoints.has(this.PC)) {
            this.breakpointHit = true;
            console.log(`Breakpoint hit at: 0x${this.PC.toString(16)}`);
            return; // Hentikan eksekusi jika breakpoint ditemukan
        }

        for (let i = 0; i < this.speed; i++) {
            const opcode = (this.memory.memory[this.PC] << 8) | this.memory.memory[this.PC + 1]; // Fetch opcode
            this.PC += 2;
            this.executeOpcode(opcode); // Decode and execute opcode
        }
    }

    addBreakpoint(address) {
        this.breakpoints.add(address);
        console.log(`Breakpoint added at: 0x${address.toString(16)}`);
    }

    removeBreakpoint(address) {
        this.breakpoints.delete(address);
        console.log(`Breakpoint removed at: 0x${address.toString(16)}`);
    }

    executeOpcode(opcode) {
        const x = (opcode & 0x0F00) >> 8;
        const y = (opcode & 0x00F0) >> 4;
        const n = opcode & 0x000F;
        const nn = opcode & 0x00FF;
        const nnn = opcode & 0x0FFF;

        console.log(`PC: 0x${this.PC.toString(16)}, Opcode: 0x${opcode.toString(16)}`); // Logging
        this.updateOpcodeLog(opcode, this.PC);

        switch (opcode & 0xF000) {
            case 0x0000:
                switch (opcode) {
                    case 0x00E0: // CLS - Clear the display
                        this.display.clear();
                        break;
                    case 0x00EE: // RET - Return from subroutine
                        this.PC = this.stack.pop();
                        break;
                }
                break;
            case 0x1000: // JP addr - Jump to location nnn
                this.PC = nnn;
                break;
            case 0x2000: // CALL addr - Call subroutine at nnn
                this.stack.push(this.PC);
                this.PC = nnn;
                break;
            case 0x3000: // SE Vx, byte - Skip next instruction if Vx == nn
                if (this.V[x] === nn) this.PC += 2;
                break;
            case 0x4000: // SNE Vx, byte - Skip next instruction if Vx != nn
                if (this.V[x] !== nn) this.PC += 2;
                break;
            case 0x5000: // SE Vx, Vy - Skip next instruction if Vx == Vy
                if (this.V[x] === this.V[y]) this.PC += 2;
                break;
            case 0x6000: // LD Vx, byte - Set Vx = nn
                this.V[x] = nn;
                break;
            case 0x7000: // ADD Vx, byte - Set Vx = Vx + nn
                this.V[x] = (this.V[x] + nn) & 0xFF;
                break;
            case 0x8000:
                switch (n) {
                    case 0x0: // LD Vx, Vy - Set Vx = Vy
                        this.V[x] = this.V[y];
                        break;
                    case 0x1: // OR Vx, Vy - Set Vx = Vx OR Vy
                        this.V[x] |= this.V[y];
                        break;
                    case 0x2: // AND Vx, Vy - Set Vx = Vx AND Vy
                        this.V[x] &= this.V[y];
                        break;
                    case 0x3: // XOR Vx, Vy - Set Vx = Vx XOR Vy
                        this.V[x] ^= this.V[y];
                        break;
                    case 0x4: // ADD Vx, Vy - Set Vx = Vx + Vy, set VF = carry
                        const sum = this.V[x] + this.V[y];
                        this.V[0xF] = sum > 0xFF ? 1 : 0;
                        this.V[x] = sum & 0xFF;
                        break;
                    case 0x5: // SUB Vx, Vy - Set Vx = Vx - Vy, set VF = NOT borrow
                        this.V[0xF] = this.V[x] > this.V[y] ? 1 : 0;
                        this.V[x] = (this.V[x] - this.V[y]) & 0xFF;
                        break;
                    case 0x6: // SHR Vx {, Vy} - Set Vx = Vx SHR 1
                        this.V[0xF] = this.V[x] & 0x1;
                        this.V[x] >>= 1;
                        break;
                    case 0x7: // SUBN Vx, Vy - Set Vx = Vy - Vx, set VF = NOT borrow
                        this.V[0xF] = this.V[y] > this.V[x] ? 1 : 0;
                        this.V[x] = (this.V[y] - this.V[x]) & 0xFF;
                        break;
                    case 0xE: // SHL Vx {, Vy} - Set Vx = Vx SHL 1
                        this.V[0xF] = (this.V[x] & 0x80) >> 7;
                        this.V[x] = (this.V[x] << 1) & 0xFF;
                        break;
                }
                break;
            case 0x9000: // SNE Vx, Vy - Skip next instruction if Vx != Vy
                if (this.V[x] !== this.V[y]) this.PC += 2;
                break;
            case 0xA000: // LD I, addr - Set I = nnn
                this.I = nnn;
                break;
            case 0xB000: // JP V0, addr - Jump to location nnn + V0
                this.PC = nnn + this.V[0];
                break;
            case 0xC000: // RND Vx, byte - Set Vx = random byte AND nn
                this.V[x] = (Math.floor(Math.random() * 0xFF) & nn);
                break;
            case 0xD000: // DRW Vx, Vy, nibble - Display n-byte sprite at (Vx, Vy)
                const spriteData = this.memory.memory.slice(this.I, this.I + n); // Get sprite data from memory
                const collision = this.display.drawSprite(this.V[x], this.V[y], spriteData); // Draw sprite
                this.V[0xF] = collision ? 1 : 0; // Set VF flag if collision occurred
                break;
            case 0xE000:
                switch (nn) {
                    case 0x9E: // SKP Vx - Skip next instruction if key with the value of Vx is pressed
                        if (this.input.keys[this.V[x]]) this.PC += 2;
                        break;
                    case 0xA1: // SKNP Vx - Skip next instruction if key with the value of Vx is not pressed
                        if (!this.input.keys[this.V[x]]) this.PC += 2;
                        break;
                }
                break;                
            case 0xF000:
                switch (nn) {
                    case 0x07: // LD Vx, DT - Set Vx = delay timer value
                        this.V[x] = this.timer.delayTimer;
                        break;
                    case 0x0A: // LD Vx, K - Wait for a key press, store the value of the key in Vx
                        if (!this.paused) {
                            this.paused = true;
                            console.log('Waiting for key press...');
                        }
                        
                        // Check if any key is pressed using the Input class
                        for (let i = 0; i < this.input.keys.length; i++) {
                            if (this.input.keys[i]) {
                                this.V[x] = i; // Store the key index in register Vx
                                this.paused = false; // Unpause the CPU
                                console.log(`Key pressed: ${i}`);
                                break;
                            }
                        }
                        break;                                       
                    case 0x15: // LD DT, Vx - Set delay timer = Vx
                        this.timer.delayTimer = this.V[x];
                        break;
                    case 0x18: // LD ST, Vx - Set sound timer = Vx
                        this.timer.soundTimer = this.V[x];
                        break;
                    case 0x1E: // ADD I, Vx - Set I = I + Vx
                        this.I = (this.I + this.V[x]) & 0xFFF;
                        break;
                    case 0x29: // LD F, Vx - Set I = location of sprite for digit Vx
                        this.I = 0x50 + (this.V[x] * 5);
                        break;
                    case 0x33: // LD B, Vx - Store BCD representation of Vx in memory locations I, I+1, and I+2
                        this.memory.memory[this.I] = Math.floor(this.V[x] / 100);
                        this.memory.memory[this.I + 1] = Math.floor((this.V[x] / 10) % 10);
                        this.memory.memory[this.I + 2] = this.V[x] % 10;
                        break;
                    case 0x55: // LD [I], Vx - Store registers V0 through Vx in memory starting at location I
                        for (let i = 0; i <= x; i++) {
                            this.memory.memory[this.I + i] = this.V[i];
                        }
                        break;
                    case 0x65: // LD Vx, [I] - Read registers V0 through Vx from memory starting at location I
                        for (let i = 0; i <= x; i++) {
                            this.V[i] = this.memory.memory[this.I + i];
                        }
                        break;
                }
                break;
            default:
                console.error(`Unknown opcode: ${opcode.toString(16)}`);
        }
    }

    updateOpcodeLog(opcode, pc) {
        const logItem = document.createElement('li');
        logItem.textContent = `PC: 0x${pc.toString(16).padStart(3, '0')}, Opcode: 0x${opcode.toString(16).padStart(4, '0')}`;
        document.getElementById('opcode-list').appendChild(logItem);
    }

}

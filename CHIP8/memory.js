class Memory {
    constructor() {
        this.memory = new Uint8Array(4096); // 4 KB memory

        // Load fontset (standard CHIP-8 fontset)
        this.fontset = [
            0xF0, 0x90, 0x90, 0x90, 0xF0, // 0
            0x20, 0x60, 0x20, 0x20, 0x70, // 1
            0xF0, 0x10, 0xF0, 0x80, 0xF0, // 2
            0xF0, 0x10, 0xF0, 0x10, 0xF0, // 3
            0x90, 0x90, 0xF0, 0x10, 0x10, // 4
            0xF0, 0x80, 0xF0, 0x10, 0xF0, // 5
            0xF0, 0x80, 0xF0, 0x90, 0xF0, // 6
            0xF0, 0x10, 0x20, 0x40, 0x40, // 7
            0xF0, 0x90, 0xF0, 0x90, 0xF0, // 8
            0xF0, 0x90, 0xF0, 0x10, 0xF0, // 9
            0xF0, 0x90, 0xF0, 0x90, 0x90, // A
            0xE0, 0x90, 0xE0, 0x90, 0xE0, // B
            0xF0, 0x80, 0x80, 0x80, 0xF0, // C
            0xE0, 0x90, 0x90, 0x90, 0xE0, // D
            0xF0, 0x80, 0xF0, 0x80, 0xF0, // E
            0xF0, 0x80, 0xF0, 0x80, 0x80  // F
        ];

        // Load fontset into memory (starting at 0x50)
        for (let i = 0; i < this.fontset.length; i++) {
            this.memory[0x50 + i] = this.fontset[i];
        }
    }

    load(data) {
        // Load the data into memory starting at address 0x200
        this.memory.set(data, 0x200);
    }

    loadBytecode(bytecode) {
        if (bytecode instanceof Uint8Array) {
            this.load(bytecode);
        } else {
            throw new Error("Invalid bytecode format. Must be a Uint8Array.");
        }
    }

    // Add a method to manually update a block of memory
    updateMemoryBlock(startAddress, byteArray) {
        if (startAddress >= 0 && startAddress + byteArray.length <= this.memory.length) {
            for (let i = 0; i < byteArray.length; i++) {
                this.memory[startAddress + i] = byteArray[i];
            }
        } else {
            throw new Error("Invalid memory range.");
        }
    }

    // Add a method to get memory block for displaying or editing purposes
    getMemoryBlock(startAddress, length) {
        return this.memory.slice(startAddress, startAddress + length);
    }

}

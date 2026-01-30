import { Course } from '@/types';

export const courses: Course[] = [
  {
    id: 'sc1006',
    code: 'SC1006',
    name: 'Computer Organization & Architecture',
    description: 'Fundamentals of computer architecture including ARM assembly programming, addressing modes, cache memory, and virtual memory.',
    topics: [
      {
        id: 'arm-programmers-model',
        courseId: 'sc1006',
        name: 'ARM Programmer\'s Model',
        order: 1,
        prerequisites: [],
        summary: `The ARM processor is a 32-bit RISC (Reduced Instruction Set Computer) architecture widely used in embedded systems and mobile devices.

ARM Registers:
- R0-R12: General-purpose registers for data and addresses
- R13 (SP): Stack Pointer - points to top of stack
- R14 (LR): Link Register - stores return address for function calls
- R15 (PC): Program Counter - holds address of next instruction to execute

Current Program Status Register (CPSR):
Contains condition flags that reflect the result of operations:
- N (Negative): Set if result is negative (bit 31 = 1)
- Z (Zero): Set if result is zero
- C (Carry): Set if operation produced a carry/borrow
- V (Overflow): Set if signed overflow occurred

Instruction Cycle:
1. Fetch: Read instruction from memory at PC address
2. Decode: Interpret the instruction
3. Execute: Perform the operation
4. PC is automatically incremented to point to the next instruction`,
        keyPoints: [
          'ARM has 16 registers (R0-R15), with R13-R15 having special purposes',
          'PC (R15) contains address of instruction being fetched (current + 8 in ARM mode)',
          'CPSR flags: N (negative), Z (zero), C (carry), V (overflow)',
          'All instructions are 32 bits in ARM mode',
          'Fetch-Decode-Execute cycle processes each instruction'
        ],
        codeExamples: [
          {
            title: 'Basic ARM Register Operations',
            language: 'arm',
            code: `MOV R0, #10      ; R0 = 10
MOV R1, #20      ; R1 = 20
ADD R2, R0, R1   ; R2 = R0 + R1 = 30
SUB R3, R1, R0   ; R3 = R1 - R0 = 10

; After ADD where result is 30:
; N=0 (positive), Z=0 (not zero), C=0, V=0`,
            explanation: 'Basic MOV and arithmetic operations. MOV copies a value into a register. ADD and SUB perform arithmetic and can set CPSR flags.'
          }
        ],
        resources: [
          {
            title: 'Writing ARM Assembly (Part 1)',
            url: 'https://azeria-labs.com/writing-arm-assembly-part-1/',
            type: 'tutorial',
            source: 'Azeria Labs'
          },
          {
            title: 'ARM Assembly By Example',
            url: 'https://armasm.com/',
            type: 'tutorial',
            source: 'armasm.com'
          },
          {
            title: 'Introduction to ARM Assembly',
            url: 'https://cburch.com/books/arm/',
            type: 'documentation',
            source: 'cburch.com'
          }
        ]
      },
      {
        id: 'addressing-modes',
        courseId: 'sc1006',
        name: 'Addressing Modes',
        order: 2,
        prerequisites: [],
        summary: `Addressing modes specify how to access operands in memory or registers. Different modes offer tradeoffs between flexibility and instruction size.

Register Direct:
Operand is in a register.
\`\`\`
ADD R0, R1, R2   ; R0 = R1 + R2
\`\`\`

Immediate:
Operand is a constant value embedded in the instruction.
\`\`\`
MOV R0, #100     ; R0 = 100
ADD R1, R0, #5   ; R1 = R0 + 5
\`\`\`

Register Indirect with Offset:
Memory address = base register + offset.
\`\`\`
LDR R0, [R1, #4]   ; R0 = Memory[R1 + 4]
STR R0, [R1, #8]   ; Memory[R1 + 8] = R0
\`\`\`

Register Indirect with Index:
Memory address = base register + index register.
\`\`\`
LDR R0, [R1, R2]   ; R0 = Memory[R1 + R2]
\`\`\`

Pre-indexing (Update before access):
\`\`\`
LDR R0, [R1, #4]!  ; R1 = R1 + 4, then R0 = Memory[R1]
\`\`\`

Post-indexing (Update after access):
\`\`\`
LDR R0, [R1], #4   ; R0 = Memory[R1], then R1 = R1 + 4
\`\`\``,
        keyPoints: [
          'Register direct: operand in register (fastest)',
          'Immediate: constant value in instruction (#value)',
          'Register indirect: [Rn] accesses memory at address in Rn',
          'Offset: [Rn, #offset] adds constant to base address',
          'Pre-index (!): updates base before access',
          'Post-index: updates base after access'
        ],
        codeExamples: [
          {
            title: 'Memory Access with Different Modes',
            language: 'arm',
            code: `; Assume R1 = 0x1000 (base address)

; Offset mode - R1 unchanged
LDR R0, [R1, #4]    ; Load from 0x1004, R1 still 0x1000

; Pre-index mode - R1 updated first
LDR R0, [R1, #4]!   ; R1 = 0x1004, then load from 0x1004

; Post-index mode - R1 updated after
LDR R0, [R1], #4    ; Load from 0x1000, then R1 = 0x1004`,
            explanation: 'Pre-indexing updates the base register before the memory access; post-indexing updates it after. This is useful for traversing arrays.'
          }
        ],
        resources: [
          {
            title: 'ARM Addressing Modes',
            url: 'https://azeria-labs.com/arm-data-types-and-registers-part-2/',
            type: 'tutorial',
            source: 'Azeria Labs'
          },
          {
            title: 'ARM Instruction Set Reference',
            url: 'https://iitd-plos.github.io/col718/ref/arm-instructionset.pdf',
            type: 'reference',
            source: 'IIT Delhi'
          }
        ]
      },
      {
        id: 'arm-instruction-set',
        courseId: 'sc1006',
        name: 'ARM Instruction Set',
        order: 3,
        prerequisites: [],
        summary: `ARM instructions are categorized into data transfer, arithmetic, logical, and program control operations.

Data Transfer Instructions:
- \`MOV Rd, Op2\`: Copy value to register
- \`LDR Rd, [Rn]\`: Load from memory to register
- \`STR Rd, [Rn]\`: Store from register to memory
- \`LDM\`/\`STM\`: Load/Store multiple registers

Arithmetic Instructions:
- \`ADD Rd, Rn, Op2\`: Rd = Rn + Op2
- \`SUB Rd, Rn, Op2\`: Rd = Rn - Op2
- \`MUL Rd, Rm, Rs\`: Rd = Rm × Rs
- \`CMP Rn, Op2\`: Compare (sets flags, no result stored)

Logical Instructions:
- \`AND Rd, Rn, Op2\`: Bitwise AND
- \`ORR Rd, Rn, Op2\`: Bitwise OR
- \`EOR Rd, Rn, Op2\`: Bitwise XOR (exclusive OR)
- \`BIC Rd, Rn, Op2\`: Bit clear (AND NOT)

Shift/Rotate Operations:
- \`LSL\`: Logical shift left (multiply by 2)
- \`LSR\`: Logical shift right (divide by 2, unsigned)
- \`ASR\`: Arithmetic shift right (preserves sign)
- \`ROR\`: Rotate right

Branch Instructions:
- \`B label\`: Unconditional branch
- \`BL label\`: Branch with link (saves return address in LR)
- \`Bcc label\`: Conditional branch (EQ, NE, GT, LT, etc.)`,
        keyPoints: [
          'LDR/STR for memory access, MOV for register-to-register',
          'ADD/SUB set flags only with S suffix (ADDS, SUBS)',
          'CMP sets flags without storing result',
          'Shifts can be applied to second operand: ADD R0, R1, R2, LSL #2',
          'BL saves return address in LR for function calls',
          'Conditional execution uses CPSR flags from previous operation'
        ],
        codeExamples: [
          {
            title: 'Conditional Branching',
            language: 'arm',
            code: `    MOV R0, #10
    MOV R1, #20
    CMP R0, R1       ; Compare R0 with R1, sets flags
    BEQ equal        ; Branch if R0 == R1 (Z=1)
    BGT greater      ; Branch if R0 > R1 (signed)
    BLT less         ; Branch if R0 < R1 (signed)

less:
    MOV R2, #-1      ; R0 < R1
    B done

equal:
    MOV R2, #0       ; R0 == R1
    B done

greater:
    MOV R2, #1       ; R0 > R1

done:
    ; Continue execution`,
            explanation: 'CMP subtracts R1 from R0 and sets flags. Branch conditions check these flags: EQ (Z=1), GT (Z=0 and N=V), LT (N≠V).'
          },
          {
            title: 'Loop Example - Sum Array',
            language: 'arm',
            code: `    MOV R0, #0       ; sum = 0
    MOV R1, #5       ; count = 5
    LDR R2, =array   ; R2 = address of array

loop:
    LDR R3, [R2], #4 ; Load element, increment pointer
    ADD R0, R0, R3   ; sum += element
    SUBS R1, R1, #1  ; count-- (sets flags)
    BNE loop         ; Branch if count != 0

    ; R0 now contains sum of 5 array elements`,
            explanation: 'SUBS decrements and sets the Z flag when result is zero. BNE (Branch if Not Equal) continues looping while Z=0.'
          }
        ],
        resources: [
          {
            title: 'ARM Instruction Set Tutorial',
            url: 'https://armasm.com/',
            type: 'tutorial',
            source: 'ARM Assembly By Example'
          },
          {
            title: 'ARM Conditional Execution',
            url: 'https://azeria-labs.com/arm-conditional-execution-and-branching-part-6/',
            type: 'tutorial',
            source: 'Azeria Labs'
          }
        ]
      },
      {
        id: 'cache-memory',
        courseId: 'sc1006',
        name: 'Cache Memory',
        order: 4,
        prerequisites: [],
        summary: `Cache is a small, fast memory that stores copies of frequently accessed data from main memory to reduce access time.

Memory Hierarchy:
CPU Registers → L1 Cache → L2 Cache → L3 Cache → Main Memory → Storage
(Fastest/Smallest) ←――――――――――――――――――→ (Slowest/Largest)

Principle of Locality:
- Temporal Locality: Recently accessed data is likely to be accessed again soon
- Spatial Locality: Data near recently accessed data is likely to be accessed soon

Cache Mapping Schemes:

1. Direct Mapped Cache:
- Each memory block maps to exactly one cache line
- Cache line index = (Memory address / Block size) mod (Number of cache lines)
- Simple but can cause conflicts

2. Fully Associative Cache:
- Any memory block can go in any cache line
- Most flexible but expensive to search

3. Set Associative Cache:
- Compromise: memory block maps to a set, can go in any line within that set
- N-way set associative: N lines per set

Cache Performance:
- Hit: Data found in cache (fast)
- Miss: Data not in cache, must fetch from main memory (slow)
- Hit Rate = Hits / (Hits + Misses)`,
        keyPoints: [
          'Cache exploits temporal and spatial locality',
          'Direct mapped: one possible location per block (simple, conflict-prone)',
          'Fully associative: any block can go anywhere (flexible, complex)',
          'Set associative: N choices per block (balanced approach)',
          'Higher hit rate = better performance',
          'Write policies: write-through (immediate) vs write-back (delayed)'
        ],
        codeExamples: [
          {
            title: 'Direct Mapped Cache Address Breakdown',
            language: 'text',
            code: `Memory Address: 32 bits
Cache: 256 lines, 64 bytes per line

Address breakdown:
[   Tag   |  Index  |  Offset  ]
   20 bits   8 bits    6 bits

Index = (Address >> 6) & 0xFF  ; bits 6-13
Tag   = Address >> 14          ; bits 14-31
Offset = Address & 0x3F        ; bits 0-5

Example: Address 0x12345678
Offset = 0x38 (56) - byte position in cache line
Index  = 0x59 (89) - which cache line
Tag    = 0x48D1    - verify correct block`,
            explanation: 'The offset selects a byte within the cache line. The index selects which cache line. The tag verifies we have the correct memory block.'
          }
        ],
        resources: [
          {
            title: 'Cache Memory Tutorial',
            url: 'https://www.geeksforgeeks.org/cache-memory-in-computer-organization/',
            type: 'tutorial',
            source: 'GeeksforGeeks'
          },
          {
            title: 'Cache Mapping Techniques',
            url: 'https://www.geeksforgeeks.org/cache-memory-in-computer-organization/',
            type: 'reference',
            source: 'GeeksforGeeks'
          }
        ]
      },
      {
        id: 'virtual-memory',
        courseId: 'sc1006',
        name: 'Virtual Memory',
        order: 5,
        prerequisites: [],
        summary: `Virtual memory allows programs to use more memory than physically available by using disk storage as an extension of RAM.

Address Spaces:
- Virtual Address: Address used by programs (logical)
- Physical Address: Actual address in RAM (hardware)
- The OS translates virtual → physical addresses

Paging:
- Memory divided into fixed-size pages (typically 4KB)
- Virtual Page Number (VPN): Identifies the page
- Page Offset: Position within the page
- Page Table: Maps virtual pages to physical frames

Address Translation:
\`\`\`
Virtual Address = [Virtual Page Number | Page Offset]
Physical Address = [Physical Frame Number | Page Offset]
\`\`\`

Translation Lookaside Buffer (TLB):
- Cache for page table entries
- Speeds up address translation
- TLB hit: fast translation
- TLB miss: must access page table in memory

Page Faults:
- Occurs when page is not in physical memory
- OS loads page from disk into RAM
- Very expensive operation (disk is slow)

Benefits:
- Programs can use more memory than available RAM
- Memory protection between processes
- Simplified memory management`,
        keyPoints: [
          'Virtual addresses decoupled from physical addresses',
          'Page table maps virtual pages to physical frames',
          'TLB caches recent translations for speed',
          'Page fault: required page not in RAM, must load from disk',
          'Each process has its own virtual address space',
          'OS handles all address translation transparently'
        ],
        codeExamples: [
          {
            title: 'Virtual Address Translation',
            language: 'text',
            code: `Virtual Address: 32 bits
Page Size: 4KB (4096 bytes = 2^12)

Address breakdown:
[  Virtual Page Number  |  Page Offset  ]
        20 bits              12 bits

Example: Virtual Address 0x12345678
Page Offset = 0x678 (12 bits) = 1656
VPN = 0x12345 (20 bits) = 74565

Translation:
1. Extract VPN (0x12345)
2. Look up VPN in TLB
   - If TLB hit: get Physical Frame Number
   - If TLB miss: look up in Page Table
3. If page not in memory: Page Fault
4. Combine PFN with Page Offset
   Physical Address = [PFN | 0x678]`,
            explanation: 'The page offset remains unchanged during translation. Only the VPN is translated to PFN using the page table (or TLB for speed).'
          }
        ],
        resources: [
          {
            title: 'Virtual Memory Tutorial',
            url: 'https://www.cs.umd.edu/~meesh/411/CA-online/chapter/virtual-memory-i/index.html',
            type: 'tutorial',
            source: 'UMD CS'
          },
          {
            title: 'Paging in Operating System',
            url: 'https://www.geeksforgeeks.org/operating-systems/paging-in-operating-system/',
            type: 'tutorial',
            source: 'GeeksforGeeks'
          },
          {
            title: 'Virtual Memory',
            url: 'https://www.tutorialspoint.com/operating_system/os_virtual_memory.htm',
            type: 'documentation',
            source: 'TutorialsPoint'
          }
        ]
      },
      {
        id: 'data-transfer',
        courseId: 'sc1006',
        name: 'Data Transfer & I/O',
        order: 6,
        prerequisites: [],
        summary: `Data transfer involves moving data between the CPU, memory, and peripheral devices. Different methods optimize for different scenarios.

Signal Chain:
- ADC (Analog-to-Digital Converter): Converts analog signals (continuous) to digital values
- DAC (Digital-to-Analog Converter): Converts digital values to analog signals
- Resolution measured in bits (8-bit, 12-bit, 16-bit)

Parallel vs Serial Transfer:

Parallel Transfer:
- Multiple bits transferred simultaneously over multiple wires
- Faster for short distances
- More wires = more expensive, signal interference issues
- Example: Traditional printer ports (8-bit)

Serial Transfer:
- Bits transferred one at a time over a single wire
- Better for long distances, less interference
- Types: Synchronous (with clock) and Asynchronous (start/stop bits)
- Examples: USB, UART, SPI, I2C

I/O Control Methods:

1. Polling:
- CPU repeatedly checks device status
- Simple but wastes CPU cycles
- CPU is blocked waiting for device

2. Interrupts:
- Device signals CPU when ready
- CPU can do other work while waiting
- More efficient than polling
- Requires interrupt handling routine

3. Direct Memory Access (DMA):
- Dedicated hardware transfers data directly to/from memory
- CPU only initiates transfer, then can do other work
- Most efficient for large data transfers
- DMA controller handles the transfer`,
        keyPoints: [
          'ADC converts analog to digital, DAC converts digital to analog',
          'Parallel: fast but expensive, serial: slower but reliable for long distances',
          'Polling: CPU waits actively (wastes cycles)',
          'Interrupts: device notifies CPU when ready (efficient)',
          'DMA: hardware transfers data without CPU involvement',
          'Synchronous serial uses shared clock, asynchronous uses start/stop bits'
        ],
        codeExamples: [
          {
            title: 'Polling vs Interrupt Concept',
            language: 'text',
            code: `POLLING:
    loop:
        LDR R0, [status_register]    ; Read device status
        TST R0, #READY_BIT           ; Check if device ready
        BEQ loop                      ; If not ready, keep checking
        ; Device ready, process data
        LDR R1, [data_register]

INTERRUPT:
    ; Main program runs normally...
    ; When device ready, it triggers IRQ

    ; Interrupt Service Routine (ISR):
    interrupt_handler:
        PUSH {R0-R3, LR}             ; Save registers
        LDR R1, [data_register]      ; Read data
        ; Process data
        POP {R0-R3, PC}              ; Return from interrupt`,
            explanation: 'Polling wastes CPU cycles checking status. Interrupts allow CPU to work on other tasks until device signals readiness.'
          }
        ],
        resources: [
          {
            title: 'I/O Systems Tutorial',
            url: 'https://www.geeksforgeeks.org/input-output-systems/',
            type: 'tutorial',
            source: 'GeeksforGeeks'
          },
          {
            title: 'DMA and Interrupts',
            url: 'https://www.tutorialspoint.com/operating_system/os_io_hardware.htm',
            type: 'documentation',
            source: 'TutorialsPoint'
          }
        ]
      },
      {
        id: 'memory-types',
        courseId: 'sc1006',
        name: 'Memory Types & Storage',
        order: 7,
        prerequisites: [],
        summary: `Computer systems use various memory types with different characteristics in terms of speed, cost, volatility, and capacity.

Memory Hierarchy (Fast to Slow):
Registers → L1 Cache → L2 Cache → L3 Cache → Main Memory (RAM) → SSD → HDD → Tape

Volatile Memory (loses data when power off):

SRAM (Static RAM):
- Faster, more expensive
- Uses flip-flops (6 transistors per bit)
- Used for CPU caches
- No refresh needed

DRAM (Dynamic RAM):
- Slower, cheaper, denser
- Uses capacitors (1 transistor + 1 capacitor per bit)
- Used for main memory
- Needs periodic refresh (capacitors leak charge)

Non-Volatile Memory (retains data without power):

ROM (Read-Only Memory):
- Programmed at factory
- Very reliable, cannot be changed

Flash Memory:
- Electrically erasable and programmable
- Used in SSDs, USB drives, SD cards
- Limited write cycles (wear leveling helps)
- Types: NOR (faster reads, random access) and NAND (denser, cheaper)

Storage Devices:

HDD (Hard Disk Drive):
- Magnetic storage on spinning platters
- Seek time + rotational latency + transfer time
- Cheap, high capacity, mechanical failure risk

SSD (Solid State Drive):
- Flash-based, no moving parts
- Much faster (especially random access)
- More expensive per GB, limited write endurance
- No seek time or rotational latency`,
        keyPoints: [
          'SRAM: fast, expensive, used for caches (flip-flops)',
          'DRAM: slower, cheaper, used for main memory (capacitors + refresh)',
          'Flash: non-volatile, limited writes, used in SSDs/USB',
          'HDD: magnetic, cheap, slow random access (mechanical)',
          'SSD: flash-based, fast, no moving parts, more expensive',
          'Memory hierarchy balances speed vs cost vs capacity'
        ],
        codeExamples: [
          {
            title: 'Memory Access Time Comparison',
            language: 'text',
            code: `Memory Type          Access Time        Cost/GB
─────────────────────────────────────────────────
L1 Cache             ~1 ns              $$$$$
L2 Cache             ~4 ns              $$$$
L3 Cache             ~10 ns             $$$
Main Memory (DDR4)   ~100 ns            $$
SSD                  ~100 µs            $
HDD                  ~10 ms             ¢

HDD Access Time Components:
- Seek time: 5-10 ms (move head to track)
- Rotational latency: 2-6 ms (wait for sector)
- Transfer time: depends on data size

Example: Reading 4KB from HDD
  Seek: 8ms + Rotation: 4ms + Transfer: 0.1ms ≈ 12ms
  Same from SSD: ~0.1ms (100x faster!)`,
            explanation: 'The memory hierarchy shows dramatic differences in access times. SSDs are orders of magnitude faster than HDDs for random access.'
          }
        ],
        resources: [
          {
            title: 'Memory Hierarchy',
            url: 'https://www.geeksforgeeks.org/memory-hierarchy-design-and-its-characteristics/',
            type: 'tutorial',
            source: 'GeeksforGeeks'
          },
          {
            title: 'Types of Computer Memory',
            url: 'https://www.tutorialspoint.com/computer_fundamentals/computer_memory.htm',
            type: 'documentation',
            source: 'TutorialsPoint'
          }
        ]
      },
      {
        id: 'number-systems',
        courseId: 'sc1006',
        name: 'Number Representations & IEEE 754',
        order: 8,
        prerequisites: [],
        summary: `Computers represent numbers in binary. Understanding different representations is crucial for avoiding errors and debugging.

Integer Representations:

Unsigned Integers:
- Range: 0 to 2ⁿ - 1
- 8-bit: 0 to 255
- 32-bit: 0 to 4,294,967,295

Signed Integers (Two's Complement):
- MSB is sign bit (0 = positive, 1 = negative)
- Range: -2ⁿ⁻¹ to 2ⁿ⁻¹ - 1
- 8-bit: -128 to 127
- To negate: invert all bits and add 1
- Example: -5 = ~5 + 1 = ~0101 + 1 = 1010 + 1 = 1011

Overflow:
- Unsigned overflow: when result exceeds maximum (wraps around)
- Signed overflow: when sign changes unexpectedly
- Carry flag (C): set on unsigned overflow
- Overflow flag (V): set on signed overflow

IEEE 754 Floating Point:

Single Precision (32-bit float):
- 1 bit sign
- 8 bits exponent (biased by 127)
- 23 bits mantissa (fraction)

Double Precision (64-bit double):
- 1 bit sign
- 11 bits exponent (biased by 1023)
- 52 bits mantissa

Value = (-1)^sign × 1.mantissa × 2^(exponent - bias)

Special Values:
- Zero: exponent = 0, mantissa = 0
- Infinity: exponent = all 1s, mantissa = 0
- NaN: exponent = all 1s, mantissa ≠ 0
- Denormalized: exponent = 0, mantissa ≠ 0`,
        keyPoints: [
          'Two\'s complement: negate by inverting bits and adding 1',
          'Signed range: -2^(n-1) to 2^(n-1)-1',
          'Overflow: carry for unsigned, sign change for signed',
          'IEEE 754: sign + exponent (biased) + mantissa',
          'Float: 1+8+23 bits, Double: 1+11+52 bits',
          'Special values: 0, infinity, NaN, denormalized numbers'
        ],
        codeExamples: [
          {
            title: 'IEEE 754 Single Precision Example',
            language: 'text',
            code: `Convert -6.5 to IEEE 754 single precision:

1. Sign: negative → sign bit = 1

2. Convert to binary: 6.5 = 110.1₂

3. Normalize: 110.1 = 1.101 × 2²
   (move point until 1.xxx format)

4. Exponent: 2 + 127 (bias) = 129 = 10000001₂

5. Mantissa: 101 (rest is zeros)
   10100000000000000000000 (23 bits)

Result: 1 10000001 10100000000000000000000
        │    │              │
      sign exponent      mantissa

In hex: 0xC0D00000

Verification:
(-1)¹ × 1.101₂ × 2^(129-127)
= -1 × 1.625 × 4
= -6.5 ✓`,
            explanation: 'IEEE 754 represents floating-point numbers with separate sign, exponent (biased), and mantissa fields.'
          }
        ],
        resources: [
          {
            title: 'Number System in Computer',
            url: 'https://www.geeksforgeeks.org/number-system-in-computer-architecture/',
            type: 'tutorial',
            source: 'GeeksforGeeks'
          },
          {
            title: 'IEEE 754 Floating Point',
            url: 'https://www.geeksforgeeks.org/ieee-standard-754-floating-point-numbers/',
            type: 'reference',
            source: 'GeeksforGeeks'
          }
        ]
      },
      {
        id: 'pipelining',
        courseId: 'sc1006',
        name: 'CPU Pipelining',
        order: 9,
        prerequisites: [],
        summary: `Pipelining is a technique where multiple instructions are overlapped during execution, similar to an assembly line in a factory.

Basic Pipeline Stages:
1. Fetch (IF): Read instruction from memory
2. Decode (ID): Interpret instruction, read registers
3. Execute (EX): Perform ALU operation
4. Memory (MEM): Access data memory (load/store)
5. Writeback (WB): Write result to register

Pipeline Performance:
- Without pipelining: each instruction takes N cycles
- With N-stage pipeline: one instruction completes per cycle (after filling)
- Throughput increased N times (ideally)

Pipeline Hazards:

1. Structural Hazards:
- Multiple instructions need same hardware resource
- Solution: duplicate hardware or stall

2. Data Hazards:
- Instruction depends on result of previous instruction
- Types: RAW (Read After Write), WAR, WAW
- Solutions:
  - Stalling: wait for data
  - Forwarding/Bypassing: pass result directly to next stage
  - Reordering: compiler rearranges instructions

3. Control Hazards (Branch Hazards):
- Branch instruction changes program flow
- Instructions already in pipeline may be wrong
- Solutions:
  - Stall until branch resolved
  - Branch prediction (guess direction)
  - Delayed branch (fill slots with useful work)

Pipeline Performance Metric:
CPI (Cycles Per Instruction) ideally = 1 for perfect pipeline
Actual CPI = 1 + stall cycles due to hazards`,
        keyPoints: [
          'Pipelining overlaps instruction execution stages',
          '5 stages: Fetch, Decode, Execute, Memory, Writeback',
          'Increases throughput but not individual instruction speed',
          'Structural hazard: resource conflict',
          'Data hazard: dependency between instructions (use forwarding)',
          'Control hazard: branch changes flow (use prediction)',
          'CPI = 1 ideal, higher with hazards'
        ],
        codeExamples: [
          {
            title: 'Pipeline Hazard Examples',
            language: 'arm',
            code: `; DATA HAZARD - RAW (Read After Write)
ADD R1, R2, R3    ; R1 = R2 + R3
SUB R4, R1, R5    ; R4 = R1 - R5  ← needs R1 from previous!

Without forwarding: must stall 2 cycles
With forwarding: result passed directly, no stall

; CONTROL HAZARD - Branch
CMP R1, R2
BEQ target        ; Branch if equal
ADD R3, R4, R5    ; This may already be in pipeline!
SUB R6, R7, R8    ; And this too!

If branch taken: ADD and SUB were fetched for nothing
Solution: Branch prediction (guess not taken)
          If wrong, flush and restart

; PIPELINE TIMING DIAGRAM
Cycle:    1   2   3   4   5   6   7   8
ADD:      IF  ID  EX  MEM WB
SUB:          IF  ID  EX  MEM WB
MUL:              IF  ID  EX  MEM WB
LDR:                  IF  ID  EX  MEM WB`,
            explanation: 'Data hazards occur when instructions depend on previous results. Forwarding allows the ALU result to be used immediately without waiting for writeback.'
          }
        ],
        resources: [
          {
            title: 'CPU Pipelining',
            url: 'https://www.geeksforgeeks.org/computer-organization-and-architecture-pipelining-set-1-execution-stages-and-throughput/',
            type: 'tutorial',
            source: 'GeeksforGeeks'
          },
          {
            title: 'Pipeline Hazards',
            url: 'https://www.geeksforgeeks.org/computer-organization-and-architecture-pipelining-set-2-dependencies-and-data-hazard/',
            type: 'reference',
            source: 'GeeksforGeeks'
          }
        ]
      }
    ]
  },
  {
    id: 'sc1007',
    code: 'SC1007',
    name: 'Data Structures and Algorithms',
    description: 'Fundamental data structures and algorithms including linked lists, stacks, queues, trees, and their implementations in Python.',
    topics: [
      {
        id: 'memory-management',
        courseId: 'sc1007',
        name: 'Memory Management in Python',
        order: 1,
        prerequisites: [],
        summary: `Python manages memory through a combination of reference counting and garbage collection. Understanding how Python handles memory is crucial for writing efficient code.

Stack vs Heap Memory:
- Stack: Stores function calls, local variables, and references. Fast access, automatically managed.
- Heap: Stores objects and data. Managed by Python's memory manager and garbage collector.

Reference Counting:
Every object in Python has a reference count. When the count drops to zero, memory is deallocated.

Garbage Collection:
Python uses generational garbage collection to handle circular references that reference counting cannot detect.

Referential Arrays:
Python lists are referential arrays - they store references (memory addresses) to objects, not the objects themselves. This means:
- Each element in a list is a reference pointing to an object in heap memory
- Multiple list elements can reference the same object
- This is why modifying a mutable object affects all references to it

Interning vs Memory Pooling:
- Interning: Python reuses immutable objects with the same value (e.g., small integers -5 to 256, short strings). Use \`sys.intern()\` to manually intern strings.
- Memory Pooling: Pre-allocating a pool of memory blocks to reduce allocation overhead. Python uses this internally for small objects (<512 bytes).

Both techniques optimize memory but serve different purposes: interning saves space by deduplication, pooling improves allocation speed.`,
        keyPoints: [
          'Python uses reference counting as primary memory management',
          'Garbage collector handles circular references',
          'Objects are stored in heap, references in stack',
          'Python lists are referential arrays (store references, not values)',
          'Interning deduplicates immutable objects; pooling speeds allocation',
          'Use sys.intern() to manually intern large strings'
        ],
        codeExamples: [
          {
            title: 'Reference Counting Example',
            language: 'python',
            code: `import sys

x = [1, 2, 3]
print(sys.getrefcount(x))  # Shows reference count

y = x  # Increases reference count
print(sys.getrefcount(x))  # Count increased

del y  # Decreases reference count
print(sys.getrefcount(x))  # Back to original`,
            explanation: 'sys.getrefcount() shows how many references point to an object. Note: it includes the temporary reference from the function call itself.'
          }
        ],
        resources: [
          {
            title: 'Python Memory Management',
            url: 'https://www.geeksforgeeks.org/memory-management-in-python/',
            type: 'tutorial',
            source: 'GeeksforGeeks'
          },
          {
            title: 'Understanding Python Memory',
            url: 'https://realpython.com/python-memory-management/',
            type: 'tutorial',
            source: 'Real Python'
          }
        ]
      },
      {
        id: 'linked-lists',
        courseId: 'sc1007',
        name: 'Linked Lists',
        order: 2,
        prerequisites: [],
        summary: `A linked list is a linear data structure where elements are stored in nodes, and each node points to the next node in the sequence.

Types of Linked Lists:
1. Singly Linked List: Each node has data and a pointer to the next node
2. Doubly Linked List: Each node has pointers to both next and previous nodes
3. Circular Linked List: The last node points back to the first node

Advantages over Arrays:
- Dynamic size
- Efficient insertions/deletions at any position
- No need to pre-allocate memory

Disadvantages:
- No random access (O(n) to access element)
- Extra memory for pointers
- Not cache-friendly`,
        keyPoints: [
          'Nodes contain data and pointer(s) to other nodes',
          'Head pointer tracks the first node',
          'Tail pointer (optional) tracks the last node for O(1) append',
          'Insert/delete at front: O(1)',
          'Insert/delete at end: O(n) for singly, O(1) for doubly with tail',
          'Search: O(n)'
        ],
        codeExamples: [
          {
            title: 'Singly Linked List Node',
            language: 'python',
            code: `class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None

    def insert_front(self, data):
        new_node = Node(data)
        new_node.next = self.head
        self.head = new_node

    def display(self):
        current = self.head
        while current:
            print(current.data, end=" -> ")
            current = current.next
        print("None")`,
            explanation: 'Basic implementation of a singly linked list with insert at front operation.'
          },
          {
            title: 'Doubly Linked List Node',
            language: 'python',
            code: `class DNode:
    def __init__(self, data):
        self.data = data
        self.prev = None
        self.next = None

class DoublyLinkedList:
    def __init__(self):
        self.head = None
        self.tail = None

    def insert_end(self, data):
        new_node = DNode(data)
        if not self.head:
            self.head = self.tail = new_node
        else:
            new_node.prev = self.tail
            self.tail.next = new_node
            self.tail = new_node`,
            explanation: 'Doubly linked list allows O(1) insertion at both ends when tail pointer is maintained.'
          }
        ],
        resources: [
          {
            title: 'Linked List Data Structure',
            url: 'https://www.geeksforgeeks.org/dsa/linked-list-data-structure/',
            type: 'tutorial',
            source: 'GeeksforGeeks'
          },
          {
            title: 'Python Linked Lists',
            url: 'https://realpython.com/linked-lists-python/',
            type: 'tutorial',
            source: 'Real Python'
          },
          {
            title: 'Linked List Tutorial',
            url: 'https://www.w3schools.com/dsa/dsa_data_linkedlists.php',
            type: 'tutorial',
            source: 'W3Schools'
          }
        ]
      },
      {
        id: 'stacks',
        courseId: 'sc1007',
        name: 'Stacks',
        order: 3,
        prerequisites: [],
        summary: `A stack is a Last-In-First-Out (LIFO) data structure. The last element added is the first one to be removed.

Key Operations:
- push(item): Add item to top - O(1)
- pop(): Remove and return top item - O(1)
- peek()/top(): Return top item without removing - O(1)
- isEmpty(): Check if stack is empty - O(1)

Implementation Options:
1. Array-based: Simple but fixed size (or use dynamic array)
2. Linked list-based: Dynamic size, slightly more memory overhead

Applications:
- Function call stack
- Expression evaluation (infix to postfix)
- Parenthesis matching
- Undo operations
- Browser back button`,
        keyPoints: [
          'LIFO: Last In, First Out',
          'All operations are O(1)',
          'Can be implemented with array or linked list',
          'Used for expression evaluation and parsing',
          'Essential for recursion (call stack)'
        ],
        codeExamples: [
          {
            title: 'Stack Implementation',
            language: 'python',
            code: `class Stack:
    def __init__(self):
        self.items = []

    def push(self, item):
        self.items.append(item)

    def pop(self):
        if not self.is_empty():
            return self.items.pop()
        raise IndexError("Stack is empty")

    def peek(self):
        if not self.is_empty():
            return self.items[-1]
        raise IndexError("Stack is empty")

    def is_empty(self):
        return len(self.items) == 0

    def size(self):
        return len(self.items)`,
            explanation: 'Array-based stack implementation using Python list.'
          },
          {
            title: 'Balanced Parentheses Check',
            language: 'python',
            code: `def is_balanced(expression):
    stack = Stack()
    pairs = {')': '(', '}': '{', ']': '['}

    for char in expression:
        if char in '({[':
            stack.push(char)
        elif char in ')}]':
            if stack.is_empty():
                return False
            if stack.pop() != pairs[char]:
                return False

    return stack.is_empty()

# Example
print(is_balanced("({[]})"))  # True
print(is_balanced("({[})"))   # False`,
            explanation: 'Classic stack application: checking if parentheses are balanced.'
          }
        ],
        resources: [
          {
            title: 'Stack Data Structure',
            url: 'https://www.geeksforgeeks.org/dsa/stack-data-structure/',
            type: 'tutorial',
            source: 'GeeksforGeeks'
          },
          {
            title: 'Stack Tutorial',
            url: 'https://www.w3schools.com/dsa/dsa_data_stacks.php',
            type: 'tutorial',
            source: 'W3Schools'
          }
        ]
      },
      {
        id: 'queues',
        courseId: 'sc1007',
        name: 'Queues',
        order: 4,
        prerequisites: [],
        summary: `A queue is a First-In-First-Out (FIFO) data structure. The first element added is the first one to be removed.

Key Operations:
- enqueue(item): Add item to rear - O(1)
- dequeue(): Remove and return front item - O(1)
- front(): Return front item without removing - O(1)
- isEmpty(): Check if queue is empty - O(1)

Types of Queues:
1. Simple Queue: Basic FIFO
2. Circular Queue: Wraps around to use space efficiently
3. Priority Queue: Elements dequeued by priority, not order
4. Deque: Double-ended queue, insert/remove from both ends

Applications:
- BFS traversal
- Task scheduling
- Print queue
- Buffer management`,
        keyPoints: [
          'FIFO: First In, First Out',
          'Enqueue at rear, dequeue from front',
          'Circular queue avoids wasted space in array implementation',
          'Used in BFS and level-order traversal',
          'Priority queue uses heap for efficient priority ordering'
        ],
        codeExamples: [
          {
            title: 'Queue Implementation',
            language: 'python',
            code: `class Queue:
    def __init__(self):
        self.items = []

    def enqueue(self, item):
        self.items.append(item)

    def dequeue(self):
        if not self.is_empty():
            return self.items.pop(0)
        raise IndexError("Queue is empty")

    def front(self):
        if not self.is_empty():
            return self.items[0]
        raise IndexError("Queue is empty")

    def is_empty(self):
        return len(self.items) == 0

    def size(self):
        return len(self.items)`,
            explanation: 'Simple queue implementation. Note: pop(0) is O(n) in Python lists; use collections.deque for O(1).'
          },
          {
            title: 'Efficient Queue with Deque',
            language: 'python',
            code: `from collections import deque

class EfficientQueue:
    def __init__(self):
        self.items = deque()

    def enqueue(self, item):
        self.items.append(item)

    def dequeue(self):
        if not self.is_empty():
            return self.items.popleft()  # O(1)
        raise IndexError("Queue is empty")

    def is_empty(self):
        return len(self.items) == 0`,
            explanation: 'Using collections.deque provides O(1) operations for both ends.'
          }
        ],
        resources: [
          {
            title: 'Queue Data Structure',
            url: 'https://www.geeksforgeeks.org/dsa/queue-data-structure/',
            type: 'tutorial',
            source: 'GeeksforGeeks'
          },
          {
            title: 'Queue Tutorial',
            url: 'https://www.w3schools.com/dsa/dsa_data_queues.php',
            type: 'tutorial',
            source: 'W3Schools'
          }
        ]
      },
      {
        id: 'binary-trees',
        courseId: 'sc1007',
        name: 'Binary Trees',
        order: 5,
        prerequisites: [],
        summary: `A binary tree is a hierarchical data structure where each node has at most two children, called left and right.

Terminology:
- Root: The topmost node
- Parent/Child: Relative relationship between connected nodes
- Leaf: Node with no children
- Height: Longest path from root to leaf
- Depth: Distance from root to a node

Types:
- Full Binary Tree: Every node has 0 or 2 children
- Complete Binary Tree: All levels filled except possibly the last
- Perfect Binary Tree: All internal nodes have 2 children, all leaves at same level

Traversals:
1. Inorder (Left-Root-Right): Gives sorted order for BST
2. Preorder (Root-Left-Right): Used to copy tree
3. Postorder (Left-Right-Root): Used to delete tree
4. Level Order: BFS, level by level`,
        keyPoints: [
          'Each node has at most 2 children',
          'Height of tree with n nodes: O(log n) to O(n)',
          'Inorder traversal of BST gives sorted order',
          'Preorder for serialization, postorder for deletion',
          'Level order uses queue for BFS'
        ],
        codeExamples: [
          {
            title: 'Binary Tree Node and Traversals',
            language: 'python',
            code: `class TreeNode:
    def __init__(self, data):
        self.data = data
        self.left = None
        self.right = None

def inorder(node):
    if node:
        inorder(node.left)
        print(node.data, end=" ")
        inorder(node.right)

def preorder(node):
    if node:
        print(node.data, end=" ")
        preorder(node.left)
        preorder(node.right)

def postorder(node):
    if node:
        postorder(node.left)
        postorder(node.right)
        print(node.data, end=" ")`,
            explanation: 'Recursive implementations of the three depth-first traversals.'
          },
          {
            title: 'Level Order Traversal',
            language: 'python',
            code: `from collections import deque

def level_order(root):
    if not root:
        return

    queue = deque([root])
    while queue:
        node = queue.popleft()
        print(node.data, end=" ")

        if node.left:
            queue.append(node.left)
        if node.right:
            queue.append(node.right)`,
            explanation: 'BFS traversal using a queue to visit nodes level by level.'
          }
        ],
        resources: [
          {
            title: 'Binary Tree Data Structure',
            url: 'https://www.geeksforgeeks.org/dsa/binary-tree-data-structure/',
            type: 'tutorial',
            source: 'GeeksforGeeks'
          },
          {
            title: 'Tree Traversals',
            url: 'https://www.geeksforgeeks.org/tree-traversals-inorder-preorder-and-postorder/',
            type: 'tutorial',
            source: 'GeeksforGeeks'
          }
        ]
      },
      {
        id: 'binary-search-trees',
        courseId: 'sc1007',
        name: 'Binary Search Trees (BST)',
        order: 6,
        prerequisites: [],
        summary: `A Binary Search Tree is a binary tree with an ordering property: for each node, all values in the left subtree are smaller, and all values in the right subtree are larger.

BST Property:
- Left subtree contains only nodes with values < node's value
- Right subtree contains only nodes with values > node's value
- Both subtrees are also BSTs

Operations:
- Search: O(h) where h is height
- Insert: O(h)
- Delete: O(h)
- For balanced BST: h = O(log n)
- For skewed BST: h = O(n)

Deletion Cases:
1. Leaf node: Simply remove
2. One child: Replace with child
3. Two children: Replace with inorder successor (or predecessor)`,
        keyPoints: [
          'Left < Root < Right for all nodes',
          'Inorder traversal gives sorted order',
          'Average case: O(log n) for search/insert/delete',
          'Worst case (skewed): O(n)',
          'Deletion with two children uses inorder successor'
        ],
        codeExamples: [
          {
            title: 'BST Search and Insert',
            language: 'python',
            code: `class BST:
    def __init__(self):
        self.root = None

    def insert(self, data):
        self.root = self._insert_recursive(self.root, data)

    def _insert_recursive(self, node, data):
        if node is None:
            return TreeNode(data)
        if data < node.data:
            node.left = self._insert_recursive(node.left, data)
        else:
            node.right = self._insert_recursive(node.right, data)
        return node

    def search(self, data):
        return self._search_recursive(self.root, data)

    def _search_recursive(self, node, data):
        if node is None or node.data == data:
            return node
        if data < node.data:
            return self._search_recursive(node.left, data)
        return self._search_recursive(node.right, data)`,
            explanation: 'Recursive BST operations following the BST property.'
          },
          {
            title: 'BST Delete',
            language: 'python',
            code: `def delete(self, data):
    self.root = self._delete_recursive(self.root, data)

def _delete_recursive(self, node, data):
    if node is None:
        return None

    if data < node.data:
        node.left = self._delete_recursive(node.left, data)
    elif data > node.data:
        node.right = self._delete_recursive(node.right, data)
    else:
        # Node found
        if node.left is None:
            return node.right
        if node.right is None:
            return node.left
        # Two children: get inorder successor
        successor = self._min_node(node.right)
        node.data = successor.data
        node.right = self._delete_recursive(node.right, successor.data)
    return node

def _min_node(self, node):
    current = node
    while current.left:
        current = current.left
    return current`,
            explanation: 'BST deletion handling all three cases: leaf, one child, two children.'
          }
        ],
        resources: [
          {
            title: 'Binary Search Tree',
            url: 'https://www.geeksforgeeks.org/binary-search-tree-data-structure/',
            type: 'tutorial',
            source: 'GeeksforGeeks'
          },
          {
            title: 'BST Operations',
            url: 'https://www.w3schools.com/dsa/dsa_data_binarysearchtrees.php',
            type: 'tutorial',
            source: 'W3Schools'
          }
        ]
      },
      {
        id: 'avl-trees',
        courseId: 'sc1007',
        name: 'AVL Trees',
        order: 7,
        prerequisites: [],
        summary: `An AVL tree is a self-balancing Binary Search Tree where the difference in heights of left and right subtrees (balance factor) is at most 1 for every node.

Balance Factor = Height(Left Subtree) - Height(Right Subtree)
- Must be -1, 0, or 1 for all nodes
- If outside this range, rotations are needed

Rotations:
1. Left Rotation (LL): Right-heavy, rotate left
2. Right Rotation (RR): Left-heavy, rotate right
3. Left-Right (LR): Left child is right-heavy
4. Right-Left (RL): Right child is left-heavy

Time Complexity:
All operations (search, insert, delete) are O(log n) guaranteed because the tree stays balanced.`,
        keyPoints: [
          'Balance factor must be -1, 0, or 1',
          'Height is always O(log n)',
          'Four rotation types: LL, RR, LR, RL',
          'Guarantees O(log n) for all operations',
          'More complex than BST but prevents worst-case O(n)'
        ],
        codeExamples: [
          {
            title: 'AVL Rotations',
            language: 'python',
            code: `def right_rotate(self, y):
    x = y.left
    T2 = x.right

    x.right = y
    y.left = T2

    y.height = 1 + max(self.get_height(y.left),
                       self.get_height(y.right))
    x.height = 1 + max(self.get_height(x.left),
                       self.get_height(x.right))
    return x

def left_rotate(self, x):
    y = x.right
    T2 = y.left

    y.left = x
    x.right = T2

    x.height = 1 + max(self.get_height(x.left),
                       self.get_height(x.right))
    y.height = 1 + max(self.get_height(y.left),
                       self.get_height(y.right))
    return y`,
            explanation: 'Basic left and right rotations for AVL tree balancing.'
          },
          {
            title: 'AVL Insert with Balancing',
            language: 'python',
            code: `def insert(self, root, data):
    if not root:
        return AVLNode(data)

    if data < root.data:
        root.left = self.insert(root.left, data)
    else:
        root.right = self.insert(root.right, data)

    root.height = 1 + max(self.get_height(root.left),
                          self.get_height(root.right))

    balance = self.get_balance(root)

    # LL Case
    if balance > 1 and data < root.left.data:
        return self.right_rotate(root)
    # RR Case
    if balance < -1 and data > root.right.data:
        return self.left_rotate(root)
    # LR Case
    if balance > 1 and data > root.left.data:
        root.left = self.left_rotate(root.left)
        return self.right_rotate(root)
    # RL Case
    if balance < -1 and data < root.right.data:
        root.right = self.right_rotate(root.right)
        return self.left_rotate(root)

    return root`,
            explanation: 'AVL insertion with automatic rebalancing using rotations.'
          }
        ],
        resources: [
          {
            title: 'AVL Tree Tutorial',
            url: 'https://www.geeksforgeeks.org/introduction-to-avl-tree/',
            type: 'tutorial',
            source: 'GeeksforGeeks'
          },
          {
            title: 'AVL Tree Rotations',
            url: 'https://www.w3schools.com/dsa/dsa_data_avl_trees.php',
            type: 'tutorial',
            source: 'W3Schools'
          }
        ]
      },
      {
        id: 'algorithm-analysis',
        courseId: 'sc1007',
        name: 'Algorithm Analysis & Big O',
        order: 8,
        prerequisites: [],
        summary: `Algorithm analysis is the process of determining the computational complexity of algorithms – the amount of time and space they require to run.

Why Analyze Algorithms?
- Compare efficiency of different solutions
- Predict performance as input size grows
- Make informed design decisions

Big O Notation:
Describes the upper bound of an algorithm's growth rate. We focus on the dominant term as n approaches infinity.

Common Time Complexities (fastest to slowest):
- O(1) - Constant: Array access, hash table lookup
- O(log n) - Logarithmic: Binary search, balanced tree operations
- O(n) - Linear: Linear search, single loop through data
- O(n log n) - Log-linear: Merge sort, quicksort (average)
- O(n²) - Quadratic: Nested loops, bubble sort
- O(2ⁿ) - Exponential: Recursive Fibonacci, subset generation
- O(n!) - Factorial: Permutation generation

Space Complexity:
Memory required by an algorithm. Consider:
- Input storage
- Auxiliary space (extra variables, data structures)
- Recursion stack depth

Best, Average, Worst Case:
- Best case: Minimum resources needed (often unrealistic)
- Average case: Expected resources for typical input
- Worst case: Maximum resources needed (often most important)`,
        keyPoints: [
          'Big O describes upper bound (worst case) growth rate',
          'Drop constants and lower-order terms: O(2n + 5) = O(n)',
          'O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2ⁿ)',
          'Space complexity includes auxiliary space and recursion depth',
          'Analyze loops: single loop O(n), nested loops O(n²)',
          'Recursion: consider tree of calls and work per call'
        ],
        codeExamples: [
          {
            title: 'Time Complexity Examples',
            language: 'python',
            code: `# O(1) - Constant time
def get_first(arr):
    return arr[0]  # Single operation

# O(n) - Linear time
def find_max(arr):
    max_val = arr[0]
    for x in arr:        # Loop through n elements
        if x > max_val:
            max_val = x
    return max_val

# O(n²) - Quadratic time
def bubble_sort(arr):
    n = len(arr)
    for i in range(n):           # Outer loop: n times
        for j in range(n-i-1):   # Inner loop: n times
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]

# O(log n) - Logarithmic time
def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    while left <= right:         # Halves search space each time
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1`,
            explanation: 'Different algorithms with their time complexities. Note how the number of operations relates to input size n.'
          }
        ],
        resources: [
          {
            title: 'DSA Tutorial - Big O Notation',
            url: 'https://www.geeksforgeeks.org/dsa/dsa-tutorial-learn-data-structures-and-algorithms/',
            type: 'tutorial',
            source: 'GeeksforGeeks'
          },
          {
            title: 'Algorithm Complexity',
            url: 'https://www.w3schools.com/dsa/dsa_timecomplexity_theory.php',
            type: 'tutorial',
            source: 'W3Schools'
          }
        ]
      },
      {
        id: 'heaps',
        courseId: 'sc1007',
        name: 'Heap Data Structure',
        order: 9,
        prerequisites: [],
        summary: `A heap is a specialized tree-based data structure that satisfies the heap property. It's commonly implemented as a complete binary tree stored in an array.

Heap Types:
- Max-Heap: Parent ≥ children (largest element at root)
- Min-Heap: Parent ≤ children (smallest element at root)

Array Representation:
For node at index i:
- Left child: 2i + 1
- Right child: 2i + 2
- Parent: (i - 1) // 2

Key Operations:
- Insert (Push): Add at end, bubble up - O(log n)
- Extract (Pop): Remove root, replace with last, bubble down - O(log n)
- Peek: Return root without removing - O(1)
- Heapify: Convert array to heap - O(n)

Heapify (Bubble Down):
Starting from a node, compare with children and swap with the larger (max-heap) or smaller (min-heap) child. Repeat until heap property is restored.

Applications:
- Priority queues
- Heap sort (O(n log n))
- Finding k-th largest/smallest element
- Graph algorithms (Dijkstra's, Prim's)`,
        keyPoints: [
          'Complete binary tree with heap property',
          'Max-heap: parent ≥ children, Min-heap: parent ≤ children',
          'Array storage: left child = 2i+1, right child = 2i+2, parent = (i-1)//2',
          'Insert and extract are O(log n)',
          'Building heap from array is O(n) with bottom-up heapify',
          'Python heapq module provides min-heap implementation'
        ],
        codeExamples: [
          {
            title: 'Min-Heap Implementation',
            language: 'python',
            code: `class MinHeap:
    def __init__(self):
        self.heap = []

    def parent(self, i): return (i - 1) // 2
    def left(self, i): return 2 * i + 1
    def right(self, i): return 2 * i + 2

    def insert(self, key):
        self.heap.append(key)
        self._bubble_up(len(self.heap) - 1)

    def _bubble_up(self, i):
        while i > 0 and self.heap[self.parent(i)] > self.heap[i]:
            p = self.parent(i)
            self.heap[i], self.heap[p] = self.heap[p], self.heap[i]
            i = p

    def extract_min(self):
        if not self.heap:
            return None
        if len(self.heap) == 1:
            return self.heap.pop()

        min_val = self.heap[0]
        self.heap[0] = self.heap.pop()  # Move last to root
        self._bubble_down(0)
        return min_val

    def _bubble_down(self, i):
        smallest = i
        l, r = self.left(i), self.right(i)

        if l < len(self.heap) and self.heap[l] < self.heap[smallest]:
            smallest = l
        if r < len(self.heap) and self.heap[r] < self.heap[smallest]:
            smallest = r

        if smallest != i:
            self.heap[i], self.heap[smallest] = self.heap[smallest], self.heap[i]
            self._bubble_down(smallest)`,
            explanation: 'Min-heap with insert (bubble up) and extract_min (bubble down) operations.'
          },
          {
            title: 'Using Python heapq',
            language: 'python',
            code: `import heapq

# Create min-heap
heap = []
heapq.heappush(heap, 5)
heapq.heappush(heap, 3)
heapq.heappush(heap, 7)
heapq.heappush(heap, 1)

print(heapq.heappop(heap))  # 1 (smallest)
print(heapq.heappop(heap))  # 3

# Heapify existing list - O(n)
arr = [5, 3, 7, 1, 9, 2]
heapq.heapify(arr)
print(arr)  # [1, 3, 2, 5, 9, 7]

# For max-heap, negate values
max_heap = []
for x in [5, 3, 7, 1]:
    heapq.heappush(max_heap, -x)
print(-heapq.heappop(max_heap))  # 7 (largest)`,
            explanation: 'Python heapq provides efficient min-heap operations. For max-heap, negate values before inserting.'
          }
        ],
        resources: [
          {
            title: 'Heap Data Structure',
            url: 'https://www.geeksforgeeks.org/dsa/heap-data-structure/',
            type: 'tutorial',
            source: 'GeeksforGeeks'
          },
          {
            title: 'Binary Heap',
            url: 'https://www.geeksforgeeks.org/dsa/binary-heap/',
            type: 'reference',
            source: 'GeeksforGeeks'
          }
        ]
      },
      {
        id: 'hash-tables',
        courseId: 'sc1007',
        name: 'Hash Tables',
        order: 10,
        prerequisites: [],
        summary: `A hash table is a data structure that maps keys to values using a hash function. It provides average O(1) time for insert, delete, and lookup operations.

Components:
- Hash Function: Converts key to array index
- Array (Buckets): Stores key-value pairs
- Collision Resolution: Handles multiple keys mapping to same index

Hash Function Properties:
- Deterministic: Same key always produces same hash
- Uniform distribution: Spreads keys evenly across buckets
- Fast to compute

Collision Resolution Strategies:

1. Chaining (Separate Chaining):
- Each bucket contains a linked list
- Colliding elements are added to the same list
- Simple but uses extra memory for pointers

2. Open Addressing:
- All elements stored in the array itself
- Linear Probing: Check next slot (i+1, i+2, ...)
- Quadratic Probing: Check i+1², i+2², i+3², ...
- Double Hashing: Use second hash function for step size

Load Factor:
α = n / m (number of elements / table size)
- Higher load factor → more collisions
- Typically resize when α > 0.7

Time Complexity:
- Average case: O(1) for insert, search, delete
- Worst case: O(n) when all keys collide`,
        keyPoints: [
          'Hash function converts key to array index',
          'Average O(1) for insert, search, delete',
          'Collisions occur when different keys hash to same index',
          'Chaining: linked lists at each bucket',
          'Open addressing: probe for next empty slot',
          'Load factor α = n/m; resize when α > 0.7'
        ],
        codeExamples: [
          {
            title: 'Hash Table with Chaining',
            language: 'python',
            code: `class HashTable:
    def __init__(self, size=10):
        self.size = size
        self.table = [[] for _ in range(size)]

    def _hash(self, key):
        return hash(key) % self.size

    def insert(self, key, value):
        index = self._hash(key)
        # Check if key exists, update if so
        for i, (k, v) in enumerate(self.table[index]):
            if k == key:
                self.table[index][i] = (key, value)
                return
        self.table[index].append((key, value))

    def search(self, key):
        index = self._hash(key)
        for k, v in self.table[index]:
            if k == key:
                return v
        return None

    def delete(self, key):
        index = self._hash(key)
        for i, (k, v) in enumerate(self.table[index]):
            if k == key:
                del self.table[index][i]
                return True
        return False

# Usage
ht = HashTable()
ht.insert("apple", 5)
ht.insert("banana", 3)
print(ht.search("apple"))  # 5`,
            explanation: 'Hash table using chaining for collision resolution. Each bucket is a list of (key, value) pairs.'
          },
          {
            title: 'Linear Probing',
            language: 'python',
            code: `class LinearProbingHashTable:
    def __init__(self, size=10):
        self.size = size
        self.keys = [None] * size
        self.values = [None] * size

    def _hash(self, key):
        return hash(key) % self.size

    def insert(self, key, value):
        index = self._hash(key)
        while self.keys[index] is not None:
            if self.keys[index] == key:
                self.values[index] = value  # Update existing
                return
            index = (index + 1) % self.size  # Linear probe
        self.keys[index] = key
        self.values[index] = value

    def search(self, key):
        index = self._hash(key)
        start = index
        while self.keys[index] is not None:
            if self.keys[index] == key:
                return self.values[index]
            index = (index + 1) % self.size
            if index == start:  # Full circle
                break
        return None`,
            explanation: 'Open addressing with linear probing. On collision, check the next consecutive slot.'
          }
        ],
        resources: [
          {
            title: 'Hash Table Data Structure',
            url: 'https://www.geeksforgeeks.org/hashing-data-structure/',
            type: 'tutorial',
            source: 'GeeksforGeeks'
          },
          {
            title: 'Hash Tables Tutorial',
            url: 'https://www.w3schools.com/dsa/dsa_theory_hashtables.php',
            type: 'tutorial',
            source: 'W3Schools'
          }
        ]
      },
      {
        id: 'tries',
        courseId: 'sc1007',
        name: 'Tries (Prefix Trees)',
        order: 11,
        prerequisites: [],
        summary: `A Trie (pronounced "try") is a tree-like data structure used for storing and searching strings efficiently. Each node represents a character, and paths from root to nodes represent prefixes.

Structure:
- Root represents empty string
- Each edge represents a character
- Each node may mark end of a valid word
- Children can be stored in array (for fixed alphabet) or hash map

Key Operations:
- Insert: O(m) where m is word length
- Search: O(m)
- Prefix Search: O(p) where p is prefix length
- Delete: O(m)

Advantages:
- Fast prefix-based operations
- Efficient for autocomplete and spell checking
- No hash collisions
- Alphabetically ordered traversal

Disadvantages:
- High memory usage for sparse data
- Can be slower than hash tables for single lookups

Applications:
- Autocomplete / typeahead
- Spell checkers
- IP routing tables
- Dictionary implementations
- Word games (Boggle, Scrabble)`,
        keyPoints: [
          'Tree structure where each node represents a character',
          'Paths from root to node represent string prefixes',
          'O(m) operations where m is string length',
          'Excellent for prefix-based searches and autocomplete',
          'Memory intensive but no hash collisions',
          'Each node needs isEndOfWord flag'
        ],
        codeExamples: [
          {
            title: 'Trie Implementation',
            language: 'python',
            code: `class TrieNode:
    def __init__(self):
        self.children = {}  # char -> TrieNode
        self.is_end_of_word = False

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word):
        node = self.root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.is_end_of_word = True

    def search(self, word):
        node = self._find_node(word)
        return node is not None and node.is_end_of_word

    def starts_with(self, prefix):
        return self._find_node(prefix) is not None

    def _find_node(self, prefix):
        node = self.root
        for char in prefix:
            if char not in node.children:
                return None
            node = node.children[char]
        return node

# Usage
trie = Trie()
trie.insert("apple")
trie.insert("app")
trie.insert("application")

print(trie.search("app"))        # True
print(trie.search("ap"))         # False
print(trie.starts_with("app"))   # True`,
            explanation: 'Basic Trie with insert, search, and prefix search operations. Uses dictionary for flexible character sets.'
          },
          {
            title: 'Autocomplete with Trie',
            language: 'python',
            code: `class AutocompleteTrie(Trie):
    def autocomplete(self, prefix):
        """Return all words starting with prefix"""
        results = []
        node = self._find_node(prefix)
        if node:
            self._collect_words(node, prefix, results)
        return results

    def _collect_words(self, node, current_word, results):
        if node.is_end_of_word:
            results.append(current_word)
        for char, child_node in node.children.items():
            self._collect_words(child_node, current_word + char, results)

# Usage
ac = AutocompleteTrie()
words = ["cat", "car", "card", "care", "careful", "dog"]
for word in words:
    ac.insert(word)

print(ac.autocomplete("car"))  # ['car', 'card', 'care', 'careful']
print(ac.autocomplete("ca"))   # ['cat', 'car', 'card', 'care', 'careful']`,
            explanation: 'Extended Trie for autocomplete functionality. Collects all words with a given prefix using DFS.'
          }
        ],
        resources: [
          {
            title: 'Trie Data Structure',
            url: 'https://www.geeksforgeeks.org/trie-insert-and-search/',
            type: 'tutorial',
            source: 'GeeksforGeeks'
          },
          {
            title: 'Tries Tutorial',
            url: 'https://www.w3schools.com/dsa/dsa_data_tries.php',
            type: 'tutorial',
            source: 'W3Schools'
          }
        ]
      }
    ]
  },
  {
    id: 'sc1008',
    code: 'SC1008',
    name: 'C/C++ Programming',
    description: 'Fundamentals of programming in C and C++, including data types, control flow, functions, pointers, arrays, structures, and recursion.',
    topics: [
      {
        id: 'c-basics',
        courseId: 'sc1008',
        name: 'C Programming Basics',
        order: 1,
        prerequisites: [],
        summary: `C is a general-purpose, procedural programming language developed by Dennis Ritchie at Bell Labs in 1972. It provides low-level access to memory and efficient execution.

C Development Cycle:
1. Editing: Write source code (.c file)
2. Preprocessing: Handle #include, #define directives
3. Compilation: Convert C code to assembly, then to object code (.o/.obj)
4. Linking: Combine object files and libraries into executable
5. Execution: Run the compiled program

Basic Structure of a C Program:
\`\`\`c
#include <stdio.h>  // Preprocessor directive

int main() {        // Main function - entry point
    // Your code here
    return 0;       // Return 0 indicates success
}
\`\`\`

Data Types:
- int: Integer numbers (typically 4 bytes, may be 2 on older systems)
- float: Single-precision floating point (4 bytes)
- double: Double-precision floating point (8 bytes)
- char: Single character (1 byte, uses ASCII)
- void: No value/type

Floating-Point Precision Warning:
Floating-point numbers have limited precision. For example, 2.0 may be stored as 1.9999999 internally. Never use == to compare floats directly. Instead, check if the difference is within a small epsilon value.

Variable Declaration:
\`\`\`c
int age = 25;
float price = 19.99;
char grade = 'A';
\`\`\`

Operators:
- Arithmetic: +, -, *, /, % (modulo)
- Relational: ==, !=, <, >, <=, >=
- Logical: && (AND), || (OR), ! (NOT)
- Assignment: =, +=, -=, *=, /=
- Increment/Decrement: ++, --

Input/Output:
- printf(): Formatted output to console
- scanf(): Formatted input from console`,
        keyPoints: [
          'Development cycle: Edit → Preprocess → Compile → Link → Execute',
          'C programs start execution from main()',
          'Variables must be declared before use',
          'Never compare floats with ==; use epsilon comparison instead',
          'printf() uses format specifiers: %d (int), %f (float), %c (char), %s (string)',
          'scanf() requires address operator (&) for variables'
        ],
        codeExamples: [
          {
            title: 'Hello World and Basic I/O',
            language: 'c',
            code: `#include <stdio.h>

int main() {
    int num;
    printf("Hello, World!\\n");
    printf("Enter a number: ");
    scanf("%d", &num);
    printf("You entered: %d\\n", num);
    return 0;
}`,
            explanation: 'Basic program showing output with printf() and input with scanf(). Note the & operator in scanf to pass the address of the variable.'
          }
        ],
        resources: [
          {
            title: 'C Tutorial',
            url: 'https://www.w3schools.com/c/',
            type: 'tutorial',
            source: 'W3Schools'
          },
          {
            title: 'Learn C Programming',
            url: 'https://www.learn-c.org/',
            type: 'tutorial',
            source: 'Learn-C.org'
          },
          {
            title: 'C Programming Basics',
            url: 'https://www.geeksforgeeks.org/c-programming-language/',
            type: 'tutorial',
            source: 'GeeksforGeeks'
          }
        ]
      },
      {
        id: 'control-flow',
        courseId: 'sc1008',
        name: 'Control Flow',
        order: 2,
        prerequisites: [],
        summary: `Control flow statements determine the order in which code is executed based on conditions.

Conditional Statements:

if-else:
\`\`\`c
if (condition) {
    // executed if condition is true
} else if (another_condition) {
    // executed if another_condition is true
} else {
    // executed if all conditions are false
}
\`\`\`

switch:
\`\`\`c
switch (expression) {
    case value1:
        // code
        break;
    case value2:
        // code
        break;
    default:
        // default code
}
\`\`\`

Loops:

for loop:
\`\`\`c
for (init; condition; update) {
    // loop body
}
\`\`\`

while loop:
\`\`\`c
while (condition) {
    // loop body
}
\`\`\`

do-while loop:
\`\`\`c
do {
    // loop body (executes at least once)
} while (condition);
\`\`\`

Loop Control:
- break: Exit the loop immediately
- continue: Skip to next iteration`,
        keyPoints: [
          'if-else for binary decisions, switch for multiple cases',
          'for loop: known number of iterations',
          'while loop: condition checked before each iteration',
          'do-while: executes at least once, condition checked after',
          'break exits loop entirely, continue skips to next iteration',
          'Forgetting break in switch causes fall-through'
        ],
        codeExamples: [
          {
            title: 'Loop Examples',
            language: 'c',
            code: `// Print 1 to 5 using for loop
for (int i = 1; i <= 5; i++) {
    printf("%d ", i);
}

// Same with while loop
int i = 1;
while (i <= 5) {
    printf("%d ", i);
    i++;
}

// Skip even numbers
for (int i = 1; i <= 10; i++) {
    if (i % 2 == 0) continue;
    printf("%d ", i);  // Prints: 1 3 5 7 9
}`,
            explanation: 'Different loop constructs achieving similar results. The continue statement skips even numbers.'
          }
        ],
        resources: [
          {
            title: 'C Control Flow',
            url: 'https://www.w3schools.com/c/c_conditions.php',
            type: 'tutorial',
            source: 'W3Schools'
          },
          {
            title: 'C Loops',
            url: 'https://www.geeksforgeeks.org/c-loops/',
            type: 'tutorial',
            source: 'GeeksforGeeks'
          }
        ]
      },
      {
        id: 'functions',
        courseId: 'sc1008',
        name: 'Functions',
        order: 3,
        prerequisites: [],
        summary: `Functions are reusable blocks of code that perform specific tasks. They help organize code and avoid repetition.

Function Components:
\`\`\`c
return_type function_name(parameters) {
    // function body
    return value;  // if return_type is not void
}
\`\`\`

Function Declaration (Prototype):
Tells the compiler about the function before its definition.
\`\`\`c
int add(int a, int b);  // Declaration
\`\`\`

Function Definition:
The actual implementation of the function.
\`\`\`c
int add(int a, int b) {
    return a + b;
}
\`\`\`

Parameter Passing:
- Pass by Value: Function receives a copy of the argument
- Pass by Reference: Function receives the address (using pointers)

Scope:
- Local Variables: Exist only within the function
- Global Variables: Accessible throughout the program
- Static Variables: Retain value between function calls`,
        keyPoints: [
          'Function prototype declares function before main()',
          'Pass by value: changes don\'t affect original variable',
          'Pass by reference (with pointers): can modify original',
          'void functions don\'t return a value',
          'Local variables are destroyed when function ends',
          'Static local variables persist between calls'
        ],
        codeExamples: [
          {
            title: 'Pass by Value vs Reference',
            language: 'c',
            code: `void byValue(int x) {
    x = 100;  // Only changes local copy
}

void byReference(int *x) {
    *x = 100;  // Changes original variable
}

int main() {
    int a = 5, b = 5;
    byValue(a);
    printf("a = %d\\n", a);  // Output: a = 5

    byReference(&b);
    printf("b = %d\\n", b);  // Output: b = 100
    return 0;
}`,
            explanation: 'Pass by value creates a copy; changes don\'t affect the original. Pass by reference uses pointers to modify the original variable.'
          }
        ],
        resources: [
          {
            title: 'C Functions',
            url: 'https://www.w3schools.com/c/c_functions.php',
            type: 'tutorial',
            source: 'W3Schools'
          },
          {
            title: 'Functions in C',
            url: 'https://www.geeksforgeeks.org/c-functions/',
            type: 'tutorial',
            source: 'GeeksforGeeks'
          }
        ]
      },
      {
        id: 'pointers',
        courseId: 'sc1008',
        name: 'Pointers',
        order: 4,
        prerequisites: [],
        summary: `Pointers are variables that store memory addresses. They are fundamental to C and enable efficient memory manipulation.

Pointer Basics:
\`\`\`c
int x = 10;
int *ptr = &x;  // ptr holds address of x
\`\`\`

Pointer Operators:
- & (Address-of): Gets the memory address of a variable
- \\* (Dereference): Accesses the value at the address

Pointer Arithmetic:
\`\`\`c
int arr[5] = {10, 20, 30, 40, 50};
int *p = arr;       // Points to arr[0]
p++;                // Now points to arr[1]
printf("%d", *p);   // Prints 20
\`\`\`

Pointer to Pointer:
\`\`\`c
int x = 5;
int *p = &x;
int pp = &p;  // Pointer to pointer
printf("%d", pp);  // Prints 5
\`\`\`

NULL Pointer:
A pointer that points to nothing (address 0).
\`\`\`c
int *ptr = NULL;  // Safe initialization
\`\`\`

Common Uses:
- Dynamic memory allocation
- Passing arrays to functions
- Implementing data structures
- Modifying function arguments

Buffer Overflow (Security Risk):
Buffer overflow occurs when writing data beyond allocated memory bounds. This is a major security vulnerability in C:
\`\`\`c
char buffer[10];
strcpy(buffer, "This string is too long!");  // DANGER: Overflow!
\`\`\`
Always check buffer sizes. Use safe functions like \`strncpy()\` instead of \`strcpy()\`, and \`fgets()\` instead of \`gets()\`.`,
        keyPoints: [
          '& gets address, * dereferences (gets value at address)',
          'Pointer arithmetic: p++ moves by sizeof(type) bytes',
          'Array name is essentially a pointer to first element',
          'NULL pointer is a pointer that points to nothing',
          'Buffer overflow: writing beyond allocated memory is a major security risk',
          'Use strncpy/fgets instead of strcpy/gets to prevent overflow'
        ],
        codeExamples: [
          {
            title: 'Pointer Operations',
            language: 'c',
            code: `int main() {
    int x = 10;
    int *p = &x;

    printf("Value of x: %d\\n", x);        // 10
    printf("Address of x: %p\\n", &x);     // 0x7fff...
    printf("Value of p: %p\\n", p);        // Same address
    printf("Value at p: %d\\n", *p);       // 10

    *p = 20;  // Modify x through pointer
    printf("New value of x: %d\\n", x);    // 20

    return 0;
}`,
            explanation: 'Demonstrates getting addresses with & and dereferencing with *. Modifying *p changes the original variable x.'
          }
        ],
        resources: [
          {
            title: 'C Pointers',
            url: 'https://www.w3schools.com/c/c_pointers.php',
            type: 'tutorial',
            source: 'W3Schools'
          },
          {
            title: 'Pointers in C',
            url: 'https://www.geeksforgeeks.org/c/c-pointers/',
            type: 'tutorial',
            source: 'GeeksforGeeks'
          },
          {
            title: 'C Pointers Tutorial',
            url: 'https://www.learn-c.org/en/Pointers',
            type: 'tutorial',
            source: 'Learn-C.org'
          }
        ]
      },
      {
        id: 'arrays',
        courseId: 'sc1008',
        name: 'Arrays',
        order: 5,
        prerequisites: [],
        summary: `Arrays are collections of elements of the same type stored in contiguous memory locations.

1D Array:
\`\`\`c
int arr[5] = {1, 2, 3, 4, 5};  // Declaration and initialization
int arr2[5];                    // Declaration only
arr2[0] = 10;                   // Assignment
\`\`\`

2D Array:
\`\`\`c
int matrix[3][4];              // 3 rows, 4 columns
matrix[0][0] = 1;              // Access element
\`\`\`

Arrays and Pointers:
- Array name is a constant pointer to first element
- arr[i] is equivalent to *(arr + i)
- &arr[i] is equivalent to (arr + i)

Strings (Character Arrays):
\`\`\`c
char str[] = "Hello";     // String with null terminator
char str2[10] = "Hi";     // Array larger than string
\`\`\`

String Functions (string.h):
- strlen(): Get string length
- strcpy(): Copy string
- strcat(): Concatenate strings
- strcmp(): Compare strings`,
        keyPoints: [
          'Array indices start at 0',
          'Array size must be known at compile time (for stack arrays)',
          'Array name decays to pointer when passed to function',
          'Strings are null-terminated character arrays (\\0)',
          '2D arrays stored in row-major order',
          'No bounds checking in C - can cause buffer overflow'
        ],
        codeExamples: [
          {
            title: 'Array Traversal and Strings',
            language: 'c',
            code: `#include <stdio.h>
#include <string.h>

int main() {
    int arr[] = {10, 20, 30, 40, 50};
    int size = sizeof(arr) / sizeof(arr[0]);

    // Traverse using index
    for (int i = 0; i < size; i++) {
        printf("%d ", arr[i]);
    }

    // String operations
    char str1[20] = "Hello";
    char str2[] = " World";
    strcat(str1, str2);         // Concatenate
    printf("\\n%s\\n", str1);     // Hello World
    printf("Length: %lu\\n", strlen(str1));  // 11

    return 0;
}`,
            explanation: 'Shows array traversal and common string operations. sizeof trick calculates array size.'
          }
        ],
        resources: [
          {
            title: 'C Arrays',
            url: 'https://www.w3schools.com/c/c_arrays.php',
            type: 'tutorial',
            source: 'W3Schools'
          },
          {
            title: 'Arrays in C',
            url: 'https://www.geeksforgeeks.org/c-arrays/',
            type: 'tutorial',
            source: 'GeeksforGeeks'
          }
        ]
      },
      {
        id: 'structures',
        courseId: 'sc1008',
        name: 'Structures',
        order: 6,
        prerequisites: [],
        summary: `Structures allow grouping variables of different types under a single name.

Structure Definition:
\`\`\`c
struct Student {
    char name[50];
    int age;
    float gpa;
};
\`\`\`

Structure Declaration and Access:
\`\`\`c
struct Student s1;
s1.age = 20;               // Dot operator for access

struct Student *ptr = &s1;
ptr->age = 21;             // Arrow operator for pointer
\`\`\`

typedef:
Creates an alias for a type.
\`\`\`c
typedef struct {
    int x;
    int y;
} Point;

Point p1 = {10, 20};  // No need for 'struct' keyword
\`\`\`

Structures and Functions:
- Pass by value: entire structure is copied
- Pass by pointer: more efficient for large structures

Nested Structures:
\`\`\`c
struct Address {
    char city[50];
    int zip;
};

struct Person {
    char name[50];
    struct Address addr;  // Nested structure
};
\`\`\``,
        keyPoints: [
          'struct groups related variables of different types',
          'Use dot (.) operator to access members',
          'Use arrow (->) operator with structure pointers',
          'typedef creates aliases for cleaner syntax',
          'Structures can contain arrays and other structures',
          'Pass large structures by pointer for efficiency'
        ],
        codeExamples: [
          {
            title: 'Structure Example',
            language: 'c',
            code: `#include <stdio.h>
#include <string.h>

typedef struct {
    char name[50];
    int age;
    float gpa;
} Student;

void printStudent(Student *s) {
    printf("Name: %s\\n", s->name);
    printf("Age: %d\\n", s->age);
    printf("GPA: %.2f\\n", s->gpa);
}

int main() {
    Student s1;
    strcpy(s1.name, "Alice");
    s1.age = 20;
    s1.gpa = 3.8;

    printStudent(&s1);  // Pass by pointer
    return 0;
}`,
            explanation: 'Demonstrates structure definition with typedef, member access with dot and arrow operators, and passing structures to functions.'
          }
        ],
        resources: [
          {
            title: 'C Structures',
            url: 'https://www.w3schools.com/c/c_structs.php',
            type: 'tutorial',
            source: 'W3Schools'
          },
          {
            title: 'Structures in C',
            url: 'https://www.geeksforgeeks.org/structures-c/',
            type: 'tutorial',
            source: 'GeeksforGeeks'
          }
        ]
      },
      {
        id: 'recursion',
        courseId: 'sc1008',
        name: 'Recursion',
        order: 7,
        prerequisites: [],
        summary: `Recursion is a technique where a function calls itself to solve smaller subproblems of the same type.

Components of Recursion:
1. Base Case: Condition that stops recursion
2. Recursive Case: Function calls itself with smaller input

How Recursion Works:
- Each recursive call creates a new stack frame
- Stack frames store local variables and return addresses
- Returns unwind the stack in reverse order

Example - Factorial:
\`\`\`c
int factorial(int n) {
    if (n <= 1) return 1;        // Base case
    return n * factorial(n - 1);  // Recursive case
}
\`\`\`

Example - Fibonacci:
\`\`\`c
int fibonacci(int n) {
    if (n <= 1) return n;                         // Base case
    return fibonacci(n-1) + fibonacci(n-2);       // Recursive case
}
\`\`\`

Recursion vs Iteration:
- Recursion: Often more elegant, matches problem structure
- Iteration: Usually more efficient (no stack overhead)
- Some problems naturally recursive (tree traversal, divide & conquer)

Tail Recursion:
When recursive call is the last operation, compiler can optimize.`,
        keyPoints: [
          'Every recursive function must have a base case',
          'Without base case, infinite recursion causes stack overflow',
          'Each recursive call uses stack memory',
          'Recursion can be converted to iteration (and vice versa)',
          'Think of recursion as solving a smaller version of the same problem',
          'Common recursive patterns: factorial, Fibonacci, tree traversal'
        ],
        codeExamples: [
          {
            title: 'Recursive Functions',
            language: 'c',
            code: `#include <stdio.h>

// Factorial: n! = n * (n-1)!
int factorial(int n) {
    if (n <= 1) return 1;        // Base case
    return n * factorial(n - 1);  // Recursive case
}

// Sum of array elements
int sumArray(int arr[], int n) {
    if (n <= 0) return 0;                    // Base case
    return arr[n-1] + sumArray(arr, n - 1);  // Recursive case
}

int main() {
    printf("5! = %d\\n", factorial(5));  // 120

    int arr[] = {1, 2, 3, 4, 5};
    printf("Sum = %d\\n", sumArray(arr, 5));  // 15
    return 0;
}`,
            explanation: 'Factorial multiplies n by factorial of n-1 until reaching 1. sumArray adds last element to sum of remaining elements.'
          }
        ],
        resources: [
          {
            title: 'Recursion in C',
            url: 'https://www.geeksforgeeks.org/c-recursion/',
            type: 'tutorial',
            source: 'GeeksforGeeks'
          },
          {
            title: 'C Recursion Tutorial',
            url: 'https://www.w3schools.com/c/c_functions_recursion.php',
            type: 'tutorial',
            source: 'W3Schools'
          }
        ]
      }
    ]
  },
  {
    id: 'sc2002',
    code: 'SC2002',
    name: 'Object-Oriented Design & Programming',
    description: 'Object-oriented programming concepts using Java, including classes, objects, inheritance, polymorphism, encapsulation, and design patterns.',
    topics: [
      {
        id: 'oop-introduction',
        courseId: 'sc2002',
        name: 'Introduction to OOP',
        order: 1,
        prerequisites: [],
        summary: `Object-Oriented Programming (OOP) is a programming paradigm based on the concept of "objects" that contain data and methods.

Procedural vs Object-Oriented:

Procedural Programming:
- Focus on functions/procedures that operate on data
- Data and functions are separate
- Code organized around actions
- Example languages: C, Pascal

Object-Oriented Programming:
- Focus on objects that combine data and behavior
- Data and methods encapsulated together
- Code organized around real-world entities
- Example languages: Java, C++, Python

Four Pillars of OOP:

1. Encapsulation:
- Bundling data (attributes) with methods that operate on it
- Hiding internal implementation details
- Access control through public/private/protected

2. Abstraction:
- Showing only essential features, hiding complexity
- Users interact with interface, not implementation
- Abstract classes and interfaces

3. Inheritance:
- Creating new classes based on existing ones
- Child class inherits attributes and methods from parent
- Promotes code reuse

4. Polymorphism:
- Same interface, different implementations
- One name, many forms
- Method overloading and overriding

Benefits of OOP:
- Modularity and code reuse
- Easier maintenance and updates
- Better modeling of real-world entities
- Improved collaboration in teams`,
        keyPoints: [
          'OOP organizes code around objects, not functions',
          'Objects combine data (attributes) and behavior (methods)',
          'Four pillars: Encapsulation, Abstraction, Inheritance, Polymorphism',
          'Encapsulation hides internal details, exposes clean interface',
          'Inheritance enables code reuse through parent-child relationships',
          'Polymorphism allows same method name with different behaviors'
        ],
        codeExamples: [
          {
            title: 'Procedural vs OOP Comparison',
            language: 'java',
            code: `// PROCEDURAL APPROACH (like C)
// Data and functions are separate
class ProceduralStyle {
    static int calculateArea(int length, int width) {
        return length * width;
    }
    public static void main(String[] args) {
        int l = 5, w = 3;
        int area = calculateArea(l, w);
        System.out.println("Area: " + area);
    }
}

// OOP APPROACH
// Data and methods are combined in objects
class Rectangle {
    private int length;
    private int width;

    public Rectangle(int length, int width) {
        this.length = length;
        this.width = width;
    }

    public int calculateArea() {
        return length * width;
    }
}

class OOPStyle {
    public static void main(String[] args) {
        Rectangle rect = new Rectangle(5, 3);
        System.out.println("Area: " + rect.calculateArea());
    }
}`,
            explanation: 'In procedural style, data (length, width) is separate from functions. In OOP, the Rectangle object owns its data and knows how to calculate its area.'
          }
        ],
        resources: [
          {
            title: 'Java OOP Concepts',
            url: 'https://docs.oracle.com/javase/tutorial/java/concepts/',
            type: 'documentation',
            source: 'Oracle'
          },
          {
            title: 'Java OOP Tutorial',
            url: 'https://www.w3schools.com/java/java_oop.asp',
            type: 'tutorial',
            source: 'W3Schools'
          },
          {
            title: 'OOP in Java',
            url: 'https://www.geeksforgeeks.org/java/object-oriented-programming-oops-concept-in-java/',
            type: 'tutorial',
            source: 'GeeksforGeeks'
          }
        ]
      },
      {
        id: 'classes-objects',
        courseId: 'sc2002',
        name: 'Classes and Objects',
        order: 2,
        prerequisites: [],
        summary: `A class is a blueprint/template for creating objects. An object is an instance of a class.

Class Components:

Attributes (Fields/Properties):
- Variables that store object state
- Each object has its own copy (instance variables)
- Static variables shared by all instances

Methods (Functions/Behaviors):
- Functions that define object behavior
- Can access and modify object's attributes
- Instance methods vs static methods

Constructor:
- Special method called when creating an object
- Same name as class, no return type
- Initializes object's attributes
- Can be overloaded

Java Class Syntax:
\`\`\`java
public class ClassName {
    // Attributes
    private datatype attributeName;

    // Constructor
    public ClassName(parameters) {
        // initialization
    }

    // Methods
    public returnType methodName(parameters) {
        // implementation
    }
}
\`\`\`

Creating Objects:
\`\`\`java
ClassName obj = new ClassName(arguments);
obj.methodName(); // calling method
\`\`\`

Object References (Important!):
In Java, object variables store references (memory addresses), not the actual object:
\`\`\`java
Rectangle rect1 = new Rectangle(5, 3);  // rect1 holds a reference
Rectangle rect2 = rect1;                 // rect2 references SAME object
rect2.setLength(10);                     // Changes rect1 too!
\`\`\`
Assignment (=) copies the reference, not the object. Both variables point to the same object in memory.

Method Overloading:
Multiple methods with the same name but different parameters:
\`\`\`java
public void print(int x) { ... }
public void print(String s) { ... }
public void print(int x, int y) { ... }
\`\`\`
Compiler chooses the correct method based on argument types.

'this' Keyword:
- Refers to current object instance
- Distinguishes instance variables from parameters
- Can call other constructors: this()`,
        keyPoints: [
          'Class = blueprint, Object = instance of class',
          'Object variables hold references, not actual objects',
          'Assignment (=) copies reference, not object (both point to same memory)',
          'Constructor initializes object (same name as class, no return type)',
          'Method overloading: same name, different parameters',
          '"this" refers to current object instance'
        ],
        codeExamples: [
          {
            title: 'Class Definition and Object Creation',
            language: 'java',
            code: `public class Student {
    // Attributes (instance variables)
    private String name;
    private int age;
    private double gpa;

    // Constructor
    public Student(String name, int age, double gpa) {
        this.name = name;    // 'this' distinguishes instance var from parameter
        this.age = age;
        this.gpa = gpa;
    }

    // Getter methods
    public String getName() { return name; }
    public int getAge() { return age; }
    public double getGpa() { return gpa; }

    // Setter methods
    public void setGpa(double gpa) {
        if (gpa >= 0 && gpa <= 4.0) {
            this.gpa = gpa;
        }
    }

    // Instance method
    public void displayInfo() {
        System.out.println(name + ", Age: " + age + ", GPA: " + gpa);
    }
}

// Main class to test
public class Main {
    public static void main(String[] args) {
        // Creating objects
        Student s1 = new Student("Alice", 20, 3.8);
        Student s2 = new Student("Bob", 21, 3.5);

        s1.displayInfo();  // Alice, Age: 20, GPA: 3.8
        s2.displayInfo();  // Bob, Age: 21, GPA: 3.5

        s1.setGpa(3.9);    // Update GPA with validation
    }
}`,
            explanation: 'Student class defines blueprint with attributes and methods. Each Student object has its own name, age, and gpa. Getters/setters provide controlled access.'
          }
        ],
        resources: [
          {
            title: 'Java Classes and Objects',
            url: 'https://docs.oracle.com/javase/tutorial/java/javaOO/index.html',
            type: 'documentation',
            source: 'Oracle'
          },
          {
            title: 'Java Classes Tutorial',
            url: 'https://www.w3schools.com/java/java_classes.asp',
            type: 'tutorial',
            source: 'W3Schools'
          }
        ]
      },
      {
        id: 'encapsulation',
        courseId: 'sc2002',
        name: 'Encapsulation & Access Modifiers',
        order: 3,
        prerequisites: [],
        summary: `Encapsulation is the bundling of data and methods that operate on that data within a single unit (class), and restricting direct access to some components.

Access Modifiers in Java:

| Modifier | Class | Package | Subclass | World |
|----------|-------|---------|----------|-------|
| public | ✓ | ✓ | ✓ | ✓ |
| protected | ✓ | ✓ | ✓ | ✗ |
| (default) | ✓ | ✓ | ✗ | ✗ |
| private | ✓ | ✗ | ✗ | ✗ |

Best Practices:
- Make attributes private
- Provide public getter/setter methods
- Validate data in setters
- Hide implementation details

Getters and Setters:
- Getter: retrieves attribute value
- Setter: modifies attribute value with validation
- Also called accessors and mutators

Benefits of Encapsulation:
- Data protection (validation in setters)
- Flexibility to change implementation
- Control over data access
- Reduced coupling between classes

Immutable Objects:
- Objects that cannot be modified after creation
- All fields final, no setters
- Example: String class in Java`,
        keyPoints: [
          'Encapsulation = data + methods bundled together + access control',
          'private: accessible only within the class',
          'public: accessible from anywhere',
          'protected: accessible in class, package, and subclasses',
          'Make fields private, provide public getters/setters',
          'Setters can validate input before modifying data'
        ],
        codeExamples: [
          {
            title: 'Encapsulation with Validation',
            language: 'java',
            code: `public class BankAccount {
    // Private attributes - cannot be accessed directly from outside
    private String accountNumber;
    private double balance;
    private String ownerName;

    public BankAccount(String accountNumber, String ownerName) {
        this.accountNumber = accountNumber;
        this.ownerName = ownerName;
        this.balance = 0.0;
    }

    // Public getter - read-only access
    public double getBalance() {
        return balance;
    }

    public String getAccountNumber() {
        return accountNumber;
    }

    // No setter for accountNumber - it's immutable
    // No direct setter for balance - use deposit/withdraw

    // Methods with business logic and validation
    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
            System.out.println("Deposited: $" + amount);
        } else {
            System.out.println("Invalid deposit amount");
        }
    }

    public boolean withdraw(double amount) {
        if (amount > 0 && amount <= balance) {
            balance -= amount;
            System.out.println("Withdrew: $" + amount);
            return true;
        }
        System.out.println("Insufficient funds or invalid amount");
        return false;
    }
}

// Usage
public class Main {
    public static void main(String[] args) {
        BankAccount account = new BankAccount("123456", "Alice");
        account.deposit(1000);
        account.withdraw(500);
        System.out.println("Balance: $" + account.getBalance());
        // account.balance = 1000000; // ERROR: balance is private!
    }
}`,
            explanation: 'Balance can only be modified through deposit/withdraw methods which include validation. Direct access is prevented by making fields private.'
          }
        ],
        resources: [
          {
            title: 'Java Encapsulation',
            url: 'https://www.w3schools.com/java/java_encapsulation.asp',
            type: 'tutorial',
            source: 'W3Schools'
          },
          {
            title: 'Access Modifiers in Java',
            url: 'https://www.geeksforgeeks.org/access-modifiers-java/',
            type: 'tutorial',
            source: 'GeeksforGeeks'
          }
        ]
      },
      {
        id: 'inheritance',
        courseId: 'sc2002',
        name: 'Inheritance',
        order: 4,
        prerequisites: [],
        summary: `Inheritance allows a class (child/subclass) to inherit attributes and methods from another class (parent/superclass).

Inheritance Syntax:
\`\`\`java
public class ChildClass extends ParentClass {
    // Child class can add new attributes and methods
    // Child class can override parent methods
}
\`\`\`

Key Concepts:

super Keyword:
- References the parent class
- Call parent constructor: super()
- Call parent method: super.methodName()
- Must be first line in child constructor

Method Overriding:
- Child provides different implementation of inherited method
- Same method signature (name + parameters)
- Use @Override annotation
- Cannot override final methods

Types of Inheritance:
- Single: One child, one parent
- Multilevel: A extends B extends C
- Hierarchical: Multiple children, one parent
- Java does NOT support multiple inheritance with classes (use interfaces)

'is-a' Relationship:
- Inheritance represents "is-a" relationship
- Dog is-a Animal
- Circle is-a Shape

Protected Access:
- Protected members accessible to subclasses
- Useful for inheritance hierarchies`,
        keyPoints: [
          'extends keyword creates inheritance relationship',
          'Child inherits all non-private members from parent',
          'super() calls parent constructor (must be first line)',
          'Method overriding: child provides different implementation',
          '@Override annotation for clarity and compile-time check',
          'Java does not support multiple inheritance with classes'
        ],
        codeExamples: [
          {
            title: 'Inheritance Example',
            language: 'java',
            code: `// Parent class
public class Animal {
    protected String name;
    protected int age;

    public Animal(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public void eat() {
        System.out.println(name + " is eating.");
    }

    public void sleep() {
        System.out.println(name + " is sleeping.");
    }

    public String getInfo() {
        return name + ", " + age + " years old";
    }
}

// Child class
public class Dog extends Animal {
    private String breed;

    public Dog(String name, int age, String breed) {
        super(name, age);  // Call parent constructor FIRST
        this.breed = breed;
    }

    // New method specific to Dog
    public void bark() {
        System.out.println(name + " says Woof!");
    }

    // Override parent method
    @Override
    public void eat() {
        System.out.println(name + " is eating dog food.");
    }

    @Override
    public String getInfo() {
        return super.getInfo() + ", Breed: " + breed;
    }
}

// Usage
public class Main {
    public static void main(String[] args) {
        Dog dog = new Dog("Buddy", 3, "Golden Retriever");
        dog.eat();      // Buddy is eating dog food. (overridden)
        dog.sleep();    // Buddy is sleeping. (inherited)
        dog.bark();     // Buddy says Woof! (new method)
        System.out.println(dog.getInfo());
    }
}`,
            explanation: 'Dog inherits from Animal. It can use inherited methods (sleep), override them (eat), and add new ones (bark). super() calls the parent constructor.'
          }
        ],
        resources: [
          {
            title: 'Java Inheritance',
            url: 'https://docs.oracle.com/javase/tutorial/java/concepts/inheritance.html',
            type: 'documentation',
            source: 'Oracle'
          },
          {
            title: 'Java Inheritance Tutorial',
            url: 'https://www.w3schools.com/java/java_inheritance.asp',
            type: 'tutorial',
            source: 'W3Schools'
          }
        ]
      },
      {
        id: 'polymorphism',
        courseId: 'sc2002',
        name: 'Polymorphism',
        order: 5,
        prerequisites: [],
        summary: `Polymorphism means "many forms" - the ability to present the same interface for different underlying forms (data types).

Types of Polymorphism:

1. Compile-time Polymorphism (Static):
- Method Overloading
- Same method name, different parameters
- Resolved at compile time
\`\`\`java
void print(int x) { }
void print(String s) { }
void print(int x, int y) { }
\`\`\`

2. Runtime Polymorphism (Dynamic):
- Method Overriding
- Parent reference, child object
- Resolved at runtime based on actual object type
\`\`\`java
Animal animal = new Dog(); // Parent ref, Child object
animal.eat(); // Calls Dog's eat() method
\`\`\`

Upcasting and Downcasting:
- Upcasting: Child to Parent (automatic)
- Downcasting: Parent to Child (explicit, use instanceof)
\`\`\`java
Animal a = new Dog();     // Upcasting (automatic)
Dog d = (Dog) a;          // Downcasting (explicit)
\`\`\`

instanceof Operator:
- Checks if object is instance of a class
- Use before downcasting to avoid ClassCastException

Benefits:
- Write flexible, extensible code
- Program to interfaces, not implementations
- Easy to add new types without changing existing code`,
        keyPoints: [
          'Overloading: same name, different parameters (compile-time)',
          'Overriding: child provides different implementation (runtime)',
          'Parent reference can hold child object (upcasting)',
          'Runtime polymorphism calls method based on actual object type',
          'Use instanceof before downcasting',
          'Enables writing flexible, extensible code'
        ],
        codeExamples: [
          {
            title: 'Polymorphism in Action',
            language: 'java',
            code: `// Base class
abstract class Shape {
    abstract double getArea();

    public void describe() {
        System.out.println("I am a shape with area: " + getArea());
    }
}

class Circle extends Shape {
    private double radius;

    public Circle(double radius) { this.radius = radius; }

    @Override
    double getArea() { return Math.PI * radius * radius; }
}

class Rectangle extends Shape {
    private double width, height;

    public Rectangle(double w, double h) {
        this.width = w;
        this.height = h;
    }

    @Override
    double getArea() { return width * height; }
}

// Polymorphism in action
public class Main {
    // Method accepts any Shape - polymorphic parameter
    public static void printArea(Shape shape) {
        System.out.println("Area: " + shape.getArea());
    }

    public static void main(String[] args) {
        // Array of Shape references, holding different types
        Shape[] shapes = {
            new Circle(5),
            new Rectangle(4, 6),
            new Circle(3)
        };

        // Same code handles all shape types
        for (Shape s : shapes) {
            s.describe();  // Calls correct getArea() based on actual type
        }

        // instanceof check before downcasting
        Shape shape = new Circle(5);
        if (shape instanceof Circle) {
            Circle c = (Circle) shape;
            System.out.println("It's a circle!");
        }
    }
}`,
            explanation: 'Shape reference can hold Circle or Rectangle. The correct getArea() is called at runtime based on actual object type. This is runtime polymorphism.'
          }
        ],
        resources: [
          {
            title: 'Java Polymorphism',
            url: 'https://www.w3schools.com/java/java_polymorphism.asp',
            type: 'tutorial',
            source: 'W3Schools'
          },
          {
            title: 'Polymorphism in Java',
            url: 'https://www.geeksforgeeks.org/polymorphism-in-java/',
            type: 'tutorial',
            source: 'GeeksforGeeks'
          }
        ]
      },
      {
        id: 'abstract-classes',
        courseId: 'sc2002',
        name: 'Abstract Classes & Interfaces',
        order: 6,
        prerequisites: [],
        summary: `Abstract classes and interfaces define contracts that implementing classes must follow.

Abstract Class:
- Cannot be instantiated directly
- Can have abstract methods (no body) and concrete methods
- Declared with 'abstract' keyword
- Child classes MUST implement abstract methods
\`\`\`java
abstract class Animal {
    abstract void makeSound();  // Must be implemented
    void breathe() { }          // Can have implementation
}
\`\`\`

Interface:
- Defines a contract of methods to implement
- All methods are implicitly public and abstract (before Java 8)
- All fields are implicitly public, static, final
- A class can implement multiple interfaces
\`\`\`java
interface Flyable {
    void fly();
}
interface Swimmable {
    void swim();
}
class Duck implements Flyable, Swimmable {
    public void fly() { }
    public void swim() { }
}
\`\`\`

Abstract Class vs Interface:
| Feature | Abstract Class | Interface |
|---------|----------------|-----------|
| Methods | Abstract + concrete | All abstract (Java 7) |
| Fields | Any type | public static final |
| Inheritance | Single | Multiple |
| Constructor | Yes | No |
| Use when | Partial implementation | Define contract |

Java 8+ Interface Features:
- default methods: provide implementation
- static methods: utility methods
- Enables adding methods without breaking implementations`,
        keyPoints: [
          'Abstract class: cannot instantiate, can have concrete methods',
          'Abstract methods have no body, must be implemented by subclass',
          'Interface: pure contract, all methods abstract (Java 7)',
          'A class can implement multiple interfaces',
          'Use abstract class for "is-a" with shared code',
          'Use interface to define "can-do" capabilities'
        ],
        codeExamples: [
          {
            title: 'Abstract Class and Interface',
            language: 'java',
            code: `// Abstract class - partial implementation
abstract class Vehicle {
    protected String brand;

    public Vehicle(String brand) {
        this.brand = brand;
    }

    // Concrete method - shared by all vehicles
    public void startEngine() {
        System.out.println(brand + " engine started");
    }

    // Abstract method - each vehicle implements differently
    abstract void move();
}

// Interface - defines capability
interface Electric {
    void charge();
    int getBatteryLevel();
}

// Concrete class extending abstract class and implementing interface
class Tesla extends Vehicle implements Electric {
    private int batteryLevel;

    public Tesla() {
        super("Tesla");
        this.batteryLevel = 100;
    }

    @Override
    void move() {
        System.out.println("Tesla drives silently");
        batteryLevel -= 10;
    }

    @Override
    public void charge() {
        batteryLevel = 100;
        System.out.println("Tesla charged to 100%");
    }

    @Override
    public int getBatteryLevel() {
        return batteryLevel;
    }
}

// Usage
public class Main {
    public static void main(String[] args) {
        Tesla car = new Tesla();
        car.startEngine();  // From Vehicle
        car.move();         // Implemented by Tesla
        car.charge();       // From Electric interface

        // Polymorphism works with both
        Vehicle v = car;    // As Vehicle
        Electric e = car;   // As Electric
    }
}`,
            explanation: 'Tesla extends Vehicle (inherits startEngine, implements move) and implements Electric interface. It can be referenced as Vehicle, Electric, or Tesla.'
          }
        ],
        resources: [
          {
            title: 'Java Abstract Classes',
            url: 'https://www.w3schools.com/java/java_abstract.asp',
            type: 'tutorial',
            source: 'W3Schools'
          },
          {
            title: 'Java Interfaces',
            url: 'https://www.w3schools.com/java/java_interface.asp',
            type: 'tutorial',
            source: 'W3Schools'
          },
          {
            title: 'Abstract Classes vs Interfaces',
            url: 'https://www.geeksforgeeks.org/difference-between-abstract-class-and-interface-in-java/',
            type: 'reference',
            source: 'GeeksforGeeks'
          }
        ]
      },
      {
        id: 'exception-handling',
        courseId: 'sc2002',
        name: 'Exception Handling',
        order: 7,
        prerequisites: [],
        summary: `Exceptions are events that disrupt normal program flow. Exception handling allows graceful handling of errors.

Exception Hierarchy:
\`\`\`
Throwable
├── Error (serious, don't catch)
└── Exception
    ├── RuntimeException (unchecked)
    │   ├── NullPointerException
    │   ├── ArrayIndexOutOfBoundsException
    │   └── IllegalArgumentException
    └── Checked Exceptions
        ├── IOException
        └── SQLException
\`\`\`

Try-Catch-Finally:
\`\`\`java
try {
    // Code that might throw exception
} catch (SpecificException e) {
    // Handle specific exception
} catch (Exception e) {
    // Handle other exceptions
} finally {
    // Always executes (cleanup code)
}
\`\`\`

Throwing Exceptions:
\`\`\`java
public void method() throws IOException {
    if (error) {
        throw new IOException("Error message");
    }
}
\`\`\`

Checked vs Unchecked:
- Checked: Must be caught or declared (throws)
- Unchecked: RuntimeException, no mandatory handling

Custom Exceptions:
\`\`\`java
class CustomException extends Exception {
    public CustomException(String message) {
        super(message);
    }
}
\`\`\`

Best Practices:
- Catch specific exceptions, not generic Exception
- Don't ignore exceptions (empty catch blocks)
- Use finally for cleanup (or try-with-resources)
- Throw early, catch late`,
        keyPoints: [
          'try block contains code that might throw exception',
          'catch block handles specific exception types',
          'finally block always executes (cleanup)',
          'throw: creates exception, throws: declares exception',
          'Checked exceptions must be caught or declared',
          'RuntimeExceptions are unchecked (optional handling)'
        ],
        codeExamples: [
          {
            title: 'Exception Handling Example',
            language: 'java',
            code: `// Custom exception
class InsufficientFundsException extends Exception {
    private double amount;

    public InsufficientFundsException(double amount) {
        super("Insufficient funds. Short by: $" + amount);
        this.amount = amount;
    }

    public double getAmount() { return amount; }
}

class BankAccount {
    private double balance;

    public BankAccount(double balance) {
        this.balance = balance;
    }

    public void withdraw(double amount) throws InsufficientFundsException {
        if (amount > balance) {
            throw new InsufficientFundsException(amount - balance);
        }
        balance -= amount;
        System.out.println("Withdrawn: $" + amount);
    }

    public double getBalance() { return balance; }
}

public class Main {
    public static void main(String[] args) {
        BankAccount account = new BankAccount(100);

        try {
            account.withdraw(50);   // Success
            account.withdraw(80);   // This will throw exception
        } catch (InsufficientFundsException e) {
            System.out.println("Error: " + e.getMessage());
            System.out.println("You need $" + e.getAmount() + " more");
        } finally {
            System.out.println("Final balance: $" + account.getBalance());
        }

        // Multiple catch blocks
        try {
            String s = null;
            System.out.println(s.length()); // NullPointerException
        } catch (NullPointerException e) {
            System.out.println("Null pointer!");
        } catch (Exception e) {
            System.out.println("Some other error");
        }
    }
}`,
            explanation: 'Custom InsufficientFundsException provides meaningful error information. The withdraw method throws the exception, and the caller handles it with try-catch.'
          }
        ],
        resources: [
          {
            title: 'Java Exceptions',
            url: 'https://www.w3schools.com/java/java_try_catch.asp',
            type: 'tutorial',
            source: 'W3Schools'
          },
          {
            title: 'Exception Handling in Java',
            url: 'https://www.geeksforgeeks.org/exceptions-in-java/',
            type: 'tutorial',
            source: 'GeeksforGeeks'
          },
          {
            title: 'Java Exceptions Tutorial',
            url: 'https://docs.oracle.com/javase/tutorial/essential/exceptions/',
            type: 'documentation',
            source: 'Oracle'
          }
        ]
      }
    ]
  }
];

export function getCourse(courseId: string): Course | undefined {
  return courses.find(c => c.id === courseId);
}

export function getTopic(courseId: string, topicId: string) {
  const course = getCourse(courseId);
  return course?.topics.find(t => t.id === topicId);
}

# Content Gap Analysis: NTU Course Materials vs Application Content

## Overview
This analysis compares the source materials from `C:\Users\Jethro\Documents\NTU\Y1S2` with the application content in `courses.ts` to identify gaps and inaccuracies.

---

## SC1007 - Data Structures and Algorithms

### Memory Management
| Gap | Priority | Status |
|-----|----------|--------|
| Memory pooling vs interning distinction | High | To Fix |
| Referential arrays concept | High | To Fix |
| Manual interning via `sys.intern()` | Medium | To Fix |

### Linked Lists
| Gap | Priority | Status |
|-----|----------|--------|
| Size tracking optimization (O(1) size) | Medium | To Fix |
| Circular linked list implementation details | Medium | To Fix |

### Stacks and Queues
| Gap | Priority | Status |
|-----|----------|--------|
| LinkedList-based implementation | Low | Optional |

### Hash Tables
| Gap | Priority | Status |
|-----|----------|--------|
| Load factor resize thresholds | Medium | To Fix |

---

## SC1008 - C/C++ Programming

### Basic C Programming
| Gap | Priority | Status |
|-----|----------|--------|
| Development cycle (Edit-Compile-Link-Execute) | High | To Fix |
| C language history and advantages/disadvantages | Medium | To Fix |
| Floating-point precision pitfalls | High | To Fix |

### Pointers
| Gap | Priority | Status |
|-----|----------|--------|
| Buffer overflow risks | High | To Fix |
| C++ smart pointers (unique_ptr, shared_ptr) | Medium | To Fix |

### Functions
| Gap | Priority | Status |
|-----|----------|--------|
| Static local variables | Medium | To Fix |
| Scope explanations | Medium | To Fix |

---

## SC2002 - Object-Oriented Design and Programming

### Critical Missing Sections
| Gap | Priority | Status |
|-----|----------|--------|
| Object identity, state, behavior | High | To Fix |
| Object references vs objects distinction | High | To Fix |
| Method overloading | High | To Fix |
| Method overriding | High | To Fix |
| Default constructor behavior | Medium | To Fix |

**Note**: The inheritance, polymorphism, and exception handling topics already exist in the application but need review against source materials.

---

## SC1006 - Computer Organization & Architecture

### Missing Topics
| Gap | Priority | Status |
|-----|----------|--------|
| Von Neumann vs Harvard architecture comparison | Medium | To Fix |
| Memory hierarchy details | Medium | To Fix |
| Endianness (byte ordering) | Medium | To Fix |

---

## Action Items

### Immediate Fixes (High Priority)
1. Update SC1007 Memory Management with referential arrays and memory pooling
2. Update SC1008 C Basics with development cycle and floating-point precision
3. Update SC1008 Pointers with buffer overflow risks
4. Review SC2002 OOP topics for completeness

### Secondary Fixes (Medium Priority)
1. Add size tracking to linked list content
2. Add static variables to functions content
3. Add smart pointers to C++ content
4. Add memory hierarchy to SC1006

---

## Completed Updates (January 2026)
- [x] Fixed new question type topic ID mismatches (drag_drop, matching, code_execution)

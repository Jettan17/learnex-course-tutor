# Implementation Plan: Logo Redesign - Book + Lightbulb

Created: 2026-01-30
Status: completed

## Requirements

Replace the upward arrow accent in the logo with a lightbulb symbol representing ideas/understanding. Keep the open book base design.

## Design Concept

**Book + Lightbulb** - Open book with a lightbulb emerging from or floating above the pages, symbolizing knowledge leading to ideas and understanding.

## Implementation Phases

### Phase 1: Update Icon Logo
- [ ] Redesign `logo.svg` with book + lightbulb
- [ ] Keep indigo/purple color scheme
- [ ] Maintain 48x48 viewBox

### Phase 2: Update Brand Variants
- [ ] Update `brand/logo.svg`
- [ ] Update `brand/logo-full.svg` (horizontal lockup)
- [ ] Update `brand/logo-full-dark.svg`
- [ ] Update `brand/logo-stacked.svg`

### Phase 3: Update Favicon
- [ ] Redesign `favicon.svg` with simplified lightbulb version
- [ ] Ensure readability at 32x32 / 16x16

## Dependencies
- None

## Risks
- LOW: Lightbulb detail may be lost at small sizes
  - Mitigation: Use simplified geometric shape, not detailed bulb

## TDD Recommended: No
**Reason:** Visual asset update only, no code logic to test.

## Files to Modify
1. `app/public/logo.svg`
2. `app/public/favicon.svg`
3. `app/public/brand/logo.svg`
4. `app/public/brand/logo-full.svg`
5. `app/public/brand/logo-full-dark.svg`
6. `app/public/brand/logo-stacked.svg`

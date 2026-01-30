# Implementation Plan: Portfolio-Friendly Logo Assets

Created: 2026-01-30
Status: completed

## Requirements

The user wants:
1. Logo to be easily accessible/downloadable for portfolio display
2. Multiple logo variants for different use cases
3. Clear branding assets that can be grabbed independently

## Current State

**Where logo is currently displayed:**
- Header navigation bar (36x36px, via `layout.tsx`)
- Favicon in browser tab

**Current files:**
- `app/public/logo.svg` - Icon only (48x48 viewBox)
- `app/public/favicon.svg` - Simplified icon with background (32x32 viewBox)

## Implementation Phases

### Phase 1: Create Logo Variants
- [ ] Create `logo-full.svg` - Full logo with "LearnEx" text (horizontal lockup)
- [ ] Create `logo-stacked.svg` - Stacked version (icon above text)
- [ ] Create `logo-dark.svg` - Version optimized for dark backgrounds
- [ ] Keep existing `logo.svg` as icon-only version

### Phase 2: Create Brand Assets Directory
- [ ] Create `/public/brand/` directory
- [ ] Move/copy logo files to brand directory
- [ ] Add a simple `README.md` with usage guidelines

### Phase 3: Add Logo Showcase Page (Optional)
- [ ] Create `/brand` or `/about` page showing all logo variants
- [ ] Include download links for each variant
- [ ] Display usage guidelines

## Proposed Logo Variants

| File | Use Case | Dimensions |
|------|----------|------------|
| `logo.svg` | App icon, small spaces | 48x48 |
| `logo-full.svg` | Headers, portfolio, social | 200x48 |
| `logo-stacked.svg` | Square formats, app stores | 120x120 |
| `logo-dark.svg` | Dark backgrounds | 200x48 |
| `favicon.svg` | Browser favicon | 32x32 |

## Dependencies
- None

## Risks
- LOW: SVG text rendering may vary across browsers (mitigated by using paths for text)

## TDD Recommended: No
**Reason:** This is asset creation and UI styling work. No business logic to test.

## Files to Create/Modify
1. `app/public/brand/logo.svg` - Copy of icon
2. `app/public/brand/logo-full.svg` - New horizontal lockup
3. `app/public/brand/logo-stacked.svg` - New stacked version
4. `app/public/brand/logo-dark.svg` - Dark background version
5. `app/public/brand/README.md` - Usage guidelines

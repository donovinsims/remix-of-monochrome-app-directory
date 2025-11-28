# Atomize Design System v3.0 Integration Guide

## Overview

This document details the integration of **Atomize Design System v3.0** into the iOS/macOS App Directory. Atomize provides a comprehensive, monochrome design language with 1500+ components built on a **4pt grid system**.

## Token Mapping

### Color Tokens

| Atomize Token | CSS Variable | Light Mode | Dark Mode | Usage |
|--------------|--------------|------------|-----------|-------|
| `neutral-0` | `--atomize-neutral-0` | `oklch(1 0 0)` | N/A | Pure white |
| `neutral-50` | `--atomize-neutral-50` | `oklch(0.985 0 0)` | `(text)` | Off-white, text in dark mode |
| `neutral-100` | `--atomize-neutral-100` | `oklch(0.97 0 0)` | N/A | Light backgrounds |
| `neutral-900` | `--atomize-neutral-900` | `oklch(0.205 0 0)` | `(bg)` | Primary dark, bg in dark mode |
| `neutral-950` | `--atomize-neutral-950` | `oklch(0.145 0 0)` | `(bg)` | Pure black, primary bg dark mode |

### Semantic Mappings (Backward Compatible)

| Legacy Variable | Atomize Token | Mapping |
|----------------|---------------|---------|
| `--background` | `--atomize-surface-primary` | Main background |
| `--foreground` | `--atomize-text-primary` | Primary text |
| `--card` | `--atomize-surface-elevated` | Card background |
| `--card-foreground` | `--atomize-text-primary` | Card text |
| `--primary` | `--atomize-interactive-primary` | Primary buttons/links |
| `--border` | `--atomize-border-primary` | Default borders |
| `--muted` | `--atomize-surface-secondary` | Muted backgrounds |
| `--muted-foreground` | `--atomize-text-secondary` | Secondary text |

### Typography Tokens

| Type | Token | Size | Weight | Line Height | Usage |
|------|-------|------|--------|-------------|-------|
| Display Lg | `--atomize-font-size-display-lg` | 48px | 700 | 1.2 | Hero headlines |
| Display Md | `--atomize-font-size-display-md` | 40px | 700 | 1.2 | Section headers |
| Display Sm | `--atomize-font-size-display-sm` | 32px | 700 | 1.2 | Page titles |
| Heading Xl | `--atomize-font-size-heading-xl` | 28px | 600 | 1.3 | Major headings |
| Heading Lg | `--atomize-font-size-heading-lg` | 24px | 600 | 1.3 | Card titles |
| Heading Md | `--atomize-font-size-heading-md` | 20px | 600 | 1.3 | Subsections |
| Body Lg | `--atomize-font-size-body-lg` | 16px | 400 | 1.5 | Primary body text |
| Body Md | `--atomize-font-size-body-md` | 14px | 400 | 1.5 | Standard text |
| Body Sm | `--atomize-font-size-body-sm` | 12px | 400 | 1.5 | Captions, labels |

### Spacing Tokens (4pt Grid)

| Token | Value | Usage |
|-------|-------|-------|
| `spacing-0` | 0 | No spacing |
| `spacing-1` | 4px | Tight spacing |
| `spacing-2` | 8px | Compact spacing |
| `spacing-3` | 12px | Standard padding |
| `spacing-4` | 16px | Default spacing |
| `spacing-6` | 24px | Card padding |
| `spacing-8` | 32px | Section spacing |
| `spacing-12` | 48px | Large spacing |

### Border Radius Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `radius-sm` | 4px | Small elements |
| `radius-md` | 8px | Inputs, buttons |
| `radius-lg` | 12px | Buttons, badges |
| `radius-xl` | 16px | Cards |
| `radius-2xl` | 20px | Large cards |
| `radius-full` | 9999px | Pills, avatars |

### Shadow/Elevation Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `shadow-xs` | `0 1px 2px 0 rgba(0,0,0,0.05)` | Subtle depth |
| `shadow-sm` | `0 1px 3px 0 rgba(0,0,0,0.10)` | Card resting state |
| `shadow-md` | `0 4px 6px -1px rgba(0,0,0,0.10)` | Card hover state |
| `shadow-lg` | `0 10px 15px -3px rgba(0,0,0,0.10)` | Dropdowns, popovers |
| `shadow-xl` | `0 20px 25px -5px rgba(0,0,0,0.10)` | Modals |
| `shadow-2xl` | `0 25px 50px -12px rgba(0,0,0,0.25)` | Toasts, overlays |

### Animation Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `duration-instant` | 100ms | Micro-interactions |
| `duration-fast` | 200ms | Button hover |
| `duration-normal` | 300ms | Standard transitions |
| `duration-slow` | 500ms | Page transitions |
| `easing-standard` | `cubic-bezier(0.4, 0, 0.2, 1)` | Default easing |

## Component Patterns

### Button Variants

```tsx
// Atomize Primary Button (Black background, white text)
<button className="
  bg-[var(--atomize-interactive-primary)] 
  text-[var(--atomize-text-inverted)]
  hover:bg-[var(--atomize-interactive-primary-hover)]
  px-[var(--atomize-spacing-4)] 
  py-[var(--atomize-spacing-3)]
  rounded-[var(--atomize-radius-lg)]
  shadow-[var(--atomize-elevation-card)]
  transition-all duration-[var(--atomize-duration-fast)]
  font-[var(--atomize-font-weight-semibold)]
">
  Primary Action
</button>

// Atomize Secondary Button (Light gray background)
<button className="
  bg-[var(--atomize-interactive-secondary)]
  text-[var(--atomize-text-primary)]
  hover:bg-[var(--atomize-interactive-secondary-hover)]
  px-[var(--atomize-spacing-4)]
  py-[var(--atomize-spacing-3)]
  rounded-[var(--atomize-radius-lg)]
  shadow-[var(--atomize-elevation-card)]
">
  Secondary Action
</button>
```

### Card Pattern

```tsx
<div className="
  bg-[var(--atomize-surface-elevated)]
  border border-[var(--atomize-border-primary)]
  rounded-[var(--atomize-radius-xl)]
  p-[var(--atomize-spacing-6)]
  shadow-[var(--atomize-elevation-card)]
  hover:shadow-[var(--atomize-elevation-card-hover)]
  transition-shadow duration-[var(--atomize-duration-normal)]
">
  <h3 className="text-[var(--atomize-font-size-heading-lg)] font-[var(--atomize-font-weight-semibold)]">
    Card Title
  </h3>
  <p className="text-[var(--atomize-font-size-body-md)] text-[var(--atomize-text-secondary)] mt-[var(--atomize-spacing-2)]">
    Card description text
  </p>
</div>
```

### Input Pattern

```tsx
<input className="
  w-full
  bg-[var(--atomize-surface-primary)]
  border border-[var(--atomize-border-primary)]
  rounded-[var(--atomize-radius-md)]
  px-[var(--atomize-spacing-4)]
  py-[var(--atomize-spacing-3)]
  text-[var(--atomize-text-primary)]
  focus:border-[var(--atomize-border-focus)]
  focus:ring-2 focus:ring-[var(--atomize-border-focus)]/20
  transition-all duration-[var(--atomize-duration-fast)]
" />
```

### Badge Pattern

```tsx
// Atomize Badge (Tier indicators)
<span className="
  inline-flex items-center
  px-[var(--atomize-spacing-2)]
  py-[var(--atomize-spacing-1)]
  rounded-[var(--atomize-radius-full)]
  text-[var(--atomize-font-size-body-sm)]
  font-[var(--atomize-font-weight-medium)]
  bg-[var(--atomize-accent-blue)]/10
  text-[var(--atomize-accent-blue)]
  border border-[var(--atomize-accent-blue)]/20
">
  Tier 1
</span>
```

## Dark Mode Implementation

### Theme Toggle Pattern

```tsx
'use client';

import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  
  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="
        p-[var(--atomize-spacing-2)]
        rounded-[var(--atomize-radius-md)]
        bg-[var(--atomize-interactive-secondary)]
        hover:bg-[var(--atomize-interactive-secondary-hover)]
        transition-all duration-[var(--atomize-duration-fast)]
      "
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  );
}
```

## Mobile Optimization

### Touch Targets (44×44px minimum)

```tsx
// Atomize touch-friendly button
<button className="
  min-w-[var(--atomize-touch-target-min)]
  min-h-[var(--atomize-touch-target-min)]
  flex items-center justify-center
  px-[var(--atomize-spacing-4)]
  rounded-[var(--atomize-radius-lg)]
">
  Touch-friendly
</button>
```

### Responsive Typography

```tsx
// Mobile-first responsive text
<h1 className="
  text-[var(--atomize-font-size-display-sm)]
  md:text-[var(--atomize-font-size-display-md)]
  lg:text-[var(--atomize-font-size-display-lg)]
  font-[var(--atomize-font-weight-bold)]
  leading-[var(--atomize-line-height-tight)]
">
  Responsive Headline
</h1>
```

## Accessibility Guidelines

### WCAG 2.1 AA Compliance

- **Text Contrast**: All text colors meet minimum 4.5:1 ratio
- **Interactive States**: Focus rings use `--atomize-border-focus` (visible at 3:1 contrast)
- **Touch Targets**: Minimum 44×44px (iOS) / 48×48px (Android) via `--atomize-touch-target-min`
- **Keyboard Navigation**: All interactive elements have visible focus states
- **Screen Readers**: Semantic HTML with proper ARIA labels

### Focus States

```tsx
// Atomize focus pattern
<button className="
  focus:outline-none
  focus:ring-2 focus:ring-[var(--atomize-border-focus)]/50
  focus:border-[var(--atomize-border-focus)]
">
  Accessible Button
</button>
```

## Usage Examples

### Using TypeScript Helpers

```tsx
import { atomize, atomizeClasses } from '@/lib/atomize-theme';

// Access tokens programmatically
const spacing = atomize.spacing(4); // 'var(--atomize-spacing-4)'
const color = atomize.text('primary'); // 'var(--atomize-text-primary)'

// Use pre-built class strings
<button className={atomizeClasses.button.primary}>
  Primary Button
</button>

<div className={atomizeClasses.card.base}>
  Card Content
</div>
```

### Tailwind Configuration

Atomize tokens are automatically available in Tailwind via CSS custom properties:

```tsx
// Use tokens in Tailwind arbitrary values
<div className="bg-[var(--atomize-surface-primary)] text-[var(--atomize-text-primary)]">
  Content
</div>

// Or create custom Tailwind plugins for shorter syntax (optional)
<div className="atomize-surface-primary atomize-text-primary">
  Content
</div>
```

## Migration Checklist

- [x] Extract Atomize design tokens from Figma
- [x] Create `atomize-tokens.css` with all tokens
- [x] Create `atomize-theme.ts` with TypeScript types
- [x] Update `globals.css` with token mappings
- [ ] Update Button component with Atomize patterns
- [ ] Update Card component with Atomize patterns
- [ ] Update Input component with Atomize patterns
- [ ] Update Badge component with Atomize patterns
- [ ] Apply Atomize patterns to AppCard
- [ ] Apply Atomize patterns to Hero section
- [ ] Apply Atomize patterns to Navigation
- [ ] Test dark mode toggle functionality
- [ ] Test mobile responsiveness (375px, 768px, 1024px)
- [ ] Verify WCAG 2.1 AA compliance
- [ ] Performance audit (Lighthouse score 90+)

## Performance Considerations

- **CSS Custom Properties**: No runtime overhead, browser-native
- **Bundle Size**: Minimal increase (~15KB for token definitions)
- **Caching**: Tokens cached with main stylesheet
- **Dark Mode**: CSS-only switching (no JavaScript re-renders)

## Resources

- **Atomize Figma File**: https://atomizedesign.com/
- **Design Tokens**: `/src/styles/atomize-tokens.css`
- **TypeScript Types**: `/src/lib/atomize-theme.ts`
- **This Documentation**: `/docs/atomize-integration.md`

---

**Last Updated**: 2025-11-26  
**Version**: 1.0.0  
**Atomize Version**: 3.0

/**
 * Atomize Design System v3.0 - TypeScript Types
 * Type-safe design tokens for Atomize theme
 */

export type AtomizeColor =
  | 'neutral-0'
  | 'neutral-50'
  | 'neutral-100'
  | 'neutral-200'
  | 'neutral-300'
  | 'neutral-400'
  | 'neutral-500'
  | 'neutral-600'
  | 'neutral-700'
  | 'neutral-800'
  | 'neutral-900'
  | 'neutral-950';

export type AtomizeSurfaceColor =
  | 'surface-primary'
  | 'surface-secondary'
  | 'surface-tertiary'
  | 'surface-elevated'
  | 'surface-overlay';

export type AtomizeTextColor =
  | 'text-primary'
  | 'text-secondary'
  | 'text-tertiary'
  | 'text-disabled'
  | 'text-inverted';

export type AtomizeSpacing =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 10
  | 12
  | 14
  | 16
  | 20
  | 24;

export type AtomizeFontSize =
  | 'display-lg'
  | 'display-md'
  | 'display-sm'
  | 'heading-xl'
  | 'heading-lg'
  | 'heading-md'
  | 'heading-sm'
  | 'body-lg'
  | 'body-md'
  | 'body-sm'
  | 'caption';

export type AtomizeFontWeight = 'regular' | 'medium' | 'semibold' | 'bold';

export type AtomizeRadius =
  | 'none'
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | 'full';

export type AtomizeShadow =
  | 'none'
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | 'inner';

export type AtomizeElevation =
  | 'card'
  | 'card-hover'
  | 'dropdown'
  | 'modal'
  | 'toast';

export type AtomizeDuration = 'instant' | 'fast' | 'normal' | 'slow';

export type AtomizeEasing = 'standard' | 'accelerate' | 'decelerate';

/**
 * Theme configuration object
 */
export interface AtomizeTheme {
  colors: {
    neutral: Record<AtomizeColor, string>;
    surface: Record<AtomizeSurfaceColor, string>;
    text: Record<AtomizeTextColor, string>;
  };
  spacing: Record<AtomizeSpacing, string>;
  typography: {
    fontFamily: {
      sans: string;
      mono: string;
    };
    fontSize: Record<AtomizeFontSize, string>;
    fontWeight: Record<AtomizeFontWeight, number>;
    lineHeight: {
      tight: number;
      snug: number;
      normal: number;
      relaxed: number;
    };
  };
  radius: Record<AtomizeRadius, string>;
  shadow: Record<AtomizeShadow, string>;
  elevation: Record<AtomizeElevation, string>;
  animation: {
    duration: Record<AtomizeDuration, string>;
    easing: Record<AtomizeEasing, string>;
  };
}

/**
 * Helper functions to access design tokens
 */

export const atomize = {
  /**
   * Get spacing value
   * @example atomize.spacing(4) // '16px'
   */
  spacing: (value: AtomizeSpacing): string => {
    return `var(--atomize-spacing-${value})`;
  },

  /**
   * Get color value
   * @example atomize.color('neutral-900') // 'var(--atomize-neutral-900)'
   */
  color: (value: AtomizeColor): string => {
    return `var(--atomize-${value})`;
  },

  /**
   * Get surface color
   * @example atomize.surface('primary') // 'var(--atomize-surface-primary)'
   */
  surface: (value: AtomizeSurfaceColor): string => {
    return `var(--atomize-${value})`;
  },

  /**
   * Get text color
   * @example atomize.text('primary') // 'var(--atomize-text-primary)'
   */
  text: (value: AtomizeTextColor): string => {
    return `var(--atomize-${value})`;
  },

  /**
   * Get border radius
   * @example atomize.radius('lg') // 'var(--atomize-radius-lg)'
   */
  radius: (value: AtomizeRadius): string => {
    return `var(--atomize-radius-${value})`;
  },

  /**
   * Get shadow
   * @example atomize.shadow('md') // 'var(--atomize-shadow-md)'
   */
  shadow: (value: AtomizeShadow): string => {
    return `var(--atomize-shadow-${value})`;
  },

  /**
   * Get elevation
   * @example atomize.elevation('card') // 'var(--atomize-elevation-card)'
   */
  elevation: (value: AtomizeElevation): string => {
    return `var(--atomize-elevation-${value})`;
  },

  /**
   * Get font size
   * @example atomize.fontSize('heading-lg') // 'var(--atomize-font-size-heading-lg)'
   */
  fontSize: (value: AtomizeFontSize): string => {
    return `var(--atomize-font-size-${value})`;
  },
};

/**
 * Tailwind CSS class helpers for Atomize tokens
 */
export const atomizeClasses = {
  /**
   * Button variants using Atomize patterns
   */
  button: {
    primary:
      'bg-[var(--atomize-interactive-primary)] text-[var(--atomize-text-inverted)] hover:bg-[var(--atomize-interactive-primary-hover)] shadow-[var(--atomize-elevation-card)] hover:shadow-[var(--atomize-elevation-card-hover)]',
    secondary:
      'bg-[var(--atomize-interactive-secondary)] text-[var(--atomize-text-primary)] hover:bg-[var(--atomize-interactive-secondary-hover)] shadow-[var(--atomize-elevation-card)]',
    ghost:
      'bg-transparent text-[var(--atomize-text-primary)] hover:bg-[var(--atomize-interactive-secondary)] border border-[var(--atomize-border-primary)]',
  },

  /**
   * Card styles using Atomize patterns
   */
  card: {
    base: 'bg-[var(--atomize-surface-elevated)] border border-[var(--atomize-border-primary)] rounded-[var(--atomize-card-radius)] p-[var(--atomize-card-padding)] shadow-[var(--atomize-elevation-card)]',
    hover:
      'hover:shadow-[var(--atomize-elevation-card-hover)] transition-shadow duration-[var(--atomize-duration-normal)]',
  },

  /**
   * Input styles using Atomize patterns
   */
  input: {
    base: 'bg-[var(--atomize-surface-primary)] border border-[var(--atomize-border-primary)] rounded-[var(--atomize-input-radius)] px-[var(--atomize-spacing-4)] py-[var(--atomize-spacing-3)] text-[var(--atomize-text-primary)] focus:border-[var(--atomize-border-focus)] focus:ring-2 focus:ring-[var(--atomize-border-focus)]/20',
  },

  /**
   * Typography styles using Atomize patterns
   */
  typography: {
    displayLg:
      'text-[var(--atomize-font-size-display-lg)] font-[var(--atomize-font-weight-bold)] leading-[var(--atomize-line-height-tight)] tracking-[var(--atomize-letter-spacing-tight)]',
    displayMd:
      'text-[var(--atomize-font-size-display-md)] font-[var(--atomize-font-weight-bold)] leading-[var(--atomize-line-height-tight)] tracking-[var(--atomize-letter-spacing-tight)]',
    headingLg:
      'text-[var(--atomize-font-size-heading-lg)] font-[var(--atomize-font-weight-semibold)] leading-[var(--atomize-line-height-snug)]',
    headingMd:
      'text-[var(--atomize-font-size-heading-md)] font-[var(--atomize-font-weight-semibold)] leading-[var(--atomize-line-height-snug)]',
    bodyLg:
      'text-[var(--atomize-font-size-body-lg)] font-[var(--atomize-font-weight-regular)] leading-[var(--atomize-line-height-normal)]',
    bodyMd:
      'text-[var(--atomize-font-size-body-md)] font-[var(--atomize-font-weight-regular)] leading-[var(--atomize-line-height-normal)]',
    bodySm:
      'text-[var(--atomize-font-size-body-sm)] font-[var(--atomize-font-weight-regular)] leading-[var(--atomize-line-height-normal)]',
  },
};

/**
 * Component size variants following Atomize patterns
 */
export const atomizeSizes = {
  button: {
    sm: 'h-8 px-3 text-[var(--atomize-font-size-body-sm)] min-w-[var(--atomize-touch-target-min)]',
    md: 'h-10 px-4 text-[var(--atomize-font-size-body-md)] min-w-[var(--atomize-touch-target-min)]',
    lg: 'h-12 px-6 text-[var(--atomize-font-size-body-lg)] min-w-[var(--atomize-touch-target-min)]',
  },
  iconButton: {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  },
};

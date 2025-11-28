/**
 * Utility functions for formatting numbers, dates, and text
 */

/**
 * Format a number to a human-readable string with K/M suffixes
 * @param num - Number to format
 * @returns Formatted string (e.g., "1.2k", "5.3M")
 */
export function formatNumber(num: number): string {
  if (num === 0) return '0';
  
  if (num < 1000) {
    return num.toString();
  }
  
  if (num < 1000000) {
    const formatted = (num / 1000).toFixed(1);
    return formatted.endsWith('.0') 
      ? `${Math.floor(num / 1000)}k` 
      : `${formatted}k`;
  }
  
  const formatted = (num / 1000000).toFixed(1);
  return formatted.endsWith('.0') 
    ? `${Math.floor(num / 1000000)}M` 
    : `${formatted}M`;
}

/**
 * Format a date to a relative time string
 * @param date - Date string or Date object
 * @returns Relative time string (e.g., "2 days ago", "3 months ago")
 */
export function formatRelativeTime(date: string | Date): string {
  const now = new Date();
  const then = typeof date === 'string' ? new Date(date) : date;
  const diffInSeconds = Math.floor((now.getTime() - then.getTime()) / 1000);
  
  if (diffInSeconds < 60) {
    return 'just now';
  }
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} ${diffInMinutes === 1 ? 'minute' : 'minutes'} ago`;
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
  }
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} ago`;
  }
  
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths} ${diffInMonths === 1 ? 'month' : 'months'} ago`;
  }
  
  const diffInYears = Math.floor(diffInMonths / 12);
  return `${diffInYears} ${diffInYears === 1 ? 'year' : 'years'} ago`;
}

/**
 * Truncate text to a maximum length with ellipsis
 * @param text - Text to truncate
 * @param maxLength - Maximum length before truncation
 * @returns Truncated text with ellipsis if needed
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  }
  
  return text.slice(0, maxLength).trim() + '...';
}

/**
 * Format a price value to a currency string
 * @param price - Price value (string or number)
 * @returns Formatted price string (e.g., "$9.99", "Free")
 */
export function formatPrice(price: string | number): string {
  if (price === 'Free' || price === '0' || price === 0) {
    return 'Free';
  }
  
  const numPrice = typeof price === 'string' ? parseFloat(price) : price;
  
  if (isNaN(numPrice)) {
    return price.toString();
  }
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: numPrice % 1 === 0 ? 0 : 2,
  }).format(numPrice);
}

/**
 * Format a rating to display with star emoji
 * @param rating - Rating value (0-5)
 * @returns Formatted rating string (e.g., "4.5 ★")
 */
export function formatRating(rating: number): string {
  return `${rating.toFixed(1)} ★`;
}

/**
 * Pluralize a word based on count
 * @param count - Number to base pluralization on
 * @param singular - Singular form of the word
 * @param plural - Plural form of the word (optional, defaults to singular + 's')
 * @returns Pluralized string with count
 */
export function pluralize(count: number, singular: string, plural?: string): string {
  const word = count === 1 ? singular : (plural || `${singular}s`);
  return `${count} ${word}`;
}

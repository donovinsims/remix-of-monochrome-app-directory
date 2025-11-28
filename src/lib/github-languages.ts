/**
 * GitHub language color mappings
 * Based on GitHub's official language colors
 */

export const GITHUB_LANGUAGE_COLORS: Record<string, string> = {
  // Popular Languages
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Python: '#3572A5',
  Swift: '#F05138',
  'Objective-C': '#438eff',
  Java: '#b07219',
  Kotlin: '#A97BFF',
  Go: '#00ADD8',
  Rust: '#dea584',
  C: '#555555',
  'C++': '#f34b7d',
  'C#': '#178600',
  Ruby: '#701516',
  PHP: '#4F5D95',
  Dart: '#00B4AB',
  
  // Web Technologies
  HTML: '#e34c26',
  CSS: '#563d7c',
  SCSS: '#c6538c',
  Vue: '#41b883',
  Svelte: '#ff3e00',
  
  // Shell & Scripting
  Shell: '#89e051',
  Bash: '#89e051',
  PowerShell: '#012456',
  Lua: '#000080',
  Perl: '#0298c3',
  
  // Data & Config
  JSON: '#292929',
  YAML: '#cb171e',
  TOML: '#9c4221',
  XML: '#0060ac',
  
  // Other
  Markdown: '#083fa1',
  'Jupyter Notebook': '#DA5B0B',
  R: '#198CE7',
  Scala: '#c22d40',
  Haskell: '#5e5086',
  Clojure: '#db5855',
  Elixir: '#6e4a7e',
  Elm: '#60B5CC',
  
  // Default fallback
  default: '#858585',
};

/**
 * Get the color for a programming language
 * @param language - Programming language name
 * @returns Hex color code
 */
export function getLanguageColor(language: string): string {
  return GITHUB_LANGUAGE_COLORS[language] || GITHUB_LANGUAGE_COLORS.default;
}

/**
 * Get top programming languages for filtering
 */
export const TOP_LANGUAGES = [
  'All',
  'Swift',
  'TypeScript',
  'JavaScript',
  'Python',
  'Objective-C',
  'Go',
  'Rust',
  'Kotlin',
] as const;

export type TopLanguage = typeof TOP_LANGUAGES[number];
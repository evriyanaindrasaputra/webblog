/**
 * Calculate estimated reading time for text content
 * 
 * @param content - The text content to analyze
 * @param wordsPerMinute - Average reading speed (default: 200 WPM)
 * @returns Estimated reading time in minutes (rounded up)
 * 
 * @example
 * ```ts
 * const time = calculateReadingTime("Hello world...", 200);
 * console.log(`${time} min read`); // "1 min read"
 * ```
 */
export function calculateReadingTime(content: string, wordsPerMinute = 200): number {
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

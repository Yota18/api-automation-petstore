/**
 * Common Utility Functions
 * Generic functions reusable across the application
 */

/**
 * Generate unique timestamp-based ID
 * @returns Unique number based on current timestamp
 */
export function generateUniqueId(): number {
    return Date.now();
}

/**
 * Generate random string with specified length
 * @param length - Length of the random string
 * @returns Random alphanumeric string
 */
export function generateRandomString(length: number = 8): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

/**
 * Generate random number within range
 * @param min - Minimum value (inclusive)
 * @param max - Maximum value (inclusive)
 * @returns Random number
 */
export function generateRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Get random item from array
 * @param array - Array to pick from
 * @returns Random item from array
 */
export function getRandomItem<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
}

/**
 * Wait for specified milliseconds
 * @param ms - Milliseconds to wait
 */
export async function wait(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Deep clone an object
 * @param obj - Object to clone
 * @returns Cloned object
 */
export function deepClone<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
}

/**
 * Merge two objects deeply
 * @param target - Target object
 * @param source - Source object
 * @returns Merged object
 */
export function deepMerge<T extends object>(target: T, source: Partial<T>): T {
    return { ...target, ...source };
}

/**
 * Format timestamp to ISO string
 * @param timestamp - Timestamp in milliseconds (optional, defaults to now)
 * @returns ISO format string
 */
export function formatTimestamp(timestamp?: number): string {
    return new Date(timestamp || Date.now()).toISOString();
}

/**
 * Generate unique name with prefix and timestamp
 * @param prefix - Prefix for the name
 * @returns Unique name string
 */
export function generateUniqueName(prefix: string): string {
    return `${prefix}_${generateUniqueId()}`;
}

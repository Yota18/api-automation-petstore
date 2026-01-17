/**
 * User Data Factory
 * Factory functions for generating dynamic user test data
 */

import { User } from '@/api/types';
import { generateUniqueId, generateRandomString } from '@/utils';

/**
 * Generate a unique username based on timestamp
 * @param prefix - Optional prefix for username
 * @returns A unique username
 */
export function generateUniqueUsername(prefix: string = 'user'): string {
    return `${prefix}_${Date.now()}`;
}

/**
 * Generate a random email address
 * @param username - Optional username for email
 * @returns Email address
 */
export function generateEmail(username?: string): string {
    const user = username || generateRandomString(8).toLowerCase();
    return `${user}@example.com`;
}

/**
 * Create a new user data object with dynamic values
 * @param overrides - Optional overrides for specific user properties
 * @returns A User object with test data
 */
export function createUserData(overrides: Partial<User> = {}): User {
    const timestamp = Date.now();
    const defaultUsername = `testuser_${timestamp}`;

    const defaultUser: User = {
        id: generateUniqueId(),
        username: defaultUsername,
        firstName: 'Test',
        lastName: 'User',
        email: generateEmail(defaultUsername),
        password: 'Test@123',
        phone: '+1234567890',
        userStatus: 1
    };

    return {
        ...defaultUser,
        ...overrides
    };
}

/**
 * Create multiple users
 * @param count - Number of users to create
 * @param baseOverrides - Base overrides for all users
 * @returns Array of user data
 */
export function createMultipleUsers(
    count: number,
    baseOverrides: Partial<User> = {}
): User[] {
    return Array.from({ length: count }, (_, index) => {
        const username = `user_${Date.now()}_${index}`;
        return createUserData({
            username,
            email: generateEmail(username),
            ...baseOverrides
        });
    });
}

/**
 * Create a user with minimal required fields
 * @returns User with minimal data
 */
export function createMinimalUser(): User {
    const username = generateUniqueUsername();
    return {
        username,
        email: generateEmail(username),
        password: 'Pass@123'
    };
}

/**
 * Update existing user data
 * @param existingUser - The existing user to update
 * @param updates - Fields to update
 * @returns Updated user data
 */
export function updateUserData(existingUser: User, updates: Partial<User> = {}): User {
    return {
        ...existingUser,
        ...updates
    };
}

/**
 * Create user with specific status
 * @param status - User status (0 = inactive, 1 = active, etc.)
 * @param overrides - Additional overrides
 * @returns User with specified status
 */
export function createUserWithStatus(
    status: number,
    overrides: Partial<User> = {}
): User {
    return createUserData({ userStatus: status, ...overrides });
}

/**
 * Create user with custom credentials
 * @param username - Custom username
 * @param password - Custom password
 * @param overrides - Additional overrides
 * @returns User with custom credentials
 */
export function createUserWithCredentials(
    username: string,
    password: string,
    overrides: Partial<User> = {}
): User {
    return createUserData({
        username,
        password,
        email: generateEmail(username),
        ...overrides
    });
}

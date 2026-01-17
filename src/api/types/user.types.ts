/**
 * User API Types
 * TypeScript type definitions for User domain
 */

/**
 * User interface representing a system user
 */
export interface User {
    /** User ID */
    id?: number;

    /** Username for login */
    username?: string;

    /** User's first name */
    firstName?: string;

    /** User's last name */
    lastName?: string;

    /** User's email address */
    email?: string;

    /** User's password */
    password?: string;

    /** User's phone number */
    phone?: string;

    /** User status (0 = inactive, 1 = active, etc.) */
    userStatus?: number;
}

/**
 * Login response interface
 */
export interface LoginResponse {
    /** Response code */
    code?: number;

    /** Response type */
    type?: string;

    /** Response message (usually contains session token) */
    message?: string;
}

/**
 * Static User Test Data
 * Predefined test data for various user test scenarios
 */

import { User } from '../../api/types';

/**
 * Sample user data for positive testing
 */
export const SAMPLE_USER: User = {
    id: 1,
    username: 'testuser',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    password: 'Test@123',
    phone: '+1234567890',
    userStatus: 1
};

/**
 * Minimal valid user data
 */
export const MINIMAL_USER: User = {
    username: 'minimaluser',
    email: 'minimal@example.com',
    password: 'Pass@123'
};

/**
 * Valid login credentials
 */
export const VALID_CREDENTIALS = {
    username: 'testuser',
    password: 'Test@123'
};

/**
 * Invalid login credentials for negative testing
 */
export const INVALID_CREDENTIALS = {
    wrongUsername: {
        username: 'nonexistentuser',
        password: 'Test@123'
    },
    wrongPassword: {
        username: 'testuser',
        password: 'WrongPassword'
    },
    emptyUsername: {
        username: '',
        password: 'Test@123'
    },
    emptyPassword: {
        username: 'testuser',
        password: ''
    }
};

/**
 * Users by status
 */
export const USERS_BY_STATUS = {
    active: {
        username: 'activeuser',
        email: 'active@example.com',
        password: 'Pass@123',
        userStatus: 1
    },
    inactive: {
        username: 'inactiveuser',
        email: 'inactive@example.com',
        password: 'Pass@123',
        userStatus: 0
    }
};

/**
 * Test data for edge cases
 */
export const EDGE_CASE_USERS = {
    longUsername: {
        username: 'A'.repeat(100),
        email: 'long@example.com',
        password: 'Pass@123'
    },
    specialCharactersUsername: {
        username: 'user-@#$_123',
        email: 'special@example.com',
        password: 'Pass@123'
    },
    invalidEmail: {
        username: 'invalidemailuser',
        email: 'not-an-email',
        password: 'Pass@123'
    },
    shortPassword: {
        username: 'shortpassuser',
        email: 'short@example.com',
        password: '123'
    },
    emptyFields: {
        username: '',
        email: '',
        password: ''
    }
};

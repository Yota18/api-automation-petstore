/**
 * System Messages
 * Standard error and success messages
 */
export const MESSAGES = {
    ERROR: {
        GENERIC: 'An error occurred',
        NOT_FOUND: 'Resource not found',
        INVALID_INPUT: 'Invalid input',
        UNAUTHORIZED: 'Unauthorized access',
        API_BUG: 'API Bug: Potential regression or known issue'
    },
    SUCCESS: {
        CREATED: 'Resource created successfully',
        DELETED: 'Resource deleted successfully'
    },
    VALIDATION: {
        REQUIRED_FIELD: 'Field is required'
    }
} as const;

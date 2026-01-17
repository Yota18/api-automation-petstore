/**
 * HTTP Status Codes
 * Standard response codes for API assertions
 */
export const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    METHOD_NOT_ALLOWED: 405,
    UNSUPPORTED_MEDIA_TYPE: 415,
    INTERNAL_SERVER_ERROR: 500,
    SERVICE_UNAVAILABLE: 503
} as const;

export type HttpStatus = typeof HTTP_STATUS[keyof typeof HTTP_STATUS];

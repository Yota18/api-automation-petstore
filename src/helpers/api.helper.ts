/**
 * API Helper Functions
 * Reusable utility functions for API operations
 */

import { APIResponse } from '@playwright/test';

/**
 * Validate API response status
 * @param response - API response object
 * @param expectedStatus - Expected HTTP status code
 * @throws Error if status doesn't match
 */
export async function validateResponseStatus(
    response: APIResponse,
    expectedStatus: number
): Promise<void> {
    const actualStatus = response.status();
    if (actualStatus !== expectedStatus) {
        const body = await response.text();
        throw new Error(
            `Expected status ${expectedStatus} but got ${actualStatus}. Response: ${body}`
        );
    }
}

/**
 * Parse JSON response with error handling
 * @param response - API response object
 * @returns Parsed JSON data
 */
export async function parseJsonResponse<T>(response: APIResponse): Promise<T> {
    try {
        return await response.json();
    } catch (error) {
        const text = await response.text();
        throw new Error(`Failed to parse JSON response. Body: ${text}`);
    }
}

/**
 * Check if response is successful (2xx status)
 * @param response - API response object
 * @returns true if status is 2xx
 */
export function isSuccessResponse(response: APIResponse): boolean {
    const status = response.status();
    return status >= 200 && status < 300;
}

/**
 * Extract error message from response
 * @param response - API response object
 * @returns Error message string
 */
export async function getErrorMessage(response: APIResponse): Promise<string> {
    try {
        const json = await response.json();
        return json.message || json.error || 'Unknown error';
    } catch {
        return await response.text();
    }
}

/**
 * Log API request details (for debugging)
 * @param method - HTTP method
 * @param url - Request URL
 * @param data - Request data (optional)
 */
export function logApiRequest(
    method: string,
    url: string,
    data?: unknown
): void {
    console.log(`[API Request] ${method} ${url}`);
    if (data) {
        console.log('[Request Data]', JSON.stringify(data, null, 2));
    }
}

/**
 * Log API response details (for debugging)
 * @param response - API response object
 */
export async function logApiResponse(response: APIResponse): Promise<void> {
    const status = response.status();
    const url = response.url();
    console.log(`[API Response] ${status} ${url}`);

    try {
        const body = await response.text();
        console.log('[Response Body]', body);
    } catch (error) {
        console.log('[Response Body] Unable to read');
    }
}

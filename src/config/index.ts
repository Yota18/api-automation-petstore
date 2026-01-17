/**
 * Configuration Management
 * Central configuration for the entire test framework
 */

import { API_CONFIG } from './endpoints';

/**
 * Test configuration
 */
export const TEST_CONFIG = {
    // API settings
    api: {
        baseURL: API_CONFIG.BASE_URL,
        timeout: 30000,
        retries: 2
    },

    // Test data settings
    testData: {
        useDynamicIds: true,
        cleanupAfterTests: true
    },

    // Reporting settings
    reporting: {
        allureResultsDir: 'allure-results',
        allureReportDir: 'allure-report'
    }
} as const;

/**
 * Environment configuration (can be extended for different environments)
 */
export const ENV_CONFIG = {
    current: process.env.TEST_ENV || 'default',
    isCI: !!process.env.CI
} as const;

// Re-export endpoints for convenience
export * from './endpoints';

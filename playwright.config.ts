import { defineConfig } from '@playwright/test';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

/**
 * Playwright configuration for Petstore API Testing
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: process.env.CI === 'true',
  /* Retry on CI only */
  retries: process.env.CI === 'true' ? 2 : Number(process.env.RETRY_COUNT) || 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI === 'true' ? 1 : Number(process.env.PARALLEL_WORKERS) || undefined,

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['line'],
    ['allure-playwright', {
      outputFolder: process.env.ALLURE_OUTPUT_FOLDER || 'allure-results',
      detail: true,
      suiteTitle: false
    }]
  ],

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await request.get('/')`. */
    baseURL: process.env.API_BASE_URL || 'https://petstore.swagger.io/v2/',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry'
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'API Tests',
      testMatch: '**/*.spec.ts'
    }
  ]
});

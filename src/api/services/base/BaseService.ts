import { APIRequestContext } from '@playwright/test';

/**
 * BaseService class that provides foundation for all API services
 * Implements common API request handling using Playwright's APIRequestContext
 */
export class BaseService {
    protected request: APIRequestContext;

    /**
     * Constructor to initialize the service with APIRequestContext
     * @param request - Playwright's APIRequestContext instance
     */
    constructor(request: APIRequestContext) {
        this.request = request;
    }

    /**
     * Get the base request context
     * @returns APIRequestContext instance
     */
    protected getRequestContext(): APIRequestContext {
        return this.request;
    }
}

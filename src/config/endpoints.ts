/**
 * API Endpoints Configuration
 * Centralized management of all API endpoints
 */

import * as dotenv from 'dotenv';
dotenv.config();

/**
 * Base API configuration
 */
export const API_CONFIG = {
    BASE_URL: process.env.API_BASE_URL || 'https://petstore.swagger.io/v2/',
    VERSION: 'v2'
} as const;

/**
 * Pet API endpoints
 */
export const PET_ENDPOINTS = {
    BASE: 'pet',
    BY_ID: (id: number) => `pet/${id}`,
    BY_STATUS: (status: string) => `pet/findByStatus?status=${status}`,
    BY_TAGS: (tags: string[]) => `pet/findByTags?tags=${tags.join(',')}`
} as const;

/**
 * Store API endpoints (for future expansion)
 */
export const STORE_ENDPOINTS = {
    BASE: 'store',
    INVENTORY: 'store/inventory',
    ORDER: 'store/order',
    ORDER_BY_ID: (id: number) => `store/order/${id}`
} as const;

/**
 * User API endpoints (for future expansion)
 */
export const USER_ENDPOINTS = {
    BASE: 'user',
    LOGIN: 'user/login',
    LOGOUT: 'user/logout',
    BY_USERNAME: (username: string) => `user/${username}`,
    CREATE_WITH_ARRAY: 'user/createWithArray',
    CREATE_WITH_LIST: 'user/createWithList'
} as const;


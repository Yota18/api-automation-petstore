import { APIRequestContext, APIResponse } from '@playwright/test';
import { BaseService } from '../base/BaseService';
import { User } from '../../types';
import { USER_ENDPOINTS } from '../../../config';

/**
 * UserService class implementing operations for User resources
 * Handles user management and authentication operations
 * Extends BaseService to leverage APIRequestContext
 */
export class UserService extends BaseService {
    /**
     * Constructor to initialize UserService
     * @param request - Playwright's APIRequestContext instance
     */
    constructor(request: APIRequestContext) {
        super(request);
    }

    /**
     * Create a new user
     * @param userData - User data to create
     * @returns APIResponse confirming user creation
     */
    async createUser(userData: User): Promise<APIResponse> {
        return await this.request.post(USER_ENDPOINTS.BASE, {
            data: userData,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
    }

    /**
     * Create users with array input
     * @param users - Array of users to create
     * @returns APIResponse confirming users creation
     */
    async createUsersWithArray(users: User[]): Promise<APIResponse> {
        return await this.request.post(USER_ENDPOINTS.CREATE_WITH_ARRAY, {
            data: users,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
    }

    /**
     * Create users with list input
     * @param users - Array of users to create
     * @returns APIResponse confirming users creation
     */
    async createUsersWithList(users: User[]): Promise<APIResponse> {
        return await this.request.post(USER_ENDPOINTS.CREATE_WITH_LIST, {
            data: users,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
    }

    /**
     * Get user by username
     * @param username - Username to retrieve
     * @returns APIResponse containing user data
     */
    async getUserByUsername(username: string): Promise<APIResponse> {
        return await this.request.get(USER_ENDPOINTS.BY_USERNAME(username), {
            headers: {
                'Accept': 'application/json'
            }
        });
    }

    /**
     * Update user information
     * @param username - Username to update
     * @param userData - Updated user data
     * @returns APIResponse confirming update
     */
    async updateUser(username: string, userData: User): Promise<APIResponse> {
        return await this.request.put(USER_ENDPOINTS.BY_USERNAME(username), {
            data: userData,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
    }

    /**
     * Delete user by username
     * @param username - Username to delete
     * @returns APIResponse confirming deletion
     */
    async deleteUser(username: string): Promise<APIResponse> {
        return await this.request.delete(USER_ENDPOINTS.BY_USERNAME(username), {
            headers: {
                'Accept': 'application/json'
            }
        });
    }

    /**
     * User login
     * @param username - Username for login
     * @param password - Password for login
     * @returns APIResponse containing login session info
     */
    async login(username: string, password: string): Promise<APIResponse> {
        return await this.request.get(`${USER_ENDPOINTS.LOGIN}?username=${username}&password=${password}`, {
            headers: {
                'Accept': 'application/json'
            }
        });
    }

    /**
     * User logout
     * @returns APIResponse confirming logout
     */
    async logout(): Promise<APIResponse> {
        return await this.request.get(USER_ENDPOINTS.LOGOUT, {
            headers: {
                'Accept': 'application/json'
            }
        });
    }
}

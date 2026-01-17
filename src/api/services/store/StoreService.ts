import { APIRequestContext, APIResponse } from '@playwright/test';
import { BaseService } from '../base/BaseService';
import { Order } from '../../types';
import { STORE_ENDPOINTS } from '../../../config';

/**
 * StoreService class implementing operations for Store resources
 * Handles order management and inventory operations
 * Extends BaseService to leverage APIRequestContext
 */
export class StoreService extends BaseService {
    /**
     * Constructor to initialize StoreService
     * @param request - Playwright's APIRequestContext instance
     */
    constructor(request: APIRequestContext) {
        super(request);
    }

    /**
     * Get store inventory by status
     * Returns a map of status codes to quantities
     * @returns APIResponse containing inventory data
     */
    async getInventory(): Promise<APIResponse> {
        return await this.request.get(STORE_ENDPOINTS.INVENTORY, {
            headers: {
                'Accept': 'application/json'
            }
        });
    }

    /**
     * Place an order for a pet
     * @param orderData - Order data to create
     * @returns APIResponse containing the created order
     */
    async placeOrder(orderData: Order): Promise<APIResponse> {
        return await this.request.post(STORE_ENDPOINTS.ORDER, {
            data: orderData,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
    }

    /**
     * Retrieve an order by its ID
     * Note: Valid IDs are 1-10 per API documentation
     * @param orderId - The ID of the order to retrieve
     * @returns APIResponse containing the order data
     */
    async getOrderById(orderId: number): Promise<APIResponse> {
        return await this.request.get(STORE_ENDPOINTS.ORDER_BY_ID(orderId), {
            headers: {
                'Accept': 'application/json'
            }
        });
    }

    /**
     * Delete an order by its ID
     * Note: Valid IDs must be positive integers per API documentation
     * @param orderId - The ID of the order to delete
     * @returns APIResponse confirming deletion
     */
    async deleteOrder(orderId: number): Promise<APIResponse> {
        return await this.request.delete(STORE_ENDPOINTS.ORDER_BY_ID(orderId), {
            headers: {
                'Accept': 'application/json'
            }
        });
    }
}

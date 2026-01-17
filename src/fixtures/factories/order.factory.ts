/**
 * Order Data Factory
 * Factory functions for generating dynamic order test data
 */

import { Order, OrderStatus } from '@/api/types';
import { generateUniqueId } from '@/utils';

/**
 * Valid order status values
 */
const ORDER_STATUSES: OrderStatus[] = ['placed', 'approved', 'delivered'];

/**
 * Generate a unique order ID based on timestamp
 * @returns A unique order ID
 */
export function generateUniqueOrderId(): number {
    return generateUniqueId();
}

/**
 * Create a new order data object with dynamic values
 * @param overrides - Optional overrides for specific order properties
 * @returns An Order object with test data
 */
export function createOrderData(overrides: Partial<Order> = {}): Order {
    const defaultOrder: Order = {
        id: generateUniqueOrderId(),
        petId: Math.floor(Math.random() * 1000) + 1,
        quantity: Math.floor(Math.random() * 5) + 1,
        shipDate: new Date().toISOString(),
        status: 'placed',
        complete: false
    };

    return {
        ...defaultOrder,
        ...overrides
    };
}

/**
 * Create an order with specific status
 * @param status - Order status
 * @param overrides - Additional overrides
 * @returns Order data with specified status
 */
export function createOrderWithStatus(
    status: OrderStatus,
    overrides: Partial<Order> = {}
): Order {
    return createOrderData({ status, ...overrides });
}

/**
 * Create multiple orders
 * @param count - Number of orders to create
 * @param baseOverrides - Base overrides for all orders
 * @returns Array of order data
 */
export function createMultipleOrders(
    count: number,
    baseOverrides: Partial<Order> = {}
): Order[] {
    return Array.from({ length: count }, (_, index) =>
        createOrderData({
            id: Date.now() + index,
            ...baseOverrides
        })
    );
}

/**
 * Create an order with random data
 * @returns Order with randomized values
 */
export function createRandomOrder(): Order {
    const randomStatus = ORDER_STATUSES[Math.floor(Math.random() * ORDER_STATUSES.length)];
    return createOrderData({
        status: randomStatus,
        quantity: Math.floor(Math.random() * 10) + 1,
        complete: Math.random() > 0.5
    });
}

/**
 * Update existing order data
 * @param existingOrder - The existing order to update
 * @param updates - Fields to update
 * @returns Updated order data
 */
export function updateOrderData(existingOrder: Order, updates: Partial<Order> = {}): Order {
    return {
        ...existingOrder,
        ...updates
    };
}

/**
 * Static Order Test Data
 * Predefined test data for various order test scenarios
 */

import { Order, OrderStatus } from '../../api/types';

/**
 * Valid order status values
 */
export const VALID_ORDER_STATUSES: OrderStatus[] = ['placed', 'approved', 'delivered'];

/**
 * Sample order data for positive testing
 */
export const SAMPLE_ORDER: Order = {
    id: 1,
    petId: 123,
    quantity: 2,
    shipDate: '2024-01-15T10:00:00.000Z',
    status: 'placed',
    complete: false
};

/**
 * Minimal valid order data
 */
export const MINIMAL_ORDER: Order = {
    petId: 1,
    quantity: 1
};

/**
 * Order data for each status
 */
export const ORDERS_BY_STATUS = {
    placed: {
        petId: 100,
        quantity: 1,
        status: 'placed' as OrderStatus,
        complete: false
    },
    approved: {
        petId: 200,
        quantity: 2,
        status: 'approved' as OrderStatus,
        complete: false
    },
    delivered: {
        petId: 300,
        quantity: 3,
        status: 'delivered' as OrderStatus,
        complete: true
    }
};

/**
 * Test data for edge cases
 */
export const EDGE_CASE_ORDERS = {
    largeQuantity: {
        petId: 1,
        quantity: 999999,
        status: 'placed' as OrderStatus
    },
    zeroQuantity: {
        petId: 1,
        quantity: 0,
        status: 'placed' as OrderStatus
    },
    negativeQuantity: {
        petId: 1,
        quantity: -1,
        status: 'placed' as OrderStatus
    },
    completedButPlaced: {
        petId: 1,
        quantity: 1,
        status: 'placed' as OrderStatus,
        complete: true // Inconsistent: placed but complete
    }
};

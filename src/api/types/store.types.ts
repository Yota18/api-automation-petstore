/**
 * Store API Types
 * TypeScript type definitions for Store domain (Orders and Inventory)
 */

/**
 * Order status values
 */
export type OrderStatus = 'placed' | 'approved' | 'delivered';

/**
 * Order interface representing a pet purchase order
 */
export interface Order {
    /** Order ID */
    id?: number;

    /** Pet ID being ordered */
    petId?: number;

    /** Quantity of pets ordered */
    quantity?: number;

    /** Shipping date in ISO 8601 format */
    shipDate?: string;

    /** Order status */
    status?: OrderStatus;

    /** Whether order is complete */
    complete?: boolean;
}

/**
 * Inventory interface representing pet counts by status
 * Key-value pairs where key is status and value is count
 */
export interface Inventory {
    [key: string]: number;
}

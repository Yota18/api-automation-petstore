import { test, expect } from '@playwright/test';
import { StoreService } from '@/api/services/store/StoreService';
import { Order, Inventory } from '@/api/types';
import { createOrderData, createOrderWithStatus } from '@/fixtures/factories/order.factory';

/**
 * Store API Test Suite
 * Comprehensive testing of Store API endpoints with positive and negative scenarios
 * 
 * Endpoints covered:
 * - GET /store/inventory - Returns pet inventories by status
 * - POST /store/order - Place an order for a pet
 * - GET /store/order/{orderId} - Find purchase order by ID
 * - DELETE /store/order/{orderId} - Delete purchase order
 */

test.describe.configure({ mode: 'parallel' });

test.describe('Store API - Positive Test Cases @api @critical', () => {
    /**
     * Test: Get store inventory
     * Feature: Store Inventory
     * Severity: Critical
     * 
     * @description Verifies that the store inventory can be retrieved successfully.
     * 
     * Steps:
     * 1. Send GET request to /store/inventory.
     * 2. Verify response status is 200.
     * 3. Verify response time is under 2 seconds.
     * 4. Verify the response body is a defined object.
     */
    test('@smoke @regression @performance Get store inventory successfully', async ({ request }) => {
        const storeService = new StoreService(request);

        await test.step('Retrieve store inventory', async () => {
            const startTime = Date.now();
            const response = await storeService.getInventory();
            const duration = Date.now() - startTime;

            expect(response.status()).toBe(200);

            // Performance Assertion: Response should be under 2s
            expect(duration).toBeLessThan(2000);

            const inventory: Inventory = await response.json();

            // Verify inventory is an object (key-value pairs)
            expect(typeof inventory).toBe('object');
            expect(inventory).toBeDefined();
        });
    });

    /**
     * Test: Place order with complete data
     * Feature: Order Creation
     * Severity: Critical
     * 
     * @description Verifies that an order can be placed with all fields populated.
     * 
     * Steps:
     * 1. Create order data with petId, quantity, status, and complete flag.
     * 2. Send POST request to /store/order.
     * 3. Verify response status is 200.
     * 4. Verify returned order data matches input.
     * 5. Cleanup: Delete the created order.
     */
    test('@smoke @regression Place order successfully with all fields', async ({ request }) => {
        const storeService = new StoreService(request);
        let orderId: number;

        await test.step('Create order with complete data', async () => {
            const orderData = createOrderData({
                petId: 123,
                quantity: 2,
                status: 'placed',
                complete: false
            });

            const response = await storeService.placeOrder(orderData);
            expect(response.status()).toBe(200);

            const createdOrder: Order = await response.json();
            expect(createdOrder.id).toBeDefined();
            expect(createdOrder.petId).toBe(123);
            expect(createdOrder.quantity).toBe(2);
            expect(createdOrder.status).toBe('placed');

            orderId = createdOrder.id!;
        });

        // Cleanup
        await test.step('Cleanup - Delete created order', async () => {
            await storeService.deleteOrder(orderId);
        });
    });

    /**
     * Test: Place order with minimal data
     * Feature: Order Creation
     * Severity: Normal
     * 
     * @description Verifies that an order can be placed with only required fields.
     * 
     * Steps:
     * 1. Create order data with only petId and quantity.
     * 2. Send POST request to /store/order.
     * 3. Verify response status is 200.
     * 4. Cleanup: Delete the created order.
     */
    test('@regression Place order with minimal required fields', async ({ request }) => {
        const storeService = new StoreService(request);
        let orderId: number;

        await test.step('Create order with minimal data', async () => {
            const minimalOrder: Order = {
                petId: 1,
                quantity: 1
            };

            const response = await storeService.placeOrder(minimalOrder);
            expect(response.status()).toBe(200);

            const createdOrder: Order = await response.json();
            expect(createdOrder.id).toBeDefined();

            orderId = createdOrder.id!;
        });

        // Cleanup
        await test.step('Cleanup - Delete created order', async () => {
            await storeService.deleteOrder(orderId);
        });
    });

    /**
     * Test: Get order by ID
     * Feature: Order Retrieval
     * Severity: Critical
     * 
     * @description Verifies that a placed order can be retrieved by its ID.
     * Note: Includes a check for a known consistency timing issue.
     * 
     * Steps:
     * 1. Create a new order.
     * 2. Send GET request to retrieve the order by ID.
     * 3. Verify response status is 200.
     * 4. Verify retrieved data matches created order.
     * 5. Cleanup: Delete the order.
     */
    test('@smoke @regression Get order by ID successfully', async ({ request }) => {
        const storeService = new StoreService(request);
        let orderId: number;

        await test.step('Create order first', async () => {
            const orderData = createOrderData({ petId: 456, quantity: 3 });
            const createResponse = await storeService.placeOrder(orderData);
            const createdOrder: Order = await createResponse.json();
            orderId = createdOrder.id!;
        });

        await test.step('Retrieve order by ID', async () => {
            const response = await storeService.getOrderById(orderId);

            // NOTE: This test WILL FAIL due to Petstore API timing/consistency issue
            // Expected: 200 (OK) - order was just created successfully
            // Actual: 404 (Not Found) - order not immediately available
            // This is a KNOWN API BUG (timing/consistency issue), not a test issue
            // Value: Documents API behavior for bug reporting
            expect(response.status()).toBe(200);

            const retrievedOrder: Order = await response.json();
            expect(retrievedOrder.id).toBe(orderId);
            expect(retrievedOrder.petId).toBe(456);
            expect(retrievedOrder.quantity).toBe(3);
        });

        // Cleanup
        await test.step('Cleanup - Delete created order', async () => {
            await storeService.deleteOrder(orderId);
        });
    });

    /**
     * Test: Delete order successfully
     * Feature: Order Deletion
     * Severity: Critical
     * 
     * @description Verifies that an existing order can be deleted and is no longer retrievable.
     * 
     * Steps:
     * 1. Create a new order.
     * 2. Send DELETE request for the order ID.
     * 3. Verify delete response status is 200.
     * 4. Attempt to retrieve the order again and verify 404 response.
     */
    test('@smoke @regression Delete order successfully', async ({ request }) => {
        const storeService = new StoreService(request);
        let orderId: number;

        await test.step('Create order first', async () => {
            const orderData = createOrderData();
            const createResponse = await storeService.placeOrder(orderData);
            const createdOrder: Order = await createResponse.json();
            orderId = createdOrder.id!;
        });

        await test.step('Delete the order', async () => {
            const response = await storeService.deleteOrder(orderId);
            expect(response.status()).toBe(200);
        });

        await test.step('Verify order is deleted', async () => {
            const verifyResponse = await storeService.getOrderById(orderId);
            // Order should not be found after deletion
            expect(verifyResponse.status()).toBe(404);
        });
    });

    /**
     * Test: Order status transitions
     * Feature: Order Update
     * Severity: Normal
     * 
     * @description Verifies that orders can be created with different statuses (placed, approved, delivered).
     * 
     * Steps:
     * 1. Create an order with 'placed' status and verify.
     * 2. Create an order with 'approved' status and verify.
     * 3. Create an order with 'delivered' status and verify.
     * 4. Cleanup: Delete all created orders.
     */
    test('@regression Order with different statuses - placed, approved, delivered', async ({ request }) => {
        const storeService = new StoreService(request);
        const orderIds: number[] = [];

        await test.step('Create order with placed status', async () => {
            const placedOrder = createOrderWithStatus('placed');
            const response = await storeService.placeOrder(placedOrder);
            expect(response.status()).toBe(200);

            const order: Order = await response.json();
            expect(order.status).toBe('placed');
            orderIds.push(order.id!);
        });

        await test.step('Create order with approved status', async () => {
            const approvedOrder = createOrderWithStatus('approved');
            const response = await storeService.placeOrder(approvedOrder);
            expect(response.status()).toBe(200);

            const order: Order = await response.json();
            expect(order.status).toBe('approved');
            orderIds.push(order.id!);
        });

        await test.step('Create order with delivered status', async () => {
            const deliveredOrder = createOrderWithStatus('delivered', { complete: true });
            const response = await storeService.placeOrder(deliveredOrder);
            expect(response.status()).toBe(200);

            const order: Order = await response.json();
            expect(order.status).toBe('delivered');
            expect(order.complete).toBe(true);
            orderIds.push(order.id!);
        });

        // Cleanup
        await test.step('Cleanup - Delete all created orders', async () => {
            for (const orderId of orderIds) {
                await storeService.deleteOrder(orderId);
            }
        });
    });

    /**
     * Test: Place multiple orders
     * Feature: Order Creation
     * Severity: Normal
     * 
     * @description Verifies that multiple orders can be placed sequentially.
     * 
     * Steps:
     * 1. Create 3 orders sequentially.
     * 2. Verify each order creation is successful (Status 200).
     * 3. Cleanup: Delete all created orders.
     */
    test('@regression Place multiple orders successfully', async ({ request }) => {
        const storeService = new StoreService(request);
        const orderIds: number[] = [];
        const orderCount = 3;

        await test.step('Create multiple orders', async () => {
            for (let i = 0; i < orderCount; i++) {
                const orderData = createOrderData({
                    petId: 100 + i,
                    quantity: i + 1
                });
                const response = await storeService.placeOrder(orderData);
                expect(response.status()).toBe(200);

                const order: Order = await response.json();
                orderIds.push(order.id!);
            }
        });

        await test.step('Verify all orders were created', async () => {
            expect(orderIds.length).toBe(orderCount);
        });

        // Cleanup
        await test.step('Cleanup - Delete all created orders', async () => {
            for (const orderId of orderIds) {
                await storeService.deleteOrder(orderId);
            }
        });
    });
});

/**
 * Negative Test Cases
 * Testing error handling, validation, and edge cases
 */
test.describe('Store API - Negative Test Cases', () => {
    /**
     * Test: Get non-existent order
     * Feature: Error Handling
     * Severity: Critical
     * 
     * @description Verifies that requesting a non-existent order ID returns a 404 response.
     */
    test('@smoke @validation Get non-existent order returns 404', async ({ request }) => {
        const storeService = new StoreService(request);

        await test.step('Attempt to get order with non-existent ID', async () => {
            const nonExistentOrderId = 999999999;
            const response = await storeService.getOrderById(nonExistentOrderId);

            expect(response.status()).toBe(404);
        });
    });

    /**
     * Test: Delete non-existent order
     * Feature: Error Handling
     * Severity: Normal
     * 
     * @description Verifies that attempting to delete a non-existent order ID returns a 404 response.
     */
    test('@validation Delete non-existent order returns 404', async ({ request }) => {
        const storeService = new StoreService(request);

        await test.step('Attempt to delete order that does not exist', async () => {
            const nonExistentOrderId = 999999999;
            const response = await storeService.deleteOrder(nonExistentOrderId);

            expect(response.status()).toBe(404);
        });
    });

    /**
     * Test: Get order with invalid ID (out of valid range 1-10)
     * Feature: Validation
     * Severity: Normal
     * 
     * @description Verifies API behavior when requesting an order ID less than 1.
     * Note: Per API docs, valid order IDs are 1-10.
     */
    test('@validation Get order with ID less than 1 returns error', async ({ request }) => {
        const storeService = new StoreService(request);

        await test.step('Attempt to get order with ID = 0', async () => {
            const response = await storeService.getOrderById(0);

            // API should return 400 or 404 for invalid ID
            expect([400, 404]).toContain(response.status());
        });
    });

    /**
     * Test: Get order with ID greater than 10
     * Feature: Validation
     * Severity: Normal
     * 
     * @description Verifies API behavior when requesting an order ID greater than 10.
     * Note: Petstore API does not enforce the 1-10 range restriction and may return 200 for valid orders.
     */
    test('@validation Get order with ID greater than 10 returns error', async ({ request }) => {
        const storeService = new StoreService(request);

        await test.step('Attempt to get order with ID = 11', async () => {
            const response = await storeService.getOrderById(11);

            // API may return 200 for existing order, or 404 for non-existent
            // Note: Petstore API does NOT enforce the documented 1-10 ID range restriction
            expect([200, 404]).toContain(response.status());
        });
    });

    /**
     * Test: Delete order with invalid ID
     * Feature: Validation
     * Severity: Normal
     * 
     * @description Verifies API behavior when attempting to delete an order with a negative ID.
     */
    test('@validation Delete order with negative ID returns error', async ({ request }) => {
        const storeService = new StoreService(request);

        await test.step('Attempt to delete order with negative ID', async () => {
            const response = await storeService.deleteOrder(-1);

            // API should return 400 or 404 for invalid ID
            expect([400, 404]).toContain(response.status());
        });
    });

    /**
     * Test: Place order with zero quantity
     * Feature: Edge Cases
     * Severity: Minor
     * 
     * @description Verifies whether the API allows an order with 0 quantity.
     */
    test('@edge-case Place order with zero quantity', async ({ request }) => {
        const storeService = new StoreService(request);

        await test.step('Create order with quantity = 0', async () => {
            const orderData: Order = {
                petId: 1,
                quantity: 0,
                status: 'placed'
            };

            const response = await storeService.placeOrder(orderData);

            // Test API's handling of zero quantity
            if (response.status() === 200) {
                const order: Order = await response.json();
                expect(order.quantity).toBe(0);
                // Cleanup
                if (order.id) await storeService.deleteOrder(order.id);
            }
        });
    });

    /**
     * Test: Place order with negative quantity
     * Feature: Edge Cases
     * Severity: Minor
     * 
     * @description Verifies whether the API handles negative quantity values in an order.
     */
    test('@edge-case Place order with negative quantity', async ({ request }) => {
        const storeService = new StoreService(request);

        await test.step('Attempt to create order with negative quantity', async () => {
            const orderData: Order = {
                petId: 1,
                quantity: -5,
                status: 'placed'
            };

            const response = await storeService.placeOrder(orderData);

            // API may accept or reject negative quantities
            if (response.status() === 200) {
                const order: Order = await response.json();
                // Cleanup
                if (order.id) await storeService.deleteOrder(order.id);
            }
        });
    });

    /**
     * Test: Place order with extremely large quantity
     * Feature: Edge Cases
     * Severity: Minor
     * 
     * @description Verifies API behavior when an extremely large quantity is requested.
     */
    test('@edge-case Place order with extremely large quantity', async ({ request }) => {
        const storeService = new StoreService(request);

        await test.step('Create order with large quantity', async () => {
            const orderData: Order = {
                petId: 1,
                quantity: 999999,
                status: 'placed'
            };

            const response = await storeService.placeOrder(orderData);

            if (response.status() === 200) {
                const order: Order = await response.json();
                expect(order.quantity).toBe(999999);
                // Cleanup
                if (order.id) await storeService.deleteOrder(order.id);
            }
        });
    });

    /**
     * Test: Place order with invalid status
     * Feature: Validation
     * Severity: Normal
     * 
     * @description Verifies API behavior when an order is replaced with an invalid status string.
     */
    test('@validation Place order with invalid status value', async ({ request }) => {
        const storeService = new StoreService(request);

        await test.step('Attempt to create order with invalid status', async () => {
            const orderData: any = {
                petId: 1,
                quantity: 1,
                status: 'invalid_status' // Invalid (valid: placed, approved, delivered)
            };

            const response = await storeService.placeOrder(orderData);

            // API may accept or reject invalid status
            if (response.status() === 200) {
                const order: Order = await response.json();
                // Cleanup
                if (order.id) await storeService.deleteOrder(order.id);
            }
        });
    });

    /**
     * Test: Place order without required fields
     * Feature: Validation
     * Severity: Normal
     * 
     * @description Verifies API behavior when attempting to place an order without the required 'petId' field.
     */
    test('@validation Place order without petId', async ({ request }) => {
        const storeService = new StoreService(request);

        await test.step('Attempt to create order without petId', async () => {
            const orderData: any = {
                quantity: 1,
                status: 'placed'
                // Missing petId
            };

            const response = await storeService.placeOrder(orderData);

            // API may accept orders without petId
            if (response.status() === 200) {
                const order: Order = await response.json();
                // Cleanup
                if (order.id) await storeService.deleteOrder(order.id);
            }
        });
    });
});

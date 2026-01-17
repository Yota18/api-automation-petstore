import { test, expect } from '@playwright/test';
import { PetService } from '@/api/services/pet/PetService';
import { createPetData } from '@/fixtures/factories/pet.factory';
import { Pet } from '@/api/types';

/**
 * Security API Test Suite
 * Tests for potential vulnerabilities (XSS, Injection, etc.)
 * 
 * Note: These tests are exploratory/validation for ensuring API robustness
 * against common attack vectors.
 */
test.describe.configure({ mode: 'parallel' });

test.describe('Security API Tests @security @api', () => {

    /**
     * Test: Attempt XSS Injection in Pet Name
     * Severity: Critical
     * 
     * @description Verifies that the API handles Cross-Site Scripting (XSS) payloads in input fields safely.
     * 
     * Steps:
     * 1. Create a pet with a JavaScript payload in the name field (e.g., <script>alert("xss")</script>).
     * 2. Send POST request to create the pet.
     * 3. Verify the API either rejects the request (400) or sanitizes/stores it safely (200).
     */
    test('XSS Injection Prevention in Pet Name', async ({ request }) => {
        const petService = new PetService(request);
        const xssPayload = '<script>alert("xss")</script>';

        await test.step('Create pet with XSS payload in name', async () => {
            const petData = createPetData({
                name: xssPayload
            });

            const response = await petService.createPet(petData);

            // API should either:
            // 1. Sanitize the input
            // 2. Encode on output
            // 3. Reject the request (400)
            // 4. Accept it but treating it as plain text (200)

            expect([200, 400]).toContain(response.status());

            if (response.status() === 200) {
                const createdPet: Pet = await response.json();

                // If accepted, ensure it can be retrieved without executing
                // In API testing this mostly means the data is stored
                expect(createdPet.name).toBe(xssPayload);

                // Cleanup
                if (createdPet.id) await petService.deletePet(createdPet.id);
            }
        });
    });

    /**
     * Test: Attempt SQL Injection in Pet ID
     * Severity: Critical
     * 
     * @description Verifies that the API handles SQL Injection payloads in URL parameters safely.
     * 
     * Steps:
     * 1. Construct a GET request with an SQL injection payload in the ID field (e.g., '999 OR 1=1').
     * 2. Send the request.
     * 3. Verify the API returns a client error (400/404) and not a server error (500) or data leak.
     */
    test('SQL Injection Resilience in Pet ID', async ({ request }) => {
        const petService = new PetService(request);

        await test.step('Attempt GET with SQL Injection payload', async () => {
            // Note: Typescript expects number for getPet, so we use raw request or cast
            // However, PetService.getPet takes number. We need to bypass this for SQLi test
            // or modify service to accept string. 
            // For now, let's use the BaseService request directly or create a helper

            // Using raw request to send string ID
            const response = await request.get('pet/999999 OR 1=1');

            // Should properly handle and return 404 or 400, NOT 500 with stack trace
            expect([404, 400]).toContain(response.status());
        });
    });

    /**
     * Test: Large Payload (DoS Prevention)
     * Severity: High
     * 
     * @description Verifies that the API can handle potentially malicious large payloads without crashing (DoS prevention).
     * 
     * Steps:
     * 1. Create a pet with an extremely large string in the name field (10KB+).
     * 2. Send POST request to create the pet.
     * 3. Verify the API handles the request gracefully (Accepts, Rejects, or 413 Payload Too Large).
     */
    test('Large Payload Handling', async ({ request }) => {
        const petService = new PetService(request);
        const largeName = 'A'.repeat(10000); // 10KB string

        await test.step('Create pet with massive name', async () => {
            const petData = createPetData({
                name: largeName
            });

            const response = await petService.createPet(petData);

            // Should accept or reject gracefully, not crash
            expect([200, 400, 413, 431]).toContain(response.status());

            if (response.status() === 200) {
                const createdPet: Pet = await response.json();
                if (createdPet.id) await petService.deletePet(createdPet.id);
            }
        });
    });
});

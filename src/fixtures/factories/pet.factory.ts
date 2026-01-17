/**
 * Pet Data Factory
 * Factory functions for generating dynamic pet test data
 */

import { Pet, PetCategory, PetTag, PetStatus } from '@/api/types';
import { generateUniqueId, generateUniqueName, getRandomItem } from '@/utils';

/**
 * Default pet categories
 */
const DEFAULT_CATEGORIES: PetCategory[] = [
    { id: 1, name: 'Dogs' },
    { id: 2, name: 'Cats' },
    { id: 3, name: 'Birds' },
    { id: 4, name: 'Fish' }
];

/**
 * Default pet tags
 */
const DEFAULT_TAGS: PetTag[] = [
    { id: 1, name: 'friendly' },
    { id: 2, name: 'energetic' },
    { id: 3, name: 'calm' },
    { id: 4, name: 'playful' }
];

/**
 * Pet status options
 */
const PET_STATUSES: PetStatus[] = ['available', 'pending', 'sold'];

/**
 * Generate a unique pet ID based on timestamp
 * @returns A unique pet ID
 */
export function generateUniquePetId(): number {
    return generateUniqueId();
}

/**
 * Create a new pet data object with dynamic values
 * @param overrides - Optional overrides for specific pet properties
 * @returns A Pet object with test data
 */
export function createPetData(overrides: Partial<Pet> = {}): Pet {
    const timestamp = Date.now();
    const defaultName = generateUniqueName('TestPet');

    return {
        id: generateUniquePetId(),
        name: defaultName,
        photoUrls: [`https://example.com/photo_${timestamp}.jpg`],
        status: 'available',
        category: getRandomItem(DEFAULT_CATEGORIES),
        tags: [getRandomItem(DEFAULT_TAGS)],
        ...overrides
    };
}

/**
 * Create updated pet data based on existing pet
 * @param existingPet - The existing pet to update
 * @param updates - Fields to update
 * @returns Updated pet data
 */
export function updatePetData(existingPet: Pet, updates: Partial<Pet> = {}): Pet {
    return {
        ...existingPet,
        ...updates
    };
}

/**
 * Create a pet with specific status
 * @param status - Pet status
 * @param overrides - Additional overrides
 * @returns Pet data with specified status
 */
export function createPetWithStatus(
    status: PetStatus,
    overrides: Partial<Pet> = {}
): Pet {
    return createPetData({ status, ...overrides });
}

/**
 * Create multiple pets with different names
 * @param count - Number of pets to create
 * @param baseOverrides - Base overrides for all pets
 * @returns Array of pet data
 */
export function createMultiplePets(
    count: number,
    baseOverrides: Partial<Pet> = {}
): Pet[] {
    return Array.from({ length: count }, (_, index) =>
        createPetData({
            name: `Pet_${index + 1}_${Date.now()}`,
            ...baseOverrides
        })
    );
}

/**
 * Create a pet with random data
 * @returns Pet with randomized values
 */
export function createRandomPet(): Pet {
    return createPetData({
        status: getRandomItem(PET_STATUSES),
        category: getRandomItem(DEFAULT_CATEGORIES),
        tags: [getRandomItem(DEFAULT_TAGS)]
    });
}

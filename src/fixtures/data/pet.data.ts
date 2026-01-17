/**
 * Static Pet Test Data
 * Predefined test data for various test scenarios
 */

import { Pet, PetStatus } from '../../api/types';

/**
 * Valid pet names for testing
 */
export const VALID_PET_NAMES = [
    'Buddy', 'Max', 'Charlie', 'Luna', 'Bella',
    'Rocky', 'Daisy', 'Cooper', 'Bailey', 'Rex'
];

/**
 * Valid pet statuses
 */
export const VALID_PET_STATUSES: PetStatus[] = ['available', 'pending', 'sold'];

/**
 * Sample pet data for positive testing
 */
export const SAMPLE_PET: Pet = {
    id: 1,
    name: 'Buddy',
    photoUrls: ['https://example.com/buddy.jpg'],
    status: 'available',
    category: {
        id: 1,
        name: 'Dogs'
    },
    tags: [
        { id: 1, name: 'friendly' },
        { id: 2, name: 'trained' }
    ]
};

/**
 * Minimal valid pet data
 */
export const MINIMAL_PET: Pet = {
    name: 'MinimalPet',
    photoUrls: ['https://example.com/minimal.jpg'],
    status: 'available'
};

/**
 * Pet data for each status
 */
export const PETS_BY_STATUS = {
    available: {
        name: 'AvailablePet',
        photoUrls: ['https://example.com/available.jpg'],
        status: 'available' as PetStatus
    },
    pending: {
        name: 'PendingPet',
        photoUrls: ['https://example.com/pending.jpg'],
        status: 'pending' as PetStatus
    },
    sold: {
        name: 'SoldPet',
        photoUrls: ['https://example.com/sold.jpg'],
        status: 'sold' as PetStatus
    }
};

/**
 * Test data for edge cases
 */
export const EDGE_CASE_PETS = {
    longName: {
        name: 'A'.repeat(100),
        photoUrls: ['https://example.com/long-name.jpg'],
        status: 'available' as PetStatus
    },
    specialCharacters: {
        name: 'Pet-@#$%_123',
        photoUrls: ['https://example.com/special.jpg'],
        status: 'available' as PetStatus
    },
    emptyPhotoUrls: {
        name: 'NoPhotoPet',
        photoUrls: [],
        status: 'available' as PetStatus
    }
};

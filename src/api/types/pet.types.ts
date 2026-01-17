/**
 * Type definitions for Pet API
 * Contains all interfaces and types related to Pet resources
 */

/**
 * Pet category interface
 */
export interface PetCategory {
    id: number;
    name: string;
}

/**
 * Pet tag interface
 */
export interface PetTag {
    id: number;
    name: string;
}

/**
 * Pet status type - represents the availability status of a pet
 */
export type PetStatus = 'available' | 'pending' | 'sold';

/**
 * Pet interface - main data structure for Pet resource
 */
export interface Pet {
    id?: number;
    category?: PetCategory;
    name: string;
    photoUrls: string[];
    tags?: PetTag[];
    status: PetStatus;
}

/**
 * Pet creation payload - data required to create a new pet
 */
export interface CreatePetPayload {
    id?: number;
    name: string;
    photoUrls: string[];
    status: PetStatus;
    category?: PetCategory;
    tags?: PetTag[];
}

/**
 * Pet update payload - data for updating an existing pet
 */
export interface UpdatePetPayload extends Pet {
    id: number; // ID is required for updates
}

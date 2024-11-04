import {StorageLocation} from "../../Types/StorageLocation.ts";

const baseURL = "http://127.0.0.1:8000/api";

export async function getStorageLocations() {
    try {
        const response = await fetch(`${baseURL}/storage_locations`);
        const data = await response.json() as StorageLocation[];
        console.log(data)
        return {success: true, data}
    } catch (error) {
        return {success: false, error}
    }
}

export async function getStorageLocationById(id: string) {
    try {
        const response = await fetch(`${baseURL}/storage_locations/${id}`);
        const data = await response.json() as StorageLocation;
        console.log(data)
        return {success: true, data}
    } catch (error) {
        return {success: false, error}
    }
}

export async function createStorageLocation(formData: StorageLocation) {
    try {
        const response = await fetch(`${baseURL}/storage_locations`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        if (response.ok) {
            console.log('Storage Location data submitted successfully:', await response.json());
        } else {
            console.error('Failed to submit storage location data:', response.statusText);
        }
    } catch (error) {
        console.error('Error submitting storage location data:', error);
    }
}

export async function updateStorageLocation(id: string, formData: StorageLocation) {
    try {
        const response = await fetch(`${baseURL}/storage_locations/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        if (response.ok) {
            console.log('Storage Location data updated successfully:', await response.json());
        } else {
            console.error('Failed to submit storage location data:', response.statusText);
        }
    } catch (error) {
        console.error('Error submitting storage location data:', error);
    }
}

export async function deleteStorageLocation(id: string) {
    try {
        const response = await fetch(`${baseURL}/storage_locations/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            console.log('StorageLocation data deleted successfully:', await response.json());
        } else {
            console.error('Failed to submit storage location data:', response.statusText);
        }
    } catch (error) {
        console.error('Error submitting storage location data:', error);
    }
}




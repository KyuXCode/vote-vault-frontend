import {Vendor} from "../../Types/Vendor.ts";

const baseURL = "http://localhost:8000/api";

export async function getVendors() {
    try {
        const response = await fetch(`${baseURL}/vendors`);
        const data = await response.json() as Vendor[];
        console.log(data)
        return {success: true, data}
    } catch (error) {
        return {success: false, error}
    }
}

export async function getVendorById(id: string) {
    try {
        const response = await fetch(`${baseURL}/vendors/${id}`);
        const data = await response.json() as Vendor;
        console.log(data)
        return {success: true, data}
    } catch (error) {
        return {success: false, error}
    }
}

export async function createVendor(formData: Vendor) {
    try {
        const response = await fetch(`${baseURL}/vendors`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        if (response.ok) {
            console.log('Vendor data submitted successfully:', await response.json());
        } else {
            console.error('Failed to submit vendor data:', response.statusText);
        }
    } catch (error) {
        console.error('Error submitting vendor data:', error);
    }
}

export async function updateVendor(vendorId: string, formData: Vendor) {
    try {
        const response = await fetch(`${baseURL}/vendors/${vendorId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        if (response.ok) {
            console.log('Vendor data updated successfully:', await response.json());
        } else {
            console.error('Failed to update vendor data:', response.statusText);
        }
    } catch (error) {
        console.error('Error updating vendor data:', error);
    }
}

export async function deleteVendor(vendorId: string) {
    try {
        const response = await fetch(`${baseURL}/vendors/${vendorId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            console.log('Vendor data deleted successfully:', await response.json());
        } else {
            console.error('Failed to delete vendor data:', response.statusText);
        }
    } catch (error) {
        console.error('Error deleting vendor data:', error);
    }
}




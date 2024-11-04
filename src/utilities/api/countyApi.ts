import {County} from "../../Types/County.ts";

const baseURL = "http://127.0.0.1:8000/api";

export async function getCounties() {
    try {
        const response = await fetch(`${baseURL}/counties`);
        const data = await response.json() as County[];
        console.log(data)
        return {success: true, data}
    } catch (error) {
        return {success: false, error}
    }
}

export async function getCountyById(id: string) {
    try {
        const response = await fetch(`${baseURL}/counties/${id}`);
        const data = await response.json() as County;
        console.log(data)
        return {success: true, data}
    } catch (error) {
        return {success: false, error}
    }
}

export async function createCounty(formData: County) {
    try {
        const response = await fetch(`${baseURL}/counties`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        if (response.ok) {
            console.log('County data submitted successfully:', await response.json());
        } else {
            console.error('Failed to submit county data:', response.statusText);
        }
    } catch (error) {
        console.error('Error submitting county data:', error);
    }
}

export async function updateCounty(countyId: string, formData: County) {
    try {
        const response = await fetch(`${baseURL}/counties/${countyId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        if (response.ok) {
            console.log('County data updated successfully:', await response.json());
        } else {
            console.error('Failed to update county data:', response.statusText);
        }
    } catch (error) {
        console.error('Error updating county data:', error);
    }
}

export async function deleteCounty(countyId: string) {
    try {
        const response = await fetch(`${baseURL}/counties/${countyId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            console.log('County data deleted successfully:', await response.json());
        } else {
            console.error('Failed to delete county data:', response.statusText);
        }
    } catch (error) {
        console.error('Error deleting county data:', error);
    }
}




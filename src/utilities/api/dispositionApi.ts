import {Disposition} from "../../Types/Disposition.ts";

const baseURL = "http://127.0.0.1:8000/api";

export async function getDispositions() {
    try {
        const response = await fetch(`${baseURL}/dispositions`);
        const data = await response.json() as Disposition[];
        console.log(data)
        return {success: true, data}
    } catch (error) {
        return {success: false, error}
    }
}

export async function getDispositionById(id: string) {
    try {
        const response = await fetch(`${baseURL}/dispositions/${id}`);
        const data = await response.json() as Disposition;
        console.log(data)
        return {success: true, data}
    } catch (error) {
        return {success: false, error}
    }
}

export async function createDisposition(formData: Disposition) {
    try {
        const response = await fetch(`${baseURL}/dispositions`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        if (response.ok) {
            console.log('Disposition data submitted successfully:', await response.json());
        } else {
            console.error('Failed to submit Disposition data:', response.statusText);
        }
    } catch (error) {
        console.error('Error submitting Disposition data:', error);
    }
}

export async function updateDisposition(dispositionId: string, formData: Disposition) {
    try {
        const response = await fetch(`${baseURL}/dispositions/${dispositionId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        if (response.ok) {
            console.log('Disposition data update successfully:', await response.json());
        } else {
            console.error('Failed to update Disposition data:', response.statusText);
        }
    } catch (error) {
        console.error('Error updating Disposition data:', error);
    }
}

export async function deleteDisposition(dispositionId: string) {
    try {
        const response = await fetch(`${baseURL}/dispositions/${dispositionId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            console.log('Disposition data deleted successfully:', await response.json());
        } else {
            console.error('Failed to delete Disposition data:', response.statusText);
        }
    } catch (error) {
        console.error('Error deleting Disposition data:', error);
    }
}
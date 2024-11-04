import {Contract} from "../../Types/Contract.ts";

const baseURL = "http://127.0.0.1:8000/api";

export async function getContracts() {
    try {
        const response = await fetch(`${baseURL}/contracts`);
        const data = await response.json() as Contract[];
        console.log(data)
        return {success: true, data}
    } catch (error) {
        return {success: false, error}
    }
}

export async function getContractById(id: string) {
    try {
        const response = await fetch(`${baseURL}/contracts/${id}`);
        const data = await response.json() as Contract;
        console.log(data)
        return {success: true, data}
    } catch (error) {
        return {success: false, error}
    }
}

export async function createContract(formData: Contract) {
    try {
        const response = await fetch(`${baseURL}/contracts`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        if (response.ok) {
            console.log('Contract data submitted successfully:', await response.json());
        } else {
            console.error('Failed to submit contract data:', response.statusText);
        }
    } catch (error) {
        console.error('Error submitting contract data:', error);
    }
}

export async function updateContract(contractId: string, formData: Contract) {
    try {
        const response = await fetch(`${baseURL}/contracts/${contractId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        if (response.ok) {
            console.log('Contract data updated successfully:', await response.json());
        } else {
            console.error('Failed to update contract data:', response.statusText);
        }
    } catch (error) {
        console.error('Error updating contract data:', error);
    }
}

export async function deleteContract(contractId: string) {
    try {
        const response = await fetch(`${baseURL}/contracts/${contractId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            console.log('Contract data deleted successfully:', await response.json());
        } else {
            console.error('Failed to delete contract data:', response.statusText);
        }
    } catch (error) {
        console.error('Error deleting contract data:', error);
    }
}




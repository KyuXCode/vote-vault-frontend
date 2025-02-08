import {InventoryUnit} from "../../Types/InventoryUnit.ts";

const baseURL = "http://localhost:8000/api";

export async function getInventoryUnits() {
    try {
        const response = await fetch(`${baseURL}/inventory_units`);
        const data = await response.json() as InventoryUnit[];
        console.log(data)
        return {success: true, data}
    } catch (error) {
        return {success: false, error}
    }
}

export async function getInventoryUnitById(id: string) {
    try {
        const response = await fetch(`${baseURL}/inventory_units/${id}`);
        const data = await response.json() as InventoryUnit;
        console.log(data)
        return {success: true, data}
    } catch (error) {
        return {success: false, error}
    }
}

export async function createInventoryUnit(formData: InventoryUnit) {
    try {
        const response = await fetch(`${baseURL}/inventory_units`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        if (response.ok) {
            console.log('InventoryUnit data submitted successfully:', await response.json());
        } else {
            console.error('Failed to submit inventory unit data:', response.statusText);
        }
    } catch (error) {
        console.error('Error submitting inventory unit data:', error);
    }
}

export async function updateInventoryUnit(inventoryUnitId: string, formData: InventoryUnit) {
    try {
        const response = await fetch(`${baseURL}/inventory_units/${inventoryUnitId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        if (response.ok) {
            console.log('InventoryUnit data updated successfully:', await response.json());
        } else {
            console.error('Failed to update inventory unit data:', response.statusText);
        }
    } catch (error) {
        console.error('Error updating inventory unit data:', error);
    }
}

export async function deleteInventoryUnit(inventoryUnitId: string) {
    try {
        const response = await fetch(`${baseURL}/inventory_units/${inventoryUnitId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            console.log('InventoryUnit data deleted successfully:', await response.json());
        } else {
            console.error('Failed to delete inventory unit data:', response.statusText);
        }
    } catch (error) {
        console.error('Error deleting inventory unit data:', error);
    }
}




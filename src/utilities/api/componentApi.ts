import {Component} from "../../Types/Component.ts";

const baseURL = "http://localhost:8000/api";

export async function getComponents() {
    try {
        const response = await fetch(`${baseURL}/components`);
        const data = await response.json() as Component[];
        console.log(data)
        return {success: true, data}
    } catch (error) {
        return {success: false, error}
    }
}

export async function getComponentById(id: string) {
    try {
        const response = await fetch(`${baseURL}/components/${id}`);
        const data = await response.json() as Component;
        console.log(data)
        return {success: true, data}
    } catch (error) {
        return {success: false, error}
    }
}

export async function createComponent(formData: Component) {
    try {
        const response = await fetch(`${baseURL}/components`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        if (response.ok) {
            console.log('Component data submitted successfully:', await response.json());
        } else {
            console.error('Failed to submit component data:', response.statusText);
        }
    } catch (error) {
        console.error('Error submitting component data:', error);
    }
}

export async function updateComponent(componentId: string, formData: Component) {
    try {
        const response = await fetch(`${baseURL}/components/${componentId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        if (response.ok) {
            console.log('Component data updated successfully:', await response.json());
        } else {
            console.error('Failed to update component data:', response.statusText);
        }
    } catch (error) {
        console.error('Error updating component data:', error);
    }
}

export async function deleteComponent(componentId: string) {
    try {
        const response = await fetch(`${baseURL}/components/${componentId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            console.log('Component data deleted successfully:', await response.json());
        } else {
            console.error('Failed to delete component data:', response.statusText);
        }
    } catch (error) {
        console.error('Error deleting component data:', error);
    }
}




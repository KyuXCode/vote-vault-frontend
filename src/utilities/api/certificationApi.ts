import {Certification} from "../../Types/Certification.ts";

const baseURL = "http://127.0.0.1:8000/api";

export async function getCertifications() {
    try {
        const response = await fetch(`${baseURL}/certifications`);
        const data = await response.json() as Certification[];
        console.log(data)
        return {success: true, data}
    } catch (error) {
        return {success: false, error}
    }
}

export async function getCertificationById(id: string) {
    try {
        const response = await fetch(`${baseURL}/certifications/${id}`);
        const data = await response.json() as Certification;
        console.log(data)
        return {success: true, data}
    } catch (error) {
        return {success: false, error}
    }
}

export async function createCertification(formData: Certification) {
    try {
        const response = await fetch(`${baseURL}/certifications`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        if (response.ok) {
            console.log('Certification data submitted successfully:', await response.json());
        } else {
            console.error('Failed to submit certification data:', response.statusText);
        }
    } catch (error) {
        console.error('Error submitting certification data:', error);
    }
}

export async function updateCertification(certificationId: string, formData: Certification) {
    try {
        const response = await fetch(`${baseURL}/certifications/${certificationId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        if (response.ok) {
            console.log('Certification data updated successfully:', await response.json());
        } else {
            console.error('Failed to update certification data:', response.statusText);
        }
    } catch (error) {
        console.error('Error updating certification data:', error);
    }
}

export async function deleteCertification(certificationId: string) {
    try {
        const response = await fetch(`${baseURL}/certifications/${certificationId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            console.log('Certification data deleted successfully:', await response.json());
        } else {
            console.error('Failed to delete certification data:', response.statusText);
        }
    } catch (error) {
        console.error('Error deleting certification data:', error);
    }
}




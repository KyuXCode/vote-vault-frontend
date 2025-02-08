import {Expense} from "../../Types/Expense.ts";

const baseURL = "http://localhost:8000/api";

export async function getExpenses() {
    try {
        const response = await fetch(`${baseURL}/expenses`);
        const data = await response.json() as Expense[];
        console.log(data)
        return {success: true, data}
    } catch (error) {
        return {success: false, error}
    }
}

export async function getExpenseById(id: string) {
    try {
        const response = await fetch(`${baseURL}/expenses/${id}`);
        const data = await response.json() as Expense;
        console.log(data)
        return {success: true, data}
    } catch (error) {
        return {success: false, error}
    }
}

export async function createExpense(formData: Expense) {
    try {
        const response = await fetch(`${baseURL}/expenses`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        if (response.ok) {
            console.log('Expense data submitted successfully:', await response.json());
        } else {
            console.error('Failed to submit expense data:', response.statusText);
        }
    } catch (error) {
        console.error('Error submitting expense data:', error);
    }
}

export async function updateExpense(expenseId: string, formData: Expense) {
    try {
        const response = await fetch(`${baseURL}/expenses/${expenseId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        if (response.ok) {
            console.log('Expense data updated successfully:', await response.json());
        } else {
            console.error('Failed to update expense data:', response.statusText);
        }
    } catch (error) {
        console.error('Error updating expense data:', error);
    }
}

export async function deleteExpense(expenseId: string) {
    try {
        const response = await fetch(`${baseURL}/expenses/${expenseId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            console.log('Expense data deleted successfully:', await response.json());
        } else {
            console.error('Failed to delete expense data:', response.statusText);
        }
    } catch (error) {
        console.error('Error deleting expense data:', error);
    }
}




import {Audit} from "../../Types/Audit.ts";


const baseURL = "http://127.0.0.1:8000/api";

export async function getPublicTest() {
    try {
        const response = await fetch(`${baseURL}/audits/public_test`);
        const data = await response.json() as Audit;
        console.log(data)
        return {success: true, data}
    } catch (error) {
        return {success: false, error}
    }
}

export async function getRandomTest() {
    try {
        const response = await fetch(`${baseURL}/audits/random`);
        const data = await response.json() as Audit;
        console.log(data)
        return {success: true, data}
    } catch (error) {
        return {success: false, error}
    }
}
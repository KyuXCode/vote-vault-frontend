import { PublicAudit, RandomAudit } from "../../Types/Audit.ts";

const baseURL = "http://127.0.0.1:8000/api";

export async function getPublicTest(seed_number?: string) {
    try {
        // Construct URL based on the presence of seed_number
        const url = seed_number?.trim()
            ? `${baseURL}/audits/public_test?seed_number=${seed_number}`
            : `${baseURL}/audits/public_test`;

        const response = await fetch(url);
        const data = await response.json() as PublicAudit;

        console.log("Request URL:", url);
        console.log("Response Data:", data);

        return { success: true, data };
    } catch (error) {
        console.error("Error in getPublicTest:", error);
        return { success: false, error };
    }
}

export async function getRandomTest(seed_number?: string) {
    try {
        // Construct URL based on the presence of seed_number
        const url = seed_number?.trim()
            ? `${baseURL}/audits/random?seed_number=${seed_number}`
            : `${baseURL}/audits/random`;

        const response = await fetch(url);
        const data = await response.json() as RandomAudit;

        console.log("Request URL:", url);
        console.log("Response Data:", data);

        return { success: true, data };
    } catch (error) {
        console.error("Error in getRandomTest:", error);
        return { success: false, error };
    }
}

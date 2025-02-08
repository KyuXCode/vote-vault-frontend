import {DashBoardData} from "../../Types/DashBoardData.ts";

const baseURL = "http://localhost:8000/api";

export async function getDashboardData() {
    try {
        const response = await fetch(`${baseURL}/dashboard_data`);
        const data = await response.json() as DashBoardData;
        console.log(data)
        return {success: true, data}
    } catch (error) {
        return {success: false, error}
    }
}
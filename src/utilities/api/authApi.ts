import {UserCredential} from "../../Types/Auths/UserCredential.ts";
import {LoginCredential} from "../../Types/Auths/LoginCredential.ts";
import {AuthToken} from "../../Types/Auths/AuthToken.ts";

const baseURL = "http://localhost:8000";

export async function getCsrfCookie() {
    await fetch(`${baseURL}/sanctum/csrf-cookie`);
}

export async function getUserInfo() {
    const expires_at = localStorage.getItem("expires_at");
    const token = localStorage.getItem("XSRF-TOKEN");

    if (expires_at) {
        const exp = new Date(expires_at).getTime();

        if (exp > Date.now()) {
            const res = await fetch(`${baseURL}/api/users`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `Bearer ${token}`,
                }
            })

            return await res.json() as UserCredential;
        } else {
            console.log("Expired")
        }
    }
}

export async function userLogin(credential: LoginCredential) {
    await getCsrfCookie()

    try {
        const res = await fetch(`${baseURL}/api/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(credential)
        })

        const data = await res.json() as AuthToken;

        if (res.status === 200) {
            return {success: true, data: data};
        }
    } catch (error) {
        return {success: false, error}
    }
}

export async function userLogout(token: string) {
    const res = await fetch(`${baseURL}/api/logout`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    })

    return await res.json();
}

export async function registerUser(credential: UserCredential) {
    await getCsrfCookie()
    return await fetch(`${baseURL}/api/register`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credential)
    })
}



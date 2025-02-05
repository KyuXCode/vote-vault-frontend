import React, {createContext, useContext, useState, useEffect, ReactNode} from "react";
import {UserCredential} from "../Types/Auths/UserCredential.ts";
import {getUserInfo, userLogin, userLogout} from "../utilities/api/authApi.ts";
import {LoginCredential} from "../Types/Auths/LoginCredential.ts";

interface AuthContextType {
    user: UserCredential | null;
    isAuthenticated: boolean;
    login: (loginCredential: LoginCredential) => Promise<void>;
    logout: () => void;
}

// Create Auth Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserCredential | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        getUserInfo().then( user => {
            if (user) {
                setUser(user)
                console.log(user.role)
            }
        })
    }, []);

    const login = async (loginCredential: LoginCredential) => {
           const res = await userLogin(loginCredential)
            console.log(res)
            if (res && res.data) {
                localStorage.setItem("XSRF-TOKEN", res.data.access_token)
                localStorage.setItem("expires_at", res.data.expires_at)
                setIsAuthenticated(true);
                setUser(user);
            }
    };

    // Handle logout (clear state & invalidate session)
    const logout = async () => {
        const token = localStorage.getItem("XSRF-TOKEN") ?? ""

        const res = await userLogout(token)
        console.log(res)

        if (res) {
            localStorage.setItem("XSRF-TOKEN", "")
            localStorage.setItem("expires_at", "")
            setIsAuthenticated(false);
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook for easier access
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

import React from "react";
import { Navigate } from "react-router-dom";
import {useAuth} from "../Auth/AuthContext.tsx";

export const PrivateRoute: React.FC<{ element: JSX.Element; requiredRoles?: string[] }> = ({ element, requiredRoles }) => {
    const { user } = useAuth();

    const token = localStorage.getItem("XSRF-TOKEN");
    const expires_at = localStorage.getItem("expires_at");

    if (!token) return <Navigate to="/login" />;
    console.log(user)

    if (user) {
        if (requiredRoles && !requiredRoles.includes(user.role)) return <Navigate to="/unauthorized"/>;
    }

    if(requiredRoles && user) {
        console.log(requiredRoles)
        console.log(user.role)
    }

    if (expires_at) {
        const exp = new Date(expires_at).getTime();
        if (exp < Date.now()) {
            return <Navigate to="/login" />;
        }
    }

    return element;
};
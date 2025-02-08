import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const MagicVerify: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const email = urlParams.get("email");
        const signature = urlParams.get("signature");
        const expires = urlParams.get("expires");

        if (email && signature && expires) {
            fetch("http://localhost:8000/api/magic-login-verify", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, signature, expires }),
            })
                .then(async (response) => {
                    const data = await response.json();
                    if (response.ok) {
                        localStorage.setItem("XSRF-TOKEN", data.token);
                        navigate("/");
                    } else {
                        alert(data.message || "Invalid or expired magic link");
                        navigate("/login");
                    }
                })
                .catch(() => {
                    alert("Error verifying magic link");
                    navigate("/unauthorized");
                });
        } else {
            alert("Invalid magic link");
            navigate("/unauthorized");
        }
    }, [location, navigate]);

    return <p>Verifying magic link...</p>;
};

export default MagicVerify;

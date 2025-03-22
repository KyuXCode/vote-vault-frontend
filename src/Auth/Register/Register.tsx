import {FC, useState} from 'react';
import {UserCredential} from "../../Types/Auths/UserCredential.ts";
import {OrgType} from "../../Types/Enums/OrgType.ts";
import {Role} from "../../Types/Enums/Role.ts";
import {useNavigate} from "react-router-dom";
import './registerStyle.scss'
import {registerUser} from "../../utilities/api/authApi.ts";

const Register: FC = () => {
    const credential: UserCredential = {
        name: "John Doe",
        email: "test@gmail.com",
        password: "password123",
        password_confirmation: "password123",
        phone: "1234567890",
        username: "testuser",
        supervisor_name: "Jane Smith",
        supervisor_email: "janesmith@company.com",
        organization: OrgType.County,
        role: Role.User
    }

    const navigate = useNavigate();

    // const [formData, setFormData] = useState<UserCredential>({
    //     name: "",
    //     email: "",
    //     password: "",
    //     password_confirmation: "",
    //     phone: "",
    //     username: "",
    //     supervisor_name: "",
    //     supervisor_email: "",
    //     organization: OrgType.County,
    //     role: Role.User,
    // });

    const [formData, setFormData] = useState<UserCredential>(credential);

    const [errors, setErrors] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    // Handles form input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    // Form validation
    const validateForm = () => {
        const newErrors: string[] = [];

        Object.entries(formData).forEach(([key, value]) => {
            if (!value) {
                newErrors.push(`${key.replace(/_/g, " ")} is required`);
            }
        });

        if (formData.password !== formData.password_confirmation) {
            newErrors.push("Passwords do not match");
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handles form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        try {
            await registerUser(formData);
            alert("Registration successful!");
        } catch (error) {
            console.error("Registration failed", error);
        }
        setLoading(false);
        navigate("/login");
    };

    return (
        <div className="register-container">
            <form onSubmit={handleSubmit} className="register-form">
                <h2>Register</h2>

                {Object.values(errors).map((error, index) => (
                    <p key={index} className="error">{error}</p>
                ))}

                <div className="input-group">
                    <label>Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange}/>
                </div>

                <div className="input-group">
                    <label>Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange}/>
                </div>

                <div className="input-group">
                    <label>Password</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange}/>
                </div>

                <div className="input-group">
                    <label>Confirm Password</label>
                    <input type="password" name="password_confirmation" value={formData.password_confirmation}
                           onChange={handleChange}/>
                </div>

                <div className="input-group">
                    <label>Phone</label>
                    <input type="tel" name="phone" pattern="[0-9]{3}[0-9]{3}[0-9]{4}" required value={formData.phone} onChange={handleChange} placeholder={"1234567890"}/>
                </div>

                <div className="input-group">
                    <label>Username</label>
                    <input type="text" name="username" value={formData.username} onChange={handleChange}/>
                </div>

                <div className="input-group">
                    <label>Supervisor Name</label>
                    <input type="text" name="supervisor_name" value={formData.supervisor_name} onChange={handleChange}/>
                </div>

                <div className="input-group">
                    <label>Supervisor Email</label>
                    <input type="email" name="supervisor_email" value={formData.supervisor_email}
                           onChange={handleChange}/>
                </div>

                <div className="input-group">
                    <label>Organization</label>
                    <select name="organization" value={formData.organization} onChange={handleChange}>
                        {Object.values(OrgType).map((org) => (
                            <option key={org} value={org}>{org}</option>
                        ))}
                    </select>
                </div>

                <div className="input-group">
                    <label>Role</label>
                    <select name="role" value={formData.role} onChange={handleChange}>
                        {Object.values(Role).map((role) => (
                            <option key={role} value={role}>{role}</option>
                        ))}
                    </select>
                </div>

                <button type="submit" className="register-button" disabled={loading}>
                    {loading ? "Registering..." : "Register"}
                </button>
            </form>
        </div>
    );
};

export default Register;
import {FC, useState} from 'react';
import {useAuth} from "../AuthContext.tsx";
import {useNavigate} from "react-router-dom";
import './loginStyle.scss'

const Login: FC = () => {
    const {login} = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const res = await login({
            email: email,
            password: password
        });


        console.log(res)

        setLoading(false);

        navigate('/')
    }

    return (
        <div className='login-container'>
            <form onSubmit={handleLogin} className="login-form">
                <h2>Welcome to VSTOP</h2>
                <p></p>

                <div className="input-group">
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                    />
                </div>

                <div className="input-group">
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                    />
                </div>

                <button type="submit" className="login-button" disabled={loading}>
                    {loading ? "Logging in..." : "Sign In"}
                </button>


                {/*<button className="magic-link-button" disabled={loading}>*/}
                {/*    Sign in with link*/}
                {/*</button>*/}

                {/*<button className="register" disabled={loading}>*/}
                {/*    Register*/}
                {/*</button>*/}
            </form>
        </div>
    );
};

export default Login;
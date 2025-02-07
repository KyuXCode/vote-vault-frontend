import {FC, useState} from 'react';
import './magicLinkSendViewStyles.scss'
import {useAuth} from "../../AuthContext.tsx";

const MagicLinkSendView: FC = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const { sendMagicLinkMail } = useAuth()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        sendMagicLinkMail(email)
        setLoading(false)
    }
    return (
        <div className="magic-link-send-container">
            <div className="magic-link-sender-form">
                <h2>Login via Magic Link</h2>
                <p>Enter your email to receive a magic link for login.</p>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="email-input"
                    />
                    <button type="submit" className="send-button" disabled={loading}>
                        {loading ? "Sending..." : "Send Magic Link"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default MagicLinkSendView;
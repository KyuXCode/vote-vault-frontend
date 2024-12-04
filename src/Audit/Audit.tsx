import {FC} from 'react';
import './auditStyles.scss'
import {useNavigate} from "react-router-dom";

const Audit: FC = () => {
    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className='audit-container'>
            <button onClick={handleGoBack} className="go-back-button">Go back</button>

            <div className="audit-type">
                <button onClick={() => navigate("/audit/public_test")}>Public Test Audit</button>
                <button onClick={() => navigate("/audit/random")}>Random Audit</button>
            </div>
        </div>
    );
};

export default Audit;
import {FC} from 'react';
import './unauthorizedPageStyles.scss'
import {useNavigate} from "react-router-dom";

const UnauthorizedPage: FC = () => {

    const navigate = useNavigate()

    return (
        <div className='unauthorized-page-container'>
            <div className="alert">
                <h1>You do not have permission to this page, contact your manager to see permissions </h1>
                <h1>or</h1>
                <button onClick={() => navigate('/')}>Go Back</button>
            </div>
        </div>
    );
};

export default UnauthorizedPage;
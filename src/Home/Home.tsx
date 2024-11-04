import {FC} from 'react';
import './homeStyles.scss'
import {useNavigate} from "react-router-dom";

const Home: FC = () => {
    const navigate = useNavigate();

    return (
        <div className='home-container'>
            <button onClick={() => navigate("/vendors")}>Vendors</button>
            <button onClick={() => navigate("/certifications")}>Certification</button>
            <button onClick={() => navigate("/components")}>Components</button>
            <button onClick={() => navigate("/counties")}>Counties</button>
            <button onClick={() => navigate("/contracts")}>Contracts</button>
        </div>
    );
};

export default Home;
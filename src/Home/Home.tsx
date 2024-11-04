import {FC} from 'react';
import './homeStyles.scss'
import {useNavigate} from "react-router-dom";

const Home: FC = () => {
    const navigate = useNavigate();

    return (
        <div className='home-container'>
            <button onClick={() => navigate("/vendors")}>Vendors</button>
            <button onClick={() => navigate("/certifications")}>Certifications</button>
            <button onClick={() => navigate("/components")}>Components</button>
            <button onClick={() => navigate("/counties")}>Counties</button>
            <button onClick={() => navigate("/contracts")}>Contracts</button>
            <button onClick={() => navigate("/expenses")}>Expenses</button>
            <button onClick={() => navigate("/inventory_units")}>Inventory Units</button>
            <button onClick={() => navigate("/dispositions")}>Dispositions</button>
            {/*<button onClick={() => navigate("/storage_locations")}>Storage Locations</button>*/}
        </div>
    );
};

export default Home;
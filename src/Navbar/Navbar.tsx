import {FC, useState} from 'react';
import './navbarStyles.scss'
import {useNavigate} from "react-router-dom";
import {useAuth} from "../Auth/AuthContext.tsx";
import TourGuide from "../TourGuide/TourGuide.tsx";

const Navbar: FC = () => {
    const navigate = useNavigate();
    const { logout } = useAuth()

    const [startTour, setStartTour] = useState(false)

    const handleStartTour = () => {
        setStartTour(true)
    }

    const handleTourEnd = () => {
        setStartTour(false)
    }


    return (
        <div className="navbar">
            <div className="logo" onClick={() => navigate("/")}>Home</div>
            <div className='item' id='vendors' onClick={() => navigate("/vendors")}>Vendors</div>
            <div className='item' id='certification' onClick={() => navigate("/certifications")}>Certifications</div>
            <div className='item' id='component' onClick={() => navigate("/components")}>Components</div>
            <div className='item' id='couty' onClick={() => navigate("/counties")}>Counties</div>
            <div className='item' id='contract' onClick={() => navigate("/contracts")}>Contracts</div>
            <div className='item' id='expense' onClick={() => navigate("/expenses")}>Expenses</div>
            <div className='item' id='inventory-unit' onClick={() => navigate("/inventory_units")}>Inventory Units</div>
            <div className='item' id='disposition' onClick={() => navigate("/dispositions")}>Dispositions</div>
            <div className='item' id='storage-location' onClick={() => navigate("/storage_locations")}>Storage Locations</div>
            <div className='item' id='audit' onClick={() => navigate("/audit")}>Audits</div>
            <button className="logout-button" id='logout' onClick={logout}>Logout</button>
            <button onClick={handleStartTour}>
                Start tour
            </button>

            {startTour && (
                <TourGuide start={startTour} setStartTour={setStartTour} onTourEnd={handleTourEnd}/>
            )}
        </div>
    );
};

export default Navbar;
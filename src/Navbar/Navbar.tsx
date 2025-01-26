import {FC} from 'react';
import './navbarStyles.scss'
import {useNavigate} from "react-router-dom";

const Navbar: FC = () => {
    const navigate = useNavigate();

    return (
        <div className="navbar">
            <div className="logo" onClick={() => navigate("/")}>Home</div>
            <div className='item' onClick={() => navigate("/vendors")}>Vendors</div>
            <div className='item' onClick={() => navigate("/certifications")}>Certifications</div>
            <div className='item' onClick={() => navigate("/components")}>Components</div>
            <div className='item' onClick={() => navigate("/counties")}>Counties</div>
            <div className='item' onClick={() => navigate("/contracts")}>Contracts</div>
            <div className='item' onClick={() => navigate("/expenses")}>Expenses</div>
            <div className='item' onClick={() => navigate("/inventory_units")}>Inventory Units</div>
            <div className='item' onClick={() => navigate("/dispositions")}>Dispositions</div>
            <div className='item' onClick={() => navigate("/storage_locations")}>Storage Locations</div>
            <div className='item' onClick={() => navigate("/audit")}>Audits</div>
        </div>
    );
};

export default Navbar;
import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Vendor } from "../../../Types/Vendor.ts";
import {deleteVendor, getVendors} from "../../../utilities/api/vendorApi.ts";
import './displayVendorsStyles.scss';

const DisplayVendors: FC = () => {
    const [vendors, setVendors] = useState<Vendor[]>([]);
    const navigate = useNavigate();


    useEffect(() => {
        getVendors().then((result) => {
            if (result.success && result.data) {
                setVendors(result.data);
            }
        });
    }, []);

    const handleEdit = (id: string) => {
        navigate(`/vendors/edit/${id}`);
    };

    const handleDelete = (id: string) => {
        deleteVendor(id)
    }

    const handleCreate = () => {
        navigate('/vendors/create');
    };


    return (
        <div className='display-vendors-container'>
            <button className=" " onClick={() => navigate('/')}>
                HOME
            </button>

            <button className="create-button" onClick={handleCreate}>
                Create Vendor
            </button>

            <div className="data-row header-row">
                <p>Actions</p>
                <p>Name</p>
                <p>Address</p>
                <p>City</p>
                <p>State</p>
                <p>Zip</p>
                <p>Contact Name</p>
                <p>Contact Email</p>
                <p>Contact Phone</p>
                <p>Product</p>
            </div>

            {vendors.map((vendor: Vendor) => (
                <div key={vendor.name} className="data-row">
                    <div className="actions">
                        <button className="edit-button" onClick={() => handleEdit((vendor.id ?? 0).toString())}>Edit</button>
                        <button className="delete-button" onClick={() => {
                            handleDelete((vendor.id ?? 0).toString())
                        }}>Delete
                        </button>
                    </div>
                    <p>{vendor.name}</p>
                    <p>{vendor.address || 'N/A'}</p>
                    <p>{vendor.city || 'N/A'}</p>
                    <p>{vendor.state || 'N/A'}</p>
                    <p>{vendor.zip || 'N/A'}</p>
                    <p>{vendor.contact_name || 'N/A'}</p>
                    <p>{vendor.contact_email || 'N/A'}</p>
                    <p>{vendor.contact_phone || 'N/A'}</p>
                    <p>{vendor.product}</p>
                </div>
            ))}
        </div>
    );
};

export default DisplayVendors;

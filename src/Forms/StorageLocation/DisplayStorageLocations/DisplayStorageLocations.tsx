import {FC, useEffect, useState} from 'react';
import './displayStorageLocationsStyles.scss'
import {useNavigate} from "react-router-dom";
import {StorageLocation} from "../../../Types/StorageLocation.ts";
import {deleteStorageLocation, getStorageLocations} from "../../../utilities/api/storageLocationApi.ts";

const DisplayStorageLocations: FC = () => {
    const [storageLocations, setStorageLocations] = useState<StorageLocation[]>([]);
    const navigate = useNavigate();


    useEffect(() => {
        getStorageLocations().then((result) => {
            if (result.success && result.data) {
                setStorageLocations(result.data);
            }
        });
    }, []);

    const handleEdit = (id: string) => {
        navigate(`/storage_locations/edit/${id}`);
    };

    const handleDelete = (id: string) => {
        deleteStorageLocation(id)
    }

    const handleCreate = () => {
        navigate('/storage_locations/create');
    };

    return (
        <div className='display-storage-locations-container'>
            <button className=" " onClick={() => navigate('/')}>
                HOME
            </button>

            <button className="create-button" onClick={handleCreate}>
                Create Storage Location
            </button>

            <div className="data-row header-row">
                <p>Actions</p>
                <p>Name</p>
                <p>Address</p>
                <p>City</p>
                <p>State</p>
                <p>Zip</p>
                <p>Inventory Unit ID</p>
            </div>

            {storageLocations.map((storageLocation: StorageLocation) => (
                <div key={storageLocation.id} className="data-row">
                    <div className="actions">
                        <button className="edit-button" onClick={() => handleEdit((storageLocation.id ?? 0).toString())}>Edit
                        </button>
                        <button className="delete-button" onClick={() => {
                            handleDelete((storageLocation.id ?? 0).toString())
                        }}>Delete
                        </button>
                    </div>
                    <p>{storageLocation.name}</p>
                    <p>{storageLocation.address}</p>
                    <p>{storageLocation.city}</p>
                    <p>{storageLocation.state}</p>
                    <p>{storageLocation.zip}</p>
                    <p>{storageLocation.inventory_unit_id}</p>
                </div>
            ))}
        </div>
    );
};

export default DisplayStorageLocations;
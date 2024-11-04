import {FC, useEffect, useState} from 'react';
import './storageLocationFormStyles.scss'
import {useNavigate, useParams} from "react-router-dom";
import {
    createStorageLocation,
    getStorageLocationById,
    updateStorageLocation
} from "../../../utilities/api/storageLocationApi.ts";
import {StorageLocation} from "../../../Types/StorageLocation.ts";

const StorageLocationForm: FC = () => {
    const [formData, setFormData] = useState<StorageLocation>({
        name: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        inventory_unit_id: 0,
    });

    const { id } = useParams<{ id?: string }>();
    const navigate = useNavigate();
    const isEditMode = Boolean(id);

    useEffect(() => {
        if (isEditMode && id) {
            const fetchStorageLocation = async () => {
                const result = await getStorageLocationById(id);
                if (result.success && result.data) {
                    setFormData(result.data);
                }
            };
            fetchStorageLocation();
        }
    }, [isEditMode, id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        console.log(formData)
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isEditMode && id) {
            await updateStorageLocation(id, formData);
        } else {
            await createStorageLocation(formData);
        }
        navigate('/storage_locations');
    };

    return (
        <form onSubmit={handleSubmit} className='storage-location-form-container'>
            <label>
                Name:
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                />
            </label>

            <label>
                Address:
                <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                />
            </label>

            <label>
                City:
                <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                />
            </label>

            <label>
                State:
                <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                />
            </label>

            <label>
                Zip:
                <input
                    type="text"
                    name="zip"
                    value={formData.zip}
                    onChange={handleChange}
                />
            </label>

            <label>
                Inventory Unit ID:
                <input
                    type="number"
                    name="inventory_unit_id"
                    value={formData.inventory_unit_id}
                    onChange={handleChange}
                />
            </label>

            <button type="submit">{isEditMode ? 'Update' : 'Create'} Storage Location</button>
        </form>
    );
};

export default StorageLocationForm;
import {FC, useEffect, useState} from 'react';
import { Product, Vendor } from '../../../Types/Vendor.ts';
import './vendorFormStyles.scss';
import {createVendor, getVendorById, updateVendor} from '../../../utilities/api/vendorApi.ts';
import {useNavigate, useParams} from 'react-router-dom';

const VendorForm: FC = () => {
    const [formData, setFormData] = useState<Vendor>({
        name: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        contact_name: '',
        contact_email: '',
        contact_phone: '',
        product: Product.Other,
    });

    const { id } = useParams<{ id?: string }>();
    const navigate = useNavigate();
    const isEditMode = Boolean(id);

    useEffect(() => {
        if (isEditMode && id) {
            const fetchVendor = async () => {
                const result = await getVendorById(id);
                if (result.success && result.data) {
                    setFormData(result.data);
                }
            };
            fetchVendor();
        }
    }, [isEditMode, id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isEditMode && id) {
            await updateVendor(id, formData);
        } else {
            await createVendor(formData);
        }
        navigate('/vendors');
    };

    return (
        <form onSubmit={handleSubmit} className="vendor-form-container">
            <label>
                Name:
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </label>

            <label>
                Address:
                <input type="text" name="address" value={formData.address || ''} onChange={handleChange} />
            </label>

            <label>
                City:
                <input type="text" name="city" value={formData.city || ''} onChange={handleChange} />
            </label>

            <label>
                State:
                <input type="text" name="state" value={formData.state || ''} onChange={handleChange} />
            </label>

            <label>
                Zip:
                <input type="text" name="zip" value={formData.zip || ''} onChange={handleChange} />
            </label>

            <label>
                Contact Name:
                <input type="text" name="contact_name" value={formData.contact_name || ''} onChange={handleChange} />
            </label>

            <label>
                Contact Email:
                <input type="email" name="contact_email" value={formData.contact_email || ''} onChange={handleChange} />
            </label>

            <label>
                Contact Phone:
                <input type="tel" name="contact_phone" value={formData.contact_phone || ''} onChange={handleChange} />
            </label>

            <label>
                Product:
                <select name="product" value={formData.product} onChange={handleChange} required>
                    {Object.values(Product).map((productType) => (
                        <option key={productType} value={productType}>
                            {productType}
                        </option>
                    ))}
                </select>
            </label>

            <button type="submit">{isEditMode ? 'Update' : 'Create'} Vendor</button>
        </form>
    );
};

export default VendorForm;
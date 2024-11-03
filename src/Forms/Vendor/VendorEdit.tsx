import {FC, useEffect, useState} from 'react';
import './vendorEditStyles.scss'
import {useNavigate, useParams} from "react-router-dom";
import {Product, Vendor} from "../../Types/Vendor.ts";
import {getVendorById, updateVendor} from "../../utilities/api/vendorApi.ts";

interface VendorFormProps {
    vendor?: Vendor;
}

const VendorEdit: FC<VendorFormProps> = ({vendor}) => {
    const {id} = useParams<{ id: string }>();
    const navigate = useNavigate()
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

    useEffect(() => {
        if (vendor) {
            setFormData(vendor);
        } else {
            getVendorById(id ?? "0").then((result) => {
                if (result.success && result.data) {
                    setFormData(result.data);
                }
            })
        }
    }, [vendor]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await updateVendor((formData.id ?? 0).toString(), formData);
        navigate('/vendors')
    };

    return (
        <form onSubmit={handleSubmit} className="vendor-form-container">
            <label>
                Name:
                <input type="text" name="name" value={formData.name} onChange={handleChange} required/>
            </label>

            <label>
                Address:
                <input
                    type="text"
                    name="address"
                    value={formData.address || ''}
                    onChange={handleChange}
                />
            </label>

            <label>
                City:
                <input
                    type="text"
                    name="city"
                    value={formData.city || ''}
                    onChange={handleChange}
                />
            </label>

            <label>
                State:
                <input
                    type="text"
                    name="state"
                    value={formData.state || ''}
                    onChange={handleChange}
                />
            </label>

            <label>
                Zip:
                <input
                    type="text"
                    name="zip"
                    value={formData.zip || ''}
                    onChange={handleChange}
                />
            </label>

            <label>
                Contact Name:
                <input
                    type="text"
                    name="contactName"
                    value={formData.contact_name || ''}
                    onChange={handleChange}
                />
            </label>

            <label>
                Contact Email:
                <input
                    type="email"
                    name="contactEmail"
                    value={formData.contact_email || ''}
                    onChange={handleChange}
                />
            </label>

            <label>
                Contact Phone:
                <input
                    type="tel"
                    name="contactPhone"
                    value={formData.contact_phone || ''}
                    onChange={handleChange}
                />
            </label>

            <label>
                Product:
                <select
                    name="product"
                    value={formData.product}
                    onChange={handleChange}
                    required>
                    {Object.values(Product).map((productType) => (
                        <option key={productType} value={productType}>
                            {productType}
                        </option>
                    ))}
                </select>
            </label>

            <button type="submit">{'Update'} Vendor</button>
        </form>
    );
};

export default VendorEdit;
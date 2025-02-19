import { FC, useEffect, useState } from 'react';
import {
    Certification,
    CertificationAction,
    CertificationType,
    SystemBase,
    SystemType
} from "../../../Types/Certification.ts";
import {
    createCertification,
    updateCertification,
    getCertificationById
} from "../../../utilities/api/certificationApi.ts";
import './certificationFormStyles.scss';
import '../../formStyle.scss';
import { useNavigate, useParams } from "react-router-dom";
import {getVendors} from "../../../utilities/api/vendorApi.ts";
import {Vendor} from "../../../Types/Vendor.ts";

const CertificationForm: FC = () => {
    const [vendors, setVendors] = useState<Vendor[]>([])

    const [formData, setFormData] = useState<Certification>({
        model_number: "",
        description: "",
        application_date: "",
        certification_date: "",
        expiration_date: "",
        federal_certification_number: "",
        federal_certification_date: "",
        type: CertificationType.Certification,
        action: CertificationAction.Pending,
        system_type: SystemType.VS,
        system_base: SystemBase.Other,
        vendor_id: 0
    });

    const { id } = useParams<{ id?: string }>();
    const navigate = useNavigate();
    const isEditMode = Boolean(id);

    useEffect(() => {
        if (isEditMode && id) {
            const fetchCertification = async () => {
                const result = await getCertificationById(id);
                if (result.success && result.data) {
                    setFormData(result.data);
                }
            };
            fetchCertification();
        }

        getVendors().then((result) => {
            if (result.success && result.data) {
                setVendors(result.data);
            }
        });

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
            await updateCertification(id, formData);
        } else {
            await createCertification(formData);
        }
        navigate('/certifications');
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className='form'>
            <button onClick={handleGoBack} className="go-back-button">Go back</button>
            <form onSubmit={handleSubmit} className="form-container">
                <label>
                    Model Number:
                    <input
                        type="text"
                        name="model_number"
                        value={formData.model_number}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label>
                    Description:
                    <input
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </label>

                <label>
                    Application Date:
                    <input
                        type="date"
                        name="application_date"
                        value={formData.application_date}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label>
                    Certification Date:
                    <input
                        type="date"
                        name="certification_date"
                        value={formData.certification_date}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label>
                    Expiration Date:
                    <input
                        type="date"
                        name="expiration_date"
                        value={formData.expiration_date}
                        onChange={handleChange}
                    />
                </label>

                <label>
                    Federal Certification Number:
                    <input
                        type="text"
                        name="federal_certification_number"
                        value={formData.federal_certification_number || ''}
                        onChange={handleChange}
                    />
                </label>

                <label>
                    Federal Certification Date:
                    <input
                        type="date"
                        name="federal_certification_date"
                        value={formData.federal_certification_date}
                        onChange={handleChange}
                    />
                </label>

                <label>
                    Type:
                    <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        required
                    >
                        {Object.values(CertificationType).map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                </label>

                <label>
                    Action:
                    <select
                        name="action"
                        value={formData.action}
                        onChange={handleChange}
                        required
                    >
                        {Object.values(CertificationAction).map((action) => (
                            <option key={action} value={action}>
                                {action}
                            </option>
                        ))}
                    </select>
                </label>

                <label>
                    System Type:
                    <select
                        name="system_type"
                        value={formData.system_type}
                        onChange={handleChange}
                        required
                    >
                        {Object.values(SystemType).map((systemType) => (
                            <option key={systemType} value={systemType}>
                                {systemType}
                            </option>
                        ))}
                    </select>
                </label>

                <label>
                    System Base:
                    <select
                        name="system_base"
                        value={formData.system_base}
                        onChange={handleChange}
                        required
                    >
                        {Object.values(SystemBase).map((systemBase) => (
                            <option key={systemBase} value={systemBase}>
                                {systemBase}
                            </option>
                        ))}
                    </select>
                </label>

                <label>
                    Vendor:
                    <select
                        name="vendor_id"
                        value={formData.vendor_id}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select a Vendor</option>
                        {vendors.map((vendor) => (
                            <option key={vendor.id} value={vendor.id}>
                                {vendor.name}
                            </option>
                        ))}
                    </select>
                </label>

                <button type="submit">{isEditMode ? 'Update' : 'Create'} Certification</button>
            </form>
        </div>
    );
};

export default CertificationForm;

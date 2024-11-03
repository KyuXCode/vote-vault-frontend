import {FC, useState} from 'react';
import {
    Certification,
    CertificationAction,
    CertificationType,
    SystemBase,
    SystemType
} from "../../Types/Certification.ts";
import {createCertification} from "../../utilities/api/certificationApi.ts";
import './certificationFormStyles.scss'
import {useNavigate} from "react-router-dom";


const CertificationForm: FC = () => {
    const [formData, setFormData] = useState<Certification>({
            model_number: "Model Test1",
            description: "High performance voting system model",
            application_date: "2024-10-22",
            certification_date: "2024-11-01",
            expiration_date: "2025-11-01",
            federal_certification_number: "FCN123456",
            federal_certification_date: "2024-12-01",
            type: CertificationType.Certification,
            action: CertificationAction.Pending,
            system_type: SystemType.VS,
            system_base: SystemBase.Other,
            vendor_id: 1
        }
    );
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log(formData)
        await createCertification(formData);
        navigate('/certifications')
    };


    return (
        <form onSubmit={handleSubmit} className="certification-form-container">
            <label>
                Model Number:
                <input
                    type="text"
                    id="model_number"
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
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                />
            </label>

            <label>
                Application Date:
                <input
                    type="date"
                    id="application_date"
                    name="application_date"
                    value={formData.application_date}
                    onChange={handleChange}
                    required
                />
            </label>

            <label htmlFor="certification_date">
                Certification Date:
                <input
                    type="date"
                    id="certification_date"
                    name="certification_date"
                    value={formData.certification_date}
                    onChange={handleChange}
                    required
                />
            </label>

            <label htmlFor="expiration_date">
                Expiration Date:
                <input
                    type="date"
                    id="expiration_date"
                    name="expiration_date"
                    value={formData.expiration_date}
                    onChange={handleChange}
                />
            </label>

            <label htmlFor="federal_certification_number">
                Federal Certification Number:
                <input
                    type="text"
                    id="federal_certification_number"
                    name="federal_certification_number"
                    value={formData.federal_certification_number || ''}
                    onChange={handleChange}
                />
            </label>

            <label htmlFor="federal_certification_date">
                Federal Certification Date:
                <input
                    type="date"
                    id="federal_certification_date"
                    name="federal_certification_date"
                    value={formData.federal_certification_date}
                    onChange={handleChange}
                />
            </label>

            <label htmlFor="type">
                Type:
                <select
                    id="type"
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

            <label htmlFor="action">
                Action:
                <select
                    id="action"
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

            <label htmlFor="system_type">
                System Type:
                <select
                    id="system_type"
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

            <label htmlFor="system_base">
                System Base:
                <select
                    id="system_base"
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

            <label htmlFor="vendorId">
                Vendor ID:
                <input
                    type="number"
                    id="vendorId"
                    name="vendorId"
                    value={Number(formData.vendor_id)}
                    onChange={handleChange}
                    required
                />
            </label>

            <button type="submit">Create Certification</button>
        </form>
    );
};

export default CertificationForm;
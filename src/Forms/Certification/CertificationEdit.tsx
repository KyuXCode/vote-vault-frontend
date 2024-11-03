import {FC, useEffect, useState} from 'react';
// import '../Certification/certificationEditStyles.scss'
import {useNavigate, useParams} from 'react-router-dom';
import {
    Certification,
    CertificationAction,
    CertificationType,
    SystemBase,
    SystemType
} from '../../Types/Certification.ts';
import {getCertificationById, updateCertification} from "../../utilities/api/certificationApi.ts";

const CertificationEdit: FC = () => {
    const {id} = useParams<{ id: string }>();
    const navigate = useNavigate()
    const [formData, setFormData] = useState<Certification>({
        model_number: "",
        description: "",
        application_date: "",
        certification_date: "",
        expiration_date: "",
        federal_certification_number: "",
        federal_certification_date: "",
        type: CertificationType.Certification,
        action: CertificationAction.Other,
        system_type: SystemType.EPB,
        system_base: SystemBase.Other,
        vendor_id: 0,
    });

    useEffect(() => {
        getCertificationById(id ?? "0").then((result) => {
            if (result.success && result.data) {
                setFormData(result.data);
            }
        })
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await updateCertification((formData.id ?? 0).toString(), formData);
        navigate('/certifications')
    };

    return (
        <form onSubmit={handleSubmit} className="certification-form-container">
            <label htmlFor="model_number">
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

            <label htmlFor="description">
                Description:
                <input
                    type="text"
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                />
            </label>

            <label htmlFor="application_date">
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
                    value={formData.vendor_id}
                    onChange={handleChange}
                    required
                />
            </label>

            <button type="submit">Update Certification</button>
        </form>
    );
};

export default CertificationEdit;
import {FC, useEffect, useState} from 'react';
import './displayCertificationStyles.scss'
import {useNavigate} from "react-router-dom";
import {Certification} from "../../../Types/Certification.ts";
import {deleteCertification, getCertifications} from "../../../utilities/api/certificationApi.ts";

const DisplayCertifications: FC = () => {
    const [certifications, setCertifications] = useState<Certification[]>([]);
    const navigate = useNavigate();


    useEffect(() => {
        getCertifications().then((result) => {
            if (result.success && result.data) {
                setCertifications(result.data);
            }
        });
    }, []);

    const handleEdit = (id: string) => {
        navigate(`/certifications/edit/${id}`);
    };

    const handleDelete = (id: string) => {
        deleteCertification(id)
    }

    const handleCreate = () => {
        navigate('/certifications/create');
    };


    return (
        <div className='display-certifications-container'>
            <button className=" " onClick={() => navigate('/')}>
                HOME
            </button>

            <button className="create-button" onClick={handleCreate}>
                Create Certification
            </button>

            <div className="data-row header-row">
                <p>Actions</p>
                <p>Model Number</p>
                <p>Description</p>
                <p>Application Date</p>
                <p>Certification Date</p>
                <p>Expiration Date</p>
                <p>Federal Certification Number</p>
                <p>Federal Certification Date</p>
                <p>Type</p>
                <p>Action</p>
                <p>System Type</p>
                <p>System Base</p>
                <p>Vendor ID</p>
            </div>

            {certifications.map((certification) => (
                <div key={certification.id} className="data-row">
                    <div className="actions">
                        <button className="edit-button" onClick={() => handleEdit((certification.id ?? 0).toString())}>Edit
                        </button>
                        <button className="delete-button"
                                onClick={() => handleDelete((certification.id ?? 0).toString())}>Delete
                        </button>
                    </div>
                    <p>{certification.model_number}</p>
                    <p>{certification.description}</p>
                    <p>{certification.application_date}</p>
                    <p>{certification.certification_date}</p>
                    <p>{certification.expiration_date}</p>
                    <p>{certification.federal_certification_number || 'N/A'}</p>
                    <p>{certification.federal_certification_date || 'N/A'}</p>
                    <p>{certification.type}</p>
                    <p>{certification.action}</p>
                    <p>{certification.system_type}</p>
                    <p>{certification.system_base}</p>
                    <p>{certification.vendor_id}</p>
                </div>
            ))}
        </div>
    );
};

export default DisplayCertifications;

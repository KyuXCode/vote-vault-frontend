import { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ComponentType, Component } from "../../../Types/Component.ts";
import { createComponent, updateComponent, getComponentById, batchCreateComponents } from "../../../utilities/api/componentApi.ts";
import './componentFormStyles.scss';
import '../../formStyle.scss';
import { getCertifications } from "../../../utilities/api/certificationApi.ts";
import { Certification } from "../../../Types/Certification.ts";

const ComponentForm: FC = () => {
    const [certifications, setCertifications] = useState<Certification[]>([]);
    const [batchFormData, setBatchFormData] = useState<Component[]>([{
        name: '',
        description: '',
        type: ComponentType.DRE,
        certification_id: 0,
    }]);

    const { id } = useParams<{ id?: string }>();
    const navigate = useNavigate();
    const isEditMode = Boolean(id);

    const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setBatchFormData((prevData) => {
            const newData = [...prevData];
            newData[index] = {
                ...newData[index],
                [name]: value,
            };
            return newData;
        });
    };

    const handleSubmit = async (index: number, e: React.FormEvent) => {
        e.preventDefault();
        const formData = batchFormData[index];
        if (isEditMode && id) {
            await updateComponent(id, formData);
        } else {
            await createComponent(formData);
        }
        navigate('/components');
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    const handleDelete = (index: number) => {
        setBatchFormData((prev) => prev.filter((_, i) => i !== index));
    };

    const handleFormAdd = () => {
        setBatchFormData((prev) => [
            ...prev,
            {
                name: '',
                description: '',
                type: ComponentType.DRE,
                certification_id: 0,
            }
        ]);
    };

    const handleBatchUpload = async () => {
        await batchCreateComponents({ components: batchFormData });
        setBatchFormData([{
            name: '',
            description: '',
            type: ComponentType.DRE,
            certification_id: 0,
        }]);
    };

    const formAdd = (index: number) => {
        const formData = batchFormData[index];
        return (
            <div style={{ margin: 1 }} key={index}>
                <button onClick={() => handleDelete(index)}>Delete</button>
                <form onSubmit={(e) => handleSubmit(index, e)} className='form-container'>
                    <label>
                        Name:
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={(e) => handleChange(index, e)}
                            required
                        />
                    </label>

                    <label>
                        Description:
                        <input
                            type="text"
                            name="description"
                            value={formData.description}
                            onChange={(e) => handleChange(index, e)}
                            required
                        />
                    </label>

                    <label>
                        Type:
                        <select
                            name="type"
                            value={formData.type}
                            onChange={(e) => handleChange(index, e)}
                            required
                        >
                            {Object.values(ComponentType).map((compType) => (
                                <option key={compType} value={compType}>
                                    {compType}
                                </option>
                            ))}
                        </select>
                    </label>

                    <label>
                        Certification:
                        <select
                            name="certification_id"
                            value={formData.certification_id}
                            onChange={(e) => handleChange(index, e)}
                            required
                        >
                            <option value="">Select a Certification</option>
                            {certifications.map((certification) => (
                                <option key={certification.id} value={certification.id}>
                                    {certification.model_number}
                                </option>
                            ))}
                        </select>
                    </label>

                    <button type="submit">{isEditMode ? 'Update' : 'Create'} Component</button>
                </form>
            </div>
        );
    };

    useEffect(() => {
        if (isEditMode && id) {
            const fetchComponent = async () => {
                const result = await getComponentById(id);
                if (result.success && result.data) {
                    setBatchFormData([result.data]);
                }
            };
            fetchComponent();
        }
        getCertifications().then((result) => {
            if (result.success && result.data) {
                setCertifications(result.data);
            }
        });
    }, [isEditMode, id]);

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start'
        }}>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%'
            }}>
                <button onClick={handleGoBack} className="go-back-button">Go back</button>
                <button onClick={handleFormAdd}>Add Form</button>
                <button onClick={handleBatchUpload}>Batch Create Form</button>
            </div>
            {batchFormData.map((_, index) => (
                <div key={index}>{formAdd(index)}</div>
            ))}
        </div>
    );
};

export default ComponentForm;
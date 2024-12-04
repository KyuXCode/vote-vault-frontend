import {FC, useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {ComponentType, Component} from "../../../Types/Component.ts";
import {createComponent, updateComponent, getComponentById} from "../../../utilities/api/componentApi.ts";
import './componentFormStyles.scss';
import '../../formStyle.scss'
import {getCertifications} from "../../../utilities/api/certificationApi.ts";
import {Certification} from "../../../Types/Certification.ts";

const ComponentForm: FC = () => {
    const [certifications, setCertifications] = useState<Certification[]>([])

    const [formData, setFormData] = useState<Component>({
        name: '',
        description: '',
        type: ComponentType.DRE,
        certification_id: 0,
    });
    const {id} = useParams<{ id?: string }>();
    const navigate = useNavigate();
    const isEditMode = Boolean(id);

    useEffect(() => {
        if (isEditMode && id) {
            const fetchComponent = async () => {
                const result = await getComponentById(id);
                if (result.success && result.data) {
                    setFormData(result.data);
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
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

    return (
        <div>
            <button onClick={handleGoBack} className="go-back-button">Go back</button>

            <form onSubmit={handleSubmit} className="form-container">
                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
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
                        required
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
                        onChange={handleChange}
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

export default ComponentForm;

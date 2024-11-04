import { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ComponentType, Component } from "../../../Types/Component.ts";
import { createComponent, updateComponent, getComponentById } from "../../../utilities/api/componentApi.ts";
import './componentFormStyles.scss';

const ComponentForm: FC = () => {
    const [formData, setFormData] = useState<Component>({
        name: '',
        description: '',
        type: ComponentType.DRE,
        certification_id: 0,
    });
    const { id } = useParams<{ id?: string }>();
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
            await updateComponent(id, formData);
        } else {
            await createComponent(formData);
        }
        navigate('/components');
    };

    return (
        <form onSubmit={handleSubmit} className="component-form-container">
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
                Certification ID:
                <input
                    type="number"
                    name="certificationId"
                    value={formData.certification_id}
                    onChange={handleChange}
                    required
                />
            </label>

            <button type="submit">{isEditMode ? 'Update' : 'Create'} Component</button>
        </form>
    );
};

export default ComponentForm;

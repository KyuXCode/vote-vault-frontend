import {FC, useEffect, useState} from 'react';
import './componentEditStyles.scss'
import {useNavigate, useParams} from 'react-router-dom';
import {Component, ComponentType} from "../../Types/Component.ts";
import {getComponentById, updateComponent} from "../../utilities/api/componentApi.ts";

const CertificationEdit: FC = () => {
    const {id} = useParams<{ id: string }>();
    const navigate = useNavigate()
    const [formData, setFormData] = useState<Component>({
        name: '',
        description: '',
        type: ComponentType.Other,
        certification_id: 0,
    });

    useEffect(() => {
        getComponentById(id ?? "0").then((result) => {
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
        await updateComponent((formData.id ?? 0).toString(), formData);
        navigate('/components')
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
                    value={Number(formData.certification_id)}
                    onChange={handleChange}
                    required
                />
            </label>

            <button type="submit">Update Component</button>
        </form>
    );
};

export default CertificationEdit;
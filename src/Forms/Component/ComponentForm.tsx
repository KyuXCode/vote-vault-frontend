import {FC, useState} from 'react';
import './componentFormStyles.scss'
import {useNavigate} from "react-router-dom";
import {Component, ComponentType} from "../../Types/Component.ts";
import {createComponent} from "../../utilities/api/componentApi.ts";


const ComponentForm: FC = () => {
    const [formData, setFormData] = useState<Component>({
        name: 'TestComponent',
        description: 'sPOjfojdp',
        type: ComponentType.Other,
        certification_id: 1,
    });

    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log(formData)
        await createComponent(formData);
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

            <button type="submit">Submit</button>
        </form>
    );
};

export default ComponentForm;
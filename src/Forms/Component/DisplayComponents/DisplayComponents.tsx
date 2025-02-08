import {FC, useEffect, useState} from 'react';
import './displayComponentsStyles.scss'
import '../../formDisplayStyle.scss';
import {useNavigate} from "react-router-dom";
import {Component} from "../../../Types/Component.ts";
import {getComponents} from "../../../utilities/api/componentApi.ts";
import {deleteComponent} from "../../../utilities/api/componentApi.ts";

const DisplayComponents: FC = () => {
    const [components, setComponents] = useState<Component[]>([]);
    const navigate = useNavigate();


    useEffect(() => {
        getComponents().then((result) => {
            if (result.success && result.data) {
                setComponents(result.data);
            }
        });
    }, []);

    const handleEdit = (id: string) => {
        navigate(`/components/edit/${id}`);
    };

    const handleDelete = (id: string) => {
        deleteComponent(id)
    }

    const handleCreate = () => {
        navigate('/components/create');
    };


    return (
        <div className="display-components-container form-display">
            <button className=" " onClick={() => navigate('/')}>
                HOME
            </button>

            <button className="create-button" onClick={handleCreate}>
                Create Component
            </button>

            <div className="data-row header-row">
                <p>Actions</p>
                <p>Name</p>
                <p>Description</p>
                <p>Type</p>
                <p>Certification ID</p>
            </div>

            {components.map((component: Component) => (
                <div key={component.id} className="data-row">
                    <div className="actions">
                        <button onClick={() => handleEdit((component.id ?? 0).toString())}
                                className="edit-button">Edit
                        </button>
                        <button onClick={() => handleDelete((component.id ?? 0).toString())}
                                className="delete-button">Delete
                        </button>
                    </div>
                    <p>{component.name}</p>
                    <p>{component.description}</p>
                    <p>{component.type}</p>
                    <p>{component.certification_id}</p>
                </div>
            ))}
        </div>);
};

export default DisplayComponents;

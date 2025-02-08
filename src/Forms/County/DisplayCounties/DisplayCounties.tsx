import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './displayCountiesStyles.scss';
import '../../formDisplayStyle.scss';
import {County} from "../../../Types/County.ts";
import {deleteCounty, getCounties} from "../../../utilities/api/countyApi.ts";

const DisplayCounties: FC = () => {
    const [counties, setCounties] = useState<County[]>([]);
    const navigate = useNavigate();


    useEffect(() => {
        getCounties().then((result) => {
            if (result.success && result.data) {
                setCounties(result.data);
            }
        });
    }, []);

    const handleEdit = (id: string) => {
        navigate(`/counties/edit/${id}`);
    };

    const handleDelete = (id: string) => {
        deleteCounty(id)
    }

    const handleCreate = () => {
        navigate('/counties/create');
    };


    return (
        <div className='display-counties-container form-display'>
            <button className=" " onClick={() => navigate('/')}>
                HOME
            </button>

            <button className="create-button" onClick={handleCreate}>
                Create County
            </button>

            <div className="data-row header-row">
                <p>Actions</p>
                <p>Name</p>
            </div>

            {counties.map((county: County) => (
                <div key={county.name} className="data-row">
                    <div className="actions">
                        <button className="edit-button" onClick={() => handleEdit((county.id ?? 0).toString())}>Edit</button>
                        <button className="delete-button" onClick={() => {
                            handleDelete((county.id ?? 0).toString())
                        }}>Delete
                        </button>
                    </div>
                    <p>{county.name}</p>
                </div>
            ))}
        </div>
    );
};

export default DisplayCounties;

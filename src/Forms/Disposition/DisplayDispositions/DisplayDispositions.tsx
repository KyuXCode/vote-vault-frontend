import {FC, useEffect, useState} from 'react';
import './displayDispositionsStyles.scss'
import {useNavigate} from "react-router-dom";
import {Disposition} from "../../../Types/Disposition.ts";
import {deleteDisposition, getDispositions} from "../../../utilities/api/dispositionApi.ts";

const DisplayDispositions: FC = () => {
    const [dispositions, setDispositions] = useState<Disposition[]>([]);
    const navigate = useNavigate();


    useEffect(() => {
        getDispositions().then((result) => {
            if (result.success && result.data) {
                setDispositions(result.data);
            }
        });
    }, []);

    const handleEdit = (id: string) => {
        navigate(`/dispositions/edit/${id}`);
    };

    const handleDelete = (id: string) => {
        deleteDisposition(id)
    }

    const handleCreate = () => {
        navigate('/dispositions/create');
    };
    return (
        <div className='display-dispositions-container'>
            <button className=" " onClick={() => navigate('/')}>
                HOME
            </button>

            <button className="create-button" onClick={handleCreate}>
                Create Disposition
            </button>

            <div className="data-row header-row">
                <p>Actions</p>
                <p>Date</p>
                <p>Method</p>
                <p>Entity</p>
                <p>Amount</p>
                <p>Inventory ID</p>
            </div>

            {dispositions.map((disposition: Disposition) => (
                <div key={disposition.id} className="data-row">
                    <div className="actions">
                        <button className="edit-button" onClick={() => handleEdit((disposition.id ?? 0).toString())}>Edit
                        </button>
                        <button className="delete-button" onClick={() => {
                            handleDelete((disposition.id ?? 0).toString())
                        }}>Delete
                        </button>
                    </div>
                    <p>{disposition.date}</p>
                    <p>{disposition.method}</p>
                    <p>{disposition.entity}</p>
                    <p>{disposition.amount}</p>
                    <p>{disposition.inventory_unit_id}</p>
                </div>
            ))}
        </div>
    );
};

export default DisplayDispositions;
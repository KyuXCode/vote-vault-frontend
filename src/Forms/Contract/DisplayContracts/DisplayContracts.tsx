import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './displayContractsStyles.scss';
import {deleteContract, getContracts} from "../../../utilities/api/contractApi.ts";
import {Contract} from "../../../Types/Contract.ts";

const DisplayContracts: FC = () => {
    const [contracts, setContracts] = useState<Contract[]>([]);
    const navigate = useNavigate();


    useEffect(() => {
        getContracts().then((result) => {
            if (result.success && result.data) {
                setContracts(result.data);
            }
        });
    }, []);

    const handleEdit = (id: string) => {
        navigate(`/contracts/edit/${id}`);
    };

    const handleDelete = (id: string) => {
        deleteContract(id)
    }

    const handleCreate = () => {
        navigate('/contracts/create');
    };


    return (
        <div className='display-contracts-container'>
            <button className=" " onClick={() => navigate('/')}>
                HOME
            </button>

            <button className="create-button" onClick={handleCreate}>
                Create Contract
            </button>

            <div className="data-row header-row">
                <p>Actions</p>
                <p>Begin Date</p>
                <p>End Date</p>
                <p>Type</p>
                <p>Certification ID</p>
            </div>

            {contracts.map((contract: Contract) => (
                <div key={contract.id} className="data-row">
                    <div className="actions">
                        <button className="edit-button" onClick={() => handleEdit((contract.id ?? 0).toString())}>Edit
                        </button>
                        <button className="delete-button" onClick={() => {
                            handleDelete((contract.id ?? 0).toString())
                        }}>Delete
                        </button>
                    </div>
                    <p>{contract.begin_date}</p>
                    <p>{contract.end_date}</p>
                    <p>{contract.type}</p>
                    <p>{contract.certification_id}</p>
                </div>
            ))

            }
        </div>
    );
};

export default DisplayContracts;

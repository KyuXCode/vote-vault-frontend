import {FC, useEffect, useState} from 'react';
import './displayInventoriesStyles.scss'
import {InventoryUnit} from "../../../Types/InventoryUnit.ts";
import {useNavigate} from "react-router-dom";
import {deleteInventoryUnit, getInventoryUnits} from "../../../utilities/api/InventoryUnitApi.ts";

const DisplayInventories: FC = () => {
    const [inventories, setInventories] = useState<InventoryUnit[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        getInventoryUnits().then((result) => {
            if(result.success && result.data) {
                setInventories(result.data)
            }
        })
    }, []);

    const handleEdit = (id: string) => {
        navigate(`/inventory_units/edit/${id}`);
    };

    const handleDelete = (id: string) => {
        deleteInventoryUnit(id)
    }

    const handleCreate = () => {
        navigate('/inventory_units/create');
    };

    return (
        <div className='display-inventories-container'>
            <button className=" " onClick={() => navigate('/')}>
                HOME
            </button>

            <button className="create-button" onClick={handleCreate}>
                Create Inventory Unit
            </button>

            <div className="data-row header-row">
                <p>Actions</p>
                <p>Serial Number</p>
                <p>Acquisition Date</p>
                <p>Condition</p>
                <p>Usage</p>
                <p>Expense ID</p>
                <p>Component ID</p>
            </div>

            {inventories.map((inventory: InventoryUnit) => (
                <div key={inventory.id} className="data-row">
                    <div className="actions">
                        <button className="edit-button"
                                onClick={() => handleEdit((inventory.id ?? 0).toString())}>Edit
                        </button>
                        <button className="delete-button" onClick={() => {
                            handleDelete((inventory.id ?? 0).toString())
                        }}>Delete
                        </button>
                    </div>
                    <p>{inventory.serial_number}</p>
                    <p>{inventory.acquisition_date}</p>
                    <p>{inventory.condition}</p>
                    <p>{inventory.component_id}</p>
                    <p>{inventory.expense_id}</p>
                </div>
            ))}
        </div>
    );
};

export default DisplayInventories;
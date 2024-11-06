import {FC, useEffect, useState} from 'react';
import './inventoryFormStyles.scss'
import {Condition, InventoryUnit, Usage} from "../../../Types/InventoryUnit.ts";
import {useNavigate, useParams} from "react-router-dom";
import {
    createInventoryUnit,
    getInventoryUnitById,
    updateInventoryUnit
} from "../../../utilities/api/InventoryUnitApi.ts";

const InventoryForm: FC = () => {
    const [formData, setFormData] = useState<InventoryUnit>({
        acquisition_date: "",
        component_id: 0,
        condition: Condition.New,
        expense_id: 0,
        serial_number: "",
        usage: Usage.Active
    });

    const {id} = useParams<{ id?: string }>();
    const navigate = useNavigate();
    const isEditMode = Boolean(id);

    useEffect(() => {
        if (isEditMode && id) {
            const fetchInventories = async () => {
                const result = await getInventoryUnitById(id);
                if (result.success && result.data) {
                    setFormData(result.data);
                }
            };
            fetchInventories();
        }
    }, [isEditMode, id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        console.log(formData)
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isEditMode && id) {
            await updateInventoryUnit(id, formData);
        } else {
            await createInventoryUnit(formData);
        }
        navigate('/inventory_units');
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div>
            <button onClick={handleGoBack} className="go-back-button">Go back</button>
            <form onSubmit={handleSubmit} className='inventory-form-container'>
                <label>
                    Serial Number:
                    <input
                        type="text"
                        name="serial_number"
                        value={formData.serial_number}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label>
                    Acquisition Date:
                    <input
                        type="date"
                        name="acquisition_date"
                        value={formData.acquisition_date}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label>
                    Condition:
                    <select
                        name="condition"
                        value={formData.condition}
                        onChange={handleChange}
                        required
                    >
                        {Object.values(Condition).map((condition) => (
                            <option key={condition} value={condition}>
                                {condition}
                            </option>
                        ))}
                    </select>
                </label>

                <label>
                    Usage:
                    <select
                        name="usage"
                        value={formData.usage}
                        onChange={handleChange}
                        required
                    >
                        {Object.values(Usage).map((usage) => (
                            <option key={usage} value={usage}>
                                {usage}
                            </option>
                        ))}
                    </select>
                </label>

                <label>
                    Component ID:
                    <input
                        type="number"
                        name="component_id"
                        value={formData.component_id}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label>
                    Expense ID:
                    <input
                        type="number"
                        name="expense_id"
                        value={formData.expense_id}
                        onChange={handleChange}
                        required
                    />
                </label>

                <button type="submit">{isEditMode ? 'Update' : 'Create'} Inventory</button>
            </form>
        </div>
    );
};

export default InventoryForm;
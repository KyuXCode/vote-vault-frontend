import { FC, useEffect, useState } from 'react';
import './inventoryFormStyles.scss';
import '../../formStyle.scss';
import { Condition, InventoryUnit, Usage } from "../../../Types/InventoryUnit.ts";
import { useNavigate, useParams } from "react-router-dom";
import {
    createInventoryUnit,
    getInventoryUnitById,
    updateInventoryUnit
} from "../../../utilities/api/InventoryUnitApi.ts";
import { Expense } from "../../../Types/Expense.ts";
import { Component } from "../../../Types/Component.ts";
import { getComponents } from "../../../utilities/api/componentApi.ts";
import { getExpenses } from "../../../utilities/api/expenseApi.ts";

const InventoryForm: FC = () => {
    const [components, setComponents] = useState<Component[]>([]);
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [formCount, setFormCount] = useState<InventoryUnit[]>([{
        acquisition_date: "",
        component_id: 0,
        condition: Condition.New,
        expense_id: 0,
        serial_number: "",
        usage: Usage.Active
    }]);

    const { id } = useParams<{ id?: string }>();
    const navigate = useNavigate();
    const isEditMode = Boolean(id);

    const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormCount((prevData) => {
            const newData = [...prevData];
            newData[index] = {
                ...newData[index],
                [name]: value,
            };
            return newData;
        });
    };

    const handleSubmit = async (index: number, e: React.FormEvent) => {
        e.preventDefault();
        const formData = formCount[index];
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

    const handleDelete = (index: number) => {
        setFormCount((prev) => prev.filter((_, i) => i !== index));
    };

    const handleFormAdd = () => {
        setFormCount((prev) => [
            ...prev,
            {
                acquisition_date: "",
                component_id: 0,
                condition: Condition.New,
                expense_id: 0,
                serial_number: "",
                usage: Usage.Active
            }
        ]);
    };

    const formAdd = (index: number) => {
        const formData = formCount[index];
        return (
            <div key={index}>
                <button onClick={() => handleDelete(index)}>Delete</button>
                <form onSubmit={(e) => handleSubmit(index, e)} className='form-container'>
                    <label>
                        Serial Number:
                        <input
                            type="text"
                            name="serial_number"
                            value={formData.serial_number}
                            onChange={(e) => handleChange(index, e)}
                            required
                        />
                    </label>

                    <label>
                        Acquisition Date:
                        <input
                            type="date"
                            name="acquisition_date"
                            value={formData.acquisition_date}
                            onChange={(e) => handleChange(index, e)}
                            required
                        />
                    </label>

                    <label>
                        Condition:
                        <select
                            name="condition"
                            value={formData.condition}
                            onChange={(e) => handleChange(index, e)}
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
                            onChange={(e) => handleChange(index, e)}
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
                        Expense ID:
                        <input
                            type="number"
                            name="expense_id"
                            value={formData.expense_id}
                            onChange={(e) => handleChange(index, e)}
                            required
                        />
                    </label>

                    <label>
                        Component:
                        <select
                            name="component_id"
                            value={formData.component_id}
                            onChange={(e) => handleChange(index, e)}
                            required
                        >
                            <option value="">Select a Component</option>
                            {components.map((component) => (
                                <option key={component.id} value={component.id}>
                                    {component.name}
                                </option>
                            ))}
                        </select>
                    </label>

                    <label>
                        Expense:
                        <select
                            name="expense_id"
                            value={formData.expense_id}
                            onChange={(e) => handleChange(index, e)}
                            required
                        >
                            <option value="">Select a Expense</option>
                            {expenses.map((expense) => (
                                <option key={expense.id} value={expense.id}>
                                    {expense.name}
                                </option>
                            ))}
                        </select>
                    </label>

                    <button type="submit">{isEditMode ? 'Update' : 'Create'} Inventory</button>
                </form>
            </div>
        );
    };

    useEffect(() => {
        if (isEditMode && id) {
            const fetchInventories = async () => {
                const result = await getInventoryUnitById(id);
                if (result.success && result.data) {
                    setFormCount([result.data]);
                }
            };
            fetchInventories();
        }

        getComponents().then((result) => {
            if (result.success && result.data) {
                setComponents(result.data);
            }
        });

        getExpenses().then((result) => {
            if (result.success && result.data) {
                setExpenses(result.data);
            }
        });
    }, [isEditMode, id]);

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start'
        }}>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%'
            }}>
                <button onClick={handleGoBack} className="go-back-button">Go back</button>
                <button onClick={handleFormAdd}>Add Form</button>
            </div>
            {formCount.map((_, index) => (
                <div key={index}>{formAdd(index)}</div>
            ))}
        </div>
    );
};

export default InventoryForm;
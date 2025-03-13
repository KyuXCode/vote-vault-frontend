import { FC, useEffect, useState } from 'react';
import { Button, TextField, Select, MenuItem, InputLabel, FormControl, Container, Box, SelectChangeEvent } from '@mui/material';
import './inventoryFormStyles.scss';
import '../../formStyle.scss';
import { Condition, InventoryUnit, Usage } from "../../../Types/InventoryUnit.ts";
import { useNavigate, useParams } from "react-router-dom";
import {
    batchCreateInventoryUnits,
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
    const [batchFormData, setBatchFormData] = useState<InventoryUnit[]>([{
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
    
    const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | SelectChangeEvent<string> | SelectChangeEvent<number>) => {
            const { name, value } = e.target;
            setBatchFormData((prevData) => {
                const newData = [...prevData];
                newData[index] = {
                    ...newData[index],
                    [name]: value,
                };
                return newData;
            });
        };

    const handleSubmit = async (index:number) => {
        if (isEditMode && id) {
            await updateInventoryUnit(id, batchFormData[0]);
        } else {
            await createInventoryUnit(batchFormData[index]);
        }
        navigate('/inventory_units');
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    const handleDelete = (index: number) => {
        setBatchFormData((prev) => prev.filter((_, i) => i !== index));
    };

    const handleFormAdd = () => {
        setBatchFormData((prev) => [
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

    const handleBatchUpload = async () => {
        await batchCreateInventoryUnits({ inventory_units: batchFormData });
        setBatchFormData([{
            acquisition_date: "",
            component_id: 0,
            condition: Condition.New,
            expense_id: 0,
            serial_number: "",
            usage: Usage.Active
        }]);
    };

    const formAdd = (index: number) => {
        const formData = batchFormData[index];
        return (
            <Box key={index} sx={{ margin: 1 }}>
                <Button variant="contained" style={{color: "white", backgroundColor:"#bb1111"}} onClick={() => handleDelete(index)}>Delete</Button>
                <form onSubmit={() => handleSubmit(index)} className='form-container'>
                    <TextField
                        label="Serial Number"
                        type="text"
                        name="serial_number"
                        value={formData.serial_number}
                        onChange={(e) => handleChange(index, e)}
                        required
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Acquisition Date"
                        type="date"
                        name="acquisition_date"
                        value={formData.acquisition_date}
                        onChange={(e) => handleChange(index, e)}
                        required
                        fullWidth
                        margin="normal"
                        InputLabelProps={{ shrink: true }}
                    />
                    <FormControl fullWidth margin="normal">
                        <InputLabel sx={{ fontSize: '16', transform: 'translateY(-23px)' }}>Condition</InputLabel>
                        <Select
                            name="condition"
                            value={formData.condition}
                            sx={{ backgroundColor: "white" }}
                            onChange={(e) => handleChange(index, e)}
                            required
                        >
                            {Object.values(Condition).map((condition) => (
                                <MenuItem key={condition} value={condition}>
                                    {condition}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <InputLabel sx={{ fontSize: '16', transform: 'translateY(-23px)' }}>Usage</InputLabel>
                        <Select
                            name="usage"
                            value={formData.usage}
                            sx={{ backgroundColor: "white" }}
                            onChange={(e) => handleChange(index, e)}
                            required
                        >
                            {Object.values(Usage).map((usage) => (
                                <MenuItem key={usage} value={usage}>
                                    {usage}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        label="Expense ID"
                        type="number"
                        name="expense_id"
                        value={formData.expense_id}
                        onChange={(e) => handleChange(index, e)}
                        required
                        fullWidth
                        margin="normal"
                    />
                    <FormControl fullWidth margin="normal">
                        <InputLabel sx={{ fontSize: '16', transform: 'translateY(-23px)' }}>Component</InputLabel>
                        <Select
                            name="component_id"
                            value={formData.component_id}
                            sx={{ backgroundColor: "white" }}
                            onChange={(e) => handleChange(index, e)}
                            required
                        >
                            <MenuItem value="">Select a Component</MenuItem>
                            {components.map((component) => (
                                <MenuItem key={component.id} value={component.id}>
                                    {component.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <InputLabel sx={{ fontSize: '16', transform: 'translateY(-23px)' }}>Expense</InputLabel>
                        <Select
                            name="expense_id"
                            value={formData.expense_id}
                            sx={{ backgroundColor: "white" }}
                            onChange={(e) => handleChange(index, e)}
                            required
                        >
                            <MenuItem value="">Select an Expense</MenuItem>
                            {expenses.map((expense) => (
                                <MenuItem key={expense.id} value={expense.id}>
                                    {expense.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button type="submit" variant="contained" style = {{color: "white", backgroundColor:"#221a1a"}}>
                        {isEditMode ? 'Update' : 'Create'} Inventory
                    </Button>
                </form>
            </Box>
        );
    };

    useEffect(() => {
        if (isEditMode && id) {
            const fetchInventories = async () => {
                const result = await getInventoryUnitById(id);
                if (result.success && result.data) {
                    setBatchFormData([result.data]);
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
        <Container>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 2 }}>
                <Button variant="contained" style = {{color: "white", backgroundColor:"#221a1a"}} onClick={handleGoBack} className="go-back-button">Go back</Button>
                <Button variant="contained" style = {{color: "white", backgroundColor:"#221a1a"}} onClick={handleFormAdd}>Add Form</Button> 
                <Button variant="contained" style = {{color: "white", backgroundColor:"#221a1a"}} onClick={handleBatchUpload}>Batch Create Form</Button>
            </Box>
            {batchFormData.map((_, index) => (
                <Box key={index}>{formAdd(index)}</Box>
            ))}
        </Container>
    );
};

export default InventoryForm;
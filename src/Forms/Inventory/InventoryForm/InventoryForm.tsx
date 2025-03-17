import { FC, useEffect, useState } from 'react';
import { Button, TextField, Select, MenuItem, InputLabel, FormControl, Container, Box, Grid, SelectChangeEvent } from '@mui/material';
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
    
    const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<number> | SelectChangeEvent<Usage> | SelectChangeEvent<Condition>) => {
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

    const handleSubmit = async (index: number, e: React.FormEvent) => {
        e.preventDefault();
        const formData = batchFormData[index];
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
            <Box key={index} sx={{ margin: 1, marginTop: -20 }}>
                <Button variant="contained" style={{ color: "white", backgroundColor: "#bb1111", marginLeft: 400, width:200, height: 80, marginTop: 120 }} onClick={() => handleDelete(index)}>Delete New Form</Button>
                <form onSubmit={(e) => handleSubmit(index, e)} className='form-container'>
                    <Grid container spacing={6}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Serial Number"
                                type="text"
                                name="serial_number"
                                value={formData.serial_number}
                                onChange={(e) => handleChange(index, e)}
                                required
                                fullWidth
                                margin="normal"
                                sx={{ backgroundColor: "lightgray", boxShadow:  "0 4px 2px -2px gray" }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
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
                                sx={{ backgroundColor: "lightgray", boxShadow:  "0 4px 2px -2px gray" }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth margin="normal" sx={{ backgroundColor: "lightgray",boxShadow:  "0 4px 2px -2px gray" }}>
                                <InputLabel sx={{ fontSize: '1rem', transform: 'translateY(-25px)', color: "black" }}>Condition</InputLabel>
                                <Select
                                    name="condition"
                                    value={formData.condition}
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
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth margin="normal" sx={{ backgroundColor: "lightgray", boxShadow:  "0 4px 2px -2px gray" }}>
                                <InputLabel sx={{ fontSize: '1.25rem', transform: 'translateY(-25px)', color: "black" }}>Usage</InputLabel>
                                <Select
                                    name="usage"
                                    value={formData.usage}
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
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Expense ID"
                                type="number"
                                name="expense_id"
                                value={formData.expense_id}
                                onChange={(e) => handleChange(index, e)}
                                required
                                fullWidth
                                margin="normal"
                                sx={{ backgroundColor: "lightgray", boxShadow:  "0 4px 2px -2px gray" }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth margin="normal" sx={{ backgroundColor: "lightgray", boxShadow:  "0 4px 2px -2px gray" }}>
                                <InputLabel sx={{ fontSize: '1.25rem', transform: 'translateY(-25px)', color: "black" }}>Component</InputLabel>
                                <Select
                                    name="component_id"
                                    value={formData.component_id}
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
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth margin="normal" sx={{ backgroundColor: "lightgray", boxShadow:  "0 4px 2px -2px gray" }}>
                                <InputLabel sx={{ fontSize: '1.25rem', transform: 'translateY(-25px)', color: "black" }}>Expense</InputLabel>
                                <Select
                                    name="expense_id"
                                    value={formData.expense_id}
                                    
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
                        </Grid>
                    </Grid>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
                        <Button type="submit" variant="contained" style={{ color: "black", backgroundColor: "#FFD700", fontSize: '1rem', padding: '10px 20px', width: '200px', height: '80px', marginRight: 260, marginTop: 400 }}>
                            Submit
                        </Button>
                    </Box>
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
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 10, marginTop: 10 }}>
                <Button variant="contained" style={{ color: "white", backgroundColor: "darkblue", fontSize: 15,marginTop:100, marginBottom: -100, marginLeft: 400 }} onClick={handleGoBack} className="go-back-button">Go Back</Button>
                <Button variant="contained" style={{ color: "white", backgroundColor: "#221a1a", marginLeft: 100,marginRight: 277, width: 200, height: 80 }} onClick={handleBatchUpload}>Add New Form</Button>
            </Box>
            {batchFormData.map((_, index) => (
                <Box key={index}>{formAdd(index)}</Box>
            ))}
        </Container>
    );
};

export default InventoryForm;
import { FC, useEffect, useState } from 'react';
import { 
  Button, 
  TextField, 
  Select, 
  MenuItem, 
  InputLabel, 
  FormControl, 
  Container, 
  Box, 
  Grid, 
  SelectChangeEvent,
  Typography,
  Paper
} from '@mui/material';
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
import { Plus, Trash2, ArrowLeft, Save } from 'lucide-react';

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
            <Paper elevation={15} className="form-container" sx={{ mb: 4, mt: 2, height: 275 }}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2,width: '50%' }}>
                    <Button 
                        variant="contained" 
                        startIcon={<Trash2 />}
                        onClick={() => handleDelete(index)}
                        className="delete-button"
                        sx={{ height:215,
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                transform: 'translateY(-2px)'
                            }
                        }}
                    >
                        Delete Form
                    </Button>
                </Box>
                
                <form onSubmit={(e) => handleSubmit(index, e)}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Serial Number"
                                type="text"
                                name="serial_number"
                                value={formData.serial_number}
                                onChange={(e) => handleChange(index, e)}
                                required
                                fullWidth
                                className="form-field"
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
                                InputLabelProps={{ shrink: true }}
                                className="form-field"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth className="form-field">
                                <InputLabel>Condition</InputLabel>
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
                            <FormControl fullWidth className="form-field">
                                <InputLabel>Usage</InputLabel>
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
                            <FormControl fullWidth className="form-field">
                                <InputLabel>Component</InputLabel>
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
                            <FormControl fullWidth className="form-field">
                                <InputLabel>Expense</InputLabel>
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
                    
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
                        <Button 
                            type="submit" 
                            variant="contained" 
                            startIcon={<Save />}
                            className="submit-button"
                            sx={{ 
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    transform: 'translateY(-2px)'
                                }
                            }}
                        >
                            {isEditMode ? 'Update' : 'Submit'}
                        </Button>
                    </Box>
                </form>
            </Paper>
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
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Box className="banner" />
            <Box className="sidebar" />
            
            <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                mb: 4,
                position: 'relative',
                zIndex: 2
            }}>
                <Button 
                    variant="contained" 
                    startIcon={<ArrowLeft />}
                    onClick={handleGoBack}
                    className="back-button"
                >
                    Go Back
                </Button>
                <Button
                    onClick={handleFormAdd}
                    startIcon={<Plus />}
                    variant="contained"
                    className="back-button"
                >
                    Add New Unit
                </Button>
            </Box>

            {batchFormData.map((_, index) => (
                <Box key={index}>{formAdd(index)}</Box>
            ))}

            {batchFormData.length > 1 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
                    <Button
                        onClick={handleBatchUpload}
                        variant="contained"
                        startIcon={<Save />}
                        className="submit-button"
                    >
                        Submit All Units
                    </Button>
                </Box>
            )}
        </Container>
    );
};

export default InventoryForm;
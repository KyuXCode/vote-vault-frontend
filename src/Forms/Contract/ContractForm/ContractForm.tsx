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
  Paper
} from '@mui/material';
import './contractFormStyles.scss';
import '../../formStyle.scss';
import { Contract, ContractType } from "../../../Types/Contract.ts";
import { Certification } from "../../../Types/Certification.ts";
import { useNavigate, useParams } from "react-router-dom";
import { 
  createContract, 
  updateContract, 
  getContractById 
} from "../../../utilities/api/contractApi.ts";
import { getCertifications } from "../../../utilities/api/certificationApi.ts";
import { Plus, Trash2, ArrowLeft, Save } from 'lucide-react';

const ContractForm: FC = () => {
    const [certifications, setCertifications] = useState<Certification[]>([]);
    const [batchFormData, setBatchFormData] = useState<Contract[]>([{
        begin_date: '',
        end_date: '',
        type: ContractType.Purchase,
        certification_id: 0,
    }]);

    const { id } = useParams<{ id?: string }>();
    const navigate = useNavigate();
    const isEditMode = Boolean(id);

    const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | SelectChangeEvent<number> | SelectChangeEvent<ContractType>) => {
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
            await updateContract(id, formData);
        } else {
            await createContract(formData);
        }
        navigate('/contracts');
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
                begin_date: '',
                end_date: '',
                type: ContractType.Purchase,
                certification_id: 0,
            }
        ]);
    };

    const formAdd = (index: number) => {
        const formData = batchFormData[index];
        return (
            <Paper elevation={15} className="form-container" sx={{ mb: 4, mt: 2, height: 275 }}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2, width: '50%' }}>
                    <Button 
                        variant="contained" 
                        startIcon={<Trash2 />}
                        onClick={() => handleDelete(index)}
                        className="delete-button"
                        sx={{ 
                            height: 215,
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
                            <TextField sx={{ boxShadow: "0 4px 2px -2px gray" }}
                                label="Begin Date"
                                type="date"
                                name="begin_date"
                                value={formData.begin_date}
                                onChange={(e) => handleChange(index, e)}
                                required
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                                className="form-field"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField sx={{ boxShadow: "0 4px 2px -2px gray" }}
                                label="End Date"
                                type="date"
                                name="end_date"
                                value={formData.end_date}
                                onChange={(e) => handleChange(index, e)}
                                required
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                                className="form-field"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth className="form-field">
                                <InputLabel sx={{ marginTop: -1 }}>Type</InputLabel>
                                <Select sx={{ boxShadow: "0 4px 2px -2px gray" }}
                                    name="type"
                                    value={formData.type}
                                    onChange={(e) => handleChange(index, e)}
                                    required
                                >
                                    {Object.values(ContractType).map((contractType) => (
                                        <MenuItem key={contractType} value={contractType}>
                                            {contractType}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth className="form-field">
                                <InputLabel sx={{ marginTop: -1 }}>Certification</InputLabel>
                                <Select sx={{ boxShadow: "0 4px 2px -2px gray" }}
                                    name="certification_id"
                                    value={formData.certification_id}
                                    onChange={(e) => handleChange(index, e)}
                                    required
                                >
                                    <MenuItem value="">Select a Certification</MenuItem>
                                    {certifications.map((certification) => (
                                        <MenuItem key={certification.id} value={certification.id}>
                                            {certification.model_number}
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
            const fetchContract = async () => {
                const result = await getContractById(id);
                if (result.success && result.data) {
                    setBatchFormData([result.data]);
                }
            };
            fetchContract();
        }

        getCertifications().then((result) => {
            if (result.success && result.data) {
                setCertifications(result.data);
            }
        });
    }, [isEditMode, id]);

    async function handleBatchUpload(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): Promise<void> {
        event.preventDefault();
        try {
            for (const formData of batchFormData) {
                if (isEditMode && id) {
                    await updateContract(id, formData);
                } else {
                    await createContract(formData);
                }
            }
            navigate('/contracts');
        } catch (error) {
            console.error('Error submitting batch contracts:', error);
        }
    }

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
                    Add New Contract
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
                        Submit All Contracts
                    </Button>
                </Box>
            )}
        </Container>
    );
};

export default ContractForm;
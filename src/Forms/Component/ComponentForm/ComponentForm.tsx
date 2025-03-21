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
import './componentFormStyles.scss';
import '../../formStyle.scss';
import { ComponentType, Component } from "../../../Types/Component.ts";
import { Certification } from "../../../Types/Certification.ts";
import { useNavigate, useParams } from "react-router-dom";
import { 
  createComponent, 
  updateComponent, 
  getComponentById, 
  batchCreateComponents 
} from "../../../utilities/api/componentApi.ts";
import { getCertifications } from "../../../utilities/api/certificationApi.ts";
import { Plus, Trash2, ArrowLeft, Save } from 'lucide-react';

const ComponentForm: FC = () => {
    const [certifications, setCertifications] = useState<Certification[]>([]);
    const [batchFormData, setBatchFormData] = useState<Component[]>([{
        name: '',
        description: '',
        type: ComponentType.DRE,
        certification_id: 0,
    }]);

    const { id } = useParams<{ id?: string }>();
    const navigate = useNavigate();
    const isEditMode = Boolean(id);

    const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<number> | SelectChangeEvent<ComponentType>) => {
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
            await updateComponent(id, formData);
        } else {
            await createComponent(formData);
        }
        navigate('/components');
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
                name: '',
                description: '',
                type: ComponentType.DRE,
                certification_id: 0,
            }
        ]);
    };

    const handleBatchUpload = async () => {
        await batchCreateComponents({ components: batchFormData });
        setBatchFormData([{
            name: '',
            description: '',
            type: ComponentType.DRE,
            certification_id: 0,
        }]);
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
                                label="Name"
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={(e) => handleChange(index, e)}
                                required
                                fullWidth
                                className="form-field"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField sx={{ boxShadow: "0 4px 2px -2px gray" }}
                                label="Description"
                                type="text"
                                name="description"
                                value={formData.description}
                                onChange={(e) => handleChange(index, e)}
                                required
                                fullWidth
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
                                    {Object.values(ComponentType).map((compType) => (
                                        <MenuItem key={compType} value={compType}>
                                            {compType}
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
            const fetchComponent = async () => {
                const result = await getComponentById(id);
                if (result.success && result.data) {
                    setBatchFormData([result.data]);
                }
            };
            fetchComponent();
        }

        getCertifications().then((result) => {
            if (result.success && result.data) {
                setCertifications(result.data);
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
                    Add New Component
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
                        Submit All Components
                    </Button>
                </Box>
            )}
        </Container>
    );
};

export default ComponentForm;
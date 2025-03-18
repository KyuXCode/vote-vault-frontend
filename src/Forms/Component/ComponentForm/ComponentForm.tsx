import { FC, useEffect, useState } from 'react';
import { Button, TextField, Select, MenuItem, InputLabel, FormControl, Container, Box, Grid, SelectChangeEvent } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { ComponentType, Component } from "../../../Types/Component.ts";
import { createComponent, updateComponent, getComponentById, batchCreateComponents } from "../../../utilities/api/componentApi.ts";
import './componentFormStyles.scss';
import '../../formStyle.scss';
import { getCertifications } from "../../../utilities/api/certificationApi.ts";
import { Certification } from "../../../Types/Certification.ts";

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

    const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | SelectChangeEvent<number> | SelectChangeEvent<ComponentType>) => {
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
            <Box key={index} sx={{ margin: 1, marginTop: -20 }}>
                <Button variant="contained" style={{ color: "white", backgroundColor: "#bb1111", marginLeft: 1045, width: 200, height: 80, marginTop: 200 }} onClick={() => handleDelete(index)}>Delete New Form</Button>
                <form onSubmit={(e) => handleSubmit(index, e)} className='form-container'>
                    <Grid container spacing={6}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Name"
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={(e) => handleChange(index, e)}
                                required
                                fullWidth
                                margin="normal"
                                sx={{ backgroundColor: "lightgray", boxShadow: "0 4px 2px -2px gray", width: 300, marginLeft: 30 }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Description"
                                type="text"
                                name="description"
                                value={formData.description}
                                onChange={(e) => handleChange(index, e)}
                                required
                                fullWidth
                                margin="normal"
                                sx={{ backgroundColor: "lightgray", boxShadow: "0 4px 2px -2px gray", width: 300, marginLeft: -30 }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth margin="normal" sx={{ backgroundColor: "lightgray", boxShadow: "0 4px 2px -2px gray", width: 300, marginLeft: 30 }}>
                                <InputLabel sx={{ fontSize: '1rem', transform: 'translateY(-25px)', color: "black" }}>Type</InputLabel>
                                <Select
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
                            <FormControl fullWidth margin="normal" sx={{ backgroundColor: "lightgray", boxShadow: "0 4px 2px -2px gray", width: 300, marginLeft: -30 }}>
                                <InputLabel sx={{ fontSize: '1rem', transform: 'translateY(-25px)', color: "black" }}>Certification</InputLabel>
                                <Select
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
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
                        <Button type="submit" variant="contained" style={{ color: "black", backgroundColor: "#FFD700", fontSize: '1rem', padding: '10px 20px', width: '200px', height: '80px', marginRight: 260, marginTop: 200 }}>
                            Submit
                        </Button>
                    </Box>
                </form>
            </Box>
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
        <Container>
            {/* Dark blue banner */}
            <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '125px', backgroundColor: '#080c5c', zIndex: 1 }} />
            <Box sx={{ position: 'absolute', top: 0, left: 0, width: '200px', height: '100%', backgroundColor: 'darkgrey', zIndex: 0 }} />
            
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 10, marginTop: 10 }}>
                <Button variant="contained" style={{ color: "white", backgroundColor: "darkblue", fontSize: 15, marginTop: 100, marginBottom: -100, marginLeft: 290 }} onClick={handleGoBack} className="go-back-button">Go Back</Button>
            </Box>
            {batchFormData.map((_, index) => (
                <Box key={index}>{formAdd(index)}</Box>
            ))}
        </Container>
    );
};

export default ComponentForm;
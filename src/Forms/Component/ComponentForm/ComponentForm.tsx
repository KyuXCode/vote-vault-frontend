import { FC, useEffect, useState } from 'react';
import { Button, TextField, Select, MenuItem, InputLabel, FormControl, Container, Box, Grid, SelectChangeEvent, Typography } from '@mui/material';
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
            <Box key={index} sx={{ margin: 2, marginTop:-20 }}>
                <Button variant="contained" style={{ color: "white", backgroundColor: "#bb1111", marginLeft: 400, width:200, height: 80, marginTop: 120 }} onClick={() => handleDelete(index)}>Delete New Form</Button>
                <form onSubmit={(e) => handleSubmit(index, e)} className='form-container'>
                    <Grid container spacing={10}>
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
                                sx={{ backgroundColor: "lightgray" }}
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
                                sx={{ backgroundColor: "lightgray" }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth margin="normal" sx={{ backgroundColor: "lightgray" }}>
                                <InputLabel sx={{ fontSize: '1.25rem', transform: 'translateY(-25px)', color: "black" }}>Type</InputLabel>
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
                            <FormControl fullWidth margin="normal" sx={{ backgroundColor: "lightgray" }}>
                                <InputLabel sx={{ fontSize: '1.25rem', transform: 'translateY(-25px)', color: "black" }}>Certification</InputLabel>
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
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 10, marginTop: 10 }}>
            <Button variant="contained" style={{ color: "white", backgroundColor: "darkblue", fontSize: 15, marginBottom: 20, marginLeft: 10 }} onClick={handleGoBack} className="go-back-button">Go Back</Button>
            <Button variant="contained" style={{ color: "white", backgroundColor: "#221a1a", marginLeft: 100,marginRight: 277, width: 200, height: 80 }} onClick={handleBatchUpload}>Add New Form</Button>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70vh' }}>
                {batchFormData.map((_, index) => (
                    <Box key={index}>{formAdd(index)}</Box>
                ))}
            </Box>
        </Container>
    );
};

export default ComponentForm;
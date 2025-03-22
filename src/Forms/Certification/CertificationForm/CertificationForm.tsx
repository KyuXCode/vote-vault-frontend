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
import './certificationFormStyles.scss';
import '../../formStyle.scss';
import { Certification, CertificationAction, CertificationType, SystemBase, SystemType } from "../../../Types/Certification.ts";
import { Vendor } from "../../../Types/Vendor.ts";
import { useNavigate, useParams } from "react-router-dom";
import { 
  createCertification, 
  updateCertification, 
  getCertificationById 
} from "../../../utilities/api/certificationApi.ts";
import { getVendors } from "../../../utilities/api/vendorApi.ts";
import { Plus, Trash2, ArrowLeft, Save } from 'lucide-react';

const CertificationForm: FC = () => {
    const [vendors, setVendors] = useState<Vendor[]>([]);
    const [batchFormData, setBatchFormData] = useState<Certification[]>([{
        model_number: "",
        description: "",
        application_date: "",
        certification_date: "",
        expiration_date: "",
        federal_certification_number: "",
        federal_certification_date: "",
        type: CertificationType.Certification,
        action: CertificationAction.Pending,
        system_type: SystemType.VS,
        system_base: SystemBase.Other,
        vendor_id: 0
    }]);
    

    const { id } = useParams<{ id?: string }>();
    const navigate = useNavigate();
    const isEditMode = Boolean(id);

    const handleChange = (
        index: number,
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<number> | SelectChangeEvent<CertificationType> | SelectChangeEvent<CertificationAction> | SelectChangeEvent<SystemType> | SelectChangeEvent<SystemBase>
    ) => {
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
            await updateCertification(id, formData);
        } else {
            await createCertification(formData);
        }
        navigate('/certifications');
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
                model_number: "",
                description: "",
                application_date: "",
                certification_date: "",
                expiration_date: "",
                federal_certification_number: "",
                federal_certification_date: "",
                type: CertificationType.Certification,
                action: CertificationAction.Pending,
                system_type: SystemType.VS,
                system_base: SystemBase.Other,
                vendor_id: 0
            }
        ]);
    };

    const formAdd = (index: number) => {
        const formData = batchFormData[index];
        return (
            <Paper elevation={15} className="form-container" sx={{ mb: 4, mt: 2, height: 'auto' }}>
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
                                label="Model Number"
                                type="text"
                                name="model_number"
                                value={formData.model_number}
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
                                fullWidth
                                className="form-field"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField sx={{ boxShadow: "0 4px 2px -2px gray" }}
                                label="Application Date"
                                type="date"
                                name="application_date"
                                value={formData.application_date}
                                onChange={(e) => handleChange(index, e)}
                                required
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                                className="form-field"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField sx={{ boxShadow: "0 4px 2px -2px gray" }}
                                label="Certification Date"
                                type="date"
                                name="certification_date"
                                value={formData.certification_date}
                                onChange={(e) => handleChange(index, e)}
                                required
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                                className="form-field"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField sx={{ boxShadow: "0 4px 2px -2px gray" }}
                                label="Expiration Date"
                                type="date"
                                name="expiration_date"
                                value={formData.expiration_date}
                                onChange={(e) => handleChange(index, e)}
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                                className="form-field"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField sx={{ boxShadow: "0 4px 2px -2px gray" }}
                                label="Federal Certification Number"
                                type="text"
                                name="federal_certification_number"
                                value={formData.federal_certification_number || ''}
                                onChange={(e) => handleChange(index, e)}
                                fullWidth
                                className="form-field"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField sx={{ boxShadow: "0 4px 2px -2px gray" }}
                                label="Federal Certification Date"
                                type="date"
                                name="federal_certification_date"
                                value={formData.federal_certification_date}
                                onChange={(e) => handleChange(index, e)}
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
                                    {Object.values(CertificationType).map((type) => (
                                        <MenuItem key={type} value={type}>
                                            {type}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth className="form-field">
                                <InputLabel sx={{ marginTop: -1 }}>Action</InputLabel>
                                <Select sx={{ boxShadow: "0 4px 2px -2px gray" }}
                                    name="action"
                                    value={formData.action}
                                    onChange={(e) => handleChange(index, e)}
                                    required
                                >
                                    {Object.values(CertificationAction).map((action) => (
                                        <MenuItem key={action} value={action}>
                                            {action}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth className="form-field">
                                <InputLabel sx={{ marginTop: -1 }}>System Type</InputLabel>
                                <Select sx={{ boxShadow: "0 4px 2px -2px gray" }}
                                    name="system_type"
                                    value={formData.system_type}
                                    onChange={(e) => handleChange(index, e)}
                                    required
                                >
                                    {Object.values(SystemType).map((systemType) => (
                                        <MenuItem key={systemType} value={systemType}>
                                            {systemType}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth className="form-field">
                                <InputLabel sx={{ marginTop: -1 }}>System Base</InputLabel>
                                <Select sx={{ boxShadow: "0 4px 2px -2px gray" }}
                                    name="system_base"
                                    value={formData.system_base}
                                    onChange={(e) => handleChange(index, e)}
                                    required
                                >
                                    {Object.values(SystemBase).map((systemBase) => (
                                        <MenuItem key={systemBase} value={systemBase}>
                                            {systemBase}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth className="form-field">
                                <InputLabel sx={{ marginTop: -1 }}>Vendor</InputLabel>
                                <Select sx={{ boxShadow: "0 4px 2px -2px gray" }}
                                    name="vendor_id"
                                    value={formData.vendor_id}
                                    onChange={(e) => handleChange(index, e)}
                                    required
                                >
                                    <MenuItem value="">Select a Vendor</MenuItem>
                                    {vendors.map((vendor) => (
                                        <MenuItem key={vendor.id} value={vendor.id}>
                                            {vendor.name}
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
            const fetchCertification = async () => {
                const result = await getCertificationById(id);
                if (result.success && result.data) {
                    setBatchFormData([result.data]);
                }
            };
            fetchCertification();
        }

        getVendors().then((result) => {
            if (result.success && result.data) {
                setVendors(result.data);
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
                    Add New Certification
                </Button>
            </Box>

            {batchFormData.map((_, index) => (
                <Box key={index}>{formAdd(index)}</Box>
            ))}
        </Container>
    );
};

export default CertificationForm;
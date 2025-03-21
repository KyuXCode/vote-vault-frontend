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
    Paper,
    SelectChangeEvent
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { Vendor, Product } from '../../../Types/Vendor.ts';
import { createVendor, getVendorById, updateVendor } from '../../../utilities/api/vendorApi.ts';
import { ArrowLeft, Save, Trash2 } from 'lucide-react';
import './vendorFormStyles.scss';
import '../../formStyle.scss';

const VendorForm: FC = () => {
    const [formData, setFormData] = useState<Vendor>({
        name: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        contact_name: '',
        contact_email: '',
        contact_phone: '',
        product: Product.Other,
    });

    const { id } = useParams<{ id?: string }>();
    const navigate = useNavigate();
    const isEditMode = Boolean(id);

    useEffect(() => {
        if (isEditMode && id) {
            const fetchVendor = async () => {
                const result = await getVendorById(id);
                if (result.success && result.data) {
                    setFormData(result.data);
                }
            };
            fetchVendor();
        }
    }, [isEditMode, id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<Product>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isEditMode && id) {
            await updateVendor(id, formData);
        } else {
            await createVendor(formData);
        }
        navigate('/vendors');
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    const handleDelete = async (index: number) => {
        if (isEditMode && id) {
            const confirmDelete = window.confirm("Are you sure you want to delete this vendor?");
            if (confirmDelete) {
                await deleteVendor(id);
                navigate('/vendors');
            }
        } else {
            alert("Cannot delete a vendor that hasn't been created yet.");
        }
    };

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
            </Box>

            <Paper elevation={15} className="form-container" sx={{ mb: 4, mt: 2, height: 'auto' }}>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                sx={{ boxShadow: "0 4px 2px -2px gray" }}
                                label="Name"
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={(e) => handleChange(e as React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)}
                                required
                                fullWidth
                                className="form-field"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                sx={{ boxShadow: "0 4px 2px -2px gray" }}
                                label="Address"
                                type="text"
                                name="address"
                                value={formData.address || ''}
                                onChange={(e) => handleChange(e as SelectChangeEvent<Product>)}
                                fullWidth
                                className="form-field"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                sx={{ boxShadow: "0 4px 2px -2px gray" }}
                                label="City"
                                type="text"
                                name="city"
                                value={formData.city || ''}
                                onChange={handleChange}
                                fullWidth
                                className="form-field"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                sx={{ boxShadow: "0 4px 2px -2px gray" }}
                                label="State"
                                type="text"
                                name="state"
                                value={formData.state || ''}
                                onChange={handleChange}
                                fullWidth
                                className="form-field"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                sx={{ boxShadow: "0 4px 2px -2px gray" }}
                                label="Zip"
                                type="text"
                                name="zip"
                                value={formData.zip || ''}
                                onChange={handleChange}
                                fullWidth
                                className="form-field"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                sx={{ boxShadow: "0 4px 2px -2px gray" }}
                                label="Contact Name"
                                type="text"
                                name="contact_name"
                                value={formData.contact_name || ''}
                                onChange={handleChange}
                                fullWidth
                                className="form-field"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField sx={{ boxShadow: "0 4px 2px -2px gray" }}
                                label="Contact Email"
                                type="email"
                                name="contact_email"
                                value={formData.contact_email || ''}
                                onChange={handleChange}
                                fullWidth
                                className="form-field"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField sx={{ boxShadow: "0 4px 2px -2px gray" }}
                                label="Contact Phone"
                                type="tel"
                                name="contact_phone"
                                value={formData.contact_phone || ''}
                                onChange={handleChange}
                                fullWidth
                                className="form-field"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} >
                            <FormControl fullWidth className="form-field">
                                <InputLabel>Product</InputLabel>
                                <Select
                                    sx={{ boxShadow: "0 4px 2px -2px gray" }}
                                    name="product"
                                    value={formData.product}
                                    onChange={handleChange}
                                    required
                                >
                                    {Object.values(Product).map((productType) => (
                                        <MenuItem key={productType} value={productType}>
                                            {productType}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>

                    <Button 
                        variant="contained" 
                        startIcon={<Trash2 />}
                        onClick={() => handleDelete(0)}
                        className="delete-button"
                        sx={{ 
                            marginLeft: '160%',marginTop: -65,
                            height: 215,
                            width: 150,
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                transform: 'translateY(-2px)'
                            }
                        }}
                    >
                        Delete Form
                    </Button>

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
                            {isEditMode ? 'Update' : 'Create'} Vendor
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Container>
    );
};

async function deleteVendor(id: string): Promise<void> {
    try {
        const response = await fetch(`/api/vendors/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error(`Failed to delete vendor with ID ${id}: ${response.statusText}`);
        }

        console.log(`Vendor with ID ${id} deleted successfully.`);
    } catch (error) {
        console.error('Error deleting vendor:', error);
        alert('An error occurred while trying to delete the vendor. Please try again.');
    }
}

export default VendorForm;



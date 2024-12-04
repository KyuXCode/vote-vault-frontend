import {FC, useEffect, useState} from 'react';
import {County} from '../../../Types/County.ts';
import './countyFormStyles.scss';
import '../../formStyle.scss'
import {createCounty, getCountyById, updateCounty} from '../../../utilities/api/countyApi.ts';
import {useNavigate, useParams} from 'react-router-dom';

const CountyForm: FC = () => {
    const [formData, setFormData] = useState<County>({
        name: ''
    });

    const {id} = useParams<{ id?: string }>();
    const navigate = useNavigate();
    const isEditMode = Boolean(id);

    useEffect(() => {
        if (isEditMode && id) {
            const fetchCounty = async () => {
                const result = await getCountyById(id);
                if (result.success && result.data) {
                    setFormData(result.data);
                }
            };
            fetchCounty();
        }
    }, [isEditMode, id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isEditMode && id) {
            await updateCounty(id, formData);
        } else {
            await createCounty(formData);
        }
        navigate('/counties');
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div>
            <button onClick={handleGoBack} className="go-back-button">Go back</button>
            <form onSubmit={handleSubmit} className="form-container">
                <label>
                    County Name:
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </label>

                <button type="submit">{formData.id ? 'Update' : 'Create'} County</button>
            </form>
        </div>
    );
};

export default CountyForm;

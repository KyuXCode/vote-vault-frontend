import {FC, useEffect, useState} from 'react';
import './dispositionFormStyles.scss'
import '../../formStyle.scss'
import {Disposition} from "../../../Types/Disposition.ts";
import {useNavigate, useParams} from "react-router-dom";
import {createDisposition, getDispositionById, updateDisposition} from "../../../utilities/api/dispositionApi.ts";

const DispositionForm: FC = () => {
    const [formData, setFormData] = useState<Disposition>({
        date: "",
        method: "",
        entity: "",
        amount: 0,
        inventory_unit_id: 0,
    });

    const {id} = useParams<{ id?: string }>();
    const navigate = useNavigate();
    const isEditMode = Boolean(id);

    useEffect(() => {
        if (isEditMode && id) {
            const fetchDisposition = async () => {
                const result = await getDispositionById(id);
                if (result.success && result.data) {
                    setFormData(result.data);
                }
            };
            fetchDisposition();
        }
    }, [isEditMode, id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        console.log(formData)
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isEditMode && id) {
            await updateDisposition(id, formData);
        } else {
            await createDisposition(formData);
        }
        navigate('/dispositions');
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div>
            <button onClick={handleGoBack} className="go-back-button">Go back</button>
            <form onSubmit={handleSubmit} className='form-container'>
                <label>
                    Date:
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label>
                    Method:
                    <input
                        type="string"
                        name="method"
                        value={formData.method}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label>
                    Entity:
                    <input
                        type="string"
                        name="entity"
                        value={formData.entity}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label>
                    Amount:
                    <input
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label>
                    Inventory ID:
                    <input
                        type="number"
                        name="inventory_unit_id"
                        value={formData.inventory_unit_id}
                        onChange={handleChange}
                        required
                    />
                </label>

                <button type="submit">{isEditMode ? 'Update' : 'Create'} Disposition</button>
            </form>
        </div>
    );
};

export default DispositionForm;
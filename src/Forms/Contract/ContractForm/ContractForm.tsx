import {FC, useEffect, useState} from 'react';
import './contractFormStyles.scss';
import '../../formStyle.scss'
import {useNavigate, useParams} from 'react-router-dom';
import {Contract, ContractType} from "../../../Types/Contract.ts";
import {createContract, getContractById, updateContract} from "../../../utilities/api/contractApi.ts";
import {Certification} from "../../../Types/Certification.ts";
import {getCertifications} from "../../../utilities/api/certificationApi.ts";

const ContractForm: FC = () => {
    const [certifications, setCertifications] = useState<Certification[]>([])

    const [formData, setFormData] = useState<Contract>({
            begin_date: '',
            end_date: '',
            type: ContractType.Purchase,
            certification_id: 0
        }
    );

    const {id} = useParams<{ id?: string }>();
    const navigate = useNavigate();
    const isEditMode = Boolean(id);

    useEffect(() => {
        if (isEditMode && id) {
            const fetchContract = async () => {
                const result = await getContractById(id);
                if (result.success && result.data) {
                    setFormData(result.data);
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
            await updateContract(id, formData);
        } else {
            await createContract(formData);
        }
        navigate('/contracts');
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div>
            <button onClick={handleGoBack} className="go-back-button">Go back</button>
            <form onSubmit={handleSubmit} className="form-container">
                <label>
                    Begin Date:
                    <input
                        type="date"
                        name="begin_date"
                        value={formData.begin_date}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label>
                    End Date:
                    <input
                        type="date"
                        name="end_date"
                        value={formData.end_date}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label>
                    Type:
                    <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        required
                    >
                        {Object.values(ContractType).map((contractType) => (
                            <option key={contractType} value={contractType}>
                                {contractType}
                            </option>
                        ))}
                    </select>
                </label>

                <label>
                    Certification:
                    <select
                        name="certification_id"
                        value={formData.certification_id}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select a Certification</option>
                        {certifications.map((certification) => (
                            <option key={certification.id} value={certification.id}>
                                {certification.model_number}
                            </option>
                        ))}
                    </select>
                </label>

                <button type="submit">{formData.id ? 'Update' : 'Create'} Contract</button>
            </form>
        </div>
    );
};

export default ContractForm;

import {FC, useEffect, useState} from 'react';
import './expenseFormStyles.scss'
import {useNavigate, useParams} from "react-router-dom";
import {Expense} from "../../../Types/Expense.ts";
import {createExpense, getExpenseById, updateExpense} from "../../../utilities/api/expenseApi.ts";
import {County} from "../../../Types/County.ts";
import {getCounties} from "../../../utilities/api/countyApi.ts";
import {Contract} from "../../../Types/Contract.ts";
import {getContracts} from "../../../utilities/api/contractApi.ts";

const ExpenseForm: FC = () => {
    const [contracts, setContracts] = useState<Contract[]>([])
    const [counties, setCounties] = useState<County[]>([])

    const [formData, setFormData] = useState<Expense>({
            name: "",
            amount: 0,
            fund: "",
            owner: "",
            contract_id: 0,
            county_id: 0,
        }
    );

    const {id} = useParams<{ id?: string }>();
    const navigate = useNavigate();
    const isEditMode = Boolean(id);

    useEffect(() => {
        if (isEditMode && id) {
            const fetchExpense = async () => {
                const result = await getExpenseById(id);
                if (result.success && result.data) {
                    setFormData(result.data);
                }
            };
            fetchExpense();
        }

        getCounties().then((result) => {
            if (result.success && result.data) {
                setCounties(result.data);
            }
        });

        getContracts().then((result) => {
            if (result.success && result.data) {
                setContracts(result.data);
            }
        });
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
            await updateExpense(id, formData);
        } else {
            await createExpense(formData);
        }
        navigate('/expenses');
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div>
            <button onClick={handleGoBack} className="go-back-button">Go back</button>
            <form onSubmit={handleSubmit} className='expense-form-container'>
                <label>
                    Name
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label>
                    Amount
                    <input
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label>
                    Fund
                    <input
                        type="text"
                        name="fund"
                        value={formData.fund}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label>
                    Owner
                    <input
                        type="text"
                        name="owner"
                        value={formData.owner}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label>
                    Contract ID
                    <input
                        type="number"
                        name="contract_id"
                        value={formData.contract_id}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label>
                    County ID
                    <input
                        type="number"
                        name="county_id"
                        value={formData.county_id}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label>
                    Contracts:
                    <select
                        name="contract_id"
                        value={formData.contract_id}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select a Contract</option>
                        {contracts.map((contract) => (
                            <option key={contract.id} value={contract.id}>
                                {contract.certification_id}
                            </option>
                        ))}
                    </select>
                </label>

                <label>
                    County:
                    <select
                        name="county_id"
                        value={formData.county_id}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select a county</option>
                        {counties.map((county) => (
                            <option key={county.id} value={county.id}>
                                {county.name}
                            </option>
                        ))}
                    </select>
                </label>

                <button type="submit">{isEditMode ? 'Update' : 'Create'} Expense</button>
            </form>
        </div>
    );
};

export default ExpenseForm;
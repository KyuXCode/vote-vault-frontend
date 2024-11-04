import {FC, useEffect, useState} from 'react';
import './displayExpensesStyles.scss'
import {useNavigate} from "react-router-dom";
import {deleteExpense, getExpenses} from "../../../utilities/api/expenseApi.ts";
import {Expense} from "../../../Types/Expense.ts";

const DisplayExpenses: FC = () => {
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const navigate = useNavigate();


    useEffect(() => {
        getExpenses().then((result) => {
            if (result.success && result.data) {
                setExpenses(result.data);
            }
        });
    }, []);

    const handleEdit = (id: string) => {
        navigate(`/expenses/edit/${id}`);
    }

    const handleDelete = (id: string) => {
        deleteExpense(id)
    }

    const handleCreate = () => {
        navigate('/expenses/create');
    };

    return (
        <div className='display-expenses-container'>
            <button className=" " onClick={() => navigate('/')}>
                HOME
            </button>

            <button className="create-button" onClick={handleCreate}>
                Create Expense
            </button>

            <div className="data-row header-row">
                <p>Action</p>
                <p>Name</p>
                <p>Amount</p>
                <p>Fund</p>
                <p>Owner</p>
                <p>Contract ID</p>
                <p>County ID</p>
            </div>

            {expenses.map((expense: Expense) => (
                <div key={expense.id} className="data-row">
                    <div className="actions">
                        <button className="edit-button" onClick={() => handleEdit((expense.id ?? 0).toString())}>Edit
                        </button>
                        <button className="delete-button" onClick={() => {
                            handleDelete((expense.id ?? 0).toString())
                        }}>Delete
                        </button>
                    </div>
                    <p>{expense.name}</p>
                    <p>{expense.amount}</p>
                    <p>{expense.fund}</p>
                    <p>{expense.owner}</p>
                    <p>{expense.contract_id}</p>
                    <p>{expense.county_id}</p>
                </div>
            ))
            }
        </div>
    );
};

export default DisplayExpenses;
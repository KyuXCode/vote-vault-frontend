import {FC, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './searchAuditStyles.scss'

const SearchAudit: FC = () => {
    const [seedNumber, setSeedNumber] = useState<string>('');
    const [testType, setTestType] = useState<'random' | 'public_test'>('random');
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (seedNumber.trim() === '') {
            alert('Please enter a seed number.');
            return;
        }

        const url = `/audits/${testType}?seed_number=${seedNumber}`;
        navigate(url);
    };

    return (
        <div className="search-audit-container">
            <div className="header">
                <button className="go-back-btn" onClick={handleGoBack}>
                    Go Back
                </button>

                <h2>Search Audit</h2>
            </div>

            <form onSubmit={handleSubmit} className="search-form">
                <div className="form-group">
                <label htmlFor="testType">Test Type</label>
                    <select
                        id="testType"
                        value={testType}
                        onChange={(e) => setTestType(e.target.value as 'random' | 'public_test')}
                        className="form-select"
                    >
                        <option value="random">Random Test</option>
                        <option value="public">Public Test</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="seedNumber">Seed Number</label>
                    <input
                        type="text"
                        id="seedNumber"
                        value={seedNumber}
                        onChange={(e) => setSeedNumber(e.target.value)}
                        placeholder="Enter seed number"
                        className="form-input"
                    />
                </div>

                <button type="submit" className="submit-btn">
                    Search
                </button>
            </form>
        </div>
    );
};

export default SearchAudit;

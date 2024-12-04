import {FC, useEffect, useState} from 'react';
import './displayAuditStyles.scss';
import {Audit} from '../../Types/Audit';
import {getPublicTest, getRandomTest} from '../../utilities/api/auditsApi';
import {RandomAuditData} from '../../Types/RandomAuditData.ts';
import {useNavigate} from "react-router-dom";

const DisplayAudit: FC = () => {
    const [auditData, setAuditData] = useState<Audit>();
    const isPublicTest: boolean = location.pathname.includes('/public_test');

    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate(-1);
    };

    useEffect(() => {
        const fetchAuditData = async () => {
            try {
                getRandomTest().then((result) => {
                    if (result.success && result.data) {
                        setAuditData(result.data);
                    }
                });
            } catch (error) {
                console.error('Failed to fetch audit data:', error);
            }
        };

        fetchAuditData();
    }, [isPublicTest]);

    return (
        <div className="display-audit-container audit-data-container">
            <div className="header-bar">
                <div className="back-btn">
                    <button onClick={handleGoBack} className="go-back-button">Go back</button>
                </div>
                <div className="header">
                    <h2>{isPublicTest ? 'Public Audit' : 'Random Audit'}</h2>
                    <p>Seed Number: {auditData?.seed_number || 'N/A'}</p>
                </div>
            </div>

            <div className="audit-data">
                <div className="data-row header-row">
                    <p>Inventory Id</p>
                    <p>Serial Number</p>
                    <p>Condition</p>
                    <p>Usage</p>
                    <p>Component Name</p>
                    <p>Total Count</p>
                </div>

                {auditData?.results?.length ? (
                    auditData.results.map((data: RandomAuditData) => (
                        <div key={data.inventory_id} className="data-row">
                            <p>{data.inventory_id}</p>
                            <p>{data.serial_number}</p>
                            <p>{data.condition}</p>
                            <p>{data.usage}</p>
                            <p>{data.component_name}</p>
                            <p>{data.total_count}</p>
                        </div>
                    ))
                ) : (
                    <p>No audit data available.</p>
                )}
            </div>
        </div>
    );
};

export default DisplayAudit;

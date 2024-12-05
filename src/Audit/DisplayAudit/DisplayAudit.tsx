import {FC, useEffect, useState} from 'react';
import './displayAuditStyles.scss';
import { getRandomTest} from '../../utilities/api/auditsApi';
import {RandomAuditData} from '../../Types/RandomAuditData.ts';
import {useNavigate} from "react-router-dom";
import {RandomAudit} from "../../Types/Audit.ts";

const DisplayAudit: FC = () => {
    const [auditData, setAuditData] = useState<RandomAudit>();
    const [seedNumber, setSeedNumber] = useState<string>("");

    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate(-1);
    };

    const handleDownloadCSV = () => {
        if (!auditData?.results || !auditData.results.length) {
            alert("No data available to download.");
            return;
        }

        const headers = [
            "Inventory Id",
            "Serial Number",
            "Condition",
            "Usage",
            "Component Name",
            "Total Count"
        ];

        const rows = auditData.results.map((data) => [
            data.inventory_id,
            data.serial_number,
            data.condition,
            data.usage,
            data.component_name,
            data.total_count
        ]);

        const csvContent = [
            headers.join(","),
            ...rows.map((row) => row.join(","))
        ].join("\n");

        const blob = new Blob([csvContent], {type: 'text/csv'});
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        const seedNumber = auditData?.seed_number || 'unknown_seed';
        link.download =  `'random_audit_${seedNumber}.csv`;
        link.click();

        URL.revokeObjectURL(url);
    };

    useEffect(() => {
        const url = new URL(window.location.href);

        const params = new URLSearchParams(url.search);
        const seed = params.get('seed_number');

        if (seed) {
            setSeedNumber(seed);
        }
    }, []);

    useEffect(() => {
        const fetchAuditData = async () => {
            try {
                if (seedNumber != "") {
                    console.log(seedNumber)
                    getRandomTest(seedNumber).then((result) => {
                        if (result.success && result.data) {
                            setAuditData(result.data);
                            return
                        }
                    });
                } else {
                    getRandomTest().then((result) => {
                        if (result.success && result.data) {
                            setAuditData(result.data);
                            return
                        }
                    });
                }
            } catch (error) {
                console.error('Failed to fetch audit data:', error);
            }
        };

        fetchAuditData();
    }, [seedNumber]);

    return (
        <div className="display-audit-container audit-data-container">
            <div className="header-bar">
                <div className="back-btn">
                    <button onClick={handleGoBack} className="go-back-button">Go back</button>
                </div>
                <div className="header">
                    <h2>Random Audit</h2>
                    <p>Seed Number: {auditData?.seed_number || 'N/A'}</p>
                </div>
                <div className="csv-download-btn">
                    <button onClick={handleDownloadCSV} className="download-csv-button">Download CSV</button>
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

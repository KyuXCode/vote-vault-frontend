import {FC, useEffect, useState} from 'react';
import './dashboardStyles.scss'
import {getDashboardData} from "../utilities/api/dashboardApi.ts";
import {DashBoardData} from "../Types/DashBoardData.ts";

const Dashboard: FC = () => {
    const[data, setData] = useState<DashBoardData>()

    useEffect(() => {
        getDashboardData().then((result) => {
            if (result.success && result.data) {
                setData(result.data);
            }
        });
    }, [])


    return (
        <div className='dashboard-container'>
            <h1>Dashboard overview</h1>

            <div className="widget-container">
                <div className="entity-count-widget">
                    <h2>Total Vendors</h2>
                    <h1>{data?.total_vendors}</h1>
                </div>

                <div className="entity-count-widget">
                    <h2>Total Certifications</h2>
                    <h1>{data?.total_certifications}</h1>
                </div>

                <div className="entity-count-widget">
                    <h2>Total Components</h2>
                    <h1>{data?.total_components}</h1>
                </div>

                <div className="entity-count-widget">
                    <h2>Total Contracts</h2>
                    <h1>{data?.total_contracts}</h1>
                </div>

                <div className="entity-count-widget">
                    <h2>Total Expenses</h2>
                    <h1>${data?.total_expenses}</h1>
                </div>

                <div className="entity-count-widget">
                    <h2>Total Inventory Units</h2>
                    <h1>{data?.total_inventory_units}</h1>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
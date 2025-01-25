import {FC, useEffect, useState} from 'react';
import './dashboardStyles.scss'
import {getDashboardData} from "../utilities/api/dashboardApi.ts";
import {DashBoardData} from "../Types/DashBoardData.ts";
// import {useNavigate} from "react-router-dom";

const Dashboard: FC = () => {
    const [data, setData] = useState<DashBoardData>()
    // const navigate = useNavigate();

    useEffect(() => {
        getDashboardData().then((result) => {
            if (result.success && result.data) {
                setData(result.data);
            }
        });
    }, [])

    // const handleGoBack = () => {
    //     navigate(-1)
    // }


    return (
        <div className='dashboard-container'>
            {/*<div className="header">*/}
            {/*    <button onClick={handleGoBack} className="go-back-button">Go back</button>*/}
            {/*    <h1>Dashboard overview</h1>*/}
            {/*</div>*/}
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
                    <h2>${data?.total_expenses}</h2>
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
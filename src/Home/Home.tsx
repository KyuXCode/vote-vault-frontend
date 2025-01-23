import {FC} from 'react';
import './homeStyles.scss'
import Dashboard from "../Dashboard/Dashboard.tsx";
import Navbar from "../Navbar/Navbar.tsx";

const Home: FC = () => {
    return (
        <div className='home-container'>
            <Navbar/>
            <Dashboard/>
        </div>
    );
};

export default Home;
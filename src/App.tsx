import './App.css'
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import VendorForm from "./Forms/VendorForm.tsx";

function App() {
  return (
    <>
        <Router>
            <Routes>
                {/*<Route path="/" element={<VendorForm/>} />*/}
            </Routes>
        </Router>
    </>
  )
}

export default App

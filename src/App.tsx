import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import VendorForm from "./Forms/Vendor/VendorForm/VendorForm.tsx";
import DisplayVendors from "./Forms/Vendor/DisplayVendors/DisplayVendors.tsx";
import Home from "./Home/Home.tsx";
import DisplayCertifications from "./Forms/Certification/DisplayCertifications/DisplayCertifications.tsx";
import CertificationForm from "./Forms/Certification/CertificationForm/CertificationForm.tsx";
import ComponentForm from "./Forms/Component/ComponentForm/ComponentForm.tsx";
import DisplayComponents from "./Forms/Component/DisplayComponents/DisplayComponents.tsx";

function App() {
  return (
    <>
        <Router>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/vendors" element={<DisplayVendors/>} />
                <Route path="/vendors/create" element={<VendorForm/>} />
                <Route path="/vendors/edit/:id" element={<VendorForm/>} />
                <Route path="/certifications" element={<DisplayCertifications/>} />
                <Route path="/certifications/create" element={<CertificationForm/>} />
                <Route path="/certifications/edit/:id" element={<CertificationForm/>} />
                <Route path="/components" element={<DisplayComponents/>} />
                <Route path="/components/create" element={<ComponentForm/>} />
                <Route path="/components/edit/:id" element={<ComponentForm/>} />
            </Routes>
        </Router>
    </>
  )
}

export default App

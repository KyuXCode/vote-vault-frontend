import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import VendorForm from "./Forms/Vendor/VendorForm.tsx";
import DisplayVendors from "./Forms/Vendor/DisplayVendors.tsx";
import VendorEdit from "./Forms/Vendor/VendorEdit.tsx";
import Home from "./Home/Home.tsx";
import DisplayCertifications from "./Forms/Certification/DisplayCertifications.tsx";
import CertificationEdit from "./Forms/Certification/CertificationEdit.tsx";
import CertificationForm from "./Forms/Certification/CertificationForm.tsx";
import ComponentForm from "./Forms/Component/ComponentForm.tsx";
import DisplayComponents from "./Forms/Component/DisplayComponents.tsx";
import ComponentEdit from "./Forms/Component/ComponentEdit.tsx";

function App() {
  return (
    <>
        <Router>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/vendors" element={<DisplayVendors/>} />
                <Route path="/vendors/create" element={<VendorForm/>} />
                <Route path="/vendors/edit/:id" element={<VendorEdit/>} />
                <Route path="/certifications" element={<DisplayCertifications/>} />
                <Route path="/certifications/create" element={<CertificationForm/>} />
                <Route path="/certifications/edit/:id" element={<CertificationEdit/>} />
                <Route path="/components" element={<DisplayComponents/>} />
                <Route path="/components/create" element={<ComponentForm/>} />
                <Route path="/components/edit/:id" element={<ComponentEdit/>} />
            </Routes>
        </Router>
    </>
  )
}

export default App

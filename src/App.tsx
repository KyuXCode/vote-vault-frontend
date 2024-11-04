import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import VendorForm from "./Forms/Vendor/VendorForm/VendorForm.tsx";
import DisplayVendors from "./Forms/Vendor/DisplayVendors/DisplayVendors.tsx";
import Home from "./Home/Home.tsx";
import DisplayCertifications from "./Forms/Certification/DisplayCertifications/DisplayCertifications.tsx";
import CertificationForm from "./Forms/Certification/CertificationForm/CertificationForm.tsx";
import ComponentForm from "./Forms/Component/ComponentForm/ComponentForm.tsx";
import DisplayComponents from "./Forms/Component/DisplayComponents/DisplayComponents.tsx";
import CountyForm from "./Forms/County/CountyForm/CountyForm.tsx";
import DisplayCounties from "./Forms/County/DisplayCounties/DisplayCounties.tsx";
import ContractForm from "./Forms/Contract/ContractForm/ContractForm.tsx";
import DisplayContracts from "./Forms/Contract/DisplayContracts/DisplayContracts.tsx";
import ExpenseForm from "./Forms/Expense/ExpenseForm/ExpenseForm.tsx";
import DisplayExpenses from "./Forms/Expense/DisplayExpenses/DisplayExpenses.tsx";
import InventoryForm from "./Forms/Inventory/InventoryForm/InventoryForm.tsx";
import DisplayInventories from "./Forms/Inventory/DisplayInventories/DisplayInventories.tsx";
import DispositionForm from "./Forms/Disposition/DispositionForm/DispositionForm.tsx";
import DisplayDispositions from "./Forms/Disposition/DisplayDispositions/DisplayDispositions.tsx";

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

                <Route path="/counties" element={<DisplayCounties/>} />
                <Route path="/counties/create" element={<CountyForm/>} />
                <Route path="/counties/edit/:id" element={<CountyForm/>} />

                <Route path="/contracts" element={<DisplayContracts/>} />
                <Route path="/contracts/create" element={<ContractForm/>} />
                <Route path="/contracts/edit/:id" element={<ContractForm/>} />

                <Route path="/expenses" element={<DisplayExpenses/>} />
                <Route path="/expenses/create" element={<ExpenseForm/>} />
                <Route path="/expenses/edit/:id" element={<ExpenseForm/>} />

                <Route path="/inventory_units" element={<DisplayInventories/>} />
                <Route path="/inventory_units/create" element={<InventoryForm/>} />
                <Route path="/inventory_units/edit/:id" element={<InventoryForm/>} />

                <Route path="/dispositions" element={<DisplayDispositions/>} />
                <Route path="/dispositions/create" element={<DispositionForm/>} />
                <Route path="/dispositions/edit/:id" element={<DispositionForm/>} />
            </Routes>
        </Router>
    </>
  )
}

export default App

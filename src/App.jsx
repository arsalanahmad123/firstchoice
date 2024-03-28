import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./Layout/ProtectedRoute";
import Dashboard from "./Screens/Dashboard";
import Login from "./Screens/Login";
import Companies from "./Screens/Companies";
import Orders from "./Screens/Orders";
import Work from "./Screens/Work";
import Invoice from "./Screens/Invoice";
import Expense from "./Screens/Expense";
import Revenue from "./Screens/Revenue";
import Services from "./Screens/Services";
import Admin from "./Screens/Admin";
import Employees from "./Screens/Employees";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/work" element={<Work />} />
            <Route path="/invoice" element={<Invoice />} />
            <Route path="/expense" element={<Expense />} />
            <Route path="/revenue" element={<Revenue />} />
            <Route path="/services" element={<Services />} />
            <Route path="/employees" element={<Employees />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

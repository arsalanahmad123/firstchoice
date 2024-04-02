import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { lazy, Suspense, useState, useEffect } from 'react'
import ProtectedRoute from './Layout/ProtectedRoute'
const Dashboard = lazy(() => import('./Screens/Dashboard'))
const Login = lazy(() => import('./Screens/Login'))
const Companies = lazy(() => import('./Screens/Companies'))
const Orders = lazy(() => import('./Screens/Orders'))
const Work = lazy(() => import('./Screens/Work'))
const Invoice = lazy(() => import('./Screens/Invoice'))
const Expense = lazy(() => import('./Screens/Expense'))
const Revenue = lazy(() => import('./Screens/Revenue'))
const Services = lazy(() => import('./Screens/Services'))
const Admin = lazy(() => import('./Screens/Admin'))
const Employees = lazy(() => import('./Screens/Employees'))
const Add_Invoice = lazy(() => import('./Screens/Add_Invoice'))
import Loader from './Components/Loader'

function App() {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false)
        }, 5000)
        return () => clearTimeout(timer)
    }, [])
    return (
        <>
            <BrowserRouter>
                <Suspense fallback={loading && <Loader />}>
                    <Routes>
                        <Route element={<ProtectedRoute />}>
                            <Route path='/' element={<Dashboard />} />
                            <Route
                                path='/companies/*'
                                element={<Companies />}
                            />
                            <Route path='/orders' element={<Orders />} />
                            <Route path='/work' element={<Work />} />
                            <Route path='/invoice' element={<Invoice />} />
                            <Route path='/expense' element={<Expense />} />
                            <Route path='/revenue' element={<Revenue />} />
                            <Route path='/services' element={<Services />} />
                            <Route path='/employees' element={<Employees />} />
                            <Route
                                path='/add_invoice'
                                element={<Add_Invoice />}
                            />
                        </Route>
                        <Route path='/login' element={<Login />} />
                        <Route path='/admin' element={<Admin />} />
                    </Routes>
                </Suspense>
            </BrowserRouter>
        </>
    )
}

export default App

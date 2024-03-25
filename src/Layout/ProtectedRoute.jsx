import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

const ProtectedRoute = () => {
    let auth = true
    return auth ? <Outlet /> : <Navigate to='/login' />
}

export default ProtectedRoute

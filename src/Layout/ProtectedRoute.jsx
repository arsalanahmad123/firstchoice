import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../Context/AuthContext'

const ProtectedRoute = () => {
    const { loggedIn } = useAuth()
    return loggedIn ? <Outlet /> : <Navigate to='/login' />
}

export default ProtectedRoute

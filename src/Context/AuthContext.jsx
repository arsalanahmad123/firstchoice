import { createContext, useContext, useState, useEffect } from 'react'
import { api } from '../API/api.js'

const AuthContext = createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(
        localStorage.getItem('loggedIn') === 'true',
    )
    const [company, setCompany] = useState(
        JSON.parse(localStorage.getItem('company')),
    )

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await api.get('/auth/check-auth')

                if (response.status === 200) {
                    setLoggedIn(true)
                } else {
                    setLoggedIn(false)
                }
            } catch (error) {
                setLoggedIn(false)
            }
        }

        if (!loggedIn) {
            checkAuth()
        }
    }, [loggedIn])

    useEffect(() => {
        localStorage.setItem('loggedIn', loggedIn)
    }, [loggedIn])

    useEffect(() => {
        localStorage.setItem('company', JSON.stringify(company))
    }, [company])

    return (
        <AuthContext.Provider
            value={{ loggedIn, setLoggedIn, company, setCompany }}
        >
            {children}
        </AuthContext.Provider>
    )
}

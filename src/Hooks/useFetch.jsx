import { useState, useEffect } from 'react'
import { api } from '../API/api'

const BASE_URL = import.meta.env.VITE_BASE_URL

export const useFetch = (url) => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)

    const fetchData = async () => {
        try {
            const response = await api.get(`${BASE_URL}/${url}`)
            setData(response.data.data)
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [url])

    return { data, loading, fetchData }
}

import axios from 'axios'

const BASE_URL = import.meta.env.VITE_BASE_URL
const companyID = JSON.parse(localStorage.getItem('company'))?._id
export const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        company_id: companyID,
        'Access-Control-Allow-Origin': '*',
    },
})

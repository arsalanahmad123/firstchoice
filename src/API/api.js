import axios from 'axios'

const BASE_URL = import.meta.env.VITE_BASE_URL
const companyID = JSON.parse(sessionStorage.getItem('company'))?._id
export const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        company_id: companyID,
    },
})

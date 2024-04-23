import React, { useEffect, useState } from 'react'
import Wrapper from '../Layout/Wrapper'
import { FaMoneyBillAlt } from 'react-icons/fa'
import { FaMoneyBillTrendUp } from 'react-icons/fa6'
import { NavLink, Routes, Route, useParams } from 'react-router-dom'
import Employees from './Employees'
import NewEmployee from './NewEmployee'
import { useFetch } from '../Hooks/useFetch'
import { FaArrowLeft } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { api } from '../API/api'
import { createPortal } from 'react-dom'
import EditCompany from './EditCompany'

const BASE_URL = import.meta.env.VITE_BASE_URL
const Homepage = ({ id, company, employees, pending }) => {
    const navigate = useNavigate()

    const [companyModal, setCompanyModal] = useState(false)

    return (
        <>
            <Wrapper title={'Company'}>
                <div className='flex flex-col  mx-5 '>
                    <div className='flex flex-row justify-between items-center mt-2 mb-10'>
                        <FaArrowLeft
                            className='text-white text-2xl cursor-pointer m-3'
                            onClick={() => navigate(-1)}
                        />
                        <button
                            className=' px-4 py-2 bg-lightGold text-gray-900 rounded-md'
                            onClick={() => setCompanyModal(true)}
                        >
                            Edit Company
                        </button>
                        <NavLink
                            to={`/companies/company/${id}/add-employee`}
                            className=' px-4 py-2 bg-lightGold text-gray-900 rounded-md'
                        >
                            Add Employee
                        </NavLink>
                    </div>
                    <div className='flex flex-col justify-start items-start mt-2 gap-y-3 '>
                        <div className='flex flex-col bg-bgLight p-5 rounded-md justify-center items-center w-full'>
                            <div className='flex justify-between items-center w-full'>
                                <h1 className='text-lg font-bold text-center text-white italic'>
                                    Company Name :
                                    <span className='text-lightGold text-[18px]'>
                                        {company?.username}
                                    </span>
                                </h1>
                                <h1 className='text-lg font-bold text-center text-white italic'>
                                    Email:{' '}
                                    <span className='text-lightGold text-[18px]'>
                                        {company?.email}
                                    </span>
                                </h1>
                            </div>
                            <div className='flex justify-between items-center w-full'>
                                <h1 className='text-lg font-bold text-center text-white italic'>
                                    Phone:{' '}
                                    <span className='text-lightGold text-[18px]'>
                                        {company?.phone}
                                    </span>
                                </h1>
                                <h1 className='text-lg font-bold text-center text-white italic'>
                                    Role:{' '}
                                    <span className='text-lightGold text-[18px]'>
                                        {company?.role}
                                    </span>
                                </h1>
                            </div>
                            <div className='flex flex-col justify-center items-start  bg-bgDarkColor p-4'>
                                <span className='flex flex-row justify-start items-center gap-x-4'>
                                    <span className='font-bold'>
                                        E-Channel Username
                                    </span>
                                    <span className='badge badge-secondary'>
                                        {company?.e_channel_username}
                                    </span>
                                </span>
                                <span className='flex flex-row justify-start items-center gap-x-4'>
                                    <span className='font-bold'>
                                        MS Username
                                    </span>
                                    <span className='badge badge-secondary'>
                                        {company?.ms_username}
                                    </span>
                                </span>
                                <span className='flex flex-row justify-start items-center gap-x-4'>
                                    <span className='font-bold'>
                                        Gmail Username
                                    </span>
                                    <span className='badge badge-secondary'>
                                        {company?.gmail_username}
                                    </span>
                                </span>
                            </div>
                        </div>
                        <div className='flex justify-between items-center mt-4 w-full'>
                            <div className='rounded-lg bg-card1 text-black relative w-96 h-32 px-4'>
                                <FaMoneyBillAlt className='size-12 text-card1 absolute -top-2 -right-2 bg-bgDarkColor rounded-full border-[10px] border-bgDarkColor' />
                                <div className='flex flex-col justify-center  h-full pt-2'>
                                    <h2 className='text-xl font-semibold uppercase w-28'>
                                        TOTAL EMPLOYEES
                                    </h2>
                                    <div className='flex justify-between items-center'>
                                        <NavLink
                                            to={`/companies/company/${id}/employees`}
                                            className='underline cursor-pointer'
                                        >
                                            See All Employees
                                        </NavLink>
                                        <p className='text-3xl font-bold text-darkorange italic  text-right'>
                                            {employees?.length || 0}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className=' bg-card2 text-black relative h-32 w-96 px-4 rounded-lg'>
                                <FaMoneyBillTrendUp className='size-12 text-card2 absolute -top-2 -right-2 bg-bgDarkColor rounded-full border-[10px] border-bgDarkColor' />
                                <div className='flex flex-col justify-center h-full pt-2'>
                                    <h2 className='text-xl font-semibold uppercase w-10'>
                                        PENDING AMOUNT
                                    </h2>
                                    <p className='text-3xl font-bold text-darkorange italic text-right '>
                                        {pending}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {companyModal &&
                    createPortal(
                        <EditCompany
                            setCompanyModal={setCompanyModal}
                            Company={company}
                        />,
                        document.getElementById('modal'),
                    )}
            </Wrapper>
        </>
    )
}

const Company = () => {
    const [company, setCompany] = useState(null)
    const [pending, setPending] = useState(null)
    const { id } = useParams()
    const { data: employees } = useFetch(`employee/${id}`)
    useEffect(() => {
        const getCompany = async () => {
            try {
                const response = await api.get(
                    `${BASE_URL}/companies/get-company/${id}`,
                )
                const data = response.data.data
                if (response.status === 200) {
                    setCompany(data.company)
                    setPending(data.invoices)
                }
            } catch (error) {
                console.log(error)
            }
        }
        getCompany()
    }, [])
    return (
        <>
            <Routes>
                <Route
                    key={'company'}
                    path='/'
                    element={
                        <Homepage
                            id={id}
                            company={company}
                            pending={pending}
                            employees={employees}
                        />
                    }
                />
                <Route
                    key={'employees'}
                    path='/employees/*'
                    element={<Employees id={id} />}
                />
                <Route
                    key={'add-employee'}
                    path='/add-employee'
                    element={<NewEmployee id={id} />}
                />
            </Routes>
        </>
    )
}

export default Company

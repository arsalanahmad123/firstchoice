import React from 'react'
import Wrapper from '../Layout/Wrapper'
import { FaMoneyBillAlt } from 'react-icons/fa'
import { FaMoneyBillTrendUp } from 'react-icons/fa6'
import { NavLink, Routes, Route, useParams } from 'react-router-dom'
import Employees from './Employees'
import NewEmployee from './NewEmployee'
import { useFetch } from '../Hooks/useFetch'

const Homepage = ({ id, company, employees }) => {
    return (
        <>
            <Wrapper title={'Company'}>
                <div className='flex flex-col mx-5'>
                    <div className='w-full max-h-[20vh] mt-8 py-3 border-b border-gray-600'>
                        <img
                            src={company?.logo.url}
                            className='w-full h-full object-cover rounded-md filter grayscale'
                            alt=''
                        />
                    </div>
                    <div className='flex flex-col justify-start items-start mt-2 gap-y-3'>
                        <div className='flex justify-between items-center w-full'>
                            <h1 className='text-xl font-bold text-center text-white italic'>
                                Company Name :{' '}
                                <span className='text-lightGold text-[18px]'>
                                    {company?.username}
                                </span>
                            </h1>
                            <h1 className='text-xl font-bold text-center text-white italic'>
                                Email:{' '}
                                <span className='text-lightGold text-[18px]'>
                                    {company?.email}
                                </span>
                            </h1>
                        </div>
                        <div className='flex justify-between items-center w-full'>
                            <h1 className='text-xl font-bold text-center text-white italic'>
                                Phone:{' '}
                                <span className='text-lightGold text-[18px]'>
                                    {company?.phone}
                                </span>
                            </h1>
                            <h1 className='text-xl font-bold text-center text-white italic'>
                                Role:{' '}
                                <span className='text-lightGold text-[18px]'>
                                    {company?.role}
                                </span>
                            </h1>
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
                                        $200
                                    </p>
                                </div>
                            </div>
                        </div>
                        <NavLink
                            to={`/companies/company/${id}/add-employee`}
                            className=' px-4 py-2 bg-lightGold text-gray-900 rounded-md'
                        >
                            Add Employee{' '}
                        </NavLink>
                    </div>
                </div>
            </Wrapper>
        </>
    )
}

const Company = () => {
    const { id } = useParams()
    const { data: company } = useFetch(`companies/get-company/${id}`)
    const { data: employees } = useFetch(`employee/${id}`)
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
                            employees={employees}
                        />
                    }
                />
                <Route
                    key={'employees'}
                    path='/employees/*'
                    element={<Employees employees={employees} />}
                />
                <Route
                    key={'add-employee'}
                    path='/add-employee'
                    element={<NewEmployee />}
                />
            </Routes>
        </>
    )
}

export default Company

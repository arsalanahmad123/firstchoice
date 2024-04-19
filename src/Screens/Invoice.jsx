import React, { useEffect, useState, useMemo } from 'react'
import AppLayout from '../Layout/AppLayout'
import Wrapper from '../Layout/Wrapper'
import Table from '../Components/Table'
import { CgSearch } from 'react-icons/cg'
import AddInvoice from './AddInvoice'
import { Route, Routes, NavLink } from 'react-router-dom'
import { useFetch } from '../Hooks/useFetch'

const HomePage = () => {
    const { data: invoices, fetchData } = useFetch('invoices')
    const [filteredInvoices, setFilteredInvoices] = useState(null)

    const handleSearch = (e) => {
        const query = e.target.value.trim().toLowerCase()
        if (query) {
            const filtered = invoices?.filter((invoice) =>
                invoice.company.toLowerCase().includes(query),
            )
            setFilteredInvoices(filtered)
        } else {
            setFilteredInvoices(invoices)
        }
    }

    useEffect(() => {
        setFilteredInvoices(invoices)
    }, [invoices])

    const memoizedInvoices = useMemo(() => invoices, [invoices])

    return (
        <>
            <Wrapper title={'Latest Invoices'}>
                <div className='flex  justify-between items-center  gap-x-20 lg:pt-4 px-5'>
                    <div className='relative'>
                        <input
                            type='text'
                            className='w-full lg:py-1 pl-5 lg:rounded-2xl bg-bgLight border-2 border-gray-700 text-white'
                            onChange={handleSearch}
                            placeholder='Search by company name...'
                        />
                        <CgSearch className='text-slate-700 m-auto absolute lg:right-5 lg:top-3  ' />
                    </div>
                    <div className='flex justify-center items-center gap-x-3'>
                        <span className='badge badge-neutral py-3 cursor-pointer'>
                            pending
                        </span>
                        <span className='badge badge-neutral py-3  cursor-pointer'>
                            completed
                        </span>
                    </div>
                    <NavLink
                        to={'/invoice/add-invoice'}
                        className='text-gray-900 font-bold text-sm  px-4 py-1 rounded-2xl bg-lightGold'
                    >
                        Add New Invoice
                    </NavLink>
                </div>
                <Table invoices={filteredInvoices} fetchData={fetchData} />
            </Wrapper>
        </>
    )
}

const Invoice = () => {
    return (
        <>
            <Routes>
                <Route key={'invoice'} path='/' element={<HomePage />} />
                <Route
                    key={'add-invoice'}
                    path='/add-invoice'
                    element={<AddInvoice />}
                />
            </Routes>
        </>
    )
}

export default AppLayout()(Invoice)

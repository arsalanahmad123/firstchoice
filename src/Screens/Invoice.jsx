import React, { useEffect, useState, useMemo } from 'react'
import AppLayout from '../Layout/AppLayout'
import Wrapper from '../Layout/Wrapper'
import Table from '../Components/Table'
import AddInvoice from './AddInvoice'
import { Route, Routes, NavLink } from 'react-router-dom'
import { useFetch } from '../Hooks/useFetch'
import ViewInvoice from './ViewInvoice'

const HomePage = () => {
    const { data: invoices, fetchData } = useFetch('invoices')
    const [filter, setFilter] = useState(null)
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

    useEffect(() => {
        if (filter === 'pending') {
            setFilteredInvoices(
                invoices?.filter((invoice) => invoice.pending_amount > 0),
            )
        } else if (filter === 'completed') {
            setFilteredInvoices(
                invoices?.filter((invoice) => invoice.pending_amount === 0),
            )
        }
    }, [filter])

    const activeFilter = (filter) => {
        setFilter(filter)
    }

    return (
        <>
            <Wrapper title={'Latest Invoices'}>
                <div className='flex  justify-between items-center  gap-x-20 lg:pt-4 px-5'>
                    <div className='relative'>
                        <input
                            type='text'
                            className='w-full p-2 lg:rounded-2xl bg-bgLight border-2 border-gray-700 text-white text-sm'
                            onChange={handleSearch}
                            placeholder='Search by company name...'
                        />
                    </div>
                    <div className='flex justify-center items-center gap-x-3'>
                        <span
                            className={`badge py-3 cursor-pointer ${
                                filter === 'pending'
                                    ? 'badge-primary'
                                    : 'badge-neutral'
                            }`}
                            onClick={() => activeFilter('pending')}
                        >
                            pending
                        </span>
                        <span
                            className={`badge py-3 cursor-pointer ${
                                filter === 'completed'
                                    ? 'badge-primary'
                                    : 'badge-neutral'
                            }`}
                            onClick={() => activeFilter('completed')}
                        >
                            completed
                        </span>
                        {filter !== null && (
                            <span
                                className='badge py-3 cursor-pointer'
                                onClick={() => setFilter(null)}
                            >
                                Remove Filters
                            </span>
                        )}
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
                <Route
                    key={'view-invoice'}
                    path='/view-invoice/:id'
                    element={<ViewInvoice />}
                />
            </Routes>
        </>
    )
}

export default AppLayout()(Invoice)

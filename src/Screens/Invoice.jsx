import React, { useEffect, useState, useMemo } from 'react'
import AppLayout from '../Layout/AppLayout'
import Wrapper from '../Layout/Wrapper'
import Table from '../Components/Table'
import AddInvoice from './AddInvoice'
import { Route, Routes, NavLink } from 'react-router-dom'
import { useFetch } from '../Hooks/useFetch'
import Loader from '../Components/Loader'

const HomePage = () => {
    const { data: invoices, fetchData, loading } = useFetch('invoices')
    const [searchQuery, setSearchQuery] = useState('')
    const [filter, setFilter] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 10

    useEffect(() => {
        fetchData()
    }, [])

    const handleSearch = (e) => {
        const query = e.target.value.trim().toLowerCase()
        setSearchQuery(query)
    }

    const filteredInvoices = useMemo(() => {
        let filtered = invoices

        if (searchQuery) {
            filtered = filtered.filter((invoice) =>
                invoice.company.toLowerCase().includes(searchQuery),
            )
        }

        if (filter === 'pending') {
            filtered = filtered.filter((invoice) => invoice.pending_amount > 0)
        } else if (filter === 'completed') {
            filtered = filtered.filter(
                (invoice) => invoice.pending_amount === 0,
            )
        }

        return filtered
    }, [invoices, searchQuery, filter])

    const displayedInvoices = useMemo(() => {
        if (!filteredInvoices || filteredInvoices.length === 0) {
            return []
        }
        const indexOfLastItem = currentPage * itemsPerPage
        return filteredInvoices.slice(0, indexOfLastItem)
    }, [filteredInvoices, currentPage])

    const loadNextPage = () => {
        setCurrentPage(currentPage + 1)
    }

    const activeFilter = (selectedFilter) => {
        setFilter(selectedFilter)
    }

    return (
        <>
            <Wrapper title={'Latest Invoices'}>
                {loading ? (
                    <Loader />
                ) : (
                    <>
                        <div className='flex justify-between items-center gap-x-20 lg:pt-4 px-5'>
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
                                className='text-gray-900 font-bold text-sm px-4 py-1 rounded-2xl bg-lightGold'
                            >
                                Add New Invoice
                            </NavLink>
                        </div>
                        <Table
                            invoices={displayedInvoices}
                            fetchData={fetchData}
                        />
                        {displayedInvoices?.length < filteredInvoices?.length &&
                            filteredInvoices?.length > 0 && (
                                <button
                                    className='text-gray-900 font-bold mx-auto w-52 px-2 lg:py-1 lg:rounded-2xl bg-lightGold mt-2'
                                    onClick={loadNextPage}
                                >
                                    View More
                                </button>
                            )}
                    </>
                )}
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

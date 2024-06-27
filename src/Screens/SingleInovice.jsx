import { useState, useEffect, useMemo } from 'react'
import Wrapper from '../Layout/Wrapper'
import Logo from '../assets/logo.png'
import { useFetch } from '../Hooks/useFetch'
import { api } from '../API/api'
import toast from 'react-hot-toast'
import AppLayout from '../Layout/AppLayout'
import AddSingleInvoice from '../Screens/AddSingleInvoice'
import Loader from '../Components/Loader'
import { NavLink, Routes, Route } from 'react-router-dom'
import Table from '../Components/Table'

const BASE_URL = import.meta.env.VITE_BASE_URL

const HomePage = () => {
    const { data: invoices, fetchData, loading } = useFetch('singleinvoices')
    const [searchQuery, setSearchQuery] = useState('')
    const [filter, setFilter] = useState(null)

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

    const activeFilter = (selectedFilter) => {
        setFilter(selectedFilter)
    }

    const deleteInvoice = async (id) => {
        try {
            const confirm = window.confirm('Are you sure you want to delete?')
            if (!confirm) return
            const response = await api.delete(
                `${BASE_URL}/singleinvoices/${id}`,
            )
            if (response.status === 200) {
                fetchData()
                toast.success(response.data.message)
            } else {
                toast.error('Something went wrong')
            }
        } catch (error) {
            console.log(error)
        }
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
                                to={'/singleinvoice/add'}
                                className='text-gray-900 font-bold text-sm px-4 py-1 rounded-2xl bg-lightGold'
                            >
                                Add New Invoice
                            </NavLink>
                        </div>
                        {invoices.length > 0 && (
                            <div className='overflow-x-auto bg-bgLight max-h-[70vh] w-full mt-5 '>
                                <table className='table table-md  text-white '>
                                    <thead>
                                        <tr className='bg-lightGold text-gray-900'>
                                            <th>Title</th>
                                            <th>Company</th>
                                            <th>Service</th>
                                            <th>Quantity</th>
                                            <th>Pending Amount</th>
                                            <th>Paid</th>
                                            <th>Date</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredInvoices?.map((invoice, i) => (
                                            <tr
                                                className='border-gray-700'
                                                key={i}
                                            >
                                                <td>{invoice.title}</td>
                                                <td>{invoice.company}</td>
                                                <td>
                                                    {invoice.services.map(
                                                        (service) => (
                                                            <div
                                                                className='mb-2'
                                                                key={
                                                                    service.service
                                                                }
                                                            >
                                                                <span>
                                                                    <span>
                                                                        {
                                                                            service.service
                                                                        }
                                                                    </span>
                                                                </span>
                                                            </div>
                                                        ),
                                                    )}
                                                </td>
                                                <td>
                                                    {invoice.services.map(
                                                        (service) => (
                                                            <div
                                                                className='mb-2'
                                                                key={
                                                                    service.service
                                                                }
                                                            >
                                                                <span>
                                                                    <span>
                                                                        {
                                                                            service.quantity
                                                                        }
                                                                    </span>
                                                                </span>
                                                            </div>
                                                        ),
                                                    )}
                                                </td>
                                                <td>
                                                    AED{' '}
                                                    {invoice.pending_amount > 0
                                                        ? invoice.pending_amount
                                                        : '0'}
                                                </td>
                                                <td>
                                                    AED {invoice.paid_amount}
                                                </td>
                                                <td>
                                                    {new Date(
                                                        invoice.createdAt,
                                                    ).getDate()}
                                                    /
                                                    {new Date(
                                                        invoice.createdAt,
                                                    ).getMonth() + 1}
                                                    /
                                                    {new Date(
                                                        invoice.createdAt,
                                                    ).getFullYear()}
                                                </td>

                                                <td>
                                                    <button
                                                        type='button'
                                                        className='btn btn-xs btn-error'
                                                        onClick={() =>
                                                            deleteInvoice(
                                                                invoice._id,
                                                            )
                                                        }
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                                <td>
                                                    <a
                                                        href={`/view-invoice/${invoice._id}`}
                                                        target='_top'
                                                    >
                                                        View
                                                    </a>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </>
                )}
            </Wrapper>
        </>
    )
}

const SingleInovice = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/add' element={<AddSingleInvoice />} />
            </Routes>
        </>
    )
}

export default AppLayout()(SingleInovice)

import React from 'react'
import { api } from '../API/api'
import { useState } from 'react'
import toast from 'react-hot-toast'
const BASE_URL = import.meta.env.VITE_BASE_URL
import { Link, NavLink } from 'react-router-dom'

const Table = ({ invoices, fetchData }) => {
    const [selectedInvoice, setSelectedInvoice] = useState(null)

    const deleteInvoice = async (id) => {
        try {
            const confirm = window.confirm('Are you sure you want to delete?')
            if (!confirm) return
            const response = await api.delete(`${BASE_URL}/invoices/${id}`)
            if (response.status === 200) {
                fetchData()
                toast.success(response.data.message)
                setSelectedInvoice(null)
            } else {
                toast.error('Something went wrong')
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
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
                        <th>Employees</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {invoices?.map((invoice, i) => (
                        <tr className='border-gray-700' key={i}>
                            <td>{invoice.title}</td>
                            <td>{invoice.company}</td>
                            <td>
                                {invoice.services.map((service) => (
                                    <div key={service.service} className='mb-2'>
                                        <span
                                            key={service.service}
                                            className='badge badge-outline badge-secondary'
                                        >
                                            {service.service}
                                        </span>
                                    </div>
                                ))}
                            </td>
                            <td>
                                {invoice.services.map((service) => (
                                    <div className='mb-2' key={service.service}>
                                        <span>
                                            <span>{service.quantity}</span>
                                        </span>
                                    </div>
                                ))}
                            </td>
                            <td>
                                AED{' '}
                                {invoice.pending_amount > 0
                                    ? invoice.pending_amount
                                    : '0'}
                            </td>
                            <td>AED {invoice.total_price}</td>
                            <td>
                                {new Date(invoice.createdAt).getDate()}/
                                {new Date(invoice.createdAt).getMonth() + 1}/
                                {new Date(invoice.createdAt).getFullYear()}
                            </td>
                            <td>
                                <span className='flex flex-row flex-wrap gap-x-1 gap-y-1'>
                                    {invoice.services.map((service) =>
                                        service.employees.map((employee) => (
                                            <span
                                                className='badge badge-outline badge-secondary'
                                                key={employee.name}
                                            >
                                                {employee.name}
                                            </span>
                                        )),
                                    )}
                                    {invoice.services.map((service) => {
                                        if (service.employees.length === 0) {
                                            return (
                                                <span
                                                    className='badge badge-outline badge-secondary'
                                                    key={service.service}
                                                >
                                                    No employees
                                                </span>
                                            )
                                        }
                                    })}
                                </span>
                            </td>
                            <td>
                                <button
                                    type='button'
                                    className='btn btn-xs btn-error'
                                    onClick={() => deleteInvoice(invoice._id)}
                                >
                                    Delete
                                </button>
                            </td>
                            <td>
                                <NavLink
                                    to={`https://firstchoice-opal.vercel.app/invoice/view-invoice/${invoice._id}`}
                                    target='_blank'
                                >
                                    View
                                </NavLink>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Table

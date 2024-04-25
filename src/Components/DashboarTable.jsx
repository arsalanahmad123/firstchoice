import React, { useState } from 'react'
import { FaPencil } from 'react-icons/fa6'
import toast from 'react-hot-toast'
import { api } from '../API/api'

const EditModal = ({ invoice, fetchData, setSelectedOrder }) => {
    const employees = () => {
        let count = 0
        invoice.services.forEach((service) => {
            service.employees.forEach((employee) => {
                count++
            })
        })
        return count
    }

    const handleChangeStatus = async (e, service, employee) => {
        try {
            const response = await api.put(`/invoices/${invoice._id}`, {
                status: e,
                employee: employee.name,
                serviceName: service.service,
            })
            if (response.status === 200) {
                toast.success(response.data.message)
                fetchData()
                setSelectedOrder(null)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleInvoiceStatus = async (e) => {
        try {
            const response = await api.patch(`/invoices/${invoice._id}`, {
                status: e,
            })
            if (response.status === 200) {
                toast.success(response.data.message)
                fetchData()
                setSelectedOrder(null)
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    return (
        <>
            <dialog id='my_modal_2' className='modal'>
                <div className='modal-box'>
                    <h3 className='font-bold text-2xl text-center'>
                        {invoice.title}
                    </h3>

                    {employees() > 0 && (
                        <div className='flex flex-col  mt-3 gap-y-3'>
                            <div className='flex flex-col gap-y-2'>
                                {invoice.services.map((service) => (
                                    <div
                                        key={service.id}
                                        className='flex flex-col gap-y-2'
                                    >
                                        {service.employees.map((employee) => (
                                            <div
                                                key={employee.name}
                                                className='flex flex-row justify-between gap-x-5 items-center'
                                            >
                                                <span className='badge badge-primary'>
                                                    {employee.name}
                                                </span>
                                                <span>{employee.status}</span>
                                                <select
                                                    name='changeStatus'
                                                    id='changeStatus'
                                                    className='select select-bordered select-sm'
                                                    onChange={(e) =>
                                                        handleChangeStatus(
                                                            e.target.value,
                                                            service,
                                                            employee,
                                                        )
                                                    }
                                                >
                                                    <option value=''>
                                                        Update Status
                                                    </option>
                                                    <option value='waiting for payment'>
                                                        Waiting For Payment
                                                    </option>
                                                    <option value='documents received'>
                                                        Documents Received
                                                    </option>
                                                    <option value='in process'>
                                                        In Process
                                                    </option>
                                                    <option value='approved'>
                                                        Approved
                                                    </option>
                                                    <option value='return for modification'>
                                                        Return For Modification
                                                    </option>
                                                    <option value='rejected'>
                                                        Rejected
                                                    </option>
                                                    <option value='completed'>
                                                        Completed
                                                    </option>
                                                </select>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    <div className='flex flex-col gap-y-2'>
                        {employees() === 0 && (
                            <div className='flex flex-row justify-between items-center'>
                                <span>Invoice Status</span>
                                <span>{invoice.status}</span>
                                <select
                                    name='invoiceStatus'
                                    onChange={(e) =>
                                        handleInvoiceStatus(e.target.value)
                                    }
                                    className='select select-bordered select-sm'
                                >
                                    <option value=''>Update Status</option>
                                    <option value='waiting for payment'>
                                        Waiting For Payment
                                    </option>
                                    <option value='documents received'>
                                        Documents Received
                                    </option>
                                    <option value='in process'>
                                        In Process
                                    </option>
                                    <option value='approved'>Approved</option>
                                    <option value='return for modification'>
                                        Return For Modification
                                    </option>
                                    <option value='rejected'>Rejected</option>
                                    <option value='completed'>Completed</option>
                                </select>
                            </div>
                        )}
                    </div>
                </div>
                <form method='dialog' className='modal-backdrop'>
                    <button>close</button>
                </form>
            </dialog>
        </>
    )
}

const DashboarTable = ({ invoices, fetchData }) => {
    const [selectedOrder, setSelectedOrder] = useState(null)

    const handleOrderChange = (order) => {
        setSelectedOrder(order)
        if (selectedOrder !== null) {
            document.getElementById('my_modal_2').showModal()
        }
    }

    return (
        <>
            <div className='overflow-x-auto  bg-bgLight max-h-[76vh] mt-10  w-full rounded-xl '>
                <table className='table table-md   '>
                    <thead>
                        <tr className='bg-lightGold text-gray-900 border-gray-700'>
                            <th>Order Title</th>
                            <th>Company</th>
                            <th>Services</th>
                            <th>Quantity</th>
                            <th>Total Price</th>
                            <th>Employees</th>
                            <th>Status</th>
                            <th>Change Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoices?.map((item) => (
                            <>
                                <tr key={item._id}>
                                    <td className='text-white'>{item.title}</td>
                                    <td className='text-white'>
                                        {item.company}
                                    </td>
                                    <td className='text-white'>
                                        <div className='flex flex-col'>
                                            {item.services.map((service) => (
                                                <span
                                                    key={service}
                                                    className=' mb-1'
                                                >
                                                    {service.service}
                                                </span>
                                            ))}
                                        </div>
                                    </td>
                                    <td className='text-white'>
                                        <div className='flex flex-col'>
                                            {item.services.map((service) => (
                                                <span key={service.service}>
                                                    {service.quantity}
                                                </span>
                                            ))}
                                        </div>
                                    </td>
                                    <td className='text-white'>
                                        {item.total_price}
                                    </td>
                                    <td className='flex gap-x-1 flex-wrap'>
                                        {item.services.map((service) =>
                                            service.employees?.map(
                                                (employee) => (
                                                    <span
                                                        key={employee.name}
                                                        className=''
                                                    >
                                                        {employee.name}
                                                    </span>
                                                ),
                                            ),
                                        )}
                                    </td>
                                    <td>
                                        {item.status !== 'waiting for payment'
                                            ? item.status
                                            : ''}
                                    </td>
                                    <td>
                                        <FaPencil
                                            className='cursor-pointer'
                                            onClick={() =>
                                                handleOrderChange(item)
                                            }
                                        />
                                    </td>
                                </tr>
                            </>
                        ))}
                    </tbody>
                </table>
                {selectedOrder && (
                    <EditModal
                        invoice={selectedOrder}
                        fetchData={fetchData}
                        setSelectedOrder={setSelectedOrder}
                    />
                )}
            </div>
        </>
    )
}

export default DashboarTable

import { useState } from 'react'
import AppLayout from '../Layout/AppLayout'
import Wrapper from '../Layout/Wrapper'
import { CgSearch } from 'react-icons/cg'
import { useFetch } from '../Hooks/useFetch'
import { api } from '../API/api'
import toast from 'react-hot-toast'
import { FaPencil } from 'react-icons/fa6'

const BASE_URL = import.meta.env.VITE_BASE_URL

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

const Orders = () => {
    const { data: orders, fetchData } = useFetch('invoices')
    const [selectedOrder, setSelectedOrder] = useState(null)

    const showModal = () => {
        document.getElementById('my_modal_2').showModal()
    }
    const handleOrderChange = (order) => {
        setSelectedOrder(order)
        showModal()
    }

    return (
        <>
            <Wrapper title={'All Orders'}>
                <div className='flex  justify-between items-center  gap-x-20 lg:pt-4 px-5'>
                    <div className='relative'>
                        <input
                            type='text'
                            className='w-full lg:py-1 pl-5 lg:rounded-2xl bg-bgLight border-2 border-gray-700 text-white'
                        />
                        <CgSearch className='text-slate-700 m-auto absolute lg:right-5 lg:top-3  ' />
                    </div>
                    <div className='flex justify-center items-center gap-x-3'>
                        <span className='badge badge-neutral py-3 cursor-pointer  '>
                            pending
                        </span>
                        <span className='badge badge-neutral py-3  cursor-pointer'>
                            completed
                        </span>
                    </div>
                </div>
                <div className='overflow-x-auto  bg-bgLight max-h-[76vh] mt-10 mx-5 rounded-xl '>
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
                            {orders?.map((item) => (
                                <>
                                    <tr key={item._id}>
                                        <td className='text-white'>
                                            {item.title}
                                        </td>
                                        <td className='text-white'>
                                            {item.company}
                                        </td>
                                        <td className='text-white'>
                                            <div className='flex flex-col'>
                                                {item.services.map(
                                                    (service) => (
                                                        <span
                                                            key={service}
                                                            className='badge'
                                                        >
                                                            {service.service}
                                                        </span>
                                                    ),
                                                )}
                                            </div>
                                        </td>
                                        <td className='text-white'>
                                            <div className='flex flex-col'>
                                                {item.services.map(
                                                    (service) => (
                                                        <span
                                                            key={
                                                                service.service
                                                            }
                                                        >
                                                            {service.quantity}
                                                        </span>
                                                    ),
                                                )}
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
                                                            className='badge'
                                                        >
                                                            {employee.name}
                                                        </span>
                                                    ),
                                                ),
                                            )}
                                        </td>
                                        <td>
                                            {item.status !==
                                            'waiting for payment'
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
            </Wrapper>
        </>
    )
}

export default AppLayout()(Orders)

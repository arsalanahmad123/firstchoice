import { useState, useEffect } from 'react'
import AppLayout from '../Layout/AppLayout'
import Wrapper from '../Layout/Wrapper'
import { CgSearch } from 'react-icons/cg'
import { useFetch } from '../Hooks/useFetch'
import { api } from '../API/api'
import toast from 'react-hot-toast'
import { FaPencil } from 'react-icons/fa6'

const BASE_URL = import.meta.env.VITE_BASE_URL

const PendingModal = ({ invoice, fetchData, setSelectedOrder }) => {
    const [received, setReceived] = useState(null)

    const handleReceived = async () => {
        try {
            if (received === null || received <= 0) {
                toast.error('Please enter a valid amount')
            } else {
                const response = await api.patch(
                    `/invoices/update-pending-amount/${invoice._id}`,
                    {
                        amount: received,
                    },
                )
                if (response.status === 200) {
                    toast.success(response.data.message)
                    fetchData()
                    setSelectedOrder(null)
                }
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    return (
        <>
            <dialog id='my_modal_3' className='modal'>
                <div className='modal-box'>
                    <h3 className='font-bold text-2xl text-center'>
                        {invoice.title}
                    </h3>
                    <div className='flex flex-col justify-start items-start gap-y-2'>
                        <span className='flex flex-row gap-x-2 font-medium'>
                            TOTAL AMOUNT:
                            <span className='text-darkorange  '>
                                {invoice.total_price}
                            </span>
                        </span>
                        <span className='flex flex-row gap-x-2 font-medium'>
                            PENDING AMOUNT:
                            <span className='text-darkorange  '>
                                {invoice.pending_amount}
                            </span>
                        </span>
                        <input
                            type='number'
                            name='received'
                            id='received'
                            placeholder='Enter Received Amount'
                            required
                            onChange={(e) => setReceived(e.target.value)}
                            className='input input-sm input-bordered w-full max-w-xs'
                        />
                        <button
                            className='btn btn-sm btn-primary ml-auto'
                            onClick={handleReceived}
                        >
                            Add
                        </button>
                    </div>
                </div>
                <form
                    method='dialog'
                    className='modal-backdrop backdrop-blur-sm '
                >
                    <button>close</button>
                </form>
            </dialog>
        </>
    )
}

const EditModal = ({ invoice, fetchData, setSelectedOrder }) => {
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
                    <div className='flex flex-col  mt-3 gap-y-3'>
                        <div className='flex flex-col gap-y-2'>
                            {invoice.services.map((service, i) => (
                                <>
                                    <div
                                        key={i}
                                        className='flex flex-col gap-y-2'
                                    >
                                        {service.employees?.map((employee) => (
                                            <div
                                                key={employee.name}
                                                className='flex flex-row justify-between gap-x-5 items-center'
                                            >
                                                <span className='badge badge-primary'>
                                                    {employee.name ||
                                                        'No employees'}
                                                </span>
                                                <span>
                                                    {employee.status ||
                                                        invoice.status}
                                                </span>
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
                                    <div>
                                        {service.employees.length === 0 && (
                                            <div className='flex flex-row justify-between gap-x-5 items-center'>
                                                <span className='badge badge-primary'>
                                                    No employees
                                                </span>
                                                <span>{invoice.status}</span>
                                                <select
                                                    name='changeStatus'
                                                    id='changeStatus'
                                                    className='select select-bordered select-sm'
                                                    onChange={(e) =>
                                                        handleInvoiceStatus(
                                                            e.target.value,
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
                                        )}
                                    </div>
                                </>
                            ))}
                        </div>
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
    const [filteredOrders, setFilteredOrders] = useState(null)
    const [editPending, setEditPending] = useState(false)

    const showModal = () => {
        document.getElementById('my_modal_2').showModal()
    }
    const handleOrderChange = (order) => {
        setSelectedOrder(order)
        showModal()
    }

    const showModal3 = () => {
        document.getElementById('my_modal_3').showModal()
    }
    const handlePendingAmount = (item) => {
        setEditPending(true)
        setSelectedOrder(item)
        showModal3()
    }

    const handleInputChange = (e) => {
        const value = e.target.value
        setFilteredOrders(
            orders.filter((order) =>
                order.company.toLowerCase().includes(value.toLowerCase()),
            ),
        )
    }

    useEffect(() => {
        setFilteredOrders(orders)
    }, [orders])

    return (
        <>
            <Wrapper title={'All Orders'}>
                <div className='flex  justify-between items-center  gap-x-20 lg:pt-4 px-5'>
                    <div className='relative w-full'>
                        <input
                            type='text'
                            className='w-full lg:py-1 pl-5 lg:rounded-2xl bg-bgLight border-2 border-gray-700 text-white'
                            placeholder='Search Company'
                            onChange={(e) => handleInputChange(e)}
                        />
                        <CgSearch className='text-slate-700 m-auto absolute lg:right-5 lg:top-3  ' />
                    </div>
                </div>
                <div className='overflow-x-auto  bg-bgLight max-h-[76vh] mt-10 mx-5 rounded-xl '>
                    <table className='table'>
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
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrders?.map((item) => (
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
                                                            key={
                                                                service.service
                                                            }
                                                            className='badge mb-1'
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
                                                            className='badge mb-1'
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
                                        <td>
                                            <button
                                                className='btn btn-xs'
                                                onClick={() =>
                                                    handlePendingAmount(item)
                                                }
                                            >
                                                Edit
                                            </button>
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
                    {editPending && selectedOrder && (
                        <PendingModal
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

import { useState } from 'react'
import AppLayout from '../Layout/AppLayout'
import Wrapper from '../Layout/Wrapper'
import { CgSearch } from 'react-icons/cg'
import { useFetch } from '../Hooks/useFetch'
import { FaPencilAlt } from 'react-icons/fa'
import { api } from '../API/api'
import { useEffect } from 'react'
import toast from 'react-hot-toast'

const BASE_URL = import.meta.env.VITE_BASE_URL
const EditStatus = ({ fetchData, invoice, toggle }) => {
    const [updateStatus, setUpdateStatus] = useState(null)
    const [selectedOrder, setSelectedOrder] = useState(null)

    const handleStatusChange = (id, employee, status) => {
        setUpdateStatus({
            id,
            employee,
            status: status,
        })
    }

    useEffect(() => {
        const updateStatusHandler = async () => {
            try {
                if (updateStatus) {
                    const dataToSend = {
                        employee: updateStatus.employee,
                        status: updateStatus.status,
                    }
                    const response = await api.put(
                        `${BASE_URL}/invoices/${invoiceId}`,
                        dataToSend,
                    )
                    if (response.status === 201) {
                        toast.success('Status updated successfully')
                        fetchData()
                        setUpdateStatus(null)
                        document.getElementById('my_modal_2').close()
                    }
                }
            } catch (error) {
                console.log(error)
            }
        }
        updateStatusHandler()
    }, [updateStatus])

    return (
        <>
            {toggle && (
                <dialog id='my_modal_2' className='modal'>
                    <div className='modal-box  max-w-3xl'>
                        <h3 className='text-2xl text-lightGold font-bold text-center mb-6'>
                            Update Order Status
                        </h3>
                        {selectedOrder?.map((order) => (
                            <div
                                className='flex flex-row justify-between items-center gap-x-10'
                                key={order?._id}
                            >
                                <p className='text-lg text-lightGold font-semibold'>
                                    {order?.employee}
                                </p>
                                <p className='flex flex-col -mt-4'>
                                    <span className='text-xs text-lightGold'>
                                        Current Status:
                                    </span>
                                    <span>{order?.status}</span>
                                </p>
                                <select
                                    id={`status_${order?._id}`}
                                    onChange={(e) =>
                                        handleStatusChange(
                                            order?.invoice_id,
                                            order?.employee,
                                            e.target.value,
                                        )
                                    }
                                    className='p-2 bg-bgLight border-2 border-gray-700'
                                ></select>
                            </div>
                        ))}
                    </div>
                    <form method='dialog' className='modal-backdrop'>
                        <button>close</button>
                    </form>
                </dialog>
            )}
        </>
    )
}

const Orders = () => {
    const { data: orders, fetchData } = useFetch('invoices')
    const [selectedEmployee, setSelectedEmployee] = useState(null)
    const [selectedInvoice, setSelectedInvoice] = useState(null)
    const [currentStatus, setCurrentStatus] = useState(null)
    const [updateStatus, setUpdateStatus] = useState(null)

    const handleEmployeeChange = (e, invoiceID) => {
        setSelectedEmployee(e.target.value)
        setSelectedInvoice(invoiceID)
    }

    useEffect(() => {
        const getInvoiceDetails = async () => {
            if (selectedInvoice && selectedEmployee) {
                try {
                    const response = await api.get(
                        `${BASE_URL}/invoices/${selectedInvoice}/${selectedEmployee}`,
                    )
                    const data = response.data.data[0]
                    setCurrentStatus(data.status)
                } catch (error) {
                    console.log(error)
                }
            }
        }
        getInvoiceDetails()
    }, [selectedEmployee, selectedInvoice])

    const handleUpdateStatusChange = (e) => {
        setUpdateStatus(e.target.value)
    }

    useEffect(() => {
        const changeEmployeeStatus = async (invoiceID) => {
            if (currentStatus && selectedEmployee) {
                try {
                    const dataToSend = {
                        employee: selectedEmployee,
                        status: updateStatus,
                    }
                    const response = await api.put(
                        `${BASE_URL}/invoices/${invoiceID}`,
                        dataToSend,
                    )
                    if (response.status === 200) {
                        toast.success('Status updated successfully')
                        fetchData()
                        setCurrentStatus(updateStatus)
                    }
                } catch (error) {
                    console.log(error)
                }
            }
        }
        changeEmployeeStatus(selectedInvoice)
    }, [updateStatus])

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
                                <th>Order ID</th>
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
                                            {item._id}
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
                                                        <span key={service}>
                                                            {service.quantity}
                                                        </span>
                                                    ),
                                                )}
                                            </div>
                                        </td>
                                        <td className='text-white'>
                                            {item.total_price}
                                        </td>
                                        <td>
                                            <select
                                                name='employee'
                                                id='employee'
                                                onChange={(e) => {
                                                    handleEmployeeChange(
                                                        e,
                                                        item._id,
                                                    )
                                                }}
                                                className='p-2 bg-bgLight border-2 border-gray-700'
                                            >
                                                <option value=''>Select</option>
                                                {item.services.map((service) =>
                                                    service.employees.map(
                                                        (employee) => (
                                                            <option
                                                                key={employee}
                                                            >
                                                                {employee}
                                                            </option>
                                                        ),
                                                    ),
                                                )}
                                            </select>
                                        </td>
                                        <td>
                                            {currentStatus
                                                ? currentStatus
                                                : 'Select any employee'}
                                        </td>
                                        <td>
                                            {selectedEmployee &&
                                            currentStatus ? (
                                                <select
                                                    name='updatedStatus'
                                                    id='updatedStatus'
                                                    className='p-2 bg-bgLight border-2 border-gray-700'
                                                    onChange={(e) => {
                                                        handleUpdateStatusChange(
                                                            e,
                                                        )
                                                    }}
                                                >
                                                    <option value='waiting for payment'>
                                                        Waiting For Payment
                                                    </option>
                                                    <option value='documents received'>
                                                        {' '}
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
                                            ) : (
                                                'Select any employee to change status'
                                            )}
                                        </td>
                                    </tr>
                                </>
                            ))}
                        </tbody>
                    </table>

                    {/* <EditStatus
                        fetchData={fetchData}
                        invoice={selectedInvoice}
                        toggle={toggle}
                    /> */}
                </div>
            </Wrapper>
        </>
    )
}

export default AppLayout()(Orders)

import React, { useEffect, useState, useMemo } from 'react'
import Wrapper from '../Layout/Wrapper'
import { CgSearch } from 'react-icons/cg'
import { useFetch } from '../Hooks/useFetch'
import { api } from '../API/api'
import toast from 'react-hot-toast'
import EditEmployee from './EditEmployee'
import { createPortal } from 'react-dom'

const ViewEmployee = ({ employee, fetchData, hideModal }) => {
    const deleteDocument = async (doc) => {
        try {
            const confirm = window.confirm('Are you sure you want to delete?')
            if (!confirm) return
            const response = await api.put(`/employee/delete-file`, {
                employee_id: employee?._id,
                document: doc.fileName,
            })
            if (response.status === 200) {
                toast.success(response.data.message)
                fetchData()
                hideModal()
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    return (
        <>
            <dialog id='my_modal_2' className='modal bg-black/50'>
                <div className='modal-box '>
                    <h3 className='font-bold text-lg text-white'>
                        Remove Employee Documents
                    </h3>
                    <div className='py-3 flex justify-center items-center gap-x-2'>
                        <div className='flex flex-col justify-start items-start gap-y-2 flex-wrap'>
                            {employee?.documents?.map((doc) => (
                                <div
                                    key={doc?._id}
                                    className='flex flex-row justify-between items-center gap-x-4'
                                >
                                    <a
                                        href={doc?.url}
                                        target='_blank'
                                        className='btn btn-xs btn-warning btn-outline text-gray-900 ml-auto'
                                    >
                                        {doc?.fileName}
                                    </a>
                                    <button
                                        className='btn btn-xs btn-error'
                                        onClick={() => deleteDocument(doc)}
                                    >
                                        Delete Document
                                    </button>
                                </div>
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

const Employees = ({ id }) => {
    const toggleModal = (employ) => {
        setSelectedEmployee(employ)
        document.getElementById('my_modal_2').showModal()
    }
    const hideModal = () => {
        document.getElementById('my_modal_2').close()
    }

    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 1
    const [editModal, setEditModal] = React.useState(false)
    const { data: employees, fetchData } = useFetch(`employee/${id}`)
    const [selectedEmployee, setSelectedEmployee] = React.useState(null)
    const [filteredEmployees, setFilteredEmployees] = React.useState([])
    const [searchQuery, setSearchQuery] = React.useState('')
    const [expiredFilter, setExpiredFilter] = React.useState(false)

    useEffect(() => {
        setFilteredEmployees(employees)
    }, [employees])

    const deleteEmployee = async (employeeId) => {
        const confirm = window.confirm('Are you sure you want to delete?')
        if (!confirm) return

        try {
            const response = await api.delete(
                `/employee/delete-employee/${employeeId}`,
            )
            if (response.status === 200) {
                toast.success(response.data.message)
                fetchData()
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    const handleEdit = (employee) => {
        setSelectedEmployee(employee)
        setEditModal(true)
    }

    useEffect(() => {
        if (searchQuery) {
            const filtered = employees.filter((employee) =>
                employee?.name
                    ?.toLowerCase()
                    .includes(searchQuery?.toLowerCase()),
            )
            setFilteredEmployees(filtered)
        } else {
            setFilteredEmployees(employees)
        }
    }, [searchQuery])

    useEffect(() => {
        if (expiredFilter) {
            let expiredEmployees = []
            const checkAlreadyExists = (employee) => {
                return expiredEmployees.includes(employee)
            }

            for (let i = 0; i < filteredEmployees?.length; i++) {
                if (
                    new Date().getTime() >
                        new Date(
                            filteredEmployees[i].labor_card_expiry,
                        ).getTime() &&
                    !checkAlreadyExists(filteredEmployees[i])
                ) {
                    expiredEmployees.push(filteredEmployees[i])
                } else if (
                    new Date().getTime() >
                        new Date(filteredEmployees[i].eid_expiry).getTime() &&
                    !checkAlreadyExists(filteredEmployees[i])
                ) {
                    expiredEmployees.push(filteredEmployees[i])
                } else if (
                    new Date().getTime() >
                        new Date(
                            filteredEmployees[i].passport_expiry,
                        ).getTime() &&
                    !checkAlreadyExists(filteredEmployees[i])
                ) {
                    expiredEmployees.push(filteredEmployees[i])
                }
            }
            if (expiredEmployees.length > 0)
                setFilteredEmployees(expiredEmployees)
        } else {
            setFilteredEmployees(employees)
        }
    }, [expiredFilter])

    return (
        <Wrapper title='Employees'>
            <div className='flex justify-between gap-x-20 lg:pt-4 px-5'>
                <div className='relative'>
                    <input
                        type='text'
                        className='w-full lg:py-1 pl-5 lg:rounded-2xl bg-bgLight border-2 border-gray-700 text-white'
                        placeholder='Search Employee'
                        onChange={(e) => {
                            setSearchQuery(e.target.value)
                        }}
                    />
                    <CgSearch className='text-slate-700 m-auto absolute lg:right-5 lg:top-3' />
                </div>
                <div className='flex justify-center items-center gap-x-3'>
                    <span
                        className={`badge p-2 cursor-pointer ${
                            expiredFilter && 'text-white badge-ghost'
                        }`}
                        onClick={() => setExpiredFilter(true)}
                    >
                        Expired Employees
                    </span>
                    <span
                        className={`badge p-2 cursor-pointer ${
                            !expiredFilter && 'text-white badge-ghost'
                        }`}
                        onClick={() => setExpiredFilter(false)}
                    >
                        All Employees
                    </span>
                </div>
            </div>
            <div className='grid grid-cols-3 gap-4 mx-5 mt-3'>
                {filteredEmployees?.map((employee) => (
                    <>
                        <div
                            className='bg-gradient-to-r from-bgLight to-bgDarkColor text-white shadow-2xl flex justify-center flex-col p-5 gap-y-5 min-h-36'
                            key={employee._id}
                        >
                            <h2 className='font-extrabold flex flex-row justify-between items-center gap-x-2 text-xl'>
                                <span className=''>Name: </span>
                                <span className='text-left text-lightGold uppercase whitespace-normal w-[300px] break-words'>
                                    {employee?.name}
                                </span>
                            </h2>
                            <div className='flex flex-col gap-y-1'>
                                <p className='flex flex-row justify-between items-center'>
                                    <span>Nationality</span>
                                    <span className='border-b border-dashed'>
                                        {employee?.nationality}
                                    </span>
                                </p>
                                <p className='flex flex-row justify-between items-center'>
                                    <span>Labor Card Expiry</span>
                                    <span className='border-b border-dashed'>
                                        {new Date(
                                            employee?.labor_card_expiry,
                                        ).toLocaleDateString()}
                                    </span>
                                </p>
                                <p className='flex flex-row justify-between items-center'>
                                    <span>Labor Card No.</span>
                                    <span className='border-b border-dashed'>
                                        {employee?.labor_card_no}
                                    </span>
                                </p>
                                <p className='flex flex-row justify-between items-center'>
                                    <span>EID No.</span>
                                    <span className='border-b border-dashed'>
                                        {employee?.eid_no}
                                    </span>
                                </p>
                                <p className='flex flex-row justify-between items-center'>
                                    <span>EID Expiry</span>
                                    <span className='border-b border-dashed'>
                                        {new Date(
                                            employee?.eid_expiry,
                                        ).toLocaleDateString()}
                                    </span>
                                </p>
                                <p className='flex flex-row justify-between items-center'>
                                    <span>Passport No</span>
                                    <span className='border-b border-dashed'>
                                        {employee?.passport_no}
                                    </span>
                                </p>
                                <p className='flex flex-row justify-between items-center'>
                                    <span>Passport Expiry</span>
                                    <span className='border-b border-dashed'>
                                        {new Date(
                                            employee?.passport_expiry,
                                        ).toLocaleDateString()}
                                    </span>
                                </p>
                            </div>
                            <div className='flex justify-between items-center gap-x-3'>
                                <button
                                    className='btn btn-xs btn-outline text-white'
                                    onClick={() => toggleModal(employee)}
                                >
                                    View Documents
                                </button>
                                <button
                                    className='btn btn-xs text-white bg-red-400 border-none hover:bg-red-500'
                                    onClick={() =>
                                        deleteEmployee(employee?._id)
                                    }
                                >
                                    Delete Employee
                                </button>
                                <button
                                    className='btn btn-xs'
                                    onClick={() => handleEdit(employee)}
                                >
                                    Edit Employee
                                </button>
                            </div>
                        </div>
                        <ViewEmployee
                            employee={selectedEmployee}
                            fetchData={fetchData}
                            hideModal={hideModal}
                        />
                        {editModal &&
                            createPortal(
                                <EditEmployee
                                    id={id}
                                    data={selectedEmployee}
                                    fetchData={fetchData}
                                    setEditModal={setEditModal}
                                    setSelectedEmployee={setSelectedEmployee}
                                />,
                                document.getElementById('modal'),
                            )}
                    </>
                ))}
                {filteredEmployees?.length === 0 && (
                    <div className='text-center'>
                        <h1 className='text-3xl font-bold text-white'>
                            No Employee
                        </h1>
                    </div>
                )}
            </div>
        </Wrapper>
    )
}

export default Employees

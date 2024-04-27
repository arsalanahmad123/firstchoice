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

    const itemsPerPage = 10

    const [editModal, setEditModal] = React.useState(false)

    const { data: employees, fetchData } = useFetch(`employee/${id}`)
    const [selectedEmployee, setSelectedEmployee] = React.useState(null)
    const [filteredEmployees, setFilteredEmployees] = React.useState(null)
    const [searchQuery, setSearchQuery] = React.useState('')
    const [expired, setExpired] = React.useState(false)

    const displayedEmployees = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage
        const endIndex = startIndex + itemsPerPage
        return filteredEmployees?.slice(startIndex, endIndex)
    }, [filteredEmployees, currentPage])

    const loadNextPage = () => {
        setCurrentPage(currentPage + 1)
    }

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
        setFilteredEmployees(employees)
    }, [employees])

    const handleInputChange = (e) => {
        const value = e.target.value
        setSearchQuery(value)
        const filtered = employees.filter((employee) => {
            return employee?.name?.toLowerCase().includes(value.toLowerCase())
        })
        setFilteredEmployees(filtered)
    }

    useEffect(() => {
        if (expired) {
            let expiredEmployees = []
            const checkAlreadyExists = (employee) => {
                if (expiredEmployees.includes(employee)) return true
                return false
            }

            for (let i = 0; i < filteredEmployees?.length; i++) {
                if (
                    new Date().toLocaleDateString() >
                        new Date(
                            filteredEmployees[i].eid_expiry,
                        ).toLocaleDateString() &&
                    !checkAlreadyExists(filteredEmployees[i].name)
                ) {
                    expiredEmployees.push(filteredEmployees[i])
                } else if (
                    new Date().toLocaleDateString() >
                        new Date(
                            filteredEmployees[i].labor_card_expiry,
                        ).toLocaleDateString() &&
                    !checkAlreadyExists(filteredEmployees[i].name)
                ) {
                    expiredEmployees.push(filteredEmployees[i])
                } else if (
                    new Date().toLocaleDateString() >
                        new Date(
                            filteredEmployees[i].passport_expiry,
                        ).toLocaleDateString() &&
                    !checkAlreadyExists(filteredEmployees[i].name)
                ) {
                    expiredEmployees.push(filteredEmployees[i])
                }
            }
            if (expiredEmployees.length > 0)
                setFilteredEmployees(expiredEmployees)
        } else {
            setFilteredEmployees(employees)
        }
    }, [expired])

    return (
        <Wrapper title='Employees'>
            <div className='flex  justify-between  gap-x-20 lg:pt-4 px-5'>
                <div className='relative'>
                    <input
                        type='text'
                        className='w-full lg:py-1 pl-5 lg:rounded-2xl bg-bgLight border-2 border-gray-700 text-white'
                        placeholder='Search Employee'
                        onChange={(e) => {
                            handleInputChange(e)
                        }}
                    />
                    <CgSearch className='text-slate-700 m-auto absolute lg:right-5 lg:top-3  ' />
                </div>
                <div className='flex justify-center items-center gap-x-3'>
                    <span
                        className={`badge p-2 cursor-pointer ${
                            expired && 'text-white badge-ghost'
                        }`}
                        onClick={() => setExpired(true)}
                    >
                        Expired Employees
                    </span>
                    <span
                        className={`badge p-2 cursor-pointer ${
                            !expired && 'text-white badge-ghost'
                        }`}
                        onClick={() => setExpired(false)}
                    >
                        All Employees
                    </span>
                </div>
            </div>
            <div
                className='grid grid-cols-3 gap-4 mx-5 mt-3
                '
            >
                {filteredEmployees?.map((employee, i) => (
                    <>
                        <div
                            className=' bg-gradient-to-r from-bgLight to-bgDarkColor text-white shadow-2xl  flex justify-center flex-col p-5 gap-y-5  min-h-36'
                            key={employee?._id}
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
                                        ).getDate()}
                                        /
                                        {new Date(
                                            employee?.labor_card_expiry,
                                        ).getMonth() + 1}
                                        /
                                        {new Date(
                                            employee?.labor_card_expiry,
                                        ).getFullYear()}
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
                                        ).getDate()}
                                        /
                                        {new Date(
                                            employee?.eid_expiry,
                                        ).getMonth() + 1}
                                        /
                                        {new Date(
                                            employee?.eid_expiry,
                                        ).getFullYear()}
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
                                        ).getDate()}
                                        /
                                        {new Date(
                                            employee?.passport_expiry,
                                        ).getMonth() + 1}
                                        /
                                        {new Date(
                                            employee?.passport_expiry,
                                        ).getFullYear()}
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
                            key={employee?._id}
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
                            No Employee Found
                        </h1>
                    </div>
                )}
            </div>
            {displayedEmployees?.length < employees?.length &&
                filteredEmployees?.length > 0 &&
                searchQuery === '' &&
                !expired(
                    <button
                        className='text-gray-900 font-bold mx-auto w-52 px-2 lg:py-1 lg:rounded-2xl bg-lightGold mt-2'
                        onClick={loadNextPage}
                    >
                        Load More
                    </button>,
                )}
        </Wrapper>
    )
}

export default Employees

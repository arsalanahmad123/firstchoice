import { useState, useEffect, useRef, useCallback } from 'react'
import Wrapper from '../Layout/Wrapper'
import Logo from '../assets/logo.png'
import { useFetch } from '../Hooks/useFetch'
import { api } from '../API/api'
import { FaEdit } from 'react-icons/fa'
import toast from 'react-hot-toast'

const BASE_URL = import.meta.env.VITE_BASE_URL
const ServiceRow = ({
    handleRemoveServiceRow,
    Id,
    Services,
    company,
    Create,
    handleNewServiceRow,
}) => {
    const [service, setService] = useState(null)
    const [totalPrice, setTotalPrice] = useState(0)
    const [costPrice, setCostPrice] = useState(0)
    const [pendingAmount, setPendingAmount] = useState(0)
    const [selectedServices, setSelectedServices] = useState([])
    const [sale_price, setSale_price] = useState(0)
    const [selectedEmployees, setSelectedEmployees] = useState([])
    const [quantity, setQuantity] = useState(1)
    const employeeDropDownRef = useRef()
    const { data: employees } = useFetch(`employee/${company._id}`)
    const handleOutsideClick = useCallback((event) => {
        if (
            employeeDropDownRef.current &&
            !employeeDropDownRef.current.contains(event.target)
        ) {
            document.getElementById('employeeDropdown').classList.add('hidden')
        }
    }, [])

    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick)
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick)
        }
    }, [handleOutsideClick])

    const handleEmployeeSearchInput = () => {
        const dropdown = document.getElementById('employeeDropdown')
        dropdown.classList.remove('hidden')
        dropdown.classList.add('flex')
    }

    const handleEmployeeCheck = (employee) => {
        if (!selectedEmployees.some((selected) => selected._id === employee)) {
            setSelectedEmployees([...selectedEmployees, employee])
        }
    }

    const handleEmployeeUncheck = (employeeId) => {
        const updatedSelectedEmployees = selectedEmployees.filter(
            (selected) => selected !== employeeId,
        )
        setSelectedEmployees(updatedSelectedEmployees)
    }

    const AddServiceRow = async () => {
        const Service = selectedServices.find((s) => s.service === service)
        if (Service) {
            toast.error('Service already exists')
            return
        }
        try {
            if (
                !service ||
                !sale_price ||
                !quantity ||
                !selectedEmployees ||
                !company
            ) {
                toast.error('All fields are required')
                return
            }

            const data = {
                id: Id,
                service,
                sale_price,
                quantity,
                employees: selectedEmployees,
                company: company.username,
            }

            setSelectedServices([...selectedServices, data])
            setTotalPrice(Number(totalPrice) + Number(sale_price)),
                setService(null),
                setSale_price(0),
                setSelectedEmployees([]),
                toast.success('Service row added successfully')
            handleNewServiceRow()
        } catch (error) {
            console.log(error)
            toast.error('Something went wrong')
        }
    }

    const handleServiceChange = (e) => {
        setService(e.target.value)
        const Service = Services.find((s) => s.name === e.target.value)
        setCostPrice(costPrice + Service.cost_price)
    }

    useEffect(() => {
        if (selectedServices.length === 0 || !company) {
            return
        }
        if (Create) {
            try {
                const response = api.post(
                    `${BASE_URL}/invoices/generate-invoice`,
                    {
                        company: company._id,
                        services: selectedServices,
                        total_price: totalPrice,
                        pending_amount: costPrice - totalPrice,
                    },
                )
                console.log(response)
            } catch (error) {
                console.log(error)
            }
        }
    }, [Create])

    console.log(selectedEmployees)

    return (
        <>
            <tr>
                <td>
                    <select
                        name='service'
                        id='service'
                        className=' bg-bgDarkColor  text-white rounded-md  py-1  px-5 focus:outline-none  ring-0 border-0'
                        onChange={handleServiceChange}
                    >
                        {Services?.map((service) => (
                            <option value={service.name} key={service._id}>
                                {service.name}
                            </option>
                        ))}
                    </select>
                </td>
                <td>
                    <input
                        type='number'
                        name='quantity'
                        id={`quantity-${Id}`}
                        value={
                            selectedServices.find((s) => s.id === Id)?.quantity
                        }
                        onChange={(e) => setQuantity(e.target.value)}
                        className=' bg-bgDarkColor  text-white rounded-md  py-1 pl-2 focus:outline-none  ring-0 border-0 w-14'
                    />
                </td>
                <td className='relative'>
                    <input
                        type='search'
                        name='employeeSearch'
                        onClick={handleEmployeeSearchInput}
                        placeholder='Search Employee'
                        className=' bg-bgDarkColor  text-white rounded-md  py-1 w-36 focus:outline-none pl-1  ring-0 border-0 shadow-lg '
                    />
                    <div
                        className='absolute top-11 left-4  items-center bg-lightGold flex-col w-36 p-2 rounded-xl hidden max-h-36 overflow-y-auto'
                        id='employeeDropdown'
                        ref={employeeDropDownRef}
                    >
                        {employees?.map((employee) => (
                            <div
                                key={employee._id}
                                className='flex justify-between items-center w-full'
                            >
                                <input
                                    type='checkbox'
                                    name='employee'
                                    id='employee'
                                    className='checkbox checkbox-sm bg-gray-900 '
                                    checked={selectedEmployees.includes(
                                        employee._id,
                                    )}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            handleEmployeeCheck(employee._id)
                                        } else {
                                            handleEmployeeUncheck(employee._id)
                                        }
                                    }}
                                />
                                <span className='text-gray-900 text-lg'>
                                    {employee.name}
                                </span>
                            </div>
                        ))}
                    </div>
                </td>
                <td>
                    AED{' '}
                    <input
                        type='number'
                        name='price'
                        id='price'
                        value={sale_price}
                        onChange={(e) => setSale_price(e.target.value)}
                        className=' bg-bgDarkColor  text-white rounded-md  py-1 w-16 pl-1 focus:outline-none  ring-0 border-0'
                    />
                </td>
                <td className='flex flex-row gap-x-2'>
                    <button
                        className='btn btn-xs btn-outline btn-success'
                        onClick={AddServiceRow}
                    >
                        ADD
                    </button>
                    <button
                        className='btn btn-xs btn-outline btn-error'
                        onClick={() => handleRemoveServiceRow(Id)}
                    >
                        REMOVE
                    </button>
                </td>
            </tr>
        </>
    )
}
const Add_Invoice = () => {
    const { data: services } = useFetch('services')
    const { data: companies } = useFetch('companies')

    const companiesRef = useRef(null)
    const [rows, setRows] = useState([{ id: 1 }])
    const [selectedCompany, setSelectedCompany] = useState(null)
    const [filteredCompanies, setFilteredCompanies] = useState(null)
    const [create, setCreate] = useState(false)

    const handleNewServiceRow = () => {
        const newRow = { id: rows.length + 1 }
        setRows([...rows, newRow])
    }

    const handleRemoveServiceRow = (id) => {
        const newRows = rows.filter((row) => row.id !== id)
        setRows(newRows)
    }

    const handleCompanySearchInput = (e) => {
        const query = e.target.value
        if (query) {
            const filtered = companies?.filter((company) =>
                company.username.toLowerCase().includes(query.toLowerCase()),
            )
            setFilteredCompanies(filtered)
        } else {
            setFilteredCompanies(companies)
        }
    }

    const companiesOutsideClick = useCallback((event) => {
        if (
            companiesRef.current &&
            !companiesRef.current.contains(event.target)
        ) {
            document.getElementById('companyDropdown').classList.add('hidden')
        }
    }, [])

    useEffect(() => {
        document.addEventListener('mousedown', companiesOutsideClick)
        return () => {
            document.removeEventListener('mousedown', companiesOutsideClick)
        }
    }, [companiesOutsideClick])

    const showFilteredCompanies = () => {
        const dropdown = document.getElementById('companyDropdown')
        dropdown.classList.remove('hidden')
        setFilteredCompanies(companies)
    }

    return (
        <>
            <Wrapper title={'Add Invoice'}>
                <div className='flex justify-start items-start  max-h-[70vh] flex-col mx-5 mt-2 shadow-2xl shadow-bgLight bg-bgLight'>
                    <div className='w-full flex flex-row p-5 justify-between items-center rounded-md'>
                        <div className='flex flex-col justify-between items-start gap-y-3'>
                            <h1 className='text-4xl font-bold text-lightGold'>
                                INVOICE
                            </h1>
                            <div className='flex flex-col gap-y-1'>
                                <p className='text-xl font-semibold text-lightGold'>
                                    BILLED TO
                                </p>
                                <div className='relative'>
                                    {selectedCompany ? (
                                        <div className='flex justify-between items-center w-full gap-x-3'>
                                            <p className='text-lg border-b border-gray-600 border-dashed'>
                                                {selectedCompany.username}
                                            </p>
                                            <FaEdit
                                                className='text-lightGold cursor-pointer'
                                                onClick={() =>
                                                    setSelectedCompany(null)
                                                }
                                            />
                                        </div>
                                    ) : (
                                        <input
                                            type='text'
                                            name='company'
                                            id='company'
                                            onChange={handleCompanySearchInput}
                                            onClick={showFilteredCompanies}
                                            placeholder='Search Company'
                                            className=' bg-bgDarkColor  text-sm text-white rounded-lg  py-1  px-5 focus:outline-none w-full ring-0 border-0 disabled:cursor-not-allowed shadow-lg'
                                        />
                                    )}

                                    <div
                                        className='absolute top-7 left-0 bg-bgDarkColor w-full text-lightGold p-3 rounded-lg max-h-60 overflow-y-auto hidden'
                                        id='companyDropdown'
                                        ref={companiesRef}
                                    >
                                        {filteredCompanies?.map((company) => (
                                            <div
                                                key={company._id}
                                                className='flex justify-between items-center w-full'
                                            >
                                                <input
                                                    type='radio'
                                                    name='company'
                                                    id='company'
                                                    className='radio radio-sm bg-gray-900 '
                                                    onClick={() => {
                                                        setSelectedCompany(
                                                            company,
                                                        )
                                                        companiesRef.current.classList.add(
                                                            'hidden',
                                                        )
                                                    }}
                                                />
                                                <span className=' text-lg'>
                                                    {company.username}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col justify-between items-start gap-y-3'>
                            <img
                                src={Logo}
                                alt='Company Logo'
                                className='h-20'
                            />
                            <div className='flex flex-col gap-y-1'>
                                <p className='text-xl font-semibold text-lightGold'>
                                    INVOICE DETAILS
                                </p>
                                <span className='flex flex-row justify-between items-center'>
                                    <span className='text-lg  font-normal italic text-lightGold'>
                                        Invoice#
                                    </span>
                                    <span>12837</span>
                                </span>
                                <span className='flex flex-row justify-center items-center gap-x-5'>
                                    <span className='text-lg  font-normal italic text-lightGold'>
                                        Date Of Issue
                                    </span>
                                    <span>
                                        {new Date().toLocaleDateString()}
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>
                    {selectedCompany && (
                        <>
                            <div className='overflow-x-auto w-full min-h-[30vh]'>
                                <table className='table'>
                                    <thead>
                                        <tr>
                                            <th>Service</th>
                                            <th>Quantity</th>
                                            <th>Employees</th>
                                            <th>Price</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody id='invoice-body'>
                                        {rows.map((row, i) => (
                                            <ServiceRow
                                                key={i}
                                                Id={row.id}
                                                handleRemoveServiceRow={
                                                    handleRemoveServiceRow
                                                }
                                                Services={services}
                                                company={selectedCompany}
                                                Create={create}
                                                handleNewServiceRow={
                                                    handleNewServiceRow
                                                }
                                            />
                                        ))}
                                    </tbody>
                                </table>
                                <button
                                    className='btn btn-sm btn-outline btn-primary mt-3 ml-3'
                                    onClick={handleNewServiceRow}
                                >
                                    Add New Service
                                </button>
                            </div>
                            <button
                                className='px-4 py-1 bg-lightGold text-gray-900 rounded-lg ml-auto disabled:cursor-not-allowed'
                                id='submitBtn'
                                onClick={() => {
                                    setCreate(!create)
                                    document
                                        .getElementById('submitBtn')
                                        .setAttribute('disabled', true)
                                }}
                            >
                                Create
                            </button>
                        </>
                    )}
                </div>
            </Wrapper>
        </>
    )
}

export default Add_Invoice

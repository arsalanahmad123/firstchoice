import { useState, useEffect, useRef, useCallback } from 'react'
import Wrapper from '../Layout/Wrapper'
import Logo from '../assets/logo.png'
import { useFetch } from '../Hooks/useFetch'
import { api } from '../API/api'
import { FaEdit } from 'react-icons/fa'
import toast from 'react-hot-toast'

const BASE_URL = import.meta.env.VITE_BASE_URL
const ServiceRow = ({}) => {
    return (
        <>
            <div className='overflow-x-auto w-full min-h-[30vh]'>
                <table>
                    <thead>
                        <tr>
                            <th className='text-white'>Service</th>
                            <th className='text-white'>Quantity</th>
                            <th className='text-white'>Price</th>
                            <th className='text-white'>Total</th>
                            <th className='text-white'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                {/* <select
                                name='service'
                                id='service'
                                className=' bg-bgDarkColor  text-white rounded-md  py-1  px-5 focus:outline-none  ring-0 border-0'
                                onChange={handleServiceChange}
                            >
                                {Services?.map((service) => (
                                    <option
                                        value={service.name}
                                        key={service._id}
                                    >
                                        {service.name}
                                    </option>
                                ))}
                            </select> */}
                            </td>
                            <td>
                                {/* <input
                                type='number'
                                name='quantity'
                                id={`quantity-${Id}`}
                                value={
                                    selectedServices.find((s) => s.id === Id)
                                        ?.quantity
                                }
                                onChange={(e) => setQuantity(e.target.value)}
                                className=' bg-bgDarkColor  text-white rounded-md  py-1 pl-2 focus:outline-none  ring-0 border-0 w-14'
                            /> */}
                            </td>
                            <td className='relative'>
                                {/* <input
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
                                                    handleEmployeeCheck(
                                                        employee._id,
                                                    )
                                                } else {
                                                    handleEmployeeUncheck(
                                                        employee._id,
                                                    )
                                                }
                                            }}
                                        />
                                        <span className='text-gray-900 text-lg'>
                                            {employee.name}
                                        </span>
                                    </div>
                                ))}
                            </div> */}
                            </td>
                            <td>
                                {/* AED{' '}
                            <input
                                type='number'
                                name='price'
                                id='price'
                                value={sale_price}
                                onChange={(e) => setSale_price(e.target.value)}
                                className=' bg-bgDarkColor  text-white rounded-md  py-1 w-16 pl-1 focus:outline-none  ring-0 border-0'
                            /> */}
                            </td>
                            <td className='flex flex-row gap-x-2'>
                                {/* <button
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
                            </button> */}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}
const Add_Invoice = () => {
    const { data: Companies } = useFetch('companies')
    const [selectedCompany, setSelectedCompany] = useState(null)
    const [filteredCompanies, setFilteredCompanies] = useState(null)

    const handleCompanySearchInput = useCallback((e) => {
        const query = e.target.value
        if (query) {
            const filtered = Companies?.filter((company) =>
                company.username.toLowerCase().includes(query.toLowerCase()),
            )
            setFilteredCompanies(filtered)
        } else {
            setFilteredCompanies(Companies)
        }
    }, [])

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
                                        <div className='flex flex-col gap-y-2'>
                                            <input
                                                type='text'
                                                name='companySearch'
                                                id='companySearch'
                                                placeholder='Search Company'
                                                onChange={
                                                    handleCompanySearchInput
                                                }
                                                className=' bg-bgDarkColor  text-sm text-white rounded-lg  py-1  px-5 focus:outline-none w-full ring-0 border-0 disabled:cursor-not-allowed shadow-lg'
                                            />
                                            <p className='text-xs text-lightGold'>
                                                Select Company
                                            </p>
                                        </div>
                                    )}

                                    <div
                                        className='absolute top-7 left-0 bg-bgDarkColor w-full text-lightGold p-3 rounded-lg max-h-60 overflow-y-auto hidden'
                                        id='companyDropdown'
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
                </div>
            </Wrapper>
        </>
    )
}

export default Add_Invoice

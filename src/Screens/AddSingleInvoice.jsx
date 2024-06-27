import { useState } from 'react'
import Wrapper from '../Layout/Wrapper'
import Logo from '../assets/logo.png'
import { useFetch } from '../Hooks/useFetch'
import { api } from '../API/api'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const BASE_URL = import.meta.env.VITE_BASE_URL
const ServiceRow = ({ Service, handleRemoveService }) => {
    return (
        <>
            <tr>
                <td>{Service.service}</td>
                <td>{Service.quantity}</td>
                <td className='relative'>AED {Service.sale_price}</td>
                <td>AED {Service.sale_price * Service.quantity}</td>
                <td className='flex flex-row gap-x-2'>
                    <button
                        className='btn btn-xs btn-outline btn-error'
                        onClick={() => handleRemoveService(Service.service)}
                    >
                        REMOVE
                    </button>
                </td>
            </tr>
        </>
    )
}
const AddSingleInvoice = () => {
    const { data: Services } = useFetch('services')
    const [company, setCompany] = useState('')
    const [service, setService] = useState(null)
    const [quantity, setQuantity] = useState('')
    const [selectedServices, setSelectedServices] = useState([])
    const [title, setTitle] = useState('')
    const [salePrice, setSalePrice] = useState('')
    const [totalPrice, setTotalPrice] = useState(0)
    const [submitting, setSubmitting] = useState(false)
    const [paidAmount, setPaidAmount] = useState(0)
    const navigate = useNavigate()

    const handleServiceChange = (e) => {
        const serviceFind = Services?.find((s) => s.name === e.target.value)
        setService(serviceFind.name)
    }

    const handleQuantityChange = (e) => {
        setQuantity(Number(e.target.value))
    }

    const handleSalePriceChange = (e) => {
        setSalePrice(Number(e.target.value))
    }

    const handleAddService = () => {
        if (!service || !quantity || !salePrice) {
            toast.error('Please fill all the fields')
            return
        }

        if (selectedServices.some((s) => s.service === service)) {
            toast.error('Service already added')
            return
        }

        setSelectedServices([
            ...selectedServices,
            {
                service,
                quantity,
                sale_price: salePrice,
            },
        ])

        setTotalPrice(Number(totalPrice) + Number(salePrice * quantity))
        setService(null)
        setQuantity(0)
        setSalePrice(0)
    }

    const handleRemoveService = (service) => {
        const filtered = selectedServices.filter((s) => s.service !== service)
        setSelectedServices(filtered)
        setTotalPrice(
            Number(totalPrice) - Number(service.sale_price * service.quantity),
        )
    }

    const createInvoice = async () => {
        if (!company) {
            toast.error('Please select a company')
            return
        }

        if (!title) {
            toast.error('Please add a title')
            return
        }

        if (selectedServices.length === 0) {
            toast.error('Please add at least one service')
            return
        }

        if (submitting) {
            return
        }

        if (paidAmount > totalPrice) {
            toast.error('Paid amount cannot be greater than total price')
            return
        }

        if (paidAmount < 0) {
            toast.error('Enter Correct Paid Amount')
            return
        }

        setSubmitting(true)
        try {
            const dataToSend = {
                title,
                company: company,
                services: selectedServices,
                total_price: totalPrice,
                pending_amount: totalPrice - paidAmount,
                paid_amount: paidAmount,
            }

            const response = await api.post(
                `${BASE_URL}/singleinvoices/generate-invoice`,
                dataToSend,
            )
            if (response.status === 200) {
                toast.success('Invoice created successfully')
                setSubmitting(false)
                navigate('/singleinvoice')
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
            setSubmitting(false)
        }
    }

    return (
        <>
            <Wrapper title={'Add Invoice'}>
                <div className='flex justify-start items-start  flex-col mx-5 mt-2 shadow-2xl shadow-bgLight bg-bgLight'>
                    <div className='w-full flex flex-row p-5 justify-between items-center rounded-md'>
                        <div className='flex flex-col justify-between items-start gap-y-3'>
                            <h1 className='text-4xl font-bold text-lightGold'>
                                INVOICE
                            </h1>
                            <div className='flex flex-col gap-y-1'>
                                <p className='text-xl font-semibold text-lightGold'>
                                    BILLED TO
                                </p>
                                <div className='flex flex-row-reverse justify-between items-center w-full gap-x-3'>
                                    <input
                                        type='text'
                                        name='title'
                                        id='title'
                                        placeholder='Invoice Title'
                                        className=' bg-bgDarkColor  text-white  py-2.5  px-5 focus:outline-none  ring-0 border-0 w-full'
                                        onChange={(e) =>
                                            setTitle(e.target.value)
                                        }
                                    />
                                    <div className='flex flex-col gap-y-2'>
                                        <input
                                            type='text'
                                            name='company'
                                            id='company'
                                            placeholder='Company Name'
                                            value={company}
                                            onChange={(e) =>
                                                setCompany(e.target.value)
                                            }
                                            className=' bg-bgDarkColor  text-white  py-2.5  px-5 focus:outline-none  ring-0 border-0 w-full'
                                        />
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

                    {selectedServices.length > 0 && (
                        <div className='w-full max-h-[50vh] overflow-auto'>
                            <table className='table'>
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
                                    {selectedServices?.map((Service) => (
                                        <ServiceRow
                                            Service={Service}
                                            key={Service.service}
                                            handleRemoveService={
                                                handleRemoveService
                                            }
                                        />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    <div className='flex flex-col gap-y-3 w-full'>
                        <div className='w-full max-h-[30vh] bg-lightGold  shadow-2xl'>
                            <span className='text-2xl font-semibold text-gray-900 mx-5 pt-3 border-b border-dashed border-gray-900'>
                                Add Service
                            </span>
                            <table className='table'>
                                <tbody>
                                    <tr>
                                        <td>
                                            <div className='flex flex-col'>
                                                <label
                                                    htmlFor='service'
                                                    className='text-gray-900 font-semibold'
                                                >
                                                    Select Service
                                                </label>
                                                <select
                                                    name='service'
                                                    id='service'
                                                    className=' bg-bgDarkColor  text-white rounded-md  py-1  px-5 focus:outline-none  ring-0 border-0'
                                                    onChange={
                                                        handleServiceChange
                                                    }
                                                >
                                                    <option value=''>
                                                        Select Service
                                                    </option>
                                                    {Services?.map(
                                                        (service) => (
                                                            <option
                                                                value={
                                                                    service.name
                                                                }
                                                                key={
                                                                    service._id
                                                                }
                                                            >
                                                                {service.name}
                                                            </option>
                                                        ),
                                                    )}
                                                </select>
                                            </div>
                                        </td>
                                        <td className='flex flex-col'>
                                            <label
                                                htmlFor='quantity'
                                                className='text-gray-900 font-semibold'
                                            >
                                                Quantity
                                            </label>
                                            <input
                                                type='number'
                                                name='quantity'
                                                id='quantity'
                                                placeholder='Quantity'
                                                min={1}
                                                onChange={handleQuantityChange}
                                                value={quantity}
                                                className=' bg-bgDarkColor  text-white rounded-md  py-1 w-20 pl-1 focus:outline-none  ring-0 border-0'
                                            />
                                        </td>

                                        <td>
                                            <div className='flex flex-col'>
                                                <label
                                                    htmlFor='sale_price'
                                                    className='text-gray-900 font-semibold'
                                                >
                                                    Price
                                                </label>
                                                <input
                                                    type='number'
                                                    name='sale_price'
                                                    id='sale_price'
                                                    placeholder='Price'
                                                    min={1}
                                                    value={salePrice}
                                                    onChange={
                                                        handleSalePriceChange
                                                    }
                                                    className=' bg-bgDarkColor  text-white rounded-md  py-1 w-20 pl-1 focus:outline-none  ring-0 border-0'
                                                />
                                            </div>
                                        </td>
                                        <td className='flex flex-col'>
                                            <label
                                                htmlFor='action'
                                                className='text-gray-900 font-semibold'
                                            >
                                                Actions
                                            </label>
                                            <button
                                                className='px-4 py-1 bg-bgDarkColor text-lightGold rounded-md font-semibold'
                                                onClick={handleAddService}
                                            >
                                                Add
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {totalPrice > 0 && (
                        <div className='bg-bgDarkColor p-4 rounded-lg flex flex-col justify-end w-[300px] gap-y-3 mt-5'>
                            <div className='flex flex-row justify-between items-center gap-x-2'>
                                <span className='font-bold'>NET TOTAL: </span>
                                <span>{totalPrice} AED</span>
                            </div>
                            <div className='flex flex-row justify-between items-center gap-x-2'>
                                <span className='font-bold'>PAID NOW: </span>
                                <input
                                    type='number'
                                    name='paid_
                                amount'
                                    id='paid_amount'
                                    placeholder='Paid Amount'
                                    className='input-xs input-bordered input bg-bgLight  text-white rounded-md  py-1 w-20 pl-1 focus:outline-none  ring-0 border-0'
                                    onChange={(e) =>
                                        setPaidAmount(e.target.value)
                                    }
                                />
                            </div>
                            {paidAmount && (
                                <div className='border-t-2 border-lightGold border-dashed flex flex-row justify-between items-center gap-x-2'>
                                    <span className='font-bold'>
                                        PENDING AMOUNT:{' '}
                                    </span>
                                    <span>{totalPrice - paidAmount} AED</span>
                                </div>
                            )}
                        </div>
                    )}
                    <button
                        onClick={createInvoice}
                        className='px-5 py-1 bg-lightGold text-bgDarkColor rounded-md mt-5 ml-auto'
                    >
                        Add Invoice
                    </button>
                </div>
            </Wrapper>
        </>
    )
}

export default AddSingleInvoice

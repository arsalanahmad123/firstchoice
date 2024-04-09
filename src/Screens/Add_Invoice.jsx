import React, { useEffect, useState } from 'react'
import '../App.css'
import Wrapper from '../Layout/Wrapper'
import { useForm } from 'react-hook-form'
import { useFetch } from '../Hooks/useFetch'
const Add_Invoice = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()
    const company_id = JSON.parse(sessionStorage.getItem('company'))._id
    const [costprice, setCostprice] = useState(0)
    const [pending, setPending] = useState(0)
    const { data: services } = useFetch('services')
    const { data: employees } = useFetch(`employee/${company_id}`)
    const createInvoice = async (data) => {
        console.log(data)
    }

    console.log(employees)
    const getCostPrice = (id) => {
        const service = services?.find((service) => service._id === id)
        if (service) {
            setCostprice(service.cost_price)
        }
    }
    const creation_month = new Date().getMonth() + 1
    const creation_year = new Date().getFullYear()

    return (
        <Wrapper title={'Add Invoice'}>
            <div className=' flex items-center justify-center mx-10 mt-5 '>
                <form
                    onSubmit={handleSubmit(createInvoice)}
                    className='min-w-full bg-lightGold p-10 rounded-3xl'
                >
                    <div className='flex flex-row justify-around items-center gap-x-3'>
                        <div className='mb-3 flex flex-col w-full'>
                            <label
                                htmlFor='email'
                                className='block mb-1 text-sm font-medium text-black'
                            >
                                Company Name
                            </label>
                            <input
                                type='text'
                                {...register('company', {
                                    required: 'Company name is required',
                                })}
                                name='email'
                                className=' bg-bgLight   text-sm text-white rounded-lg  py-1  px-5 focus:outline-none w-full ring-0 border-0'
                                placeholder='Soriic'
                            />
                            {errors.company && (
                                <p className='text-red-500 text-sm'>
                                    {errors.company.message}
                                </p>
                            )}
                        </div>
                        <div className='mb-3 flex flex-col w-full'>
                            <label
                                htmlFor='service'
                                className='block mb-1 text-sm font-medium text-black'
                            >
                                Service
                            </label>
                            <select
                                name='service_id'
                                id='service'
                                {...register('service_id', {
                                    required: 'Service is required',
                                })}
                                className=' bg-bgLight   text-sm text-white rounded-lg  py-1  px-5 focus:outline-none w-full ring-0 border-0'
                                onChange={(e) => {
                                    getCostPrice(e.target.value)
                                }}
                            >
                                <option key={''} value='dummy' defaultChecked>
                                    Select Service
                                </option>
                                {services &&
                                    services.map((service) => (
                                        <option
                                            key={service._id}
                                            value={service._id}
                                        >
                                            {service.name}
                                        </option>
                                    ))}
                            </select>
                            {errors.service && (
                                <p className='text-red-500 text-sm'>
                                    {errors.service.message}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className='flex flex-row justify-around items-center gap-x-3'>
                        <div className='mb-3 w-full'>
                            <label
                                htmlFor='quantity'
                                className='block mb-1 text-sm font-medium text-black'
                            >
                                Quantity
                            </label>
                            <input
                                type='number'
                                {...register('quantity', {
                                    required: 'Quantity is required',
                                    min: {
                                        value: 1,
                                        message:
                                            'Quantity must be greater than 0',
                                    },
                                })}
                                className=' bg-bgLight   text-sm text-white rounded-lg  py-1  px-5 focus:outline-none w-full ring-0 border-0'
                                placeholder='00'
                            />
                            {errors.quantity && (
                                <p classNameName='text-red-500 text-sm'>
                                    {errors.quantity.message}
                                </p>
                            )}
                        </div>
                        <div className='mb-3 w-full'>
                            <label
                                htmlFor='sale_price'
                                className='block mb-1 text-sm font-medium text-black'
                            >
                                Sale Price
                            </label>
                            <input
                                type='number'
                                {...register('sale_price', {
                                    required: 'Sale Price is required',
                                    min: {
                                        value: 1,
                                        message:
                                            'Sale Price must be greater than 0',
                                    },
                                })}
                                className=' bg-bgLight   text-sm text-white rounded-lg  py-1  px-5 focus:outline-none w-full ring-0 border-0'
                                placeholder='$ 00.00'
                            />
                        </div>
                    </div>
                    <div className='mb-3 flex flex-col'>
                        <label
                            htmlFor='Employee'
                            className='block mb-2 text-sm font-medium text-black'
                        >
                            For Employee
                        </label>
                        <div></div>
                    </div>
                    <button>Submit</button>
                </form>
            </div>
        </Wrapper>
    )
}

export default Add_Invoice

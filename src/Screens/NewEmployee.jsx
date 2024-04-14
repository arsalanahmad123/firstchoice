import React, { useState } from 'react'
import Wrapper from '../Layout/Wrapper'
import { toast } from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { useParams, useNavigate } from 'react-router-dom'

import { IoIosDocument } from 'react-icons/io'
import axios from 'axios'
import { useAuth } from '../Context/AuthContext'

const BASE_URL = import.meta.env.VITE_BASE_URL
const NewEmployee = () => {
    const [documents, setDocuments] = useState([])
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { id } = useParams()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()
    const { company } = useAuth()

    const navigate = useNavigate()
    const handleDocuments = (e) => {
        setDocuments(Array.from(e.target.files))
    }

    const createEmployee = async (data) => {
        setIsSubmitting(true)
        try {
            const formData = new FormData()

            formData.append('name', data.name)
            formData.append('nationality', data.nationality)
            formData.append('eid_no', data.eid_no)
            formData.append('labor_card_no', data.labor_card_no)
            formData.append('labor_card_expiry', data.labor_card_expiry)
            formData.append('eid_expiry', data.eid_expiry)
            formData.append('company_id', id)
            for (let i = 0; i < documents.length; i++) {
                formData.append('documents', documents[i])
            }
            const response = await axios.post(
                `${BASE_URL}/employee/create-employee`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${sessionStorage.getItem(
                            'token',
                        )}`,
                        company_id: company._id,
                    },
                },
            )
            if (response.status === 201) {
                setIsSubmitting(false)
                toast.success(response.data.message)
                navigate(`/companies/company/${id}/employees`)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
            setIsSubmitting(false)
        }
    }

    return (
        <>
            <Wrapper title={'Add Employee'}>
                <div className='flex justify-center items-start h-full p-2 mx-5 mt-10'>
                    <form
                        onSubmit={handleSubmit(createEmployee)}
                        className='bg-bgLight p-5 flex flex-row justify-between gap-x-28 items-center rounded-lg text-white '
                    >
                        <div className='flex flex-col justify-center items-center pt-5 px-3 gap-y-10 w-full'>
                            <div className='flex flex-col justify-start items-start gap-y-1 w-72'>
                                <div className='mb-5'>
                                    <IoIosDocument className='text-lightGold text-3xl mb-2' />
                                    <span className='text-lg  text-lightGold'>
                                        Upload Documents
                                    </span>
                                </div>
                                <input
                                    type='file'
                                    name='documents'
                                    onChange={handleDocuments}
                                    id='documents'
                                    multiple
                                    required
                                />
                            </div>
                        </div>
                        <div className='flex flex-col gap-y-3'>
                            <div className='flex flex-col gap-y-1'>
                                <div className='flex flex-row justify-between items-center'>
                                    <label htmlFor='name' className='text-sm'>
                                        Name
                                    </label>
                                    {errors.name && (
                                        <span className='text-red-500 text-xs'>
                                            {errors.name.message}
                                        </span>
                                    )}
                                </div>
                                <input
                                    type='text'
                                    name='name'
                                    placeholder='Name'
                                    {...register('name', {
                                        required: 'Name is required',
                                    })}
                                    className='input-sm bg-bgLight border border-gray-700 text-white focus:outline-none focus:ring-0 rounded-md w-96 text-[17px]'
                                />
                            </div>
                            <div className='flex flex-col gap-y-1'>
                                <div className='flex flex-row justify-between items-center'>
                                    <label
                                        htmlFor='nationality'
                                        className='text-sm'
                                    >
                                        Nationality
                                    </label>
                                    {errors.nationality && (
                                        <span className='text-red-500 text-xs'>
                                            {errors.nationality.message}
                                        </span>
                                    )}
                                </div>
                                <input
                                    type='text'
                                    name='nationality'
                                    placeholder='Nationality'
                                    autoComplete='false'
                                    {...register('nationality', {
                                        required: 'Nationality is required',
                                    })}
                                    className='input-sm bg-bgLight border border-gray-700 text-white focus:outline-none focus:ring-0 rounded-md w-96 text-[17px]'
                                />
                            </div>
                            <div className='flex flex-col gap-y-1'>
                                <div className='flex flex-row justify-between items-center'>
                                    <label htmlFor='eidNo' className='text-sm'>
                                        EID No.
                                    </label>
                                    {errors.eid_no && (
                                        <span className='text-red-500 text-xs'>
                                            {errors.eid_no.message}
                                        </span>
                                    )}
                                </div>
                                <input
                                    type='text'
                                    name='eid_no'
                                    autoComplete='false'
                                    placeholder='EID No.'
                                    {...register('eid_no', {
                                        required: 'EID No. is required',
                                    })}
                                    className='input-sm bg-bgLight border border-gray-700 text-white focus:outline-none focus:ring-0 rounded-md w-96 text-[17px]'
                                />
                            </div>
                            <div className='flex flex-col gap-y-1'>
                                <div className='flex flex-row justify-between items-center'>
                                    <label
                                        htmlFor='Labor Card No'
                                        className='text-sm'
                                    >
                                        Labor Card No
                                    </label>
                                    {errors.labor_card_no && (
                                        <span className='text-red-500 text-xs'>
                                            {errors.labor_card_no.message}
                                        </span>
                                    )}
                                </div>
                                <input
                                    type='text'
                                    name='labor_card_no'
                                    placeholder='Labor Card No'
                                    {...register('labor_card_no', {
                                        required: 'Labor Card No is required',
                                    })}
                                    className='input-sm bg-bgLight border border-gray-700 text-white focus:outline-none focus:ring-0 rounded-md w-96 text-[17px]'
                                />
                            </div>
                            <div className='flex flex-col gap-y-1'>
                                <div className='flex flex-row justify-between items-center'>
                                    <label
                                        htmlFor='labor_card_expiry'
                                        className='text-sm'
                                    >
                                        Labor Card Expiry
                                    </label>
                                    {errors.labor_card_expiry && (
                                        <span className='text-red-500 text-xs'>
                                            {errors.labor_card_expiry.message}
                                        </span>
                                    )}
                                </div>
                                <input
                                    type='date'
                                    name='labor_card_expiry'
                                    {...register('labor_card_expiry', {
                                        required:
                                            'Labor Card Expiry is required',
                                    })}
                                    className='input-sm bg-bgLight border border-gray-700 text-white focus:outline-none focus:ring-0 rounded-md w-96 text-[17px]'
                                />
                            </div>
                            <div className='flex flex-col gap-y-1'>
                                <div className='flex flex-row justify-between items-center'>
                                    <label
                                        htmlFor='EID Expiry'
                                        className='text-sm'
                                    >
                                        EID Expiry
                                    </label>
                                    {errors.eid_expiry && (
                                        <span className='text-red-500 text-xs'>
                                            {errors.eid_expiry.message}
                                        </span>
                                    )}
                                </div>
                                <input
                                    type='date'
                                    name='eid_expiry'
                                    {...register('eid_expiry', {
                                        required: 'EID Expiry is required',
                                    })}
                                    className='input-sm bg-bgLight border border-gray-700 text-white focus:outline-none focus:ring-0 rounded-md w-96 text-[17px]'
                                />
                            </div>
                        </div>
                        <button
                            type='submit'
                            disabled={isSubmitting}
                            className=' bg-lightGold mt-auto px-4 py-2 rounded-md text-gray-900'
                        >
                            Create
                        </button>
                    </form>
                </div>
            </Wrapper>
        </>
    )
}

export default NewEmployee

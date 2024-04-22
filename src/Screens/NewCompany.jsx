import React, { useState } from 'react'
import Wrapper from '../Layout/Wrapper'
import { FaCamera } from 'react-icons/fa'
import { IoIosDocument } from 'react-icons/io'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useAuth } from '../Context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

const BASE_URL = import.meta.env.VITE_BASE_URL
const NewCompany = () => {
    const [logo, setLogo] = useState(null)
    const [updateLogo, setUpdateLogo] = useState(null)
    const [showPassword, setShowPassword] = useState(false)
    const [documents, setDocuments] = useState([])
    const { company } = useAuth()
    const navigate = useNavigate()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm()
    const handleLogoChange = (e) => {
        const file = e.target.files[0]
        setUpdateLogo(file)
        setLogo(URL.createObjectURL(file))
    }

    const handleDocuments = (e) => {
        setDocuments(Array.from(e.target.files))
    }

    const createCompany = async (data) => {
        try {
            setIsSubmitting(true)
            const formData = new FormData()
            formData.append('username', data.username)
            formData.append('email', data.email)
            formData.append('password', data.password)
            formData.append('phone', data.phone)
            formData.append('licence_expiry', data.licence_expiry)
            formData.append('img_card_expiry', data.img_card_expiry)
            formData.append('least_contract_expiry', data.least_contract_expiry)
            formData.append('e_channel_expiry', data.e_channel_expiry)
            formData.append('role', 'company')
            formData.append('logo', updateLogo)
            for (let i = 0; i < documents.length; i++) {
                formData.append('documents', documents[i])
            }

            const response = await axios.post(
                `${BASE_URL}/companies/create-company`,
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
                navigate('/companies')
            }
        } catch (error) {
            toast.error(error.response.data.message)
            setIsSubmitting(false)
        }
    }

    return (
        <>
            <Wrapper title={'Add Company'}>
                <div className='flex justify-center items-start h-full p-2 mx-5 mt-10'>
                    <form
                        onSubmit={handleSubmit(createCompany)}
                        className='bg-bgLight p-5 flex flex-row justify-between gap-x-28 items-start rounded-lg text-white '
                    >
                        <div className='flex flex-col justify-center items-center pt-5 px-3 gap-y-10 w-full'>
                            <div className='flex flex-col justify-center items-center gap-y-1 w-full'>
                                <label
                                    htmlFor='logo'
                                    className='rounded-full bg-lightGold h-20 w-20 cursor-pointer flex justify-center items-center overflow-hidden'
                                >
                                    {logo ? (
                                        <img
                                            src={logo}
                                            className='w-full h-full object-cover'
                                            alt='Logo'
                                        />
                                    ) : (
                                        <FaCamera className='text-gray-900 font-bold' />
                                    )}
                                    <input
                                        type='file'
                                        id='logo'
                                        name='logo'
                                        className='hidden'
                                        {...register('logo', {
                                            required: 'Logo is required',
                                        })}
                                        onChange={handleLogoChange}
                                    />
                                </label>
                                <span className='text-sm text-white'>
                                    Upload Logo
                                </span>
                                {errors.logo && (
                                    <p className='text-red-500 text-sm'>
                                        {errors.logo.message}
                                    </p>
                                )}
                            </div>
                            <div className='flex flex-col justify-center items-center gap-y-1 w-72'>
                                <div className='flex justify-center items-center flex-col gap-y-3 bg-lightGold p-5 rounded-md'>
                                    <div className='flex flex-col text-gray-900 justify-center items-center'>
                                        <IoIosDocument className='text-2xl' />
                                        <span className='text-sm '>
                                            Upload Documents
                                        </span>
                                    </div>
                                    <input
                                        type='file'
                                        id='documents'
                                        name='documents'
                                        className='input-xs text-gray-900'
                                        multiple
                                        {...register('documents', {
                                            required: 'Documents are required',
                                            validate: (value) =>
                                                (value && value.length > 0) ||
                                                'At least one document is required',
                                        })}
                                        onChange={handleDocuments}
                                    />
                                    {errors.documents && (
                                        <p className='text-red-500 text-sm mt-2'>
                                            {errors.documents.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col gap-y-5 '>
                            <div className='flex flex-col gap-y-1'>
                                <div className='flex flex-row justify-between items-center'>
                                    <label
                                        htmlFor='username'
                                        className='text-sm'
                                    >
                                        Username
                                    </label>
                                    {errors.username && (
                                        <span className='text-red-500 text-sm'>
                                            {errors.username.message}
                                        </span>
                                    )}
                                </div>
                                <input
                                    type='text'
                                    name='username'
                                    placeholder='Company Name'
                                    {...register('username', {
                                        required: "Username can't be empty",
                                    })}
                                    className='input-sm bg-bgLight border border-gray-700 text-white focus:outline-none focus:ring-0 rounded-md w-96 text-[17px]'
                                />
                            </div>
                            <div className='flex flex-col gap-y-1'>
                                <div className='flex flex-row justify-between items-center'>
                                    <label htmlFor='email' className='text-sm'>
                                        Email
                                    </label>
                                    {errors.email && (
                                        <span className='text-red-500 text-sm'>
                                            {errors.email.message}
                                        </span>
                                    )}
                                </div>
                                <input
                                    type='email'
                                    name='email'
                                    placeholder='Email '
                                    {...register('email', {
                                        required: "Email can't be empty",
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: 'Invalid email address',
                                        },
                                    })}
                                    className='input-sm bg-bgLight border border-gray-700 text-white focus:outline-none focus:ring-0 rounded-md w-96 text-[17px]'
                                />
                            </div>
                            <div className='flex flex-col gap-y-1'>
                                <div className='flex justify-between items-center'>
                                    <label
                                        htmlFor='password'
                                        className='text-sm'
                                    >
                                        Password
                                    </label>
                                    {errors.password && (
                                        <span className='text-red-500 text-sm'>
                                            {errors.password.message}
                                        </span>
                                    )}
                                </div>
                                <div className='relative'>
                                    <input
                                        type={
                                            showPassword ? 'text' : 'password'
                                        }
                                        name='password'
                                        placeholder='Password'
                                        {...register('password', {
                                            required: "Password can't be empty",
                                        })}
                                        className='input-sm bg-bgLight border border-gray-700 text-white focus:outline-none focus:ring-0 rounded-md w-96 text-[17px]'
                                    />
                                    {showPassword ? (
                                        <FaEye
                                            onClick={() =>
                                                setShowPassword(!showPassword)
                                            }
                                            className='absolute  top-2 right-3 cursor-pointer'
                                        />
                                    ) : (
                                        <FaEyeSlash
                                            onClick={() =>
                                                setShowPassword(!showPassword)
                                            }
                                            className='absolute  top-2 right-3 cursor-pointer'
                                        />
                                    )}
                                </div>
                            </div>
                            <div className='flex flex-col gap-y-1'>
                                <div className='flex justify-between items-center'>
                                    <label
                                        htmlFor='Contact No'
                                        className='text-sm'
                                    >
                                        Contact
                                    </label>
                                    {errors.phone && (
                                        <span className='text-red-500 text-sm'>
                                            {errors.phone.message}
                                        </span>
                                    )}
                                </div>
                                <input
                                    type='tel'
                                    name='phone'
                                    placeholder='Contact No'
                                    {...register('phone', {
                                        required: "Contact No can't be empty",
                                    })}
                                    className='input-sm bg-bgLight border border-gray-700 text-white focus:outline-none focus:ring-0 rounded-md w-96 text-[17px]'
                                />
                            </div>
                            <div className='flex flex-col gap-y-1'>
                                <div className='flex justify-between items-center'>
                                    <label
                                        htmlFor='licence_expiry'
                                        className='text-sm'
                                    >
                                        Licence Expiry
                                    </label>
                                    {errors.licence_expiry && (
                                        <span className='text-red-500 text-sm'>
                                            {errors.licence_expiry.message}
                                        </span>
                                    )}
                                </div>
                                <input
                                    type='date'
                                    name='licence_expiry'
                                    {...register('licence_expiry', {
                                        required:
                                            "Licence Expiry can't be empty",
                                        validate: (value) => {
                                            const today = new Date()
                                            const date = new Date(value)
                                            if (date < today) {
                                                return 'Licence Expiry cannot be in the past'
                                            }
                                        },
                                    })}
                                    className='input-sm bg-bgLight border border-gray-700 text-white focus:outline-none focus:ring-0 rounded-md w-96 text-[17px]'
                                />
                            </div>
                            <div className='flex flex-col gap-y-1'>
                                <div className='flex justify-between items-center'>
                                    <label
                                        htmlFor='img_card_expiry'
                                        className='text-sm'
                                    >
                                        Img_Card Expiry
                                    </label>
                                    {errors.img_card_expiry && (
                                        <span className='text-red-500 text-sm'>
                                            {errors.img_card_expiry.message}
                                        </span>
                                    )}
                                </div>
                                <input
                                    type='date'
                                    name='img_card_expiry'
                                    {...register('img_card_expiry', {
                                        required:
                                            "Img_Card Expiry can't be empty",
                                        validate: (value) => {
                                            const today = new Date()
                                            const date = new Date(value)
                                            if (date < today) {
                                                return 'Img_Card Expiry cannot be in the past'
                                            }
                                        },
                                    })}
                                    className='input-sm bg-bgLight border border-gray-700 text-white focus:outline-none focus:ring-0 rounded-md w-96 text-[17px]'
                                />
                            </div>
                            <div className='flex flex-col gap-y-1'>
                                <div className='flex justify-between items-center'>
                                    <label
                                        htmlFor='least_contract_expiry'
                                        className='text-sm'
                                    >
                                        Least Contract Expiry
                                    </label>
                                    {errors.least_contract_expiry && (
                                        <span className='text-red-500 text-sm'>
                                            {
                                                errors.least_contract_expiry
                                                    .message
                                            }
                                        </span>
                                    )}
                                </div>
                                <input
                                    type='date'
                                    name='least_contract_expiry'
                                    {...register('least_contract_expiry', {
                                        required:
                                            "Img_Card Expiry can't be empty",
                                        validate: (value) => {
                                            const today = new Date()
                                            const date = new Date(value)
                                            if (date < today) {
                                                return 'Least Contract Expiry cannot be in the past'
                                            }
                                        },
                                    })}
                                    className='input-sm bg-bgLight border border-gray-700 text-white focus:outline-none focus:ring-0 rounded-md w-96 text-[17px]'
                                />
                            </div>
                            <div className='flex flex-col gap-y-1'>
                                <div className='flex justify-between items-center'>
                                    <label
                                        htmlFor='e_channel_expiry'
                                        className='text-sm'
                                    >
                                        E-Channel Expiry
                                    </label>
                                    {errors.e_channel_expiry && (
                                        <span className='text-red-500 text-sm'>
                                            {errors.e_channel_expiry.message}
                                        </span>
                                    )}
                                </div>
                                <input
                                    type='date'
                                    name='e_channel_expiry'
                                    {...register('e_channel_expiry', {
                                        required:
                                            "E-Channel Expiry can't be empty",
                                        validate: (value) => {
                                            const today = new Date()
                                            const date = new Date(value)
                                            if (date < today) {
                                                return 'E-Channel Expiry cannot be in the past'
                                            }
                                        },
                                    })}
                                    className='input-sm bg-bgLight border border-gray-700 text-white focus:outline-none focus:ring-0 rounded-md w-96 text-[17px]'
                                />
                            </div>
                        </div>
                        <button
                            type='submit'
                            disabled={isSubmitting}
                            className='px-4 py-2 bg-lightGold mt-auto text-gray-900 rounded-md'
                        >
                            {isSubmitting ? (
                                <span className='loading loading-spinner loading-xs'></span>
                            ) : (
                                'Submit'
                            )}
                        </button>
                    </form>
                </div>
            </Wrapper>
        </>
    )
}

export default NewCompany

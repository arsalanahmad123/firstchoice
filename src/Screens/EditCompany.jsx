import React, { useState } from 'react'
import { FaCamera } from 'react-icons/fa'
import { IoIosDocument } from 'react-icons/io'
import { IoClose } from 'react-icons/io5'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useAuth } from '../Context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

const BASE_URL = import.meta.env.VITE_BASE_URL
const EditCompany = ({ setCompanyModal, Company }) => {
    const [showPassword, setShowPassword] = useState(false)
    const [documents, setDocuments] = useState([])
    const { company } = useAuth()
    const navigate = useNavigate()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { handleSubmit } = useForm()
    const [newdata, setNewData] = useState(Company)

    const handleDocuments = (e) => {
        setDocuments(Array.from(e.target.files))
    }

    const editCompany = async () => {
        try {
            setIsSubmitting(true)
            const formData = new FormData()

            Object.keys(newdata).forEach((key) => {
                if (newdata[key] !== Company[key]) {
                    formData.append(key, newdata[key])
                }
            })
            if (documents.length > 0) {
                for (let i = 0; i < documents.length; i++) {
                    formData.append('documents', documents[i])
                }
            }

            const response = await axios.patch(
                `${BASE_URL}/companies/edit-company/${Company._id}`,
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

            if (response.status === 200) {
                setIsSubmitting(false)
                setCompanyModal(false)
                toast.success(response.data.message)
                navigate('/companies')
            }
        } catch (error) {
            toast.error(error.response.data.message)
            setIsSubmitting(false)
            setCompanyModal(false)
        }
    }

    return (
        <>
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-2 bg-[rgba(0,0,0,0.6)] w-full h-full  z-50 shadow-2xl flex justify-center items-center'>
                <IoClose
                    className='text-white text-3xl cursor-pointer absolute top-20 right-28 z-50'
                    onClick={() => setCompanyModal(false)}
                />
                <form
                    onSubmit={handleSubmit(editCompany)}
                    className='bg-bgLight p-5 flex flex-row justify-between gap-x-28 items-center rounded-lg text-white min-w-[80%]'
                >
                    <div className='flex flex-col justify-center items-center pt-5 px-3 gap-y-10 w-full'>
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
                                    onChange={handleDocuments}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col gap-y-5 '>
                        <div className='flex flex-row justify-between items-center gap-x-2'>
                            <div className='flex flex-col gap-y-1'>
                                <div className='flex flex-row justify-between items-center'>
                                    <label
                                        htmlFor='username'
                                        className='text-sm'
                                    >
                                        Username
                                    </label>
                                </div>
                                <input
                                    type='text'
                                    name='username'
                                    placeholder='Company Name'
                                    onChange={(e) =>
                                        setNewData({
                                            ...newdata,
                                            username: e.target.value,
                                        })
                                    }
                                    value={newdata.username}
                                    className='input-sm bg-bgLight border border-gray-700 text-white focus:outline-none focus:ring-0 rounded-md text-[17px]'
                                />
                            </div>
                            <div className='flex flex-col gap-y-1'>
                                <div className='flex flex-row justify-between items-center'>
                                    <label htmlFor='email' className='text-sm'>
                                        Email
                                    </label>
                                </div>
                                <input
                                    type='email'
                                    name='email'
                                    placeholder='Email '
                                    value={newdata.email}
                                    onChange={(e) =>
                                        setNewData({
                                            ...newdata,
                                            email: e.target.value,
                                        })
                                    }
                                    className='input-sm bg-bgLight border border-gray-700 text-white focus:outline-none focus:ring-0 rounded-md text-[17px]'
                                />
                            </div>
                        </div>
                        <div className='flex flex-row justify-between items-center gap-x-2'>
                            <div className='flex flex-col gap-y-1'>
                                <div className='flex justify-between items-center'>
                                    <label
                                        htmlFor='password'
                                        className='text-sm'
                                    >
                                        Password
                                    </label>
                                </div>
                                <div className='relative'>
                                    <input
                                        type={
                                            showPassword ? 'text' : 'password'
                                        }
                                        name='password'
                                        onChange={(e) =>
                                            setNewData({
                                                ...newdata,
                                                password: e.target.value,
                                            })
                                        }
                                        className='input-sm bg-bgLight border border-gray-700 text-white focus:outline-none focus:ring-0 rounded-md text-[17px]'
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
                                </div>
                                <input
                                    type='tel'
                                    name='phone'
                                    placeholder='Contact No'
                                    value={newdata.phone}
                                    onChange={(e) =>
                                        setNewData({
                                            ...newdata,
                                            phone: e.target.value,
                                        })
                                    }
                                    className='input-sm bg-bgLight border border-gray-700 text-white focus:outline-none focus:ring-0 rounded-md  text-[17px]'
                                />
                            </div>
                        </div>
                        <div className='flex flex-row justify-between items-center gap-x-2'>
                            <div className='flex flex-col gap-y-1'>
                                <div className='flex flex-row justify-between items-center'>
                                    <label
                                        htmlFor='e_channel_username'
                                        className='text-sm'
                                    >
                                        E-Channel Username
                                    </label>
                                </div>
                                <input
                                    type='text'
                                    name='e_channel_username'
                                    placeholder='E-Channel Username'
                                    value={newdata.e_channel_username}
                                    onChange={(e) =>
                                        setNewData({
                                            ...newdata,
                                            e_channel_username: e.target.value,
                                        })
                                    }
                                    className='input-sm bg-bgLight border border-gray-700 text-white focus:outline-none focus:ring-0 rounded-md text-[17px]'
                                />
                            </div>
                            <div className='flex flex-col gap-y-1'>
                                <div className='flex flex-row justify-between items-center'>
                                    <label
                                        htmlFor='ms_username'
                                        className='text-sm'
                                    >
                                        MS Username
                                    </label>
                                </div>
                                <input
                                    type='text'
                                    name='ms_username'
                                    placeholder='MS Username'
                                    value={newdata.ms_username}
                                    onChange={(e) =>
                                        setNewData({
                                            ...newdata,
                                            ms_username: e.target.value,
                                        })
                                    }
                                    className='input-sm bg-bgLight border border-gray-700 text-white focus:outline-none focus:ring-0 rounded-md text-[17px]'
                                />
                            </div>
                        </div>
                        <div className='w-full flex flex-col'>
                            <div className='flex flex-row justify-between items-center'>
                                <label
                                    htmlFor='gmail_username'
                                    className='text-sm'
                                >
                                    Gmail Username
                                </label>
                            </div>
                            <input
                                type='text'
                                name='gmail_username'
                                placeholder='Gmail Username'
                                value={newdata.gmail_username}
                                onChange={(e) =>
                                    setNewData({
                                        ...newdata,
                                        gmail_username: e.target.value,
                                    })
                                }
                                className='input-sm bg-bgLight border border-gray-700 text-white focus:outline-none focus:ring-0 rounded-md text-[17px]'
                            />
                        </div>
                        <div className='flex flex-row justify-between items-center gap-x-2'>
                            <div className='flex flex-col gap-y-1'>
                                <div className='flex justify-between items-center'>
                                    <label
                                        htmlFor='licence_expiry'
                                        className='text-sm'
                                    >
                                        Licence Expiry
                                    </label>
                                </div>
                                <input
                                    type='date'
                                    name='licence_expiry'
                                    onChange={(e) =>
                                        setNewData({
                                            ...newdata,
                                            licence_expiry: e.target.value,
                                        })
                                    }
                                    className='input-sm bg-bgLight border border-gray-700 text-white focus:outline-none focus:ring-0 rounded-md text-[17px]'
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
                                </div>
                                <input
                                    type='date'
                                    name='img_card_expiry'
                                    onChange={(e) =>
                                        setNewData({
                                            ...newdata,
                                            img_card_expiry: e.target.value,
                                        })
                                    }
                                    className='input-sm bg-bgLight border border-gray-700 text-white focus:outline-none focus:ring-0 rounded-md text-[17px]'
                                />
                            </div>
                        </div>
                        <div className='flex flex-row justify-between items-center gap-x-2 '>
                            <div className='flex flex-col gap-y-1'>
                                <div className='flex justify-between items-center'>
                                    <label
                                        htmlFor='least_contract_expiry'
                                        className='text-sm'
                                    >
                                        Least Contract Expiry
                                    </label>
                                </div>
                                <input
                                    type='date'
                                    name='least_contract_expiry'
                                    onChange={(e) =>
                                        setNewData({
                                            ...newdata,
                                            least_contract_expiry:
                                                e.target.value,
                                        })
                                    }
                                    className='input-sm bg-bgLight border border-gray-700 text-white focus:outline-none focus:ring-0 rounded-md text-[17px]'
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
                                </div>
                                <input
                                    type='date'
                                    name='e_channel_expiry'
                                    onChange={(e) =>
                                        setNewData({
                                            ...newdata,
                                            e_channel_expiry: e.target.value,
                                        })
                                    }
                                    className='input-sm bg-bgLight border border-gray-700 text-white focus:outline-none focus:ring-0 rounded-md text-[17px]'
                                />
                            </div>
                        </div>
                    </div>
                    <button
                        type='submit'
                        disabled={isSubmitting}
                        className='px-4 py-2 bg-lightGold mt-auto text-gray-900 rounded-md mr-5'
                    >
                        {isSubmitting ? (
                            <span className='loading loading-spinner loading-xs'></span>
                        ) : (
                            'Submit'
                        )}
                    </button>
                </form>
            </div>
        </>
    )
}

export default EditCompany

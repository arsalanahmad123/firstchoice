import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { IoClose } from 'react-icons/io5'

import { IoIosDocument } from 'react-icons/io'
import axios from 'axios'
import { useAuth } from '../Context/AuthContext'

const BASE_URL = import.meta.env.VITE_BASE_URL
const EditEmployee = ({ id, data, fetchData, setEditModal }) => {
    const [documents, setDocuments] = useState([])
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [newdata, setNewData] = useState(data)
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

    const createEmployee = async () => {
        setIsSubmitting(true)
        try {
            const formData = new FormData()

            // Iterate through each key in newdata
            Object.keys(newdata).forEach((key) => {
                // Check if the value has changed
                if (newdata[key] !== data[key]) {
                    // If it has changed, append it to the formData
                    formData.append(key, newdata[key])
                }
            })

            // Append documents separately as it's an array
            for (let i = 0; i < documents.length; i++) {
                formData.append('documents', documents[i])
            }

            const response = await axios.put(
                `${BASE_URL}/employee/edit-employee/${data._id}`,
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
                toast.success(response.data.message)
                fetchData()
                setEditModal(false)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
            setIsSubmitting(false)
            setEditModal(false)
        }
    }

    return (
        <>
            <div className=' absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-2 bg-[rgba(0,0,0,0.6)] w-full h-full  z-50 shadow-2xl flex justify-center items-center'>
                <IoClose
                    className='text-white text-3xl cursor-pointer absolute top-8 right-44 z-50'
                    onClick={() => setEditModal(false)}
                />
                <form
                    onSubmit={handleSubmit(createEmployee)}
                    className='bg-bgLight p-5 flex flex-row justify-between gap-x-28 items-center rounded-lg text-white max-w-[80%]'
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
                            />
                        </div>
                    </div>
                    <div className='flex flex-col gap-y-3'>
                        <div className='flex flex-col gap-y-1'>
                            <div className='flex flex-row justify-between items-center'>
                                <label htmlFor='name' className='text-sm'>
                                    Name
                                </label>
                            </div>
                            <input
                                type='text'
                                name='name'
                                placeholder='Name'
                                value={newdata?.name}
                                onChange={(e) => {
                                    setNewData({
                                        ...newdata,
                                        name: e.target.value,
                                    })
                                }}
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
                            </div>
                            <input
                                type='text'
                                name='nationality'
                                placeholder='Nationality'
                                autoComplete='false'
                                value={newdata?.nationality}
                                onChange={(e) => {
                                    setNewData({
                                        ...newdata,
                                        nationality: e.target.value,
                                    })
                                }}
                                className='input-sm bg-bgLight border border-gray-700 text-white focus:outline-none focus:ring-0 rounded-md w-96 text-[17px]'
                            />
                        </div>
                        <div className='flex flex-col gap-y-1'>
                            <div className='flex flex-row justify-between items-center'>
                                <label htmlFor='eidNo' className='text-sm'>
                                    EID No.
                                </label>
                            </div>
                            <input
                                type='text'
                                name='eid_no'
                                autoComplete='false'
                                placeholder='EID No.'
                                value={newdata?.eid_no}
                                onChange={(e) => {
                                    setNewData({
                                        ...newdata,
                                        eid_no: e.target.value,
                                    })
                                }}
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
                            </div>
                            <input
                                type='text'
                                name='labor_card_no'
                                placeholder='Labor Card No'
                                value={newdata?.labor_card_no}
                                onChange={(e) => {
                                    setNewData({
                                        ...newdata,
                                        labor_card_no: e.target.value,
                                    })
                                }}
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
                            </div>

                            <input
                                type='date'
                                name='labor_card_expiry'
                                className='input-sm bg-bgLight border border-gray-700 text-white focus:outline-none focus:ring-0 rounded-md w-96 text-[17px]'
                                value={newdata?.labor_card_expiry}
                                onChange={(e) => {
                                    setNewData({
                                        ...newdata,
                                        labor_card_expiry: e.target.value,
                                    })
                                }}
                            />
                        </div>
                        <div className='flex flex-col gap-y-1'>
                            <div className='flex flex-row justify-between items-center'>
                                <label htmlFor='EID Expiry' className='text-sm'>
                                    EID Expiry
                                </label>
                            </div>
                            <input
                                type='date'
                                name='eid_expiry'
                                value={newdata?.eid_expiry}
                                onChange={(e) => {
                                    setNewData({
                                        ...newdata,
                                        eid_expiry: e.target.value,
                                    })
                                }}
                                className='input-sm bg-bgLight border border-gray-700 text-white focus:outline-none focus:ring-0 rounded-md w-96 text-[17px]'
                            />
                        </div>
                        <div className='flex flex-col gap-y-1'>
                            <div className='flex flex-row justify-between items-center'>
                                <label
                                    htmlFor='Passport No'
                                    className='text-sm'
                                >
                                    Passport No
                                </label>
                            </div>
                            <input
                                type='text'
                                name='passport_no'
                                placeholder='Passport No'
                                value={newdata?.passport_no}
                                onChange={(e) => {
                                    setNewData({
                                        ...newdata,
                                        passport_no: e.target.value,
                                    })
                                }}
                                className='input-sm bg-bgLight border border-gray-700 text-white focus:outline-none focus:ring-0 rounded-md w-96 text-[17px]'
                            />
                        </div>
                        <div className='flex flex-col gap-y-1'>
                            <div className='flex flex-row justify-between items-center'>
                                <label
                                    htmlFor='Passport Expiry'
                                    className='text-sm'
                                >
                                    Passport Expiry
                                </label>
                            </div>
                            <input
                                type='date'
                                name='passport_expiry'
                                value={newdata?.passport_expiry}
                                onChange={(e) => {
                                    setNewData({
                                        ...newdata,
                                        passport_expiry: e.target.value,
                                    })
                                }}
                                className='input-sm bg-bgLight border border-gray-700 text-white focus:outline-none focus:ring-0 rounded-md w-96 text-[17px]'
                            />
                        </div>
                    </div>
                    <button
                        type='submit'
                        disabled={isSubmitting}
                        className=' bg-lightGold mt-auto px-4 py-2 rounded-md text-gray-900'
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

export default EditEmployee

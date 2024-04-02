import React, { useState } from 'react'
import Wrapper from '../Layout/Wrapper'

import { FaCamera } from 'react-icons/fa'
import { IoIosDocument } from 'react-icons/io'

const NewCompany = () => {
    const [logo, setLogo] = useState(null)
    const [documents, setDocuments] = useState(null)

    const handleLogoChange = (e) => {
        const file = e.target.files[0]
        setLogo(URL.createObjectURL(file))
    }
    console.log(logo)

    return (
        <>
            <Wrapper title={'Add Company'}>
                <div className='flex justify-center items-start h-full p-2 mx-5 mt-10'>
                    <div className='bg-bgLight p-5 flex flex-row justify-between gap-x-28 items-start rounded-lg text-white '>
                        <form className='flex flex-col justify-center items-center pt-5 px-3 gap-y-10 w-full'>
                            <div className='flex flex-col justify-center items-center gap-y-1 w-full'>
                                <label
                                    htmlFor='logo'
                                    className='p-5 rounded-full bg-darkorange h-20 w-20 cursor-pointer flex justify-center items-center'
                                >
                                    {logo ? (
                                        <img
                                            src={logo}
                                            className='w-full h-full'
                                            alt='Logo'
                                        />
                                    ) : (
                                        <FaCamera className='text-white' />
                                    )}
                                    <input
                                        type='file'
                                        id='logo'
                                        className='hidden'
                                        onChange={handleLogoChange}
                                    />
                                </label>
                                <span className='text-sm text-white'>
                                    Upload Logo
                                </span>
                            </div>
                            <div className='flex flex-col justify-center items-center gap-y-1 w-72'>
                                <label
                                    htmlFor='documents'
                                    className=' bg-darkorange w-full outline-dashed outline-4 outline-darkorange h-20 rounded-md cursor-pointer flex flex-col gap-y-2 justify-center items-center'
                                >
                                    <IoIosDocument className='text-white text-2xl' />
                                    <span className='text-sm text-white'>
                                        Upload Documents
                                    </span>
                                    <input
                                        type='file'
                                        id='documents'
                                        multiple
                                        className='hidden'
                                    />
                                </label>
                            </div>
                        </form>
                        <div className='flex flex-col gap-y-5 '>
                            <div className='flex flex-col gap-y-1'>
                                <label htmlFor='username' className='text-sm'>
                                    Username
                                </label>
                                <input
                                    type='text'
                                    name='username'
                                    placeholder='Company Name'
                                    autoComplete='false'
                                    className='input-sm bg-bgLight border border-gray-700 text-white focus:outline-none focus:ring-0 rounded-md w-96 text-[17px]'
                                />
                            </div>
                            <div className='flex flex-col gap-y-1'>
                                <label htmlFor='email' className='text-sm'>
                                    Email
                                </label>
                                <input
                                    type='email'
                                    name='email'
                                    placeholder='Email '
                                    autoComplete='false'
                                    className='input-sm bg-bgLight border border-gray-700 text-white focus:outline-none focus:ring-0 rounded-md w-96 text-[17px]'
                                />
                            </div>
                            <div className='flex flex-col gap-y-1'>
                                <label htmlFor='password' className='text-sm'>
                                    Password
                                </label>
                                <input
                                    type='password'
                                    name='password'
                                    autoComplete='false'
                                    placeholder='Password'
                                    className='input-sm bg-bgLight border border-gray-700 text-white focus:outline-none focus:ring-0 rounded-md w-96 text-[17px]'
                                />
                            </div>
                            <div className='flex flex-col gap-y-1'>
                                <label htmlFor='Contact No' className='text-sm'>
                                    Contact
                                </label>
                                <input
                                    type='tel'
                                    name='phone'
                                    placeholder='Contact No'
                                    className='input-sm bg-bgLight border border-gray-700 text-white focus:outline-none focus:ring-0 rounded-md w-96 text-[17px]'
                                />
                            </div>
                            <div className='flex flex-col gap-y-1'>
                                <label
                                    htmlFor='licence_expiry'
                                    className='text-sm'
                                >
                                    Licence Expiry
                                </label>
                                <input
                                    type='date'
                                    name='licence_expiry'
                                    className='input-sm bg-bgLight border border-gray-700 text-white focus:outline-none focus:ring-0 rounded-md w-96 text-[17px]'
                                />
                            </div>
                            <div className='flex flex-col gap-y-1'>
                                <label
                                    htmlFor='img_card_expiry'
                                    className='text-sm'
                                >
                                    Img_Card Expiry
                                </label>
                                <input
                                    type='date'
                                    name='img_card_expiry'
                                    className='input-sm bg-bgLight border border-gray-700 text-white focus:outline-none focus:ring-0 rounded-md w-96 text-[17px]'
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Wrapper>
        </>
    )
}

export default NewCompany

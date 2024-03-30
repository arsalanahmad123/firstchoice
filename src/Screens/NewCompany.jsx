import React from 'react'
import Wrapper from '../Layout/Wrapper'

const NewCompany = () => {
    return (
        <>
            <Wrapper title={'Add Company'}>
                <div className='flex justify-center items-start h-full p-2 mx-5 mt-10'>
                    <div className='bg-bgLight p-3 flex flex-row justify-center items-center rounded-lg text-white'>
                        <div className=''>
                            <input type='file' name='company_logo' />
                        </div>
                        <div className='flex flex-col gap-y-3'>
                            <div className='flex flex-col gap-y-1'>
                                <label htmlFor='username' className='text-xs'>
                                    Username
                                </label>
                                <input
                                    type='text'
                                    name='username'
                                    placeholder='Company Name'
                                    className='input-sm bg-bgLight border border-gray-700 text-white focus:outline-none focus:ring-0 rounded-md'
                                />
                            </div>
                            <div className='flex flex-col gap-y-1'>
                                <label htmlFor='email' className='text-xs'>
                                    Email
                                </label>
                                <input
                                    type='email'
                                    name='email'
                                    placeholder='Email '
                                    className='input-sm bg-bgLight border border-gray-700 text-white focus:outline-none focus:ring-0 rounded-md'
                                />
                            </div>
                            <div className='flex flex-col gap-y-1'>
                                <label htmlFor='password' className='text-xs'>
                                    Password
                                </label>
                                <input
                                    type='password'
                                    name='password'
                                    placeholder='Password'
                                    className='input-sm bg-bgLight border border-gray-700 text-white focus:outline-none focus:ring-0 rounded-md'
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

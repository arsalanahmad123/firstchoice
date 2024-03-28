import React from 'react'
import { MdEmail } from 'react-icons/md'
import { MdLock } from 'react-icons/md'
import back from '../assets/bgadmin.png'
const AdminScreen = () => {
    return (
        <div className='lg:flex lg:p-4 lg:justify-between lg:gap-x-6  min-h-screen adjust'>
            <div className='bg-white  hidden lg:flex lg:flex-col lg:justify-center lg:w-screen lg:p-16 lg:items-center '>
                <h1 className='font-bold lg:text-3xl lg:pb-5 text-center'>
                    W E L C O M E T O FIRST CHOICE CUNSULTANCY
                </h1>
                <p className='text-center leading-6'>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the when an unknown printer
                    took a galley of type and scrambled it to make a type
                </p>
            </div>
            <div className='lg:w-3/2 p-3  w-full  lg:min-h-full bg-contain  md:flex md:justify-center md:items-center relative'>
                <div className='absolute top-5 md:top-0 left-0 -z-10 '>
                    <img src={back} className='' />
                </div>
                <div
                    className={` md:w-96 p-5 bg-white flex flex-col justify-center rounded-3xl lg:min-h-full  `}
                >
                    <img src={Logo} className=' m-auto ' />
                    <p className='m-auto  font-bold text-lg lg:pt-7 lg:-mt-9'>
                        Sign Into Your Account
                    </p>

                    <div className='flex flex-col mt-3 '>
                        <label htmlFor='email'>Email:</label>
                        <div className='relative mt-2'>
                            <input
                                type='email'
                                placeholder='E-mail'
                                className='w-full pl-12 pr-4 py-3 rounded-lg bg-[#F5F5F7] focus:outline-none    focus:ring-0 focus:border-textActive'
                            />
                            <div className='absolute  inset-y-0  left-0 pr-3 flex items-center pointer-events-none  '>
                                <div className=' bg-darkorange h-full flex items-center px-2'>
                                    <MdEmail className='  size-6 rounded  text-white' />
                                </div>
                            </div>
                        </div>
                        <label htmlFor='password' className='mt-5'>
                            Password:
                        </label>
                        <div className='relative mt-2'>
                            <input
                                type='password'
                                placeholder='password'
                                className='w-full  pl-12 pr-4 py-3 rounded-lg bg-[#F5F5F7] focus:outline-none    focus:ring-0 focus:border-textActive'
                            />
                            <div className='absolute  inset-y-0  left-0 pr-3 flex items-center pointer-events-none  '>
                                <div className=' bg-darkorange h-full flex items-center px-2.5'>
                                    <MdLock className='  size-6 rounded  text-white' />
                                </div>
                            </div>
                        </div>
                        <div className='flex mt-3 items-center gap-x-2'>
                            <input
                                className='size-4 '
                                type='checkbox'
                                name=''
                                id=''
                            />
                            <label className='font-xl'>Remember Me</label>
                        </div>
                        <button
                            type='submit'
                            className='flex items-center justify-center m-auto bg-darkorange w-52 rounded-xl  py-3 mt-5 text-white'
                        >
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminScreen

import React from 'react'
import { MdEmail } from 'react-icons/md'
import { MdLock } from 'react-icons/md'
import Logo from '../assets/logo.png'
import backgroundVideo from '../assets/background.mp4'
const Login = () => {
    return (
        <div data-theme='dark' className='flex  justify-between  min-h-screen '>
            <div className=' flex flex-col justify-start w-full pt-16 items-center relative'>
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className='absolute min-h-full min-w-full top-0 left-0 object-cover'
                >
                    <source src={backgroundVideo} type='video/mp4' />
                    Your browser does not support HTML5 video.
                </video>
                <div className='flex justify-center items-center flex-col absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] w-full h-full bg-[rgba(0,0,0,0.7)]'>
                    <div className='flex justify-center items-center flex-col p-10 mb-auto'>
                        <h1 className='font-bold text-3xl py-5 text-center text-white'>
                            WELCOME TO FIRST CHOICE MANAGEMENT CUNSULTANCY
                        </h1>
                        <h1 className='font-semibold text-white'>
                            We Make Your Work Easier
                        </h1>
                    </div>
                </div>
            </div>
            <div className='lg:w-3/2 p-3  w-full  lg:min-h-full bg-lightGold  md:flex md:justify-center md:items-center relative'>
                <div
                    className={` md:w-96 p-5  bg-bgLight flex flex-col justify-center rounded-3xl min-h-[80vh]  `}
                    style={{ zIndex: 20 }}
                >
                    <img src={Logo} className='mb-10' />
                    <p className='text-white text-center  font-bold text-lg '>
                        Sign Into Your Account
                    </p>

                    <div className='flex flex-col mt-3 text-white'>
                        <label htmlFor='email'>Email:</label>
                        <div className='relative mt-2'>
                            <input
                                type='email'
                                placeholder='E-mail'
                                className='w-full pl-14 py-3 rounded-lg bg-gray-700 focus:outline-none    focus:ring-0 focus:border-textActive'
                            />
                            <div className='absolute  inset-y-0  left-0 pr-3 flex items-center pointer-events-none  '>
                                <div className=' bg-lightGold h-full flex items-center px-2 rounded'>
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
                                className='w-full  pl-14  py-3 rounded-lg bg-gray-700 focus:outline-none    focus:ring-0 focus:border-textActive'
                            />
                            <div className='absolute  inset-y-0  left-0 pr-3 flex items-center pointer-events-none  '>
                                <div className=' bg-lightGold h-full flex items-center px-2.5 rounded'>
                                    <MdLock className='  size-6 rounded  text-white' />
                                </div>
                            </div>
                        </div>
                        <div className='flex mt-3 items-center gap-x-2'>
                            <input
                                className='size-4    '
                                type='checkbox'
                                name=''
                                id=''
                            />
                            <label className='font-xl text-white'>
                                Remember Me
                            </label>
                        </div>
                        <button
                            type='submit'
                            className=' m-auto bg-lightGold    rounded-xl  py-3 w-full mt-5 text-gray-700'
                        >
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login

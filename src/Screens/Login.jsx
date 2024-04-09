import React, { useEffect } from 'react'
import Logo from '../assets/logo.png'
import backgroundVideo from '../assets/background.mp4'
import axios from 'axios'
const BASE_URL = import.meta.env.VITE_BASE_URL
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useAuth } from '../Context/AuthContext'
const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const { loggedIn } = useAuth()

    const login = async (data) => {
        try {
            const response = await axios.post(`${BASE_URL}/auth/login`, data)

            if (response.status === 200) {
                toast.success('Login Successful')
                sessionStorage.setItem('loggedIn', true)
                sessionStorage.setItem(
                    'company',
                    JSON.stringify(response.data.data),
                )
                sessionStorage.setItem('token', response.data.data.token)
                window.location.href = '/'
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    useEffect(() => {
        if (loggedIn) {
            window.location.href = '/'
        }
    })

    return (
        <div
            data-theme='dark'
            className='flex  justify-between  min-h-screen flex-col md:flex-row md:bg-lightGold'
        >
            <div className=' lg:flex flex-col justify-start w-full pt-16 items-center relative hidden'>
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

                    <form
                        onSubmit={handleSubmit(login)}
                        className='flex flex-col mt-3 text-white'
                    >
                        <label htmlFor='email'>Email:</label>
                        <div className='flex flex-col'>
                            <input
                                type='email'
                                placeholder='E-mail'
                                {...register('email', {
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: 'Invalid email address',
                                    },
                                })}
                                className='w-full pl-2 py-3 rounded-lg bg-gray-700 focus:outline-none    focus:ring-0 focus:border-textActive'
                            />
                            {errors.email && (
                                <p className='text-red-500'>
                                    {errors.email.message}
                                </p>
                            )}
                        </div>
                        <label htmlFor='password' className='mt-5'>
                            Password:
                        </label>
                        <div className='flex flex-col'>
                            <input
                                type='password'
                                placeholder='password'
                                {...register('password', {
                                    required: 'Password is required',
                                    minLength: {
                                        value: 6,
                                        message:
                                            'Password must be at least 6 characters',
                                    },
                                })}
                                className='w-full  pl-2  py-3 rounded-lg bg-gray-700 focus:outline-none    focus:ring-0 focus:border-textActive'
                            />
                            {errors.password && (
                                <p className='text-red-500'>
                                    {errors.password.message}
                                </p>
                            )}
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
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login

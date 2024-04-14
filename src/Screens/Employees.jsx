import React from 'react'
import Wrapper from '../Layout/Wrapper'
import { CgSearch } from 'react-icons/cg'
import image from '../assets/lifeline.png'
import { useFetch } from '../Hooks/useFetch'

const ViewEmployee = ({ employee }) => {
    return (
        <>
            <dialog id='my_modal_2' className='modal bg-black/50'>
                <div className='modal-box '>
                    <h3 className='font-bold text-lg text-white'>
                        Remove Employee Documents
                    </h3>
                    <div className='py-3 flex justify-center items-center gap-x-2'>
                        <div className='flex flex-row justify-center items-center gap-x-3 flex-wrap'>
                            {employee?.documents?.map((doc) => (
                                <div
                                    key={doc?._id}
                                    className='flex flex-col justify-center items-center gap-y-1'
                                >
                                    <a
                                        href={doc?.url}
                                        target='_blank'
                                        className='btn btn-xs btn-warning btn-outline text-gray-900 ml-auto'
                                    >
                                        {doc?.fileName}
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <form method='dialog' className='modal-backdrop'>
                    <button>close</button>
                </form>
            </dialog>
        </>
    )
}

const Employees = ({ id }) => {
    const toggleModal = () => {
        document.getElementById('my_modal_2').showModal()
    }

    const { data: employees } = useFetch(`employee/${id}`)

    return (
        <Wrapper title='Employees'>
            <div className='flex  justify-between  gap-x-20 lg:pt-4 px-5'>
                <div className='relative w-full'>
                    <input
                        type='text'
                        className='w-full lg:py-1 pl-5 lg:rounded-2xl bg-bgLight border-2 border-gray-700 text-white'
                    />
                    <CgSearch className='text-slate-700 m-auto absolute lg:right-5 lg:top-3  ' />
                </div>
            </div>
            <div
                className='flex gap-x-6 flex-row flex-wrap mx-5 mt-3 gap-y-5
                '
            >
                {employees?.map((employee, i) => (
                    <>
                        <div
                            className=' bg-gradient-to-r from-bgLight to-bgDarkColor text-white shadow-2xl  flex justify-center flex-col p-5 gap-y-5  min-h-36 min-w-80'
                            key={i}
                        >
                            <h2 className='font-extrabold text-2xl flex flex-row justify-between items-center'>
                                <span>Name: </span>
                                <span className='text-lightGold'>
                                    {employee?.name}
                                </span>
                            </h2>
                            <div className='flex flex-col gap-y-1'>
                                <p className='flex flex-row justify-between items-center'>
                                    <span>Nationality</span>
                                    <span className='border-b border-dashed'>
                                        {employee?.nationality}
                                    </span>
                                </p>
                                <p className='flex flex-row justify-between items-center'>
                                    <span>Labor Card Expiry</span>
                                    <span className='border-b border-dashed'>
                                        {new Date(
                                            employee?.labor_card_expiry,
                                        ).toLocaleDateString()}
                                    </span>
                                </p>
                                <p className='flex flex-row justify-between items-center'>
                                    <span>Labor Card No.</span>
                                    <span className='border-b border-dashed'>
                                        {employee?.labor_card_no}
                                    </span>
                                </p>
                                <p className='flex flex-row justify-between items-center'>
                                    <span>EID No.</span>
                                    <span className='border-b border-dashed'>
                                        {employee?.eid_no}
                                    </span>
                                </p>
                                <p className='flex flex-row justify-between items-center'>
                                    <span>EID Expiry</span>
                                    <span className='border-b border-dashed'>
                                        {new Date(
                                            employee?.eid_expiry,
                                        ).toLocaleDateString()}
                                    </span>
                                </p>
                            </div>
                            <div className='flex justify-between items-center '>
                                <button
                                    className='btn btn-xs btn-outline text-white'
                                    onClick={toggleModal}
                                >
                                    View Employee
                                </button>
                                <button className='btn btn-xs text-white bg-red-400 border-none hover:bg-red-500'>
                                    Delete Employee
                                </button>
                            </div>
                        </div>
                        <ViewEmployee key={i} employee={employee} />
                    </>
                ))}
                {employees?.length === 0 && (
                    <div className='text-center'>
                        <h1 className='text-3xl font-bold text-white'>
                            No Employee Found
                        </h1>
                    </div>
                )}
            </div>
        </Wrapper>
    )
}

export default Employees

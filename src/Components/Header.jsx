import React from 'react'
import { CgSearch } from 'react-icons/cg'
import { Link } from 'react-router-dom'
const Header = () => {
    return (
        <>
            <div className='flex  justify-between  gap-x-20 lg:pt-4 px-5'>
                <div className='relative w-full'>
                    <input
                        type='text'
                        className='w-full lg:py-1 pl-5 lg:rounded-2xl bg-bgLight border-2 border-gray-700 text-white'
                    />
                    <CgSearch className='text-slate-700 m-auto absolute lg:right-5 lg:top-3  ' />
                </div>
                <Link
                    to={'/companies/add-company'}
                    className='text-white flex justify-center items-center text-sm w-52 px-2 lg:py-1 lg:rounded-2xl bg-gradient-to-b from-yellow-400 to-yellow-600'
                >
                    Add New Company
                </Link>
            </div>
        </>
    )
}

export default Header

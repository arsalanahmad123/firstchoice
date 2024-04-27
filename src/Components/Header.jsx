import React from 'react'
import { CgSearch } from 'react-icons/cg'
import { Link } from 'react-router-dom'
const Header = ({
    handleCompanySearchInput,
    setExpiredFilter,
    expiredFilter,
}) => {
    return (
        <>
            <div className='flex  justify-between items-center  gap-x-20 lg:pt-4 px-5'>
                <div className='relative '>
                    <input
                        type='text'
                        placeholder='Search Company'
                        className='w-full lg:py-1 pl-5 lg:rounded-2xl bg-bgLight border-2 border-gray-700 text-white'
                        onChange={handleCompanySearchInput}
                    />
                    <CgSearch className='text-slate-700 m-auto absolute lg:right-5 lg:top-3  ' />
                </div>
                <span
                    className={`badge p-2 cursor-pointer ${
                        expiredFilter && 'text-white badge-ghost'
                    }`}
                    onClick={() => setExpiredFilter(true)}
                >
                    Expired Companies
                </span>
                <span
                    className={`badge p-2 cursor-pointer ${
                        !expiredFilter && 'text-white badge-ghost'
                    }`}
                    onClick={() => setExpiredFilter(false)}
                >
                    All Companies
                </span>
                <Link
                    to={'/companies/add-company'}
                    className='text-gray-900 font-bold flex justify-center items-center text-sm w-52 px-2 lg:py-1 lg:rounded-2xl bg-lightGold'
                >
                    Add New Company
                </Link>
            </div>
        </>
    )
}

export default Header

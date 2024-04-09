import React from 'react'
import { Link } from 'react-router-dom'

const CompanyCard = ({ company }) => {
    return (
        <>
            <div className='flex flex-col justify-center items-center gap-y-2 text-white rounded-xl  bg-bgLight p-5 text-center max-w-60'>
                <img src={company.logo.url} alt='' />
                <p className='pt-4'>{company.name}</p>
                <Link
                    to={`/companies/company/${company._id}`}
                    className='btn btn-xs btn-warning btn-outline text-gray-900'
                >
                    View Company
                </Link>
                <div className='flex justify-between items-center mx-2 gap-x-2'>
                    <button className='btn btn-xs btn-outline text-white'>
                        Edit Company
                    </button>
                    <button className='btn btn-xs text-white bg-red-400 border-none hover:bg-red-500'>
                        Delete Company
                    </button>
                </div>
            </div>
        </>
    )
}

export default CompanyCard

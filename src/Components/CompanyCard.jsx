import React from 'react'
import { FiPlus } from 'react-icons/fi'

const CompanyCard = (props) => {
    return (
        <div className='flex flex-col justify-center items-center gap-y-2 text-white rounded-xl  bg-bgLight p-5 text-center'>
            <img src={props.img} alt='' />
            <p className='pt-4'>{props.desc}</p>
            <div className='flex justify-between items-center mx-2 gap-x-2'>
                <button className='btn btn-xs btn-outline text-white'>
                    Edit Company
                </button>
                <button className='btn btn-xs text-white bg-red-400 border-none hover:bg-red-500'>
                    Delete Company
                </button>
            </div>
        </div>
    )
}

export default CompanyCard

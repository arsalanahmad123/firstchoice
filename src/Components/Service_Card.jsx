import React from 'react'

const Service_Card = (props) => {
    return (
        <div className=' bg-gradient-to-r from-bgLight to-bgDarkColor text-white shadow-2xl  flex justify-center flex-col p-5 gap-y-5  min-h-36 min-w-80'>
            <h2 className='font-extrabold text-xl'>{props.serviceName}</h2>
            <p className='flex items-center gap-x-4 '>
                Cost Price
                <span className='badge bg-darkorange border-none text-white'>
                    {props.costPrice}
                </span>
            </p>
            <div className='flex justify-between items-center mx-2'>
                <button className='btn btn-xs btn-outline text-white'>
                    Edit Service
                </button>
                <button className='btn btn-xs text-white bg-red-400 border-none hover:bg-red-500'>
                    Delete Service
                </button>
            </div>
        </div>
    )
}

export default Service_Card

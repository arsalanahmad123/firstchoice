import React from 'react'

const Service_Card = (props) => {
 

    return (
      <div className='flex  gap-x-6'>
            <div className="card w-72 text-white bg-bgLight left-6 top-7  ">
            <div className="card-body items-center text-center">
                <h2 className="card-title">{props.Service_Name}</h2>
                <p className='flex items-center gap-x-2 '>Sale Price<span className='badge badge-neutral'>34</span></p>
                <p className='flex items-center gap-x-2 '>Cost Price<span className='badge badge-neutral'>34</span></p>
                

            </div>
        </div>
       
        </div>

    )
}

export default Service_Card
import React from 'react'
import AppLayout from '../Layout/AppLayout'
import Wrapper from '../Layout/Wrapper'
import { CgSearch } from 'react-icons/cg'

const Orders = () => {
    return (
        <>
            <Wrapper title={'All Orders'}>
                <div className='flex  justify-between items-center  gap-x-20 lg:pt-4 px-5'>
                    <div className='relative'>
                        <input
                            type='text'
                            className='w-full lg:py-1 pl-5 lg:rounded-2xl bg-bgLight border-2 border-gray-700 text-white'
                        />
                        <CgSearch className='text-slate-700 m-auto absolute lg:right-5 lg:top-3  ' />
                    </div>
                    <div className='flex justify-center items-center gap-x-3'>
                        <span className='badge badge-neutral py-3 cursor-pointer  '>
                            pending
                        </span>
                        <span className='badge badge-neutral py-3  cursor-pointer'>
                            completed
                        </span>
                    </div>
                </div>
                <div className='overflow-x-auto  bg-bgLight max-h-[80vh] mt-10 mx-5 rounded-xl '>
                    <table className='table table-md  text-white '>
                        <thead>
                            <tr className='bg-darkorange text-white border-gray-700'>
                                <th>Order ID</th>
                                <th>Company</th>
                                <th>Quantity</th>
                                <th>Total Price</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.from({ length: 10 }).map((_, i) => (
                                <tr className='border-gray-700'>
                                    <td>839</td>
                                    <td>Star Bucks</td>
                                    <td>90</td>
                                    <td>$900</td>
                                    <td>
                                        <span className='badge badge-success text-white'>
                                            Completed
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Wrapper>
        </>
    )
}

export default AppLayout()(Orders)

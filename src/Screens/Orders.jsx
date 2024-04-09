import React from 'react'
import AppLayout from '../Layout/AppLayout'
import Wrapper from '../Layout/Wrapper'
import { CgSearch } from 'react-icons/cg'

const dummData = [
    {
        id: 1,
        name: 'KFC',
        quantity: 10,
        total_price: 2000,
        status: 'pending',
    },
    {
        id: 2,
        name: 'Burger King',
        quantity: 20,
        total_price: 4000,
        status: 'completed',
    },
    {
        id: 3,
        name: 'Pizza Hut',
        quantity: 30,
        total_price: 6000,
        status: 'submitted',
    },
]

const selectedOption = 'bg-lightGold text-black'

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
                <div className='overflow-x-auto  bg-bgLight max-h-[76vh] mt-10 mx-5 rounded-xl '>
                    <table className='table table-md   '>
                        <thead>
                            <tr className='bg-lightGold text-gray-900 border-gray-700'>
                                <th>Order ID</th>
                                <th>Company</th>
                                <th>Quantity</th>
                                <th>Total Price</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dummData.map((item) => (
                                <tr key={item.id}>
                                    <td className='text-white'>{item.id}</td>
                                    <td className='text-white'>{item.name}</td>
                                    <td className='text-white'>
                                        {item.quantity}
                                    </td>
                                    <td className='text-white'>
                                        {item.total_price}
                                    </td>
                                    <td>
                                        <select
                                            name='update-status'
                                            id='update-status'
                                            className={`bg-bgLight border border-lightGold text-white focus:outline-none p-1 rounded-lg      
                                            `}
                                        >
                                            <option
                                                value={item.status}
                                                className={selectedOption}
                                            >
                                                {item.status}
                                            </option>
                                            <option value='waiting for payment'>
                                                Waiting for payment
                                            </option>
                                            <option value='documents received'>
                                                Documents received
                                            </option>
                                            <option value='in process'>
                                                In process
                                            </option>
                                            <option value='approved'>
                                                Approved
                                            </option>
                                            <option value='return for modification'>
                                                Return for Modification
                                            </option>
                                            <option value='rejected'>
                                                Rejected
                                            </option>
                                            <option value='completed'>
                                                Completed
                                            </option>
                                        </select>
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

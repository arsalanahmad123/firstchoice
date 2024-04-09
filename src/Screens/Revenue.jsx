import React from 'react'
import AppLayout from '../Layout/AppLayout'
import Wrapper from '../Layout/Wrapper'
import { FaMoneyBillAlt } from 'react-icons/fa'
import { FaMoneyBillTrendUp } from 'react-icons/fa6'

const Revenue = () => {
    return (
        <>
            <Wrapper title={'Revenue'}>
                <div className='flex justify-center items-center mt-5 mx-5 gap-x-5'>
                    <div className='rounded-lg bg-card1 text-black relative w-96 h-32 px-4'>
                        <FaMoneyBillAlt className='size-12 text-card1 absolute -top-2 -right-2 bg-bgDarkColor rounded-full border-[10px] border-bgDarkColor' />
                        <div className='flex flex-col justify-center  h-full pt-2'>
                            <h2 className='text-xl font-semibold uppercase w-28'>
                                DAILY REVENUE
                            </h2>
                            <p className='text-3xl font-bold text-darkorange italic  text-right'>
                                $0
                            </p>
                        </div>
                    </div>
                    <div className=' bg-card2 text-black relative h-32 w-96 px-4 rounded-lg'>
                        <FaMoneyBillTrendUp className='size-12 text-card2 absolute -top-2 -right-2 bg-bgDarkColor rounded-full border-[10px] border-bgDarkColor' />
                        <div className='flex flex-col justify-center h-full pt-2'>
                            <h2 className='text-xl font-semibold uppercase w-10'>
                                Monthly REVENUE
                            </h2>
                            <p className='text-3xl font-bold text-darkorange italic text-right '>
                                $200
                            </p>
                        </div>
                    </div>
                </div>
                <div className='max-h-[50vh] bg-bgLight mx-5 mt-4 rounded-lg overflow-x-auto'>
                    <table className='table table-md  text-white '>
                        <thead>
                            <tr className='bg-lightGold text-gray-900'>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Amount</th>
                                <th>Used By</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.from({ length: 10 }).map((_, i) => (
                                <tr className='border-gray-700'>
                                    <td>Cy Ganderton</td>
                                    <td>Littel, Schaden and Vandervort</td>
                                    <td>$900</td>
                                    <td>StarBucks</td>
                                    <td>12/16/2020</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Wrapper>
        </>
    )
}

export default AppLayout()(Revenue)

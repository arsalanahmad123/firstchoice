import React from 'react'

const DashboarTable = () => {
    return (
        <>
            <div className='overflow-x-auto  bg-bgLight max-h-[35vh] mt-1 rounded-xl w-full'>
                <h4 className='text-white text-2xl p-3 italic font-bold'>
                    New Orders
                </h4>
                <table className='table table-md  text-white '>
                    <thead>
                        <tr className='bg-darkorange text-white border-none text-[15px]'>
                            <th>Order ID</th>
                            <th>Company</th>
                            <th>Quantity</th>
                            <th>Total Price</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className='border-none'>
                            <td>839</td>
                            <td>Star Bucks</td>
                            <td>90</td>
                            <td>$900</td>
                            <td>
                                <span className='badge badge-success text-white'>
                                    Pending
                                </span>
                            </td>
                        </tr>
                        <tr className='border-none'>
                            <td>839</td>
                            <td>Star Bucks</td>
                            <td>90</td>
                            <td>$900</td>
                            <td>
                                <span className='badge badge-success text-white'>
                                    Pending
                                </span>
                            </td>
                        </tr>
                        <tr className='border-none'>
                            <td>839</td>
                            <td>Star Bucks</td>
                            <td>90</td>
                            <td>$900</td>
                            <td>
                                <span className='badge badge-success text-white'>
                                    Pending
                                </span>
                            </td>
                        </tr>
                        <tr className='border-none'>
                            <td>839</td>
                            <td>Star Bucks</td>
                            <td>90</td>
                            <td>$900</td>
                            <td>
                                <span className='badge badge-success text-white'>
                                    Pending
                                </span>
                            </td>
                        </tr>
                        <tr className='border-none'>
                            <td>839</td>
                            <td>Star Bucks</td>
                            <td>90</td>
                            <td>$900</td>
                            <td>
                                <span className='badge badge-success text-white'>
                                    Pending
                                </span>
                            </td>
                        </tr>
                        <tr className='border-none'>
                            <td>839</td>
                            <td>Star Bucks</td>
                            <td>90</td>
                            <td>$900</td>
                            <td>
                                <span className='badge badge-success text-white'>
                                    Pending
                                </span>
                            </td>
                        </tr>
                        <tr className='border-none'>
                            <td>839</td>
                            <td>Star Bucks</td>
                            <td>90</td>
                            <td>$900</td>
                            <td>
                                <span className='badge badge-success text-white'>
                                    Pending
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default DashboarTable

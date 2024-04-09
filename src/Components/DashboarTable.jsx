import React from 'react'

const DashboarTable = ({ invoices }) => {
    return (
        <>
            <div className='overflow-x-auto  bg-bgLight max-h-[35vh] mt-1 rounded-xl w-full'>
                <h4 className='text-white text-2xl p-3 italic font-bold'>
                    New Orders
                </h4>
                <table className='table table-md  text-white '>
                    <thead>
                        <tr className='bg-lightGold text-gray-900 border-none text-[15px]'>
                            <th>Order ID</th>
                            <th>Company</th>
                            <th>Quantity</th>
                            <th>Total Price</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoices?.map((invoice) => (
                            <tr className='border-none'>
                                <td>{invoice._id}</td>
                                <td>{invoice.company_id}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default DashboarTable

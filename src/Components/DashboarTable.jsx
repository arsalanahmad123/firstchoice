import React, { useEffect, useState } from 'react'

const DashboarTable = ({ invoices }) => {
    const [totalQuantity, setTotalQuantity] = useState(0)

    useEffect(() => {
        calculateTotalQuantity()
    }, []) // Run only once after the component mounts

    const calculateTotalQuantity = () => {
        let total = 0
        invoices?.forEach((invoice) => {
            invoice.services.forEach((service) => {
                total += service.quantity
            })
        })
        setTotalQuantity(total)
    }

    return (
        <>
            <div className='overflow-x-auto bg-bgLight max-h-[35vh] mt-1 rounded-xl w-full'>
                <h4 className='text-white text-2xl p-3 italic font-bold'>
                    New Orders
                </h4>
                <table className='table table-md text-white'>
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
                            <tr key={invoice._id} className='border-none'>
                                <td>{invoice._id}</td>
                                <td>{invoice.company}</td>
                                <td>{totalQuantity}</td>
                                <td>{invoice.total_price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default DashboarTable

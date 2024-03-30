import React from 'react'

const Table = () => {
    return (
        <div className='overflow-x-auto bg-bgLight max-h-[70vh] mx-5 mt-5 rounded-md'>
            <table className='table table-md  text-white '>
                <thead>
                    <tr className='bg-darkorange text-white'>
                        <th>Invoice ID</th>
                        <th>Company</th>
                        <th>Quantity</th>
                        <th>Total Price</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th>Color</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.from({ length: 10 }).map((_, i) => (
                        <tr className='border-gray-700'>
                            <th>10</th>
                            <td>Cy Ganderton</td>
                            <td>Quality Control Specialist</td>
                            <td>Littel, Schaden and Vandervort</td>
                            <td>Canada</td>
                            <td>12/16/2020</td>
                            <td>Blue</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Table

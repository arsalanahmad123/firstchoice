import React from 'react'
import AppLayout from '../Layout/AppLayout'
import Wrapper from '../Layout/Wrapper'

const Work = () => {
    return (
        <>
            <Wrapper title={'Reference Work'}>
                <div className='overflow-x-auto bg-bgLight text-white mx-5 rounded-lg mt-5 '>
                    <table className='table table-md shadow-2xl'>
                        <thead className='bg-lightGold text-gray-900'>
                            <tr className='border-none'>
                                <th>ID</th>
                                <th>User Name</th>
                                <th>Company</th>
                                <th>Cost Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className='border-none'>
                                <th>1</th>
                                <td>Cy Ganderton</td>
                                <td>StarBucks</td>
                                <td>$900</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Wrapper>
        </>
    )
}

export default AppLayout()(Work)

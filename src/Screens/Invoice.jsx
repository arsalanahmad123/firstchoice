import React from 'react'
import AppLayout from '../Layout/AppLayout'
import Wrapper from '../Layout/Wrapper'
import Table from '../Components/Table'

const Invoice = () => {
    return (
        <>
            <Wrapper title={'Invoice'}>
                <h1 className='text-white mt-3'>Our Latest Invoices</h1>
               <Table />
            </Wrapper>
        </>
    )
}

export default AppLayout()(Invoice)

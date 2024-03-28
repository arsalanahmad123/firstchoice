import React from 'react'
import AppLayout from '../Layout/AppLayout'
import Wrapper from '../Layout/Wrapper'
import Table from '../Components/Table'

const Invoice = () => {
    return (
        <>
<<<<<<< HEAD
            <Wrapper title={'Latest Invoices'}>
                <Table />
=======
            <Wrapper title={'Invoice'}>
                <h1 className='text-white mt-3'>Our Latest Invoices </h1>
               <Table />
>>>>>>> f8ec52cde06ca2674539b5a23436e3bfb24ceb84
            </Wrapper>
        </>
    )
}

export default AppLayout()(Invoice)

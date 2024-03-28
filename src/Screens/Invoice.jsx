import React from 'react'
import AppLayout from '../Layout/AppLayout'
import Wrapper from '../Layout/Wrapper'
import Table from '../Components/Table'

const Invoice = () => {
    return (
        <>
            <Wrapper title={'Latest Invoices'}>
                <Table />
            </Wrapper>
        </>
    )
}

export default AppLayout()(Invoice)

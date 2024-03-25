import React from 'react'
import AppLayout from '../Layout/AppLayout'
import Wrapper from '../Layout/Wrapper'

const Expense = () => {
    return (
        <>
            <Wrapper title={'Expenses'}></Wrapper>
        </>
    )
}

export default AppLayout()(Expense)

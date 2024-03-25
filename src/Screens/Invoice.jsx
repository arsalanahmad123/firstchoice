import React from 'react'
import AppLayout from '../Layout/AppLayout'
import Wrapper from '../Layout/Wrapper'

const Invoice = () => {
    return (
        <>
            <Wrapper title={'Invoice'}></Wrapper>
        </>
    )
}

export default AppLayout()(Invoice)

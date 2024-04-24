import React from 'react'
import Navbar from './Navbar'

const Wrapper = ({ children, title }) => {
    return (
        <>
            <div className='min-w-[80%] mx-auto flex flex-col overflow-hidden overflow-y-auto pb-4'>
                <Navbar title={title} />
                {children}
            </div>
        </>
    )
}

export default Wrapper

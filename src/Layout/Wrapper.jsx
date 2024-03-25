import React from 'react'
import Navbar from './Navbar'

const Wrapper = ({ children, title }) => {
    return (
        <>
            <div className='lg:min-w-[75%] mx-auto flex flex-col overflow-hidden'>
                <Navbar title={title} />
                {children}
            </div>
        </>
    )
}

export default Wrapper

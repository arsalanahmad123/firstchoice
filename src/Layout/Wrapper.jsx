import React from 'react'
import Navbar from './Navbar'

const Wrapper = ({ children, title }) => {
    return (
        <>
            <div className='min-w-[80%] mx-auto flex flex-col overflow-hidden overflow-y-auto'>
                <Navbar title={title} />
                {children}
            </div>
        </>
    )
}

export default Wrapper

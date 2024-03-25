import React from 'react'

const Navbar = ({ title }) => {
    return (
        <>
            <div className='flex justify-between items-center px-5 pt-7 pb-1 border-b border-bgLight'>
                <h3 className='text-2xl text-white'>{title}</h3>
                <h4 className='text-sm text-white'>Welcome Admin</h4>
            </div>
        </>
    )
}

export default Navbar

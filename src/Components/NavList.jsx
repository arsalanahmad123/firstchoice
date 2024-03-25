import React from 'react'
import { NavLink } from 'react-router-dom'

const NavList = ({ icon, title, link }) => {
    return (
        <>
            <li className='w-[70%]'>
                <NavLink
                    to={link}
                    className='text-lg  text-left flex justify-start items-center px-5 py-2 text-white gap-x-2 rounded-3xl '
                >
                    {icon}
                    {title}
                </NavLink>
            </li>
        </>
    )
}

export default NavList

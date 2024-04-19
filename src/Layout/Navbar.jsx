import { useState } from 'react'
import { BiChevronDown, BiChevronUp } from 'react-icons/bi'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
const Navbar = ({ title }) => {
    const [show, setShow] = useState(false)
    const navigate = useNavigate()
    const companyName = JSON.parse(localStorage.getItem('company'))?.username

    const handleLogout = async () => {
        localStorage.removeItem('token')
        localStorage.removeItem('company')
        localStorage.removeItem('loggedIn')
        navigate('/login')
        toast.success('Logout Successful')
    }

    return (
        <>
            <div className='flex justify-between items-center px-5 pt-7 pb-1 border-b border-gray-700 sticky top-0 bg-bgLight z-50'>
                <h3 className='text-3xl text-white'>{title}</h3>
                <div
                    className='relative flex justify-center items-center  hover:bg-bgLight px-6 py-2 rounded-md'
                    onClick={() => setShow(!show)}
                >
                    <span className='cursor-pointer'>{companyName}</span>
                    {show ? (
                        <BiChevronUp className='text-white cursor-pointer' />
                    ) : (
                        <BiChevronDown className='text-white cursor-pointer' />
                    )}
                    {show && (
                        <div className='absolute top-12 right-0 bg-bgLight shadow-2xl shadow-gray-800 rounded-lg z-50 p-5 '>
                            <button
                                className='text-white w-full px-5 py-2 rounded-lg bg-red-500 font-semibold'
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Navbar

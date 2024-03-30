import React from 'react'
import AppLayout from '../Layout/AppLayout'
import Wrapper from '../Layout/Wrapper'
import Table from '../Components/Table'
import Header from '../Components/Header'
import { CgSearch } from 'react-icons/cg'

const Invoice = () => {
    return (
        <>
            <Wrapper title={'Invoice'}>
                <h1 className='text-white mt-3'>Our Latest Invoices </h1>

                <div className="flex  justify-between items-center  gap-x-20 lg:pt-4 px-5">
                    <div className="relative">
                        <input
                            type="text"
                            className="w-full lg:py-1 pl-5 lg:rounded-2xl bg-bgLight border-2 border-gray-700 text-white"
                        />
                        <CgSearch className="text-slate-700 m-auto absolute lg:right-5 lg:top-3  " />
                    </div>
                    <div className='flex justify-center items-center gap-x-3'>
                    <span className='badge badge-warning py-3 cursor-pointer  '>pending</span>
                    <span className='badge badge-success py-3  cursor-pointer'>completed</span>
                    </div>
                    <button className="text-white text-sm w-52 px-2 lg:py-1 lg:rounded-2xl bg-gradient-to-b from-yellow-400 to-yellow-600">
                        Add New Company
                    </button>
                </div>
                <Table />
            </Wrapper>
        </>
    )
}

export default AppLayout()(Invoice)

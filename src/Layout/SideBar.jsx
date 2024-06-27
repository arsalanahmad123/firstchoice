import React from 'react'
import { FiHome, FiBell, FiLogOut } from 'react-icons/fi'
import { CiReceipt as Receipt } from 'react-icons/ci'
import { CgOrganisation as Organization } from 'react-icons/cg'
import { GrCatalogOption as Services } from 'react-icons/gr'
import { AiOutlineSolution as Work } from 'react-icons/ai'
import { SiExpensify as Expense } from 'react-icons/si'
import { GiProfit as Profit } from 'react-icons/gi'
import { TbChartHistogram as Orders } from 'react-icons/tb'
import NavList from '../Components/NavList'
import logo from '../assets/Logo.png'

const SideBar = () => {
    return (
        <>
            <div
                className='max-w-[20%] bg-bgLight min-h-screen flex flex-col pt-8 px-3 '
                id='sidebar'
            >
                <img src={logo} alt='Logo' />
                <ul className='flex flex-col justify-center items-center w-full gap-y-2 mt-5'>
                    <NavList
                        icon={
                            <FiHome
                                className='text-lg '
                                style={{ fontWeight: 'bolder' }}
                            />
                        }
                        title='Dashboard'
                        link='/'
                    />
                    <NavList
                        icon={
                            <Organization
                                className='text-lg '
                                style={{ fontWeight: 'bolder' }}
                            />
                        }
                        title='Companies'
                        link='/companies'
                    />
                    <NavList
                        icon={
                            <Orders
                                className='text-lg '
                                style={{ fontWeight: 'bolder' }}
                            />
                        }
                        title='Orders'
                        link='/orders'
                    />
                    <NavList
                        icon={
                            <Receipt
                                className='text-lg '
                                style={{ fontWeight: 'bolder' }}
                            />
                        }
                        title='Add Invoice'
                        link='/invoice'
                    />
                    <NavList
                        icon={
                            <Receipt
                                className='text-lg '
                                style={{ fontWeight: 'bolder' }}
                            />
                        }
                        title='Single Invoice'
                        link='/singleinvoice'
                    />
                    <NavList
                        icon={
                            <Services
                                className='text-lg '
                                style={{ fontWeight: 'bolder' }}
                            />
                        }
                        title='Services'
                        link='/services'
                    />
                    <NavList
                        icon={
                            <Work
                                className='text-lg '
                                style={{ fontWeight: 'bolder' }}
                            />
                        }
                        title='Ref Work'
                        link='/work'
                    />
                    <NavList
                        icon={
                            <Expense
                                className='text-lg '
                                style={{ fontWeight: 'bolder' }}
                            />
                        }
                        title='Expense'
                        link='/expense'
                    />
                    <NavList
                        icon={
                            <Profit
                                className='text-lg '
                                style={{ fontWeight: 'bolder' }}
                            />
                        }
                        title='Revenue'
                        link='/revenue'
                    />
                </ul>
            </div>
        </>
    )
}

export default SideBar

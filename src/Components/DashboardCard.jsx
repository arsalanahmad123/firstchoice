import React from 'react'
import { MdGroupWork } from 'react-icons/md'
import { GiProfit } from 'react-icons/gi'
import { FaSortAmountUp } from 'react-icons/fa'
import { HiBuildingOffice2 } from 'react-icons/hi2'
import { FaFileInvoiceDollar } from 'react-icons/fa6'
import { Link } from 'react-router-dom'

const DashboardCard = ({
    pendingInvoices,
    totalCompanies,
    dailyRevenue,
    profit,
    invoices,
}) => {
    const companiesLength = totalCompanies?.length
    return (
        <>
            <div className='flex flex-row justify-between  items-center py-2 gap-x-3 w-full'>
                <Link
                    to='/invoice'
                    className='rounded-lg bg-card1 text-black relative h-32 w-52 px-4'
                >
                    <MdGroupWork className='size-12 text-card1 absolute -top-2 -right-2 bg-bgDarkColor rounded-full border-[10px] border-bgDarkColor' />
                    <div className='flex flex-col justify-center  h-full pt-2'>
                        <h2 className='text-xl font-semibold uppercase w-28'>
                            Pending Works
                        </h2>
                        <p className='text-3xl font-bold text-darkorange italic  text-right'>
                            {pendingInvoices || 0}
                        </p>
                    </div>
                </Link>
                <Link
                    to={'/companies'}
                    className=' bg-card2 text-black relative h-32 w-52 px-4 rounded-lg'
                >
                    <HiBuildingOffice2 className='size-12 text-card2 absolute -top-2 -right-2 bg-bgDarkColor rounded-full border-[10px] border-bgDarkColor' />
                    <div className='flex flex-col justify-center h-full pt-2'>
                        <h2 className='text-xl font-semibold uppercase w-10'>
                            Total Companies
                        </h2>
                        <p className='text-3xl font-bold text-darkorange italic text-right '>
                            {companiesLength || 0}
                        </p>
                    </div>
                </Link>
                <Link
                    to={'/revenue'}
                    className=' bg-card3 text-black relative h-32 w-52 px-4 rounded-lg'
                >
                    <FaSortAmountUp className='size-12 text-card3 absolute -top-2 -right-2 bg-bgDarkColor rounded-full border-[10px] border-bgDarkColor' />
                    <div className='flex flex-col justify-center  h-full pt-2'>
                        <h2 className=' text-xl font-semibold uppercase w-28'>
                            Daily Revenue
                        </h2>
                        <p className='text-3xl font-bold text-darkorange italic text-right'>
                            {dailyRevenue || 0}
                        </p>
                    </div>
                </Link>
                <div className=' bg-card4 text-black relative h-32 w-52 px-4 rounded-lg'>
                    <GiProfit className='size-12 text-card4 absolute -top-2 -right-2 bg-bgDarkColor rounded-full border-[10px] border-bgDarkColor' />
                    <div className='flex flex-col justify-center  h-full pt-2 '>
                        <h2 className='text-xl font-semibold uppercase w-28'>
                            Monthly Profit
                        </h2>
                        <p className='text-3xl font-bold text-darkorange italic text-right'>
                            {profit || 0}
                        </p>
                    </div>
                </div>
                <Link
                    to={'/invoice'}
                    className=' bg-card5 text-black relative h-32 w-52 px-4 rounded-lg'
                >
                    <FaFileInvoiceDollar className='size-12 text-card4 absolute -top-2 -right-2 bg-bgDarkColor rounded-full border-[10px] border-bgDarkColor' />
                    <div className='flex flex-col justify-center h-full pt-2'>
                        <h2 className='text-xl font-semibold uppercase w-28'>
                            Total Invoices
                        </h2>
                        <p className='text-3xl font-bold text-darkorange italic text-right'>
                            {invoices || 0}
                        </p>
                    </div>
                </Link>
            </div>
        </>
    )
}

export default DashboardCard

import React, { useEffect, useState } from 'react'
import AppLayout from '../Layout/AppLayout'
import Wrapper from '../Layout/Wrapper'
import DashboardCard from '../Components/DashboardCard'
import DashboarTable from '../Components/DashboarTable'
import DashboardChart from '../Components/DashboardChart'
import { useFetch } from '../Hooks/useFetch'
const Dashboard = () => {
    const [pendingInvoices, setPendingInvoices] = useState(null)
    const { data: totalCompanies } = useFetch('companies')
    const { data: dailyRevenue } = useFetch('revenue')
    const { data: profit } = useFetch('profit')
    const { data: invoices } = useFetch('invoices')
    const invoicesLength = invoices?.length

    useEffect(() => {
        setPendingInvoices(
            invoices?.filter((invoice) => invoice.pending_amount > 0),
        )
    }, [invoices])
    return (
        <>
            <Wrapper title={'Dashboard'}>
                <div className='flex flex-col justify-center items-start px-5 rounded-md mt-1 gap-y-2'>
                    <div className='flex flex-col justify-start items-start gap-x-4  min-h-screen w-full'>
                        <DashboardCard
                            pendingInvoices={pendingInvoices?.length}
                            totalCompanies={totalCompanies?.length}
                            dailyRevenue={dailyRevenue}
                            profit={profit}
                            invoices={invoicesLength}
                        />
                        <DashboarTable invoices={invoices} />
                        <div className='flex justify-center items-center mt-2 bg-bgLight rounded-lg w-full py-2'>
                            <DashboardChart />
                        </div>
                    </div>
                </div>
            </Wrapper>
        </>
    )
}

export default AppLayout()(Dashboard)

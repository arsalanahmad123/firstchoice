import React, { useMemo } from 'react'
import AppLayout from '../Layout/AppLayout'
import Wrapper from '../Layout/Wrapper'
import DashboardCard from '../Components/DashboardCard'
import DashboarTable from '../Components/DashboarTable'
import { useFetch } from '../Hooks/useFetch'
const Dashboard = () => {
    const { data: totalCompanies } = useFetch('companies')
    const { data: dailyRevenue } = useFetch('revenue')
    const { data: profit } = useFetch('profit')
    const { data: invoices, fetchData } = useFetch('invoices')
    const invoicesLength = invoices?.length
    const { data: pendingInvoices, fetchData: fetchPendingInvoices } =
        useFetch('invoices/pending')
    const { data: totalPendingAmount } = useFetch(
        'invoices/get-total-pending-amount',
    )
    const memoizedData = useMemo(
        () => ({
            totalCompanies,
            dailyRevenue,
            profit,
            invoicesLength,
        }),
        [totalCompanies, dailyRevenue, profit, invoicesLength],
    )

    return (
        <>
            <Wrapper title={'Dashboard'}>
                <div className='flex flex-col justify-center items-start px-5 rounded-md mt-1 gap-y-2'>
                    <div className='flex flex-col justify-start items-start gap-x-4  min-h-screen w-full'>
                        <DashboardCard
                            pendingInvoices={pendingInvoices?.length}
                            totalCompanies={memoizedData.totalCompanies}
                            dailyRevenue={memoizedData.dailyRevenue}
                            profit={memoizedData.profit}
                            invoices={memoizedData.invoicesLength}
                            totalPendingAmount={totalPendingAmount}
                        />
                        <DashboarTable
                            invoices={pendingInvoices}
                            fetchData={fetchPendingInvoices}
                        />
                    </div>
                </div>
            </Wrapper>
        </>
    )
}

export default AppLayout()(Dashboard)

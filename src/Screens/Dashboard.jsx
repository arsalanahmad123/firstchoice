import React from 'react'
import AppLayout from '../Layout/AppLayout'
import Wrapper from '../Layout/Wrapper'
import DashboardCard from '../Components/DashboardCard'
import DashboarTable from '../Components/DashboarTable'
import DashboardChart from '../Components/DashboardChart'
const Dashboard = () => {
    return (
        <>
            <Wrapper title={'Dashboard'}>
                <div className='flex flex-col justify-center items-start px-5 rounded-md mt-1 gap-y-2'>
                    <div className='flex flex-col justify-start items-start gap-x-4  min-h-screen w-full'>
                        <DashboardCard />
                        <DashboarTable />
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

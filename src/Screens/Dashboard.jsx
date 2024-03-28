import React from 'react'
import AppLayout from '../Layout/AppLayout'
import Wrapper from '../Layout/Wrapper'
import DashboardCard from '../Components/DashboardCard'
// import Donut from '../Components/Donut'
const Dashboard = () => {
    return (
        <>
            <Wrapper title={'Dashboard'}>
                <div className='flex justify-between items-start px-5 rounded-md mt-1 gap-x-2'>
                    <div className='flex flex-col justify-start items-start gap-x-4 w-[65%] min-h-screen'>
                        <DashboardCard />
                        <div className='w-full bg-bgLight flex justify-center items-center p-10'>
                            {/* <Donut className="-lg:ml-9 "/> */}
                             <h1 className="text-white">Chart will be here</h1> 
                        </div>
                    </div>
                    <div className='flex flex-col justify-center items-center w-[35%] min-h-screen bg-bgLight'></div>
                </div>
            </Wrapper>
        </>
    )
}

export default AppLayout()(Dashboard)

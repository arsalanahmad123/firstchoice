import { useMemo } from 'react'
import AppLayout from '../Layout/AppLayout'
import Wrapper from '../Layout/Wrapper'
import { FaMoneyBillAlt } from 'react-icons/fa'
import { FaMoneyBillTrendUp } from 'react-icons/fa6'
import { useFetch } from '../Hooks/useFetch'

const Revenue = () => {
    const { data: dailyRevenue } = useFetch('revenue')
    const { data: monthlyRevenue } = useFetch('revenue/monthly')

    const memoizedData = useMemo(
        () => ({
            dailyRevenue,
            monthlyRevenue,
        }),
        [dailyRevenue, monthlyRevenue],
    )

    return (
        <>
            <Wrapper title={'Revenue'}>
                <div className='flex justify-center items-center mt-5 mx-5 gap-x-5 w-full max-h-screen'>
                    <div className='rounded-lg bg-card1 text-black relative min-h-40 min-w-96 px-4'>
                        <FaMoneyBillAlt className='size-12 text-card1 absolute -top-2 -right-2 bg-bgDarkColor rounded-full border-[10px] border-bgDarkColor ' />
                        <div className='flex flex-col justify-center  h-full pt-2'>
                            <h2 className='text-xl font-semibold uppercase w-28'>
                                DAILY REVENUE
                            </h2>
                            <p className='text-3xl font-bold text-darkorange italic  text-right mt-10'>
                                AED {memoizedData?.dailyRevenue || 0}
                            </p>
                        </div>
                    </div>
                    <div className=' bg-card2 text-black relative px-4 rounded-lg min-h-40 min-w-96'>
                        <FaMoneyBillTrendUp className='size-12 text-card2 absolute -top-2 -right-2 bg-bgDarkColor rounded-full border-[10px] border-bgDarkColor' />
                        <div className='flex flex-col justify-center h-full pt-2'>
                            <h2 className='text-xl font-semibold uppercase w-10'>
                                Monthly REVENUE
                            </h2>
                            <p className='text-3xl font-bold text-darkorange italic text-right mt-10'>
                                AED {memoizedData?.monthlyRevenue || 0}
                            </p>
                        </div>
                    </div>
                </div>
            </Wrapper>
        </>
    )
}

export default AppLayout()(Revenue)

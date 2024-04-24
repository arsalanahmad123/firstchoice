import { useEffect, useMemo, useState } from 'react'
import AppLayout from '../Layout/AppLayout'
import Wrapper from '../Layout/Wrapper'
import { FaMoneyBillAlt } from 'react-icons/fa'
import { FaMoneyBillTrendUp } from 'react-icons/fa6'
import { useFetch } from '../Hooks/useFetch'
import Loader from '../Components/Loader'

const Revenue = () => {
    const { data: dailyRevenue } = useFetch('revenue/daily')
    const { data: monthlyRevenue } = useFetch('revenue/monthly')
    const { data: revenues, loading } = useFetch('revenue')
    const [filteredRevenues, setFilteredRevenues] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)

    const ITEMS_PER_PAGE = 10

    const displayedRevenues = useMemo(() => {
        if (!filteredRevenues || filteredRevenues.length === 0) {
            return []
        }
        const indexOfLastItem = currentPage * ITEMS_PER_PAGE
        return filteredRevenues.slice(0, indexOfLastItem)
    }, [filteredRevenues, currentPage])

    const loadNextPage = () => {
        setCurrentPage(currentPage + 1)
    }

    const memoizedData = useMemo(
        () => ({
            dailyRevenue,
            monthlyRevenue,
        }),
        [dailyRevenue, monthlyRevenue],
    )

    useEffect(() => {
        setFilteredRevenues(revenues)
    }, [revenues])

    const handleInputChange = (e) => {
        const value = e.target.value
        setFilteredRevenues(
            revenues.filter(
                (revenue) =>
                    new Date(revenue.createdAt).toLocaleDateString() ===
                    new Date(value).toLocaleDateString(),
            ),
        )
        if (value === '') {
            setFilteredRevenues(revenues)
        }
    }

    return (
        <>
            <Wrapper title={'Revenue'}>
                {loading ? (
                    <Loader />
                ) : (
                    <>
                        <div className='flex justify-center items-center mt-2 w-full max-h-screen flex-col'>
                            <div className='flex justify-evenly items-center w-full'>
                                <div className='rounded-lg bg-card1 text-black relative min-h-40 min-w-96 px-4'>
                                    <FaMoneyBillAlt className='size-12 text-card1 absolute -top-2 -right-2 bg-bgDarkColor rounded-full border-[10px] border-bgDarkColor ' />
                                    <div className='flex flex-col justify-center  h-full pt-2'>
                                        <h2 className='text-xl font-semibold uppercase w-28'>
                                            DAILY REVENUE
                                        </h2>
                                        <p className='text-3xl font-bold text-darkorange italic  text-right mt-10'>
                                            AED{' '}
                                            {memoizedData?.dailyRevenue || 0}
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
                                            AED{' '}
                                            {memoizedData?.monthlyRevenue || 0}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className='overflow-x-auto w-full  mt-3 p-3 flex flex-col'>
                                <input
                                    type='date'
                                    name='searchDate'
                                    id='searchDate'
                                    className='input-sm w-fit bg-darkorange  rounded-t-lg text-white focus:outline-none focus:ring-0'
                                    onChange={(e) => {
                                        handleInputChange(e)
                                    }}
                                />
                                <table className='table bg-bgLight '>
                                    <thead className='bg-lightGold text-black '>
                                        <tr>
                                            <th className='text-left'>Date</th>
                                            <th className='text-left'>
                                                Revenue
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {displayedRevenues?.map((revenue) => (
                                            <tr key={revenue.id}>
                                                <td>
                                                    {new Date(
                                                        revenue?.createdAt,
                                                    ).getDate()}
                                                    -
                                                    {new Date(
                                                        revenue?.createdAt,
                                                    ).getMonth()}
                                                    -
                                                    {new Date(
                                                        revenue?.createdAt,
                                                    ).getFullYear()}
                                                </td>
                                                <td>{revenue?.amount}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {displayedRevenues?.length <
                                    filteredRevenues?.length && (
                                    <button
                                        className='text-gray-900 font-bold mx-auto w-52 px-2 lg:py-1 lg:rounded-2xl bg-lightGold mt-2'
                                        onClick={loadNextPage}
                                    >
                                        Load More
                                    </button>
                                )}
                            </div>
                        </div>
                    </>
                )}
            </Wrapper>
        </>
    )
}

export default AppLayout()(Revenue)

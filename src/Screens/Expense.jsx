import { useEffect, useState, useMemo } from 'react'
import AppLayout from '../Layout/AppLayout'
import Wrapper from '../Layout/Wrapper'
import { FaMoneyBillAlt } from 'react-icons/fa'
import { FaMoneyBillTrendUp } from 'react-icons/fa6'
import { CgSearch } from 'react-icons/cg'
import { api } from '../API/api'
import toast from 'react-hot-toast'
import { useFetch } from '../Hooks/useFetch'

const BASE_URL = import.meta.env.VITE_BASE_URL

const ExpenseModal = ({ fetchData, fetchDataDaily }) => {
    const createExpense = useMemo(
        () => async (e) => {
            e.preventDefault()
            try {
                const name = document.getElementById('name').value
                const description = document.getElementById('description').value
                const used_by = document.getElementById('used_by').value
                const amount = document.getElementById('amount').value
                const data = { name, description, used_by, amount }
                const response = await api.post(
                    '/expenses/create-expense',
                    data,
                )
                if (response.status === 200) {
                    toast.success(response.data.message)
                    fetchData()
                    fetchDataDaily()
                    document.getElementById('my_modal_2').close()
                }
            } catch (error) {
                console.log(error)
                toast.error(error.response.data.message)
            }
        },
        [fetchData, fetchDataDaily],
    )

    return (
        <>
            <dialog id='my_modal_2' className='modal'>
                <div className='modal-box'>
                    <form
                        onSubmit={createExpense}
                        className='flex flex-col gap-y-3'
                    >
                        <h3 className='text-2xl text-lightGold font-bold text-center'>
                            Add Expense
                        </h3>
                        <div className='flex flex-col'>
                            <label htmlFor='name'>Expense Name</label>
                            <input
                                type='text'
                                name='name'
                                id='name'
                                required
                                className='w-full lg:py-1 pl-5 lg:rounded-xl bg-bgLight border-2 border-gray-700 text-white'
                            />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor='name'>Description</label>
                            <textarea
                                type='text'
                                name='description'
                                id='description'
                                required
                                className='w-full lg:py-1 pl-5 lg:rounded-xl bg-bgLight border-2 border-gray-700 text-white'
                            />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor='name'>Used By</label>
                            <input
                                type='text'
                                name='used_by'
                                id='used_by'
                                required
                                className='w-full lg:py-1 pl-5 lg:rounded-xl bg-bgLight border-2 border-gray-700 text-white'
                            />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor='amount'>Amount</label>
                            <input
                                type='number'
                                name='amount'
                                id='amount'
                                required
                                className='w-full lg:py-1 pl-5 lg:rounded-xl bg-bgLight border-2 border-gray-700 text-white'
                            />
                        </div>
                        <button
                            type='submit'
                            className='py-1 bg-lightGold text-gray-900 rounded-xl mt-3 font-semibold'
                        >
                            Create
                        </button>
                    </form>
                </div>
                <form method='dialog' className='modal-backdrop'>
                    <button>close</button>
                </form>
            </dialog>
        </>
    )
}

const Expense = () => {
    const { data: expenses, fetchData } = useFetch('expenses')
    const { data: dailyExpenses, fetchData: fetchDataDaily } =
        useFetch('Expenses/daily')
    const { data: monthlyExpenses } = useFetch('Expenses/monthly')

    const deleteExpense = async (id) => {
        try {
            const confirm = window.confirm('Are you sure you want to delete?')
            if (!confirm) return
            const response = await api.delete(`/expenses/${id}`)
            if (response.status === 200) {
                toast.success(response.data.message)
                fetchData()
                fetchDataDaily()
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    }

    const memoizedDailyExpenses = useMemo(
        () => dailyExpenses || 0,
        [dailyExpenses],
    )
    const memoizedMonthlyExpenses = useMemo(
        () => monthlyExpenses || 0,
        [monthlyExpenses],
    )

    return (
        <>
            <Wrapper title={'Expenses'}>
                <div className='flex  justify-between  gap-x-20 lg:pt-4 px-5'>
                    <div className='relative w-full'>
                        <input
                            type='text'
                            className='w-full lg:py-1 pl-5 lg:rounded-2xl bg-bgLight border-2 border-gray-700 text-white'
                        />
                        <CgSearch className='text-slate-700 m-auto absolute lg:right-5 lg:top-3  ' />
                    </div>
                    <button
                        className='text-gray-900 font-bold flex justify-center items-center text-sm w-52 px-2 lg:py-1 lg:rounded-2xl bg-lightGold'
                        onClick={() =>
                            document.getElementById('my_modal_2').showModal()
                        }
                    >
                        Add New Expense
                    </button>
                </div>
                <div className='flex justify-center items-center mt-5 mx-5 gap-x-5'>
                    <div className='rounded-lg bg-card1 text-black relative w-96 h-32 px-4'>
                        <FaMoneyBillAlt className='size-12 text-card1 absolute -top-2 -right-2 bg-bgDarkColor rounded-full border-[10px] border-bgDarkColor' />
                        <div className='flex flex-col justify-center  h-full pt-2'>
                            <h2 className='text-xl font-semibold uppercase w-28'>
                                DAILY EXPENSE
                            </h2>
                            <p className='text-3xl font-bold text-darkorange italic  text-right'>
                                AED {memoizedDailyExpenses || 0}
                            </p>
                        </div>
                    </div>
                    <div className=' bg-card2 text-black relative h-32 w-96 px-4 rounded-lg'>
                        <FaMoneyBillTrendUp className='size-12 text-card2 absolute -top-2 -right-2 bg-bgDarkColor rounded-full border-[10px] border-bgDarkColor' />
                        <div className='flex flex-col justify-center h-full pt-2'>
                            <h2 className='text-xl font-semibold uppercase w-10'>
                                Monthly Expenses
                            </h2>
                            <p className='text-3xl font-bold text-darkorange italic text-right '>
                                AED {memoizedMonthlyExpenses || 0}
                            </p>
                        </div>
                    </div>
                </div>
                <div className='max-h-[50vh] bg-bgLight mx-5 mt-4 rounded-lg overflow-x-auto'>
                    <table className='table table-md  text-white '>
                        <thead>
                            <tr className='bg-lightGold text-gray-900'>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Amount</th>
                                <th>Used By</th>
                                <th>Date</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {expenses?.map((expense, i) => (
                                <tr className='border-gray-700' key={i}>
                                    <td>{expense.name}</td>
                                    <td>{expense.description}</td>
                                    <td>${expense.amount}</td>
                                    <td>{expense.used_by}</td>
                                    <td>
                                        {new Date(expense.updatedAt).getDate()}/
                                        {new Date(
                                            expense.updatedAt,
                                        ).getMonth() + 1}
                                        /
                                        {new Date(
                                            expense.updatedAt,
                                        ).getFullYear()}
                                    </td>
                                    <td>
                                        <button
                                            className='btn btn-xs btn-outline btn-error'
                                            onClick={() =>
                                                deleteExpense(expense._id)
                                            }
                                        >
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <ExpenseModal
                    fetchData={fetchData}
                    fetchDataDaily={fetchDataDaily}
                />
            </Wrapper>
        </>
    )
}

export default AppLayout()(Expense)

import React, { useEffect, useState, useMemo } from 'react'
import AppLayout from '../Layout/AppLayout'
import Wrapper from '../Layout/Wrapper'
import { useFetch } from '../Hooks/useFetch'
import { api } from '../API/api'
import toast from 'react-hot-toast'

const RefWorkModal = ({ fetchData }) => {
    const createRefWork = async (e) => {
        e.preventDefault()
        try {
            const name = e.target.name.value
            const service_name = e.target.service_name.value
            const cost_price = e.target.cost_price.value
            const response = await api.post('/refworks/create-refwork', {
                name,
                service_name,
                cost_price,
            })
            if (response.status === 200) {
                toast.success(response.data.message)
                fetchData()
                document.getElementById('my_modal_2').close()
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    return (
        <>
            <dialog id='my_modal_2' className='modal'>
                <div className='modal-box'>
                    <form
                        onSubmit={createRefWork}
                        className='flex flex-col gap-y-3'
                    >
                        <h3 className='text-2xl text-lightGold font-bold text-center'>
                            Add Reference Work
                        </h3>
                        <div className='flex flex-col'>
                            <label htmlFor='name'>Name of the Person</label>
                            <input
                                type='text'
                                name='name'
                                id='name'
                                required
                                className='w-full lg:py-1 pl-5 lg:rounded-xl bg-bgLight border-2 border-gray-700 text-white'
                            />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor='service_name'>Service Name</label>
                            <input
                                type='text'
                                name='service_name'
                                id='service_name'
                                required
                                className='w-full lg:py-1 pl-5 lg:rounded-xl bg-bgLight border-2 border-gray-700 text-white'
                            />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor='cost_price'>Cost Price</label>
                            <input
                                type='number'
                                name='cost_price'
                                id='cost_price'
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

const Work = () => {
    const { data: refworks, fetchData } = useFetch('refworks')
    const [searchQuery, setSearchQuery] = useState('')

    const filteredWorks = useMemo(() => {
        if (!searchQuery) return refworks
        return refworks.filter((work) =>
            work.name.toLowerCase().includes(searchQuery.toLowerCase()),
        )
    }, [refworks, searchQuery])

    const showRefWorkModal = () => {
        document.getElementById('my_modal_2').showModal()
    }

    const deleteRefWork = async (id) => {
        try {
            const cofirm = window.confirm('Are you sure you want to delete?')
            if (!cofirm) return
            const response = await api.delete(`/refworks/${id}`)
            if (response.status === 200) {
                toast.success(response.data.message)
                fetchData()
                document.getElementById('my_modal_2').close()
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    }

    return (
        <>
            <Wrapper title={'Reference Work'}>
                <div className='flex  justify-between  gap-x-20 lg:pt-4 px-5'>
                    <div className='relative w-full'>
                        <input
                            type='text'
                            placeholder='Search Reference Work'
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className='w-full lg:py-1 pl-5 lg:rounded-2xl bg-bgLight border-2 border-gray-700 text-white'
                        />
                    </div>
                    <button
                        className='text-gray-900 font-bold flex justify-center items-center text-sm w-52 px-2 lg:py-1 lg:rounded-2xl bg-lightGold'
                        onClick={() => showRefWorkModal()}
                    >
                        Add New Reference Work
                    </button>
                </div>
                {filteredWorks?.length > 0 && (
                    <div className='overflow-x-auto bg-bgLight text-white mx-5 rounded-lg mt-5 '>
                        <table className='table table-md shadow-2xl'>
                            <thead className='bg-lightGold text-gray-900'>
                                <tr className='border-none'>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Service Name</th>
                                    <th>Cost Price</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredWorks?.map((refwork) => (
                                    <tr key={refwork._id}>
                                        <td>{refwork._id}</td>
                                        <td>{refwork.name}</td>
                                        <td>{refwork.service_name}</td>
                                        <td>{refwork.cost_price}</td>
                                        <td>
                                            <button
                                                className='btn btn-xs btn-outline btn-error'
                                                onClick={() =>
                                                    deleteRefWork(refwork._id)
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
                )}
                {refworks?.length === 0 && (
                    <div className='flex justify-center items-center h-screen'>
                        <h4 className='text-xl font-bold text-lightGold p-5'>
                            No Reference Work Found
                        </h4>
                    </div>
                )}
                <RefWorkModal fetchData={fetchData} />
            </Wrapper>
        </>
    )
}

export default AppLayout()(Work)

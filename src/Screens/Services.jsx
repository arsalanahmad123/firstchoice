import React, { useEffect, useState, useMemo } from 'react'
import AppLayout from '../Layout/AppLayout'
import Wrapper from '../Layout/Wrapper'
import Service_Card from '../Components/Service_Card'
import { CgSearch } from 'react-icons/cg'
import { api } from '../API/api'
import toast from 'react-hot-toast'
const BASE_URL = import.meta.env.VITE_BASE_URL

const ServiceModal = ({ getServices }) => {
    const createService = async (e) => {
        e.preventDefault()
        try {
            const name = document.getElementById('name').value
            const cost_price = document.getElementById('cost_price').value
            const data = { name, cost_price }
            const response = await api.post('/services/service', data)
            if (response.status === 201) {
                toast.success(response.data.message)
                getServices()
                document.getElementById('my_modal_2').close()
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    }

    return (
        <>
            <dialog id='my_modal_2' className='modal'>
                <div className='modal-box'>
                    <form
                        onSubmit={createService}
                        className='flex flex-col gap-y-3'
                    >
                        <h3 className='text-2xl text-lightGold font-bold text-center'>
                            Create Service
                        </h3>
                        <div className='flex flex-col'>
                            <label htmlFor='name'>Name</label>
                            <input
                                type='text'
                                name='name'
                                id='name'
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

const Services = () => {
    const [services, setServices] = useState([])
    const [searchQuery, setSearchQuery] = useState('')

    const getServices = async () => {
        const response = await api.get(`${BASE_URL}/services`)
        const data = response.data.data
        if (response.status === 200) {
            setServices(data)
        }
    }

    useEffect(() => {
        getServices()
    }, [])

    const filteredServices = useMemo(() => {
        if (!searchQuery) return services
        return services.filter((service) =>
            service.name.toLowerCase().includes(searchQuery.toLowerCase()),
        )
    }, [services, searchQuery])

    const showServiceModal = () => {
        document.getElementById('my_modal_2').showModal()
    }

    return (
        <>
            <Wrapper title={'Services'}>
                <div className='flex  justify-between  gap-x-20 lg:pt-4 px-5'>
                    <div className='relative w-full'>
                        <input
                            type='text'
                            className='w-full lg:py-1 pl-5 lg:rounded-2xl bg-bgLight border-2 border-gray-700 text-white'
                            placeholder='Search Service'
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <CgSearch className='text-slate-700 m-auto absolute lg:right-5 lg:top-3  ' />
                    </div>
                    <button
                        className='text-gray-900 font-bold flex justify-center items-center text-sm w-52 px-2 lg:py-1 lg:rounded-2xl bg-lightGold'
                        onClick={showServiceModal}
                    >
                        Add New Service
                    </button>
                </div>
                <div
                    className='flex gap-x-6 flex-row flex-wrap mx-5 mt-3 gap-y-5
                '
                >
                    {filteredServices?.map((service, i) => (
                        <Service_Card
                            key={i}
                            service={service}
                            getServices={getServices}
                        />
                    ))}
                    {services.length === 0 && (
                        <p className='text-center text-xl mt-5'>
                            No Services Found
                        </p>
                    )}
                </div>
                <ServiceModal getServices={getServices} />
            </Wrapper>
        </>
    )
}

export default AppLayout()(Services)

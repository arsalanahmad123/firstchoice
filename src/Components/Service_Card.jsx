import React, { useEffect, useState } from 'react'
import { api } from '../API/api'
import toast from 'react-hot-toast'

const EditModal = ({ selectedService, id, getServices }) => {
    const editService = async (e) => {
        e.preventDefault()
        try {
            const name = e.target.name.value
            const cost_price = e.target.cost_price.value
            const response = await api.put(`/services/service/${id}`, data)
            if (response.status === 200) {
                getServices()
                toast.success(response.data.message)
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
                        onSubmit={editService}
                        className='flex flex-col gap-y-3'
                    >
                        <h3 className='text-2xl text-lightGold font-bold text-center'>
                            Edit Service
                        </h3>
                        <div className='flex flex-col'>
                            <label htmlFor='name'>Name</label>
                            <input
                                type='text'
                                name='name'
                                id='name'
                                value={selectedService?.name}
                                onChange={(e) => setName(e.target.value)}
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
                                value={selectedService?.cost_price}
                                onChange={(e) => setCostPrice(e.target.value)}
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

const Service_Card = ({ service, getServices }) => {
    const [selectedService, setSelectedService] = useState(null)
    const handleDeleteService = async (id) => {
        try {
            const confirm = window.confirm('Are you sure you want to delete?')
            if (!confirm) return
            const response = await api.delete(`/services/${id}`)
            if (response.status === 200) {
                toast.success(response.data.message)
                getServices()
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleEdit = () => {
        document.getElementById('my_modal_2').showModal()
        const id = service._id
        const getService = async () => {
            try {
                const response = await api.get(`/services/${id}`)
                if (response.status === 200) {
                    setSelectedService(response.data.data)
                }
            } catch (error) {
                console.log(error)
            }
        }
        getService()
    }

    return (
        <div className=' bg-gradient-to-r from-bgLight to-bgDarkColor text-white shadow-2xl  flex justify-center flex-col p-5 gap-y-5  min-h-36 min-w-80'>
            <h2 className='font-extrabold text-xl'>{service.name}</h2>
            <p className='flex items-center gap-x-4 '>
                Cost Price
                <span className='badge bg-lightGold border-none text-gray-900'>
                    AED {service.cost_price}
                </span>
            </p>
            <div className='flex justify-between items-center '>
                <button
                    className='btn btn-xs btn-outline text-white'
                    onClick={handleEdit}
                >
                    Edit Service
                </button>
                <button
                    className='btn btn-xs text-white bg-red-400 border-none hover:bg-red-500'
                    onClick={() => handleDeleteService(service._id)}
                >
                    Delete Service
                </button>
            </div>

            {selectedService && (
                <EditModal
                    selectedService={selectedService}
                    getServices={getServices}
                    id={service._id}
                />
            )}
        </div>
    )
}

export default Service_Card

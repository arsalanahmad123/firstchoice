import React, { useEffect, useState } from 'react'
import { api } from '../API/api'
import toast from 'react-hot-toast'

const Service_Card = ({
    service,
    getServices,
    setSelectedService,
    setToggleModal,
}) => {
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

    const handleEdit = (service) => {
        setSelectedService(service)
        setToggleModal(true)
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
                    onClick={() => handleEdit(service)}
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
        </div>
    )
}

export default Service_Card

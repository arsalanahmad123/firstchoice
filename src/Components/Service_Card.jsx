import React from 'react'
import { api } from '../API/api'
import toast from 'react-hot-toast'

const EditModal = ({ costprice, Name, id, getServices }) => {
    const [name, setName] = React.useState(Name)
    const [costPrice, setCostPrice] = React.useState(costprice)

    const editService = async (e) => {
        e.preventDefault()
        try {
            const data = { name, cost_price: costPrice }
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
                            Create Service
                        </h3>
                        <div className='flex flex-col'>
                            <label htmlFor='name'>Name</label>
                            <input
                                type='text'
                                name='name'
                                id='name'
                                value={name}
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
                                value={costPrice}
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
            <EditModal
                id={service._id}
                costprice={service.cost_price}
                Name={service.name}
                getServices={getServices}
            />
        </div>
    )
}

export default Service_Card

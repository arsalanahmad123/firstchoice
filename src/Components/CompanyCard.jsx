import React from 'react'
import { Link } from 'react-router-dom'
import { api } from '../API/api'
import toast from 'react-hot-toast'

const CompanyCard = ({ company, fetchData }) => {
    const deleteCompany = async (id) => {
        try {
            const confirm = window.confirm('Are you sure you want to delete?')
            if (!confirm) return
            const response = await api.delete(`/companies/${id}`)
            if (response.status === 201) {
                toast.success(response.data.message)
                fetchData()
            } else {
                toast.error('Something went wrong')
            }
        } catch (error) {
            console.log(error)
        }
    }

    const blockCompany = async (id) => {
        try {
            const confirm = window.confirm('Are you sure you want to block?')
            if (!confirm) return
            const response = await api.patch(`/companies/${id}`)
            if (response.status === 200) {
                toast.success(response.data.message)
                fetchData()
            } else {
                toast.error('Something went wrong')
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div className='flex flex-col justify-center items-start gap-y-2 text-white rounded-xl  bg-bgLight p-5 max-w-fit'>
                <img
                    src={company.logo.url}
                    alt=''
                    className='w-32 h-20 mx-auto object-cover'
                />
                <span className='pt-4 text-2xl text-left text-lightGold uppercase'>
                    {company.username}
                </span>
                <p className='flex flex-row justify-between items-center gap-x-5'>
                    <span>Licence Expiry: </span>
                    <span>
                        {new Date(company.licence_expiry).toLocaleDateString()}
                    </span>
                </p>
                <p className='flex flex-row justify-between items-center gap-x-5'>
                    <span>Img Card Expiry: </span>
                    <span>
                        {new Date(company.img_card_expiry).toLocaleDateString()}
                    </span>
                </p>
                <div className='flex justify-between items-center mx-2 gap-x-2'>
                    <Link
                        to={`/companies/company/${company._id}`}
                        className='btn btn-xs btn-warning btn-outline text-gray-900 ml-auto'
                    >
                        View Company
                    </Link>
                    {/* <button className='btn btn-xs btn-outline text-white'>
                        Edit Company
                    </button> */}
                    <button
                        className='btn btn-xs text-white bg-red-400 border-none hover:bg-red-500'
                        onClick={() => deleteCompany(company._id)}
                    >
                        Delete Company
                    </button>
                    <button
                        className='btn btn-xs text-white bg-red-400 border-none hover:bg-red-500'
                        onClick={() => blockCompany(company._id)}
                    >
                        {company.is_blocked
                            ? 'Unblock Company'
                            : 'Block Company'}
                    </button>
                </div>
            </div>
        </>
    )
}

export default CompanyCard

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../API/api'
import toast from 'react-hot-toast'

const ViewCompany = ({ company, fetchData, setSelectedCompany }) => {
    const deleteFile = async (file) => {
        try {
            const confirm = window.confirm('Are you sure you want to delete?')
            if (!confirm) return
            const response = await api.put(`/companies/delete-file`, {
                company_id: company?._id,
                document: file,
            })
            if (response.status === 200) {
                toast.success(response.data.message)
                fetchData()
            } else {
                toast.error('Something went wrong')
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    return (
        <>
            <dialog id='my_modal_2' className='modal bg-black/50'>
                <div className='modal-box '>
                    <h3 className='font-bold text-lg text-white'>
                        View Company Documents
                    </h3>
                    <div className='py-3 flex justify-center items-center gap-x-2'>
                        <div className='flex flex-col justify-center items-center gap-y-2 flex-wrap'>
                            {company?.documents?.map((doc) => {
                                return (
                                    <div
                                        key={doc?.fileName}
                                        className='flex flex-row justify-center items-center gap-x-5'
                                    >
                                        <a
                                            href={doc?.url}
                                            target='_blank'
                                            className='btn btn-xs btn-warning btn-outline text-gray-900 ml-auto'
                                        >
                                            {doc?.fileName}
                                        </a>
                                        <button
                                            className='btn btn-xs btn-error'
                                            onClick={() =>
                                                deleteFile(doc.fileName)
                                            }
                                        >
                                            Remove Document
                                        </button>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <form method='dialog' className='modal-backdrop'>
                    <button onClick={() => setSelectedCompany(null)}>
                        close
                    </button>
                </form>
            </dialog>
        </>
    )
}

const CompanyCard = ({ company, fetchData }) => {
    const [selectedCompany, setSelectedCompany] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const toggleModal = (compn) => {
        setSelectedCompany(compn)
        setShowModal(true)
        document.getElementById('my_modal_2').showModal()
    }

    const deleteCompany = async (id) => {
        try {
            const confirm = window.confirm('Are you sure you want to delete?')
            if (!confirm) return
            const response = await api.delete(`/companies/${id}`)
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
            <div className='flex flex-col justify-center items-start gap-y-2 text-white rounded-xl  bg-bgLight p-5 '>
                <img
                    src={company.logo.url}
                    alt=''
                    className='w-32 h-20 mx-auto object-cover'
                />
                <span className='pt-4 text-2xl text-left text-lightGold uppercase whitespace-normal w-[300px] break-words'>
                    {company.username}
                </span>
                <div className='flex flex-col justify-center items-start gap-y-2 my-2'>
                    <p className='flex flex-row justify-between items-center gap-x-5'>
                        <span>Licence Expiry: </span>
                        <span
                            className={` ${
                                new Date(
                                    company?.licence_expiry,
                                ).toLocaleDateString() <=
                                new Date().toLocaleDateString()
                                    ? 'text-red-500 font-medium'
                                    : ''
                            } `}
                        >
                            {new Date(company?.licence_expiry).getDate()}/
                            {new Date(company?.licence_expiry).getMonth() + 1}/
                            {new Date(company?.licence_expiry).getFullYear()}
                        </span>
                    </p>
                    <p className='flex flex-row justify-between items-center gap-x-5'>
                        <span>Img Card Expiry: </span>
                        <span
                            className={`
                        ${
                            new Date(
                                company?.img_card_expiry,
                            ).toLocaleDateString() <=
                            new Date().toLocaleDateString()
                        }
                        `}
                        >
                            {new Date(company?.img_card_expiry).getDate()}/
                            {new Date(company?.img_card_expiry).getMonth() + 1}/
                            {new Date(company?.img_card_expiry).getFullYear()}
                        </span>
                    </p>
                    <p className='flex flex-row justify-between items-center gap-x-5'>
                        <span>Least Contract Expiry: </span>
                        <span
                            className={`
                        ${
                            new Date(
                                company?.least_contract_expiry,
                            ).toLocaleDateString() <=
                            new Date().toLocaleDateString()
                        }
                        `}
                        >
                            {new Date(company?.least_contract_expiry).getDate()}
                            /
                            {new Date(
                                company?.least_contract_expiry,
                            ).getMonth() + 1}
                            /
                            {new Date(
                                company?.least_contract_expiry,
                            ).getFullYear()}
                        </span>
                    </p>
                    <p className='flex flex-row justify-between items-center gap-x-5'>
                        <span>E Channel Expiry: </span>
                        <span
                            className={`
                        ${
                            new Date(
                                company?.e_channel_expiry,
                            ).toLocaleDateString() <=
                            new Date().toLocaleDateString()
                        }
                        `}
                        >
                            {new Date(company?.e_channel_expiry).getDate()}/
                            {new Date(company?.e_channel_expiry).getMonth() + 1}
                            /{new Date(company?.e_channel_expiry).getFullYear()}
                        </span>
                    </p>
                </div>
                <div className='flex justify-between items-center  gap-x-2'>
                    <Link
                        to={`/companies/company/${company._id}`}
                        className='btn btn-xs btn-warning btn-outline text-gray-900 ml-auto'
                    >
                        View Company
                    </Link>
                    <button
                        className='btn btn-xs btn-warning btn-outline text-gray-900 ml-auto'
                        onClick={() => toggleModal(company)}
                    >
                        View Documents
                    </button>
                </div>
                <div className='flex justify-between items-center gap-x-2'>
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

            {showModal && selectedCompany && (
                <ViewCompany
                    key={company._id}
                    company={selectedCompany}
                    fetchData={fetchData}
                    setSelectedCompany={setSelectedCompany}
                />
            )}
        </>
    )
}

export default CompanyCard

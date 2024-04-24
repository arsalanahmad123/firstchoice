import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { api } from '../API/api'
import stamp from '../assets/stamp.png'
import logo from '../assets/logo.png'

const ViewInvoice = () => {
    const { id } = useParams()

    const [invoice, setInvoice] = useState(null)
    const [selectedCompany, setSelectedCompany] = useState(null)

    const fetchData = async () => {
        try {
            const invoiceResponse = await api.get(`/invoices/get-invoice/${id}`)
            const invoiceData = invoiceResponse.data.data
            if (invoiceResponse.status === 200) {
                setInvoice(invoiceData)
            }

            if (invoiceData) {
                const companyName = invoiceData.company
                const companyResponse = await api.get(
                    `/companies/company/${companyName}`,
                )
                const companyData = companyResponse.data.data
                if (companyResponse.status === 200) {
                    setSelectedCompany(companyData)
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [id])

    return (
        <section className='w-full min-h-screen bg-[#F5F5F7] flex flex-col justify-start items-start overflow-auto'>
            <div className='flex flex-row justify-between items-start py-4 px-16 border-b-4 border-double border-lightGold'>
                <img src={logo} alt='logo' className='w-[40%]' />
                <span className='text-4xl font-bold text-black'>Invoice</span>
            </div>
            <div className='flex flex-row justify-between items-start p-5 w-full'>
                <div className='flex flex-row justify-center items-start gap-x-3'>
                    <span className='text-black font-bold text-lg'>
                        BILL TO:
                    </span>
                    <span className='flex flex-col justify-start items-start gap-y-1'>
                        <span className='text-2xl font-semibold text-black uppercase'>
                            {invoice?.company}
                        </span>
                        <span className='text-black text-sm'>
                            {selectedCompany?.email}
                        </span>
                        <span className='text-black text-sm'>
                            {selectedCompany?.phone}
                        </span>
                    </span>
                </div>
                <div className='flex flex-col gap-y-2'>
                    <span className='flex flex-row justify-start items-center gap-x-2'>
                        <span className='text-black font-bold'>
                            Invoice Number:
                        </span>
                        <span className='text-black font-medium italic'>
                            {invoice?._id}
                        </span>
                    </span>
                    <span className='flex flex-row justify-start items-center gap-x-5'>
                        <span className='text-black font-bold'>Date: </span>
                        <span className='text-black font-medium italic'>
                            {new Date(invoice?.createdAt).getDate()}/
                            {new Date(invoice?.createdAt).getMonth() + 1}/
                            {new Date(invoice?.createdAt).getFullYear()}
                        </span>
                    </span>
                </div>
            </div>
            <div className='w-full p-5 text-black'>
                <table className='table  w-full'>
                    <thead>
                        <tr>
                            <th className='text-black font-bold'>Service</th>
                            <th className='text-black font-bold'>Quantity</th>
                            <th className='text-black font-bold'>Unit Price</th>
                            <th className='text-black font-bold'>Amount</th>
                        </tr>
                    </thead>

                    <tbody>
                        {invoice?.services?.map((item) => (
                            <tr key={item.service}>
                                <td>{item.service}</td>
                                <td>{item.quantity}</td>
                                <td>{item.sale_price} AED</td>
                                <td>{item.quantity * item.sale_price} AED</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className='w-80 ml-auto mr-10 flex flex-col gap-y-3 mt-3'>
                    <div className='flex flex-row w-full border-b-2 border-black justify-between items-center'>
                        <span className='text-black font-bold'>TOTAL</span>
                        <span>{invoice?.total_price} AED</span>
                    </div>
                    <div className='flex flex-row w-full border-b-2 border-black justify-between items-center'>
                        <span className='text-black font-bold'>
                            PAID AMOUNT
                        </span>
                        <span>{invoice?.paid_amount || 0} AED</span>
                    </div>
                    <div className='flex flex-row w-full border-b-2 border-black justify-between items-center'>
                        <span className='text-black font-bold'>
                            BALANCE DUE{' '}
                        </span>
                        <span>{invoice?.pending_amount} AED</span>
                    </div>
                </div>
                <div className='flex justify-center items-center'>
                    <img src={stamp} alt='Stamp' className='w-[25%] ' />
                </div>
            </div>
        </section>
    )
}

export default ViewInvoice

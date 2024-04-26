import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { api } from '../API/api'
import logo from '../assets/invoice-1.png'
import logo2 from '../assets/invoice-2.png'
import stamp from '../assets/stamp.png'

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
            <div className='flex justify-center items-center w-full -mt-16'>
                <img src={logo} alt='Logo1' className='w-[20%]' />
                <img src={logo2} alt='Logo2' className='w-[50%]' />
            </div>
            <div className='flex flex-col justify-start items-start gap-y-1 w-60 ml-auto text-black'>
                <span>Mob: +971 58 571 6322</span>
                <span>Email: info@1stchoicemc.com</span>
                <span>Website: 1stchoicemc.com</span>
                <span>
                    Al yarmok - Kuwait Square <br />
                    shop#2 -Sharjah
                </span>
            </div>
            <div className='flex flex-row justify-between items-center p-2 w-full'>
                <div className='flex flex-col justify-center items-start gap-x-2'>
                    <span className='text-black font-medium text-lg'>
                        BILL TO:
                    </span>
                    <span className='flex flex-col justify-start items-start gap-y-1 border-2 border-gray-900 p-3'>
                        <span className='text-xl text-black uppercase'>
                            {invoice?.company}
                        </span>
                        <span className='text-black text-sm'>
                            Email: {selectedCompany?.email}
                        </span>
                        <span className='text-black text-sm'>
                            Mob: {selectedCompany?.phone}
                        </span>
                    </span>
                </div>
                <div className='flex flex-col gap-y-2'>
                    <span className='flex flex-row justify-start items-center gap-x-2'>
                        <span className='text-black font-bold'>
                            Invoice Number:
                        </span>
                        <span className='text-black font-medium italic border-b-2 border-gray-900 '>
                            {invoice?._id}
                        </span>
                    </span>
                    <span className='flex flex-row justify-start items-center gap-x-10'>
                        <span className='text-black font-bold'>Date: </span>
                        <span className='text-black font-medium italic border-b-2 border-gray-900 w-full'>
                            {new Date(invoice?.createdAt).getDate()}/
                            {new Date(invoice?.createdAt).getMonth() + 1}/
                            {new Date(invoice?.createdAt).getFullYear()}
                        </span>
                    </span>
                </div>
            </div>
            <div className='w-[98%] text-black border border-gray-900 mx-auto relative '>
                <table className='table table-sm table-bordered  w-full'>
                    <thead>
                        <tr className='border-collapse'>
                            <th className='text-black font-bold border-r border-gray-900 border-collapse'>
                                No.
                            </th>
                            <th className='text-black font-bold border-r border-gray-900 border-collapse'>
                                Service
                            </th>
                            <th className='text-black font-bold border-r border-gray-900 border-collapse '>
                                Quantity
                            </th>
                            <th className='text-black font-bold border-r border-gray-900 border-collapse'>
                                Unit Price
                            </th>
                            <th className='text-black font-bold '>Amount</th>
                        </tr>
                    </thead>

                    <tbody>
                        {invoice?.services?.map((item, index) => (
                            <tr key={item.service}>
                                <td className='border-r border-gray-900'>
                                    {index + 1}
                                </td>
                                <td className='border-r border-gray-900'>
                                    {item.service}
                                </td>
                                <td className='border-r border-gray-900'>
                                    {item.quantity}
                                </td>
                                <td className='border-r border-gray-900'>
                                    {item.sale_price} AED
                                </td>
                                <td>{item.quantity * item.sale_price} AED</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className='w-60 ml-auto mr-10 flex flex-col gap-y-1 mt-2 text-sm'>
                    <div className='flex flex-row w-full  justify-between items-center'>
                        <span className='text-black'>TOTAL:</span>
                        <span className='font-medium'>
                            {invoice?.total_price} AED
                        </span>
                    </div>
                    <div className='flex flex-row w-full  justify-between items-center '>
                        <span className='text-black'>PAID AMOUNT:</span>
                        <span className='font-medium'>
                            {invoice?.paid_amount || 0} AED
                        </span>
                    </div>
                    <div className='flex flex-row w-full  justify-between items-center'>
                        <span className='text-black '>BALANCE DUE: </span>
                        <span className='font-medium'>
                            {invoice?.pending_amount} AED
                        </span>
                    </div>
                </div>
                <img
                    src={stamp}
                    alt='Stamp'
                    className='absolute top-1/2 right-1/2 transform translate-x-1/2 translate-y-1/2 w-52 opacity-30'
                />
            </div>
        </section>
    )
}

export default ViewInvoice

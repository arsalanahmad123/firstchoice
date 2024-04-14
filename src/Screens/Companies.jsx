import React from 'react'
import AppLayout from '../Layout/AppLayout'
import Wrapper from '../Layout/Wrapper'
import CompanyCard from '../Components/CompanyCard'
import Header from '../Components/Header'
import { Routes, Route } from 'react-router-dom'
import NewCompany from './NewCompany'
import Company from './Company'
import { useFetch } from '../Hooks/useFetch'

const Homepage = () => {
    const { data: companies, fetchData } = useFetch('companies')
    return (
        <>
            <Wrapper title={'Companies'}>
                <Header />
                <div className='flex'>
                    <div className='flex gap-x-3 gap-y-3 px-5 flex-row flex-wrap  pt-10 text-center'>
                        {companies?.map((company) => (
                            <CompanyCard
                                key={company._id}
                                company={company}
                                fetchData={fetchData}
                            />
                        ))}
                    </div>
                </div>
            </Wrapper>
        </>
    )
}

const CompanyRoutes = () => {
    return (
        <>
            <Routes>
                <Route key={'companies'} path='/' element={<Homepage />} />
                <Route
                    key={'add-company'}
                    path='/add-company'
                    element={<NewCompany />}
                />
                <Route
                    key={'company'}
                    path='/company/:id/*'
                    element={<Company />}
                />
            </Routes>
        </>
    )
}

const Companies = () => {
    return (
        <>
            <CompanyRoutes />
        </>
    )
}

export default AppLayout()(Companies)

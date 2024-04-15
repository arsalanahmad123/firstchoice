import React, { useEffect, useState } from 'react'
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
    const [filteredCompanies, setFilteredCompanies] = useState(null)
    const handleCompanySearchInput = (e) => {
        const query = e.target.value
        if (query) {
            const filtered = companies?.filter((company) =>
                company.username.toLowerCase().includes(query.toLowerCase()),
            )
            setFilteredCompanies(filtered)
        } else {
            setFilteredCompanies(companies)
        }
    }
    useEffect(() => {
        setFilteredCompanies(companies)
    }, [companies])

    return (
        <>
            <Wrapper title={'Companies'}>
                <Header handleCompanySearchInput={handleCompanySearchInput} />
                <div className='flex'>
                    <div className='flex gap-x-3 gap-y-3 px-5 flex-row flex-wrap  pt-10 text-center'>
                        {filteredCompanies?.map((company) => (
                            <CompanyCard
                                key={company._id}
                                company={company}
                                fetchData={fetchData}
                            />
                        ))}
                        {companies?.length === 0 && (
                            <p className='text-3xl'>No Companies Found</p>
                        )}
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

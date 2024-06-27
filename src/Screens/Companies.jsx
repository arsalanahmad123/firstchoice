import React, { useEffect, useState } from 'react'
import AppLayout from '../Layout/AppLayout'
import Wrapper from '../Layout/Wrapper'
import CompanyCard from '../Components/CompanyCard'
import Header from '../Components/Header'
import { Routes, Route } from 'react-router-dom'
import NewCompany from './NewCompany'
import Company from './Company'
import { useFetch } from '../Hooks/useFetch'
import Loader from '../Components/Loader'

const Homepage = () => {
    const { data: companies, fetchData, loading } = useFetch('companies')
    const [filteredCompanies, setFilteredCompanies] = useState(null)
    const [searchQuery, setSearchQuery] = useState('')
    const [expiredFilter, setExpiredFilter] = useState(false)

    const handleCompanySearchInput = (e) => {
        const query = e.target.value
        setSearchQuery(query)
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

    useEffect(() => {
        if (expiredFilter) {
            let expiredcompanies = []
            const checkAlreadyExists = (company) => {
                if (expiredcompanies.includes(company)) return true
                return false
            }

            for (let i = 0; i < filteredCompanies?.length; i++) {
                if (
                    new Date().getTime() >
                        new Date(
                            filteredCompanies[i].licence_expiry,
                        ).getTime() &&
                    !checkAlreadyExists(filteredCompanies[i])
                ) {
                    expiredcompanies.push(filteredCompanies[i])
                } else if (
                    new Date().getTime() >
                        new Date(
                            filteredCompanies[i].img_card_expiry,
                        ).getTime() &&
                    !checkAlreadyExists(filteredCompanies[i])
                ) {
                    expiredcompanies.push(filteredCompanies[i])
                } else if (
                    new Date().getTime() >
                        new Date(
                            filteredCompanies[i].least_contract_expiry,
                        ).getTime() &&
                    !checkAlreadyExists(filteredCompanies[i])
                ) {
                    expiredcompanies.push(filteredCompanies[i])
                }
            }
            if (expiredcompanies.length > 0)
                setFilteredCompanies(expiredcompanies)
        } else {
            setFilteredCompanies(companies)
        }
    }, [expiredFilter])

    return (
        <>
            <Wrapper title={'Companies'}>
                {loading ? (
                    <Loader />
                ) : (
                    <>
                        <Header
                            handleCompanySearchInput={handleCompanySearchInput}
                            setExpiredFilter={setExpiredFilter}
                            expiredFilter={expiredFilter}
                        />
                        <div className='flex'>
                            <div className='grid grid-cols-3 gap-4 mx-5 mt-3'>
                                {filteredCompanies?.map((company) => (
                                    <CompanyCard
                                        key={company._id}
                                        company={company}
                                        fetchData={fetchData}
                                    />
                                ))}
                                {companies?.length === 0 && (
                                    <p className='text-3xl'>
                                        No Companies Found
                                    </p>
                                )}
                            </div>
                        </div>
                    </>
                )}
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

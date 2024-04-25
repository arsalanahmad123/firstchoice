import React, { useEffect, useState, useMemo } from 'react'
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

    const [currentPage, setCurrentPage] = useState(1)

    const itemsPerPage = 10

    const displayedCompanies = useMemo(() => {
        const indexOfLastItem = currentPage * itemsPerPage
        return filteredCompanies?.slice(0, indexOfLastItem)
    }, [filteredCompanies, currentPage])

    const loadNextPage = () => {
        setCurrentPage(currentPage + 1)
    }

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
                {loading ? (
                    <Loader />
                ) : (
                    <>
                        <Header
                            handleCompanySearchInput={handleCompanySearchInput}
                        />
                        <div className='flex'>
                            <div className='grid grid-cols-3 gap-4 mx-5 mt-3'>
                                {displayedCompanies?.map((company) => (
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
                        {displayedCompanies?.length < companies?.length &&
                            filteredCompanies?.length > 0 && (
                                <button
                                    className='text-gray-900 font-bold mx-auto w-52 px-2 lg:py-1 lg:rounded-2xl bg-lightGold mt-2'
                                    onClick={loadNextPage}
                                >
                                    Load More
                                </button>
                            )}
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

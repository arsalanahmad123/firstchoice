import React from 'react'
import AppLayout from '../Layout/AppLayout'
import Wrapper from '../Layout/Wrapper'
import Ellipse from '../assets/Ellipse.png'
import CompanyCard from '../Components/CompanyCard'
import Header from '../Components/Header'
import { Routes, Route } from 'react-router-dom'
import NewCompany from './NewCompany'

const Homepage = () => {
    return (
        <>
            <Wrapper title={'Companies'}>
                <Header />

                <div className='flex'>
                    <div className='flex gap-x-3 gap-y-3 px-5 flex-row flex-wrap  pt-10 text-center'>
                        {Array.from({ length: 8 }).map((_, i) => (
                            <CompanyCard
                                key={i}
                                img={Ellipse}
                                desc={'StarBucks'}
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

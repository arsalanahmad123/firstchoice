import React from 'react'
import AppLayout from '../Layout/AppLayout'
import Wrapper from '../Layout/Wrapper'
import Service_Card from '../Components/Service_Card'
const Services = () => {
    return (
        <>
            <Wrapper title={'Services'}>
                <div
                    className='flex gap-x-6 flex-row flex-wrap mx-5 mt-3 gap-y-5
                '
                >
                    {Array.from({ length: 6 }).map((_, i) => (
                        <Service_Card
                            serviceName='Phone Repair'
                            costPrice={500}
                            salePrice={1000}
                        />
                    ))}
                </div>
            </Wrapper>
        </>
    )
}

export default AppLayout()(Services)

import React from 'react'
import AppLayout from '../Layout/AppLayout'
import Wrapper from '../Layout/Wrapper'
import Service_Card from '../Components/Service_Card'
const Services = () => {
    return (
        <>
            <Wrapper title={'Services'}>
                <div className='flex gap-x-6'>
           <Service_Card  Service_Name="service name will be here" costPrice="costPrice" salePrice="salePrice" />
           <Service_Card  Service_Name="service name will be here" costPrice="costPrice" salePrice="salePrice" />
           </div>
            </Wrapper>
        </>
    )
}

export default AppLayout()(Services)

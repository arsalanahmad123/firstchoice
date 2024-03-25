import React from 'react'
import SideBar from './SideBar'

const AppLayout = () => (WrappedComponent) => {
    return (props) => {
        return (
            <>
                <main className='flex flex-row justify-between'>
                    <SideBar />
                    <WrappedComponent {...props} />
                </main>
            </>
        )
    }
}

export default AppLayout

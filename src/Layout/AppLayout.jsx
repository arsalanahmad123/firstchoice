import SideBar from './SideBar'
import { Suspense } from 'react'
import Loader from '../Components/Loader'

const AppLayout = () => (WrappedComponent) => {
    return (props) => {
        return (
            <>
                <main className='flex flex-row justify-between'>
                    <SideBar />
                    <Suspense fallback={<Loader />}>
                        <WrappedComponent {...props} />
                    </Suspense>
                </main>
            </>
        )
    }
}

export default AppLayout

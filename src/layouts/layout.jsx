import Header from '@/components/header'
import React from 'react'
import { Outlet } from 'react-router-dom'

const AppLayout = () => {
    return (
        <div >
            <main className='min-h-screen container'>
                <Header />
                {/* body  */}
                <Outlet />
            </main>
            <footer className='p-10 text-center bg-gray-800 mt-10'>
                Made with ❤ by zairdev
            </footer>
        </div>
    )
}

export default AppLayout
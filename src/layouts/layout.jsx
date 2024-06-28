import Footer from '@/components/footer'
import Header from '@/components/header'
import { Facebook, FacebookIcon, Github, LinkedinIcon, LucideFacebook } from 'lucide-react'
import React from 'react'
import { Outlet } from 'react-router-dom'

const AppLayout = () => {
    return (
        <div >
            <main className='min-h-screen container'>
                <Header />
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default AppLayout
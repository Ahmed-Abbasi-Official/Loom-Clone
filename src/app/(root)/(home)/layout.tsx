import Navbar from '@/components/Navbar'
import SideBar from '@/components/SideBar'
import React, { ReactNode } from 'react'

const HomeLayout = ({children}:{children:ReactNode}) => {
  return (
    <main className='relative'>
        <Navbar/>
        <div className='flex h-[calc(100vh-32px)]'>
            <SideBar/>
            <section className='flex flex-1 min-h-screen flex-col px-6 pb-6 pt-28 max-md:pb-14 sm:px-14'>
                <div className='w-full'>
                    {children}
                </div>
            </section>
        </div>
        Footer
    </main>
  )
}

export default HomeLayout
import React, { ReactNode } from 'react'
import StremVideoProvider from '../../../providers/StreamClientProvider'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Video Calling APP || YOOM",
  description: "Generated by create next app",
  icons:{
    icon:'/icons/logo.svg'
  }
};

const RootLayout = ({children}:{children:ReactNode}) => {
  return (
    <main>
        {/* Navbar */}
        <StremVideoProvider>
        {children}
        </StremVideoProvider>
        {/* Footer */}
    </main>
  )
}

export default RootLayout
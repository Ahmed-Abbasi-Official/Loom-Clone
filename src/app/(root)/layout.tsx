import React, { ReactNode } from 'react'
import StremVideoProvider from '../../../providers/StreamClientProvider'

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
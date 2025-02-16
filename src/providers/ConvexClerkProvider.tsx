"use client"

import { ClerkProvider, useAuth } from "@clerk/nextjs";


function ConvexClerkProvider({children}:{children:React.ReactNode}) {

    return(
        <ClerkProvider appearance={{
            layout:{
                logoImageUrl:'/icons/yoom-logo.svg',
                socialButtonsVariant:'iconButton'
            },
            variables:{
                colorText:'#fff',
                colorPrimary:'#0E78F9',
                colorBackground:'#1c1f2e',
                colorInputBackground:'#252a41',
                colorInputText:'#fff'
            }
        }} publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
        {children}
    </ClerkProvider>
    )

}

export default ConvexClerkProvider;
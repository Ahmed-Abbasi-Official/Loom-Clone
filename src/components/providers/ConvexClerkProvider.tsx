"use client"

import { ClerkProvider, useAuth } from "@clerk/nextjs";


function ConvexClerkProvider({children}:{children:React.ReactNode}) {

    return(
        <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
        {children}
    </ClerkProvider>
    )

}

export default ConvexClerkProvider;
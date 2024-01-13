import type { Metadata } from 'next'
import { Raleway } from 'next/font/google'
import '@/app/styles/globals.scss'
import { QueryClientProvider } from '@/providers/QueryClientProvider'
import SideBar from '@/components/SideBar/SideBar'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import { PageHistoryProvider } from '@/providers/PagesHistoryProvider'
import SessionProvider from '@/providers/NextAuthProvider'
import Player from '@/components/Player/Player'
import {IGetSession } from '@/types/types'
import { getSession } from '@/server/actions'

const inter = Raleway({
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
})

export const metadata: Metadata = {
    title: 'Spotify-clone',
    description: 'Generated to practice',
}

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode
    }) {

    const { session, userSession } = await getSession() as IGetSession

    return (
        <html lang="en">
            <body className={inter.className}>
                <SessionProvider session={session}>
                    <QueryClientProvider>
                        <PageHistoryProvider>
                            
                            <div className="wrapper">
                                <SideBar user={userSession} />
                                <div className="container">
                                    <div className='container__background'></div>
                                    <div className="container__page">
                                        <Header />
                                        <main className="main">
                                            {children}
                                            <Footer />
                                        </main>
                                    </div>
                                </div>
                                <Player />
                            </div>
                        </PageHistoryProvider>
                    </QueryClientProvider>
                </SessionProvider>
            </body>
        </html>
    )
}

// {<HydrationBoundary state={dehydrate(queryClient)}>
//     <div className="wrapper">
//         {/* <SideBar/> */}
//         <div className="container">
//             <div className='container__background'></div>
//             <div className="container__page">
//                 <Header />
//                 <main className="main">
//                     {children}
//                     <Footer />
//                 </main>
//             </div>
//         </div>
//         <Player />
//     </div>
// </HydrationBoundary>}
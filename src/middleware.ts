import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXT_PUBLIC_JWT_SECRET })

    const {pathname} = req.nextUrl

    if (pathname.includes('/api/auth') || token) {
        return NextResponse.next()
    }

    if (!token && pathname !== '/') {
        return NextResponse.redirect(new URL('/', process.env.NEXTAUTH_URL as string))
    }
}

export const config = {
    matcher: [
        {
            source: '/((?!api|_next/static|_next/image|favicon.ico|search).*)',
            missing: [
                { type: 'header', key: 'next-router-prefetch' },
                { type: 'header', key: 'purpose', value: 'prefetch' },
            ],
        },
    ],
}
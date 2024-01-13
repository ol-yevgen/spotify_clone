import NextAuth from "next-auth"
import SpotifyProvider from "next-auth/providers/spotify"
import { LOGIN_URL } from "@/libs/spotify"
import type { NextAuthOptions } from 'next-auth'
import fetch from 'node-fetch';

const refreshAccessToken = async (token: any) => {
    try {
        const params = new URLSearchParams()
        params.append('grant_type', 'refresh_token')
        params.append('refresh_token', token.refreshToken)
        const authString = Buffer.from(
            `${process.env.NEXT_PUBLIC_CLIENT_ID}:${process.env.NEXT_PUBLIC_CLIENT_SECRET}`
        ).toString('base64');
        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Authorization': 'Basic ' + authString
            },
            body: params
        })
        const data = await response.json() as any
        return {
            accessToken: data.access_token,
            refreshToken: data.refresh_token ?? token.refreshToken,
            accessTokenExpires: Date.now() + data.expires_in * 1000
        }

    } catch (error) {
        console.error(error)

        return {
            ...token,
            error: 'RefreshAccessTokenError'
        }
    }
}

export const NEXT_AUTH_OPTIONS: NextAuthOptions = {
    providers: [
        SpotifyProvider({
            clientId: process.env.NEXT_PUBLIC_CLIENT_ID as string,
            clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET as string,
            authorization: LOGIN_URL
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/'
    },
    callbacks: {
        async jwt({ token, account, user }: { token: any, account: any, user: any}) {

            if (account && user) {
                return {
                    ...token,
                    accessToken: account.access_token,
                    refreshToken: account.refresh_token,
                    username: account.providerAccountId,
                    accessTokenExpires: account.expires_at * 1000,
                }
            }

            if (Date.now() < token.accessTokenExpires) {
                return token
            }

            return await refreshAccessToken(token)
        },
        async session({ session, token, user }: { token: any, session: any, user: any }) {

            session.user.accessToken = token.accessToken
            session.user.refreshToken = token.refreshToken
            session.user.username = token.username
            return session
        }
    },
    session: {
        strategy: 'jwt'
    }
}

export const handler = NextAuth(NEXT_AUTH_OPTIONS)

export {handler as GET, handler as POST}
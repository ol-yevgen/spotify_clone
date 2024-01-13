'use server'

import { getServerSession } from 'next-auth';
import { NEXT_AUTH_OPTIONS } from '@/app/api/auth/[...nextauth]/route';
import axios from 'axios';
import { IUser } from '@/types/types';

export const getSession = async () => {
    try {
        const session = await getServerSession(NEXT_AUTH_OPTIONS)
        const userSession = session?.user as IUser

        return { session, userSession } 
    } catch (error) {
        console.log(error)
    }
}

export const getData = async (url: string, token: string) => {
    if (token) {
        const { data } = await axios.get(url, {
            headers: { Authorization: `Bearer ${token}` }
        });

        return {data} 
    }
}
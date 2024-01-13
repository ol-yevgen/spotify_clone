'use server'

import { Session, getServerSession } from 'next-auth';
import {NEXT_AUTH_OPTIONS} from '@/server/authOptions';
import axios from 'axios';
import { IUser } from '@/types/types';

export const getSession = async () => {
    try {
        const session = await getServerSession(NEXT_AUTH_OPTIONS) as Session
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
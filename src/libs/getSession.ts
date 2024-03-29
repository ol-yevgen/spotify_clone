import { getServerSession } from 'next-auth';
import { NEXT_AUTH_OPTIONS } from '@/server/authOptions';

export const getSession = async () => {
    const session = await getServerSession(NEXT_AUTH_OPTIONS)

    return {session}
}
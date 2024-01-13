import LoginButton from '@/components/UI/LoginButton/LoginButton'
import UserMenu from '@/components/Header/UserMenu/UserMenu';
import { getSession } from '@/server/actions';
import PathMove from './PathMove/PathMove';
import { IGetSession, IUser } from '@/types/types';
import './header.scss';

export default async function Header() {

    const { session, userSession } = await getSession() as IGetSession

    return (
        <header className="header">
            <PathMove />
            {session
                ? <UserMenu user={userSession} />
                : <LoginButton bg='btn__login--black' />}
        </header>
    )
};



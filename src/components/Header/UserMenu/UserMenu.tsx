'use client'

import { userIcon } from '../../../../public/icons';
import { useRef } from 'react'
import './userMenu.scss'
import NavLink from '../../UI/NavLink/NavLink'
import useOutsideClickListener from '@/hooks/useOutsideClickListener';
import { signOut, useSession } from "next-auth/react";
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { getSession } from '@/server/actions';
import { IUser } from '@/types/types';

export default function UserMenu({ user }: { user: IUser }) {

    const userRef = useRef<HTMLDivElement>(null)
    const { isShow, setIsShow } = useOutsideClickListener(userRef)

    return (
        <div
            className="user"
            ref={userRef}
        >
            <button
                className="btn__user"
                onClick={(e) => {
                    e.stopPropagation()
                    setIsShow(!isShow)
                }}
            >
                {user
                    ? <Image
                        src={user?.image as string}
                        className='user__image'
                        width={300}
                        height={300}
                        alt='user' />
                    : userIcon
                }
            </button>

            {
                isShow &&
                <ul
                    className='user__menu container'
                >
                    <li>
                        <NavLink
                            label='profile'
                            path='/profile'
                            func={setIsShow}
                            className='user__menu--item container'
                        />
                    </li>
                    <li>
                        <NavLink
                            label='settings'
                            path='/settings'
                            func={setIsShow}
                            className='user__menu--item container'
                        />
                    </li>
                    <li onClick={() => signOut()}>
                        <NavLink
                            label='Log out'
                            path='/'
                            func={setIsShow}
                            className='user__menu--item container'
                        />
                    </li>
                </ul>

            }
        </div>
    )
};

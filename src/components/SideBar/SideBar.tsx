'use client'

import './sideBar.scss';
import { homeIcon, libraryIcon, searchIcon } from '../../../public/icons';
import NavLink from '@/components/UI/NavLink/NavLink';
import {useSession } from 'next-auth/react';
import useOutsideClickListener from "@/hooks/useOutsideClickListener"
import { useRef } from "react"
import LoginButton from '../UI/LoginButton/LoginButton';
import { IUser } from '@/types/types';
import MyPlaylists from '../MyPlaylists/MyPlaylists';
import { usePathname } from 'next/navigation';

export default function SideBar( {user}: {user: IUser}) {
    const redirectToLoginRef = useRef<HTMLDivElement>(null)
    const { isShow, setIsShow } = useOutsideClickListener(redirectToLoginRef)

    const path = usePathname()

    return (
        <aside className="side" style={{ overflow: user ? 'hidden' : 'visible' }}>
            <nav className='container'>
                <ul>
                    <li>
                        <NavLink
                            label='home'
                            path='/'
                            icon={homeIcon}
                            func={() => { }}
                            className={`side__nav ${path === '/' && 'side__nav--active' }`}
                        />
                    </li>
                    <li>
                        <NavLink
                            label='search'
                            path='/search'
                            icon={searchIcon}
                            func={() => { }}
                            className={`side__nav ${path === '/search' && 'side__nav--active'}`}
                        />
                    </li>
                </ul>
            </nav>
            <div className='side__menu container'>
                <NavLink
                    label='your library'
                    path={path}
                    icon={libraryIcon}
                    func={() => { }}
                    className='side__nav'
                />
                {user ?
                    <MyPlaylists accessToken={user?.accessToken} />
                    :
                    <>
                        <div className='playlists__item playlists__create' >
                            <div className='playlists__info'>
                                <h3 className='playlists__title'>
                                    Create your first playlist
                                </h3>
                                <span className='playlists__subtitle'>
                                    {"It's easy, we'll help you"}
                                </span>
                                <button
                                    className='playlists__create--btn'
                                    onClick={() => setIsShow(true)}
                                >Create playlist</button>

                            </div>
                        </div>
                        {isShow &&
                            <div className='playlists__create--tippy' ref={redirectToLoginRef}>
                                <h3 className='playlists__title'>
                                    Create a playlist
                                </h3>
                                <span className='playlists__subtitle'>
                                    Log in to create and share playlists.
                                </span>
                                <div className='playlists__create--login'>
                                    <span
                                        className='playlists__create--cancel'
                                        onClick={() => setIsShow(false)}
                                    >Not Now</span>
                                    <LoginButton bg='btn__login--white' />
                                </div>
                            </div>
                        }
                    </>
                        
                }
            </div>
        </aside>
    )
};

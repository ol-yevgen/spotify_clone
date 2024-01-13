'use client'

import Image from 'next/image';
import Link from 'next/link';
import { IPlaylist, IArtists, ICommonPlaylist } from '@/types/types';
import { capitalizeFirstLetter } from '@/libs/capitalize';
import axios from 'axios';
import { useQueries, useQuery } from '@tanstack/react-query';
import NavLink from '../UI/NavLink/NavLink';
import { useEffect } from 'react';
import { getData } from '@/server/actions';

export default function MyPlaylists({ accessToken }: { accessToken: string | null | undefined }) {

    const [{ data: userPlaylists }, { data: userFollowingArtists }] = useQueries({
        queries: [
            {
                queryKey: ['userPlaylists'],
                queryFn: async () => await getData('https://api.spotify.com/v1/me/playlists', accessToken as string)
            },
            {
                queryKey: ['userFollowingArtists'],
                queryFn: async () => await getData('https://api.spotify.com/v1/me/following?type=artist', accessToken as string)
            }
        ]
    });

    // console.log(userFollowingArtists.data?.data?.artists?.items);
    // console.log(userFollowingArtists.data?.data?.artists?.items);
    

    // const { data: artists } = useQuery({
    //     queryKey: ['artists'],
    //     enabled: !!accessToken,
    //     queryFn: async () => {
    //         if (accessToken) {
    //             const { data } = await axios.get('https://api.spotify.com/v1/me/following?type=artist', {
    //                 headers: { Authorization: `Bearer ${accessToken}` }
    //             });

    //             return data.artists.items as ICommonPlaylist[]
    //         }
    //     },
    // })

    const sidePlaylists = (list: ICommonPlaylist[]) => {
        return (
            list?.map(item => {
                return (
                    <li key={item.id}>
                        <NavLink
                            path={`/playlist/${item.id}`}
                            className="playlists__item"
                        >
                            <Image
                                src={item.images[0].url}
                                alt={item.name}
                                width={48}
                                height={48}
                                className='playlists__image'
                            />
                            <div className='playlists__info'>
                                <h3 className='playlists__title'>
                                    {item.name}
                                </h3>
                                <span className='playlists__subtitle'>
                                    {capitalizeFirstLetter(item.type)}
                                    {item?.owner && ` • ${item.owner?.display_name}`}
                                </span>
                            </div>
                        </NavLink>
                    </li>
                )
            })
        )
    }

    return (
        accessToken ?
            <ul className='playlists'>
                {sidePlaylists(userPlaylists?.data?.items as ICommonPlaylist[])}
                {sidePlaylists(userFollowingArtists?.data?.artists?.items as ICommonPlaylist[])}
            </ul>
            : <h2>Loading...</h2>
    )
};

'use client'

import './home.scss';
import Image from 'next/image';
import Link from 'next/link';
import { CSSProperties, Fragment, useEffect, useState } from 'react';
import { useResize } from '@/hooks/useResize';
import { shuffle } from '@/libs/shuffle'
import PlayButton from '@/components/UI/PlayButton/PlayButton';
import { ICategory, ICommonPlaylist, IFeaturedPlaylist, IUser } from '@/types/types';
import { useQueries, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { getTimeOfDay } from '@/libs/getTimeOfDay';
import { getData } from '@/server/actions';
import Categories from './Categories';

export interface CustomCSSProperties extends CSSProperties {
    '--cards-grid'?: number;
}

export default function Shelf({ user }: { user: IUser }) {
    const [cardsColumns, setGridColumns] = useState<number | null>(null)
    const { width } = useResize()

    const [{ data: topArtists }, { data: newReleases }, { data: categoriesList },
    ] = useQueries({
        queries: [
            {
                queryKey: ['topArtists'],
                enabled: !!cardsColumns,
                queryFn: async () => {
                    const topArtists = await getData('https://api.spotify.com/v1/me/top/artists', user?.accessToken as string)
                    return shuffle(topArtists?.data?.items).slice(0, 6) as ICommonPlaylist[]
                }
            },
            {
                queryKey: ['newReleases', cardsColumns],
                enabled: !!cardsColumns,
                queryFn: async () => {
                    const newReleases = await getData(`https://api.spotify.com/v1/browse/new-releases?offset=0&limit=${cardsColumns}`, user?.accessToken as string)

                    return newReleases?.data?.albums?.items as ICommonPlaylist[]
                }
            },
            {
                queryKey: ['categories'],
                queryFn: async () => {
                    const categories = await getData('https://api.spotify.com/v1/browse/categories?limit=40', user?.accessToken as string)
                    const sortedCategories = shuffle((categories?.data?.categories?.items as ICategory[])
                        .map(category => ({ id: category.id, name: category.name })))
                        .slice(0, 2)

                    return sortedCategories as ICategory[]
                }
            },
        ]

    });

    useEffect(() => {
        if (width > 1600) {
            setGridColumns(6)
        } else if (width > 1300) {
            setGridColumns(5)
        } else if (width > 1000) {
            setGridColumns(4)
        } else if (width > 800) {
            setGridColumns(3)
        } else if (width > 650) {
            setGridColumns(2)
        } else if (width > 550) {
            setGridColumns(1)
        }

    }, [width])

    return (
        <>
            <section className='shelf__first'>
                <div className="shelf__top">
                    <h2>{`Good ${getTimeOfDay()}`}</h2>
                </div>
                <ul className='shelf__mix'>
                    {
                        topArtists?.map(item => {
                            return (
                                <li
                                    key={item.id}
                                    className='shelf__mix--item'>
                                    <Link href='' className='shelf__mix--link'>
                                        <Image className='shelf__mix--image' src={item.images[0].url} width={item.images[0].width} height={item.images[0].height} alt='' />
                                        <div className='shelf__mix--content'>
                                            <span>{item.name}</span>
                                            <div className='shelf__mix--play'>
                                                <PlayButton />
                                            </div>
                                        </div>
                                    </Link>
                                </li>
                            )
                        })
                    }

                </ul>
            </section>
            {categoriesList &&
                categoriesList.map(category => {
                    return <Fragment key={category.id}>
                        <Categories category={category as ICategory} cardsColumns={cardsColumns as number} user={user} />
                    </Fragment>
                })
            }
            <section
                className="shelf"
                data-testid="component-shelf"
                aria-label="Featured Playlists"
            >
                <div className="shelf__top">
                    <h2>
                        <Link
                            draggable="false"
                            data-testid="see-all-link"
                            className="shelf__title"
                            href='/section/featured-playlists'
                        >
                            Featured Playlists
                        </Link>
                    </h2>
                    <Link
                        draggable="false"
                        className="shelf__all"
                        href='/section/featured-playlists'
                    >
                        Show all
                    </Link>
                </div>
                <div
                    data-testid="grid-container"
                    className="shelf__cards"
                    style={{ '--cards-grid': cardsColumns } as CustomCSSProperties}
                >
                    {
                        newReleases?.map(item => {
                            return (
                                <div
                                    key={item.id}
                                    className="card">
                                    <Link
                                        draggable="false"
                                        title={item.name}
                                        className="card__link"
                                        dir="auto"
                                        href={`/playlist/${item.id}`}
                                    >
                                        <div className="card__image">
                                            <div className="card__image--container">
                                                <Image
                                                    className="card__image--image"
                                                    data-testid="card-image"
                                                    aria-hidden="false"
                                                    draggable="false"
                                                    loading="lazy"
                                                    height={175}
                                                    width={175}
                                                    src={item.images[0].url}
                                                    alt=""
                                                />
                                            </div>
                                            <div className="card__play">
                                                <PlayButton />
                                            </div>
                                        </div>
                                        <div className="card__info">
                                            <div className="card__info--label" data-encore-id="type">
                                                {item.name}
                                            </div>
                                            <div className="card__info--title" data-encore-id="type">
                                                {item.artists.map((artist, index) => {
                                                    return <span key={artist.id}>
                                                        {index === item.artists.length - 1
                                                            ? artist.name
                                                            : `${artist.name}, `}
                                                    </span>
                                                })}
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            )
                        })
                    }
                </div>
            </section>
        </>
    )
}

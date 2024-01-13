'use client'

import PlayButton from "@/components/UI/PlayButton/PlayButton"
import { getData } from "@/server/actions"
import { ICategory, ICommonPlaylist, IUser } from "@/types/types"
import { useQuery } from "@tanstack/react-query"
import Image from "next/image"
import Link from "next/link"
import { CustomCSSProperties } from "./Shelf"

interface IProps {
    cardsColumns: number
    user: IUser
    category: ICategory
}

export default function Categories({ cardsColumns, user, category }: IProps) {
    const { data} = useQuery({
        queryKey: ['category', cardsColumns, category],
        // enabled: !!cardsColumns,
        queryFn: async () => {
            const categoryData = await getData(`https://api.spotify.com/v1/browse/categories/${category.id}/playlists?limit=${cardsColumns}`, user?.accessToken as string)
            console.log(categoryData?.data?.playlists?.items);
            
            return categoryData?.data?.playlists?.items as ICommonPlaylist[]
        }
    })
    console.log(category.name);
    return (
        <section
            className="shelf"
            data-testid="component-shelf"
            aria-label={category.name}
        >
            <div className="shelf__top">
                <h2>
                    <Link
                        draggable="false"
                        data-testid="see-all-link"
                        className="shelf__title"
                        href='/section/featured-playlists'
                    >
                        {`${category.name} Playlists`}
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
                    data?.map(item => {
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
                                            Total tracks: {item?.tracks.total}
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        )
                    })
                }
            </div>
        </section>
    )
};

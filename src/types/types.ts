import { Session } from 'next-auth'

export interface IUser extends Session {
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
    username?: string | null | undefined;
    accessToken?: string | null | undefined;
}

export interface IGetSession {
    session: Session,
    userSession: IUser
}

export interface ICategory {
    // href?: string,
    // icons?: {}[],
    id: string,
    name: string
}

export interface ICommonPlaylist {
    href: string
    id: string
    name: string
    genres: string[]
    images: {
        height: number
        url: string
        width: number
    }[]
    type: string
    external_urls: { spotify: string }
    uri: string
    owner?: {
        display_name: string
        external_urls: { spotify: string }
        href: string
        id: string
        type: string
        uri: string
    }
    artists: [
        {
            external_urls: {
                spotify: string
            },
            href: string,
            id: string,
            name: string,
            type: string,
            uri: string
        }
    ],
    tracks: {
        href: string
        total: number
    }
}

export interface IPlaylist extends ICommonPlaylist{
    collaborative: boolean
    description: string
    // external_urls: { spotify: string }
    // href: string
    // id: string
    // images: [{
    //     height: number
    //     url: string
    //     width: number
    // }]
    // name: string
    // owner?:{
    //     display_name: string
    //     external_urls: { spotify: string }
    //     href: string
    //     id: string
    //     type: string
    //     uri: string
    // }
    primary_color: string | null
    public: boolean
    snapshot_id: string
    tracks: {
        href: string,
        total: number
    }
    // type: string
    // uri: string
}

export interface IArtists extends ICommonPlaylist {
    // external_urls: {
    //     spotify: string
    // },
    followers: {
        href: string,
        total: number
    },
    genres: string[],
    // href: string,
    // id: string,
    // images: [
    //     {
    //         url: string,
    //         height: number,
    //         width: number
    //     }
    // ],
    // name: string,
    popularity: number,
    // type: string,
    // uri: string
}

export interface IFeaturedPlaylist {
    collaborative: boolean,
    description: string,
    artists: {
        external_urls: { spotify: string }
        href: string
        id: string
        name: string
        type: string
        uri: string
    }[]
    external_urls: {
        spotify: string
    },
    href: string,
    id: string,
    images: [
        {
            url: string,
            height: number,
            width: number
        }
    ],
    name: string,
    owner: {
        external_urls: {
            spotify: string
        },
        followers: {
            href: string,
            total: number
        },
        href: string,
        id: string,
        type: string,
        uri: string,
        display_name: string
    },
    public: boolean,
    snapshot_id: string,
    tracks: {
        href: string,
        total: number
    },
    type: string,
    uri: string
}
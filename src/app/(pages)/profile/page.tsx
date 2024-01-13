import { getSession } from "@/libs/getSession";
import Image from "next/image";
import { userIcon } from '../../../../public/icons';
import { IUser } from "@/types/types";
import './profile.scss'
import { Key } from "react";
import Link from "next/link";

export default async function Profile() {
    const {session} = await getSession()
    const user = session?.user as IUser
    // const response = await fetch(`https://api.spotify.com/v1/me/playlists`, {
    //     method: 'GET',
    //     headers: { Authorization: `Bearer ${user?.accessToken}` }
    // });

    // const data = await response.json()
    
    return (
        <section>
            <div
                className="profile__user--image"
            >
                {session
                    ? <Image
                        src={user?.image as string}
                        className="user__image "
                        width={300}
                        height={300}
                        alt='user' />
                    : userIcon}
            </div>
            <div>

            </div>
        </section >
    )
}



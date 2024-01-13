import Shelf from "@/components/Shelf/Shelf";

import { IGetSession, IUser } from "@/types/types";
import { getSession } from "@/server/actions";

export default async function Home() {

    const { session, userSession } = await getSession() as IGetSession

    return (
        <>
            {session &&
                <Shelf user={userSession} />
            }
            {/* <Shelf playlistsList={commonPlaylist} user={user} /> */}
        </>
    )
}


import Shelf from "./Shelf";
import Image from "next/image";
import Link from "next/link";
import PlayButton from "@/components/UI/PlayButton/PlayButton";
import { getTimeOfDay } from "@/libs/getTimeOfDay";
import axios from "axios";
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


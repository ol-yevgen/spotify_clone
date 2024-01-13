'use client'

import { usePathname } from "next/navigation"

export default function Playlist() {
    const path = usePathname()

    return (
        <>
            {`Playlist ${path.replace('/playlist/', '')}`}
        </>
    )
};

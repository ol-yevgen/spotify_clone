'use client';

import { usePathname } from 'next/navigation';
import { Dispatch, PropsWithChildren, ReactNode, SetStateAction, useState, createContext, useCallback, useEffect } from 'react';

interface PageHistoryContextTypes {
    pathList: string[],
    addNewRouteToHistory: (path: string) => void
    move: number,
    setMove: Dispatch<SetStateAction<number>>,
};


export const PageHistoryContext = createContext<PageHistoryContextTypes>({
    pathList: [''],
    addNewRouteToHistory: () => {},
    move: 0,
    setMove: () => {}
})

export const PageHistoryProvider = ({ children }: PropsWithChildren<{}>) => {
    const [pathList, setPathList] = useState<string[]>([])
    const [move, setMove] = useState(0)
    const currPath = usePathname()

    useEffect(() => {
        setPathList([...pathList, currPath])
    }, [])

    const addNewRouteToHistory = useCallback((path: string) => {
        if (path !== currPath) {
            if (move + 1 === pathList.length) {
                setPathList([...pathList, path])
            } else {
                const updatedPathList = pathList.slice(0, move + 1 )
                setPathList([...updatedPathList, path])
            }
            
            setMove(move + 1)

        }
    }, [pathList, move, currPath])

    return (
        <PageHistoryContext.Provider value={{ pathList, addNewRouteToHistory, move, setMove }}>
            {children}
        </PageHistoryContext.Provider>
    )
}

'use client'

import { PageHistoryContext } from '@/providers/PagesHistoryProvider';
import { arrowLeft, arrowRight } from '../../../../public/icons';
import { useRouter } from "next/navigation"
import { useContext } from "react"

export default function PathMove() {
    const { pathList, move, setMove } = useContext(PageHistoryContext)
    const router = useRouter()

    const pathForward = () => {
        setMove(move + 1)
        router.push(pathList[move + 1])
    }

    const pathBack = () => {
        setMove(move - 1)
        router.push(pathList[move - 1])
    }

    return (
        <div className='header__nav'>
            <button
                className="btn__header"
                onClick={pathBack}
                disabled={move === 0}
            >
                {arrowLeft}
            </button>
            <button
                className="btn__header"
                onClick={pathForward}
                disabled={pathList.length === 1 || pathList.length === move + 1}
            >
                {arrowRight}
            </button>
        </div>
    )
};

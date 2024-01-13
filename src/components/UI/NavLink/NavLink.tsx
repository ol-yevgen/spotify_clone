'use client'

import Link from "next/link";
import { capitalizeFirstLetter } from '@/libs/capitalize'
import { ReactNode, useContext } from "react";
import { PageHistoryContext } from "@/providers/PagesHistoryProvider";

type TNavLinkProps = {
    func?: (arg: boolean) => void,
    className: string,
    icon?: JSX.Element,
    label?: string,
    path: string,
    children?: ReactNode
}

export default function NavLink({ label, path, icon, func, className, children }: TNavLinkProps) {

    const { addNewRouteToHistory } = useContext(PageHistoryContext)

    const linkAction = () => {
        func?.(false)
        addNewRouteToHistory(path)
    }

    return (
        <Link
            href={path} className={className}
            onClick={linkAction}
        >
            {children 
                ? children
                : <>
                    {icon}
                    <span>{capitalizeFirstLetter(label as string)}</span>
                </>
        }
        </Link>
    )
};

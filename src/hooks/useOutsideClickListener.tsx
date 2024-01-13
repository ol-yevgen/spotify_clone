import { MouseEvent, RefObject, useCallback, useEffect, useState } from "react"

export default function useOutsideClickListener(ref: RefObject<HTMLElement>) {
    const [isShow, setIsShow] = useState<boolean>(false)

    const handlerClickOutside = useCallback((event: MouseEvent) => {
        
        if (ref.current && !ref.current.contains(event.target as Node)) {
            setIsShow(false)
        }
  
    }, [ref])

    useEffect(() => {
        
        if (isShow) {
            document.addEventListener('mousedown', handlerClickOutside as unknown as EventListener)
        }
        
        return () => {
            document.removeEventListener('mousedown', handlerClickOutside as unknown as EventListener)
        }
    }, [handlerClickOutside, isShow])

    return { isShow, setIsShow }
};

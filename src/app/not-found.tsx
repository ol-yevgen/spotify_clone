'use client'

import { useRouter } from 'next/navigation';
import '@/app/styles/notFound.scss'

export default function NotFound() {
    const router = useRouter ()
    return (

        <section className="not-found">
            <h1>Page Not Found</h1>

            <button
                className='btn__not-found container'
                onClick={() => router.back()}
            >
                Back
            </button>
        </section>
    )
}

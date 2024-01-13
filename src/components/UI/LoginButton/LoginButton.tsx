'use client'
import { signIn } from "next-auth/react";
import './loginButton.scss'
import { MouseEvent } from "react";

export default function LoginButton({bg}: {bg: string}) {

    const onSignIn = (e: MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        
        signIn('spotify', { callbackUrl: '/' })
    }

    return (
        <button
            className={`btn__login ${bg}`}
            onClick={(e) => onSignIn(e)}>
            Sign in with Spotify
        </button>
    )
};

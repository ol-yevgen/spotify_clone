'use client'

import { MouseEvent } from 'react';
import './playButton.scss'

export default function PlayButton() {

    const startPlay = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        e.preventDefault()
        console.log('Start playing');
    }

    return (
        <button
            data-testid="play-button"
            aria-label="Play Daily Mix 1"
            data-encore-id="buttonPrimary"
            className="btn__play"
            onClick={e => startPlay(e)} 
        >
            <svg
                data-encore-id="icon"
                role="img"
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="btn__play--icon">
                <path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z">
                </path>
            </svg>
        </button>
    )
};

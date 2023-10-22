import React from 'react'

interface Props {
    width?: number
    height?: number
}

export default function ChevronUp({ width, height }: Props) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            width={width || 24}
            height={height || 24}
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-6 h-6"
        >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M4.5 15.75l7.5-7.5 7.5 7.5"
            />
        </svg>
    )
}

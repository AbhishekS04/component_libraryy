"use client"

import { ReactLenis } from 'lenis/react'
import { useReducedMotion } from "framer-motion"

export function SmoothScroll({ children }: { children: React.ReactNode }) {
    const reduced = useReducedMotion()

    if (reduced) {
        return <>{children}</>
    }

    return (
        <ReactLenis
            root
            options={{
                lerp: 0.08,
                smoothWheel: true,
                syncTouch: true,
            }}
        >
            {children}
        </ReactLenis>
    )
}

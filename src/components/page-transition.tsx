"use client"

import * as React from "react"
import { AnimatePresence, m, useReducedMotion } from "framer-motion"
import { usePathname } from "next/navigation"

const EASE_OUT_QUINT: [number, number, number, number] = [0.22, 1, 0.36, 1]

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const reduced = useReducedMotion()

  const initial = reduced
    ? { opacity: 1 }
    : { opacity: 0, y: 10, filter: "blur(10px)" }

  const animate = reduced
    ? { opacity: 1 }
    : { opacity: 1, y: 0, filter: "blur(0px)" }

  const exit = reduced
    ? { opacity: 1 }
    : { opacity: 0, y: -6, filter: "blur(6px)" }

  const transition = reduced
    ? { duration: 0 }
    : { duration: 0.4, ease: EASE_OUT_QUINT }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <m.div
        key={pathname}
        initial={initial}
        animate={animate}
        exit={exit}
        transition={transition}
      >
        {children}
      </m.div>
    </AnimatePresence>
  )
}

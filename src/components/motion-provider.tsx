"use client"

import * as React from "react"
import { LazyMotion, MotionConfig, domAnimation } from "framer-motion"

export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  )
}

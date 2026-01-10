
import React from "react"
import dynamic from "next/dynamic"

export const demos: Record<string, React.ComponentType> = {
    "button": dynamic(() => import("@registry/components/button/demo")),
    "social-stories": dynamic(() => import("@registry/components/social-stories/demo")),
}

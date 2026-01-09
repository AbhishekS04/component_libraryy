"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { demos } from "@registry/demos"

interface ComponentPreviewProps {
    slug?: string
    files?: {
        path: string
        content: string
    }[]
    className?: string
    css?: string
}

export function ComponentPreview({ slug, className }: ComponentPreviewProps) {
    if (slug && demos[slug]) {
        const DemoComponent = demos[slug]
        return (
            <div className={cn("group relative w-full min-h-[400px] flex items-center justify-center rounded-xl bg-background border border-border p-10", className)}>
                <React.Suspense fallback={<div className="text-muted-foreground animate-pulse">Loading preview...</div>}>
                    <DemoComponent />
                </React.Suspense>
            </div>
        )
    }

    return (
        <div className="flex h-[400px] items-center justify-center text-muted-foreground">
            Component preview not available.
        </div>
    )
}

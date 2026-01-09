"use client"

import * as React from "react"
import { Check, Copy } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button, ButtonProps } from "@/../registry/components/button/button"

export function CopyButton({
    value,
    className,
    variant = "ghost",
    onCopied,
    onClick,
    ...props
}: ButtonProps & { value: string; onCopied?: () => void }) {
    const [hasCopied, setHasCopied] = React.useState(false)

    React.useEffect(() => {
        if (!hasCopied) return

        const timeoutId = window.setTimeout(() => {
            setHasCopied(false)
        }, 2000)

        return () => {
            window.clearTimeout(timeoutId)
        }
    }, [hasCopied])

    return (
        <Button
            size="icon"
            variant={variant}
            className={cn("relative z-10 h-6 w-6 cursor-pointer text-zinc-50 hover:bg-zinc-700 hover:text-zinc-50 [&_svg]:h-3 [&_svg]:w-3", className)}
            onClick={(event) => {
                navigator.clipboard.writeText(value)
                setHasCopied(true)
                onCopied?.()
                onClick?.(event)
            }}
            {...props}
        >
            <span className="sr-only">Copy</span>
            {hasCopied ? <Check className="text-green-500" /> : <Copy />}
        </Button>
    )
}

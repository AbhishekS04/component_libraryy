"use client"

import * as React from "react"
import { Check, Copy } from "lucide-react"

interface ClickablePromptProps {
    value: string
    onCopied?: () => void
}

export function ClickablePrompt({ value, onCopied }: ClickablePromptProps) {
    const [hasCopied, setHasCopied] = React.useState(false)

    React.useEffect(() => {
        if (hasCopied) {
            const timeout = setTimeout(() => {
                setHasCopied(false)
            }, 2000)
            return () => clearTimeout(timeout)
        }
    }, [hasCopied])

    const handleCopy = () => {
        navigator.clipboard.writeText(value)
        setHasCopied(true)
        onCopied?.()
    }

    return (
        <div
            onClick={handleCopy}
            className="group relative cursor-pointer"
        >
            <div className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/50 rounded-lg p-3 pr-12 font-mono text-xs text-zinc-600 dark:text-zinc-300 line-clamp-3 leading-relaxed transition-colors hover:bg-zinc-200 dark:hover:bg-zinc-800/80">
                {value}
            </div>
            <div className="absolute right-2 top-3 p-1.5 rounded-md text-zinc-500 transition-colors group-hover:text-zinc-900 dark:group-hover:text-zinc-100">
                {hasCopied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            </div>
        </div>
    )
}

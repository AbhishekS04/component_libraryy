"use client"

import * as React from "react"

import { ClickablePrompt } from "@/components/clickable-prompt"

type AiPromptCardProps = {
  prompt: string
}

export function AiPromptCard({ prompt }: AiPromptCardProps) {
  const [isAnimating, setIsAnimating] = React.useState(false)

  React.useEffect(() => {
    if (!isAnimating) return

    const timeoutId = window.setTimeout(() => {
      setIsAnimating(false)
    }, 350)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [isAnimating])

  return (
    <div className="rounded-xl border border-zinc-800 bg-black overflow-hidden">
      <div className="p-4 border-b border-zinc-800 flex items-center gap-2">
        <div
          className={
            "p-1.5 rounded-md bg-zinc-900 text-zinc-400 will-change-transform transition-transform duration-300 " +
            (isAnimating ? "scale-110 -rotate-6 text-primary" : "")
          }
        >
          <span className="material-symbols-outlined text-sm">auto_awesome</span>
        </div>
        <h3 className="font-medium text-sm text-zinc-200">AI Prompt</h3>
      </div>
      <div className="p-4">
        <ClickablePrompt value={prompt} onCopied={() => setIsAnimating(true)} />
      </div>
    </div>
  )
}

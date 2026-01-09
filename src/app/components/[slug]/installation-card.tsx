"use client"

import * as React from "react"

import { CopyButton } from "@/components/copy-button"

type InstallationCardProps = {
  commandText: string
  copyValue: string
}

export function InstallationCard({ commandText, copyValue }: InstallationCardProps) {
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
          <span className="material-symbols-outlined text-sm">terminal</span>
        </div>
        <h3 className="font-medium text-sm text-zinc-200">Installation</h3>
      </div>
      <div className="p-4">
        <div className="relative flex items-center justify-between gap-2 p-3 rounded-lg bg-zinc-900 border border-zinc-800/50 font-mono text-xs text-zinc-300">
          <div className="flex bg-transparent w-full overflow-hidden">
            <span className="text-zinc-600 mr-2 select-none">$</span>
            <span className="truncate">{commandText}</span>
          </div>
          <CopyButton
            value={copyValue}
            className="text-zinc-500 hover:text-white transition-colors"
            onCopied={() => setIsAnimating(true)}
          />
        </div>
      </div>
    </div>
  )
}

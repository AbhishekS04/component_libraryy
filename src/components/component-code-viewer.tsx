"use client"

import * as React from "react"
import { CopyButton } from "@/components/copy-button"
import { cn } from "@/lib/utils"

interface CodeFile {
    path: string
    content: string
    highlighted: string
}

interface ComponentCodeViewerProps {
    files: CodeFile[]
}

export function ComponentCodeViewer({ files }: ComponentCodeViewerProps) {
    // Sort logic? passing "demo.tsx" or "component.tsx" priority?
    // For now, use order provided.
    const [activePath, setActivePath] = React.useState(files[0]?.path)

    const activeFile = files.find(f => f.path === activePath) || files[0]

    return (
        <div className="flex flex-col h-full rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950">
            <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900/50 px-2 overflow-x-auto scrollbar-hide">
                <div className="flex">
                    {files.map((file) => (
                        <button
                            key={file.path}
                            onClick={() => setActivePath(file.path)}
                            className={cn(
                                "relative px-4 py-3 text-xs font-medium transition-colors hover:text-zinc-100 whitespace-nowrap",
                                activePath === file.path
                                    ? "text-primary after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-primary"
                                    : "text-zinc-500"
                            )}
                        >
                            {file.path}
                        </button>
                    ))}
                </div>
                {activeFile && (
                    <CopyButton
                        value={activeFile.content}
                        className="ml-2 flex-shrink-0 text-zinc-500 hover:text-zinc-100"
                    />
                )}
            </div>
            <div className="relative flex-1 bg-zinc-950 overflow-hidden">
                <div
                    className="h-full overflow-auto p-4 text-sm font-mono leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: activeFile?.highlighted || "" }}
                />
            </div>
        </div>
    )
}

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
    const [activePath, setActivePath] = React.useState(files[0]?.path)
    const activeFile = files.find(f => f.path === activePath) || files[0]

    return (
        <div className="flex flex-col h-[664px] w-full rounded-b-xl overflow-hidden border border-t-0 border-zinc-800 bg-black">
            {/* Minimal File Tabs Header */}
            <div className="flex items-center justify-between border-b border-zinc-800 bg-black px-0">
                <div className="flex overflow-x-auto scrollbar-hide">
                    {files.map((file) => (
                        <button
                            key={file.path}
                            onClick={() => setActivePath(file.path)}
                            className={cn(
                                "relative px-4 py-3 text-sm font-medium transition-all border-r border-zinc-800 outline-none focus-visible:ring-2 focus-visible:ring-primary/50 z-10",
                                activePath === file.path
                                    ? "text-zinc-100 bg-black after:absolute after:top-0 after:left-0 after:right-0 after:h-[2px] after:bg-primary"
                                    : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900"
                            )}
                        >
                            {file.path}
                        </button>
                    ))}
                </div>

                {activeFile && (
                    <div className="px-3">
                        <CopyButton
                            value={activeFile.content}
                            className="text-zinc-500 hover:text-zinc-100 transition-colors size-8"
                        />
                    </div>
                )}
            </div>

            {/* Code Content */}
            <div className="relative flex-1 overflow-hidden bg-black">
                <div
                    data-lenis-prevent
                    className="h-full overflow-auto p-6 text-sm font-mono leading-relaxed custom-scrollbar"
                    style={{
                        scrollbarWidth: 'thin',
                        scrollbarColor: '#3f3f46 transparent'
                    }}
                    dangerouslySetInnerHTML={{ __html: activeFile?.highlighted || "" }}
                />
            </div>
        </div>
    )
}

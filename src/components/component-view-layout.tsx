"use client"

import * as React from "react"
import { ComponentPreview } from "@/components/component-preview"
import { ComponentCodeViewer } from "@/components/component-code-viewer"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

interface ComponentViewLayoutProps {
    slug: string
    codeFiles: {
        path: string
        content: string
        highlighted: string
    }[]
}

export function ComponentViewLayout({ slug, codeFiles }: ComponentViewLayoutProps) {
    const [viewMode, setViewMode] = React.useState<"desktop" | "mobile">("desktop")
    const [restartKey, setRestartKey] = React.useState(0)

    return (
        <Tabs defaultValue="preview" className="rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden bg-white dark:bg-zinc-950 shadow-sm">
            <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
                <TabsList className="bg-zinc-200 dark:bg-zinc-800 p-1 rounded-lg h-auto">
                    <TabsTrigger value="preview" className="px-3 py-1 rounded-md text-xs font-bold data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-700 data-[state=active]:text-zinc-900 dark:data-[state=active]:text-zinc-100 shadow-sm transition-all text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300">Preview</TabsTrigger>
                    <TabsTrigger value="code" className="px-3 py-1 rounded-md text-xs font-bold data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-700 data-[state=active]:text-zinc-900 dark:data-[state=active]:text-zinc-100 shadow-sm transition-all text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300">Code</TabsTrigger>
                </TabsList>
                <div className="flex items-center gap-3 text-zinc-400">
                    <button
                        onClick={() => setViewMode("desktop")}
                        className={cn("hover:text-primary transition-colors", viewMode === "desktop" && "text-primary")}
                        title="Desktop view"
                    >
                        <span className="material-symbols-outlined text-xl">desktop_windows</span>
                    </button>
                    <button
                        onClick={() => setViewMode("mobile")}
                        className={cn("hover:text-primary transition-colors", viewMode === "mobile" && "text-primary")}
                        title="Mobile view"
                    >
                        <span className="material-symbols-outlined text-xl">smartphone</span>
                    </button>
                    <div className="w-px h-4 bg-zinc-300 dark:bg-zinc-700 mx-1"></div>
                    <button
                        onClick={() => setRestartKey(prev => prev + 1)}
                        className="hover:text-primary transition-colors"
                        title="Restart preview"
                    >
                        <span className="material-symbols-outlined text-xl">refresh</span>
                    </button>
                </div>
            </div>

            <TabsContent value="preview" className="relative p-0 m-0 border-0 rounded-b-xl overflow-hidden bg-zinc-50 dark:bg-black">
                <div className={cn(
                    "min-h-[400px] sm:min-h-[664px] flex items-center justify-center p-8 border border-zinc-200 dark:border-zinc-800 border-t-0 rounded-b-xl transition-all duration-300 ease-in-out mx-auto",
                    viewMode === "mobile" ? "w-[375px] border-x" : "w-full"
                )}>
                    <ComponentPreview
                        key={restartKey}
                        slug={slug}
                        className="!min-h-0 !h-auto !border-none !bg-transparent !shadow-none !p-0 w-full h-full flex items-center justify-center"
                    />
                </div>
            </TabsContent>

            <TabsContent value="code" className="p-0 m-0 border-0 min-h-[664px]">
                <ComponentCodeViewer files={codeFiles} />
            </TabsContent>
        </Tabs>
    )
}

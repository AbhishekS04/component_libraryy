"use client"

import * as React from "react"
import Link from "next/link"
import { ComponentPreview } from "@/components/component-preview"
import { cn } from "@/lib/utils"

interface ComponentsDisplayProps {
    components: {
        slug: string
        date: string
    }[]
    selectedCategory?: string
}

export function ComponentsDisplay({ components, selectedCategory }: ComponentsDisplayProps) {
    const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid")

    return (
        <>
            <div className="mb-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div className="max-w-2xl">
                        <h1 className="text-4xl font-bold tracking-tight text-white mb-2">Components</h1>
                        <p className="text-zinc-400 text-lg">Deep zinc theme component library for modern web applications.</p>
                    </div>
                    <div className="flex gap-2">
                        <div className="bg-zinc-900 border border-zinc-800 p-1 rounded flex">
                            <button
                                onClick={() => setViewMode("grid")}
                                className={cn(
                                    "px-3 py-1 rounded text-[10px] font-mono font-medium transition-colors",
                                    viewMode === "grid" ? "bg-zinc-800 text-white" : "text-zinc-500 hover:text-white"
                                )}
                            >
                                Grid
                            </button>
                            <button
                                onClick={() => setViewMode("list")}
                                className={cn(
                                    "px-3 py-1 rounded text-[10px] font-mono font-medium transition-colors",
                                    viewMode === "list" ? "bg-zinc-800 text-white" : "text-zinc-500 hover:text-white"
                                )}
                            >
                                List
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2 mt-8 overflow-x-auto pb-2 scrollbar-none">
                    <Link href="/components" className={`px-3 py-1.5 rounded text-[10px] font-mono font-medium whitespace-nowrap cursor-pointer transition-colors ${!selectedCategory ? 'bg-primary text-white' : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-500'}`}>All Frameworks</Link>
                    <div className="px-3 py-1.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-500 text-[10px] font-mono font-medium whitespace-nowrap transition-colors cursor-pointer">React</div>
                    <div className="px-3 py-1.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-500 text-[10px] font-mono font-medium whitespace-nowrap transition-colors cursor-pointer">Tailwind CSS</div>
                    <div className="px-3 py-1.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-500 text-[10px] font-mono font-medium whitespace-nowrap transition-colors cursor-pointer">Framer Motion</div>
                    <div className="px-3 py-1.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-500 text-[10px] font-mono font-medium whitespace-nowrap transition-colors cursor-pointer">TypeScript</div>
                    <div className="px-3 py-1.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-500 text-[10px] font-mono font-medium whitespace-nowrap transition-colors cursor-pointer">Next.js</div>
                </div>
            </div>

            {components.length > 0 ? (
                <div className={cn(
                    "gap-6",
                    viewMode === "grid"
                        ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
                        : "flex flex-col"
                )}>
                    {components.map((c) => (
                        <Link key={c.slug} href={`/components/${c.slug}`} className="block">
                            <div className={cn(
                                "group relative flex bg-zinc-900 border border-zinc-800 rounded overflow-hidden hover:border-zinc-600 transition-all duration-200",
                                viewMode === "grid" ? "flex-col" : "flex-row h-32"
                            )}>
                                <div className={cn(
                                    "bg-zinc-950 relative flex items-center justify-center border-zinc-800 overflow-hidden shrink-0",
                                    viewMode === "grid" ? "h-48 border-b" : "w-48 border-r h-full"
                                )}>
                                    {/* Component Preview in Card */}
                                    <div className="absolute inset-0 flex items-center justify-center p-4">
                                        <div className="w-full h-full flex items-center justify-center pointer-events-none select-none scale-[0.8] origin-center">
                                            <ComponentPreview
                                                slug={c.slug}
                                                className="!min-h-0 !h-auto !p-0 !border-none !bg-transparent w-full flex items-center justify-center"
                                            />
                                        </div>
                                    </div>

                                    {/* Hover Overlay */}
                                    <div className="absolute inset-0 bg-zinc-950/0 group-hover:bg-zinc-950/10 transition-colors" />

                                    <div className="absolute inset-0 bg-zinc-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                                        <button className="px-3 py-1.5 bg-white text-zinc-950 text-[10px] font-mono font-bold rounded pointer-events-none">Preview</button>
                                    </div>
                                </div>
                                <div className="p-4 flex flex-col justify-center flex-1">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="font-mono text-[10px] tracking-tight uppercase text-primary">Component</span>
                                        <span className="font-mono text-[10px] tracking-tight uppercase px-2 py-0.5 border border-zinc-800 text-zinc-400">Med</span>
                                    </div>
                                    <h3 className="text-sm font-bold text-white mb-1 capitalize">{c.slug.replace(/-/g, ' ')}</h3>
                                    <p className="text-xs text-zinc-500 line-clamp-1 mb-4">A reusable {c.slug.replace(/-/g, ' ')} component.</p>
                                    <div className="flex items-center gap-2">
                                        <span className="font-mono text-[10px] tracking-tight uppercase text-zinc-500 bg-zinc-950 px-2 py-0.5 border border-zinc-800">React</span>
                                        <span className="font-mono text-[10px] tracking-tight uppercase text-zinc-500 bg-zinc-950 px-2 py-0.5 border border-zinc-800">Tailwind</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mb-4">
                        <span className="material-symbols-outlined text-3xl text-zinc-500">search_off</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">No components found</h3>
                    <p className="text-zinc-500 max-w-sm">No components found in the "{selectedCategory}" category.</p>
                    <Link href="/components" className="mt-6 px-4 py-2 bg-zinc-100 hover:bg-white text-black font-bold text-sm rounded transition-colors">
                        View All Components
                    </Link>
                </div>
            )}
        </>
    )
}

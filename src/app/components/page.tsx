
import { getAllComponents } from "@/../registry/lib/components"
import Link from "next/link"
import { ComponentPreview } from "@/components/component-preview"

export default async function ComponentsPage() {
    const components = await getAllComponents()

    return (
        <div className="min-h-screen bg-zinc-950 font-display text-zinc-100 antialiased selection:bg-primary/30">


            <div className="max-w-[1400px] mx-auto px-4 md:px-8 flex gap-8">
                <aside className="hidden lg:block w-64 shrink-0 py-8 sticky top-16 h-[calc(100vh-64px)] overflow-y-auto custom-scrollbar">
                    <div className="space-y-8">
                        <div>
                            <h3 className="font-mono text-[10px] tracking-tight uppercase text-zinc-500 mb-4">Discovery</h3>
                            <div className="space-y-1">
                                <Link className="flex items-center justify-between px-3 py-2 rounded bg-primary text-white font-medium" href="#">
                                    <div className="flex items-center gap-3">
                                        <span className="material-symbols-outlined text-xl">grid_view</span>
                                        <span className="text-sm">Browse All</span>
                                    </div>
                                </Link>
                                <Link className="flex items-center justify-between px-3 py-2 rounded hover:bg-zinc-900 transition-colors text-zinc-400 hover:text-white" href="#">
                                    <div className="flex items-center gap-3">
                                        <span className="material-symbols-outlined text-xl">new_releases</span>
                                        <span className="text-sm">Latest</span>
                                    </div>
                                    <span className="font-mono text-[10px] bg-zinc-800 text-zinc-300 px-1.5 py-0.5 rounded">12</span>
                                </Link>
                                <Link className="flex items-center justify-between px-3 py-2 rounded hover:bg-zinc-900 transition-colors text-zinc-400 hover:text-white" href="#">
                                    <div className="flex items-center gap-3">
                                        <span className="material-symbols-outlined text-xl">star</span>
                                        <span className="text-sm">Featured</span>
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div>
                            <h3 className="font-mono text-[10px] tracking-tight uppercase text-zinc-500 mb-4">Categories</h3>
                            <div className="space-y-1">
                                <Link className="flex items-center justify-between px-3 py-2 rounded hover:bg-zinc-900 transition-colors text-zinc-400 hover:text-white" href="#">
                                    <div className="flex items-center gap-3">
                                        <span className="material-symbols-outlined text-xl">dashboard_customize</span>
                                        <span className="text-sm">Layout</span>
                                    </div>
                                    <span className="font-mono text-[10px] text-zinc-600">24</span>
                                </Link>
                                <Link className="flex items-center justify-between px-3 py-2 rounded hover:bg-zinc-900 transition-colors text-zinc-400 hover:text-white" href="#">
                                    <div className="flex items-center gap-3">
                                        <span className="material-symbols-outlined text-xl">edit_note</span>
                                        <span className="text-sm">Forms</span>
                                    </div>
                                    <span className="font-mono text-[10px] text-zinc-600">18</span>
                                </Link>
                                <Link className="flex items-center justify-between px-3 py-2 rounded hover:bg-zinc-900 transition-colors text-zinc-400 hover:text-white" href="#">
                                    <div className="flex items-center gap-3">
                                        <span className="material-symbols-outlined text-xl">explore</span>
                                        <span className="text-sm">Navigation</span>
                                    </div>
                                    <span className="font-mono text-[10px] text-zinc-600">12</span>
                                </Link>
                                <Link className="flex items-center justify-between px-3 py-2 rounded hover:bg-zinc-900 transition-colors text-zinc-400 hover:text-white" href="#">
                                    <div className="flex items-center gap-3">
                                        <span className="material-symbols-outlined text-xl">build</span>
                                        <span className="text-sm">Utility</span>
                                    </div>
                                    <span className="font-mono text-[10px] text-zinc-600">31</span>
                                </Link>
                                <Link className="flex items-center justify-between px-3 py-2 rounded hover:bg-zinc-900 transition-colors text-zinc-400 hover:text-white" href="#">
                                    <div className="flex items-center gap-3">
                                        <span className="material-symbols-outlined text-xl">auto_awesome</span>
                                        <span className="text-sm">Animations</span>
                                    </div>
                                    <span className="font-mono text-[10px] text-zinc-600">09</span>
                                </Link>
                            </div>
                        </div>
                        <div className="pt-4 border-t border-zinc-800">
                            <button className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded border border-zinc-800 text-xs font-mono text-zinc-300 hover:bg-zinc-900 transition-colors">
                                <span className="material-symbols-outlined text-sm">content_copy</span>
                                <span>Copy CLI Command</span>
                            </button>
                        </div>
                    </div>
                </aside>

                <main className="flex-1 py-8">
                    <div className="mb-8">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                            <div className="max-w-2xl">
                                <h1 className="text-4xl font-bold tracking-tight text-white mb-2">Components</h1>
                                <p className="text-zinc-400 text-lg">Deep zinc theme component library for modern web applications.</p>
                            </div>
                            <div className="flex gap-2">
                                <div className="bg-zinc-900 border border-zinc-800 p-1 rounded flex">
                                    <button className="px-3 py-1 rounded bg-zinc-800 text-white text-[10px] font-mono font-medium">Grid</button>
                                    <button className="px-3 py-1 rounded text-zinc-500 hover:text-white text-[10px] font-mono font-medium transition-colors">List</button>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 mt-8 overflow-x-auto pb-2 scrollbar-none">
                            <div className="px-3 py-1.5 rounded bg-primary text-white text-[10px] font-mono font-medium whitespace-nowrap cursor-pointer">All Frameworks</div>
                            <div className="px-3 py-1.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-500 text-[10px] font-mono font-medium whitespace-nowrap transition-colors cursor-pointer">React</div>
                            <div className="px-3 py-1.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-500 text-[10px] font-mono font-medium whitespace-nowrap transition-colors cursor-pointer">Tailwind CSS</div>
                            <div className="px-3 py-1.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-500 text-[10px] font-mono font-medium whitespace-nowrap transition-colors cursor-pointer">Framer Motion</div>
                            <div className="px-3 py-1.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-500 text-[10px] font-mono font-medium whitespace-nowrap transition-colors cursor-pointer">TypeScript</div>
                            <div className="px-3 py-1.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-500 text-[10px] font-mono font-medium whitespace-nowrap transition-colors cursor-pointer">Next.js</div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                        {components.map((slug) => (
                            <Link key={slug} href={`/components/${slug}`}>
                                <div className="group relative flex flex-col bg-zinc-900 border border-zinc-800 rounded overflow-hidden hover:border-zinc-600 transition-all duration-200">
                                    <div className="h-48 bg-zinc-950 relative flex items-center justify-center border-b border-zinc-800 overflow-hidden">
                                        {/* Component Preview in Card */}
                                        <div className="absolute inset-0 flex items-center justify-center p-4">
                                            <div className="w-full h-full flex items-center justify-center pointer-events-none select-none scale-[0.8] origin-center">
                                                <ComponentPreview
                                                    slug={slug}
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
                                    <div className="p-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="font-mono text-[10px] tracking-tight uppercase text-primary">Component</span>
                                            <span className="font-mono text-[10px] tracking-tight uppercase px-2 py-0.5 border border-zinc-800 text-zinc-400">Med</span>
                                        </div>
                                        <h3 className="text-sm font-bold text-white mb-1 capitalize">{slug.replace(/-/g, ' ')}</h3>
                                        <p className="text-xs text-zinc-500 line-clamp-1 mb-4">A reusable {slug.replace(/-/g, ' ')} component.</p>
                                        <div className="flex items-center gap-2">
                                            <span className="font-mono text-[10px] tracking-tight uppercase text-zinc-500 bg-zinc-950 px-2 py-0.5 border border-zinc-800">React</span>
                                            <span className="font-mono text-[10px] tracking-tight uppercase text-zinc-500 bg-zinc-950 px-2 py-0.5 border border-zinc-800">Tailwind</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    <div className="mt-16 border-t border-zinc-800 pt-12 text-center pb-12">
                        <h4 className="text-xl font-bold text-white mb-4">Can't find what you're looking for?</h4>
                        <p className="text-zinc-500 mb-8 max-w-md mx-auto text-sm">We're constantly adding new components. Request a component or contribute to our library via PR.</p>
                        <div className="flex items-center justify-center gap-4">
                            <button className="px-6 py-2.5 bg-white text-zinc-950 text-xs font-mono font-bold rounded hover:bg-zinc-200 transition-colors">Request Component</button>
                            <button className="px-6 py-2.5 border border-zinc-800 text-white text-xs font-mono font-bold rounded hover:bg-zinc-900 transition-colors">Submit PR</button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

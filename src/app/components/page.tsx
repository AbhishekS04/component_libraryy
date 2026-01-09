
import { getAllComponents } from "@/../registry/lib/components"
import Link from "next/link"
import { ComponentPreview } from "@/components/component-preview"

const CATEGORY_MAP: Record<string, string> = {
    "button": "Utility",
    "social-stories": "Animations"
}

interface PageProps {
    searchParams: Promise<{
        category?: string
    }>
}

const FEATURED_COMPONENTS = ["social-stories"] // Hardcoded for now

export default async function ComponentsPage(props: PageProps) {
    const searchParams = await props.searchParams
    const allComponentsMeta = await getAllComponents()
    const selectedCategory = searchParams.category

    // Filter components
    let components = allComponentsMeta

    if (selectedCategory === "featured") {
        components = allComponentsMeta.filter(c => FEATURED_COMPONENTS.includes(c.slug))
    } else if (selectedCategory === "latest") {
        // Already sorted by date in getAllComponents, just take top N? Or just show all sorted?
        // Let's just show all sorted by date (which they are default)
        components = [...allComponentsMeta].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    } else if (selectedCategory) {
        components = allComponentsMeta.filter(c => CATEGORY_MAP[c.slug] === selectedCategory)
    }

    // Calculate counts
    const counts = allComponentsMeta.reduce((acc, c) => {
        const cat = CATEGORY_MAP[c.slug]
        if (cat) {
            acc[cat] = (acc[cat] || 0) + 1
        }
        return acc
    }, {} as Record<string, number>)

    return (
        <div className="min-h-screen bg-zinc-950 font-display text-zinc-100 antialiased selection:bg-primary/30">


            <div className="max-w-[1400px] mx-auto px-4 md:px-8 flex gap-8">
                <aside className="hidden lg:block w-64 shrink-0 py-8 sticky top-16 h-[calc(100vh-64px)] overflow-y-auto custom-scrollbar">
                    <div className="space-y-8">
                        <div>
                            <h3 className="font-mono text-[10px] tracking-tight uppercase text-zinc-500 mb-4">Discovery</h3>
                            <div className="space-y-1">
                                <Link className={`flex items-center justify-between px-3 py-2 rounded font-medium transition-colors ${!selectedCategory ? 'bg-primary text-white' : 'text-zinc-400 hover:text-white hover:bg-zinc-900'}`} href="/components">
                                    <div className="flex items-center gap-3">
                                        <span className="material-symbols-outlined text-xl">grid_view</span>
                                        <span className="text-sm">Browse All</span>
                                    </div>
                                </Link>
                                <Link className={`flex items-center justify-between px-3 py-2 rounded transition-colors ${selectedCategory === 'latest' ? 'bg-zinc-800 text-white' : 'hover:bg-zinc-900 text-zinc-400 hover:text-white'}`} href="/components?category=latest">
                                    <div className="flex items-center gap-3">
                                        <span className="material-symbols-outlined text-xl">new_releases</span>
                                        <span className="text-sm">Latest</span>
                                    </div>
                                    <span className="font-mono text-[10px] bg-zinc-800 text-zinc-300 px-1.5 py-0.5 rounded">{allComponentsMeta.length}</span>
                                </Link>
                                <Link className={`flex items-center justify-between px-3 py-2 rounded transition-colors ${selectedCategory === 'featured' ? 'bg-zinc-800 text-white' : 'hover:bg-zinc-900 text-zinc-400 hover:text-white'}`} href="/components?category=featured">
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
                                {['Layout', 'Forms', 'Navigation', 'Utility', 'Animations'].map(category => (
                                    <Link
                                        key={category}
                                        className={`flex items-center justify-between px-3 py-2 rounded transition-colors ${selectedCategory === category ? 'bg-zinc-800 text-white' : 'hover:bg-zinc-900 text-zinc-400 hover:text-white'}`}
                                        href={`/components?category=${category}`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className="material-symbols-outlined text-xl">
                                                {category === 'Layout' && 'dashboard_customize'}
                                                {category === 'Forms' && 'edit_note'}
                                                {category === 'Navigation' && 'explore'}
                                                {category === 'Utility' && 'build'}
                                                {category === 'Animations' && 'auto_awesome'}
                                            </span>
                                            <span className="text-sm">{category}</span>
                                        </div>
                                        <span className={`font-mono text-[10px] ${selectedCategory === category ? 'text-zinc-300' : 'text-zinc-600'}`}>
                                            {counts[category] || 0}
                                        </span>
                                    </Link>
                                ))}
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
                            <Link href="/components" className={`px-3 py-1.5 rounded text-[10px] font-mono font-medium whitespace-nowrap cursor-pointer transition-colors ${!selectedCategory ? 'bg-primary text-white' : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-500'}`}>All Frameworks</Link>
                            <div className="px-3 py-1.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-500 text-[10px] font-mono font-medium whitespace-nowrap transition-colors cursor-pointer">React</div>
                            <div className="px-3 py-1.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-500 text-[10px] font-mono font-medium whitespace-nowrap transition-colors cursor-pointer">Tailwind CSS</div>
                            <div className="px-3 py-1.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-500 text-[10px] font-mono font-medium whitespace-nowrap transition-colors cursor-pointer">Framer Motion</div>
                            <div className="px-3 py-1.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-500 text-[10px] font-mono font-medium whitespace-nowrap transition-colors cursor-pointer">TypeScript</div>
                            <div className="px-3 py-1.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-500 text-[10px] font-mono font-medium whitespace-nowrap transition-colors cursor-pointer">Next.js</div>
                        </div>
                    </div>

                    {components.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                            {components.map((c) => (
                                <Link key={c.slug} href={`/components/${c.slug}`}>
                                    <div className="group relative flex flex-col bg-zinc-900 border border-zinc-800 rounded overflow-hidden hover:border-zinc-600 transition-all duration-200">
                                        <div className="h-48 bg-zinc-950 relative flex items-center justify-center border-b border-zinc-800 overflow-hidden">
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
                                        <div className="p-4">
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

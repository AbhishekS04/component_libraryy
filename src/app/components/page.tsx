
import { getAllComponents } from "@/../registry/lib/components"
import Link from "next/link"
import { ComponentPreview } from "@/components/component-preview"
import { ComponentsDisplay } from "@/components/components-display"

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
                    <ComponentsDisplay components={components} selectedCategory={selectedCategory} />

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

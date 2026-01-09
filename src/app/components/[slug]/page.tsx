
import { notFound } from "next/navigation"
import fs from "fs"
import path from "path"
import Link from "next/link"
import { getComponent, getAllComponents } from "@/../registry/lib/components"
import { ComponentPreview } from "@/components/component-preview"
import { ComponentCodeViewer } from "@/components/component-code-viewer"
import { ComponentViewLayout } from "@/components/component-view-layout"
import { CopyButton } from "@/components/copy-button"
import { ClickablePrompt } from "@/components/clickable-prompt"
import { codeToHtml } from 'shiki'

interface ComponentPageProps {
    params: Promise<{
        slug: string
    }>
}

export async function generateStaticParams() {
    const components = await getAllComponents()
    return components.map((c) => ({
        slug: c.slug,
    }))
}

export default async function ComponentPage({ params }: ComponentPageProps) {
    const { slug } = await params
    const component = await getComponent(slug)

    if (!component) {
        notFound()
    }

    // Read globals.css for preview
    const cssPath = path.join(process.cwd(), "src/app/globals.css")
    const css = await fs.promises.readFile(cssPath, "utf-8")

    // Prepare files for Code Viewer
    const codeFiles = await Promise.all(component.files.map(async (file) => ({
        path: file.path,
        content: file.content,
        highlighted: await codeToHtml(file.content, {
            lang: 'tsx',
            theme: 'github-dark-default'
        })
    })))

    // Construct AI Prompt using all files
    const prompt = `Here is the code for ${component.name}:\n\n${component.files.map(f => `// ${f.path}\n${f.content}`).join('\n\n')}`

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark font-display text-zinc-900 dark:text-zinc-100 transition-colors duration-200">
            {/* Top Navigation Bar */}


            <main className="max-w-[1400px] mx-auto px-4 sm:px-6 py-8">
                {/* Breadcrumbs */}
                <nav className="flex items-center gap-2 mb-6 text-sm font-medium">
                    <Link className="text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors" href="/components">Components</Link>
                    <span className="material-symbols-outlined text-sm text-zinc-400">chevron_right</span>
                    <span className="text-zinc-900 dark:text-zinc-100">{component.name}</span>
                </nav>

                {/* Page Heading */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
                    <div className="space-y-2">
                        <div className="flex items-center gap-3">
                            <h1 className="text-4xl font-black tracking-tight text-zinc-900 dark:text-white capitalize">{component.name.replace(/-/g, ' ')}</h1>
                            <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-bold border border-primary/20">v1.0.0</span>
                        </div>
                        <p className="text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl">A reusable component for your projects.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 text-sm font-bold transition-all cursor-pointer">
                            <span className="material-symbols-outlined text-sm">star</span>
                            Star on GitHub
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left Content: Preview & Code */}
                    <div className="lg:col-span-8 space-y-8">
                        <ComponentViewLayout slug={component.slug} codeFiles={codeFiles} />
                    </div>

                    {/* Right Sidebar */}
                    <div className="lg:col-span-4 space-y-6">

                        {/* Installation */}
                        <div className="rounded-xl border border-zinc-800 bg-black overflow-hidden">
                            <div className="p-4 border-b border-zinc-800 flex items-center gap-2">
                                <div className="p-1.5 rounded-md bg-zinc-900 text-zinc-400">
                                    <span className="material-symbols-outlined text-sm">terminal</span>
                                </div>
                                <h3 className="font-medium text-sm text-zinc-200">Installation</h3>
                            </div>
                            <div className="p-4">
                                <div className="relative flex items-center justify-between gap-2 p-3 rounded-lg bg-zinc-900 border border-zinc-800/50 font-mono text-xs text-zinc-300">
                                    <div className="flex bg-transparent w-full overflow-hidden">
                                        <span className="text-zinc-600 mr-2 select-none">$</span>
                                        <span>npx ui-add {component.slug}</span>
                                    </div>
                                    <CopyButton value={`npx ui-add ${component.slug}`} className="text-zinc-500 hover:text-white transition-colors" />
                                </div>
                            </div>
                        </div>

                        {/* AI Prompt */}
                        <div className="rounded-xl border border-zinc-800 bg-black overflow-hidden">
                            <div className="p-4 border-b border-zinc-800 flex items-center gap-2">
                                <div className="p-1.5 rounded-md bg-zinc-900 text-zinc-400">
                                    <span className="material-symbols-outlined text-sm">auto_awesome</span>
                                </div>
                                <h3 className="font-medium text-sm text-zinc-200">AI Prompt</h3>
                            </div>
                            <div className="p-4">
                                <ClickablePrompt value={prompt} />
                            </div>
                        </div>

                        {/* Dependencies */}
                        <div className="rounded-xl border border-zinc-800 bg-black overflow-hidden">
                            <div className="p-4 border-b border-zinc-800 flex items-center gap-2">
                                <div className="p-1.5 rounded-md bg-zinc-900 text-zinc-400">
                                    <span className="material-symbols-outlined text-sm">deployed_code</span>
                                </div>
                                <h3 className="font-medium text-sm text-zinc-200">Dependencies</h3>
                            </div>
                            <div className="p-4">
                                <div className="flex flex-wrap gap-2">
                                    {['framer-motion', 'lucide-react', 'clsx'].map(dep => (
                                        <span key={dep} className="px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-[11px] font-medium text-zinc-400">
                                            {dep}
                                        </span>
                                    ))}
                                </div>
                                <div className="mt-6">
                                    <h4 className="text-[10px] uppercase tracking-wider font-bold text-zinc-600 mb-3">Notes</h4>
                                    <ul className="text-xs text-zinc-500 space-y-2 list-disc pl-4 marker:text-zinc-700">
                                        <li>Supports SSR out of the box.</li>
                                        <li>Configs are easy to customize.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="mt-20 border-t border-zinc-200 dark:border-zinc-800 py-12 bg-zinc-50 dark:bg-zinc-950">
                <div className="max-w-[1400px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-2 opacity-50 text-zinc-900 dark:text-zinc-100">
                        <span className="material-symbols-outlined">auto_awesome</span>
                        <span className="font-bold text-lg">UI Forge</span>
                    </div>
                    <p className="text-sm text-zinc-500">Built for developers by the community. Open source UI kits.</p>
                    <div className="flex gap-6">
                        <Link className="text-zinc-400 hover:text-primary transition-colors" href="#"><span className="material-symbols-outlined">alternate_email</span></Link>
                        <Link className="text-zinc-400 hover:text-primary transition-colors" href="#"><span className="material-symbols-outlined">public</span></Link>
                        <Link className="text-zinc-400 hover:text-primary transition-colors" href="#"><span className="material-symbols-outlined">terminal</span></Link>
                    </div>
                </div>
            </footer>
        </div>
    )
}

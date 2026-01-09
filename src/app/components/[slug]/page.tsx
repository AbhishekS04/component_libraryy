
import { notFound } from "next/navigation"
import fs from "fs"
import path from "path"
import Link from "next/link"
import { getComponent, getAllComponents } from "@/../registry/lib/components"
import { ComponentPreview } from "@/components/component-preview"
import { ComponentCodeViewer } from "@/components/component-code-viewer"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CopyButton } from "@/components/copy-button"
import { codeToHtml } from 'shiki'

interface ComponentPageProps {
    params: Promise<{
        slug: string
    }>
}

export async function generateStaticParams() {
    const components = await getAllComponents()
    return components.map((slug) => ({
        slug,
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
            {/* Top Navigation Bar - Keeping local as per design */}
            <header className="sticky top-0 z-50 w-full border-b border-zinc-200 dark:border-zinc-800 bg-background-light/80 dark:bg-zinc-950/80 backdrop-blur-md">
                <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <Link href="/" className="flex items-center gap-2 text-primary font-bold text-xl tracking-tight">
                            <div className="size-8 bg-primary rounded flex items-center justify-center text-white">
                                <span className="material-symbols-outlined">auto_awesome</span>
                            </div>
                            <span>UI Forge</span>
                        </Link>
                        <nav className="hidden md:flex items-center gap-6">
                            <Link className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-primary dark:hover:text-primary transition-colors" href="/components">Components</Link>
                            <Link className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-primary dark:hover:text-primary transition-colors" href="#">Templates</Link>
                            <Link className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-primary dark:hover:text-primary transition-colors" href="#">Showcase</Link>
                            <Link className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-primary dark:hover:text-primary transition-colors" href="#">Docs</Link>
                        </nav>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="relative hidden sm:block">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-sm">search</span>
                            <input className="bg-zinc-100 dark:bg-zinc-900 border-none rounded-lg pl-9 pr-4 py-2 text-sm w-64 focus:ring-1 focus:ring-primary outline-none" placeholder="Search components..." type="text" />
                        </div>
                        <button className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                            <span className="material-symbols-outlined">dark_mode</span>
                        </button>
                        <button className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all">Sign In</button>
                    </div>
                </div>
            </header>

            <main className="max-w-[1400px] mx-auto px-6 py-8">
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
                        <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 text-sm font-bold transition-all">
                            <span className="material-symbols-outlined text-sm">star</span>
                            Star on GitHub
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left Content: Preview & Code */}
                    <div className="lg:col-span-8 space-y-8">
                        <Tabs defaultValue="preview" className="rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden bg-white dark:bg-zinc-950 shadow-sm">
                            <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
                                <TabsList className="bg-zinc-200 dark:bg-zinc-800 p-1 rounded-lg h-auto">
                                    <TabsTrigger value="preview" className="px-3 py-1 rounded-md text-xs font-bold data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-700 data-[state=active]:text-zinc-900 dark:data-[state=active]:text-zinc-100 shadow-sm transition-all text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300">Preview</TabsTrigger>
                                    <TabsTrigger value="code" className="px-3 py-1 rounded-md text-xs font-bold data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-700 data-[state=active]:text-zinc-900 dark:data-[state=active]:text-zinc-100 shadow-sm transition-all text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300">Code</TabsTrigger>
                                </TabsList>
                                <div className="flex items-center gap-3 text-zinc-400">
                                    <button className="hover:text-primary transition-colors"><span className="material-symbols-outlined text-xl">desktop_windows</span></button>
                                    <button className="hover:text-primary transition-colors"><span className="material-symbols-outlined text-xl">smartphone</span></button>
                                    <div className="w-px h-4 bg-zinc-300 dark:bg-zinc-700 mx-1"></div>
                                    <button className="hover:text-primary transition-colors"><span className="material-symbols-outlined text-xl">refresh</span></button>
                                </div>
                            </div>

                            <TabsContent value="preview" className="relative min-h-[400px] p-0 m-0 border-0">
                                <div className="bg-zinc-50 dark:bg-[#0c0c0e] p-8 min-h-[400px] flex items-center justify-center bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:20px_20px]">
                                    <ComponentPreview slug={component.slug} className="!min-h-[inherit] !border-none !bg-transparent" />
                                </div>
                            </TabsContent>

                            <TabsContent value="code" className="p-0 m-0 border-0 min-h-[400px]">
                                <ComponentCodeViewer files={codeFiles} />
                            </TabsContent>
                        </Tabs>
                    </div>

                    {/* Right Sidebar: Installation & AI */}
                    <div className="lg:col-span-4 space-y-6">
                        {/* CLI Installation */}
                        <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 bg-white dark:bg-zinc-950 shadow-sm">
                            <h3 className="text-sm font-bold mb-4 flex items-center gap-2 text-zinc-900 dark:text-white">
                                <span className="material-symbols-outlined text-primary text-lg">terminal</span>
                                Installation
                            </h3>
                            <div className="relative group">
                                <div className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-3 pr-12 font-mono text-sm">
                                    <span className="text-zinc-500 mr-2">$</span>
                                    <span className="text-zinc-800 dark:text-zinc-200">npx ui-add {component.slug}</span>
                                </div>
                                <CopyButton value={`npx ui-add ${component.slug}`} className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-500" />
                            </div>
                        </div>

                        {/* AI Prompt Box */}
                        <div className="rounded-xl border border-primary/30 bg-primary/5 p-6 relative overflow-hidden group shadow-[0_0_20px_rgba(60,131,246,0.05)]">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-sm font-bold text-primary flex items-center gap-2">
                                    <span className="material-symbols-outlined text-lg">magic_button</span>
                                    AI Prompt
                                </h3>
                                <CopyButton value={prompt} className="flex items-center gap-1.5 bg-primary hover:bg-primary/90 text-white px-3 py-1.5 rounded-md text-xs font-bold transition-all">
                                    <span className="material-symbols-outlined text-sm">content_copy</span>
                                    Copy
                                </CopyButton>
                            </div>
                            <div className="bg-white/50 dark:bg-zinc-900/50 border border-primary/20 rounded-lg p-3">
                                <p className="text-xs font-mono text-zinc-600 dark:text-zinc-400 leading-relaxed italic line-clamp-3">
                                    {prompt}
                                </p>
                            </div>
                        </div>

                        {/* Dependencies & Notes */}
                        <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 bg-white dark:bg-zinc-950 shadow-sm space-y-6">
                            <div>
                                <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3">Dependencies</h4>
                                <div className="flex flex-wrap gap-2">
                                    <span className="px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-medium text-zinc-600 dark:text-zinc-400">framer-motion</span>
                                    <span className="px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-medium text-zinc-600 dark:text-zinc-400">lucide-react</span>
                                    <span className="px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-medium text-zinc-600 dark:text-zinc-400">clsx</span>
                                </div>
                            </div>
                            <hr className="border-zinc-200 dark:border-zinc-800" />
                            <div>
                                <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3">Developer Notes</h4>
                                <ul className="text-sm text-zinc-600 dark:text-zinc-400 space-y-2 list-disc pl-4">
                                    <li>Supports SSR out of the box.</li>
                                    <li>Configs are easy to customize.</li>
                                </ul>
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

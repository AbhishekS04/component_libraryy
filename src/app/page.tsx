
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark font-display text-zinc-950 dark:text-white selection:bg-primary/30">
      {/* Top Navigation */}
      <header className="fixed top-0 z-50 w-full border-b border-zinc-200 dark:border-zinc-800 backdrop-blur-md bg-white/80 dark:bg-[#09090b]/80">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link className="flex items-center gap-2 text-white group" href="/">
              <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-white">
                <span className="material-symbols-outlined !text-[20px]">deployed_code</span>
              </div>
              <span className="text-lg font-bold tracking-tight text-zinc-950 dark:text-white">Shadcn AI</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link className="text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors" href="/components">Components</Link>
              <Link className="text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors" href="#">Docs</Link>
              <Link className="text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors" href="#">Blocks</Link>
              <Link className="text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors" href="#">Showcase</Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex relative items-center">
              <span className="material-symbols-outlined absolute left-3 text-zinc-500 !text-[18px]">search</span>
              <input
                className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg pl-10 pr-4 py-1.5 text-sm w-64 focus:ring-1 focus:ring-primary focus:border-primary transition-all text-zinc-900 dark:text-white placeholder:text-zinc-500 outline-none"
                placeholder="Search components..."
                type="text"
              />
            </div>
            <Link className="p-2 text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors" href="https://github.com/callm" target="_blank">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.412-4.041-1.412-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path></svg>
            </Link>
          </div>
        </div>
      </header>

      <main className="relative pt-16 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:24px_24px] dark:bg-[radial-gradient(#27272a_1px,transparent_1px)]">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 pt-24 pb-20 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-primary/5 blur-[120px] rounded-full -z-10"></div>
          <div className="flex flex-col items-center text-center gap-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider">
              <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
              Now Available: AI Charts v2.0
            </div>
            <h1 className="text-zinc-900 dark:text-white text-5xl md:text-7xl font-black leading-[1.1] tracking-[-0.04em] max-w-4xl">
              Beautiful components.<br />
              One command. <span className="text-primary">Zero friction.</span>
            </h1>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg md:text-xl font-normal leading-relaxed max-w-2xl">
              The library for developers who care about code quality. Copy, paste, and ship with AI-powered UI components designed for performance.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
              <Link href="/components">
                <button className="flex items-center gap-2 h-12 px-8 bg-zinc-900 dark:bg-white text-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all rounded-lg font-bold text-base">
                  Browse Components
                  <span className="material-symbols-outlined !text-[20px]">arrow_forward</span>
                </button>
              </Link>
              <button className="flex items-center gap-2 h-12 px-8 bg-transparent text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all rounded-lg font-bold text-base">
                View on GitHub
              </button>
            </div>
          </div>
        </section>

        {/* Terminal Preview Section */}
        <section className="max-w-4xl mx-auto px-6 pb-32">
          <div className="relative group">
            {/* Terminal Window */}
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl">
              <div className="flex items-center justify-between px-4 py-3 bg-zinc-900/50 border-b border-zinc-800">
                <div className="flex gap-1.5">
                  <div className="size-3 rounded-full bg-[#ff5f56]"></div>
                  <div className="size-3 rounded-full bg-[#ffbd2e]"></div>
                  <div className="size-3 rounded-full bg-[#27c93f]"></div>
                </div>
                <div className="text-[12px] font-mono text-zinc-500">bash — 80x24</div>
                <div className="w-12"></div>
              </div>
              <div className="p-6 font-mono text-sm leading-relaxed overflow-x-auto">
                <div className="flex gap-4">
                  <span className="text-primary select-none">$</span>
                  <span className="text-white">npx shadcn-ai@latest add button</span>
                </div>
                <div className="mt-4 text-zinc-500">
                  <div className="flex gap-4">
                    <span className="text-green-500 select-none">✔</span>
                    <span>Found 1 component.</span>
                  </div>
                  <div className="flex gap-4 mt-1">
                    <span className="text-blue-500 select-none">ℹ</span>
                    <span>Installing dependencies: tailwindcss-animate, lucide-react...</span>
                  </div>
                  <div className="flex gap-4 mt-3">
                    <span className="text-zinc-400 select-none"></span>
                    <span className="text-zinc-400">Writing components/ui/button.tsx</span>
                  </div>
                  <div className="flex gap-4 mt-1">
                    <span className="text-green-500 select-none">✔</span>
                    <span className="text-zinc-100">Component installed successfully!</span>
                  </div>
                </div>
                <div className="mt-6 flex gap-4">
                  <span className="text-primary select-none">$</span>
                  <span className="inline-block w-2 h-5 bg-primary animate-pulse"></span>
                </div>
              </div>
            </div>
            {/* Subtle Gradient Glow */}
            <div className="absolute -inset-4 bg-primary/20 blur-2xl rounded-3xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
          <div className="mt-12 text-center">
            <div className="flex flex-col items-center gap-4">
              <p className="text-zinc-500 text-sm font-medium uppercase tracking-widest">Install with one command</p>
              <div className="flex items-center gap-2 p-1.5 pl-4 bg-zinc-900 border border-zinc-800 rounded-xl w-full max-w-md mx-auto">
                <code className="text-zinc-300 text-sm font-mono flex-1 text-left">npx shadcn-ai add button</code>
                <button className="bg-primary hover:bg-primary/90 text-white px-4 py-1.5 rounded-lg text-sm font-bold transition-all flex items-center gap-2">
                  <span className="material-symbols-outlined !text-[18px]">content_copy</span>
                  Copy
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="max-w-7xl mx-auto px-6 pb-32">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="group p-8 bg-zinc-900/40 border border-zinc-800 hover:border-primary/50 rounded-2xl transition-all duration-300">
              <div className="size-12 rounded-xl bg-zinc-800 flex items-center justify-center text-white mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                <span className="material-symbols-outlined !text-[28px]">terminal</span>
              </div>
              <h3 className="text-white text-xl font-bold mb-3">Native CLI</h3>
              <p className="text-zinc-400 leading-relaxed mb-6">
                Integrated directly into your workflow. No need to download zip files—just run the command and get the code.
              </p>
              <div className="font-mono text-[11px] px-2 py-1 bg-zinc-950 text-zinc-500 rounded border border-zinc-800 inline-block uppercase tracking-tighter">
                shadcn-ai init
              </div>
            </div>
            {/* Feature 2 */}
            <div className="group p-8 bg-zinc-900/40 border border-zinc-800 hover:border-primary/50 rounded-2xl transition-all duration-300">
              <div className="size-12 rounded-xl bg-zinc-800 flex items-center justify-center text-white mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                <span className="material-symbols-outlined !text-[28px]">lock_open</span>
              </div>
              <h3 className="text-white text-xl font-bold mb-3">Zero Lock-in</h3>
              <p className="text-zinc-400 leading-relaxed mb-6">
                It's your code. No hidden dependencies or heavy external packages. You own every pixel and every line.
              </p>
              <div className="font-mono text-[11px] px-2 py-1 bg-zinc-950 text-zinc-500 rounded border border-zinc-800 inline-block uppercase tracking-tighter">
                pure react & tailwind
              </div>
            </div>
            {/* Feature 3 */}
            <div className="group p-8 bg-zinc-900/40 border border-zinc-800 hover:border-primary/50 rounded-2xl transition-all duration-300">
              <div className="size-12 rounded-xl bg-zinc-800 flex items-center justify-center text-white mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                <span className="material-symbols-outlined !text-[28px]">auto_awesome</span>
              </div>
              <h3 className="text-white text-xl font-bold mb-3">AI-Optimized</h3>
              <p className="text-zinc-400 leading-relaxed mb-6">
                Built with LLM-friendly structures. Our code is optimized for better prompting results with Cursor and v0.
              </p>
              <div className="font-mono text-[11px] px-2 py-1 bg-zinc-950 text-zinc-500 rounded border border-zinc-800 inline-block uppercase tracking-tighter">
                semantic structure
              </div>
            </div>
          </div>
        </section>

        {/* CTA Showcase Section */}
        <section className="max-w-7xl mx-auto px-6 pb-40">
          <div className="relative rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-800 p-12 md:p-20 flex flex-col items-center text-center">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/20 blur-[120px] rounded-full"></div>
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/10 blur-[120px] rounded-full"></div>
            <h2 className="text-white text-3xl md:text-5xl font-black mb-6 tracking-tight relative z-10">
              Ready to build your next big idea?
            </h2>
            <p className="text-zinc-400 text-lg max-w-2xl mb-10 relative z-10">
              Start with a solid foundation of accessibility, responsiveness, and performance.
              Used by thousands of developers worldwide.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 relative z-10">
              <button className="w-full sm:w-auto px-10 h-14 bg-white text-black font-bold rounded-xl hover:bg-zinc-200 transition-all text-lg">
                Get Started Today
              </button>
              <button className="w-full sm:w-auto px-10 h-14 bg-zinc-950 text-white border border-zinc-800 font-bold rounded-xl hover:bg-zinc-800 transition-all text-lg">
                Read Documentation
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 py-20 transition-colors">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 text-zinc-900 dark:text-white mb-6">
                <div className="size-6 bg-primary rounded flex items-center justify-center text-white">
                  <span className="material-symbols-outlined !text-[16px]">deployed_code</span>
                </div>
                <span className="text-lg font-bold">Shadcn AI</span>
              </div>
              <p className="text-zinc-500 text-sm leading-relaxed">
                The component library for the AI era. Beautifully designed, accessible, and ready for your production code.
              </p>
            </div>
            <div>
              <h4 className="text-zinc-900 dark:text-white font-bold mb-6 text-sm">Product</h4>
              <ul className="space-y-4">
                <li><Link className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors text-sm" href="#">Components</Link></li>
                <li><Link className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors text-sm" href="#">Templates</Link></li>
                <li><Link className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors text-sm" href="#">CLI</Link></li>
                <li><Link className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors text-sm" href="#">Changelog</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-zinc-900 dark:text-white font-bold mb-6 text-sm">Resources</h4>
              <ul className="space-y-4">
                <li><Link className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors text-sm" href="#">Documentation</Link></li>
                <li><Link className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors text-sm" href="#">API Reference</Link></li>
                <li><Link className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors text-sm" href="#">Community</Link></li>
                <li><Link className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors text-sm" href="#">GitHub</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-zinc-900 dark:text-white font-bold mb-6 text-sm">Legal</h4>
              <ul className="space-y-4">
                <li><Link className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors text-sm" href="#">Privacy</Link></li>
                <li><Link className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors text-sm" href="#">Terms</Link></li>
                <li><Link className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors text-sm" href="#">License</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-10 border-t border-zinc-200 dark:border-zinc-900 flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-zinc-600 text-[13px]">
              © 2024 Shadcn AI. All rights reserved. Built with passion for developers.
            </p>
            <div className="flex items-center gap-6">
              <Link className="text-zinc-600 hover:text-zinc-900 dark:hover:text-white transition-colors" href="#"><span className="material-symbols-outlined">alternate_email</span></Link>
              <Link className="text-zinc-600 hover:text-zinc-900 dark:hover:text-white transition-colors" href="#">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.599 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

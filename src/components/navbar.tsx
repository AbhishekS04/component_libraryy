"use client"

import Link from "next/link"
import { m, useReducedMotion, type Variants } from "framer-motion"
import { NavbarSearch } from "@/components/navbar-search"

export function Navbar() {
    const reducedMotion = useReducedMotion()

    const iconVariants: Variants = {
        rest: { scale: 1, rotate: 0, y: 0 },
        hover: { scale: 1.12, rotate: -10, y: -1 },
        tap: { scale: 0.94, rotate: 0, y: 0 },
    }

    const glowVariants: Variants = {
        rest: { opacity: 0, scale: 0.92 },
        hover: {
            opacity: [0.55, 0.9, 0.55],
            scale: [0.98, 1.06, 0.98],
        },
        tap: { opacity: 0.2, scale: 0.95 },
    }

    return (
        <header className="fixed top-0 z-50 w-full border-b border-zinc-200 dark:border-zinc-800 backdrop-blur-md bg-white/80 dark:bg-[#09090b]/80">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                <div className="flex items-center gap-8">
                    <Link className="flex items-center gap-2 text-white group" href="/">
                        <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-white">
                            <span className="material-symbols-outlined text-[20px]!">deployed_code</span>
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
                    <NavbarSearch />
                    <Link
                        className="p-2 text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                        href="https://github.com/callm"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Open GitHub"
                    >
                        <m.span
                            className="relative inline-flex"
                            initial="rest"
                            animate="rest"
                            whileHover={reducedMotion ? undefined : "hover"}
                            whileTap={reducedMotion ? undefined : "tap"}
                            variants={iconVariants}
                            transition={
                                reducedMotion
                                    ? { duration: 0 }
                                    : { type: "spring", stiffness: 560, damping: 28, mass: 0.6 }
                            }
                        >
                            <m.span
                                aria-hidden="true"
                                className="pointer-events-none absolute -inset-2 rounded-full blur-[10px]"
                                variants={glowVariants}
                                transition={
                                    reducedMotion
                                        ? { duration: 0 }
                                        : { duration: 1.15, ease: "easeInOut", repeat: Infinity }
                                }
                                style={{
                                    background:
                                        "radial-gradient(circle at 30% 30%, rgba(59,130,246,0.55), rgba(59,130,246,0.08) 55%, transparent 70%)",
                                }}
                            />
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.412-4.041-1.412-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                        </m.span>
                    </Link>
                </div>
            </div>
        </header>
    )
}

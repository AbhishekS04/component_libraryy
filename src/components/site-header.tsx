import Link from "next/link"
import { cn } from "@/lib/utils"
import { ModeToggle } from "@/components/mode-toggle"

export function SiteHeader() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 max-w-screen-2xl items-center">
                <div className="mr-4 hidden md:flex">
                    <Link href="/" className="mr-6 flex items-center space-x-2">
                        <span className="hidden font-bold sm:inline-block">
                            AI Components
                        </span>
                    </Link>
                    <nav className="flex items-center gap-6 text-sm">
                        <Link
                            href="/components"
                            className={cn(
                                "transition-colors hover:text-foreground/80",
                                "text-foreground/60"
                            )}
                        >
                            Components
                        </Link>
                        <Link
                            href="/docs"
                            className={cn(
                                "transition-colors hover:text-foreground/80",
                                "text-foreground/60"
                            )}
                        >
                            Docs
                        </Link>
                    </nav>
                </div>
                <div className="flex flex-1 items-center justify-end space-x-2">
                    <nav className="flex items-center">
                        <Link
                            href="https://github.com/callm"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <div className={cn("inline-flex h-9 w-9 items-center justify-center whitespace-nowrap rounded-md px-0 py-2 hover:bg-accent hover:text-accent-foreground")}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="h-4 w-4"
                                >
                                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36.5-8 3C6.77.5 4.11-1.5 2.5 0c-.27 1.16-.27 2.35 0 3.5A5.403 5.403 0 0 0 .25 7.5c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                                    <path d="M9 18c-4.51 2-5-2-7-2" />
                                </svg>
                                <span className="sr-only">GitHub</span>
                            </div>
                        </Link>
                        <ModeToggle />
                    </nav>
                </div>
            </div>
        </header>
    )
}

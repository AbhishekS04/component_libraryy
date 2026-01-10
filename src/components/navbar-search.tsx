"use client"

import * as React from "react"
import { AnimatePresence, m, useReducedMotion } from "framer-motion"
import { useLenis } from "lenis/react"
import { Command as CommandIcon, Search, X } from "lucide-react"
import { useRouter } from "next/navigation"

import { cn } from "@/lib/utils"

type SearchItem = {
    label: string
    href: string
}

const NAV_ITEMS: SearchItem[] = [
    // { label: "Explore", href: "/" },
    { label: "Components", href: "/components" },
    { label: "Docs", href: "#" },
    { label: "Blocks", href: "#" },
    { label: "Showcase", href: "#" },
    // { label: "About", href: "#" },
]

const EASE_OUT_QUINT: [number, number, number, number] = [0.22, 1, 0.36, 1]

export function NavbarSearch() {
    const reducedMotion = useReducedMotion()
    const router = useRouter()
    const lenis = useLenis()

    const [open, setOpen] = React.useState(false)
    const [query, setQuery] = React.useState("")
    const [activeIndex, setActiveIndex] = React.useState(0)

    const inputRef = React.useRef<HTMLInputElement>(null)

    const filtered = React.useMemo(() => {
        const q = query.trim().toLowerCase()
        if (!q) return NAV_ITEMS
        return NAV_ITEMS.filter((item) => item.label.toLowerCase().includes(q))
    }, [query])

    React.useEffect(() => {
        setActiveIndex(0)
    }, [query])

    const close = React.useCallback(() => {
        setOpen(false)
        setQuery("")
        inputRef.current?.blur()
    }, [])

    const openModal = React.useCallback(() => {
        setOpen(true)
    }, [])

    const selectItem = React.useCallback(
        (item: SearchItem | undefined) => {
            if (!item) return
            if (item.href === "#") {
                close()
                return
            }
            router.push(item.href)
            close()
        },
        [close, router]
    )

    React.useEffect(() => {
        if (!open) return
        const id = window.requestAnimationFrame(() => {
            inputRef.current?.focus()
        })
        return () => window.cancelAnimationFrame(id)
    }, [open])

    React.useEffect(() => {
        if (!open) return
        const prev = document.body.style.overflow
        const prevHtmlOverflow = document.documentElement.style.overflow
        const prevBodyPosition = document.body.style.position
        const prevBodyTop = document.body.style.top
        const prevBodyWidth = document.body.style.width

        const scrollY = window.scrollY

        // Pause Lenis smooth scrolling (it can keep scrolling even when body overflow is hidden)
        lenis?.stop()

        // Robust scroll lock: freeze body at current scroll position
        document.documentElement.style.overflow = "hidden"
        document.body.style.overflow = "hidden"
        document.body.style.position = "fixed"
        document.body.style.top = `-${scrollY}px`
        document.body.style.width = "100%"

        return () => {
            document.documentElement.style.overflow = prevHtmlOverflow
            document.body.style.overflow = prev
            document.body.style.position = prevBodyPosition
            document.body.style.top = prevBodyTop
            document.body.style.width = prevBodyWidth

            // Restore scroll position
            window.scrollTo(0, scrollY)

            lenis?.start()
        }
    }, [lenis, open])

    React.useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            const key = event.key.toLowerCase()
            const isK = key === "k"

            if ((event.metaKey || event.ctrlKey) && isK) {
                event.preventDefault()
                openModal()
                return
            }

            if (event.key === "Escape") {
                close()
                return
            }

            if (!open) return

            if (event.key === "ArrowDown") {
                event.preventDefault()
                setActiveIndex((idx) => Math.min(idx + 1, Math.max(filtered.length - 1, 0)))
                return
            }

            if (event.key === "ArrowUp") {
                event.preventDefault()
                setActiveIndex((idx) => Math.max(idx - 1, 0))
                return
            }

            if (event.key === "Enter") {
                event.preventDefault()
                selectItem(filtered[activeIndex])
            }
        }

        window.addEventListener("keydown", onKeyDown)
        return () => window.removeEventListener("keydown", onKeyDown)
    }, [activeIndex, close, filtered, open, openModal, selectItem])

    return (
        <>
            {/* Trigger */}
            <button
                type="button"
                onClick={openModal}
                className={cn(
                    "hidden sm:inline-flex",
                    "items-center gap-2",
                    "h-9 px-3",
                    "cursor-pointer",
                    "rounded-md border border-border/50",
                    "bg-white/5 backdrop-blur-sm",
                    "text-muted-foreground hover:text-foreground",
                    "hover:bg-white/10",
                    "transition-colors",
                    "font-space-grotesk"
                )}
                aria-haspopup="dialog"
                aria-expanded={open}
            >
                <CommandIcon className="h-4 w-4" />
                <span className="hidden sm:inline-flex">Search</span>
                <kbd className="pointer-events-none ml-2 hidden rounded bg-white/10 px-1.5 py-0.5 font-mono text-[10px] font-medium text-muted-foreground sm:flex gap-0.5">
                    <span className="text-xs">⌘</span>K
                </kbd>
            </button>

            {/* Spotlight modal */}
            <AnimatePresence>
                {open ? (
                    <m.div
                        className="fixed inset-0 z-100"
                        initial={reducedMotion ? { opacity: 1 } : { opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={reducedMotion ? { opacity: 1 } : { opacity: 0 }}
                        transition={reducedMotion ? { duration: 0 } : { duration: 0.18, ease: EASE_OUT_QUINT }}
                        role="dialog"
                        aria-modal="true"
                    >
                        <button
                            type="button"
                            aria-label="Close search"
                            className="absolute inset-0 bg-background/60 backdrop-blur-sm"
                            onClick={close}
                        />

                        <m.div
                            className={cn(
                                "relative",
                                "mx-auto mt-20",
                                "w-[min(700px,calc(100vw-2rem))]",
                                "max-h-[calc(100vh-8rem)]",
                                "overflow-hidden",
                                "rounded-2xl",
                                "border border-border",
                                "bg-popover/95",
                                "text-popover-foreground",
                                "shadow-2xl"
                            )}
                            initial={
                                reducedMotion
                                    ? { opacity: 1, y: 0 }
                                    : { opacity: 0, y: -8, scale: 0.985, filter: "blur(6px)" }
                            }
                            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                            exit={
                                reducedMotion
                                    ? { opacity: 1, y: 0 }
                                    : { opacity: 0, y: -6, scale: 0.985, filter: "blur(6px)" }
                            }
                            transition={
                                reducedMotion
                                    ? { duration: 0 }
                                    : { duration: 0.22, ease: EASE_OUT_QUINT }
                            }
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex flex-col">
                                <div className="flex items-center gap-3 px-4 py-3">
                                <Search className="h-5 w-5 text-muted-foreground" />
                                <input
                                    ref={inputRef}
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Search UI…"
                                    type="text"
                                    className={cn(
                                        "h-10 w-full",
                                        "bg-transparent",
                                        "text-[15px] text-foreground",
                                        "placeholder:text-muted-foreground",
                                        "outline-none"
                                    )}
                                />
                                <button
                                    type="button"
                                    onClick={close}
                                    className={cn(
                                        "rounded-md p-2",
                                        "text-muted-foreground hover:text-foreground",
                                        "hover:bg-accent",
                                        "transition-colors"
                                    )}
                                    aria-label="Close"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                                </div>

                                <div className="flex-1 overflow-y-auto overscroll-contain px-4 pb-4">
                                {/* <div className="px-1 pb-2 text-sm font-medium text-muted-foreground">Navigation</div> */}
                                <div className="space-y-2">
                                    {filtered.length === 0 ? (
                                        <div className="px-3 py-3 text-sm text-muted-foreground">No results</div>
                                    ) : (
                                        filtered.map((item, index) => {
                                            const active = index === activeIndex
                                            return (
                                                <button
                                                    key={item.label}
                                                    type="button"
                                                    onMouseEnter={() => setActiveIndex(index)}
                                                    onClick={() => selectItem(item)}
                                                    className={cn(
                                                        "w-full text-left",
                                                        "rounded-xl px-4 py-3",
                                                        "text-[15px]",
                                                        active
                                                            ? "bg-primary text-primary-foreground"
                                                            : "text-foreground hover:bg-accent",
                                                        "transition-colors"
                                                    )}
                                                >
                                                    {item.label}
                                                </button>
                                            )
                                        })
                                    )}
                                </div>
                            </div>
                            </div>
                        </m.div>
                    </m.div>
                ) : null}
            </AnimatePresence>
        </>
    )
}

import * as React from "react"
import { cn } from "@/lib/utils"

type TestProps = React.HTMLAttributes<HTMLDivElement>

export function Test({ className, ...props }: TestProps) {
    return (
        <div className={cn("", className)} {...props}>
            Test
        </div>
    )
}

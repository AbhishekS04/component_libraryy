
import { NextResponse } from "next/server"
import { getComponent } from "@/../registry/lib/components"

export async function GET(
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    const { slug } = await params
    const component = await getComponent(slug)

    if (!component) {
        return NextResponse.json(
            { error: "Component not found" },
            { status: 404 }
        )
    }

    // Map to Shadcn Registry format
    // Ref: https://ui.shadcn.com/docs/registry
    return NextResponse.json({
        name: component.slug,
        type: "registry:ui",
        title: component.name,
        description: component.description,
        files: component.files.map(file => ({
            path: file.path,
            content: file.content,
            type: "registry:ui",
            target: ""
        })),
        dependencies: [
            "framer-motion",
            "lucide-react",
            "clsx",
            "tailwind-merge"
        ],
        registryDependencies: [],
        cssVars: {
            light: {},
            dark: {}
        },
        meta: {
            category: component.category,
            credits: component.credits
        }
    })
}

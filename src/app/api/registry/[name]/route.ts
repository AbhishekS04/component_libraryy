
import { NextResponse } from "next/server"
import { getComponent } from "@/../registry/lib/components"

export async function GET(
    request: Request,
    { params }: { params: Promise<{ name: string }> }
) {
    const { name } = await params
    const component = await getComponent(name)

    if (!component) {
        return NextResponse.json(
            { error: "Component not found" },
            { status: 404 }
        )
    }

    // TODO: Extract dependencies from file content or a config file
    // For now, we return the raw files. A smart CLI can parse imports.
    return NextResponse.json({
        name: component.name,
        type: "registry:ui",
        files: component.files,
        dependencies: [
            "framer-motion",
            "lucide-react",
            "clsx",
            "tailwind-merge"
        ],
        dev_dependencies: [],
    })
}

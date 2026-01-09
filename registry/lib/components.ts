import fs from "fs"
import path from "path"

const COMPONENTS_DIR = path.join(process.cwd(), "registry/components")

export interface ComponentFile {
    path: string
    content: string
}

export interface Component {
    slug: string
    name: string
    files: ComponentFile[]
    date: string
}

export async function getAllComponents(): Promise<{ slug: string, date: string }[]> {
    if (!fs.existsSync(COMPONENTS_DIR)) {
        return []
    }
    const items = await fs.promises.readdir(COMPONENTS_DIR)
    const components = await Promise.all(
        items
            .filter(item => !item.startsWith('.'))
            .map(async (slug) => {
                const componentPath = path.join(COMPONENTS_DIR, slug)
                const stat = await fs.promises.stat(componentPath)
                return {
                    slug,
                    date: stat.birthtime.toISOString()
                }
            })
    )
    return components.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export async function getComponent(slug: string): Promise<Component | null> {
    const componentPath = path.join(COMPONENTS_DIR, slug)

    if (!fs.existsSync(componentPath)) {
        return null
    }

    const stat = await fs.promises.stat(componentPath)
    let files: ComponentFile[] = []

    if (stat.isDirectory()) {
        files = await getFilesRecursively(componentPath, "")
    } else {
        // Single file component (e.g. button.tsx)
        const content = await fs.promises.readFile(componentPath, "utf-8")
        files.push({
            path: slug, // Keep original filename as relative path
            content
        })
    }

    return {
        slug,
        name: slug,
        files,
        date: stat.birthtime.toISOString()
    }
}

async function getFilesRecursively(dir: string, relativePath: string): Promise<ComponentFile[]> {
    const entries = await fs.promises.readdir(dir, { withFileTypes: true })
    const files: ComponentFile[] = []

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name)
        const relPath = path.posix.join(relativePath, entry.name) // use posix for consistent forward slashes in registry

        if (entry.isDirectory()) {
            const nestedFiles = await getFilesRecursively(fullPath, relPath)
            files.push(...nestedFiles)
        } else {
            const content = await fs.promises.readFile(fullPath, "utf-8")
            files.push({
                path: relPath,
                content
            })
        }
    }
    return files
}

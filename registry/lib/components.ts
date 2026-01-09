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
}

export async function getAllComponents(): Promise<string[]> {
    if (!fs.existsSync(COMPONENTS_DIR)) {
        return []
    }
    const items = await fs.promises.readdir(COMPONENTS_DIR)
    return items.filter(item => !item.startsWith('.'))
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

    // If it was a directory, slug is the dir name. If file, slug is filename without extension (handled by caller typically, or we normalize here) 
    // For simplicity, we assume components are directories or files. 

    return {
        slug,
        name: slug, // TODO: improve naming strategy
        files
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

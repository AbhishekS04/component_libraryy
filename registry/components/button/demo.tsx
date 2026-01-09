import { Button } from "./button"

export default function ButtonDemo() {
    return (
        <div className="p-4 space-x-2">
            <Button>Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
        </div>
    )
}

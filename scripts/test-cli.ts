
import fs from 'fs';
import path from 'path';

const REGISTRY_BASE_URL = 'http://localhost:3000/api/registry';

async function main() {
    const componentName = process.argv[2];

    if (!componentName) {
        console.error('Please specify a component name, e.g., npx tsx scripts/test-cli.ts social-stories');
        process.exit(1);
    }

    console.log(`📦 Fetching ${componentName} from ${REGISTRY_BASE_URL}...`);

    try {
        const res = await fetch(`${REGISTRY_BASE_URL}/${componentName}`);

        if (!res.ok) {
            if (res.status === 404) {
                console.error(`❌ Component '${componentName}' not found in registry.`);
            } else {
                console.error(`❌ Failed to fetch component: ${res.statusText}`);
            }
            process.exit(1);
        }

        const data = await res.json();

        // Simulate installing to "src/components/ui" or similar
        // For this test, let's put it in a "installed-components" folder to avoid overwriting dev work
        // In a real CLI, this would be configurable or detect project structure
        const targetBaseDir = path.join(process.cwd(), 'src', 'components', 'ui', componentName);

        if (!fs.existsSync(targetBaseDir)) {
            fs.mkdirSync(targetBaseDir, { recursive: true });
        }

        console.log(`📂 Installing to ${targetBaseDir}...`);

        for (const file of data.files) {
            // file.path in registry is relative, e.g. "social-stories.tsx"
            // We write it to targetBaseDir
            const filePath = path.join(targetBaseDir, file.path);
            const dir = path.dirname(filePath);

            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }

            fs.writeFileSync(filePath, file.content);
            console.log(`   + ${file.path}`);
        }

        console.log(`\n✅ Successfully installed ${componentName}!`);
        console.log(`\nDependencies to install:`);
        console.log(`npm install ${data.dependencies.join(' ')}`);

    } catch (error) {
        console.error('❌ Error:', error);
    }
}

main();

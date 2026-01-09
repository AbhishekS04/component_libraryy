#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
// import chalk from 'chalk'; // Using standard console for simplicity/compatibility if install fails

const REGISTRY_BASE_URL = 'http://localhost:3000/api/registry';

async function main() {
    const componentName = process.argv[2];

    if (!componentName) {
        console.error('❌ Please specify a component name.');
        console.log('Usage: npx ui-add <component-name>');
        process.exit(1);
    }

    console.log(`📦 Fetching ${componentName} from UI Forge Registry...`);

    try {
        // Determine fetch implementation (native in Node 18+ or polyfill)
        const fetchFn = (globalThis as any).fetch || require('node-fetch');
        const res = await fetchFn(`${REGISTRY_BASE_URL}/${componentName}`);

        if (!res.ok) {
            console.error(`❌ Failed to fetch component: ${res.statusText}`);
            if (res.status === 404) {
                console.error(`   Component '${componentName}' not found.`);
            }
            process.exit(1);
        }

        const data = await res.json();

        // Determine target directory
        // We assume we are running in the user's project root
        // Default to src/components/ui/[component]
        const targetBaseDir = path.join(process.cwd(), 'src', 'components', 'ui');
        const componentDir = path.join(targetBaseDir, componentName);

        if (!fs.existsSync(componentDir)) {
            fs.mkdirSync(componentDir, { recursive: true });
        }

        console.log(`📂 Installing to ${componentDir}...`);

        for (const file of data.files) {
            // file.path is relative, e.g. "social-stories.tsx"
            const filePath = path.join(componentDir, file.path);
            const dir = path.dirname(filePath);

            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }

            fs.writeFileSync(filePath, file.content);
            console.log(`   + ${file.path}`);
        }

        console.log(`\n✅ Successfully installed ${componentName}!`);
        console.log(`\nNext steps:`);
        console.log(`1. Run: npm install ${data.dependencies.join(' ')}`);
        console.log(`2. Import it: import { ${data.name} } from "@/components/ui/${componentName}/${componentName}"`);

    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
}

main();

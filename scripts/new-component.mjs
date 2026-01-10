import fs from "node:fs";
import path from "node:path";
import readline from "node:readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const CATEGORIES = [
  "Layout",
  "Forms",
  "Navigation",
  "Utility",
  "Animations",
  "Charts",
  "Data Display",
];

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

async function main() {
  console.log("\n🚀 Create New Component\n");

  const name = await question("Component Name (e.g. Gradient Button): ");
  if (!name) {
    console.error("Name is required.");
    rl.close();
    return;
  }

  const defaultSlug = name.toLowerCase().replace(/\s+/g, "-");
  let slug = await question(`Slug (default: ${defaultSlug}, press Enter to keep): `);
  if (!slug) {
    slug = defaultSlug;
  }

  console.log("\nSelect Category:");
  CATEGORIES.forEach((cat, index) => {
    console.log(`${index + 1}. ${cat}`);
  });

  const catIndexStr = await question(`\nEnter Number (1-${CATEGORIES.length}): `);
  const catIndex = Number.parseInt(catIndexStr, 10) - 1;

  let category = "Utility";
  if (catIndex >= 0 && catIndex < CATEGORIES.length) {
    category = CATEGORIES[catIndex];
  } else {
    console.log('Invalid selection, defaulting to "Utility".');
  }

  const description = await question("Description: ");

  const componentDir = path.join(process.cwd(), "registry/components", slug);
  if (fs.existsSync(componentDir)) {
    console.error(`\n❌ Error: Component "${slug}" already exists!`);
    rl.close();
    return;
  }

  fs.mkdirSync(componentDir, { recursive: true });

  const componentName = name.replace(/\s+/g, "");

  const componentContent = `import * as React from "react"
import { cn } from "@/lib/utils"

interface ${componentName}Props extends React.HTMLAttributes<HTMLDivElement> {
    
}

export function ${componentName}({ className, ...props }: ${componentName}Props) {
    return (
        <div className={cn("", className)} {...props}>
            ${name}
        </div>
    )
}
`;
  fs.writeFileSync(path.join(componentDir, `${slug}.tsx`), componentContent);

  const metaContent = JSON.stringify(
    {
      name,
      category,
      description,
      credits: [],
    },
    null,
    2
  );
  fs.writeFileSync(path.join(componentDir, "meta.json"), metaContent);

  console.log("\n✅ Component created successfully!");
  console.log(`📂 Location: registry/components/${slug}`);
  console.log(`🏷️  Category: ${category}`);

  rl.close();
}

main();

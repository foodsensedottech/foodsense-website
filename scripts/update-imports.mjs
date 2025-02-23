import { glob } from 'glob';
import fs from 'fs/promises';
import path from 'path';

const IMPORT_MAPPINGS = {
  // Button
  '@/components/primitives/button': '@/components/ui',
  '@/components/primitives/card': '@/components/ui',
  '@/components/primitives/dialog': '@/components/ui',
  '@/components/primitives/navigation-menu': '@/components/ui',
  '@/components/primitives/theme': '@/components/ui',
};

async function updateImports() {
  try {
    // Get all TypeScript files
    const files = await glob('src/**/*.{ts,tsx}');

    for (const file of files) {
      let content = await fs.readFile(file, 'utf8');
      let hasChanges = false;

      // Update imports
      for (const [oldPath, newPath] of Object.entries(IMPORT_MAPPINGS)) {
        const importRegex = new RegExp(`from ['"]${oldPath}.*['"]`, 'g');
        if (importRegex.test(content)) {
          content = content.replace(importRegex, `from '${newPath}'`);
          hasChanges = true;
        }
      }

      // Save changes if any
      if (hasChanges) {
        await fs.writeFile(file, content, 'utf8');
        console.log(`Updated imports in ${file}`);
      }
    }

    console.log('Import updates completed!');
  } catch (error) {
    console.error('Error updating imports:', error);
  }
}

updateImports(); 
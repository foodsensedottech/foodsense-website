import { glob } from 'glob';
import fs from 'fs/promises';
import path from 'path';

const IMPORT_MAPPINGS = {
  // Toast fixes
  '@/hooks/use-toast': '@/components/providers/toast-provider',
  '@/components/ui/toast': '@/components/ui/toast',
  
  // Utils consolidation
  '@/lib/utils/': '@/lib/utils',
  
  // Contentful
  '@/types/contentful/about': '@/lib/contentful/types',
  '@/types/contentful/page': '@/lib/contentful/types',
  
  // HubSpot
  '@/types/integrations/hubspot': '@/lib/hubspot/types',
};

const FILE_MOVES = {
  'src/hooks/use-toast.ts': null, // Delete
  'src/hooks/use-toast.tsx': null, // Delete
};

const UTILS_CONSOLIDATION = {
  sourceDir: 'src/lib/utils',
  targetFile: 'src/lib/utils.ts',
  // List utils functions to consolidate
  functions: [
    'formatPhoneNumber',
    'parsePhoneNumber',
    'cn',
    'logger',
  ]
};

async function fixRouting() {
  try {
    // 1. Update imports
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

      if (hasChanges) {
        await fs.writeFile(file, content, 'utf8');
        console.log(`Updated imports in ${file}`);
      }
    }

    // 2. Delete unnecessary files
    for (const [oldPath, newPath] of Object.entries(FILE_MOVES)) {
      if (newPath === null && await fs.access(oldPath).then(() => true).catch(() => false)) {
        await fs.unlink(oldPath);
        console.log(`Deleted ${oldPath}`);
      }
    }

    // 3. Consolidate utils
    const utilsFiles = await glob(`${UTILS_CONSOLIDATION.sourceDir}/*.ts`);
    let consolidatedContent = '';
    
    for (const file of utilsFiles) {
      const content = await fs.readFile(file, 'utf8');
      consolidatedContent += `\n${content}\n`;
    }

    // Write consolidated utils
    await fs.writeFile(UTILS_CONSOLIDATION.targetFile, consolidatedContent);
    console.log(`Consolidated utils into ${UTILS_CONSOLIDATION.targetFile}`);

    // Remove utils directory after consolidation
    await fs.rm(UTILS_CONSOLIDATION.sourceDir, { recursive: true });
    console.log('Removed old utils directory');

    console.log('Routing fixes completed!');
  } catch (error) {
    console.error('Error fixing routing:', error);
  }
}

fixRouting();
fixRouting();
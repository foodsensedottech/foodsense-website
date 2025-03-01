import { glob } from 'glob';
import fs from 'fs/promises';
import path from 'path';

async function consolidateTypes() {
  try {
    // 1. Create directories if they don't exist
    await fs.mkdir('src/lib/contentful', { recursive: true });
    await fs.mkdir('src/lib/hubspot', { recursive: true });
    await fs.mkdir('src/types', { recursive: true });

    // 2. Write Contentful types
    const contentfulTypes = `
// Consolidated Contentful Types
import { Entry } from 'contentful';

export interface AboutContentType {
  title: string;
  subtitle: string;
}

export interface AboutCardContentType {
  title: string;
  description: string;
  icon: string;
  statistic?: {
    value: string;
    label: string;
  };
}

export interface HeroContentType {
  title: string;
  subtitle: string;
  backgroundImage: {
    url: string;
    title: string;
  };
}

export interface ServicesContentType {
  title: string;
  subtitle: string;
  description: string;
}

export interface ServiceCardContentType {
  title: string;
  description: string;
  features: string[];
}

export interface TestimonialsContentType {
  title: string;
  subtitle: string;
}

export interface TestimonialCardContentType {
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
}

export interface BlogContentType {
  title: string;
  subtitle: string;
}

export interface BlogPostContentType {
  title: string;
  slug: string;
  publishDate: string;
  excerpt: string;
  content: any;
}

export interface PageContentType {
  title: string;
  description: string;
  slug: string;
  ogImage?: {
    fields?: {
      file?: {
        url?: string;
      };
    };
  };
}
`;

    await fs.writeFile('src/lib/contentful/types.ts', contentfulTypes);
    console.log('Created Contentful types');

    // 3. Organize remaining types
    const typeFiles = {
      // Keep in src/types
      'src/types/env.d.ts': true,        // Environment declarations
      'src/types/next-themes.d.ts': true, // Next-themes declarations
      
      // Move to lib/types/index.ts
      'src/types/base.ts': false,
      'src/types/components.ts': false,
      'src/types/api.ts': false,
      'src/types/index.ts': false
    };

    // Create consolidated types file
    let consolidatedTypes = `// Consolidated Base Types\n\n`;

    // Read and consolidate movable types
    for (const [file, keep] of Object.entries(typeFiles)) {
      if (!keep) {
        try {
          const content = await fs.readFile(file, 'utf8');
          consolidatedTypes += `// From ${path.basename(file)}\n${content}\n\n`;
          // Delete the original file
          await fs.unlink(file);
          console.log(`Consolidated and removed ${file}`);
        } catch (err) {
          console.warn(`Warning: Could not process ${file}`);
        }
      }
    }

    // Write consolidated types
    await fs.writeFile('src/lib/types.ts', consolidatedTypes);
    console.log('Created consolidated types');

    // 4. Update imports
    console.log('Updating imports...');
    const files = await glob('src/**/*.{ts,tsx}');
    
    for (const file of files) {
      let content = await fs.readFile(file, 'utf8');
      let hasChanges = false;

      // Update base type imports
      const baseImport = /from ['"]@\/types\/(base|components|api|index)['"]|from ['"]@\/types['"]/g;
      if (baseImport.test(content)) {
        content = content.replace(
          baseImport,
          `from '@/lib/types'`
        );
        hasChanges = true;
      }

      // Keep existing Contentful and HubSpot import updates
      const contentfulImport = /from ['"]@\/types\/contentful\/.*['"]/g;
      if (contentfulImport.test(content)) {
        content = content.replace(
          contentfulImport,
          `from '@/lib/contentful/types'`
        );
        hasChanges = true;
      }

      const hubspotImport = /from ['"]@\/types\/integrations\/hubspot['"]/g;
      if (hubspotImport.test(content)) {
        content = content.replace(
          hubspotImport,
          `from '@/lib/hubspot/types'`
        );
        hasChanges = true;
      }

      if (hasChanges) {
        await fs.writeFile(file, content, 'utf8');
        console.log(`Updated imports in ${file}`);
      }
    }

    // 5. Clean up old directories if they exist
    try {
      await fs.rm('src/types/contentful', { recursive: true });
      await fs.rm('src/types/integrations', { recursive: true });
      console.log('Cleaned up old type directories');
    } catch (err) {
      console.log('No old directories to clean up');
    }

    console.log('Type consolidation completed!');
  } catch (error) {
    console.error('Error consolidating types:', error);
  }
}

consolidateTypes(); 
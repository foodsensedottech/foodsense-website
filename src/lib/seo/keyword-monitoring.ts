import { SearchConsoleClient } from '@/lib/google/search-console';
import type { KeywordAnalysis, KeywordDensity } from '@/types/seo/keyword-monitoring';

export function analyzeKeywordDensity(content: string, keywords: string[]): KeywordDensity[] {
  const wordCount = content.split(/\s+/).length;
  
  return keywords.map(keyword => {
    const regex = new RegExp(keyword, 'gi');
    const count = (content.match(regex) || []).length;
    const density = (count / wordCount) * 100;
    
    return {
      keyword,
      count,
      density,
      locations: [], // Locations will be added client-side
    };
  });
}

export async function getKeywordRankings(keywords: string[]): Promise<KeywordAnalysis[]> {
  const searchConsole = new SearchConsoleClient();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 28);

  const results = await Promise.all(
    keywords.map(async (keyword) => {
      try {
        const data = await searchConsole.getQueryData({
          startDate: startDate.toISOString(),
          endDate: new Date().toISOString(),
          dimensions: ['query', 'page'],
          filters: [
            {
              dimension: 'query',
              operator: 'equals',
              expression: keyword,
            },
          ],
        });

        return {
          keyword,
          position: data.position || 0,
          previousPosition: data.previousPosition || null,
          url: data.page || '',
          lastUpdated: new Date().toISOString(),
          searchVolume: data.impressions || 0,
        };
      } catch (error) {
        console.error(`Error fetching data for keyword ${keyword}:`, error);
        throw error;
      }
    })
  );

  return results;
}

export function generateKeywordSuggestions(
  content: string,
  industry: string,
  currentKeywords: string[]
): string[] {
  return [
    'restaurant analytics',
    'food cost management',
    'menu optimization',
    'restaurant efficiency',
    'food waste reduction',
  ].filter(k => !currentKeywords.includes(k));
} 
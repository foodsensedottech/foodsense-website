import { NextResponse } from 'next/server';

export async function GET() {
  const sections = await Promise.all([
    import('@/components/sections/testimonials'),
    import('@/components/sections/integrations'),
    import('@/components/sections/blog')
  ]);
  
  return NextResponse.json(sections);
} 
import { Hero } from '@/components/sections/hero';
import { About } from '@/components/sections/about';
import { Services } from '@/components/sections/services';
import { Testimonials } from "@/components/sections/testimonials";
import { Integrations } from "@/components/sections/integrations";
import { Blog } from "@/components/sections/blog";
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Loyalty } from '@/components/sections/loyalty';
import { Contact } from '@/components/sections/contact';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About className="bg-white dark:bg-blue-950/40" />
        <Services className="bg-gray-50 dark:bg-blue-900/40" />
        <Loyalty className="bg-white dark:bg-blue-950/40" />
        {/* Temporarily hide Testimonials */}
        {/* <Testimonials className="bg-white dark:bg-blue-950/40" /> */}
        <Integrations className="bg-gray-50 dark:bg-blue-900/40" />
        <Blog className="bg-white dark:bg-blue-950/40" />
        <Contact className="bg-gray-50 dark:bg-blue-900/40" />
      </main>
      <Footer />
    </>
  );
}

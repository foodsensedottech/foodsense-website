import { Skeleton } from "@/components/ui/skeleton";
import { zIndex } from '@/lib/utils';
import { cn } from "@/lib/utils";

export function SectionLoading() {
  return (
    <section className="relative min-h-screen bg-gray-900">
      <div className={cn(
        "relative container mx-auto h-full flex flex-col justify-center items-center text-center px-4",
        `z-[${zIndex.content}]`
      )}>
        <div className="max-w-4xl w-full space-y-8">
          <Skeleton className="h-16 w-3/4 mx-auto" />
          <Skeleton className="h-8 w-2/3 mx-auto" />
          <div className={cn("flex flex-col sm:flex-row gap-6 justify-center mt-8", `z-[${zIndex.contentTop}]`)}>
            <Skeleton className="h-14 w-48 mx-auto sm:mx-0" />
            <Skeleton className="h-14 w-48 mx-auto sm:mx-0" />
          </div>
        </div>
      </div>
    </section>
  );
}

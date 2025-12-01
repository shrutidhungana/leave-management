// components/skeletons/EmptyStateSkeleton.tsx
import { Skeleton } from "@/components/ui/skeleton";

export const EmptyStateSkeleton = () => {
  return (
    <div className="flex flex-col items-center gap-4 py-16 w-full">
      <Skeleton className="h-10 w-48" />
      <Skeleton className="h-5 w-64" />
      <Skeleton className="h-5 w-52" />
    </div>
  );
};

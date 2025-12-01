// components/skeletons/CardSkeleton.tsx
import { Skeleton } from "@/components/ui/skeleton";

export const CardSkeleton = () => {
  return (
    <div className="rounded-xl p-4 border bg-white shadow-sm space-y-3">
      <Skeleton className="h-5 w-40" /> 
      <Skeleton className="h-4 w-32" /> 
      <div className="space-y-2 pt-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  );
};

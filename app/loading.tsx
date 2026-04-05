import { ListingSkeleton } from "@/components/states/listing-skeleton";

export default function Loading() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <ListingSkeleton />
    </main>
  );
}

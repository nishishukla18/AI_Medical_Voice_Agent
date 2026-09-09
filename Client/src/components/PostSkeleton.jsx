const PostSkeleton = () => (
  <div className="animate-pulse rounded-2xl border border-[#322F5C] bg-[#1C1A3B] p-5">
    <div className="flex items-center gap-2">
      <div className="h-2.5 w-2.5 rounded-full bg-[#322F5C]" />
      <div className="h-3 w-24 rounded bg-[#322F5C]" />
    </div>
    <div className="mt-4 space-y-2">
      <div className="h-3 w-full rounded bg-[#322F5C]" />
      <div className="h-3 w-5/6 rounded bg-[#322F5C]" />
      <div className="h-3 w-2/3 rounded bg-[#322F5C]" />
    </div>
    <div className="mt-4 flex gap-4 border-t border-[#322F5C] pt-3">
      <div className="h-3 w-10 rounded bg-[#322F5C]" />
      <div className="h-3 w-16 rounded bg-[#322F5C]" />
    </div>
  </div>
);

export default PostSkeleton;

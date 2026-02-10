function CourseCardSkeleton({ cards = 4 }) {
  return (
    <div className="md:hidden divide-y divide-gray-700">
      {[...Array(cards)].map((_, i) => (
        <div key={i} className="p-4 space-y-3 animate-pulse">
          <div className="h-4 bg-gray-700 rounded w-1/2" />
          <div className="h-4 bg-gray-700 rounded w-3/4" />
          <div className="h-4 bg-gray-700 rounded w-2/3" />
          <div className="h-4 bg-gray-700 rounded w-1/3" />
        </div>
      ))}
    </div>
  );
}

export default CourseCardSkeleton;

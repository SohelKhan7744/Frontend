function EditSkeleton() {
  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white animate-pulse">
      <div className="max-w-xl mx-auto bg-gray-800 rounded-xl p-6 space-y-5">
        <div className="h-6 bg-gray-700 rounded w-1/3" />

        {[...Array(5)].map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="h-4 bg-gray-700 rounded w-1/4" />
            <div className="h-10 bg-gray-700 rounded" />
          </div>
        ))}

        <div className="flex justify-between">
          <div className="h-10 bg-gray-700 rounded w-24" />
          <div className="h-10 bg-gray-700 rounded w-32" />
        </div>
      </div>
    </div>
  );
}

export default EditSkeleton;

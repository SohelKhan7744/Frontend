function EditCourseSkeleton() {
  return (
    <div className="p-6 bg-gray-900 min-h-screen animate-pulse text-white">
      <div className="max-w-xl mx-auto bg-gray-800 rounded-xl p-6 space-y-5">
        <div className="h-6 bg-gray-700 rounded w-1/3" />
        <div className="h-10 bg-gray-700 rounded" />
        <div className="h-24 bg-gray-700 rounded" />
        <div className="flex justify-between">
          <div className="h-10 bg-gray-700 rounded w-24" />
          <div className="h-10 bg-gray-700 rounded w-32" />
        </div>
      </div>
    </div>
  );
}

export default EditCourseSkeleton;

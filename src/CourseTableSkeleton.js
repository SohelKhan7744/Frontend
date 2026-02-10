function CourseTableSkeleton({ rows = 6 }) {
  return (
    <tbody>
      {[...Array(rows)].map((_, i) => (
        <tr key={i} className="border-t border-gray-700 animate-pulse">
          {[...Array(5)].map((_, j) => (
            <td key={j} className="px-4 py-4">
              <div className="h-4 bg-gray-700 rounded w-full" />
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}

export default CourseTableSkeleton;

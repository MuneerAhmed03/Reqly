export const QueryParameters: React.FC<{ query: Record<string, string> }> = ({ query }) => {
    return (
      <>
        <div className="px-4 py-5 border-b border-gray-200 sm:px-6 flex justify-between">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Query Parameters</h3>
        </div>
        {Object.entries(query).map(([name, value]) => (
          <div key={`query_${name}`} className="even:bg-gray-50 odd:bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm leading-5 font-medium text-gray-700">{name}</dt>
            <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2 break-all">{value}</dd>
          </div>
        ))}
      </>
    );
  };
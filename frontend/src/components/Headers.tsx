import React from 'react';

export const Headers: React.FC<{ headers: [string, string][] }> = ({ headers }) => {
    return (
      <>
        <div className="px-4 py-5 border-b border-t border-gray-700 sm:px-6 flex justify-between dark:border-gray-600">
          <h3 className="text-lg leading-6 font-medium text-gray-200 dark:text-gray-300">Headers</h3>
        </div>
        {headers.map(([name, value], index) => (
          <div key={`${name}-${index}`} className="even:bg-gray-800 odd:bg-gray-700 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm leading-5 font-medium text-gray-300 dark:text-gray-400">{name}</dt>
            <dd className="mt-1 text-sm leading-5 text-gray-400 sm:mt-0 sm:col-span-2 dark:text-gray-300">{value}</dd>
          </div>
        ))}
      </>
    );
  };
  
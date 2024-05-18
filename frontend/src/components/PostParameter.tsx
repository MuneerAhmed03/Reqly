import React from "react";

export const PostParameters: React.FC<{ post: Record<string, string> }> = ({
  post,
}) => {
  return (
    <>
      <div className="px-4 py-5 border-b border-t border-gray-700 sm:px-6 flex justify-between">
        <h3 className="text-lg leading-6 font-medium text-gray-300">
          Post Parameters
        </h3>
      </div>
      {Object.entries(post).map(([name, value]) => (
        <div
          key={`post_${name}`}
          className="even:bg-gray-800 odd:bg-gray-700 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
        >
          <dt className="text-sm leading-5 font-medium text-gray-200">
            {name}
          </dt>
          <dd className="mt-1 text-sm leading-5 text-gray-300 sm:mt-0 sm:col-span-2 break-all">
            {value}
          </dd>
        </div>
      ))}
    </>
  );
};

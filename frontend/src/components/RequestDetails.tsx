import React from "react";
import { Headers } from "./Headers";
import { PostParameters } from "./PostParameter";
import { QueryParameter } from "./QueryParameter";
import EmptySelection from "./EmptySelection";
import { RequestData } from "../types/interfaces";

interface RequestDetailsProps {
  selectedRequest: RequestData | null; 
}

const RequestDetails: React.FC<RequestDetailsProps> = ({ selectedRequest }) => {
  if (!selectedRequest) {
    return (
      <div>
        <EmptySelection />
      </div>
    );
  }

  return (
    (
      <div className="w-full mt-5 md:mt-0">
        <div className="bg-gray-900 shadow overflow-hidden sm:rounded-lg m-5 dark:bg-gray-800">
          <div className="px-4 py-5 border-b border-gray-950 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-200 flex">
              {selectedRequest.method} {selectedRequest.url}
              <div className="flex-grow"></div>
            </h3>
          </div>
          {Object.keys(selectedRequest.body).length > 0 && (
            <div className="px-4 py-5 border-b border-gray-700 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-200">
                Request Body
              </h3>
              <pre className="p-6 prettyprint break-all whitespace-pre-wrap text-gray-300">
                {JSON.stringify(selectedRequest.body, null, 2)}
              </pre>
            </div>
          )}
          {selectedRequest.headers.length > 0 && (
            <Headers headers={selectedRequest.headers} />
          )}
          {Object.keys(selectedRequest.bodyPara).length > 0 && (
            <PostParameters post={selectedRequest.bodyPara as Record<string,string>} />
          )}
          {Object.keys(selectedRequest.query).length > 0 && (
            <QueryParameter query={selectedRequest.query as Record<string,string>} />
          )}
        </div>
      </div>
    )
  );
};

export default RequestDetails;

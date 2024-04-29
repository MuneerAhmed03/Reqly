import React from 'react';
import { DetailHeader } from "./DetailHeader" // Importing DetailHeader and DetailList components
import { DetailList } from './DetailList';

interface RequestDetailsProps {
  selectedRequest: any; // Data structure for the selected request
}

const RequestDetails: React.FC<RequestDetailsProps> = ({ selectedRequest }) => {
  if (!selectedRequest) {
    return <div>No request selected</div>;
  }
  const requestKeys = Object.keys(selectedRequest) as string[];

  return (
    <div>
      {requestKeys.map((key) => (
        <div key={key}>
          <DetailHeader title={key} />
          <DetailList data={selectedRequest[key]} />
        </div>
      ))}
    </div>
  );
};

export default RequestDetails;

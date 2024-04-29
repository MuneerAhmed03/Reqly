import { useEffect, useState } from 'react';
import RequestTable from '../components/RequestTable';
import RequestDetails from '../components/RequestDetails';
import io from 'socket.io-client';


const socket = io('http://localhost:8000'); 

const Inspect = () => {
  const [requests, setRequests] = useState<any[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<any>();

  useEffect(() => {
    socket.on('newRequest', ({ dump, request }) => {
      console.log('New request received:', dump, request);
      setRequests(prevRequests => prevRequests.concat(request))
    });

    // Clean up by removing the event listener when the component unmounts
    return () => {
      socket.off('newRequest');
    };
  }, []);
  useEffect(() => {
    console.log(requests);
  },[requests])

  return (
    <div className="flex flex-row h-screen">
      {/* RequestTable takes up 1/3 of the screen */}
      <div className="w-1/3 bg-gray-900">
        <RequestTable filteredRequests={requests} onSelectionChange={setSelectedRequest} />
      </div>
      {/* RequestDetails takes up 2/3 of the screen */}
      <div className="w-2/3 bg-gray-800">
        <RequestDetails selectedRequest={selectedRequest} />
      </div>
    </div>
  );
};

export default Inspect;

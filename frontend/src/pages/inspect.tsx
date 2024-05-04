import { useEffect, useState } from 'react';
import RequestTable from '../components/RequestTable';
import RequestDetails from '../components/RequestDetails';
import io from 'socket.io-client';
import {Dump , RequestData} from '../types/interfaces'
import TitleHead from '../components/TitleHead';

const socket = io('http://localhost:8000'); 

const Inspect = () => {
  const [requests, setRequests] = useState<RequestData[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<any>();
  const [dumps, setDumps] = useState<Dump[]>([]);

  useEffect(() => {
    socket.on('newRequest', ({ dump }) => {
      setRequests(dump.requests);
    });
    // Clean up by removing the event listener when the component unmounts
    return () => {
      socket.off('newRequest');
    };
  }, []);
  // useEffect(() => {
  //   console.log("request added");
  // },[requests])

  return (
  <div className="min-h-screen">
    <TitleHead/>
    <div className="flex flex-row ">
      {/* RequestTable takes up 1/3 of the screen */}
      <div className="w-1/3 bg-gray-900">
        <RequestTable filteredRequests={requests} onSelectionChange={setSelectedRequest} />
      </div>
      {/* RequestDetails takes up 2/3 of the screen */}
      <div className="w-2/3 bg-gray-800">
        <RequestDetails selectedRequest={selectedRequest} />
      </div>
    </div>
    </div>
  );
};

export default Inspect;

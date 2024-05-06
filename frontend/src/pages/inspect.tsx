import { useEffect, useState } from 'react';
import RequestTable from '../components/RequestTable';
import RequestDetails from '../components/RequestDetails';
import io from 'socket.io-client';
import {RequestData} from '../types/interfaces'
import TitleHead from '../components/TitleHead';
import axios from 'axios';

const socket = io('http://localhost:8000'); 

const Inspect = () => {
  const [requests, setRequests] = useState<RequestData[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<any>();
  const [dumpName, setDumpName] = useState<string>();

  useEffect(() => {
    socket.on('newRequest', ({ dump }) => {
      setRequests(dump.requests);
    });
    // Clean up by removing the event listener when the component unmounts
    return () => {
      socket.off('newRequest');
    };
  }, []);

  useEffect(()=>{
    if(sessionStorage.getItem('dumpName') == null){
    axios.get('http://localhost:8000/dump/generate').then((res)=>{
      sessionStorage.setItem('dumpName',res.data);
      console.log(sessionStorage.getItem('dumpName'));
      setDumpName(res.data);
      setRequests(res.data.requests);
    })
  }else{
    setDumpName(sessionStorage.getItem('dumpName') as string);
    const dumpName = sessionStorage.getItem('dumpName') as string;
    console.log(dumpName);
    axios.get(`http://localhost:8000/dump/retrieve/${dumpName}`).then((res)=>{
      if(res.status===200){
        setRequests(res.data.requests);
        setDumpName(res.data.name);
      }
      else{
        sessionStorage.removeItem('dumpName');
      }
    })
  }
  },[])

  return (
    <div className="flex flex-col h-screen overflow-auto">
      <TitleHead name={dumpName ?? ''}/>
      <div className="flex flex-row flex-grow">
        {/* RequestTable takes up 1/3 of the screen */}
        <div className="w-1/3 bg-black overflow-auto">
          <RequestTable filteredRequests={requests} onSelectionChange={setSelectedRequest} />
        </div>
        {/* RequestDetails takes up 2/3 of the screen */}
        <div className="w-2/3 bg-stone-950 overflow-auto">
          <RequestDetails selectedRequest={selectedRequest} />
        </div>
      </div>
    </div>
  );

};

export default Inspect;

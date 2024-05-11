import { useEffect, useState } from 'react';
import RequestTable from '../components/RequestTable';
import RequestDetails from '../components/RequestDetails';
import io from 'socket.io-client';
import {RequestData,Dump} from '../types/interfaces'
import TitleHead from '../components/TitleHead';
import axios from 'axios';

const socket = io('http://localhost:8000'); 

const Inspect = () => {
  const [selectedRequest, setSelectedRequest] = useState<RequestData>();
  const [dump,setDump] = useState<Dump>({name:'',requests:[],mockResponse:{}} as Dump);

  useEffect(() => {
    socket.on('newRequest', ({ dump }) => {
      setDump(dump);
    });
    return () => {
      socket.off('newRequest');
    };
  }, []);

  useEffect(()=>{
    if(sessionStorage.getItem('dumpName') == null){
    axios.get('http://localhost:8000/dump/generate').then((res)=>{
      if(res.status===200){
        console.log(res.data);
        setDump(res.data as Dump);
        sessionStorage.setItem('dumpName',res.data.name);
      };
    })
  }else{
    const url = sessionStorage.getItem('dumpName') as string;
    axios.get(`http://localhost:8000/dump/retrieve/${url}`).then((res)=>{
      if(res.status===200){
        setDump(res.data as Dump);
      }
      else{
        sessionStorage.removeItem('dumpName');
      }
    })
  }
  },[])

  return (
    <div className="flex flex-col h-screen overflow-auto">
      <TitleHead dump={dump}/>
      <div className="flex flex-row flex-grow">
        {/* RequestTable takes up 1/3 of the screen */}
        <div className="w-1/3 bg-black overflow-auto">
          <RequestTable filteredRequests={dump.requests} onSelectionChange={setSelectedRequest} />
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

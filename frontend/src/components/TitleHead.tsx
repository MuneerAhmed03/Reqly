import MockEditor from './MockEditor'
import { useState } from 'react';
import { Dump } from '../types/interfaces';

interface TitleHeadProps {
  dump: Dump;
}

const TitleHead : React.FC<TitleHeadProps> = ({dump }) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  }
  
  return (
    <div className="flex justify-center items-center bg-gray-950">
      <div className="flex justify-center items-center  w-48 bg-zinc-950 rounded-lg m-4 ">
        <button className="w-1/2 p-1 font-semibold rounded-l-lg bg-zinc-950 text-white text-lg font hover:bg-zinc-900" onClick={()=>{
          navigator.clipboard.writeText(dump.name);
        }}> 
          Copy
        </button>
        <div className="h-full border-r border-zinc-950"></div>
        <button className="w-1/2 p-1  rounded-r-lg bg-zinc-950 text-white text-lg hover:bg-zinc-900" onClick={()=>{
          setOpen(true)
        }}>
          Mock
        </button>
        <MockEditor open={open} onClose={handleClose} code={JSON.stringify(dump.mockResponse,null,1)} onChange={()=>{}}/>
      
      </div>
    </div>
  );
};

export default TitleHead;